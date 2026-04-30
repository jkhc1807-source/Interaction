import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Vision() {
  useEffect(() => {
    let ctx = gsap.context(() => {
      const words = document.querySelectorAll('.word-span')
      
      gsap.fromTo(words, 
        { 
          opacity: 0.1, 
          y: 20, 
          filter: 'blur(10px)' 
        },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.narrative-text',
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: 1.5,
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const text = "CODE IS ORGANIC. MOTION IS EMOTION. DESIGN IS DIALOGUE. WE DONT JUST RENDER INTERFACES. WE SIMULATE LIVING ECOSYSTEMS WHERE DATA BREATHES AND REACTION IS INSTANT."

  return (
    <section id="vision" className="narrative-section">
      <div className="section-label reveal"><span>THE_MANIFESTO / BEYOND_PIXELS</span></div>
      <div className="narrative-text">
        {text.split(' ').map((word, i) => (
          <span key={i} className="word-span" style={{ display: 'inline-block', color: 'var(--fg)', marginRight: '15px' }}>{word} </span>
        ))}
      </div>
    </section>
  )
}
