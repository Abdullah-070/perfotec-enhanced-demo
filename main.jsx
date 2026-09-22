import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Factory,
  Gauge,
  Globe2,
  Leaf,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import './styles.css'

const contact = {
  email: 'info@perfotec.com',
  phone: '+31 (0) 297 255 554',
  phoneHref: 'tel:+31297255554',
  address: 'Klompenmakersweg 16, 3449 JB Woerden, Netherlands',
  linkedin: 'https://www.linkedin.com/company/perfotec/?viewAsMember=true',
}

const buyerPaths = [
  {
    id: 'packers',
    label: 'Growers & packers',
    short: '01',
    headline: 'Make every pack work harder.',
    copy: 'Match the atmosphere to the product so quality holds from the first hour after harvest to the retail shelf.',
    outcomes: ['Shelf-life trials', 'Respiration analysis', 'Packaging advice'],
    image: '/berries.jpg',
    labelLine: 'For produce teams',
  },
  {
    id: 'converters',
    label: 'Film converters',
    short: '02',
    headline: 'Turn film into a freshness advantage.',
    copy: 'Bring precision perforation and feedback control into your line to create high-performance breathable films.',
    outcomes: ['Multi-head laser', 'Online laser system', 'BOPE film'],
    image: '/mhl-wide.jpg',
    labelLine: 'For packaging innovators',
  },
  {
    id: 'freshcut',
    label: 'Fresh-cut producers',
    short: '03',
    headline: 'Control the atmosphere around every cut.',
    copy: 'Build a more stable MAP process with measured respiration, gas control, and packaging that fits the product.',
    outcomes: ['O₂Control', 'Fast Respiration Meter', 'Closed-loop feedback'],
    image: '/o2-control.jpg',
    labelLine: 'For fresh-cut operations',
  },
  {
    id: 'logistics',
    label: 'Exporters & logistics',
    short: '04',
    headline: 'Protect quality beyond the field.',
    copy: 'Create the right environment for produce during storage and long-distance transport, where small losses compound.',
    outcomes: ['Liners', 'Pallet covers', 'Transport protection'],
    image: '/online-laser.jpg',
    labelLine: 'For supply-chain teams',
  },
]

const products = [
  {
    id: 'laser',
    label: 'Laser systems',
    title: 'Precision where the line moves fast.',
    copy: 'In-line and multi-head laser systems designed to create consistent micro-perforation, with camera control for real-time verification.',
    specs: [['450 m/min', 'production speed'], ['250 fps', 'camera inspection'], ['2 min', 'changeover'], ['50–200 µm', 'perforation range']],
    image: '/mhl-detail.jpg',
    source: 'https://www.perfotec.com/multi-head-laser-system',
  },
  {
    id: 'gas',
    label: 'Gas control',
    title: 'A steadier atmosphere inside every pack.',
    copy: 'O₂Control uses real-time monitoring and adjustment to create precise gas conditions for fresh produce packaging.',
    specs: [['< 0.5%', 'O₂ / N₂ deviation'], ['3 sensors', 'precision control'], ['Live', 'feedback loop'], ['Modular', 'line integration']],
    image: '/o2-control.jpg',
    source: 'https://www.perfotec.com/o2control',
  },
  {
    id: 'measure',
    label: 'Measurement',
    title: 'Start with how the product breathes.',
    copy: 'Measure respiration, design the atmosphere, and use that insight to make a more confident packaging decision.',
    specs: [['01', 'measure'], ['02', 'design'], ['03', 'apply'], ['04', 'protect']],
    image: '/online-laser-detail.jpg',
    source: 'https://www.perfotec.com/frm',
  },
]

const stories = [
  ['Blueberries', 'Less weight loss and firmer fruit on long sea-freight routes.', 'https://www.perfotec.com/perfotec-in-action/blueberry-success-story'],
  ['Strawberries', 'A product-specific approach for a fragile, high-value crop.', 'https://www.perfotec.com/perfotec-in-action/strawberries-success-story'],
  ['Tulips', 'Freshness thinking that travels beyond fruit and vegetables.', 'https://www.perfotec.com/perfotec-in-action/tulip-success-story'],
]

