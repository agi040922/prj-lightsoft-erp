'use client';

import { FormEvent, useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title fade-in">Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-form slide-in-left">
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required></textarea>
              </div>
              <button type="submit" className="submit-btn magnetic-btn">
                <span>{submitted ? 'Message Sent! ✓' : 'Send Message'}</span>
              </button>
            </form>
          </div>
          <div className="contact-info slide-in-right">
            <h3 className="subtitle">Let&apos;s Create Something Amazing</h3>
            <p>We&apos;re always excited to work on new projects and bring creative visions to life. Whether you have a specific idea in mind or need help developing a concept, we&apos;re here to help.</p>
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <h4>Email</h4>
                <p>hello@typographic.studio</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📱</span>
              <div>
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h4>Location</h4>
                <p>New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
