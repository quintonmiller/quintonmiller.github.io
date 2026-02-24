import styles from './page.module.css';

export const metadata = {
  title: 'Contact - Quinton Miller',
  description: 'Get in touch with Quinton Miller',
};

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Get in Touch</h1>
        <p className={styles.subtitle}>
          Have a question, collaboration idea, or just want to connect? I'd like to hear from you.
        </p>
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <h3>Email</h3>
          <a href="mailto:email@example.com" className={styles.link}>
            email@example.com
          </a>
        </div>

        <div className={styles.card}>
          <h3>Socials</h3>
          <div className={styles.socials}>
            <a
              href="https://linkedin.com/in/[username]"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/[username]"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub
            </a>
            <a
              href="https://bsky.app/profile/[username]"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              BlueSky
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
