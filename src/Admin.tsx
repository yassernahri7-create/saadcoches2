import { useEffect, useState } from 'react';
import logo from './assets/logo.png';

const ADMIN_API = '/api';
const ADMIN_IMAGE_BASE = '';
const EMPTY_DATA = {
    fleet: [],
    promoCars: [],
    carsForSale: [],
    phones: { phone1: '', phone2: '', phone3: '' },
    socialLinks: { facebook: '', instagram: '', whatsapp: '' },
    posts: []
};

const authError = new Error('Authentication required');

function resolveImageUrl(url?: string) {
    if (!url) return '';
    return url.startsWith('http') ? url : ADMIN_IMAGE_BASE + url;
}

async function parseJson(res: Response) {
    return res.json().catch(() => ({}));
}

async function fetchAdminSession() {
    const res = await fetch(ADMIN_API + '/admin/session', {
        credentials: 'include'
    });
    if (!res.ok) return false;
    const data = await parseJson(res);
    return Boolean(data.authenticated);
}

async function fetchAdminData() {
    const res = await fetch(ADMIN_API + '/data?_t=' + Date.now(), {
        credentials: 'include'
    });
    if (res.status === 401) throw authError;
    if (!res.ok) throw new Error('Failed to load data');
    return res.json();
}

async function saveAdminData(nextData: any) {
    const res = await fetch(ADMIN_API + '/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(nextData)
    });
    if (res.status === 401) throw authError;
    const result = await parseJson(res);
    if (!res.ok) {
        throw new Error(result.error || 'Failed to save changes');
    }
    return result.data || nextData;
}

async function uploadAdminImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(ADMIN_API + '/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
    });
    if (res.status === 401) throw authError;
    const result = await parseJson(res);
    if (!res.ok || !result.url) {
        throw new Error(result.error || 'Upload failed');
    }
    return result.url as string;
}

