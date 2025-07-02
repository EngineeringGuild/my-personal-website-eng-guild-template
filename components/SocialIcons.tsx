// /components/SocialIcons.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import type { SocialIconsProps } from '@/types';

/**
 * SocialIcons component displays social media icons with links
 * Features hover animations and accessibility improvements
 * 
 * Social Media Links:
 * - LinkedIn: caio-a-s-castilho
 * - GitHub (personal): Caioasc
 * - GitHub (organization): EngineeringGuild
 * 
 * @param className - Optional additional CSS classes
 */
export default function SocialIcons({ className = '' }: SocialIconsProps = {}): JSX.Element {
  // Social media links configuration
  const socialLinks = [
    {
      href: 'https://github.com/Caioasc',
      icon: faGithub,
      label: 'GitHub Personal',
      name: 'GitHub Personal',
    },
    {
      href: 'https://github.com/EngineeringGuild',
      icon: faUsers,
      label: 'GitHub Organization',
      name: 'Engineering Guild',
    },
    {
      href: 'https://www.linkedin.com/in/caio-a-s-castilho',
      icon: faLinkedinIn,
      label: 'LinkedIn',
      name: 'LinkedIn Profile',
    },
  ] as const;

  return (
    <div className={`flex items-center justify-center mt-6 ${className}`}>
      {socialLinks.map((link, index) => (
        <a
          key={link.name}
          className="text-gray-400 dark:text-white hover:text-lightBlue-600 dark:hover:text-pink-500 transition-colors duration-200"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.name}
        >
          <FontAwesomeIcon 
            className={`text-2xl ${index < socialLinks.length - 1 ? 'mr-6' : ''}`}
            icon={link.icon}
          />
        </a>
      ))}
    </div>
  );
}
