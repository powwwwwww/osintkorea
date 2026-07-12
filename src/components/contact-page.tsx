import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from '@/components/ui/site-nav';
import { Contact2 } from '@/components/ui/contact-2';
import './contact-page.css';

const CONTACT_EMAIL = 'contact@osintkorea.kr';

export const ContactPage = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const fromEmail = data.get('email')?.toString() ?? '';
    const message = data.get('message')?.toString() ?? '';

    // Fully static site, no backend - hand off to the visitor's mail client
    // with the form fields prefilled instead of posting anywhere.
    const subject = encodeURIComponent(`Message from ${fromEmail || 'website contact form'}`);
    const body = encodeURIComponent(`${message}\n\n— ${fromEmail}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setSent(true);
  };

  return (
    <div className="contact-page">
      <header className="contact-page__header">
        <Link className="contact-page__logo" to="/">
          <img src="/logo.png" alt="OSINT KOREA" />
        </Link>

        <SiteNav className="contact-page__nav" active="contact" />
      </header>

      <Contact2
        title="Contact Us"
        description="We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!"
        onSubmit={handleSubmit}
      />

      {sent && (
        <p className="contact-page__status">
          Your mail app should now be open with this message ready to send.
        </p>
      )}

      <footer className="contact-page__footer">
        &copy; OSINT KOREA. ALL RIGHTS RESERVED. ALL OF OSINT KOREA'S CONTENT IS COPYRIGHTED.
      </footer>
    </div>
  );
};