const faqs = [
  ['Where do I start?', 'Start with your product, route, current packaging, and the point where quality is being lost. PerfoTec can then direct the conversation toward measurement, packaging advice, equipment, or transport protection.'],
  ['Is this only for fresh produce?', 'PerfoTec’s public site presents applications across fruits, vegetables, flowers, fresh-cut products, films, and transport environments. The right solution depends on the product and process.'],
  ['Can PerfoTec work with an existing line?', 'Several public product pages describe modular or in-line solutions. Exact compatibility, integration requirements, and project scope should be confirmed with the PerfoTec team.'],
]

function App() {
  const [activeBuyer, setActiveBuyer] = useState('packers')
  const [activeProduct, setActiveProduct] = useState('laser')
  const [heroSlide, setHeroSlide] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const buyer = useMemo(() => buyerPaths.find((item) => item.id === activeBuyer), [activeBuyer])
  const product = useMemo(() => products.find((item) => item.id === activeProduct), [activeProduct])

  useEffect(() => {
    const timer = setInterval(() => setHeroSlide((current) => (current + 1) % buyerPaths.length), 6500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    }), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openContact = (interest = '') => {
    setSubmitted(false)
    setModalOpen(true)
    setTimeout(() => {
      const select = document.querySelector('select[name="interest"]')
      if (select && interest) select.value = interest
    }, 50)
  }

  const submitForm = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="perfotec-shell">
      <div className="announcement"><span><span className="pulse-dot" /> PerfoTec / Freshness, engineered</span><span className="announcement-right">Measure · Design · Apply · Protect</span></div>
      <header className="site-header">
        <a className="logo" href="#top" onClick={(event) => { event.preventDefault(); scrollTo('top') }} aria-label="PerfoTec home"><img className="brand-logo" src="/perfotec-logo.png" alt="PerfoTec" /></a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          <button onClick={() => scrollTo('buyer')}>Find your path</button>
          <button onClick={() => scrollTo('solutions')}>Solutions</button>
          <button onClick={() => scrollTo('proof')}>Proof</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>
        <div className="header-actions"><a className="tech-link" href="https://cdn.prod.website-files.com/68b594c756c22085ddc6c1ea/6a0f05593d1d68c511172a93_PerfoTec.pdf" target="_blank" rel="noreferrer">Technology overview <ArrowUpRight size={14} /></a><button className="header-cta" onClick={() => openContact('I need advice')}>Talk to an expert <ArrowUpRight size={14} /></button><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-content reveal">
            <div className="overline"><span /> Post-harvest technology / The right atmosphere changes everything</div>
            <h1>Freshness is<br /><em>engineered.</em></h1>
            <p>PerfoTec helps the fresh-produce supply chain understand, design, and protect the atmosphere around every product.</p>
            <div className="hero-buttons"><button className="button button-primary" onClick={() => scrollTo('buyer')}>Find your solution <ArrowRight size={16} /></button><button className="quiet-link" onClick={() => scrollTo('how')}><Play size={14} fill="currentColor" /> See how it works</button></div>
            <div className="hero-stats"><div><strong>40+</strong><span>countries</span></div><div><strong>20+</strong><span>years of expertise</span></div><div><strong>300+</strong><span>sites worldwide</span></div></div>
          </div>
          <div className="hero-visual reveal"><div className="hero-media"><img src={buyerPaths[heroSlide].image} alt={buyerPaths[heroSlide].labelLine} /><div className="hero-shade" /><div className="hero-caption"><span>{buyerPaths[heroSlide].short} / 04</span><strong>{buyerPaths[heroSlide].labelLine}</strong><p>{buyerPaths[heroSlide].headline}</p></div><div className="hero-arrows"><button aria-label="Previous audience" onClick={() => setHeroSlide((heroSlide + buyerPaths.length - 1) % buyerPaths.length)}><ChevronLeft /></button><button aria-label="Next audience" onClick={() => setHeroSlide((heroSlide + 1) % buyerPaths.length)}><ChevronRight /></button></div></div><div className="hero-side-note"><Leaf size={16} /><span>Fresh produce is alive.<br />We help it breathe.</span></div></div>
        </section>

        <section className="ticker"><div className="ticker-track"><span>RESPIRATION</span><i>✳</i><span>PACKAGING</span><i>✳</i><span>FRESHNESS</span><i>✳</i><span>RESPIRATION</span><i>✳</i><span>PACKAGING</span><i>✳</i><span>FRESHNESS</span><i>✳</i></div></section>

        <section className="buyer section" id="buyer"><div className="section-top reveal"><span>01 / Start with the right question</span><span>One ecosystem / Different entry points</span></div><div className="buyer-intro reveal"><h2>What are you<br /><em>trying to protect?</em></h2><p>The best PerfoTec conversation starts with the pressure point in your supply chain—not a product name.</p></div><div className="buyer-layout"><div className="buyer-tabs reveal">{buyerPaths.map((path) => <button key={path.id} className={activeBuyer === path.id ? 'buyer-tab active' : 'buyer-tab'} onClick={() => setActiveBuyer(path.id)}><span>{path.short}</span><strong>{path.label}</strong><ArrowUpRight size={15} /></button>)}</div><div className="buyer-card reveal"><div className="buyer-card-image"><img src={buyer.image} alt={buyer.labelLine} /><span>{buyer.short} / PerfoTec pathway</span></div><div className="buyer-card-copy"><span className="small-label">{buyer.labelLine}</span><h3>{buyer.headline}</h3><p>{buyer.copy}</p><ul>{buyer.outcomes.map((outcome) => <li key={outcome}><Check size={14} /> {outcome}</li>)}</ul><button className="button button-outline" onClick={() => openContact(buyer.outcomes[0])}>Explore this path <ArrowUpRight size={15} /></button></div></div></div></section>

        <section className="how section" id="how"><div className="section-top reveal"><span>02 / The freshness loop</span><span>A method that makes complex decisions clearer</span></div><div className="how-grid"><div className="how-title reveal"><h2>Measure first.<br /><em>Then move.</em></h2><p>PerfoTec turns product respiration into a practical packaging decision through four connected steps.</p><a className="text-link" href="https://www.perfotec.com/our-solution" target="_blank" rel="noreferrer">See the full method <ArrowUpRight size={14} /></a></div><div className="method reveal"><div className="method-step"><span>01</span><div><Leaf /><h3>Measure</h3><p>Understand how your product breathes.</p></div></div><div className="method-step"><span>02</span><div><Gauge /><h3>Design</h3><p>Define the ideal gas and humidity balance.</p></div></div><div className="method-step"><span>03</span><div><Factory /><h3>Apply</h3><p>Use the right equipment or packaging solution.</p></div></div><div className="method-step"><span>04</span><div><ShieldCheck /><h3>Protect</h3><p>Keep produce fresh through storage, transport, and retail.</p></div></div></div></div></section>

        <section className="solutions section" id="solutions"><div className="section-top reveal"><span>03 / Solutions</span><span>Precision equipment / Practical packaging</span></div><div className="solutions-heading reveal"><h2>Tools for the<br /><em>whole atmosphere.</em></h2><p>Move from a broad problem to the right technical conversation—without making buyers decode the product catalog first.</p></div><div className="product-tabs reveal">{products.map((item) => <button key={item.id} className={activeProduct === item.id ? 'product-tab active' : 'product-tab'} onClick={() => setActiveProduct(item.id)}>{item.label}<ArrowUpRight size={15} /></button>)}</div><div className="product-feature reveal"><div className="product-image"><img src={product.image} alt={product.title} /><span>PerfoTec / {product.label}</span></div><div className="product-copy"><span className="small-label">{product.label}</span><h3>{product.title}</h3><p>{product.copy}</p><div className="spec-grid">{product.specs.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><a className="text-link" href={product.source} target="_blank" rel="noreferrer">View product details <ArrowUpRight size={14} /></a></div></div></section>

        <section className="proof section" id="proof"><div className="section-top reveal"><span>04 / Proof in context</span><span>Real crops / Real supply-chain questions</span></div><div className="proof-heading reveal"><h2>Make the<br /><em>evidence easy to find.</em></h2><p>Case studies should help a buyer recognize their crop, route, and problem in seconds.</p><a className="text-link" href="https://www.perfotec.com/perfotec-case-studies" target="_blank" rel="noreferrer">View all case studies <ArrowUpRight size={14} /></a></div><div className="story-grid reveal">{stories.map(([title, text, href], index) => <a className="story" href={href} target="_blank" rel="noreferrer" key={title}><div className="story-number">0{index + 1}</div><div><span className="small-label">Success story</span><h3>{title}</h3><p>{text}</p><span className="story-arrow"><ArrowUpRight size={17} /></span></div></a>)}</div></section>

        <section className="quote-section"><div className="quote-icon"><Quote /></div><blockquote>“The right packaging starts with understanding what the product is trying to do.”</blockquote><span>— The PerfoTec approach</span></section>

        <section className="faq section"><div className="section-top reveal"><span>05 / Clear the next question</span><span>For technical and commercial teams</span></div><div className="faq-grid"><h2 className="reveal">Not sure<br /><em>where to start?</em></h2><div className="faq-list reveal">{faqs.map(([question, answer], index) => <div className={openFaq === index ? 'faq-row open' : 'faq-row'} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></div></section>

        <section className="contact section" id="contact"><div className="contact-grid reveal"><div><span className="small-label">06 / Start with your product</span><h2>Let’s find the<br /><em>right atmosphere.</em></h2><p>Tell us what you are growing, packing, converting, or moving. We’ll help you find the right first conversation.</p><button className="button button-light" onClick={() => openContact('I need advice')}>Talk to an expert <ArrowUpRight size={15} /></button></div><div className="contact-details"><div><Mail size={17} /><a href={`mailto:${contact.email}`}>{contact.email}</a></div><div><Phone size={17} /><a href={contact.phoneHref}>{contact.phone}</a></div><div><MapPin size={17} /><span>{contact.address}</span></div><a className="contact-tech" href="https://cdn.prod.website-files.com/68b594c756c22085ddc6c1ea/6a0f05593d1d68c511172a93_PerfoTec.pdf" target="_blank" rel="noreferrer"><ClipboardCheck size={16} /> Download technology overview <ArrowUpRight size={14} /></a></div></div></section>
      </main>

      <footer className="footer"><a className="logo" href="#top" onClick={(event) => { event.preventDefault(); scrollTo('top') }}><img className="brand-logo" src="/perfotec-logo.png" alt="PerfoTec" /></a><p>Concept direction: a clearer buyer journey for PerfoTec’s public solution ecosystem.</p><div className="footer-right"><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><span>© 2026 PerfoTec</span></div></footer>

      {modalOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Contact PerfoTec"><div className="modal"><button className="modal-close" aria-label="Close form" onClick={() => setModalOpen(false)}><X /></button>{submitted ? <div className="success"><div className="success-symbol"><Check /></div><span className="small-label">Demo confirmation</span><h2>That’s a useful<br /><em>first step.</em></h2><p>This concept captures the inquiry locally for demonstration. Connect it to the PerfoTec inbox or CRM before production.</p><button className="button button-primary" onClick={() => setModalOpen(false)}>Back to the page <ArrowRight size={15} /></button></div> : <><span className="small-label">Start a conversation</span><h2>Tell us about<br /><em>the product.</em></h2><p className="modal-lede">A few details will help route your question to the right technical conversation.</p><form onSubmit={submitForm}><label>Name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label><label>What do you need?<select required name="interest" defaultValue=""><option value="" disabled>Select a path</option><option>I need advice</option><option>Shelf-life trials</option><option>Respiration analysis</option><option>Multi-Head Laser</option><option>O₂Control</option><option>Liners or pallet covers</option></select></label><label>Product / route / question<textarea required name="message" placeholder="Tell us what you are working with..."></textarea></label><button className="button button-primary submit" type="submit">Send inquiry <ArrowUpRight size={15} /></button></form></>}</div></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
