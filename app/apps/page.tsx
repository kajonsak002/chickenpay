import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { getProductsByCategory } from "../lib/products";
import AppsClient from "./AppsClient";

export default async function AppsPage() {
    const categories = await getProductsByCategory();
    return (
        <>
            <Navbar />
            <AppsClient categories={categories} />
            <Footer />
        </>
    );
}
