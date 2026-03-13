import { useState, useEffect } from 'react';

const LUXURY_CARS = [
    {
        id: 'bugatti-chiron',
        name: 'Bugatti Chiron Super Sport',
        arabic: 'بوغاتي شيرون',
        price: 8000,
        power: '1600 HP',
        origin: '🇫🇷 فرنسا',
        category: 'Hyper Car',
        badge: '👑 الأغلى',
        color: '#1e3a8a',
        accent: '#3b82f6',
        img: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&w=1200&q=90',
        desc: 'المركبة الأسرع في العالم — 490 كم/ساعة. 8 لترات W16 توربو رباعي. تجربة لا مثيل لها.',
        specs: [
            { label: 'السرعة القصوى', value: '490 km/h' },
            { label: 'القوة', value: '1,600 HP' },
            { label: '0→100', value: '2.4 ث' },
            { label: 'الوزن', value: '1,995 كغ' },
        ]
    },
    {
        id: 'ferrari-sf90',
        name: 'Ferrari SF90 Stradale',
        arabic: 'فيراري SF90',
        price: 5500,
        power: '1000 HP',
        origin: '🇮🇹 إيطاليا',
        category: 'Super Car',
        badge: '🔴 الأيقونة',
        color: '#991b1b',
        accent: '#ef4444',
        img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=90',
        desc: 'تحفة فنية إيطالية. هجينة بثلاثة محركات كهربائية وV8 تربو مزدوج. الأداء المطلق.',
        specs: [
            { label: 'السرعة القصوى', value: '340 km/h' },
            { label: 'القوة', value: '1,000 HP' },
            { label: '0→100', value: '2.5 ث' },
            { label: 'المحرك', value: 'V8 هجين' },
        ]
    },
    {
        id: 'mercedes-g63',
        name: 'Mercedes-AMG G63',
        arabic: 'مرسيدس G63',
        price: 3500,
        power: '585 HP',
        origin: '🇩🇪 ألمانيا',
        category: 'Luxury SUV',
        badge: '💎 الأسطورة',
        color: '#1c1917',
        accent: '#d4af37',
        img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=90',
        desc: 'أيقونة الفخامة الألمانية. V8 BiTurbo مع نظام الدفع الرباعي الدائم 4MATIC.',
        specs: [
            { label: 'السرعة القصوى', value: '220 km/h' },
            { label: 'القوة', value: '585 HP' },
            { label: '0→100', value: '4.5 ث' },
            { label: 'المحرك', value: 'V8 BiTurbo' },
        ]
    },
    {
        id: 'lambo-urus',
        name: 'Lamborghini Urus Performante',
        arabic: 'لامبورغيني أوروس',
        price: 4500,
        power: '666 HP',
        origin: '🇮🇹 إيطاليا',
        category: 'Super SUV',
        badge: '🐂 وحش',
        color: '#78350f',
        accent: '#f59e0b',
        img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=90',
        desc: 'أسرع SUV في العالم — V8 مزدوج التوربو بقوة 666 حصاناً. الفخامة والقوة في جسد واحد.',
        specs: [
            { label: 'السرعة القصوى', value: '306 km/h' },
            { label: 'القوة', value: '666 HP' },
            { label: '0→100', value: '3.3 ث' },
            { label: 'المحرك', value: 'V8 Twin Turbo' },
        ]
    },
    {
        id: 'rolls-cullinan',
        name: 'Rolls-Royce Cullinan',
        arabic: 'رولز رويس كولينان',
        price: 6000,
        power: '571 HP',
        origin: '🇬🇧 بريطانيا',
        category: 'Ultra Luxury SUV',
        badge: '🎩 الملوك',
        color: '#1e1b4b',
        accent: '#8b5cf6',
        img: 'https://images.unsplash.com/photo-1631295387526-d0463f5e6b3a?auto=format&fit=crop&w=1200&q=90',
        desc: 'تجربة السفر الملكية المطلقة. ستة أشهر من الصنع اليدوي في كل سيارة.',
        specs: [
            { label: 'السرعة القصوى', value: '250 km/h' },
            { label: 'القوة', value: '571 HP' },
            { label: 'المقاعد', value: 'جلد طبيعي' },
            { label: 'المحرك', value: 'V12 6.75L' },
        ]
    },
    {
        id: 'porsche-911',
        name: 'Porsche 911 GT3 RS',
        arabic: 'بورشه 911',
        price: 4000,
        power: '525 HP',
        origin: '🇩🇪 ألمانيا',
        category: 'Sports Car',
        badge: '⚡ بطل',
        color: '#14532d',
        accent: '#22c55e',
        img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=90',
        desc: 'الهندسة الألمانية في أنقى صورها. موتور مسطح 4.0L طبيعي الهواء — إحساس لاتشعر به في أي سيارة أخرى.',
        specs: [
            { label: 'السرعة القصوى', value: '296 km/h' },
            { label: 'القوة', value: '525 HP' },
            { label: '0→100', value: '3.2 ث' },
            { label: 'المحرك', value: 'Flat-6 4.0L' },
        ]
    },
];

