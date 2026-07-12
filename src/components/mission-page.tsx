import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from '@/components/ui/site-nav';
import { DiscordIcon, YoutubeIcon, XIcon, TiktokIcon, LinkedInIcon } from '@/components/ui/social-icons';
import './mission-page.css';

type Lang = 'EN' | 'KR';

const DESCRIPTION: Record<Lang, string> = {
  EN: "OSINT Korea is a community of researchers and analysts dedicated to advancing open-source intelligence practice in Korea. We bring together practitioners to share methodologies, tools, and findings that push the field forward.",
  KR: 'OSINT KOREA는 한국의 오픈소스 인텔리전스(OSINT) 실무를 발전시키기 위해 모인 연구자와 분석가들의 커뮤니티입니다. 우리는 실무자들이 방법론과 도구, 연구 결과를 공유하며 이 분야를 함께 발전시켜 나갑니다.',
};

export const MissionPage = () => {
  const [lang, setLang] = useState<Lang>('EN');

  return (
    <div className="mission-page">
      <header className="mission-page__header">
        <Link className="mission-page__logo" to="/">
          <img src="/logo.png" alt="OSINT KOREA" />
        </Link>

        <SiteNav className="mission-page__nav" active="mission" />
      </header>

      <main className="mission-page__content">
        <h1 className="mission-page__title">OSINT KOREA</h1>

        <p className="mission-page__description">
          {DESCRIPTION[lang]}
        </p>

        <a className="mission-page__contact" href="mailto:contact@osintkorea.kr">
          contact@osintkorea.kr
        </a>
      </main>

      <div className="mission-page__lang">
        <button
          type="button"
          className={lang === 'EN' ? 'is-active' : undefined}
          onClick={() => setLang('EN')}
        >
          EN
        </button>
        <button
          type="button"
          className={lang === 'KR' ? 'is-active' : undefined}
          onClick={() => setLang('KR')}
        >
          KR
        </button>
      </div>

      <div className="mission-page__socials">
        <a href="https://discord.gg/xj3dr4bAE9" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="mission-page__social--discord"><DiscordIcon /></a>
        <a href="#" aria-label="YouTube"><YoutubeIcon /></a>
        <a href="#" aria-label="X"><XIcon /></a>
        <a href="#" aria-label="TikTok"><TiktokIcon /></a>
        <a href="https://linkedin.com/company/osintkorea/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
      </div>

      <footer className="mission-page__footer">
        &copy; OSINT KOREA. ALL RIGHTS RESERVED. ALL OF OSINT KOREA'S CONTENT IS COPYRIGHTED.
      </footer>
    </div>
  );
};
