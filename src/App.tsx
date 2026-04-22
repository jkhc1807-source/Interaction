import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.scss'

// Pages
import Experiments from './pages/Experiments'
import Vision from './pages/Vision'
import Contact from './pages/Contact'

gsap.registerPlugin(ScrollTrigger)

const HERO_SLIDES = [
  { line1: 'KINETIC', line2: 'STRUCTURE', colors: ['#00f3ff', '#0070ff', '#00c3ff'] }, // Cyber Blue
  { line1: 'CODED', line2: 'EMOTION', colors: ['#ff007a', '#ff00ff', '#bd00ff'] },    // Neon Magenta
  { line1: 'DIGITAL', line2: 'POETRY', colors: ['#e2ff00', '#a0ff00', '#00ffaa'] },   // Volt Green
  { line1: 'FUTURE', line2: 'ARCHIVE', colors: ['#ffffff', '#cccccc', '#999999'] }    // Silver/White
]

function AppContent() {
  const [time, setTime] = useState('00:00:00')
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeExp, setActiveId] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  
  const ringRef = useRef<HTMLDivElement>(null)
  const rxTo = useRef<any>(null)
  const ryTo = useRef<any>(null)
  const lenisRef = useRef<Lenis | null>(null)

  const scrollToSection = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(id, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    }
  }

  const handleMagnetic = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)
    gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: 'power2.out' })
  }

  const resetMagnetic = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
  }

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    updateTime(); const timer = setInterval(updateTime, 1000)
    const lenis = new Lenis({ duration: 1.5, lerp: 0.1 })
    lenisRef.current = lenis
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)

    const ctx = gsap.context(() => {
      rxTo.current = gsap.quickTo(ringRef.current, "x", { duration: 0.2, ease: "power2.out" })
      ryTo.current = gsap.quickTo(ringRef.current, "y", { duration: 0.2, ease: "power2.out" })
    })

    const onMouseMove = (e: MouseEvent) => {
      rxTo.current?.(e.clientX); ryTo.current?.(e.clientY)
      const target = e.target as HTMLElement
      
      // 1. 명시적인 상호작용 요소 확인
      const isInteractive = !!target.closest('button, a, input, textarea, .logo, .work-item, .archive-item, [role="button"]')
      
      // 2. 텍스트 포함 여부 확인 (더 공격적으로)
      const hasText = target.innerText && target.innerText.trim().length > 0 && target.childNodes.length <= 3
      
      // 3. 텍스트 관련 태그 직접 확인
      const isTextTag = !!target.closest('h1, h2, h3, h4, p, span, label, li')

      setIsHovered(isInteractive || isTextTag || (hasText && target.tagName !== 'DIV'))
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => { ctx.revert(); clearInterval(timer); lenis.destroy(); window.removeEventListener('mousemove', onMouseMove) }
  }, [isMenuOpen])

  useEffect(() => {
    if (location.pathname !== '/') return
    
    // 🎭 GSAP Context: 애니메이션 잔상 및 충돌 완벽 방지
    let ctx = gsap.context(() => {
      const chars = document.querySelectorAll('.hero-title .char')
      if (chars.length === 0) return

      const tl = gsap.timeline()
      
      // 초기화
      gsap.set(chars, { opacity: 0, x: 0, y: 0, scale: 1, rotation: 0, filter: 'blur(0px)' })

      // 1. 입장 애니메이션
      chars.forEach((char, i) => {
        const type = i % 3
        if (type === 0) tl.fromTo(char, { rotationY: 180, opacity: 0, z: -300 }, { rotationY: 0, opacity: 1, z: 0, duration: 1, ease: 'back.out(1.5)' }, i * 0.03)
        else if (type === 1) tl.fromTo(char, { y: -400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'bounce.out' }, i * 0.03)
        else tl.fromTo(char, { scale: 4, opacity: 0, filter: 'blur(40px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power4.out' }, i * 0.03)
      })

      // 2. 대기 후 퇴장 애니메이션 (랜덤 분산 효과)
      tl.to(chars, {
        x: () => (Math.random() - 0.5) * 1500, // 좌우 랜덤
        y: () => (Math.random() - 0.5) * 1000, // 상하 랜덤
        scale: 0,
        rotation: () => (Math.random() - 0.5) * 720, // 회전 랜덤
        opacity: 0,
        filter: 'blur(40px)',
        duration: 0.8,
        ease: 'power2.in',
        stagger: { each: 0.02, from: "random" }, // 사라지는 순서도 랜덤
        delay: 2.5,
        onComplete: () => { 
          setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length) 
        }
      })
    })

    return () => ctx.revert() // 컴포넌트 언마운트나 슬라이드 변경 시 모든 애니메이션 즉시 중단
  }, [activeSlide, location.pathname])

  const splitText = (text: string, colors: string[] = ['#ffffff'], isOutline: boolean = false) => text.split('').map((char, i) => (
    <span 
      key={`${activeSlide}-${i}`} // 슬라이드 인덱스를 포함하여 요소 재사용 방지
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
    <div className={`main-archive ${isMenuOpen ? 'menu-open' : ''}`}>
      <div ref={ringRef} className={`cursor-ring ${isHovered ? 'active' : ''}`} />

      <div className={`mobile-menu ${isMenuOpen ? 'visible' : ''}`}>
        <div className="menu-header"><button className="close-btn" onClick={() => setIsMenuOpen(false)}>[ CLOSE ]</button></div>
        <nav className="menu-links">
          <div className="menu-label">NAVIGATE_TO</div>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('top'); setIsMenuOpen(false); }}><span>01</span> HOME</a>
          <a href="#vision" onClick={(e) => { e.preventDefault(); scrollToSection('#vision'); setIsMenuOpen(false); }}><span>02</span> VISION</a>
          <a href="#experiments" onClick={(e) => { e.preventDefault(); scrollToSection('#experiments'); setIsMenuOpen(false); }}><span>03</span> EXPERIMENTS</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); setIsMenuOpen(false); }}><span>04</span> CONTACT</a>
        </nav>
      </div>

      <header className="header">
        <div className="nav-container">
          <div className="nav-left"><Link to="/" className="logo" onMouseMove={handleMagnetic} onMouseOut={resetMagnetic}>TYPO.ARCHIVE</Link></div>
          <div className="nav-right">
            <div className="nav-links">
              <a href="#vision" onMouseMove={handleMagnetic} onMouseOut={resetMagnetic} onClick={(e) => { e.preventDefault(); scrollToSection('#vision'); }}>VISION</a>
              <a href="#experiments" onMouseMove={handleMagnetic} onMouseOut={resetMagnetic} onClick={(e) => { e.preventDefault(); scrollToSection('#experiments'); }}>EXPERIMENTS</a>
              <a href="#contact" onMouseMove={handleMagnetic} onMouseOut={resetMagnetic} onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}>CONTACT</a>
            </div>
            <button className="mobile-menu-trigger" onClick={() => setIsMenuOpen(true)}>MENU</button>
            <div className="clock-container"><span className="clock-value">{time}</span></div>
          </div>
        </div>
      </header>

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
              {/* 메인 페이지 하단 컨텐츠 추가 */}
              <Vision />
              <Experiments activeExp={activeExp} setActiveId={setActiveId} splitText={splitText} />
              <Contact />
            </>
          } />
          <Route path="/experiments" element={<Experiments activeExp={activeExp} setActiveId={setActiveId} splitText={splitText} />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="marquee-container"><div className="marquee-content">{Array(10).fill('STAY ELASTIC • CODING THE UNSEEN • ').map((text, i) => (<span key={i}>{text}</span>))}</div></div>
      </footer>
    </div>
  )
}

export default function App() { return ( <Router> <AppContent /> </Router> ) }