function CarDetailModal({ car, onClose }: { car: any; onClose: () => void }) {
    const phone = '+212608028793';
    const msg = encodeURIComponent(`مرحباً! أود الاستفسار عن استئجار سيارة ${car.arabic} (${car.name}). السعر: ${car.price} درهم/يوم`);
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', animation: 'fadeIn 0.3s ease',
        }} onClick={onClose}>
            <div style={{
                maxWidth: 800, width: '100%', background: '#0a0a0a',
                border: `1px solid ${car.accent}44`,
                borderRadius: 28, overflow: 'hidden',
                boxShadow: `0 0 60px ${car.accent}22, 0 40px 80px rgba(0,0,0,0.8)`,
            }} onClick={e => e.stopPropagation()}>
                <div style={{ position: 'relative', height: 320 }}>
                    <img src={car.img} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, #0a0a0a 0%, transparent 60%)` }} />
                    <button onClick={onClose} style={{
                        position: 'absolute', top: '1rem', right: '1rem', width: 36, height: 36,
                        borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none',
                        color: '#fff', fontSize: '1rem', cursor: 'pointer',
                    }}>✕</button>
                    <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                        <div style={{ fontSize: '0.75rem', color: car.accent, fontWeight: 700, marginBottom: 4 }}>{car.badge} · {car.origin}</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>{car.name}</div>
                    </div>
                </div>
                <div style={{ padding: '2rem' }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.05rem' }}>{car.desc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                        {car.specs.map((s: any) => (
                            <div key={s.label} style={{
                                background: 'rgba(255,255,255,0.04)', border: `1px solid ${car.accent}22`,
                                borderRadius: 12, padding: '0.8rem 1rem',
                            }}>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>{s.label}</div>
                                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: car.accent }}>{s.value}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>السعر اليومي</div>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: car.accent }}>{car.price.toLocaleString()} <span style={{ fontSize: '0.85rem' }}>درهم / يوم</span></div>
                        </div>
                        <a href={`https://wa.me/${phone}?text=${msg}`} target="_blank" rel="noreferrer" style={{
                            padding: '0.9rem 2rem', borderRadius: 12, textDecoration: 'none',
                            background: `linear-gradient(45deg, ${car.color}, ${car.accent})`,
                            color: '#fff', fontWeight: 800, fontSize: '1rem',
                            boxShadow: `0 8px 24px ${car.accent}44`,
                        }}>
                            📲 احجز الآن عبر واتساب
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LuxuryCollection() {
    const [selected, setSelected] = useState<any>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const phone = '+212608028793';
    const WA = `https://wa.me/${phone}?text=${encodeURIComponent('مرحباً! أود الاستفسار عن المجموعة الفاخرة من السيارات.')}`;

    return (
        <div dir="rtl" style={{ background: '#050505', color: '#fff', fontFamily: "'Cairo', sans-serif", minHeight: '100vh', overflowX: 'hidden' }}>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
                background: scrollY > 60 ? 'rgba(5,5,5,0.97)' : 'transparent',
                backdropFilter: scrollY > 60 ? 'blur(24px)' : 'none',
                borderBottom: scrollY > 60 ? '1px solid rgba(212,175,55,0.1)' : 'none',
                transition: 'all 0.4s ease',
                padding: '0 2rem',
                height: scrollY > 60 ? '70px' : '90px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src="/images/logo.png" alt="Nour Coches" style={{ height: scrollY > 60 ? 46 : 58, width: 'auto', transition: 'height 0.4s', filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.4))' }} />
                    <div>
                        <div style={{ fontWeight: 900, fontSize: '1rem', color: '#d4af37' }}>نور كوتشيس</div>
                        <div style={{ fontSize: '0.45rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>LUXURY COLLECTION</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
                        ← الموقع الرئيسي
                    </a>
                    <a href={WA} target="_blank" rel="noreferrer" style={{
                        background: 'linear-gradient(45deg, #b8860b, #d4af37)', color: '#000',
                        padding: '0.55rem 1.4rem', borderRadius: 8, textDecoration: 'none',
                        fontWeight: 800, fontSize: '0.8rem',
                    }}>📲 احجز الآن</a>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Video-like background using multiple layered images */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&w=1800&q=80)`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    transform: `scale(1.05) translateY(${scrollY * 0.3}px)`,
                    transition: 'transform 0.1s linear',
                    filter: 'brightness(0.25)',
                }} />
                {/* Gold gradient overlays */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.15) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', zIndex: 1, background: 'linear-gradient(to top, #050505, transparent)' }} />

                {/* Hero content */}
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '4px', color: '#d4af37', marginBottom: '1.5rem', animation: 'fadeInDown 1s ease both' }}>
                        — NOUR COCHES · LUXURY COLLECTION —
                    </div>
                    <h1 style={{
                        fontWeight: 900, fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        lineHeight: 1.05, marginBottom: '1.5rem',
                        animation: 'fadeInDown 1s 0.2s ease both',
                    }}>
                        المجموعة <br />
                        <span style={{
                            background: 'linear-gradient(90deg, #b8860b, #f5d060, #b8860b)',
                            backgroundSize: '200%',
                            WebkitBackgroundClip: 'text', backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'shimmer 3s infinite linear',
                        }}>الأسطورية</span>
                    </h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto 3rem',
                        lineHeight: 1.8, fontSize: '1.1rem',
                        animation: 'fadeIn 1s 0.5s ease both',
                    }}>
                        استمتع بأرقى السيارات في العالم — بوغاتي، فيراري، رولز رويس، لامبورغيني — كلها متاحة بطنجة.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeIn 1s 0.7s ease both' }}>
                        <a href="#collection" style={{
                            padding: '1rem 2.5rem', borderRadius: 12, textDecoration: 'none',
                            background: 'linear-gradient(45deg, #b8860b, #d4af37)', color: '#000',
                            fontWeight: 800, fontSize: '1rem',
                        }}>اكتشف المجموعة ↓</a>
                        <a href={WA} target="_blank" rel="noreferrer" style={{
                            padding: '1rem 2.5rem', borderRadius: 12, textDecoration: 'none',
                            background: 'transparent', color: '#fff',
                            fontWeight: 700, fontSize: '1rem',
                            border: '1px solid rgba(255,255,255,0.2)',
                        }}>تواصل معنا 📞</a>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '4rem', flexWrap: 'wrap', animation: 'fadeIn 1s 1s ease both' }}>
                        {[['6+', 'سيارة أسطورية'], ['VIP', 'خدمة شخصية'], ['24/7', 'دعم فوري'], ['طنجة', 'توصيل مجاني']].map(([v, l]) => (
                            <div key={l} style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#d4af37' }}>{v}</div>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COLLECTION GRID ── */}
            <section id="collection" style={{ padding: '7rem 2rem' }}>
                <div style={{ maxWidth: 1300, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <div style={{ color: '#d4af37', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '3px', marginBottom: '1rem' }}>— EXCLUSIVE FLEET —</div>
                        <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
                            أسطول{' '}
                            <span style={{ background: 'linear-gradient(90deg,#b8860b,#d4af37)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>الحلم</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 500, margin: '0 auto' }}>كل سيارة قصة، كل رحلة ذكرى لا تُنسى</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem' }}>
                        {[...LUXURY_CARS].sort((a, b) => a.price - b.price).map((car, i) => (
                            <div key={car.id}
                                onClick={() => setSelected(car)}
                                style={{
                                    background: '#0d0d0d', borderRadius: 24,
                                    border: `1px solid ${car.accent}22`,
                                    overflow: 'hidden', cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)',
                                    animation: `fadeInUp 0.6s ${i * 0.1}s ease both`,
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = 'translateY(-8px)';
                                    el.style.borderColor = `${car.accent}55`;
                                    el.style.boxShadow = `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ${car.accent}33`;
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = '';
                                    el.style.borderColor = `${car.accent}22`;
                                    el.style.boxShadow = '';
                                }}
                            >
                                {/* Image */}
                                <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                                    <img src={car.img} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                                        onMouseLeave={e => (e.currentTarget.style.transform = '')}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, #0d0d0d 0%, transparent 55%)` }} />
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${car.accent}, transparent)` }} />
                                    <div style={{
                                        position: 'absolute', top: 14, right: 14,
                                        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                                        padding: '0.25rem 0.7rem', borderRadius: 20,
                                        fontSize: '0.75rem', fontWeight: 700, color: car.accent,
                                        border: `1px solid ${car.accent}33`,
                                    }}>{car.badge}</div>
                                    <div style={{
                                        position: 'absolute', top: 14, left: 14,
                                        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                                        padding: '0.25rem 0.7rem', borderRadius: 20,
                                        fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                    }}>{car.category}</div>
                                </div>

                                {/* Info */}
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>{car.origin}</div>
                                            <h3 style={{ fontWeight: 900, fontSize: '1.2rem', margin: 0 }}>{car.arabic}</h3>
                                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', margin: '2px 0 0' }}>{car.name}</p>
                                        </div>
                                        <div style={{
                                            background: `${car.accent}15`, border: `1px solid ${car.accent}33`,
                                            borderRadius: 10, padding: '0.3rem 0.6rem', textAlign: 'center',
                                        }}>
                                            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}>القوة</div>
                                            <div style={{ fontWeight: 900, fontSize: '0.85rem', color: car.accent }}>{car.power}</div>
                                        </div>
                                    </div>

                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.83rem', lineHeight: 1.6, margin: '0.8rem 0 1.2rem' }}>{car.desc}</p>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>ابتداءً من</div>
                                            <div style={{ fontWeight: 900, fontSize: '1.6rem', color: car.accent }}>
                                                {car.price.toLocaleString()} <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>درهم/يوم</span>
                                            </div>
                                        </div>
                                        <button style={{
                                            background: `linear-gradient(45deg, ${car.color}, ${car.accent})`,
                                            border: 'none', color: '#fff', fontWeight: 700,
                                            padding: '0.65rem 1.2rem', borderRadius: 10,
                                            cursor: 'pointer', fontSize: '0.85rem',
                                            fontFamily: "'Cairo', sans-serif",
                                        }}>
                                            عرض التفاصيل →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <section style={{
                padding: '6rem 2rem', textAlign: 'center',
                background: 'linear-gradient(135deg, #0d0a00, #1a1100, #0d0a00)',
                borderTop: '1px solid rgba(212,175,55,0.1)',
                borderBottom: '1px solid rgba(212,175,55,0.1)',
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👑</div>
                    <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: '1rem' }}>
                        عيش التجربة التي تستحقها
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
                        لا تنتظر. تواصل معنا الآن وسنرتب لك أفضل تجربة قيادة في طنجة.
                    </p>
                    <a href={WA} target="_blank" rel="noreferrer" style={{
                        display: 'inline-block', padding: '1.1rem 3rem', borderRadius: 14,
                        background: 'linear-gradient(45deg,#b8860b,#d4af37)', color: '#000',
                        fontWeight: 900, fontSize: '1.1rem', textDecoration: 'none',
                        boxShadow: '0 12px 32px rgba(212,175,55,0.35)',
                    }}>
                        📲 احجز سيارة الأحلام الآن
                    </a>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
                    © 2026 نور كوتشيس · Luxury Collection · طنجة، المغرب
                </div>
            </footer>

            {/* ── MODAL ── */}
            {selected && <CarDetailModal car={selected} onClose={() => setSelected(null)} />}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }
                body { font-family: 'Cairo', sans-serif; overflow-x: hidden; background: #050505; }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: #050505; }
                ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 3px; }
                @keyframes fadeIn { from{opacity:0} to{opacity:1} }
                @keyframes fadeInDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:none} }
                @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
                @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
            `}</style>
        </div>
    );
}
