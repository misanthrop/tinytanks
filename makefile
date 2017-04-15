out ?= /tmp/tinytanks/
targets := index.html config.js levels.js game.js ui.css sprite.png
targets := $(addprefix $(out), $(targets))

all:: $(targets)

clean::
	rm -f $(targets)

$(out)%.png: %.png
	@mkdir -p $(@D)
	cp $^ $@

$(out)%.html: %.pug
	@mkdir -p $(@D)
	pug <$^ >$@

$(out)%.js: %.coffee
	@mkdir -p $(@D)
	coffee -p $^ >$@

$(out)%.css: %.sass
	@mkdir -p $(@D)
	sassc $^ >$@
