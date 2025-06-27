# /docs/ADR/0002-deployment-strategy.md

## Architecture Decision Record: Deployment Strategy

**Date:** 2024-06-10

### Status
Accepted

### Context
The project needs a robust, traceable, and secure deployment process suitable for a personal website with enterprise standards.

### Decision
- Deployments are triggered only by published GitHub releases (not by every push).
- Use GitHub Actions for CI/CD automation.
- Deploy to Hostinger via FTP using secure credentials.
- Use semantic-release for versioning and changelog automation.

### Consequences
- Ensures only stable, versioned code is deployed.
- Reduces risk of accidental production changes.
- Provides full traceability for every deployment. 