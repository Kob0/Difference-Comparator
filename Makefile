start:
		npm install
		
publish: 
		npm publish --dry-run

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
		npx eslint .

test: 
		npm test
