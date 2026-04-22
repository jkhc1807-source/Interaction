import { useState } from 'react'
import gsap from 'gsap'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return
    
    setIsTransmitting(true)
    
    // 📡 Simulate Transmission with Glitch/Loading
    setTimeout(() => {
      setIsTransmitting(false)
      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 2000)
  }

  return (
    <section id="contact" className="contact-protocol">
      <div className="section-label reveal">CONNECTION_PROTOCOL / ESTABLISH</div>
      <div className="contact-frame">
        {isSuccess ? (
          <div className="success-message" style={{ padding: '100px 0', textAlign: 'left' }}>
            <h2 style={{ fontSize: 'clamp(30px, 5vw, 60px)', color: 'var(--accent)', marginBottom: '20px' }}>TRANSMISSION_SUCCESSFUL</h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', opacity: 0.5 }}>YOUR_DATA_HAS_BEEN_ENCRYPTED_AND_SENT_TO_THE_ARCHIVE.</p>
          </div>
        ) : (
          <>
            <div className="form-group reveal">
              <label>IDENTIFIER_NAME</label>
              <div className="input-row">
                <input 
                  type="text" 
                  placeholder="YOUR_FULL_NAME" 
                  value={formData.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  disabled={isTransmitting}
                />
                {formData.name && !isTransmitting && <button className="clear-btn" onClick={() => updateForm('name', '')}>X</button>}
              </div>
            </div>

            <div className="form-group reveal">
              <label>ACCESS_EMAIL</label>
              <div className="input-row">
                <input 
                  type="text" 
                  placeholder="COMMUNICATION_ENDPOINT" 
                  value={formData.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  disabled={isTransmitting}
                />
                {formData.email && !isTransmitting && <button className="clear-btn" onClick={() => updateForm('email', '')}>X</button>}
              </div>
            </div>

            <div className="form-group reveal">
              <label>TRANSMISSION_DATA</label>
              <div className="input-row textarea-row">
                <textarea 
                  placeholder="DESCRIBE_YOUR_PROJECT_VISION" 
                  value={formData.message}
                  onChange={(e) => updateForm('message', e.target.value)}
                  maxLength={300}
                  disabled={isTransmitting}
                />
                {formData.message && !isTransmitting && (
                  <button className="clear-btn textarea-clear" onClick={() => updateForm('message', '')}>X</button>
                )}
                <div className="char-counter">{formData.message.length} / 300</div>
              </div>
            </div>

            <button 
              className={`submit-protocol reveal ${isTransmitting ? 'transmitting' : ''}`}
              onClick={handleSubmit}
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
