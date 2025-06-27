# Contributing to Caio Castilho Personal Website

Thank you for considering contributing to this project! Your help is greatly appreciated.

## How to Contribute

1. **Fork the repository**
2. **Create a new branch** for your feature or bugfix (`git checkout -b feature/your-feature`)
3. **Make your changes**
4. **Add tests** if applicable
5. **Ensure code style and linting** (`npm run lint`)
6. **Commit your changes** using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
7. **Push to your fork**
8. **Open a Pull Request** with a clear description of your changes

## Code Style

- All code, comments, and documentation must be in English
- Use Prettier and ESLint for formatting and linting
- Add comments wherever possible (never delete, only improve)
- Place the full file path at the top of every file

## Commit Messages

- Use the following prefixes:
  - `Feat(component): add new component`
  - `Fix(api): fix API error`
  - `Docs(readme): update Readme`
  - `Refactor(utils): refactor utils`
  - `Style(tailwind): add new Tailwind class`
  - `Test(unit): add unit test`
  - `Chore(deps): update dependencies`
- The last line of every commit message should be: `Don't forget to commit`

### Commit Message Conventions (Required)

All commit messages **must** follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This ensures consistency, enables automated changelogs, and keeps our CI/CD workflows reliable.

**Format:**
```
<type>(<scope>): <short description>
```

**Allowed types:**
- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

**Rules:**
- The type must be lowercase.
- The scope is optional but recommended for clarity.
- The description should be concise and in English.
- Do not include process reminders (e.g., "Don't forget to commit") in the commit message body.

**Examples:**
```
feat(navigation): persistent top navigation and layout alignment improvements
fix(api): correct error handling in user endpoint
docs(readme): update installation instructions
```

## Reporting Issues

If you find a bug or have a feature request, please open an issue with a clear description and steps to reproduce (if applicable).

## Code of Conduct

By participating, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

## Release Process

- All releases and versioning are handled automatically by **semantic-release**.
- Do not manually update the version in `package.json` or create GitHub releases/tags.
- The manual release workflow is deprecated and should not be used.
- For a release to be published, ensure your commits follow Conventional Commits and are merged to `main`. 