This app was built with Node-ts (so that there's no need to compile to JS), soon SWC will be added to improve performance.

To start the server, use the following command:

--->npx ts-node --swc App.ts

The second command will watch for changes and restart express.

---> execute http://localhost:3001/products to get all products

---> execute http://localhost:3001/products?limit=5 to limit the result ( right now, there are only 5 products)

---> execute http://localhost:3001/products/{id} to GET a product by ID

---> execute http://localhost:3001/products/{id} to POST a product

---> execute http://localhost:3001/products/{id} to DELETE a product

CART ROUTES

---> execute http://localhost:3001/api/carts to POST a new cart

---> execute http://localhost:3001/api/${cartid}/product/${productid} to POST a product to an existing cart

---> execute http://localhost:3001/api/carts/${id} to GET a cart by ID
