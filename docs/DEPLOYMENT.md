# /docs/DEPLOYMENT.md

# Deployment & Maintenance Notes (Enterprise Standard)

## 1. How Deployment Works (Enterprise)
- **Deployment only occurs when a new release is published on GitHub.**
- **Each release is a unique, traceable version (tag vX.Y.Z).**
- **Nothing is published automatically on push to main.**

---

## 2. How to Create and Publish a New Release
1. Commit and push your changes to the `main` branch as usual.
2. When ready to publish a new version, run:
   ```sh
   gh workflow run "release.yml" --field version="vX.Y.Z"
   ```
   - Replace `vX.Y.Z` with the new version (e.g., `v1.2.3`).
   - The workflow validates the format, creates the tag and release.
   - Deployment is triggered automatically after the release is published.

---

## 3. Network Diagnostics (Debug)
To test connectivity, run:
```sh
gh workflow run "diagnostics.yml"
```

---

## 4. Best Practices
- Always use semantic versioning (`vX.Y.Z`).
- Commits must follow Conventional Commits.
- Releases should have a clear changelog (automated in the future).
- Monitor GitHub Actions for success/failure.
- After a release, verify the site at [https://caiocastilho.com](https://caiocastilho.com).

---

## 5. Useful Links
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action)
- [Hostinger FTP Setup Guide](https://www.hostinger.com/tutorials/how-to-use-ftp)

---

## 6. Maintenance
- Always update this file when the deployment flow changes.
- Share with new team members. 