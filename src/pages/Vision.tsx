import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Vision() {
  useEffect(() => {
    const lines = document.querySelectorAll('.line-span')
    lines.forEach((line) => {
      gsap.fromTo(line, 
        { opacity: 0.1, y: 20 },
        { 
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            end: 'top 50%',
            scrub: true
          }
        }
      )
    })
  }, [])

  const text = "CODE IS ORGANIC. MOTION IS EMOTION. DESIGN IS DIALOGUE. WE DONT JUST RENDER INTERFACES. WE SIMULATE LIVING ECOSYSTEMS WHERE DATA BREATHES AND REACTION IS INSTANT."

  return (
    <section id="vision" className="narrative-section">
      <div className="section-label reveal">THE_MANIFESTO / BEYOND_PIXELS</div>
      <div className="narrative-text">
        {text.split(' ').map((word, i) => (
          <span key={i} className="line-span" style={{ color: 'var(--fg)', marginRight: '15px' }}>{word} </span>
        ))}
      </div>
    </section>
  )
}
