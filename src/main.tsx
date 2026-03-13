import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NourCoches from './NourCoches.tsx'
import Admin from './Admin.tsx'
import LuxuryCollection from './LuxuryCollection.tsx'
import Blog from './Blog.tsx'

const path = window.location.pathname;

const App = () => {
  if (path === '/admin') return <Admin />;
  if (path === '/luxury') return <LuxuryCollection />;
  if (path === '/blog' || path.startsWith('/blog/')) return <Blog />;

  // Handle /cars/:slug
  const carMatch = path.match(/^\/cars\/([^\/]+)/);
  if (carMatch) {
    return <NourCoches carSlug={carMatch[1]} />;
  }

  return <NourCoches />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
