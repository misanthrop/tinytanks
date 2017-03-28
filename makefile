out ?= /tmp/tinytanks/
targets := index.html config.js levels.js game.js sprite.png
targets := $(addprefix $(out), $(targets))

all:: $(targets)

clean::
	rm -f $(targets)

$(out)%.png: %.png
	@mkdir -p $(@D)
	cp $^ $@

$(out)%.js: %.coffee
	@mkdir -p $(@D)
	coffee -p $^ >$@

$(out)%.html: %.html
	@mkdir -p $(@D)
	cp $^ $@
