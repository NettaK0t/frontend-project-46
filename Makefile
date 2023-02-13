lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

install:	
	npm ci
	
publish:
	npm publish --dry-run