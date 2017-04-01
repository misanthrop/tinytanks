rand = (max) -> Math.floor Math.random()*max

level = 0
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

explode = (x, y) -> objs.push new Explosion x, y

class Tank
    layer: 1
    mask: 1
    size: 2
    constructor: (@spawn, @type, @dir = 0) ->
        {@x, @y, @player} = @spawn
        @life = @type.life
        @cooldown = @bullets = @t = @g = 0
        @spawn.tanks += 1
    die: ->
        @spawn.tanks -= 1
        @player.die()
        explode @x, @y
    move: (dir) -> if not @t
        @dir = dir
        x = @x + dirX[@dir]*@size
        y = @y + dirY[@dir]*@size
        if not collide @, x, y
            @x = x
            @y = y
            @t = @type.invVelocity
    fire: -> if not @cooldown and @bullets < @type.maxBullets
        @cooldown = @type.fireCooldown
        objs.push new Bullet @x + 2*dirX[@dir], @y + 2*dirY[@dir], @, @dir
    tick: ->
        @g = (@g + 1)%2 if 1 == @t%4
        @t -= 1 if @t
        @player.control.call @
        @cooldown -= 1 if @cooldown
    draw: ->
        t = @t/@type.invVelocity*2
        drawSprite @x - t*dirX[@dir], @y - t*dirY[@dir], @g*4 + @dir, @player.team

class Bullet
    layer: 2
    mask: 0b11
    size: 1
    constructor: (@x, @y, @owner, @dir) ->
        @life = 1
        @t = 1
        @invVelocity = @owner.type.invBulletVelocity
        @owner.bullets += 1
    die: ->
        @owner.bullets -= 1
        explode @x, @y
    tick: ->
        if obj = collide @, @x, @y
            obj.life -= 1 if @owner.player.team != obj.player?.team
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
    draw: ->
        t = @t/@invVelocity
        drawSprite @x - t*dirX[@dir], @y - t*dirY[@dir], 4 + @dir, 3

class Base
    layer: 1
    size: 2
    constructor: (@x, @y) -> @life = 1
    die: -> explode @x, @y
    draw: -> drawSprite @x, @y, 7, 2

class Explosion
    constructor: (@x, @y, @life = 19) ->
    tick: -> @life -= 1
    draw: -> drawSprite @x, @y, 4 - @life//5, 2

class Player
    constructor: (@team, @control, @lose) ->
    die: -> @lose?() if not @life -= 1

class Spawn
    constructor: (@player, @maxTanks, @points) ->
        @tanks = 0
        @life = 1
        @t = 20
        @next = 0
    tick: -> if @tanks < Math.min @maxTanks, @player.life
        if @t == 20
            [@x, @y] = @points[@next]
            @next = (@next + 1) % @points.length
            explode @x, @y
        if not @t -= 1
            objs.push new Tank @, tanks[0]
            @t = 160

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

info = document.getElementById 'info'
event = (text, fn) -> if not info.innerText
    info.innerText = text
    info.style.visibility = 'visible'
    setTimeout ->
        info.innerText = ''
        info.style.visibility = 'hidden'
        fn?()
    , 2000

checkWin = ->
    event 'Victory!', -> loadLevel (level + 1) % levels.length
checkLose = -> if not players[0].life and not players[1].life
    event 'Game Over', -> newGame()

enemies = new Player 0, aiControl, checkWin
players = [
    new Player 1, keyControl(keys[0]), checkLose
    new Player 1, keyControl(keys[1]), checkLose]

loadLevel = (l) ->
    enemies.life = 20
    cells = levels[l].slice 0
    objs = [
        new Base 26, 50
        new Spawn enemies, 5, [[2, 2], [26, 2], [50, 2]]]
    objs.push new Spawn players[i], 1, [[x, 50]] for x, i in [18, 34]
    event "Level #{level + 1}"

do newGame = ->
    players[0].life = players[1].life = 3
    loadLevel 0

setInterval ->
    objs = objs.filter (obj) -> obj.life?
    obj.tick?() for obj in objs
    for obj in objs when obj.life <= 0
        obj.die?()
        delete obj.life
, 10

canvas = document.getElementById 'view'
ctx = canvas.getContext '2d'
canvas.width = width*16
canvas.height = height*16
sprite = new Image()
sprite.src = 'sprite.png'

drawCell = (type, i) -> x = i%width; y = i//height; ctx.drawImage sprite, 84*(type - 1) + 21*(x%4), 84*3 + 21*(y%4), 21, 21, x, y, 1, 1
drawSprite = (x, y, sx, sy) -> ctx.drawImage sprite, 84*sx, 84*sy, 84, 84, x - 2, y - 2, 4, 4

do draw = ->
    ctx.setTransform canvas.width/width, 0, 0, canvas.height/height, 0, 0
    ctx.clearRect 0, 0, width, height
    drawCell c, i for c, i in cells when c == 3
    obj.draw?() for obj in objs
    drawCell c, i for c, i in cells when c != 3
    window.requestAnimationFrame -> draw()
