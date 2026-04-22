import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Vision() {
  useEffect(() => {
    const lines = document.querySelectorAll('.line-span')
    lines.forEach((line) => {
      gsap.fromTo(line, 
        { opacity: 0.1 },
        { 
          opacity: 1,
          scrollTrigger: {
            trigger: line,
            start: 'top 95%',   // 더 아래쪽에서부터 서서히 밝아짐
            end: 'top 55%',     // 중앙 조금 아래에서 최대 밝기
            scrub: 1            // 1초 정도 지연을 주어 부드럽게 추적
          }
        }
      )

      gsap.to(line, {
        opacity: 0.1,
        scrollTrigger: {
          trigger: line,
          start: 'top 45%',     // 중앙을 지나자마자 아주 천천히 어두워짐
          end: 'top 5%',       // 화면 최상단에 닿기 직전까지 변화
          scrub: 1
        }
      })
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
