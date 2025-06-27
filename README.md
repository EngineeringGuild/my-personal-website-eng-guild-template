# Caio Castilho – Personal Website & Portfolio

[![Build Status](https://github.com/Caioasc/my-personal-website/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Caioasc/my-personal-website/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Site](https://img.shields.io/badge/Live-caiocastilho.com-blue)](https://caiocastilho.com)

## About Me

Hi! I'm **Caio Augusto Serra Castilho** – Mechatronic Engineer, Project Management & Scalability Specialist.  
This website is my professional portfolio, built to showcase my technical leadership, project management, and engineering skills.  
I believe in building scalable, robust, and beautiful solutions that drive business value.

## Why this project?

This project is more than a personal website:  

- It demonstrates my ability to deliver production-grade, maintainable, and automated web solutions.
- It reflects my approach to clean code, documentation, and DevOps best practices.
- It's a living example of my standards for team projects and open source work.

## 🚀 Live Demo

Visit the live website at: [caiocastilho.com](https://caiocastilho.com)

## 🛠️ Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Deployment**: Hostinger with MCP automation

## 📋 Features

- ✨ Modern and responsive design
- 🎨 Smooth animations and transitions
- 📱 Mobile-first approach
- 🌙 Clean and professional UI
- ⚡ Optimized performance
- 🔧 Easy to customize and extend

## 🏃‍♂️ Getting Started

> See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Caioasc/my-personal-website.git
cd my-personal-website
```

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

1. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
├── components/          # Reusable UI components
│   ├── layout.js       # Main layout component
│   └── ...
├── pages/              # Next.js pages
│   ├── index.js        # Home page
│   ├── about.js        # About page
│   ├── projects.js     # Projects page
│   └── api/            # API routes
├── public/             # Static assets
│   ├── images/         # Image files
│   └── ...
├── styles/             # Global styles
│   └── globals.css     # Global CSS
└── ...
```

## 📈 Project Management & Workflow

We use a modern, transparent workflow inspired by PMI and Agile best practices:

- **All work is tracked via [GitHub Issues](https://github.com/Caioasc/my-personal-website/issues) and [GitHub Projects](https://github.com/Caioasc/my-personal-website/projects).**
- **Milestones** are used for major releases and phases.
- **Kanban board** visualizes progress (To Do, In Progress, Review, Done).
- **Labels** categorize tasks by type and priority.
- **Every change is linked to an issue and a pull request.**

For high-level planning, see [docs/ROADMAP.md](docs/ROADMAP.md).
For process improvements, see [docs/RETROS.md](docs/RETROS.md).
For all documentation, see [docs/README.md](docs/README.md).

> **How to contribute:**
> 1. Open an issue for any new feature, bug, or improvement.
> 2. Assign yourself or discuss with the team.
> 3. Create a branch, reference the issue in your PR, and follow the contribution guidelines.

## 🚀 Deployment & Release Process

This project uses **semantic-release** for all versioning and release automation. Manual versioning or releases are deprecated and should not be used.

### Automated Release Workflow
- Every push to `main` triggers the semantic-release workflow.
- The workflow analyzes commit messages, determines the next version, updates `package.json` and `CHANGELOG.md`, creates a GitHub release, and pushes changes back to the repository.
- **Do not manually edit the version in `package.json` or create releases/tags.**
- The legacy manual release workflow is deprecated and should not be used for production releases.

See `.github/workflows/semantic-release.yml` and `.releaserc.json` for configuration details.

## 🚀 Deployment

This project is configured for deployment on Hostinger using MCP (Model Context Protocol) for automation.

- Automated with GitHub Actions and Hostinger MCP.
- See `.github/workflows/` for CI/CD details.

### Build for Production

```bash
npm run build
npm run start
```

### Deployment Commands

The project uses Hostinger MCP for automated deployment. See deployment documentation for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Feat(component): add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before submitting issues or pull requests.

## 📝 License

MIT – see [LICENSE](LICENSE) - This project is licensed under the MIT License.

## 👨‍💻 Author

> **Caio Augusto Serra Castilho**

- Mechatronic Engineer
- Project Management & Scalability Specialist
- Website: [caiocastilho.com](https://caiocastilho.com)

## 📞 Contact

[LinkedIn](https://www.linkedin.com/in/caio-a-s-castilho/) | [caiocastilho.com](https://caiocastilho.com)  
Feel free to reach out for collaborations or questions!

## 🛡️ Automation & Metrics
- **Auto-labeling:** Issues and PRs are automatically labeled by file path and keywords ([.github/labeler.yml](.github/labeler.yml)).
- **Stale Management:** Issues and PRs are marked as stale after 30 days of inactivity and closed after 7 more days ([.github/workflows/stale.yml](.github/workflows/stale.yml)).
- **CODEOWNERS:** Code review and responsibility are enforced ([.github/CODEOWNERS](.github/CODEOWNERS)).
- **Metrics:** Use GitHub Insights for analytics. See [docs/PROJECT_MANAGEMENT.md](docs/PROJECT_MANAGEMENT.md) for details.
- **Project Board:** All work is tracked on the [Project Board](https://github.com/users/Caioasc/projects/3).

## 🏗️ Template Usage & Customization (Engineering Guild)

This project is designed as a template for Engineering Guild members. You can fork or use this template to create your own personal site and management platform. To keep your site up-to-date with the latest improvements, follow the template workflow:

- **Fork or use as a template** to create your own repository.
- **Set up the upstream remote** to receive updates from the official template.
- **Sync updates regularly** to benefit from new features and bug fixes.
- **Customize safely** by placing your changes in a dedicated `custom/` folder or using config files, avoiding direct edits to core template files.
- **See [docs/TEMPLATE_WORKFLOW.md](docs/TEMPLATE_WORKFLOW.md) for full instructions, best practices, and troubleshooting.**

### Recommended Folder Structure for Customization

```text
prototype/
  custom/           # Your custom components, pages, configs
  components/       # Core template components (do not edit directly)
  pages/            # Core template pages (extend, do not overwrite)
  ...
```

---

Built with ❤️ by Caio Castilho
