export default function SEOContent() {
    return (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[var(--bg-secondary)]/30 p-8 sm:p-12 rounded-3xl border border-[var(--border-primary)]">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-6">
                        ChickenPay — แหล่งรวมแอปพรีเมียมราคาประหยัด อันดับ 1
                    </h2>
                    <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                        <p>
                            ยินดีต้อนรับสู่ <span className="text-[var(--text-primary)] font-medium">ChickenPay</span> เว็บไซต์อันดับหนึ่งสำหรับคนรักความบันเทิงที่กำลังมองหา <span className="text-[var(--text-primary)] font-medium">แอปพรีเมียมราคาถูก</span> เราคือตัวแทนจำหน่ายบัญชีสตรีมมิ่งยอดนิยมระดับโลกที่พร้อมให้บริการคุณตลอด 24 ชั่วโมง
                        </p>
                        <p>
                            ไม่ว่าคุณจะเป็นแฟนตัวยงของภาพยนตร์จาก <span className="text-[var(--text-primary)] font-medium">Netflix</span>, คอเพลงที่ต้องการประหยัดค่าสมาชิก <span className="text-[var(--text-primary)] font-medium">Spotify</span> หรือผู้ที่เบื่อโฆษณาบน <span className="text-[var(--text-primary)] font-medium">YouTube Premium</span> เรามีแพ็กเกจที่ตอบโจทย์คุณแน่นอน ด้วยระบบจัดส่งอัตโนมัติ ทันใจ ปลอดภัย และมีการรับประกันการใช้งาน 100%
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-sm">
                        <h3 className="font-bold text-orange-500 mb-2">ประหยัดคุ้มค่า</h3>
                        <p className="text-xs text-[var(--text-secondary)]">สมัครแอปพรีเมียมในราคานักศึกษา แต่ได้คุณภาพพรีเมียม 100%</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-sm">
                        <h3 className="font-bold text-orange-500 mb-2">จัดส่งอัตโนมัติ</h3>
                        <p className="text-xs text-[var(--text-secondary)]">ไม่ต้องรอนาน ระบบ API อัจฉริยะ ส่งบัญชีให้คุณได้ทันทีที่ชำระเงิน</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-sm">
                        <h3 className="font-bold text-orange-500 mb-2">ปลอดภัย เชื่อใจได้</h3>
                        <p className="text-xs text-[var(--text-secondary)]">ทุกบัญชีเป็นบัญชีแท้ 100% ไม่พ่วงโปรแกรมโกง ปลอดภัยไร้กังวล</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-sm">
                        <h3 className="font-bold text-orange-500 mb-2">รับประกัน 100%</h3>
                        <p className="text-xs text-[var(--text-secondary)]">ทีมซัพพอร์ตมืออาชีพพร้อมดูแลหากเกิดปัญหา ตลอดอายุการใช้งาน</p>
                    </div>
                </div>
            </div>
            {/* Tag Cloud for SEO - Minimalist */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
                {[
                    "แอปพรีเมียม", "Netflix ราคาถูก", "YouTube Premium", 
                    "Spotify Premium", "VIU Premium", "Disney+ Hotstar", 
                    "แอปแท้ราคาถูก", "ซื้อแอปพรีเมียม", "ChickenPay Premium"
                ].map(tag => (
                    <span 
                        key={tag} 
                        className="px-4 py-1.5 rounded-full text-xs bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-blue-500/50 transition-all cursor-default"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </section>
    );
}
