import Link from 'next/link';
import styles from './Footer.module.css';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/[username]' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/[username]' },
  { name: 'Email', href: 'mailto:email@example.com' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>
            &copy; {currentYear} Quinton Miller. Built with Next.js
          </p>

          <div className={styles.social}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
