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
        alternates: {
            canonical: `/product/${category}`,
        },
        openGraph: {
            title: `ซื้อ ${decodedCategory.toUpperCase()} พรีเมียม | ChickenPay`,
            description: `สั่งซื้อบัญชี ${decodedCategory} แบบพรีเมียมของแท้ 100% ปลอดภัย มีประกัน ส่งมอบไว`,
            type: "article",
        }
    };
}

export default async function ProductPage({ params }: Props) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const allProducts = await getAllProducts();
    
    // Create Product JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": decodedCategory.toUpperCase(),
        "description": `บัญชีพรีเมียม ${decodedCategory} ของแท้ 100%`,
        "brand": {
            "@type": "Brand",
            "name": "ChickenPay"
        },
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "THB",
            // You can replace these with dynamic prices derived from 'allProducts' based on category later
            "lowPrice": "49",
            "highPrice": "150", 
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <ProductClient allProducts={allProducts} />
            <Footer />
        </>
    );
}
