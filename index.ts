// const productManager = new ProductManager([], "./src/Logs/Logs.json");
// import ProductManager from "./dao/ProductManagerFS";
import express from "express";
import CartManager from "./dao/CartManager";
import { Request, Response } from "express";
import ProductManagerMongoDB from "./dao/ProductManagerMongoDB";
const productManagerMongoDB = new ProductManagerMongoDB();
const router = express.Router();
const cartManager = new CartManager([], "./src/Logs/Cart.json");

export const Products = router.get("/products", async (req, res) => {
  try {
    const products = await productManagerMongoDB.getProducts();
    if (req.query.limit) {
      const limit = parseInt(req.query.limit as string, 10);
      const limitedProducts = products.slice(0, limit);
      res.status(200).json({ products: limitedProducts });
    } else {
      res.status(200).json({ products: products });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send({ message: error.message });
    }
  }
});

export const ProductId = router.get(
  "/products/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const products = await productManagerMongoDB.getProductById(id);
      if (products) {
        res.status(200).json({ products });
      } else {
        throw new Error(`Product with ID ${id} not found in the database`);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send({ message: error.message });
      }
    }
  }
);
export const AddProduct = router.post(
  "/products",
  async (req: Request, res: Response) => {
    try {
      const productDetails = req.body;
      if (!productDetails) {
        throw new Error("Product details not provided in the request body");
      }
      const addedProduct = await productManagerMongoDB.addProduct(
        productDetails
      );
      res.status(200).json({ product: addedProduct });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    }
  }
);
export const UpdateProduct = router.put(
  "/products/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const productToUpdate = req.body;
      if (!productToUpdate) {
        throw new Error("Product details not provided in the request body");
      }
      const updateProduct = await productManagerMongoDB.updateProduct(
        id,
        productToUpdate
      );
      res.status(200).json({ updateProduct });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    }
  }
);
export const DeleteProduct = router.delete(
  "/products/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleteProduct = await productManagerMongoDB.deleteProduct(id);
      res.status(200).json({ deleteProduct });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    }
  }
);
export const PostCart = router.post(
  "/api/carts",
  (req: Request, res: Response) => {
    try {
      const productDetails = req.body;

      if (!productDetails) {
        throw new Error("Product details not provided in the request body");
      }
      const addedProduct = cartManager.addCart(productDetails);
      res.status(200).json({ product: addedProduct });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    }
  }
);

export const GetCartId = router.get(
  "/api/carts/:id",
  (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("Product ID not provided in the request");
      }
      const idCart = cartManager.getCartById(id);
      res.status(200).json({ product: idCart });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    }
  }
);
export const PostCartProduct = router.post(
  "/api/:cartid/product/:productid",
  (req: Request, res: Response) => {
    try {
      const { cartid, productid } = req.params;
      if (!cartid || !productid) {
        throw new Error("Missing data in request");
      }
      const quantity = 1;
      const postCartProduct = cartManager.addProductToCart(
        cartid,
        productid,
        quantity
      );
      res.status(200).json({ cart: postCartProduct });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    }
  }
);
