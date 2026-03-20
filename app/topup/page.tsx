import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import TopupClient from "./TopupClient";

export const metadata = {
    title: "เติมเงิน - ChickenPay",
};

export default async function TopupPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    return (
        <main className="bg-[#030308] min-h-screen flex flex-col font-sans text-white relative overflow-hidden">
            {/* Premium Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwaC00MHY0MGg0MHpNMSAzOWgtMXYtMWgxdjF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-30 [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-1 w-full max-w-3xl mx-auto px-4 mt-5">
                    <TopupClient />
                </div>

                <Footer />
            </div>
        </main>
    );
}
