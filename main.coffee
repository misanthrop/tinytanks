import './index.html'
import './ui.css'
import {keys, tanks} from './config.coffee'
import {width, height, playerSpawnPoints, enemySpawnPoints, levels} from './levels.coffee'
rand = (max) -> Math.floor Math.random()*max

level = tick = null
objs = cells = players = enemies = []
dx = [ 0, 1, 0,-1]
dy = [-1, 0, 1, 0]
inRange = (x, y) -> 0 <= x and x < width and 0 <= y and y < height
cell = (x, y) -> if inRange x, y then cells[y*width + x] else 1
setCell = (x, y, v) -> cells[y*width + x] = v if inRange x, y
cellMask = [0, 0b11, 0b11, 0b1, 0]

collide = (a, ax, ay) ->
	for x in [ax - a.size ... ax + a.size]
		for y in [ay - a.size ... ay + a.size]
			return a if a.layer & cellMask[cell x, y]
	return if (ax != a.x or ay != a.y) and collide a, a.x, a.y
	for b in objs when a != b and b != a.tank and a.mask & b.layer
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
		@player.kill @
		explode @x, @y
	move: (dir) -> if not @t
		@dir = dir
		x = @x + 2*dx[@dir]
		y = @y + 2*dy[@dir]
		if not collide @, x, y
			@x = x
			@y = y
			@t = @type.invVelocity
	fire: -> if not @cooldown and @bullets < @type.maxBullets
		@cooldown = @type.fireCooldown
		objs.push new Bullet @x + dx[@dir], @y + dy[@dir], @, @dir
	tick: ->
		@g = (@g + 1)%2 if 1 == @t%4
		@t -= 1 if @t
		@player.control.call @
		@cooldown -= 1 if @cooldown
	draw: -> drawMovingObj @, @t/@type.invVelocity*2, @g*4, @player.color

class Bullet
	layer: 2
	mask: 0b11
	size: 1
	constructor: (@x, @y, @tank, @dir) ->
		@life = @t = 1
		@invVelocity = @tank.type.invBulletVelocity
		@tank.bullets += 1
	die: ->
		@tank.bullets -= 1
		ex = 1 + Math.abs dy[@dir]
		ey = 1 + Math.abs dx[@dir]
		for x in [@x - ex ... @x + ex]
			for y in [@y - ey ... @y + ey]
				setCell x, y, 0 if 1 == cell x, y
		explode @x, @y
	tick: ->
		if obj = collide @, @x, @y
			obj.life -= 1 if @tank.player.team != obj.player?.team
			@life = 0
		if not @t -= 1
			@t = @invVelocity
			@x += dx[@dir]
			@y += dy[@dir]
	draw: -> drawMovingObj @, @t/@invVelocity, 4, 4

class Base
	layer: 1
	size: 2
	constructor: (@x, @y, @team) -> @life = 1
	die: ->
		@team.lose()
		explode @x, @y
	draw: -> drawSprite @x, @y, 7, 3

class Explosion
	constructor: (@x, @y, @life = 19) ->
	tick: -> @life -= 1
	draw: -> drawSprite @x, @y, 4 - @life//5, 3

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

class Team
	constructor: (@lose) -> @players = 0
	add: -> @players += 1
	remove: -> @lose @ if not @players -= 1

class Player
	constructor: (@team, @color, @life, @control) -> @team.add @
	kill: ->
		@team.remove @ if not @life -= 1
		updateScore()

keyDown = {}
window.onkeydown = (e) -> keyDown[e.code] = true; false
window.onkeyup = (e) -> delete keyDown[e.code]; false

keyControl = (keys) -> ->
	@move dir for dir in [0..3] when keyDown[keys[dir]]
	@fire() if keyDown[keys.fire]

aiControl = ->
	dir = if rand 48 then @dir else rand 4
	@move dir
	@fire() if not rand 8

menu = document.getElementById 'menu'
message = document.getElementById 'message'
score = document.getElementById 'score'
updateScore = -> score.children[i].innerText = "P#{i}: #{player.life}" for player, i in players

event = (text, fn) -> if not message.innerText
	message.innerText = text
	message.style.visibility = 'visible'
	setTimeout ->
		message.innerText = ''
		message.style.visibility = 'hidden'
		fn?()
	, 2000

attackers = new Team -> event 'Victory!', -> loadLevel level += 1
defenders = new Team -> event 'Game Over', -> stopGame()

loadLevel = (level) ->
	enemies = new Player attackers, 0, 20, aiControl
	attackers.players = 1
	cells = levels[level % levels.length].slice 0
	objs = [
		new Base 26, 50, defenders
		new Spawn enemies, 5, enemySpawnPoints]
	objs.push new Spawn player, 1, [playerSpawnPoints[i]] for player, i in players
	updateScore()

window.newGame = (playerCount) ->
	menu.style.visibility = 'hidden'
	players = for i in [0...playerCount]
		new Player defenders, 1 + i, 3, keyControl keys[i]
	defenders.players = playerCount
	loadLevel level = 0
	tick = setInterval ->
		objs = objs.filter (obj) -> obj.life?
		obj.tick?() for obj in objs
		for obj in objs when obj.life <= 0
			obj.die?()
			delete obj.life
	, 10

stopGame = ->
	clearInterval tick
	menu.style.visibility = 'visible'

view = document.getElementById 'view'
ctx = view.getContext '2d'
sprite = Object.assign new Image, src: require './tanks.png'

cellSize = 21
do window.onresize = ->
	cellSize = Math.min window.innerWidth//width, window.innerHeight//height
	view.width = width*cellSize
	view.height = height*cellSize

drawCell = (type, i) ->
	x = i%width
	y = i//height
	ctx.drawImage sprite, 21*(type*4 - 4 + x%4), 21*(16 + y%4), 21, 21, x*cellSize, y*cellSize, cellSize, cellSize

drawSprite = (x, y, sx, sy) -> ctx.drawImage sprite, 84*sx, 84*sy, 84, 84, (x - 2)*cellSize, (y - 2)*cellSize, cellSize*4, cellSize*4
drawMovingObj = (o, t, sx, sy) -> drawSprite o.x - t*dx[o.dir], o.y - t*dy[o.dir], sx + o.dir, sy

do draw = -> if objs?
	ctx.clearRect 0, 0, view.width, view.height
	drawCell c, i for c, i in cells when c == 3
	obj.draw?() for obj in objs
	drawCell c, i for c, i in cells when c != 3
	requestAnimationFrame draw
