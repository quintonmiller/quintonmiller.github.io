import styles from './page.module.css';

export const metadata = {
  title: 'Contact',
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
          <a href="mailto:quintonmiller1993@gmail.com" className={styles.link}>
            quintonmiller1993@gmail.com
          </a>
        </div>

        <div className={styles.card}>
          <h3>Socials</h3>
          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/in/quinton-miller/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/quintonmiller"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub
            </a>
            <a
              href="https://bsky.app/profile/quinton.dev"
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
