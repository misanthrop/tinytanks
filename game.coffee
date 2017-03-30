rand = (max) -> Math.floor Math.random()*max

objs = []
cells = []
dirX = [ 0, 1, 0, -1]
dirY = [-1, 0, 1,  0]
inRange = (x, y) -> 0 <= x and x < width and 0 <= y and y < height
cell = (x, y) -> if inRange x, y then cells[y*width + x] else 1
setCell = (x, y, v) -> cells[y*width + x] = v if inRange x, y
cellMask = [0, 0b11, 0b11, 0b1, 0]

collide = (a, ax, ay) ->
    for x in [ax - a.size ... ax + a.size]
        for y in [ay - a.size ... ay + a.size]
            return true if a.layer & cellMask[cell x, y]
    return if (ax != a.x or ay != a.y) and collide a, a.x, a.y
    for b in objs when a != b and b != a.owner and a.mask & b.layer
        return b if Math.max(Math.abs(ax - b.x), Math.abs(ay - b.y)) < a.size + b.size

explode = -> objs.push new Explosion @x, @y

class Tank
    layer: 1
    mask: 1
    size: 2
    constructor: (@x, @y, @team, @control, @type, @dir = 0) ->
        @life = @type.life
        @cooldown = 0
        @bullets = 0
        @t = @g = 0
    move: (dir) -> if not @t
        @dir = dir
        x = @x + dirX[@dir]
        y = @y + dirY[@dir]
        if not collide @, x, y
            @x = x
            @y = y
            @t = @type.invVelocity
    moveProgress: -> @t/@type.invVelocity
    fire: -> if not @cooldown and @bullets < @type.maxBullets
        @cooldown = @type.fireCooldown
        objs.push new Bullet @x + 2*dirX[@dir], @y + 2*dirY[@dir], @, @dir
    tick: ->
        @g = (@g + 1)%2 if 1 == @t%4
        @t -= 1 if @t
        @control.call @
        @cooldown -= 1 if @cooldown
    draw: -> drawObjSprite @, @g*4, @team
    die: explode

class Bullet
    layer: 2
    mask: 0b11
    size: 1
    constructor: (@x, @y, @owner, @dir) ->
        @life = 1
        @t = 1
        @invVelocity = @owner.type.invBulletVelocity
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
            @t = @invVelocity
            @x += dirX[@dir]
            @y += dirY[@dir]
    moveProgress: -> @t/@invVelocity
    draw: -> drawObjSprite @, 4, 3
    die: ->
        explode.call @
        @owner.bullets -= 1

class Base
    layer: 1
    size: 2
    constructor: (@x, @y) -> @life = 1
    draw: -> drawSprite @x, @y, 7, 2
    die: explode

class Explosion
    constructor: (@x, @y, @life = 19) ->
    tick: -> @life -= 1
    draw: -> drawSprite @x, @y, 4 - @life//5, 2

class Spawn
    constructor: (@x, @y, @t, @team, @control) -> @life = 1
    tick: -> if not @tank or @tank.life <= 0
        if not @t -= 1
            objs.push @tank = new Tank @x, @y, @team, @control, tanks[3]
            @t = 160
    draw: -> if @t < 20
        drawSprite @x, @y, 4 - @t//5, 2

loadLevel = (level) ->
    objs = [new Base 26, 50]
    objs.push new Spawn x, 2, 100*(i + 1), 0, aiControl for x, i in [2, 26, 50]
    objs.push new Spawn x, 50, 10, 1, keyControl keys[i] for x, i in [18, 34]
    cells = level.slice 0

keyDown = {}
window.onkeydown = (ev) -> keyDown[ev.code] = true; false
window.onkeyup = (ev) -> delete keyDown[ev.code]; false

keyControl = (keys) -> ->
    @move dir for dir in [0..3] when keyDown[keys[dir]]
    @fire() if keyDown[keys.fire]

aiControl = ->
    dir = if rand 48 then @dir else rand 4
    @move dir
    @fire() if not rand 8

loadLevel testLevel

setInterval ->
    objs = objs.filter (obj) -> obj.life > 0
    obj.tick?() for obj in objs
    obj.die?() for obj in objs when obj.life <= 0
, 10

canvas = document.getElementById 'view'
ctx = canvas.getContext '2d'
canvas.width = width*16
canvas.height = height*16
sprite = new Image()
sprite.src = 'sprite.png'

drawCell = (type, i) -> x = i%width; y = i//height; ctx.drawImage sprite, 84*(type - 1) + 21*(x%4), 84*3 + 21*(y%4), 21, 21, x, y, 1, 1
drawSprite = (x, y, sx, sy) -> ctx.drawImage sprite, 84*sx, 84*sy, 84, 84, x - 2, y - 2, 4, 4
drawObjSprite = (o, sx, sy) -> drawSprite o.x - dirX[o.dir]*o.moveProgress(), o.y - dirY[o.dir]*o.moveProgress(), sx + (o.dir or 0), sy

do draw = ->
    ctx.setTransform canvas.width/width, 0, 0, canvas.height/height, 0, 0
    ctx.clearRect 0, 0, width, height
    drawCell c, i for c, i in cells when c == 3
    obj.draw() for obj in objs
    drawCell c, i for c, i in cells when c != 3
    window.requestAnimationFrame -> draw()
