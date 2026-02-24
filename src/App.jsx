import { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/logo_white.png'
import InteractiveDots from './components/InteractiveDots'

const ROUTE_LABELS = {
  '/': 'Home',
  '/about': 'About us',
  '/contact': 'Contact us',
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

function PageContent({ route }) {
  const content = {
    '/about': {
      title: 'About Deltuva',
      intro: 'We are a young company determined to create solutions in the RF and EW space.',
      items: [
       
      ],
    },
    '/contact': {
      title: 'Contact us',
      intro: 'Email: hello[at]deltuva.com',
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
    <div className="landing-page">
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
    </div>
  )
}

export default App
