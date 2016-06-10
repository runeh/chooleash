NODE_ENV=production ./node_modules/.bin/browserify \
  -t envify \
  -g unassertify \
  -g es2020 \
  -g uglifyify index.js | ./node_modules/.bin/uglifyjs > built.js