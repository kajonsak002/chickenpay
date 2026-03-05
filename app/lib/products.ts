export interface Product {
    id: string;
    name: string;
    price: string;        // ราคาตัวแทน (ทุน)
    retailPrice: string;  // ราคาขายปลีก
    img: string;
    stock: string;
    status: string;
    category: string;
}

export interface CategoryGroup {
    name: string;
    img: string;
    products: Product[];
    lowestPrice: number;       // ราคาขายต่ำสุด
    lowestAgentPrice: number;  // ราคาทุนต่ำสุด
}

const rawProducts: Product[] = [
    { id: "21", name: "Netflix 4K /1วัน (จอส่วนตัว)", price: "7.00", retailPrice: "10.00", img: "https://byshop.me/api/img/app/netflix.png", stock: "0", status: "สินค้าหมด", category: "Netflix" },
    { id: "32", name: "Netflix 4K /1วัน (TV) (จอส่วนตัว)", price: "13.00", retailPrice: "19.00", img: "https://byshop.me/api/img/app/netflix.png", stock: "0", status: "สินค้าหมด", category: "Netflix" },
    { id: "2", name: "Netflix 4K /7วัน (จอส่วนตัว)", price: "39.00", retailPrice: "49.00", img: "https://byshop.me/api/img/app/netflix.png", stock: "23", status: "พร้อมจำหน่าย", category: "Netflix" },
    { id: "31", name: "Netflix 4K /7วัน (TV) (จอส่วนตัว)", price: "49.00", retailPrice: "59.00", img: "https://byshop.me/api/img/app/netflix.png", stock: "63", status: "พร้อมจำหน่าย", category: "Netflix" },
    { id: "1", name: "Netflix 4K /30วัน (จอส่วนตัว)", price: "97.00", retailPrice: "129.00", img: "https://byshop.me/api/img/app/netflix.png", stock: "0", status: "สินค้าหมด", category: "Netflix" },
    { id: "23", name: "Netflix 4K /30วัน (TV) (จอส่วนตัว)", price: "159.00", retailPrice: "179.00", img: "https://byshop.me/api/img/app/netflix.png", stock: "0", status: "สินค้าหมด", category: "Netflix" },
    { id: "6", name: "Youtube Premium/30วัน (เมลร้าน)", price: "20.00", retailPrice: "59.00", img: "https://byshop.me/api/img/app/yt.png", stock: "0", status: "สินค้าหมด", category: "Youtube" },
    { id: "7", name: "Youtube Premium/30วัน (เมลตัวเอง)", price: "20.00", retailPrice: "59.00", img: "https://byshop.me/api/img/app/yt.png", stock: "13", status: "พร้อมจำหน่าย", category: "Youtube" },
    { id: "5", name: "Disney+ /30วัน (จอส่วนตัว) (ทุกอุปกรณ์)", price: "79.00", retailPrice: "289.00", img: "https://byshop.me/api/img/app/disney.png", stock: "23", status: "พร้อมจำหน่าย", category: "Disney" },
    { id: "9", name: "MONOMAX/30วัน (จอส่วนตัว)", price: "65.00", retailPrice: "79.00", img: "https://byshop.me/api/img/app/monomax.png", stock: "0", status: "สินค้าหมด", category: "MonoMax" },
    { id: "10", name: "MONOMAX/30วัน (จอส่วนตัว + พรีเมียร์ลีก)", price: "199.00", retailPrice: "219.00", img: "https://byshop.me/api/img/app/monomax.png", stock: "0", status: "สินค้าหมด", category: "MonoMax" },
    { id: "35", name: "HBO MAX/30วัน (HD) (จอส่วนตัว)", price: "49.00", retailPrice: "59.00", img: "https://byshop.me/buy/img/img_app/HB.png", stock: "0", status: "สินค้าหมด", category: "MAX" },
    { id: "11", name: "HBO MAX/30วัน (4K) (จอส่วนตัว)", price: "79.00", retailPrice: "99.00", img: "https://byshop.me/buy/img/img_app/HB.png", stock: "34", status: "พร้อมจำหน่าย", category: "MAX" },
    { id: "15", name: "Amazon Prime Video/30วัน", price: "45.00", retailPrice: "59.00", img: "https://byshop.me/api/img/app/pv.png", stock: "23", status: "พร้อมจำหน่าย", category: "Prime" },
    { id: "37", name: "VIU Premium/7วัน", price: "5.00", retailPrice: "10.00", img: "https://byshop.me/api/img/app/viu.png", stock: "0", status: "สินค้าหมด", category: "VIU" },
    { id: "12", name: "VIU Premium/30วัน", price: "15.00", retailPrice: "29.00", img: "https://byshop.me/api/img/app/viu.png", stock: "20", status: "พร้อมจำหน่าย", category: "VIU" },
    { id: "13", name: "iQIYI VIP (HD) /30วัน", price: "22.00", retailPrice: "29.00", img: "https://byshop.me/api/img/app/iq.png", stock: "84", status: "พร้อมจำหน่าย", category: "iQIYI" },
    { id: "38", name: "iQIYI VIP (4K) /30วัน", price: "32.00", retailPrice: "59.00", img: "https://byshop.me/api/img/app/iq.png", stock: "27", status: "พร้อมจำหน่าย", category: "iQIYI" },
    { id: "14", name: "WeTV VIP /30วัน", price: "20.00", retailPrice: "29.00", img: "https://byshop.me/api/img/app/wetv.png", stock: "49", status: "พร้อมจำหน่าย", category: "Wetv" },
    { id: "18", name: "TrueID+ /30วัน", price: "25.00", retailPrice: "39.00", img: "https://byshop.me/api/img/app/trueid.png", stock: "0", status: "สินค้าหมด", category: "TrueID" },
    { id: "20", name: "Bilibili /30วัน", price: "25.00", retailPrice: "29.00", img: "https://byshop.me/api/img/app/bb.png", stock: "81", status: "พร้อมจำหน่าย", category: "Bilibili" },
    { id: "26", name: "CH3 Plus /30วัน (จอแชร์)", price: "49.00", retailPrice: "59.00", img: "https://byshop.me/api/img/app/ch3.png", stock: "0", status: "สินค้าหมด", category: "CH3" },
    { id: "34", name: "CH3 Plus /30วัน (จอส่วนตัว)", price: "79.00", retailPrice: "119.00", img: "https://byshop.me/api/img/app/ch3.png", stock: "0", status: "สินค้าหมด", category: "CH3" },
    { id: "24", name: "YOUKU VIP /30วัน", price: "29.00", retailPrice: "59.00", img: "https://byshop.me/api/img/app/&n.png", stock: "14", status: "พร้อมจำหน่าย", category: "YOUKU" },
    { id: "33", name: "oneD /30วัน", price: "39.00", retailPrice: "59.00", img: "https://byshop.me/api/img/app/oned.png", stock: "0", status: "สินค้าหมด", category: "oneD" },
    { id: "50", name: "Capcut Pro /7วัน", price: "19.00", retailPrice: "29.00", img: "https://byshop.me/buy/img/img_app/cc.png", stock: "0", status: "สินค้าหมด", category: "Capcut" },
    { id: "51", name: "Canva Pro /30วัน", price: "39.00", retailPrice: "59.00", img: "https://byshop.me/buy/img/img_app/ca.png", stock: "0", status: "สินค้าหมด", category: "Canva" },
    { id: "52", name: "Gemini AI Pro /30วัน", price: "79.00", retailPrice: "99.00", img: "https://byshop.me/buy/img/img_app/gmn.png", stock: "1", status: "พร้อมจำหน่าย", category: "Geminipro" },
    { id: "54", name: "ChatGPT Plus /30วัน", price: "79.00", retailPrice: "99.00", img: "https://byshop.me/buy/img/img_app/gpt.png", stock: "0", status: "สินค้าหมด", category: "ChatGPT" },
];

// Group by category — ใช้ราคาขายปลีก (retailPrice) เป็นราคาหลัก
export function getProductsByCategory(): CategoryGroup[] {
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
            img: products[0].img,
            products,
            lowestPrice,
            lowestAgentPrice,
        });
    }

    return groups;
}

export function getAllProducts(): Product[] {
    return rawProducts;
}

export function getProductById(id: string): Product | undefined {
    return rawProducts.find((p) => p.id === id);
}

export function getProductsByStatus(status: string): Product[] {
    return rawProducts.filter((p) => p.status === status);
}
