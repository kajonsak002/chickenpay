import { Metadata } from 'next';
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import { getAllProducts } from "../../lib/products";
import ProductClient from "./ProductClient";

type Props = {
    params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    
    return {
        title: `ซื้อ ${decodedCategory.toUpperCase()} พรีเมียมของแท้ราคาถูก 2569`,
        description: `สั่งซื้อบัญชี ${decodedCategory} พรีเมียมราคาประหยัด ปลอดภัย รับประกันตลอดอายุการใช้งาน จัดส่งอัตโนมัติ 24 ชม. ที่ ChickenPay`,
        keywords: [decodedCategory, `ซื้อ ${decodedCategory}`, `${decodedCategory} พรีเมียม`, `${decodedCategory} ราคาถูก`, "แอปพรีเมียม"],
        openGraph: {
            title: `ซื้อ ${decodedCategory.toUpperCase()} พรีเมียม | ChickenPay`,
            description: `สั่งซื้อบัญชี ${decodedCategory} แบบพรีเมียมของแท้ 100% ปลอดภัย มีประกัน ส่งมอบไว`,
            type: "article",
        }
    };
}

export default async function ProductPage() {
    const allProducts = await getAllProducts();
    return (
        <>
            <Navbar />
            <ProductClient allProducts={allProducts} />
            <Footer />
        </>
    );
}
