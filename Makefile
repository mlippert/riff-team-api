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
LINT_LOG = logs/lint.log
TEST_LOG = logs/test.log

# eslint has a --quiet option to only report on errors, not warnings, but tslint does not.
LINT_OPTIONS =
LINT_FORMAT = stylish

.DELETE_ON_ERROR :
.PHONY : help up rebuild dev-server dev-rtc start-dev

help :
	@echo ""                                                                           ; \
	echo "Useful targets in this riff-team-api Makefile:"                              ; \
	echo "- build      : compile the sources into the dist directory"                  ; \
	echo "- lint       : run lint over the sources & tests; display results to stdout" ; \
	echo "- lint-log   : run lint concise diffable output to $(LINT_LOG)"              ; \
	echo "- clean      : remove all files created by building"                         ; \
	echo "- run        : start the riff-team-api"                                      ; \
	echo "- vim-lint   : run lint in format consumable by vim quickfix"                ; \
	echo ""


.PHONY : all build doc lint test clean clean-build clean-doc update-deps list-outdated

all : build test doc

build :
	@($(TYPESCRIPT) && echo "Build succeeded") | tee $(BUILD_LOG)

lint-log: LINT_OPTIONS = --out $(LINT_LOG)
lint-log: LINT_FORMAT = msbuild
vim-lint: LINT_FORMAT = msbuild
lint vim-lint lint-log:
	$(LINT) $(LINT_OPTIONS) --format $(LINT_FORMAT) --project .

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
