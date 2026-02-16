'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Get in Touch</h1>
        <p className={styles.subtitle}>
          Have a question or want to work together? Feel free to reach out!
        </p>
      </header>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="your.email@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={styles.textarea}
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className={styles.submitBtn}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className={styles.successMessage}>
                Message sent successfully! I'll get back to you soon.
              </p>
            )}

            {status === 'error' && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
          </form>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h3>Email</h3>
            <a href="mailto:email@example.com" className={styles.infoLink}>
              email@example.com
            </a>
          </div>

          <div className={styles.infoCard}>
            <h3>Social Links</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/[username]"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/[username]"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/[username]"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                Twitter
              </a>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3>Location</h3>
            <p className={styles.infoText}>Seattle, WA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
