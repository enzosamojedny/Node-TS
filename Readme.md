This app was built with Node-ts (so that there's no need to compile to JS), soon SWC will be added to improve performance.

To start the server, use the following commands:

npx ts-node App.ts
OR
npx ts-node-dev App.ts, the second command will watch for changes and restart express,

npx ts-node --swc App.ts
--->npx ts-node App.ts

--->npx ts-node-dev App.ts

The second command will watch for changes and restart express.

---> execute http://localhost:3001/products to get all products

---> execute http://localhost:3001/products?limit=5 to limit the result ( right now, there are only 5 products)

---> execute http://localhost:3001/products/{id} to get a product by ID