function LoginScreen({ onLogin }: { onLogin: () => Promise<void> | void }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [shaking, setShaking] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch(ADMIN_API + '/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });
            const result = await parseJson(res);
            if (!res.ok) {
                throw new Error(result.error || 'Invalid username or password');
            }
            await onLogin();
        } catch (_error) {
            setError('Invalid username or password');
            setShaking(true);
            setTimeout(() => setShaking(false), 500);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div dir="rtl" style={{
            background: '#0f0505', minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cairo', sans-serif", padding: '1rem',
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
                @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
                @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
                @keyframes spinRing { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
                .login-input:focus { border-color: #0055FF !important; outline: none; }
            `}</style>

            <div style={{
                width: '100%', maxWidth: 420,
                animation: shaking ? 'shake 0.5s ease' : 'fadeIn 0.6s ease',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ position: 'relative', width: 90, height: 90, margin: '0 auto 1.2rem' }}>
                        <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'spinRing 10s linear infinite' }}>
                            <circle cx="50" cy="50" r="47" fill="none" stroke="url(#loginRing)" strokeWidth="1.5" strokeDasharray="8 5" />
                            <defs>
                                <linearGradient id="loginRing" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0055FF" stopOpacity="0.8" />
                                    <stop offset="50%" stopColor="#ffb3b3" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#0055FF" stopOpacity="0.8" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <img src={logo} alt="Logo" style={{
                            position: 'absolute', inset: '12px',
                            width: 'calc(100% - 24px)', height: 'calc(100% - 24px)',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 0 12px rgba(0, 85, 255,0.5))',
                        }} />
                    </div>
                    <div style={{ fontWeight: 900, fontSize: '1.6rem', color: '#0055FF', letterSpacing: '1px', lineHeight: 1.2 }}>NourCoches</div>
                    <div style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'rgba(255,255,255,0.4)', marginTop: 8, fontWeight: 800, textTransform: 'uppercase' }}>Nourcoches - Tanger</div>
                </div>

                <div style={{
                    background: '#111', border: '1px solid rgba(0, 85, 255,0.2)',
                    borderRadius: 24, padding: '2.5rem 2rem',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(0, 85, 255,0.05)',
                }}>
                    <h2 style={{ fontWeight: 900, fontSize: '1.4rem', marginBottom: '0.3rem', textAlign: 'center' }}>Admin Login</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Username</label>
                            <input
                                className="login-input"
                                type="text"
                                value={username}
                                onChange={e => { setUsername(e.target.value); setError(''); }}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '0.9rem 1rem', color: '#fff' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Password</label>
                            <input
                                className="login-input"
                                type="password"
                                value={password}
                                onChange={e => { setPassword(e.target.value); setError(''); }}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '0.9rem 1rem', color: '#fff' }}
                            />
                        </div>
                        {error && <div style={{ color: '#f87171', fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}
                        <button type="submit" disabled={submitting} style={{ padding: '1rem', borderRadius: 12, border: 'none', background: 'linear-gradient(45deg, #0033A0, #0055FF)', color: '#fff', fontWeight: 900, cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
                            {submitting ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function Admin() {
    const [authed, setAuthed] = useState<boolean | null>(null);
    const [data, setData] = useState<any>(EMPTY_DATA);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const nextData = await fetchAdminData();
            setData(nextData);
            setAuthed(true);
        } catch (error) {
            if (error === authError || (error instanceof Error && error.message === authError.message)) {
                setAuthed(false);
            } else {
                alert('Backend Error');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const hasSession = await fetchAdminSession();
                if (!active) return;
                if (hasSession) {
                    await loadData();
                } else {
                    setAuthed(false);
                    setLoading(false);
                }
            } catch {
                if (!active) return;
                setAuthed(false);
                setLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, []);

    const persistData = async (nextData: any, successMessage?: string) => {
        setSaving(true);
        try {
            const saved = await saveAdminData(nextData);
            setData(saved);
            if (successMessage) {
                alert(successMessage);
            }
        } catch (error) {
            if (error === authError || (error instanceof Error && error.message === authError.message)) {
                setAuthed(false);
                return;
            }
            alert(error instanceof Error ? error.message : 'Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const handleSave = async () => {
        await persistData(data, 'Changes saved successfully');
    };

    const handleLogout = async () => {
        try {
            await fetch(ADMIN_API + '/admin/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch {
        }
        setAuthed(false);
        setLoading(false);
    };

    if (authed === null || (authed && loading)) {
        return <div style={{ background: '#0f0505', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0055FF' }}>Loading...</div>;
    }

    if (!authed) {
        return <LoginScreen onLogin={loadData} />;
    }

    if (!data) {
        return <div style={{ color: '#fff', padding: '2rem' }}>Error loading data.</div>;
    }

    return (
        <div dir="rtl" style={{ background: '#080000', color: '#fff', fontFamily: "'Cairo', sans-serif", minHeight: '100vh', paddingBottom: '5rem' }}>
            <style>{`
                @keyframes greenGlowPulse {
                    0% { box-shadow: 0 0 10px rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.3); }
                    50% { box-shadow: 0 0 25px rgba(34,197,94,0.5); border-color: rgba(34,197,94,0.6); }
                    100% { box-shadow: 0 0 10px rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.3); }
                }
                .admin-section { animation: fadeIn 0.5s ease both; }
                @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
                .admin-header-outer { position: sticky; top: 0; z-index: 100; background: rgba(10,10,10,0.8); backdrop-filter: blur(15px); border-bottom: 1px solid rgba(0, 85, 255,0.2); padding: 1rem 2rem; }
                .admin-header { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
                .admin-header-logo { display: flex; align-items: center; gap: 1rem; }
                .admin-header-actions { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; justify-content: flex-end; }
                .admin-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 3rem; }
                .admin-body { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
                @media (max-width: 768px) {
                    .admin-header-outer { padding: 0.75rem 1rem; }
                    .admin-header { flex-direction: column; gap: 0.75rem; align-items: stretch; }
                    .admin-header-logo { justify-content: center; }
                    .admin-header-logo h1 { font-size: 1rem !important; }
                    .admin-header-logo img { height: 32px !important; }
                    .admin-header-actions { justify-content: center; gap: 0.5rem; flex-wrap: wrap; }
                    .admin-header-actions > * { font-size: 0.75rem !important; }
                    .admin-header-actions button { padding: 0.5rem 0.8rem !important; font-size: 0.75rem !important; }
                    .admin-header-actions a { font-size: 0.7rem !important; }
                    .admin-stats-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 0.5rem !important; }
                    .admin-stats-grid > div { padding: 0.6rem !important; border-radius: 12px !important; }
                    .admin-stats-grid > div > div:first-child { font-size: 0.6rem !important; }
                    .admin-stats-grid > div > div:last-child { font-size: 1.1rem !important; }
                    .admin-body { padding: 0 0.5rem; margin-top: 1rem; }
                    .admin-section { padding: 1rem !important; border-radius: 14px !important; margin-bottom: 1.2rem !important; }
                    .admin-section h2 { font-size: 1rem !important; }
                }
                @media (max-width: 480px) {
                    .admin-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .admin-header-actions { gap: 0.35rem; }
                    .admin-header-actions .admin-hide-mobile { display: none; }
                }
            `}</style>

            <div className="admin-header-outer">
                <div className="admin-header">
                    <div className="admin-header-logo">
                        <img src={logo} style={{ height: 40 }} alt="Logo" />
                        <div>
                            <h1 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0055FF', margin: 0 }}>Admin Dashboard</h1>
                        </div>
                    </div>
                    <div className="admin-header-actions">
                        <div onClick={() => document.getElementById('promo-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0, 85, 255,0.1)', padding: '6px 14px', borderRadius: 100, cursor: 'pointer', border: '1px solid rgba(0, 85, 255,0.2)' }}>
                            <span style={{ fontSize: '1.1rem' }}>Promo</span><span style={{ fontWeight: 900, color: '#4D88FF' }}>{data.promoCars.length}</span>
                        </div>
                        <div onClick={() => document.getElementById('forsale-section')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(34,197,94,0.1)', padding: '8px 16px', borderRadius: 100, cursor: 'pointer', border: '1px solid rgba(34,197,94,0.3)', animation: 'greenGlowPulse 4s infinite' }}>
                            <span style={{ fontSize: '1.2rem' }}>Sale</span><span style={{ fontWeight: 900, color: '#4ade80' }}>{(data.carsForSale || []).length}</span><span className="admin-hide-mobile" style={{ fontSize: '0.8rem', fontWeight: 700 }}>For Sale</span>
                        </div>
                        <div onClick={() => document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0, 85, 255,0.1)', padding: '6px 14px', borderRadius: 100, cursor: 'pointer', border: '1px solid rgba(0, 85, 255,0.2)' }}>
                            <span style={{ fontSize: '1.1rem' }}>📝</span><span style={{ fontWeight: 900, color: '#0055FF' }}>{(data.posts || []).length}</span>
                        </div>
                        <a href="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>Website</a>
                        <button onClick={handleSave} disabled={saving} style={{ background: 'linear-gradient(45deg, #0033A0, #0055FF)', color: '#fff', border: 'none', padding: '0.7rem 1.5rem', borderRadius: 10, fontWeight: 900, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving...' : 'Save'}</button>
                        <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #444', color: '#888', padding: '0.5rem 1rem', borderRadius: 10, cursor: 'pointer' }}>Logout</button>
                    </div>
                </div>
            </div>

            <div className="admin-body">
                <div className="admin-stats-grid">
                    {[
                        ['Fleet', data.fleet.length, '#0055FF'],
                        ['Promos', data.promoCars.length, '#f87171'],
                        ['For Sale', (data.carsForSale || []).length, '#4ade80'],
                        ['Blog Posts', (data.posts || []).length, '#fbbf24'],
                        ['Phones', Object.keys(data.phones || {}).length, '#888'],
                        ['Status', 'Online', '#22c55e']
                    ].map(([label, value, color]) => (
                        <div key={label as string} style={{ background: '#111', padding: '1rem', borderRadius: 16, textAlign: 'center', border: '1px solid #222' }}>
                            <div style={{ fontSize: '0.7rem', color: '#555', marginBottom: 5 }}>{label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: color as string }}>{value}</div>
                        </div>
                    ))}
                </div>

                <CarListEditor
                    title="Main Fleet"
                    cars={data.fleet}
                    onChange={(next: any) => setData({ ...data, fleet: next })}
                    onDelete={(next: any) => {
                        const nextData = { ...data, fleet: next };
                        setData(nextData);
                        void persistData(nextData);
                    }}
                    customAction1={{
                        label: 'Promo',
                        onClick: (car: any) => {
                            const nextPromo = { ...car, id: Date.now(), images: [...(car.images || [])] };
                            const nextData = { ...data, promoCars: [...(data.promoCars || []), nextPromo] };
                            setData(nextData);
                            void persistData(nextData, 'Added to promos');
                        }
                    }}
                    customAction2={{
                        label: 'Sale',
                        color: '#22c55e',
                        onClick: (car: any) => {
                            const nextSale = { ...car, id: Date.now(), salePrice: car.price * 300, km: 0, year: 2024, images: [...(car.images || [])] };
                            const nextData = { ...data, carsForSale: [...(data.carsForSale || []), nextSale] };
                            setData(nextData);
                            void persistData(nextData, 'Added to cars for sale');
                        }
                    }}
                />

                <div id="promo-section">
                    <CarListEditor
                        title="Promotions"
                        cars={data.promoCars}
                        onChange={(next: any) => setData({ ...data, promoCars: next })}
                        onDelete={(next: any) => {
                            const nextData = { ...data, promoCars: next };
                            setData(nextData);
                            void persistData(nextData);
                        }}
                    />
                </div>

                <div id="forsale-section">
                    <CarForSaleEditor
                        cars={data.carsForSale || []}
                        onChange={(next: any) => setData({ ...data, carsForSale: next })}
                        onDelete={(next: any) => {
                            const nextData = { ...data, carsForSale: next };
                            setData(nextData);
                            void persistData(nextData);
                        }}
                    />
                </div>

                <div id="blog-section">
                    <BlogEditor
                        posts={data.posts || []}
                        onChange={(next: any) => setData({ ...data, posts: next })}
                        onDelete={(next: any) => {
                            const nextData = { ...data, posts: next };
                            setData(nextData);
                            void persistData(nextData);
                        }}
                        onUploadImage={uploadAdminImage}
                    />
                </div>

                <AdminSecuritySection />
                <SocialLinksEditor links={data.socialLinks || { facebook: '', instagram: '', whatsapp: '' }} onChange={(links: any) => setData({ ...data, socialLinks: links })} />
                <PhonesEditor phones={data.phones || { phone1: '', phone2: '', phone3: '' }} onChange={(phones: any) => setData({ ...data, phones })} />
            </div>
        </div>
    );
}
function slugify(text: any, isFinal = false) {
    if (!text) return '';
    let s = text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
    if (isFinal) {
        s = s.replace(/^-+/, '').replace(/-+$/, '');
    }
    return s;
}
function CarListEditor({ title, cars, onChange, onDelete, customAction1, customAction2 }: any) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const update = (i: number, f: string, v: any) => {
        const n = [...cars];
        let updatedCar = { ...n[i], [f]: v };

        // Auto-generate slug if name changes and slug is empty or sync is desired
        if (f === 'name') {
            const frName = typeof v === 'object' ? v.fr : '';
            const enName = typeof v === 'object' ? v.en : '';
            const arName = typeof v === 'object' ? v.ar : v;
            const seedName = frName || enName || arName;
            if (seedName && !updatedCar.slug) {
                updatedCar.slug = slugify(seedName, true);
            }
        }

        n[i] = updatedCar;
        onChange(n);
    };
    const uploadImage = async (file: File, callback: (url: string) => void) => {
        setUploading(true);
        try {
            const url = await uploadAdminImage(file);
            callback(url);
        } catch (error) {
            if (error === authError || (error instanceof Error && error.message === authError.message)) {
                window.location.reload();
                return;
            }
            alert('Image upload failed');
        }
        setUploading(false);
    };
    const iS: any = { background: '#000', border: '1px solid #333', color: '#fff', padding: '0.5rem', borderRadius: 8, width: '100%', fontFamily: 'inherit', fontSize: '0.85rem' };
    const labelS: any = { fontSize: '0.65rem', color: '#888', fontWeight: 800, marginBottom: 3, display: 'block' };

    return (
        <section className="admin-section" style={{ background: '#111', padding: '1.5rem', borderRadius: 20, marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0 }}>{title}</h2>
                <button onClick={() => onChange([{ id: Date.now(), name: { ar: 'جديد', fr: 'Nouveau', en: 'New' }, price: '', img: '', specs: [], count: 1, fuel: 'diesel', places: 5, valises: 3, portes: 5, clim: 'A/C' }, ...cars])} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: 8, fontWeight: 800, cursor: 'pointer' }}>+ إضافة</button>
            </div>
            <div style={{ display: 'grid', gap: '0.8rem' }}>
                {cars.map((car: any, i: number) => {
                    const isOpen = expanded === i;
                    const carName = typeof car.name === 'object' ? car.name.ar : car.name;
                    return (
                        <div key={car.id} style={{ background: '#0a0a0a', borderRadius: 16, border: `1px solid ${isOpen ? '#0055FF' : '#222'}`, overflow: 'hidden', transition: 'all 0.3s' }}>
                            {/* ── COLLAPSED HEADER ── */}
                            <div onClick={() => setExpanded(isOpen ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', cursor: 'pointer', background: isOpen ? 'rgba(0, 85, 255,0.05)' : 'transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1, minWidth: 0 }}>
                                    {car.img && <img src={car.img.startsWith('http') ? car.img : resolveImageUrl(car.img)} alt="" style={{ width: 44, height: 32, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{carName}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#888' }}>{car.price} MAD · {car.count > 0 ? `✅ ${car.count}` : '❌ 0'}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexShrink: 0 }}>
                                    {customAction1 && <button onClick={(e) => { e.stopPropagation(); customAction1.onClick(car); }} style={{ background: '#f8717122', color: '#f87171', border: '1px solid #f8717144', padding: '0.25rem 0.5rem', borderRadius: 6, fontSize: '0.7rem', cursor: 'pointer', fontWeight: 700 }}>{customAction1.label}</button>}
                                    {customAction2 && <button onClick={(e) => { e.stopPropagation(); customAction2.onClick(car); }} style={{ background: '#22c55e22', color: '#22c55e', border: '1px solid #22c55e44', padding: '0.25rem 0.5rem', borderRadius: 6, fontSize: '0.7rem', cursor: 'pointer', fontWeight: 700 }}>{customAction2.label}</button>}
                                    <button onClick={(e) => { e.stopPropagation(); if (confirm('حذف هذه السيارة؟')) { const n = cars.filter((_: any, idx: number) => idx !== i); if (onDelete) onDelete(n); else onChange(n); } }} style={{ background: '#0055FF22', color: '#ff4444', border: 'none', borderRadius: 6, padding: '0.25rem 0.4rem', cursor: 'pointer', fontSize: '0.8rem' }}>🗑️</button>
                                    <span style={{ color: '#555', fontSize: '0.8rem', marginLeft: 4, transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                                </div>
                            </div>

                            {/* ── EXPANDED EDITOR ── */}
                            {isOpen && (
                                <div style={{ padding: '1rem', borderTop: '1px solid #222', animation: 'fadeIn 0.3s ease' }}>
                                    {uploading && <div style={{ textAlign: 'center', padding: '0.5rem', color: '#0055FF', fontSize: '0.8rem', fontWeight: 800 }}>⏳ جارٍ رفع الصورة...</div>}

                                    {/* ─ MAIN IMAGE ─ */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>📸 الصورة الرئيسية</label>
                                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                            {car.img && <img src={car.img.startsWith('http') ? car.img : resolveImageUrl(car.img)} alt="" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 10, border: '2px solid #333' }} />}
                                            <div style={{ flex: 1, minWidth: 150 }}>
                                                <input type="file" accept="image/*" onChange={(e: any) => { if (e.target.files[0]) uploadImage(e.target.files[0], (url) => update(i, 'img', url)); }} style={{ ...iS, padding: '0.4rem', fontSize: '0.75rem' }} />
                                                <input type="text" placeholder="أو أدخل رابط الصورة" value={car.img || ''} onChange={(e: any) => update(i, 'img', e.target.value)} style={{ ...iS, marginTop: 4, fontSize: '0.75rem' }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ─ GALLERY IMAGES ─ */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>🖼️ صور إضافية ({(car.images || []).length})</label>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 6 }}>
                                            {(car.images || []).map((img: string, idx: number) => (
                                                <div key={idx} style={{ position: 'relative' }}>
                                                    <img src={img.startsWith('http') ? img : resolveImageUrl(img)} alt="" style={{ width: 70, height: 50, objectFit: 'cover', borderRadius: 6, border: '1px solid #333' }} />
                                                    <button onClick={() => update(i, 'images', car.images.filter((_: any, j: number) => j !== idx))} style={{ position: 'absolute', top: -4, right: -4, background: '#0055FF', color: '#fff', border: 'none', borderRadius: '50%', width: 18, height: 18, fontSize: '0.55rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                                                </div>
                                            ))}
                                        </div>
                                        <input type="file" accept="image/*" onChange={(e: any) => { if (e.target.files[0]) uploadImage(e.target.files[0], (url) => update(i, 'images', [...(car.images || []), url])); }} style={{ ...iS, padding: '0.4rem', fontSize: '0.75rem' }} />
                                    </div>

                                    {/* ─ NAME (AR / FR / EN) ─ */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>✏️ الاسم</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
                                            <div><label style={{ ...labelS, color: '#0055FF' }}>AR</label><input type="text" value={typeof car.name === 'object' ? car.name.ar || '' : car.name} onChange={(e: any) => update(i, 'name', typeof car.name === 'object' ? { ...car.name, ar: e.target.value } : { ar: e.target.value, fr: '', en: '' })} style={iS} /></div>
                                            <div><label style={{ ...labelS, color: '#3b82f6' }}>FR</label><input type="text" value={typeof car.name === 'object' ? car.name.fr || '' : ''} onChange={(e: any) => update(i, 'name', { ...(typeof car.name === 'object' ? car.name : { ar: car.name }), fr: e.target.value })} style={iS} /></div>
                                            <div><label style={{ ...labelS, color: '#22c55e' }}>EN</label><input type="text" value={typeof car.name === 'object' ? car.name.en || '' : ''} onChange={(e: any) => update(i, 'name', { ...(typeof car.name === 'object' ? car.name : { ar: car.name }), en: e.target.value })} style={iS} /></div>
                                        </div>
                                    </div>

                                    {/* ─ SLUG / DEEP LINK ─ */}
                                    <div style={{ marginBottom: '1rem', background: 'rgba(0, 85, 255,0.05)', padding: '0.8rem', borderRadius: 10, border: '1px dashed rgba(0, 85, 255,0.2)' }}>
                                        <label style={labelS}>🔗 رابط مباشر (للموقع والإعلانات)</label>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <input type="text" value={car.slug || ''} onChange={(e: any) => update(i, 'slug', slugify(e.target.value, false))} onBlur={(e: any) => update(i, 'slug', slugify(e.target.value, true))} style={{ ...iS, flex: 1, fontSize: '0.75rem', background: 'transparent' }} placeholder="car-slug" />
                                            <button
                                                onClick={() => {
                                                    const url = `${window.location.origin}/cars/${car.slug}`;
                                                    navigator.clipboard.writeText(url);
                                                    alert('Link copied to clipboard!');
                                                }}
                                                style={{ background: '#0055FF', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}
                                            >حفظ الرابط 📋</button>
                                        </div>
                                        <div style={{ fontSize: '0.65rem', color: '#888', marginTop: 4 }}>
                                            {window.location.origin}/cars/{car.slug || '...'}
                                        </div>
                                    </div>

                                    {/* ─ PRICE / COUNT / FUEL ─ */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
                                        <div><label style={labelS}>💰 السعر/يوم</label><input type="number" value={car.price ?? ''} onChange={(e: any) => update(i, 'price', e.target.value === '' ? '' : Number(e.target.value))} style={iS} /></div>
                                        <div><label style={labelS}>🔢 العدد</label><input type="number" value={car.count ?? 0} onChange={(e: any) => update(i, 'count', Number(e.target.value))} style={iS} /></div>
                                        <div><label style={labelS}>⛽ الوقود</label>
                                            <select value={car.fuel || 'diesel'} onChange={(e: any) => update(i, 'fuel', e.target.value)} style={iS}>
                                                <option value="diesel">ديزل</option><option value="petrol">بنزين</option><option value="both">ديزل + بنزين</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* ─ PLACES / VALISES / PORTES / CLIM ─ */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
                                        <div><label style={labelS}>👥 مقاعد</label><input type="number" value={car.places ?? 5} onChange={(e: any) => update(i, 'places', Number(e.target.value))} style={iS} /></div>
                                        <div><label style={labelS}>💼 حقائب</label><input type="number" value={car.valises ?? 3} onChange={(e: any) => update(i, 'valises', Number(e.target.value))} style={iS} /></div>
                                        <div><label style={labelS}>🚘 أبواب</label><input type="number" value={car.portes ?? 5} onChange={(e: any) => update(i, 'portes', Number(e.target.value))} style={iS} /></div>
                                        <div><label style={labelS}>❄️ تكييف</label><input type="text" value={car.clim || 'A/C'} onChange={(e: any) => update(i, 'clim', e.target.value)} style={iS} /></div>
                                    </div>

                                    {/* ─ SPECS ─ */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>⚙️ المواصفات</label>
                                        {(car.specs || []).map((spec: any, si: number) => (
                                            <div key={si} style={{ display: 'flex', gap: '0.4rem', marginBottom: 4, alignItems: 'center' }}>
                                                <input type="text" placeholder="التسمية" value={spec.label || ''} onChange={(e: any) => { const ns = [...(car.specs || [])]; ns[si] = { ...ns[si], label: e.target.value }; update(i, 'specs', ns); }} style={{ ...iS, flex: 1 }} />
                                                <input type="text" placeholder="القيمة" value={spec.value || ''} onChange={(e: any) => { const ns = [...(car.specs || [])]; ns[si] = { ...ns[si], value: e.target.value }; update(i, 'specs', ns); }} style={{ ...iS, flex: 1 }} />
                                                <button onClick={() => update(i, 'specs', car.specs.filter((_: any, j: number) => j !== si))} style={{ background: '#0055FF33', color: '#ff4444', border: 'none', borderRadius: 6, padding: '0.3rem', cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>
                                            </div>
                                        ))}
                                        <button onClick={() => update(i, 'specs', [...(car.specs || []), { label: '', value: '' }])} style={{ background: '#222', color: '#888', border: '1px solid #333', padding: '0.3rem 0.8rem', borderRadius: 6, fontSize: '0.7rem', cursor: 'pointer', marginTop: 4 }}>+ مواصفة</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function CarForSaleEditor({ cars, onChange, onDelete }: any) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const update = (i: number, f: string, v: any) => {
        const n = [...cars];
        let updatedCar = { ...n[i], [f]: v };

        if (f === 'name') {
            const frName = typeof v === 'object' ? v.fr : '';
            const enName = typeof v === 'object' ? v.en : '';
            const arName = typeof v === 'object' ? (v.ar || v) : v;
            const seedName = frName || enName || arName;
            if (seedName) {
                updatedCar.slug = slugify(seedName);
            }
        }

        n[i] = updatedCar;
        onChange(n);
    };
    const uploadImage = async (file: File, callback: (url: string) => void) => {
        setUploading(true);
        try {
            const url = await uploadAdminImage(file);
            callback(url);
        } catch (error) {
            if (error === authError || (error instanceof Error && error.message === authError.message)) {
                window.location.reload();
                return;
            }
            alert('Image upload failed');
        }
        setUploading(false);
    };
    const iS: any = { background: '#000', border: '1px solid #333', color: '#fff', padding: '0.5rem', borderRadius: 8, width: '100%', fontFamily: 'inherit', fontSize: '0.85rem' };
    const labelS: any = { fontSize: '0.65rem', color: '#888', fontWeight: 800, marginBottom: 3, display: 'block' };

    return (
        <section className="admin-section" style={{ background: 'linear-gradient(135deg, #0a1a0a, #111)', padding: '1.5rem', borderRadius: 20, border: '1px solid #004400' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 id="forsale-section" style={{ margin: 0 }}>🏷️ سيارات للبيع</h2>
                <button onClick={() => onChange([{ id: Date.now(), name: { ar: 'سيارة جديدة للبيع', fr: 'Nouvelle voiture', en: 'New car' }, salePrice: '', km: 0, year: 2024, img: '', images: [], fuel: 'diesel', transmission: 'manual', condition: 'excellent', firstOwner: true, technicalControl: true, places: 5 }, ...cars])} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: 8, fontWeight: 800, cursor: 'pointer' }}>+ إضافة</button>
            </div>
            <div style={{ display: 'grid', gap: '0.8rem' }}>
                {cars.map((car: any, i: number) => {
                    const isOpen = expanded === i;
                    const carName = typeof car.name === 'object' ? car.name.ar : car.name;
                    return (
                        <div key={car.id} style={{ background: '#0a0a0a', borderRadius: 16, border: `1px solid ${isOpen ? '#22c55e' : '#22c55e22'}`, overflow: 'hidden', transition: 'all 0.3s' }}>
                            {/* ── COLLAPSED HEADER ── */}
                            <div onClick={() => setExpanded(isOpen ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', cursor: 'pointer', background: isOpen ? 'rgba(34,197,94,0.05)' : 'transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1, minWidth: 0 }}>
                                    {car.img && <img src={car.img.startsWith('http') ? car.img : resolveImageUrl(car.img)} alt="" style={{ width: 44, height: 32, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#4ade80', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{carName}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#888' }}>{car.salePrice?.toLocaleString()} DH · {car.year}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexShrink: 0 }}>
                                    <button onClick={(e) => { e.stopPropagation(); if (confirm('حذف هذه السيارة؟')) { const n = cars.filter((_: any, idx: number) => idx !== i); if (onDelete) onDelete(n); else onChange(n); } }} style={{ background: '#0055FF22', color: '#ff4444', border: 'none', borderRadius: 6, padding: '0.25rem 0.4rem', cursor: 'pointer', fontSize: '0.8rem' }}>🗑️</button>
                                    <span style={{ color: '#555', fontSize: '0.8rem', marginLeft: 4, transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                                </div>
                            </div>

                            {/* ── EXPANDED EDITOR ── */}
                            {isOpen && (
                                <div style={{ padding: '1rem', borderTop: '1px solid #1a3a1a', animation: 'fadeIn 0.3s ease' }}>
                                    {uploading && <div style={{ textAlign: 'center', padding: '0.5rem', color: '#22c55e', fontSize: '0.8rem', fontWeight: 800 }}>⏳ جارٍ رفع الصورة...</div>}

                                    {/* ─ MAIN IMAGE ─ */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>📸 الصورة الرئيسية</label>
                                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                            {car.img && <img src={car.img.startsWith('http') ? car.img : resolveImageUrl(car.img)} alt="" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 10, border: '2px solid #22c55e33' }} />}
                                            <div style={{ flex: 1, minWidth: 150 }}>
                                                <input type="file" accept="image/*" onChange={(e: any) => { if (e.target.files[0]) uploadImage(e.target.files[0], (url) => update(i, 'img', url)); }} style={{ ...iS, padding: '0.4rem', fontSize: '0.75rem' }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ─ GALLERY ─ */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>🖼️ صور إضافية ({(car.images || []).length})</label>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 6 }}>
                                            {(car.images || []).map((img: string, idx: number) => (
                                                <div key={idx} style={{ position: 'relative' }}>
                                                    <img src={img.startsWith('http') ? img : resolveImageUrl(img)} alt="" style={{ width: 70, height: 50, objectFit: 'cover', borderRadius: 6, border: '1px solid #22c55e33' }} />
                                                    <button onClick={() => update(i, 'images', car.images.filter((_: any, j: number) => j !== idx))} style={{ position: 'absolute', top: -4, right: -4, background: '#0055FF', color: '#fff', border: 'none', borderRadius: '50%', width: 18, height: 18, fontSize: '0.55rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                                                </div>
                                            ))}
                                        </div>
                                        <input type="file" accept="image/*" onChange={(e: any) => { if (e.target.files[0]) uploadImage(e.target.files[0], (url) => update(i, 'images', [...(car.images || []), url])); }} style={{ ...iS, padding: '0.4rem', fontSize: '0.75rem' }} />
                                    </div>

                                    {/* ─ NAME AR/FR/EN ─ */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>✏️ الاسم</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
                                            <div><label style={{ ...labelS, color: '#0055FF' }}>AR</label><input type="text" value={typeof car.name === 'object' ? car.name.ar || '' : car.name} onChange={(e: any) => update(i, 'name', typeof car.name === 'object' ? { ...car.name, ar: e.target.value } : { ar: e.target.value, fr: '', en: '' })} style={iS} /></div>
                                            <div><label style={{ ...labelS, color: '#3b82f6' }}>FR</label><input type="text" value={typeof car.name === 'object' ? car.name.fr || '' : ''} onChange={(e: any) => update(i, 'name', { ...(typeof car.name === 'object' ? car.name : { ar: car.name }), fr: e.target.value })} style={iS} /></div>
                                            <div><label style={{ ...labelS, color: '#22c55e' }}>EN</label><input type="text" value={typeof car.name === 'object' ? car.name.en || '' : ''} onChange={(e: any) => update(i, 'name', { ...(typeof car.name === 'object' ? car.name : { ar: car.name }), en: e.target.value })} style={iS} /></div>
                                        </div>
                                    </div>

                                    {/* ─ SALE SPECIFIC FIELDS ─ */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
                                        <div><label style={labelS}>💵 سعر البيع</label><input type="number" value={car.salePrice ?? ''} onChange={(e: any) => update(i, 'salePrice', e.target.value === '' ? '' : Number(e.target.value))} style={iS} /></div>
                                        <div><label style={labelS}>📏 الكيلومتراج</label><input type="number" value={car.km || 0} onChange={(e: any) => update(i, 'km', Number(e.target.value))} style={iS} /></div>
                                        <div><label style={labelS}>📅 الموديل</label><input type="number" value={car.year || 2024} onChange={(e: any) => update(i, 'year', Number(e.target.value))} style={iS} /></div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
                                        <div><label style={labelS}>⛽ الوقود</label>
                                            <select value={car.fuel || 'diesel'} onChange={(e: any) => update(i, 'fuel', e.target.value)} style={iS}>
                                                <option value="diesel">ديزل</option><option value="petrol">بنزين</option><option value="both">ديزل + بنزين</option>
                                            </select>
                                        </div>
                                        <div><label style={labelS}>🔧 ناقل الحركة</label>
                                            <select value={car.transmission || 'manual'} onChange={(e: any) => update(i, 'transmission', e.target.value)} style={iS}>
                                                <option value="manual">يدوي</option><option value="auto">أوتوماتيك</option>
                                            </select>
                                        </div>
                                        <div><label style={labelS}>✨ الحالة</label>
                                            <select value={car.condition || 'excellent'} onChange={(e: any) => update(i, 'condition', e.target.value)} style={iS}>
                                                <option value="excellent">ممتازة</option><option value="good">جيدة</option><option value="fair">مقبولة</option>
                                            </select>
                                        </div>
                                        <div><label style={labelS}>👥 مقاعد</label><input type="number" value={car.places ?? 5} onChange={(e: any) => update(i, 'places', Number(e.target.value))} style={iS} /></div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: '0.85rem', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={car.firstOwner ?? true} onChange={(e: any) => update(i, 'firstOwner', e.target.checked)} /> 👤 مالك أول
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: '0.85rem', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={car.technicalControl ?? true} onChange={(e: any) => update(i, 'technicalControl', e.target.checked)} /> ✅ فحص تقني
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function AdminSecuritySection() {
    return (
        <section className="admin-section" style={{ background: 'linear-gradient(135deg, #1a0a1a, #111)', padding: '1.5rem', borderRadius: 20, border: '1px solid #7c3aed33', marginTop: '2rem' }}>
            <h2 style={{ margin: '0 0 1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.3rem' }}>Security</span> Security Settings
            </h2>
            <div style={{ background: '#0a0a0a', padding: '1rem', borderRadius: 12, border: '1px solid #222', maxWidth: 560 }}>
                <div style={{ fontSize: '0.85rem', color: '#ddd', lineHeight: 1.8 }}>
                    Admin credentials are managed only through the server environment variables <strong>ADMIN_USER</strong> and <strong>ADMIN_PASS</strong>.
                </div>
            </div>
        </section>
    );
}

function SocialLinksEditor({ links, onChange }: { links: { facebook: string; instagram: string; whatsapp: string }; onChange: (links: { facebook: string; instagram: string; whatsapp: string }) => void }) {
    const iS: any = { background: '#000', border: '1px solid #333', color: '#fff', padding: '0.6rem 0.8rem', borderRadius: 10, width: '100%', fontFamily: 'inherit', fontSize: '0.9rem' };

    return (
        <section className="admin-section" style={{ background: 'linear-gradient(135deg, #0a1128, #111)', padding: '1.5rem', borderRadius: 20, border: '1px solid #3b82f633', marginTop: '2rem' }}>
            <h2 style={{ margin: '0 0 1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.3rem' }}>🔗</span> روابط التواصل الاجتماعي
            </h2>

            <div style={{ display: 'grid', gap: '1rem', maxWidth: 500 }}>
                {/* Facebook */}
                <div>
                    <label style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 800, marginBottom: 4, display: 'block' }}>📘 فيسبوك (Facebook)</label>
                    <input
                        type="text"
                        value={links.facebook}
                        onChange={(e) => onChange({ ...links, facebook: e.target.value })}
                        style={iS}
                        placeholder="https://facebook.com/..."
                    />
                </div>

                {/* Instagram */}
                <div>
                    <label style={{ fontSize: '0.75rem', color: '#ec4899', fontWeight: 800, marginBottom: 4, display: 'block' }}>📸 إنستجرام (Instagram)</label>
                    <input
                        type="text"
                        value={links.instagram}
                        onChange={(e) => onChange({ ...links, instagram: e.target.value })}
                        style={iS}
                        placeholder="https://instagram.com/..."
                    />
                </div>

                {/* WhatsApp */}
                <div>
                    <label style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 800, marginBottom: 4, display: 'block' }}>📲 واتساب (WhatsApp)</label>
                    <input
                        type="text"
                        value={links.whatsapp}
                        onChange={(e) => onChange({ ...links, whatsapp: e.target.value })}
                        style={iS}
                        placeholder="رقم الهاتف (+212...)"
                    />
                </div>

                <div style={{ fontSize: '0.7rem', color: '#555', fontStyle: 'italic' }}>
                    ⚠️ لتفعيل التغييرات، اضغط على زر "💾 حفظ" في الأعلى
                </div>
            </div>
        </section>
    );
}

function PhonesEditor({ phones, onChange }: { phones: { phone1: string; phone2: string; phone3: string }; onChange: (phones: { phone1: string; phone2: string; phone3: string }) => void }) {
    const iS: any = { background: '#000', border: '1px solid #333', color: '#fff', padding: '0.6rem 0.8rem', borderRadius: 10, width: '100%', fontFamily: 'inherit', fontSize: '0.9rem', direction: 'ltr', textAlign: 'left' };

    return (
        <section className="admin-section" style={{ background: 'linear-gradient(135deg, #2a0a0a, #111)', padding: '1.5rem', borderRadius: 20, border: '1px solid #ef444433', marginTop: '2rem' }}>
            <h2 style={{ margin: '0 0 1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.3rem' }}>📞</span> أرقام الهواتف (للحجز المباشر)
            </h2>

            <div style={{ display: 'grid', gap: '1rem', maxWidth: 500 }}>
                {/* Phone 1 */}
                <div>
                    <label style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 800, marginBottom: 4, display: 'block' }}>الهاتف 1 (الرئيسي)</label>
                    <input
                        type="text"
                        value={phones.phone1}
                        onChange={(e) => onChange({ ...phones, phone1: e.target.value })}
                        style={iS}
                        placeholder="+212..."
                    />
                </div>

                {/* Phone 2 */}
                <div>
                    <label style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 800, marginBottom: 4, display: 'block' }}>الهاتف 2</label>
                    <input
                        type="text"
                        value={phones.phone2}
                        onChange={(e) => onChange({ ...phones, phone2: e.target.value })}
                        style={iS}
                        placeholder="+212..."
                    />
                </div>

                {/* Phone 3 */}
                <div>
                    <label style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 800, marginBottom: 4, display: 'block' }}>الهاتف 3</label>
                    <input
                        type="text"
                        value={phones.phone3}
                        onChange={(e) => onChange({ ...phones, phone3: e.target.value })}
                        style={iS}
                        placeholder="+212..."
                    />
                </div>

                <div style={{ fontSize: '0.7rem', color: '#555', fontStyle: 'italic' }}>
                    ⚠️ لتفعيل التغييرات، اضغط على زر "💾 حفظ" في الأعلى
                </div>
            </div>
        </section>
    );
}

function generateSlug(str: string) {
    return str.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function BlogEditor({ posts, onChange, onDelete, onUploadImage }: any) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);

    const update = (i: number, f: string, v: any) => {
        const n = [...posts]; n[i] = { ...n[i], [f]: v }; onChange(n);
    };

    const uploadImage = async (file: File, callback: (url: string) => void) => {
        setUploading(true);
        try {
            const url = await onUploadImage(file);
            callback(url);
        } catch (error) {
            alert('Image upload failed');
        }
        setUploading(false);
    };

    const iS: any = { background: '#000', border: '1px solid #333', color: '#fff', padding: '0.6rem', borderRadius: 8, width: '100%', fontFamily: 'inherit', fontSize: '0.85rem' };
    const labelS: any = { fontSize: '0.75rem', color: '#fbbf24', fontWeight: 800, marginBottom: 5, display: 'block' };

    return (
        <section className="admin-section" style={{ background: '#111', padding: '1.5rem', borderRadius: 20, marginBottom: '2rem', border: '1px solid rgba(251,191,36,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1.4rem' }}>📝</span> Blog posts (SEO)
                </h2>
                <button onClick={() => onChange([{
                    id: Date.now(),
                    slug: `new-post-${Date.now()}`,
                    title: 'New Article Title',
                    excerpt: 'A short summary for Google search results...',
                    content: 'Write your full HTML content here...',
                    coverImage: '',
                    author: 'Saadcoches',
                    publishedAt: new Date().toISOString().split('T')[0],
                    tags: ['location', 'tanger'],
                    metaTitle: '',
                    metaDescription: '',
                    published: false
                }, ...posts])} style={{ background: '#fbbf24', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: 8, fontWeight: 800, cursor: 'pointer' }}>+ Add Post</button>
            </div>

            <div style={{ display: 'grid', gap: '0.8rem' }}>
                {posts.map((post: any, i: number) => {
                    const isOpen = expanded === i;
                    return (
                        <div key={post.id} style={{ background: '#0a0a0a', borderRadius: 16, border: `1px solid ${isOpen ? '#fbbf24' : '#222'}`, overflow: 'hidden', transition: 'all 0.3s' }}>
                            {/* COLLAPSED HEADER */}
                            <div onClick={() => setExpanded(isOpen ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', cursor: 'pointer', background: isOpen ? 'rgba(251,191,36,0.05)' : 'transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1, minWidth: 0 }}>
                                    {post.coverImage ? (
                                        <img src={post.coverImage.startsWith('http') ? post.coverImage : resolveImageUrl(post.coverImage)} alt="" style={{ width: 44, height: 32, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                                    ) : (
                                        <div style={{ width: 44, height: 32, background: '#1a1a1a', borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>📄</div>
                                    )}
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {post.published ? '🟢' : '🔴'} {post.title}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: '#888' }}>
                                            {post.publishedAt} · {post.slug}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexShrink: 0 }}>
                                    <button onClick={(e) => { e.stopPropagation(); if (confirm('Delete this post?')) { const n = posts.filter((_: any, idx: number) => idx !== i); if (onDelete) onDelete(n); else onChange(n); } }} style={{ background: '#0055FF22', color: '#ff4444', border: 'none', borderRadius: 6, padding: '0.25rem 0.4rem', cursor: 'pointer', fontSize: '0.8rem' }}>🗑️</button>
                                    <span style={{ color: '#555', fontSize: '0.8rem', marginLeft: 4, transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                                </div>
                            </div>

                            {/* EXPANDED EDITOR */}
                            {isOpen && (
                                <div style={{ padding: '1.25rem', borderTop: '1px solid #222', direction: 'ltr', textAlign: 'left' }}>
                                    {uploading && <div style={{ textAlign: 'center', padding: '0.5rem', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 800 }}>⏳ Uploading image...</div>}

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: '#111', padding: '0.75rem', borderRadius: 10, border: '1px solid #333' }}>
                                        <label style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                            <input type="checkbox" checked={post.published} onChange={e => update(i, 'published', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#fbbf24' }} />
                                            Published (Visible on site and Google)
                                        </label>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                                        <div>
                                            <label style={labelS}>Title</label>
                                            <input type="text" value={post.title} onChange={e => {
                                                const title = e.target.value;
                                                const slug = generateSlug(title);
                                                const n = [...posts];
                                                n[i] = { ...n[i], title, slug };
                                                onChange(n);
                                            }} style={iS} />
                                        </div>
                                        <div>
                                            <label style={labelS}>URL Slug (Auto-generated)</label>
                                            <input type="text" value={post.slug} onChange={e => update(i, 'slug', e.target.value)} style={iS} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                                        <div>
                                            <label style={labelS}>Author</label>
                                            <input type="text" value={post.author} onChange={e => update(i, 'author', e.target.value)} style={iS} />
                                        </div>
                                        <div>
                                            <label style={labelS}>Publish Date</label>
                                            <input type="date" value={post.publishedAt} onChange={e => update(i, 'publishedAt', e.target.value)} style={iS} />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>SEO: Meta Title (Browser title / Google Title)</label>
                                        <input type="text" value={post.metaTitle || ''} onChange={e => update(i, 'metaTitle', e.target.value)} style={iS} placeholder={post.title} />
                                    </div>

                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>SEO: Meta Description (Google snippet)</label>
                                        <textarea value={post.metaDescription || post.excerpt} onChange={e => update(i, 'metaDescription', e.target.value)} style={{ ...iS, minHeight: 60, resize: 'vertical' }} />
                                    </div>

                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>Excerpt (Short summary for the blog grid)</label>
                                        <textarea value={post.excerpt} onChange={e => update(i, 'excerpt', e.target.value)} style={{ ...iS, minHeight: 60, resize: 'vertical' }} />
                                    </div>

                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>Tags (comma separated)</label>
                                        <input type="text" value={(post.tags || []).join(', ')} onChange={e => update(i, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} style={iS} placeholder="maroc, tanger, location..." />
                                    </div>

                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>Cover Image</label>
                                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                            {post.coverImage && <img src={post.coverImage.startsWith('http') ? post.coverImage : resolveImageUrl(post.coverImage)} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6, border: '1px solid #333' }} />}
                                            <div style={{ flex: 1 }}>
                                                <input type="file" accept="image/*" onChange={(e: any) => { if (e.target.files[0]) uploadImage(e.target.files[0], (url) => update(i, 'coverImage', url)); }} style={{ ...iS, padding: '0.4rem', fontSize: '0.75rem' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={labelS}>Content (HTML Supported)</label>
                                        <textarea value={post.content} onChange={e => update(i, 'content', e.target.value)} style={{ ...iS, minHeight: 250, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.8rem' }} />
                                    </div>

                                    <div style={{ fontSize: '0.75rem', color: '#555', fontStyle: 'italic', marginTop: '1rem', borderTop: '1px solid #222', paddingTop: '1rem' }}>
                                        Don't forget to push <strong>Save</strong> at the top of the page to apply changes.
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}



