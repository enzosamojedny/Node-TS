import mongoose from "mongoose";

interface ProductSchemaInterface {
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
const productSchema = new mongoose.Schema<ProductSchemaInterface>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    code: { type: String, required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
  },
  { versionKey: false, strict: "throw" }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
