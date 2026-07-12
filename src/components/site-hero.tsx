import { Link } from 'react-router-dom';
import { HeroBackground } from '@/components/ui/hero-background';
import { SiteNav } from '@/components/ui/site-nav';
import './site-hero.css';

export const SiteHero = () => {
  return (
    <div className="hero">
      <HeroBackground />

      <header className="hero__header">
        <Link className="hero__logo" to="/">
          <img src="/logo.png" alt="OSINT KOREA" />
        </Link>

        <SiteNav className="hero__nav" />
      </header>

      <h1 className="hero__title">
        <span className="hero__title-main">OSINT</span>
        <span className="hero__title-sub">KOREA</span>
      </h1>

      <footer className="hero__footer">
        &copy; OSINT KOREA. ALL RIGHTS RESERVED. ALL OF OSINT KOREA'S CONTENT IS COPYRIGHTED.
      </footer>
    </div>
  );
};
