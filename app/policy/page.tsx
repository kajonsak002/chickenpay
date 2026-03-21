import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Breadcrumb from "../components/ui/Breadcrumb";
import { Shield, FileText, Lock, Users, AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata = {
    title: "นโยบายความเป็นส่วนตัว | ChickenPay",
    description: "นโยบายความเป็นส่วนตัวและเงื่อนไขการให้บริการของ ChickenPay เพื่อความมั่นใจและปลอดภัยในการใช้งานของคุณ",
};

export default function PolicyPage() {
    return (
        <main className="bg-[var(--bg-primary)] min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
                <div className="absolute top-1/4 -right-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-3/4 -left-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
                    <Breadcrumb />

                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4 animate-fade-in">
                            <Shield className="w-4 h-4" />
                            นโยบายและเงื่อนไข | Privacy & Terms
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight">
                            นโยบายความ<span className="text-orange-500">เป็นส่วนตัว</span>
                        </h1>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
                            เราให้ความสำคัญกับข้อมูลส่วนบุคคลของคุณ และมุ่งมั่นที่จะปกป้องข้อมูลของคุณด้วยมาตรฐานสูงสุด
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                        {/* Orange top border */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

                        <div className="space-y-12 text-[var(--text-secondary)] leading-relaxed">

                            {/* Section 1 */}
                            <section>
                                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    1. การจัดเก็บข้อมูลส่วนบุคคล
                                </h2>
                                <p className="mb-4">
                                    ChickenPay จะทำการจัดเก็บข้อมูลส่วนบุคคลของท่านเพียงเท่าที่จำเป็น เพื่อใช้ในการให้บริการตามวัตถุประสงค์ของเว็บไซต์เท่านั้น โดยครอบคลุมถึง:
                                </p>
                                <ul className="space-y-3 ml-4 sm:ml-12 mb-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                        <span>ข้อมูลบัญชีผู้ใช้ เช่น อีเมล และรหัสผ่านที่ถูกเข้ารหัส</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                        <span>ประวัติการทำรายการ การสั่งซื้อ และการฝากเงิน เพื่อสิทธิประโยชน์ของท่านเอง</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Section 2 */}
                            <section>
                                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    2. การรักษาความปลอดภัยของข้อมูล
                                </h2>
                                <p className="mb-4">
                                    เว็บไซต์มีการใช้ระบบความปลอดภัยในการเข้าถึงฐานข้อมูลและการเข้ารหัส SSL (Secure Socket Layer) ป้องกันการถูกดักจับข้อมูลระหว่างการรับส่ง เพื่อให้ท่านมั่นใจได้ว่าข้อมูลส่วนตัวของท่านจะได้รับการดูแลอย่างดีที่สุด
                                </p>
                            </section>

                            {/* Section 3 */}
                            <section>
                                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    3. การนำข้อมูลไปใช้
                                </h2>
                                <p className="mb-4">
                                    เราจะไม่มีการขาย โอน หรือแจกจ่ายข้อมูลของท่านให้กับบุคคลที่สามโดยเด็ดขาด ยกเว้นกรณีที่ต้องดำเนินการตามกฎหมาย ข้อมูลของท่านจะถูกนำไปใช้ในกรณีต่อไปนี้:
                                </p>
                                <ul className="space-y-3 ml-4 sm:ml-12 mb-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                        <span>ปรับปรุงคุณภาพการให้บริการและฟังก์ชันของระบบ</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                        <span>ติดต่อสื่อสาร ตอบกลับข้อสงสัย หรือให้ความช่วยเหลือหากเกิดปัญหา</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Section 4 */}
                            <section>
                                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    4. การขอคืนเงินและรับประกัน
                                </h2>
                                <p className="mb-4">
                                    ในกรณีที่แอปพลิเคชันหรือบัญชีมีปัญหาเนื่องจากความผิดพลาดของระบบ ทางเว็บไซต์ยินดีตรวจสอบและพิจารณาคืนเงินในรูปแบบยอดคงเหลือในระบบ (Wallet Balance) หรือเคลมสินค้าบัญชีใหม่ทดแทนให้ทันทีภายในระยะเวลาที่กำหนด
                                </p>
                            </section>

                            <hr className="border-[var(--border-primary)] my-8" />

                            <div className="text-center">
                                <p className="text-sm">
                                    นโยบายความเป็นส่วนตัวนี้ มีผลบังคับใช้ตั้งแต่วันที่ 1 มกราคม 2568
                                </p>
                                <p className="text-sm mt-2 text-orange-500 font-bold">
                                    ChickenPay ขอสงวนสิทธิ์ในการแก้ไขหรือเปลี่ยนแปลงนโยบายสิทธิส่วนบุคคลนีโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
