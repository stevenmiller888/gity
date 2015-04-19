
default: node_modules test-style

test: node_modules
	@./node_modules/.bin/mocha test \
		--reporter spec

test-style:
	@./node_modules/.bin/jscs lib test

node_modules: package.json
	@npm install

clean:
	@rm -rf *.log

distclean:
	@rm -rf node_modules

.PHONY: test test-style