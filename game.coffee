canvas = document.getElementById 'view'
ctx = canvas.getContext '2d'

width = 52
height = 52
objs = []
cells = []
cellX = cellY = 16
dirX = [ 0, 1, 0, -1]
dirY = [-1, 0, 1,  0]
keyDown = {}
canvas.width = cellX*width
canvas.height = cellY*height

rand = (max) -> Math.floor Math.random()*max
inRange = (x, y) -> 0 <= x and x < width and 0 <= y and y < height
cell = (x, y) -> if inRange x, y then cells[y*width + x] else 1
setCell = (x, y, v) -> cells[y*width + x] = v if inRange x, y
forEachCell = (fn) -> fn cell(x, y), x, y for x in [0...width] for y in [0...height]
cellMask = [0, 0b11, 0b11, 0b1, 0]

collide = (a, ax, ay) ->
    for x in [ax - a.size ... ax + a.size]
        for y in [ay - a.size ... ay + a.size]
            return true if a.layer & cellMask[cell x, y]
    return if (ax != a.x or ay != a.y) and collide a, a.x, a.y
    for b in objs when a != b and b != a.owner and a.mask & b.layer
        return b if Math.max(Math.abs(ax - b.x), Math.abs(ay - b.y)) < a.size + b.size

class Obj
    nextX: -> @x + dirX[@dir]
    nextY: -> @y + dirY[@dir]
    die: -> objs.push new Explosion @x, @y

class Tank extends Obj
    layer: 1
    mask: 1
    size: 2
    constructor: (@x, @y, @team, @control, @dir = 0) ->
        @life = 1
        @cooldown = 0
        @bullets = 0
        @t = @g = 0
        @mt = 8
    move: (dir) -> if not @t
        @dir = dir
        x = @nextX()
        y = @nextY()
        return obj if obj = collide @, x, y
        @x = x
        @y = y
        @t = @mt
        return
    fire: -> if not @cooldown and @bullets < 1
        @cooldown = 30
        objs.push new Bullet @nextX(), @nextY(), @, @dir
    tick: ->
        @g = (@g + 1)%8 if 1 == @t%4
        @t -= 1 if @t
        @control.call @
        @cooldown -= 1 if @cooldown
    draw: -> drawObjSprite @, @g, @team

keyControl = (keys) -> ->
    @move dir for dir in [0..3] when keyDown[keys[dir]]
    @fire() if keyDown[keys.fire]

aiControl = ->
    @dir = rand 4 if not rand 48
    @move @dir
    @fire() if not rand 8

class Bullet extends Obj
    layer: 2
    mask: 0b11
    size: 1
    constructor: (@x, @y, @owner, @dir) ->
        @life = 1
        @t = 1
        @mt = 4
        @owner.bullets += 1
    tick: ->
        if obj = collide @, @x, @y
            obj.life -= 1 if @owner.team != obj.team
            @life = 0
            ex = 1 + Math.abs dirY[@dir]
            ey = 1 + Math.abs dirX[@dir]
            for x in [@x-ex...@x+ex]
                for y in [@y-ey...@y+ey]
                    setCell x, y, 0 if 1 == cell x, y
        if not @t -= 1
            @t = @mt
            @x = @nextX()
            @y = @nextY()
    draw: -> drawObjSprite @, 4, 2
    die: ->
        super()
        @owner.bullets -= 1

class Base extends Obj
    layer: 1
    size: 2
    constructor: (@x, @y) -> @life = 1
    draw: -> drawSprite @x*cellX, @y*cellY, 0, 7, 2

class Explosion
    constructor: (@x, @y, @life = 19) ->
    tick: -> @life -= 1
    draw: -> drawSprite @x*cellX, @y*cellY, 0, 3 - @life//5, 2
    die: ->

class Spawn
    constructor: (@x, @y, @t, @team, @control) -> @life = 1
    tick: -> if not @tank or @tank.life <= 0
        if not @t -= 1
            objs.push @tank = new Tank @x, @y, @team, @control
            @t = 160
    draw: -> if @t < 20
        drawSprite @x*cellX, @y*cellY, 0, 3 - @t//5, 2

loadLevel = (level) ->
    t = 0
    objs = []
    for row, ly in level.split ' '
        for c, lx in row
            x = lx*2
            y = ly*2
            if t = {'o': 1, 'X': 2, '=': 3, '~': 4}[c]
                setCell cx, cy, t for cx in [x..x+1] for cy in [y..y+1]
            obj = switch c
                when '@' then new Base x, y
                when '0' then new Spawn x, y, t += 100, 0, aiControl
                when '1' then new Spawn x, y, 10, 1, keyControl keys[0]
                when '2' then new Spawn x, y, 10, 1, keyControl keys[1]
            objs.push obj if obj

loadLevel levels[3]

window.onkeydown = (ev) -> keyDown[ev.code] = true; false
window.onkeyup = (ev) -> delete keyDown[ev.code]; false

setInterval ->
    objs = objs.filter (obj) -> obj.life > 0
    obj.tick?() for obj in objs
    obj.die() for obj in objs when obj.life <= 0
, 10

sprite = new Image()
sprite.src = 'sprite.png'

drawCell = (type, x, y) -> ctx.drawImage sprite, 84*type + 21*(x%4), 84*3 + 21*(y%4), 21, 21, x*cellX, y*cellY, cellX, cellY
drawSprite = (x, y, dir, sx, sy) ->
    ctx.save()
    ctx.translate x, y
    ctx.rotate dir*Math.PI*0.5
    ctx.drawImage sprite, 84*sx, 84*sy, 84, 84, -cellX*2, -cellY*2, cellX*4, cellY*4
    ctx.restore()
drawObjSprite = (o, sx, sy) -> drawSprite (o.x - dirX[o.dir]*o.t/o.mt)*cellX, (o.y - dirY[o.dir]*o.t/o.mt)*cellY, o.dir, sx, sy

do draw = ->
    ctx.clearRect 0, 0, canvas.width, canvas.height
    forEachCell (c, x, y) -> drawCell c, x, y if c == 3
    obj.draw() for obj in objs
    forEachCell (c, x, y) -> drawCell c, x, y if c != 3
    window.requestAnimationFrame -> draw()
