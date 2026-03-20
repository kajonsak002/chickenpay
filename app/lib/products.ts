export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;        // ราคาตัวแทน (ทุน) -> map from priceVip normally, or price
    retailPrice: string;  // ราคาขายปลีก -> map from price
    img: string;          // map from imageUrl
    stock: string;        // map from stock
    status: string;       // map from isActive
    category: string;
}

export interface CategoryGroup {
    name: string;
    img: string;
    products: Product[];
    lowestPrice: number;       // ราคาขายต่ำสุด
    lowestAgentPrice: number;  // ราคาทุนต่ำสุด
}

const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

export async function getAllProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_URL}/products`, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status}`);
        }

        const data = await res.json();

        // Map backend product schema to frontend schema
        return data
            .filter((item: any) => item.category && item.category.toLowerCase() !== 'uncategorized')
            .map((item: any) => ({
                id: item.id || '',
                name: item.name || '',
                description: item.description || '',
                price: (item.priceVip !== null && item.priceVip !== undefined) ? item.priceVip.toString() : (item.price || 0).toString(),
                retailPrice: (item.price || 0).toString(),
                img: item.imageUrl || item.img || 'https://placehold.co/400x400/1e1e2d/6366f1?text=ALALAL',
                stock: (item.stock || 0).toString(),
                status: (item.isActive !== false && (item.stock || 0) > 0) ? "พร้อมจำหน่าย" : "สินค้าหมด",
                category: item.category,
            }));

    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function getProductsByCategory(): Promise<CategoryGroup[]> {
    const rawProducts = await getAllProducts();
    const categoryMap = new Map<string, Product[]>();

    for (const product of rawProducts) {
        const existing = categoryMap.get(product.category) || [];
        existing.push(product);
        categoryMap.set(product.category, existing);
    }

    const groups: CategoryGroup[] = [];
    for (const [name, products] of categoryMap) {
        const lowestPrice = Math.min(...products.map((p) => parseFloat(p.retailPrice)));
        const lowestAgentPrice = Math.min(...products.map((p) => parseFloat(p.price)));
        groups.push({
            name,
            img: products[0].img, // Use first product's image as the category image
            products,
            lowestPrice,
            lowestAgentPrice,
        });
    }

    return groups;
}

export async function getProductById(id: string): Promise<Product | undefined> {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) return undefined;

        const item = await res.json();
        if (!item.category || item.category.toLowerCase() === 'uncategorized') return undefined;

        return {
            id: item.id,
            name: item.name,
            description: item.description || '',
            price: item.priceVip ? item.priceVip.toString() : item.price.toString(),
            retailPrice: item.price.toString(),
            img: item.imageUrl || 'https://placehold.co/400x400/1e1e2d/6366f1?text=App',
            stock: item.stock.toString(),
            status: (item.isActive && item.stock > 0) ? "พร้อมจำหน่าย" : "สินค้าหมด",
            category: item.category,
        };
    } catch (error) {
        return undefined;
    }
}
