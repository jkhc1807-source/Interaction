import { useState } from 'react'
import gsap from 'gsap'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
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

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return
    setIsTransmitting(true)
    setTimeout(() => {
      setIsTransmitting(false)
      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setIsSuccess(false), 5000)
    }, 2000)
  }

  return (
    <section id="contact" className="contact-protocol">
      <div className="section-label reveal"><span>CONNECTION_PROTOCOL / ESTABLISH</span></div>
      <div className="contact-frame">
        {isSuccess ? (
          <div className="success-message" style={{ padding: '100px 0', textAlign: 'left' }}>
            <h2 style={{ fontSize: 'clamp(30px, 5vw, 60px)', color: 'var(--accent)', marginBottom: '20px' }}><span>TRANSMISSION_SUCCESSFUL</span></h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: 0.5 }}><span>YOUR_DATA_HAS_BEEN_ENCRYPTED_AND_SENT_TO_THE_ARCHIVE.</span></p>
          </div>
        ) : (
          <>
            <div className="form-group reveal">
              <label><span>IDENTIFIER_NAME</span></label>
              <div className="input-row">
                <input 
                  type="text" 
                  placeholder="YOUR_FULL_NAME" 
                  value={formData.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  disabled={isTransmitting}
                />
                {formData.name && !isTransmitting && (
                  <button 
                    className="clear-btn" 
                    onClick={() => updateForm('name', '')}
                    onMouseMove={(e) => handleMagnetic(e, 0.5)}
                    onMouseOut={resetMagnetic}
                  >X</button>
                )}
              </div>
            </div>

            <div className="form-group reveal">
              <label><span>ACCESS_EMAIL</span></label>
              <div className="input-row">
                <input 
                  type="text" 
                  placeholder="COMMUNICATION_ENDPOINT" 
                  value={formData.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  disabled={isTransmitting}
                />
                {formData.email && !isTransmitting && (
                  <button 
                    className="clear-btn" 
                    onClick={() => updateForm('email', '')}
                    onMouseMove={(e) => handleMagnetic(e, 0.5)}
                    onMouseOut={resetMagnetic}
                  >X</button>
                )}
              </div>
            </div>

            <div className="form-group reveal">
              <label><span>TRANSMISSION_DATA</span></label>
              <div className="input-row textarea-row">
                <textarea 
                  placeholder="DESCRIBE_YOUR_PROJECT_VISION" 
                  value={formData.message}
                  onChange={(e) => updateForm('message', e.target.value)}
                  maxLength={300}
                  disabled={isTransmitting}
                />
                {formData.message && !isTransmitting && (
                  <button 
                    className="clear-btn textarea-clear" 
                    onClick={() => updateForm('message', '')}
                    onMouseMove={(e) => handleMagnetic(e, 0.5)}
                    onMouseOut={resetMagnetic}
                  >X</button>
                )}
                <div className="char-counter"><span>{formData.message.length} / 300</span></div>
              </div>
            </div>

            <button 
              className={`submit-protocol reveal ${isTransmitting ? 'transmitting' : ''}`}
              onClick={handleSubmit}
              onMouseMove={(e) => handleMagnetic(e, 0.2)}
              onMouseOut={resetMagnetic}
              disabled={isTransmitting}
            >
              {isTransmitting ? '[ ENCRYPTING_DATA... ]' : '[ INITIATE_TRANSMISSION ]'}
            </button>
          </>
        )}
      </div>

      <div className="social-links reveal">
        <div className="social-item"><span>LINKEDIN</span></div>
        <div className="social-item"><span>TWITTER / X</span></div>
        <div className="social-item"><span>INSTAGRAM</span></div>
      </div>
    </section>
  )
}
