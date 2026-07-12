import { Link } from 'react-router-dom';
import { SiteNav } from '@/components/ui/site-nav';
import './site-header.css';

type NavKey = 'mission' | 'member' | 'contact' | 'news';

interface SiteHeaderProps {
  active?: NavKey;
  /** Dark hero background needs the light logo as-is; light pages invert it to black. */
  invertLogo?: boolean;
  /** Hero page overlays the header on its canvas instead of flowing in the page. */
  overlay?: boolean;
}

export const SiteHeader = ({ active, invertLogo = false, overlay = false }: SiteHeaderProps) => (
  <header className={overlay ? 'site-header site-header--overlay' : 'site-header'}>
    <Link className="site-header__logo" to="/">
      <img
        className={invertLogo ? 'site-header__logo-img site-header__logo-img--invert' : 'site-header__logo-img'}
        src="/logo.png"
        alt="OSINT KOREA"
      />
    </Link>

    <SiteNav className="site-header__nav" active={active} />
  </header>
);
