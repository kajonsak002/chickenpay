import { getAllProducts } from "../../lib/products";
import ProductClient from "./ProductClient";

export default async function ProductPage() {
    const allProducts = await getAllProducts();
    return <ProductClient allProducts={allProducts} />;
}
