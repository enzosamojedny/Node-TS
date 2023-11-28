import { Products } from "./models/Products";
import { randomUUID } from "crypto";
interface ProductInterface {
  _id: string;
  title: string;
  description: string;
  code: string;
  price: number;
  status: string;
  stock: number;
  category: string;
  thumbnail: string;
}
export default class ProductManager {
  constructor(public products: ProductInterface[], private path: string) {
    this.products = products;
    this.path = path;
  }

  async addProduct(product: ProductInterface) {
    product._id = randomUUID();
    const productCreated = await Products.create(product);
    return productCreated.toObject();
  }
  async getProducts() {
    return await Products.find({}).lean();
  }
  async getProductByid(productId: string): Promise<ProductInterface | null> {
    return await Products.findById(productId).lean();
  }
  async deleteProduct(productId: string): Promise<ProductInterface | null> {
    return await Products.findByIdAndDelete({ productId }).lean();
  }

  async updateProduct(
    productId: string,
    updatedProduct: Partial<ProductInterface>
  ): Promise<ProductInterface | null> {
    return await Products.findByIdAndUpdate(
      productId as string,
      updatedProduct as object,
      { new: true }
    ).lean();
  }
}
