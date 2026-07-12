import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/mission', label: 'OSINT KOREA', key: 'mission' },
  { to: '/member', label: 'MEMBER', key: 'member' },
  { to: '/contact', label: 'CONTACT', key: 'contact' },
  { to: '/news', label: 'NEWS', key: 'news' },
] as const;

type NavKey = (typeof NAV_ITEMS)[number]['key'];

export const SiteNav = ({ className, active }: { className?: string; active?: NavKey }) => (
  <nav className={className}>
    {NAV_ITEMS.map((item) => (
      <Link key={item.key} to={item.to} className={active === item.key ? 'is-active' : undefined}>
        {item.label}
      </Link>
    ))}
  </nav>
);
