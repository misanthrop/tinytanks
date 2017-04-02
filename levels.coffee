@width = 52
@height = 52
_ = 0
o = 1
X = 2
w = 3
f = 4
@playerSpawnPoints = [[18, 50], [34, 50]]
@enemySpawnPoints = [[2, 2], [26, 2], [50, 2]]
@levels = [
    [
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,
        o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,
        X,X,X,X,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,X,X,X,X,
        X,X,X,X,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,X,X,X,X,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,]
    [
        _,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,
        f,f,f,f,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,o,o,o,o,f,f,f,f,o,o,o,o,X,X,X,X,
        f,f,f,f,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,o,o,o,o,f,f,f,f,o,o,o,o,X,X,X,X,
        f,f,f,f,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,o,o,o,o,f,f,f,f,o,o,o,o,X,X,X,X,
        f,f,f,f,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,o,o,o,o,f,f,f,f,o,o,o,o,X,X,X,X,
        f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,f,f,f,f,_,_,_,_,_,_,_,_,
        f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,f,f,f,f,_,_,_,_,_,_,_,_,
        f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,f,f,f,f,_,_,_,_,_,_,_,_,
        f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,f,f,f,f,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,X,X,X,X,_,_,_,_,_,_,_,_,f,f,f,f,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,X,X,X,X,_,_,_,_,_,_,_,_,f,f,f,f,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,X,X,X,X,_,_,_,_,_,_,_,_,f,f,f,f,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,X,X,X,X,_,_,_,_,_,_,_,_,f,f,f,f,o,o,o,o,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,f,f,f,f,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,f,f,f,f,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,f,f,f,f,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,f,f,f,f,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        X,X,X,X,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,
        X,X,X,X,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,
        X,X,X,X,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,
        X,X,X,X,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,X,X,X,X,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,]
    [
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,X,X,X,X,X,X,X,X,
        _,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,X,X,X,X,X,X,X,X,
        o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,_,_,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,_,_,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,_,_,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,_,_,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,
        f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,
        _,_,_,_,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,X,X,X,X,X,X,X,X,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,X,X,X,X,X,X,X,X,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,X,X,X,X,X,X,X,X,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,X,X,X,X,X,X,X,X,X,X,X,X,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,
        o,o,o,o,_,_,_,_,_,_,_,_,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,
        o,o,o,o,_,_,_,_,_,_,_,_,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,
        o,o,o,o,_,_,_,_,_,_,_,_,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,
        o,o,o,o,_,_,_,_,_,_,_,_,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,
        o,o,o,o,o,o,o,o,_,_,_,_,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,
        o,o,o,o,o,o,o,o,_,_,_,_,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,
        o,o,o,o,o,o,o,o,_,_,_,_,X,X,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,
        o,o,o,o,o,o,o,o,_,_,_,_,X,X,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,_,_,_,_,
        X,X,X,X,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,
        X,X,X,X,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,
        X,X,X,X,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,
        X,X,X,X,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,]
    [
        _,_,_,_,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,
        f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,
        f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,
        f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,
        f,f,f,f,f,f,f,f,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,
        f,f,f,f,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,X,X,X,X,
        f,f,f,f,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,X,X,X,X,
        f,f,f,f,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,
        f,f,f,f,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,
        X,X,X,X,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,
        X,X,X,X,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,_,_,_,_,_,_,
        w,w,w,w,_,_,_,_,_,_,o,o,_,_,_,_,X,X,_,_,_,_,_,_,X,X,_,_,_,_,_,_,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        w,w,w,w,_,_,_,_,_,_,o,o,_,_,_,_,X,X,_,_,_,_,_,_,X,X,_,_,_,_,_,_,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        w,w,w,w,_,_,_,_,_,_,o,o,_,_,_,_,X,X,_,_,_,_,_,_,X,X,_,_,_,_,_,_,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        w,w,w,w,_,_,_,_,_,_,o,o,_,_,_,_,X,X,_,_,_,_,_,_,X,X,_,_,_,_,_,_,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,_,_,_,_,_,_,w,w,w,w,w,w,w,w,
        _,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,_,_,_,_,_,_,w,w,w,w,w,w,w,w,
        _,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,o,o,o,o,o,o,_,_,_,_,_,_,w,w,w,w,w,w,w,w,
        _,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,o,o,o,o,o,o,_,_,_,_,_,_,w,w,w,w,w,w,w,w,
        _,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,f,f,f,f,
        _,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,f,f,f,f,
        _,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,f,f,f,f,
        _,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,f,f,f,f,
        f,f,f,f,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,f,f,f,f,f,f,f,f,
        f,f,f,f,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,f,f,f,f,f,f,f,f,
        f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,
        f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,
        X,X,X,X,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,X,X,X,X,
        X,X,X,X,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,X,X,X,X,
        X,X,X,X,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,X,X,X,X,
        X,X,X,X,f,f,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,X,X,X,X,]
    [
        _,_,_,_,_,_,_,_,_,_,_,_,w,w,w,w,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,w,w,w,w,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,w,w,w,w,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,w,w,w,w,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,w,w,w,w,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,w,w,w,w,_,_,_,_,_,_,_,_,X,X,X,X,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,w,w,w,w,_,_,_,_,o,o,o,o,X,X,X,X,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,w,w,w,w,_,_,_,_,o,o,o,o,X,X,X,X,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        X,X,X,X,_,_,_,_,o,o,o,o,w,w,w,w,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        X,X,X,X,_,_,_,_,o,o,o,o,w,w,w,w,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,o,o,o,o,w,w,w,w,_,_,_,_,X,X,X,X,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,o,o,o,o,w,w,w,w,_,_,_,_,X,X,X,X,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,o,o,o,o,w,w,w,w,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,o,o,o,o,w,w,w,w,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,o,o,o,o,w,w,w,w,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,o,o,o,o,w,w,w,w,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,
        o,o,o,o,_,_,_,_,o,o,o,o,w,w,w,w,w,w,w,w,_,_,_,_,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,_,_,_,_,_,_,_,_,o,o,o,o,
        o,o,o,o,_,_,_,_,o,o,o,o,w,w,w,w,w,w,w,w,_,_,_,_,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,_,_,_,_,_,_,_,_,o,o,o,o,
        o,o,o,o,_,_,_,_,o,o,o,o,w,w,w,w,w,w,w,w,_,_,_,_,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,_,_,_,_,_,_,_,_,o,o,o,o,
        o,o,o,o,_,_,_,_,o,o,o,o,w,w,w,w,w,w,w,w,_,_,_,_,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,_,_,_,_,_,_,_,_,o,o,o,o,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,w,w,w,w,_,_,_,_,X,X,X,X,X,X,X,X,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,w,w,w,w,_,_,_,_,X,X,X,X,X,X,X,X,
        _,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,w,w,w,w,_,_,_,_,_,_,_,_,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,_,_,_,_,w,w,w,w,_,_,_,_,_,_,_,_,_,_,_,_,
        o,o,o,o,o,o,o,o,_,_,o,o,o,o,o,o,_,_,_,_,X,X,X,X,f,f,f,f,f,f,f,f,f,f,f,f,w,w,w,w,_,_,_,_,_,_,_,_,_,_,_,_,
        o,o,o,o,o,o,o,o,_,_,o,o,o,o,o,o,_,_,_,_,X,X,X,X,f,f,f,f,f,f,f,f,f,f,f,f,w,w,w,w,_,_,_,_,_,_,_,_,_,_,_,_,
        o,o,o,o,o,o,o,o,_,_,o,o,o,o,o,o,_,_,_,_,X,X,X,X,f,f,f,f,f,f,f,f,f,f,f,f,w,w,w,w,_,_,_,_,o,o,o,o,o,o,o,o,
        o,o,o,o,o,o,o,o,_,_,o,o,o,o,o,o,_,_,_,_,X,X,X,X,f,f,f,f,f,f,f,f,f,f,f,f,w,w,w,w,_,_,_,_,o,o,o,o,o,o,o,o,
        o,o,o,o,_,_,_,_,_,_,o,o,_,_,_,_,_,_,_,_,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,w,w,w,w,_,_,_,_,o,o,o,o,_,_,_,_,
        o,o,o,o,_,_,_,_,_,_,o,o,_,_,_,_,_,_,_,_,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,w,w,w,w,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,_,_,_,_,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,w,w,w,w,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,_,_,_,_,o,o,o,o,f,f,f,f,f,f,f,f,f,f,f,f,w,w,w,w,_,_,_,_,o,o,o,o,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,f,f,f,f,_,_,_,_,w,w,w,w,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,f,f,f,f,_,_,_,_,w,w,w,w,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,_,_,_,_,f,f,f,f,_,_,_,_,w,w,w,w,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,o,o,o,o,o,o,o,o,o,o,o,o,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,o,o,o,o,_,_,_,_,X,X,X,X,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,w,w,w,w,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,w,w,w,w,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,w,w,w,w,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,o,o,o,o,_,_,_,_,o,o,o,o,_,_,_,_,_,_,o,o,o,o,o,o,o,o,_,_,_,_,_,_,w,w,w,w,f,f,f,f,f,f,f,f,f,f,f,f,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,w,w,w,w,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,w,w,w,w,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,w,w,w,w,_,_,_,_,f,f,f,f,_,_,_,_,
        _,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,o,o,_,_,_,_,o,o,_,_,_,_,_,_,w,w,w,w,_,_,_,_,f,f,f,f,_,_,_,_,]]
