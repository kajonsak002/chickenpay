import { getProductsByCategory } from "../lib/products";
import AppsClient from "./AppsClient";

export default async function AppsPage() {
    const categories = await getProductsByCategory();
    return <AppsClient categories={categories} />;
}
