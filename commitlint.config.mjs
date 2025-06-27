// /commitlint.config.mjs
// Commitlint configuration for enforcing Conventional Commits and project standards (ESM)
// See: https://www.conventionalcommits.org/en/v1.0.0/

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Only allow these types (must be lowercase)
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ],
    // Enforce lowercase for type
    'type-case': [2, 'always', 'lower-case'],
    // Enforce lowercase for scope (optional, but recommended for consistency)
    'scope-case': [2, 'always', 'lower-case'],
    // Allow any case for subject for flexibility
    'subject-case': [0],
    // Limit header length for readability
    'header-max-length': [2, 'always', 100]
  }
}; 