import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Vision() {
  useEffect(() => {
    let ctx = gsap.context(() => {
      const lines = document.querySelectorAll('.line-span')
      lines.forEach((line) => {
        gsap.fromTo(line, 
          { opacity: 0.1 },
          { 
            opacity: 1,
            scrollTrigger: {
              trigger: line,
              start: 'top 95%',
              end: 'top 55%',
              scrub: 1
            }
          }
        )

        gsap.to(line, {
          opacity: 0.1,
          scrollTrigger: {
            trigger: line,
            start: 'top 45%',
            end: 'top 5%',
            scrub: 1
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const text = "CODE IS ORGANIC. MOTION IS EMOTION. DESIGN IS DIALOGUE. WE DONT JUST RENDER INTERFACES. WE SIMULATE LIVING ECOSYSTEMS WHERE DATA BREATHES AND REACTION IS INSTANT."

  return (
    <section id="vision" className="narrative-section">
      <div className="section-label reveal"><span>THE_MANIFESTO / BEYOND_PIXELS</span></div>
      <div className="narrative-text">
        {text.split(' ').map((word, i) => (
          <span key={i} className="line-span" style={{ color: 'var(--fg)', marginRight: '15px' }}>{word} </span>
        ))}
      </div>
    </section>
  )
}
