canvas = undefined
ctx = undefined
width = 48
height = 48
field = []
sprite = new Image()
sprite.src = 'sprite.png'
keyDown = {}

rand = (max) -> Math.floor Math.random()*max

inRange = (x, y) -> 0 <= x and x < width and 0 <= y and y < height

cell = (x, y) ->
    return 1 if not inRange x, y
    field[y*width + x]

setCell = (x, y, v) ->
    field[y*width + x] = v if inRange x, y

for x in [0...width]
    for y in [0...height]
        setCell x, y, 0

for i in [0..32]
    x = rand width
    y = rand height
    for cx in [x...x + 4]
        for cy in [y...y + 4]
            setCell cx, cy, 1

cellX = 12
cellY = 12
dirX = [ 0, 1, 0, -1]
dirY = [-1, 0, 1,  0]

movingRect = (x, y, sx, sy) ->
    x0: (x - cellX*sx)//cellX
    y0: (y - cellY*sy)//cellY
    x1: (x + cellX*(sx + 1) - 1)//cellX
    y1: (y + cellY*(sy + 1) - 1)//cellY

square = (x, y, sx, sy, fn) ->
    r = movingRect x, y, sx, sy
    for cx in [r.x0...r.x1]
        for cy in [r.y0...r.y1]
            return true if fn cx, cy

overlap = (a, b) -> not (b.x0 > a.x1 or b.y0 > a.y1 or a.x0 > b.x1 or a.y0 > b.y1)

objs = []

collides = (self, x, y, sx, sy) ->
    return true if square x, y, sx, sy, cell
    for obj in objs when obj != self and obj.owner != self and obj != self.owner and not (obj instanceof Explosion)
        return obj if overlap movingRect(x, y, sx, sy), movingRect(obj.x, obj.y, 1, 1)

keys =
    0:
        up: 'ArrowUp'
        down: 'ArrowDown'
        left: 'ArrowLeft'
        right: 'ArrowRight'
        fire: 'Space'
    1:
        up: 'KeyW'
        down: 'KeyS'
        left: 'KeyA'
        right: 'KeyD'
        fire: 'Tab'

drawSprite = (x, y, dir, sx, sy) ->
    ctx.save()
    ctx.translate x, y
    ctx.rotate dir*Math.PI*0.5
    ctx.drawImage sprite, 84*sx, 84*sy, 84, 84, -cellX*2, -cellY*2, cellX*4, cellY*4
    ctx.restore()

class Tank
    constructor: (@x, @y, @type, @keys) ->
        @life = 1
        @dir = 1
        @t = 0
        @cooldown = 0
    fire: -> if not @cooldown
        @cooldown = 20
        objs.push new Bullet @x + dirX[@dir]*cellX, @y + dirY[@dir]*cellY, @, @dir
    tick: ->
        @cooldown -= 1 if @cooldown
        engine = false
        self = @
        move = (dir) ->
            self.dir = dir
            engine = true
        exact = @x % cellX == 0 and @y % cellY == 0
        if @keys
            if exact
                move 0 if keyDown[@keys.up]
                move 1 if keyDown[@keys.right]
                move 2 if keyDown[@keys.down]
                move 3 if keyDown[@keys.left]
            @fire() if keyDown[@keys.fire]
        if engine or not exact
            if not collides @, @x + dirX[@dir], @y + dirY[@dir], 2, 2
                @x += dirX[@dir]
                @y += dirY[@dir]
                @t = (@t + 1) % (8*6)
    draw: -> drawSprite @x, @y, @dir, @t//6, @type

class Bullet
    constructor: (@x, @y, @owner, @dir) ->
        @life = 1
    tick: ->
        if obj = collides @, @x, @y, 1, 1
            obj.life -= 1
            @life = 0
            square @x, @y, Math.abs(dirY[@dir]) + 1, Math.abs(dirX[@dir]) + 1, (x, y) -> setCell x, y, 0
        @x += dirX[@dir]*4
        @y += dirY[@dir]*4
    draw: -> drawSprite @x, @y, @dir, 4, 2

class Base
    constructor: (@x, @y) -> @life = 1
    tick: ->
    draw: -> drawSprite @x, @y, 0, 7, 2

class Explosion
    constructor: (@x, @y) -> @life = 19
    tick: -> @life -= 1
    draw: -> drawSprite @x, @y, 0, 3 - @life//5, 2

$ ->
    canvas = document.getElementById 'view'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx = canvas.getContext '2d'
    objs.push new Base cellX*width//2, cellY*(height - 1)
    objs.push new Tank cellX*4, cellY*4, 0, keys[0]
    objs.push new Tank cellX*14, cellY*4, 1, keys[1]
    t = 0
    window.onkeydown = (ev) ->
        keyDown[ev.code] = true
        false
    window.onkeyup = (ev) ->
        delete keyDown[ev.code]
        false
    drawCell = (type, x, y) ->
        ctx.drawImage sprite, 84*type + 21*(x%4), 84*3 + 21*(y%4), 21, 21, x*cellX, y*cellY, cellX, cellY
    highlightTank = (t) -> square t.x, t.y, 2, 2, (x, y) -> drawCell 3, x, y
    # highlightBullet = (b) -> square b.x, b.y, 1, 1, (x, y) -> drawCell 3, x, y
    prevTime = Date.now()
    timeLeft = 0
    draw = ->
        curTime = Date.now()
        timeLeft += curTime - prevTime
        ctx.clearRect 0, 0, canvas.width, canvas.height
        while timeLeft > 10
            objs = objs.filter (obj) -> obj.life > 0
            timeLeft -= 10
            obj.tick() for obj in objs
            for obj in objs when obj.life <= 0 and not (obj instanceof Explosion)
                objs.push new Explosion obj.x, obj.y
        for obj in objs
            #if obj instanceof Tank
            #    highlightTank obj
            obj.draw()
        for x in [0...width]
            for y in [0...height]
                drawCell cell(x, y), x, y
        window.requestAnimationFrame -> draw()
        prevTime = curTime
    draw()
