import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import ContactClient from "./ContactClient";

export const metadata = {
    title: "ติดต่อเรา | ChickenPay - ศูนย์ช่วยเหลือและบริการลูกค้า",
    description: "ติดต่อเราได้ตลอด 24 ชม. ผ่านช่องทางต่างๆ เช่น Line, Facebook และแบบฟอร์มติดต่อสอบถามปัญหาการใช้งาน",
};

export default function ContactPage() {
    return (
        <main className="bg-[var(--bg-primary)] min-h-screen flex flex-col">
            <Navbar />
            <ContactClient />
            <Footer />
        </main>
    );
}
