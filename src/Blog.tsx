import { useEffect, useState } from 'react';
import logo from './assets/logo.png';

const NC_API = window.location.hostname === 'localhost' ? 'http://localhost:3003/api' : '/api';
const IMAGE_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3003' : '';

interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: string;
    publishedAt: string;
    tags: string[];
    metaTitle?: string;
    metaDescription?: string;
    published: boolean;
}

function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
        return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr));
    } catch {
        return dateStr;
    }
}

function resolveImage(img: string): string {
    if (!img) return '';
    return img.startsWith('http') ? img : IMAGE_BASE + img;
}

// ── Blog Post Detail ──────────────────────────────────────────────────────────
function BlogPost({ post }: { post: Post }) {
    useEffect(() => {
        document.title = post.metaTitle || post.title;
        window.scrollTo(0, 0);
    }, [post]);

    return (
        <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
            {/* Back nav */}
            <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0, 85, 255,0.12)', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                    <img src={logo} alt="Saadcoches" style={{ height: 40, objectFit: 'contain' }} />
                    <span style={{ color: '#0055FF', fontWeight: 900, fontSize: '1.1rem' }}>Saadcoches</span>
                </a>
                <a href="/blog" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0055FF'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                    ← Retour au Blog
                </a>
            </nav>

            <div style={{ maxWidth: 780, margin: '0 auto', padding: '100px 1.5rem 4rem' }}>
                {/* Tags */}
                {post.tags?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                        {post.tags.map(tag => (
                            <span key={tag} style={{ background: 'rgba(0, 85, 255,0.12)', color: '#ff6b6b', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 20, border: '1px solid rgba(0, 85, 255,0.25)', textTransform: 'uppercase', letterSpacing: 1 }}>{tag}</span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: 20, color: '#fff' }}>{post.title}</h1>

                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                    <span>✍️ {post.author || 'Saadcoches'}</span>
                    <span>•</span>
                    <span>📅 {formatDate(post.publishedAt)}</span>
                </div>

                {/* Cover Image */}
                {post.coverImage && (
                    <div style={{ width: '100%', height: 320, borderRadius: 18, overflow: 'hidden', marginBottom: 40, background: '#1a1a1a' }}>
                        <img src={resolveImage(post.coverImage)} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}

                {/* Content */}
                <div
                    className="blog-content"
                    style={{ lineHeight: 1.9, fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* CTA */}
                <div style={{ marginTop: 56, padding: '2rem', borderRadius: 18, background: 'linear-gradient(135deg, rgba(0, 85, 255,0.1), rgba(0, 51, 160,0.05))', border: '1px solid rgba(0, 85, 255,0.2)', textAlign: 'center' }}>
                    <p style={{ marginBottom: 16, fontWeight: 700, fontSize: '1.1rem' }}>Prêt à louer votre voiture à Tanger ?</p>
                    <a href="/" style={{ display: 'inline-block', background: 'linear-gradient(45deg, #0033A0, #0055FF)', color: '#fff', padding: '0.75rem 2rem', borderRadius: 12, fontWeight: 900, textDecoration: 'none', fontSize: '1rem' }}>
                        Voir notre flotte →
                    </a>
                </div>
            </div>

            {/* Blog content styles */}
            <style>{`
        .blog-content h2 { color: #fff; font-size: 1.6rem; font-weight: 900; margin: 2.5rem 0 1rem; }
        .blog-content h3 { color: #0055FF; font-size: 1.2rem; font-weight: 800; margin: 2rem 0 0.75rem; }
        .blog-content p { margin-bottom: 1.25rem; }
        .blog-content ul, .blog-content ol { margin: 1rem 0 1rem 1.5rem; }
        .blog-content li { margin-bottom: 0.5rem; }
        .blog-content strong { color: #fff; font-weight: 800; }
        .blog-content a { color: #0055FF; }
        .blog-content blockquote { border-left: 3px solid #0055FF; padding-left: 1.25rem; margin: 1.5rem 0; color: rgba(255,255,255,0.55); font-style: italic; }
        @media (max-width: 600px) {
          .blog-content h2 { font-size: 1.3rem; }
        }
      `}</style>
        </div>
    );
}

// ── Blog List ─────────────────────────────────────────────────────────────────
function BlogList({ posts }: { posts: Post[] }) {
    useEffect(() => {
        document.title = 'Blog Saadcoches – Conseils & Guide Location Voiture à Tanger';
        window.scrollTo(0, 0);
    }, []);

    const published = posts.filter(p => p.published);

    return (
        <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
            <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0, 85, 255,0.12)', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                    <img src={logo} alt="Saadcoches" style={{ height: 40, objectFit: 'contain' }} />
                    <span style={{ color: '#0055FF', fontWeight: 900, fontSize: '1.1rem' }}>Saadcoches</span>
                </a>
                <a href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0055FF'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                    ← Accueil
                </a>
            </nav>

            {/* Hero */}
            <section style={{ padding: '120px 1.5rem 60px', textAlign: 'center', background: 'radial-gradient(ellipse at top, rgba(0, 51, 160,0.08) 0%, transparent 60%)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0, 85, 255,0.1)', border: '1px solid rgba(0, 85, 255,0.2)', padding: '4px 16px', borderRadius: 20, marginBottom: 20 }}>
                    <span style={{ color: '#0055FF', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 2 }}>📝 Blog</span>
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>
                    Conseils & Guide{' '}
                    <span style={{ color: '#0055FF' }}>Location Voiture</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 550, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
                    Astuces, guides de voyage et actualités pour profiter au maximum de votre séjour à Tanger.
                </p>
            </section>

            {/* Grid */}
            <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem 6rem' }}>
                {published.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '4rem 0', fontSize: '1.1rem' }}>
                        Aucun article publié pour le moment.
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
                        {published.map(post => (
                            <a key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#111', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'; el.style.borderColor = 'rgba(0, 85, 255,0.3)'; }}
                                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(255,255,255,0.06)'; }}>

                                {/* Cover */}
                                <div style={{ height: 200, background: post.coverImage ? 'transparent' : 'linear-gradient(135deg, #1a1a1a, #2a0000)', overflow: 'hidden', position: 'relative' }}>
                                    {post.coverImage
                                        ? <img src={resolveImage(post.coverImage)} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>📝</div>
                                    }
                                </div>

                                {/* Info */}
                                <div style={{ padding: '1.25rem' }}>
                                    {/* Tags */}
                                    {post.tags?.slice(0, 2).map(tag => (
                                        <span key={tag} style={{ display: 'inline-block', background: 'rgba(0, 85, 255,0.1)', color: '#ff6b6b', fontSize: '0.65rem', fontWeight: 700, padding: '2px 10px', borderRadius: 20, marginBottom: 10, marginRight: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{tag}</span>
                                    ))}

                                    <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '1.05rem', lineHeight: 1.4, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h2>

                                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>📅 {formatDate(post.publishedAt)}</span>
                                        <span style={{ color: '#0055FF', fontWeight: 800, fontSize: '0.8rem' }}>Lire l'article →</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

// ── Main Blog Router ──────────────────────────────────────────────────────────
export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const slug = window.location.pathname.replace(/^\/blog\/?/, '');

    useEffect(() => {
        fetch(`${NC_API}/data`, { cache: 'no-store' })
            .then(r => r.json())
            .then(data => { setPosts(Array.isArray(data.posts) ? data.posts : []); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#0055FF', fontSize: '1.5rem', animation: 'pulse 1.5s infinite' }}>●</div>
        </div>
    );

    if (slug && slug !== '') {
        const post = posts.find(p => p.slug === slug && p.published);
        if (!post) return (
            <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', gap: 20 }}>
                <div style={{ fontSize: '4rem' }}>📝</div>
                <h1 style={{ fontWeight: 900 }}>Article introuvable</h1>
                <a href="/blog" style={{ color: '#0055FF', fontWeight: 800, textDecoration: 'none' }}>← Retour au blog</a>
            </div>
        );
        return <BlogPost post={post} />;
    }

    return <BlogList posts={posts} />;
}
