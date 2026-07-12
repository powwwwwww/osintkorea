import { HeroBackground } from '@/components/ui/hero-background';
import { SiteHeader } from '@/components/ui/site-header';
import './site-hero.css';

export const SiteHero = () => {
  return (
    <div className="hero">
      <HeroBackground />

      <SiteHeader overlay />

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
