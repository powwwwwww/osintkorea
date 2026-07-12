import { Routes, Route, Navigate } from 'react-router-dom'
import { SiteHero } from '@/components/site-hero'
import { MemberPage } from '@/components/member-page'
import { MissionPage } from '@/components/mission-page'
import { NewsPage } from '@/components/news-page'
import { ContactPage } from '@/components/contact-page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteHero />} />
      <Route path="/mission" element={<MissionPage />} />
      <Route path="/member" element={<MemberPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
