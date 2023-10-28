This app is built with Node-ts (so that i don't need to compile to JS)

To start the server, use the following commands:

npx ts-node App.ts OR npx ts-node-dev App.ts, the second command will watch for changes and restart express

then execute http://localhost:3001/products to get all products
or execute http://localhost:3001/products?limit=5 to limit the result ( right now, there are only 5 products)
