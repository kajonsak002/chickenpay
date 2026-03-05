import Navbar from "./Navbar"
import Footer from "./Footer"
import Banner from "./Banner"
import QuickMenu from "./QuickMenu"
import GameTopUpGrid from "./GameTopUpGrid"
import PremiumAppsGrid from "./PremiumAppsGrid"

export default function LandingPage() {
    return (
        <main className="bg-[#0f0f1a] min-h-screen">
            <Navbar />
            <Banner />
            <QuickMenu />
            <GameTopUpGrid />
            <PremiumAppsGrid />
            <Footer />
        </main>
    );
}