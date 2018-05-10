#
# Makefile to build, test and run the riff-team-api
#

# Search path for targets and prerequisites
#VPATH = src

# Test if a variable has a value, callable from a recipe
# like $(call ndef,ENV)
ndef = $(if $(value $(1)),,$(error $(1) not set))

APP_BUILD = $(shell git describe)

TYPESCRIPT = ./node_modules/.bin/tsc
LINT = ./node_modules/.bin/tslint
BUNYAN = ./node_modules/.bin/bunyan

BUILD_LOG = logs/build.log

.DELETE_ON_ERROR :
.PHONY : help up rebuild dev-server dev-rtc start-dev

help :
	@echo ""                                                                     ; \
	echo "Useful targets in this riff-team-api Makefile:"                        ; \
	echo "- build      : compile the sources into the dist directory"            ; \
	echo "- lint       : lint all of the source files"                           ; \
	echo "- clean      : remove all files created by building"                   ; \
	echo "- run        : start the riff-team-api"                                ; \
	echo "- dev-server : start a dev container for the rhythm-server"            ; \
	echo "- dev-rtc    : start a dev container for the rhythm-rtc"               ; \
	echo ""


.PHONY : all build doc lint test clean clean-build clean-doc update-deps list-outdated

all : build test doc

build :
	@($(TYPESCRIPT) && echo "Build succeeded") | tee $(BUILD_LOG)

lint :
	$(LINT) --project .

doc :

test :

clean : clean-build

clean-build :
	-rm -rf dist/*

clean-doc :

run :
	node dist/app.js 2>&1 | $(BUNYAN)

update-deps :
# TODO: as this was copied from the Makefile of another project test this to see if
# it is still needed.
#
# yarn upgrade should do this, but currently (v 1.3.2) doesn't update the
# package json correctly. Individually doing a yarn add w/ the correct switch
# does work, so for now...
	yarn add @types/config @types/express @types/node babel-cli babel-preset-env typescript --dev
	yarn add bunyan config express js-yaml

list-outdated :
	@yarn outdated
