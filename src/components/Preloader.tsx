import { useEffect, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1
      })
    }, 20)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      // 100% 도달 시 퇴장 애니메이션 시작
      gsap.to('.preloader', {
        y: '-100%',
        duration: 1.2,
        delay: 0.5,
        ease: 'power4.inOut',
        onComplete: () => {
          onComplete() // App의 isLoading을 false로 변경
        }
      })
    }
  }, [progress, onComplete])

  return (
    <div className="preloader" style={{
      position: 'fixed', inset: 0, background: '#050505', zIndex: 15000,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      color: 'white', fontFamily: 'var(--font-mono)'
    }}>
      <div className="loader-content" style={{ textAlign: 'left', width: '300px' }}>
        <div className="system-status" style={{ fontSize: '12px', marginBottom: '20px', color: 'var(--accent)' }}>
          SYSTEM_BOOTING / {progress}%
        </div>
        <div className="progress-bar-wrap" style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
          <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.1s' }} />
        </div>
        <div className="loader-meta" style={{ marginTop: '15px', fontSize: '10px', opacity: 0.3, display: 'flex', justifyContent: 'space-between' }}>
          <span>CORE_V.2026</span>
          <span>ESTABLISHING_LINK</span>
        </div>
      </div>
    </div>
  )
}
