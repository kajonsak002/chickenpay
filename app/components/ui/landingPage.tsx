import Navbar from "./Navbar"
import Footer from "./Footer"
import Banner from "./Banner"
import PremiumAppsGrid from "./PremiumAppsGrid"
import { getProductsByCategory } from "@/app/lib/products"

export default async function LandingPage() {
    const categories = await getProductsByCategory();

    return (
        <main className="bg-[var(--bg-primary)] min-h-screen">
            <Navbar />
            <Banner />
            <PremiumAppsGrid categories={categories} />
            <Footer />
        </main>
    );
}