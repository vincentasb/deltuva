import { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/logo_white.png'
import InteractiveDots from './components/InteractiveDots'

const ROUTE_LABELS = {
  '/': 'Home',
  '/about': 'About us',
  '/contact': 'Contact us',
  '/privacy': 'Privacy policy',
  '/products/rf': 'RF',
  '/products/defense': 'Defense',
}

function normalizeHashRoute() {
  if (typeof window === 'undefined') return '/'
  const raw = window.location.hash.replace(/^#/, '')
  if (!raw) return '/'
  return raw.startsWith('/') ? raw : `/${raw}`
}

function PlaceholderCards({ items }) {
  return (
    <div className="placeholder-grid">
      {items.map((item) => (
        <article key={item.title} className="placeholder-card">
          <div className="placeholder-media" aria-hidden="true">
            <img src={logo} alt="" />
          </div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

function PrivacyPolicyContent() {
  return (
    <section className="page-shell policy-shell">
      <p className="page-tag">Privacy policy</p>
      <h1 className="page-title">Privacy Policy</h1>
      <p className="page-intro">
        Deltuva orbital systems is committed to protecting your personal information and handling data
        transparently, securely, and lawfully.
      </p>

      <div className="policy-sections">
        <section>
          <h2>Personal information we collect</h2>
          <p>
            When you visit our website, we may automatically collect limited device and usage data such as browser
            type, IP address, approximate region, referring pages, and interaction events. We may also collect data
            you submit directly, such as your name, company name, email address, and message details when contacting us.
          </p>
        </section>

        <section>
          <h2>Why we process your data</h2>
          <p>
            We process data to operate and secure the website, answer inquiries, prevent abuse, and improve the
            performance and relevance of our services. We only process personal data that is necessary for these purposes.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>You may have rights regarding your personal data, including:</p>
          <ul>
            <li>The right to be informed</li>
            <li>The right of access</li>
            <li>The right to rectification</li>
            <li>The right to erasure</li>
            <li>The right to restrict processing</li>
            <li>The right to data portability</li>
            <li>The right to object</li>
            <li>Rights in relation to automated decision-making and profiling</li>
          </ul>
        </section>

        <section>
          <h2>Links to other websites</h2>
          <p>
            Our website may include links to third-party websites. We are not responsible for the privacy practices
            or content of external websites.
          </p>
        </section>

        <section>
          <h2>Information security</h2>
          <p>
            We use technical and organizational safeguards designed to protect personal data from unauthorized access,
            disclosure, misuse, or loss. No online transmission or storage system can be guaranteed to be fully secure.
          </p>
        </section>

        <section>
          <h2>Legal disclosure</h2>
          <p>
            We may disclose information if required by law, court order, or other lawful request, or when disclosure is
            necessary to protect rights, safety, or prevent fraud.
          </p>
        </section>

        <section>
          <h2>Contact information</h2>
          <p>
            For questions about this Privacy Policy or to exercise your privacy rights, contact us at
            {' '}
            <a href="mailto:hello@deltuva.com">hello@deltuva.com</a>.
          </p>
        </section>
      </div>
    </section>
  )
}

function PageContent({ route }) {
  if (route === '/privacy') {
    return <PrivacyPolicyContent />
  }

  const content = {
    '/about': {
      title: 'About Deltuva',
      intro: 'We are a young company determined to create solutions in the RF and EW space.',
      items: [
       
      ],
    },
    '/contact': {
      title: 'Get in touch',
      intro: (
        <>
          Email:{' '}
          <a href="mailto:hello@deltuva.com">hello@deltuva.com</a>
        </>
      ),
      items: [
      ],
    },
    '/products/rf': {
      title: 'RF products',
      intro: 'Placeholder content for filters, amplifiers, and front-end RF modules.',
      items: [
        { title: 'RF Filters', text: 'Placeholder card for RF filter product series and technical specs.' },
      ],
    },
    '/products/defense': {
      title: 'Defense products',
      intro: 'Placeholder content for resilient systems and mission-critical field electronics.',
      items: [
        { title: 'EW Systems', text: 'Placeholder card for RF countermeasure and signal processing kits.' },
      ],
    },
  }[route]

  if (!content) {
    return (
      <section className="page-shell">
        <p className="page-tag">Page not found</p>
        <h1 className="page-title">This route is not available yet.</h1>
        <a className="page-back" href="#/">Return to landing page</a>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <p className="page-tag">{ROUTE_LABELS[route]}</p>
      <h1 className="page-title">{content.title}</h1>
      <p className="page-intro">{content.intro}</p>
      <PlaceholderCards items={content.items} />
    </section>
  )
}

function App() {
  const [route, setRoute] = useState(() => normalizeHashRoute())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [showCookiePanel, setShowCookiePanel] = useState(true)

  useEffect(() => {
    const onHashChange = () => {
      setRoute(normalizeHashRoute())
      setMobileMenuOpen(false)
      setMobileProductsOpen(false)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const toggleProductsMenu = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setMobileProductsOpen((prev) => !prev)
    }
  }

  const isLanding = route === '/'

  return (
    <div className={`landing-page ${isLanding ? 'landing-home' : ''}`}>
      <div className="backdrop" aria-hidden="true" />
      {isLanding ? <InteractiveDots /> : null}

      <header className="top-bar">
        <a href="#/" className="brand" aria-label="Deltuva orbital systems home">
          <img src={logo} alt="Deltuva orbital systems" className="brand-logo" />
        </a>

        <button
          type="button"
          className="hamburger-toggle"
          aria-label="Toggle navigation menu"
          aria-controls="primary-navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-navigation" className={`actions ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <div className={`products-menu ${mobileProductsOpen ? 'mobile-open' : ''}`}>
            <button
              type="button"
              className="nav-link nav-button"
              aria-haspopup="true"
              aria-expanded={mobileProductsOpen}
              onClick={toggleProductsMenu}
            >
              Products
            </button>
            <div className="dropdown" role="menu" aria-label="Products menu">
              <a href="#/products/rf" role="menuitem" onClick={() => setMobileProductsOpen(false)}>RF</a>
              <a href="#/products/defense" role="menuitem" onClick={() => setMobileProductsOpen(false)}>Defense</a>
            </div>
          </div>
          <a href="#/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About us</a>
          <a href="#/contact" className="contact-btn" onClick={() => setMobileMenuOpen(false)}>Contact us</a>
        </nav>
      </header>

      <main className={`hero ${isLanding ? '' : 'hero-page'}`}>
        {isLanding ? (
          <h1>
            RF solutions
            <br />
            Made in Europe
          </h1>
        ) : (
          <PageContent route={route} />
        )}
      </main>

      {showCookiePanel ? (
        <aside className="cookie-panel" aria-live="polite" aria-label="Cookie consent">
          <p className="cookie-text">
            By clicking “Accept”, you agree to the storing of cookies on your device to enhance site navigation,
            analyze site usage, and assist in our marketing efforts. View our
            {' '}
            <a href="#/privacy" className="cookie-link">Privacy Policy</a>
            {' '}
            for more information.
          </p>
          <div className="cookie-actions">
            <button type="button" className="nav-link cookie-deny" onClick={() => setShowCookiePanel(false)}>
              Deny
            </button>
            <button type="button" className="contact-btn cookie-accept" onClick={() => setShowCookiePanel(false)}>
              Accept
            </button>
          </div>
        </aside>
      ) : null}

      <footer className="site-footer">
        <div className="footer-brand">
          <a href="#/" className="footer-logo-link" aria-label="Deltuva orbital systems home">
            <img src={logo} alt="Deltuva orbital systems" className="footer-logo" />
          </a>
          <p>© 2026. All rights reserved.</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#/privacy">Privacy policy</a>
          <a href="#/about">About us</a>
          <a href="#/contact">Contact us</a>
        </nav>
      </footer>
    </div>
  )
}

export default App
