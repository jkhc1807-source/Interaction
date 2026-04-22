import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.scss'

// Components
import Preloader from './components/Preloader'

// Pages
import Experiments from './pages/Experiments'
import Vision from './pages/Vision'
import Contact from './pages/Contact'

gsap.registerPlugin(ScrollTrigger)

const HERO_SLIDES = [
  { line1: 'KINETIC', line2: 'STRUCTURE', colors: ['#00f3ff', '#0070ff', '#00c3ff'] },
  { line1: 'CODED', line2: 'EMOTION', colors: ['#ff007a', '#ff00ff', '#bd00ff'] },
  { line1: 'DIGITAL', line2: 'POETRY', colors: ['#e2ff00', '#a0ff00', '#00ffaa'] },
  { line1: 'FUTURE', line2: 'ARCHIVE', colors: ['#ffffff', '#cccccc', '#999999'] }
]

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', num: '01' },
  { id: 'vision', label: 'VISION', num: '02' },
  { id: 'experiments', label: 'EXPERIMENTS', num: '03' },
  { id: 'contact', label: 'CONTACT', num: '04' }
]

function AppContent() {
  const [time, setTime] = useState('00:00:00')
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [activeExp, setActiveId] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  
  const ringRef = useRef<HTMLDivElement>(null)
  const rxTo = useRef<any>(null)
  const ryTo = useRef<any>(null)
  const lenisRef = useRef<Lenis | null>(null)

  const scrollToSection = (id: string) => {
    if (lenisRef.current) {
      const target = id === 'home' ? 0 : `#${id}`
      lenisRef.current.scrollTo(target, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    }
  }

  const handleMagnetic = (e: React.MouseEvent<HTMLElement>, strength: number = 0.4) => {
    const el = e.currentTarget
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' })
  }

  const resetMagnetic = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
  }

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    updateTime(); const timer = setInterval(updateTime, 1000)
    
    const lenis = new Lenis({ duration: 1.5, lerp: 0.1, smoothWheel: true })
    lenisRef.current = lenis
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)

    const ctx = gsap.context(() => {
      rxTo.current = gsap.quickTo(ringRef.current, "x", { duration: 0.2, ease: "power2.out" })
      ryTo.current = gsap.quickTo(ringRef.current, "y", { duration: 0.2, ease: "power2.out" })

      NAV_ITEMS.forEach((item) => {
        const trigger = item.id === 'home' ? '.hero-section' : `#${item.id}`
        ScrollTrigger.create({
          trigger: trigger,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveSection(item.id),
          onEnterBack: () => setActiveSection(item.id)
        })
      })
    })

    const onMouseMove = (e: MouseEvent) => {
      rxTo.current?.(e.clientX); ryTo.current?.(e.clientY)
      const target = e.target as HTMLElement
      const isInteractive = !!target.closest('button, a, input, textarea, .logo, .work-item, .archive-item, [role="button"]')
      const hasText = target.innerText && target.innerText.trim().length > 0 && target.childNodes.length <= 3
      const isTextTag = !!target.closest('h1, h2, h3, h4, p, span, label, li')
      setIsHovered(isInteractive || isTextTag || (hasText && target.tagName !== 'DIV'))
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => { ctx.revert(); clearInterval(timer); lenis.destroy(); window.removeEventListener('mousemove', onMouseMove) }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isLoading) ScrollTrigger.refresh()
  }, [isLoading])

  useEffect(() => {
    if (location.pathname !== '/' || isLoading) return
    let ctx = gsap.context(() => {
      const chars = document.querySelectorAll('.hero-title .char')
      if (chars.length === 0) return
      const tl = gsap.timeline()
      gsap.set(chars, { opacity: 0, x: 0, y: 0, scale: 1, rotation: 0, filter: 'blur(0px)' })
      chars.forEach((char, i) => {
        const type = i % 3
        if (type === 0) tl.fromTo(char, { rotationY: 180, opacity: 0, z: -300 }, { rotationY: 0, opacity: 1, z: 0, duration: 1, ease: 'back.out(1.5)' }, i * 0.03)
        else if (type === 1) tl.fromTo(char, { y: -400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'bounce.out' }, i * 0.03)
        else tl.fromTo(char, { scale: 4, opacity: 0, filter: 'blur(40px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power4.out' }, i * 0.03)
      })
      tl.to(chars, {
        x: () => (Math.random() - 0.5) * 1500,
        y: () => (Math.random() - 0.5) * 1000,
        scale: 0,
        rotation: () => (Math.random() - 0.5) * 720,
        opacity: 0,
        filter: 'blur(40px)',
        duration: 0.8,
        ease: 'power2.in',
        stagger: { each: 0.02, from: "random" },
        delay: 2.5,
        onComplete: () => { setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length) }
      })
    })
    return () => ctx.revert()
  }, [activeSlide, location.pathname, isLoading])

  const splitText = (text: string, colors: string[] = ['#ffffff'], isOutline: boolean = false) => text.split('').map((char, i) => (
    <span 
      key={`${activeSlide}-${i}`}
      className="char" 
      style={{ 
        display: 'inline-block',
        color: isOutline ? 'transparent' : colors[i % colors.length],
        WebkitTextStroke: isOutline ? `2.5px ${colors[i % colors.length]}` : 'none'
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div ref={ringRef} className={`cursor-ring ${isHovered ? 'active' : ''}`} />

      {/* 🧭 GLOBAL HEADER: OUTSIDE ANY CONTAINER */}
      <header className="header">
        <div className="nav-container">
          <div className="nav-left"><Link to="/" className="logo" onMouseMove={(e) => handleMagnetic(e, 0.5)} onMouseOut={resetMagnetic}>TYPO.ARCHIVE</Link></div>
          <div className="nav-right">
            <div className="nav-links">
              {NAV_ITEMS.slice(1).map((item) => (
                <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''} onMouseMove={(e) => handleMagnetic(e, 0.3)} onMouseOut={resetMagnetic} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}>{item.label}</a>
              ))}
            </div>
            <button className="mobile-menu-trigger" onClick={() => setIsMenuOpen(true)}>MENU</button>
            <div className="clock-container"><span className="clock-value">{time}</span></div>
          </div>
        </div>
      </header>

      {/* 📱 MOBILE MENU: GLOBAL LAYER */}
      <div className={`mobile-menu ${isMenuOpen ? 'visible' : ''}`}>
        <div className="menu-header"><button className="close-btn" onClick={() => setIsMenuOpen(false)}>[ CLOSE ]</button></div>
        <nav className="menu-links">
          <div className="menu-label">NAVIGATE_TO</div>
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); setIsMenuOpen(false); }}>
              <span>{item.num}</span> {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* 📍 MOBILE INDICATOR: GLOBAL LAYER */}
      <nav className="mobile-indicator">
        {NAV_ITEMS.map((item) => (
          <div key={item.id} className={`indicator-item ${activeSection === item.id ? 'active' : ''}`} onClick={() => scrollToSection(item.id)}>
            <span className="num">{item.num}</span>
          </div>
        ))}
      </nav>

      {/* 🧪 MAIN SCROLLABLE CONTENT */}
      <div className={`main-archive ${isMenuOpen ? 'menu-open' : ''}`}>
        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={
              <>
                <section className="hero-section">
                  <div className="hero-title-container">
                    <h1 className="hero-title">
                      <div className="line">{splitText(HERO_SLIDES[activeSlide].line1, HERO_SLIDES[activeSlide].colors)}</div>
                      <div className="line"><span>{splitText(HERO_SLIDES[activeSlide].line2, HERO_SLIDES[activeSlide].colors, true)}</span></div>
                    </h1>
                  </div>
                  <div className="hero-footer">
                    <div className="slide-index">INDEX_0{activeSlide + 1} / 04</div>
                    <div className="hero-meta">DYNAMIC_ASSEMBLY / EST. 2026</div>
                  </div>
                </section>
                <Vision />
                <Experiments activeExp={activeExp} setActiveId={setActiveId} splitText={splitText} />
                <Contact />
              </>
            } />
          </Routes>
        </main>
        <footer className="footer">
          <div className="marquee-container"><div className="marquee-content">{Array(10).fill('STAY ELASTIC • CODING THE UNSEEN • ').map((text, i) => (<span key={i}>{text}</span>))}</div></div>
        </footer>
      </div>
    </>
  )
}

export default function App() { return ( <Router> <AppContent /> </Router> ) }
