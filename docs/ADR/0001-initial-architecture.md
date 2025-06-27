# /docs/ADR/0001-initial-architecture.md

## Architecture Decision Record: Initial Architecture

**Date:** 2024-06-10

### Status
Accepted

### Context
The project required a modern, maintainable, and scalable architecture for a personal website with rapid deployment and easy content updates.

### Decision
- Use Next.js for static site generation and React-based UI.
- Modularize UI into reusable components.
- Use GitHub Actions for CI/CD automation.
- Deploy to Hostinger via FTP using GitHub Actions.
- Use semantic-release for automated versioning and changelog.

### Consequences
- Enables fast, reliable deployments.
- Simplifies maintenance and onboarding.
- Ensures traceability and best practices. 