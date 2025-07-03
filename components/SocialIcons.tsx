// /components/SocialIcons.tsx

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import type { SocialIconsProps } from '@/types';

/**
 * SocialIcons component displays social media icons with links
 * Features enhanced hover animations, glass effects, and accessibility improvements
 * Uses the new design system for consistent styling
 * 
 * Social Media Links:
 * - LinkedIn: caio-a-s-castilho
 * - GitHub (personal): Caioasc
 * - GitHub (organization): EngineeringGuild
 * 
 * @param className - Optional additional CSS classes
 */
export default function SocialIcons({ className = '' }: SocialIconsProps = {}): JSX.Element {
  // Social media links configuration with enhanced metadata
  const socialLinks = [
    {
      href: 'https://github.com/Caioasc',
      icon: faGithub,
      label: 'GitHub Personal',
      name: 'GitHub Personal',
      color: 'rgb(51, 65, 85)', // slate-700
      hoverColor: 'rgb(30, 41, 59)', // slate-800
    },
    {
      href: 'https://github.com/EngineeringGuild',
      icon: faUsers,
      label: 'GitHub Organization',
      name: 'Engineering Guild',
      color: 'rgb(99, 102, 241)', // indigo-500
      hoverColor: 'rgb(79, 70, 229)', // indigo-600
    },
    {
      href: 'https://www.linkedin.com/in/caio-a-s-castilho',
      icon: faLinkedinIn,
      label: 'LinkedIn',
      name: 'LinkedIn Profile',
      color: 'rgb(14, 165, 233)', // sky-500
      hoverColor: 'rgb(2, 132, 199)', // sky-600
    },
  ] as const;

  return (
    <motion.div 
      className={`flex items-center justify-center gap-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          className="relative group"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.5 + index * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          whileHover={{ 
            scale: 1.1,
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Background with glass effect */}
          <div 
            className="absolute inset-0 rounded-xl glass opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${link.color}15, ${link.hoverColor}25)`,
            }}
          />
          
          {/* Icon container */}
          <div 
            className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:shadow-lg"
            style={{
              backgroundColor: 'rgb(var(--color-surface))',
              borderColor: 'rgb(var(--color-border))',
              border: '1px solid',
            }}
          >
            <motion.div
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon 
                className="text-xl transition-colors duration-300"
                style={{
                  color: 'rgb(var(--color-text-secondary))',
                }}
                icon={link.icon}
              />
            </motion.div>
          </div>

          {/* Hover effect ring */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-100"
            style={{
              borderColor: link.color,
            }}
            initial={false}
            animate={{
              scale: 1,
              opacity: 0,
            }}
            whileHover={{
              scale: 1.2,
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Tooltip */}
          <div 
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20"
            style={{
              backgroundColor: 'rgb(var(--color-surface))',
              color: 'rgb(var(--color-text-primary))',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid rgb(var(--color-border))',
            }}
          >
            {link.name}
            {/* Tooltip arrow */}
            <div 
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45"
              style={{
                backgroundColor: 'rgb(var(--color-surface))',
                border: '1px solid rgb(var(--color-border))',
                borderBottom: 'none',
                borderRight: 'none',
              }}
            />
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
