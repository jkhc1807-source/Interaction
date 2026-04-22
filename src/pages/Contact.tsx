import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  return (
    <section id="contact" className="contact-protocol">
      <div className="section-label reveal">CONNECTION_PROTOCOL / ESTABLISH</div>
      <div className="contact-frame">
        <div className="form-group reveal">
          <label>IDENTIFIER_NAME</label>
          <div className="input-row">
            <input 
              type="text" 
              placeholder="YOUR_FULL_NAME" 
              value={formData.name}
              onChange={(e) => updateForm('name', e.target.value)}
            />
            {formData.name && <button className="clear-btn" onClick={() => updateForm('name', '')}>X</button>}
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
            />
            {formData.email && <button className="clear-btn" onClick={() => updateForm('email', '')}>X</button>}
          </div>
        </div>

        <div className="form-group reveal">
          <label>TRANSMISSION_DATA</label>
          <div className="input-row">
            <textarea 
              placeholder="DESCRIBE_YOUR_PROJECT_VISION" 
              value={formData.message}
              onChange={(e) => updateForm('message', e.target.value)}
            />
          </div>
        </div>

        <button className="submit-protocol reveal">
          [ INITIATE_TRANSMISSION ]
        </button>
      </div>

      <div className="social-links reveal">
        <div className="social-item"><span>LINKEDIN</span></div>
        <div className="social-item"><span>TWITTER / X</span></div>
        <div className="social-item"><span>INSTAGRAM</span></div>
      </div>
    </section>
  )
}
