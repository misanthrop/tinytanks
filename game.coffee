canvas = document.getElementById 'view'
ctx = canvas.getContext '2d'
sprite = new Image()
sprite.src = 'sprite.png'

width = 52
height = 48
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

square = (x, y, sx, sy, fn) ->
    for cx in [x - sx ... x + sx]
        for cy in [y - sy ... y + sy]
            return true if fn cx, cy

for i in [0..64]
    x = 4*rand width//4
    y = 4 + 4*rand height//4 - 2
    t = if 0 == rand 4 then 2 else 1
    setCell cx, cy, t for cx in [x...x + 4] for cy in [y...y + 4]

keys =
    0:
        0: 'ArrowUp'
        1: 'ArrowRight'
        2: 'ArrowDown'
        3: 'ArrowLeft'
        fire: 'Space'
    1:
        0: 'KeyW'
        1: 'KeyD'
        2: 'KeyS'
        3: 'KeyA'
        fire: 'Tab'

drawCell = (type, x, y) -> ctx.drawImage sprite, 84*type + 21*(x%4), 84*3 + 21*(y%4), 21, 21, x*cellX, y*cellY, cellX, cellY
drawSprite = (x, y, dir, sx, sy) ->
    ctx.save()
    ctx.translate x, y
    ctx.rotate dir*Math.PI*0.5
    ctx.drawImage sprite, 84*sx, 84*sy, 84, 84, -cellX*2, -cellY*2, cellX*4, cellY*4
    ctx.restore()
drawObjSprite = (o, sx, sy) -> drawSprite (o.x - dirX[o.dir]*o.t/o.T)*cellX, (o.y - dirY[o.dir]*o.t/o.T)*cellY, o.dir, sx, sy

class Obj
    constructor: (@x, @y, @dir = 0, @size, @T = 0) ->
        @mask = 1
        @life = 1
        @t = 0
    nextX: -> @x + dirX[@dir]
    nextY: -> @y + dirY[@dir]
    collides: (x, y) ->
        return true if square x, y, @size, @size, cell
        for obj in objs when @ != obj and obj != @owner and @mask & obj.mask
            return obj if Math.max(Math.abs(x - obj.x), Math.abs(y - obj.y)) < @size + obj.size
    move: (dir) -> if not @t
        @dir = dir
        x = @nextX()
        y = @nextY()
        return obj if obj = @collides x, y, @size
        @x = x
        @y = y
        @t = @T
        return
    tick: -> @t -= 1 if @t

class Tank extends Obj
    constructor: (x, y, @team, @control) ->
        super x, y, 0, 2, 8
        @cooldown = 0
        @bullets = 0
    fire: -> if not @cooldown and @bullets < 1
        @cooldown = 30
        @bullets += 1
        objs.push new Bullet @nextX(), @nextY(), @, @dir
    tick: ->
        @control.call @
        super()
        @cooldown -= 1 if @cooldown
    draw: -> drawObjSprite @, @t, @team

keyControl = (keys) -> ->
    @move dir for dir in [0..3] when keyDown[keys[dir]]
    @fire() if keyDown[keys.fire]

aiControl = ->
    @dir = rand 4 if not rand 32
    @move @dir
    @fire() if not rand 8

class Bullet extends Obj
    constructor: (x, y, @owner, dir) -> super x, y, dir, 1, 4
    tick: ->
        super()
        if obj = @move @dir
            obj.life -= 1 if @owner.team != obj.team
            @life = 0
            @owner.bullets -= 1
            obj.owner.bullets -= 1 if obj.owner
            @x = @nextX()
            @y = @nextY()
            square @x, @y, Math.abs(dirY[@dir]) + 1, Math.abs(dirX[@dir]) + 1, (x, y) -> setCell x, y, 0 if 1 == cell x, y
    draw: -> drawObjSprite @, 4, 2

class Base extends Obj
    constructor: (x, y) -> super x, y, 0, 2
    draw: -> drawSprite @x*cellX, @y*cellY, 0, 7, 2

class Explosion
    constructor: (@x, @y) ->
        @life = 19
    tick: -> @life -= 1
    draw: -> drawSprite @x*cellX, @y*cellY, 0, 3 - @life//5, 2

class Spawn
    constructor: (@x, @y, @t, @team, @control) -> @life = 1
    tick: -> if not @tank or @tank.life <= 0
        if not @t -= 1
            objs.push @tank = new Tank @x, @y, @team, @control
            @t = 80
    draw: -> if @t < 20
        drawSprite @x*cellX, @y*cellY, 0, 3 - @t//5, 2

square width//2, height - 3, 4, 3, (x, y) -> setCell x, y, 1; false
square width//2, height - 2, 2, 2, (x, y) -> setCell x, y, 0; false
objs.push new Base width//2, height - 2
objs.push new Spawn width//2 - 8, height - 2, 10, 1, keyControl keys[0]
objs.push new Spawn width//2 + 8, height - 2, 10, 1, keyControl keys[1]
objs.push new Spawn 2, 2, 100, 0, aiControl
objs.push new Spawn width//2, 2, 200, 0, aiControl
objs.push new Spawn width - 3, 2, 300, 0, aiControl

window.onkeydown = (ev) -> keyDown[ev.code] = true; false
window.onkeyup = (ev) -> delete keyDown[ev.code]; false

setInterval ->
    objs = objs.filter (obj) -> obj.life > 0
    obj.tick() for obj in objs
    objs.push new Explosion o.x, o.y for o in objs when o.life <= 0 and not (o instanceof Explosion)
, 10

do draw = ->
    ctx.clearRect 0, 0, canvas.width, canvas.height
    obj.draw() for obj in objs
    drawCell cell(x, y), x, y for x in [0...width] for y in [0...height]
    window.requestAnimationFrame -> draw()
