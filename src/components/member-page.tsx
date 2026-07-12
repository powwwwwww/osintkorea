import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LinkedInIcon } from '@/components/ui/social-icons';
import { SiteNav } from '@/components/ui/site-nav';
import './member-page.css';

type Lang = 'EN' | 'KR';

const TITLE: Record<Lang, string> = {
  EN: 'Yeonju Song',
  KR: '송연주',
};

const CATEGORY_TABS = ['FOUNDER', 'MEMBER', 'ALLIES', 'PARTNER'] as const;

const BIO: Record<Lang, [string, string]> = {
  EN: [
    "Founder of OSINT Korea, Yeonju is a cybersecurity professional specializing in open-source intelligence, cyber threat intelligence, and digital investigations. She established OSINT Korea to advance the use of OSINT through collaboration, education, and community-driven research.",
    "With a background in cybersecurity, her work has focused on threat intelligence, malware analysis, and OSINT-based investigations. Her interests include cybercrime, dark web intelligence, humanitarian investigations, and the development of the OSINT ecosystem in Korea.",
  ],
  KR: [
    'OSINT KOREA의 설립자인 연주는 오픈소스 인텔리전스(OSINT), 사이버 위협 인텔리전스, 디지털 수사를 전문으로 하는 사이버보안 전문가입니다. 그녀는 협업, 교육, 커뮤니티 기반 연구를 통해 OSINT의 활용을 발전시키기 위해 OSINT KOREA를 설립했습니다.',
    '사이버보안 분야의 경력을 바탕으로, 그녀의 업무는 위협 인텔리전스, 악성코드 분석, OSINT 기반 수사에 중점을 두어 왔습니다. 그녀의 관심 분야는 사이버 범죄, 다크웹 인텔리전스, 인도주의적 수사, 그리고 한국 내 OSINT 생태계 발전입니다.',
  ],
};

export const MemberPage = () => {
  const [lang, setLang] = useState<Lang>('EN');

  return (
    <div className="member-page">
      <header className="member-page__header">
        <Link className="member-page__logo" to="/">
          <img src="/logo.png" alt="OSINT KOREA" />
        </Link>

        <SiteNav className="member-page__nav" active="member" />
      </header>

      <h1 className="member-page__title">{TITLE[lang]}</h1>

      <main className="member-page__content">
        <div className="member-page__photo">
          <img src="/member-photo.jpg" alt="Yeonju Song" />
        </div>

        <div className="member-page__bio">
          <nav className="member-page__category-tabs">
            {CATEGORY_TABS.map((tab) => (
              <span key={tab} className={tab === 'FOUNDER' ? 'is-active' : undefined}>
                {tab}
              </span>
            ))}
          </nav>

          <p>{BIO[lang][0]}</p>
          <p>{BIO[lang][1]}</p>

          <div className="member-page__socials">
            <a
              href="https://linkedin.com/in/yeonju-kiara-kirchmayr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://powwwwwww.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
            >
              <img className="member-page__blog-icon" src="/blog-icon.png" alt="" />
            </a>
          </div>
        </div>
      </main>

      <div className="member-page__lang">
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

      <footer className="member-page__footer">
        &copy; OSINT KOREA. ALL RIGHTS RESERVED. ALL OF OSINT KOREA'S CONTENT IS COPYRIGHTED.
      </footer>
    </div>
  );
};
