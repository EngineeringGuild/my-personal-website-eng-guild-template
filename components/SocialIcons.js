// /Users/user/Desktop/Core Guild Project/projects/colabs/eng-teams/core/personal-website/personal-website-eng-guild-template/components/SocialIcons.js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

/**
 * SocialIcons component displays social media icons with links.
 * - LinkedIn: caio-a-s-castilho
 * - GitHub (personal): Caioasc
 * - GitHub (organization): EngineeringGuild
 *
 * Usage: <SocialIcons />
 */
export default function SocialIcons() {
  return (
    <div className="flex items-center justify-center mt-6">
      {/* GitHub Personal */}
      <a
        className="text-gray-400 dark:text-white hover:text-lightBlue-600 dark:hover:text-pink-500"
        href="https://github.com/Caioasc"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Personal"
      >
        <FontAwesomeIcon className="mr-6 text-2xl" icon={faGithub} />
      </a>
      {/* GitHub Organization */}
      <a
        className="text-gray-400 dark:text-white hover:text-lightBlue-600 dark:hover:text-pink-500"
        href="https://github.com/EngineeringGuild"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Organization"
      >
        <FontAwesomeIcon className="mr-6 text-2xl" icon={faUsers} />
      </a>
      {/* LinkedIn */}
      <a
        className="text-gray-400 dark:text-white hover:text-lightBlue-600 dark:hover:text-pink-500"
        href="https://www.linkedin.com/in/caio-a-s-castilho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FontAwesomeIcon className="mr-6 text-2xl" icon={faLinkedinIn} />
      </a>
    </div>
  )
} 