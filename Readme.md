This app is built with Node-ts (so that i don't need to compile to JS), soon i will add SWC for performance issues

To start the server, use the following commands:

npx ts-node App.ts
OR
npx ts-node-dev App.ts, the second command will watch for changes and restart express

---> execute http://localhost:3001/products to get all products

---> execute http://localhost:3001/products?limit=5 to limit the result ( right now, there are only 5 products)

---> execute http://localhost:3001/products/{id} to get a product by ID
