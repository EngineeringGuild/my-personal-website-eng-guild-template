# /docs/PROJECT_MANAGEMENT.md

## Project Management & Workflow (Enterprise Standard)

---

### Overview
This document defines the project management processes, workflows, and automation standards for the project, following best practices from top engineering teams. It ensures traceability, quality, and continuous improvement, leveraging GitHub Projects and the GitHub MCP Server for advanced automation.

---

### 1. Principles & Objectives
- **Transparency:** All work is tracked via GitHub Issues and Project Boards.
- **Traceability:** Every change, decision, and deployment is documented and linked.
- **Automation:** Repetitive tasks are automated using GitHub MCP and GitHub Actions.
- **Continuous Improvement:** Retrospectives and process reviews are regular and actionable.
- **English Only:** All documentation, comments, and code must be in English.

---

### 2. Roles & Responsibilities
- **Project Owner:** Oversees project direction, approves major changes, and ensures alignment with vision.
- **Contributors:** Implement features, fix bugs, write documentation, and participate in reviews.
- **Board Maintainer:** Ensures the project board is up to date, cards are in the correct columns, and all work is traceable.
- **Automation Maintainer:** Develops and maintains automation scripts (MCP, Actions), ensures reliability, and documents changes.
- **Reviewer:** Reviews pull requests for code quality, adherence to standards, and completeness.
- **Onboarding Buddy:** Assists new contributors with setup and process understanding.

---

### 3. Workflow & Board Usage
- **Project Board:**
  - The [GitHub Project Board](https://github.com/users/Caioasc/projects/3) is the single source of truth for all tasks, bugs, features, and improvements.
  - Columns typically include: `Backlog`, `To Do`, `In Progress`, `Review`, `Done`.
  - Every Issue or Pull Request must be linked to a card on the board.
- **Board Column Definitions:**
  - **Backlog:** Ideas, unprioritized tasks, or future work. Cards here are not yet ready for action.
  - **To Do:** Prioritized and ready to be worked on. Clear acceptance criteria defined.
  - **In Progress:** Actively being worked on. Only move here when work has started.
  - **Review:** Work completed and awaiting code review or QA. PRs should be open and linked.
  - **Done:** Work is complete, merged, and deployed if applicable. Acceptance criteria met.
- **Card Movement Criteria:**
  - Only move cards forward when criteria for the next column are met.
  - Do not skip columns. If a card is blocked, add a comment and assign an owner.
- **Issue Lifecycle:**
  1. Create an Issue using the appropriate template.
  2. The Issue is automatically or manually added to the board.
  3. Move the card through columns as work progresses.
  4. Close the Issue only when the card reaches `Done` and acceptance criteria are met.
- **Pull Requests:**
  - Every code change must go through a Pull Request (PR).
  - PRs must reference the related Issue and card.
  - PRs require at least one approval and must pass all checks before merging.

---

### 4. Issue & PR Process
- **Templates:**
  - Use the provided templates for Bugs, Features, Refactors, and Documentation.
  - Fill out all required fields for clarity and traceability.
- **Branching:**
  - Use descriptive branch names: `feature/`, `bugfix/`, `refactor/`, `docs/`.
- **Commits:**
  - Follow Conventional Commits. See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.
- **Reviews:**
  - All PRs must be reviewed. Use the checklist in the PR template.
- **Linking:**
  - Always link Issues, PRs, and board cards for full traceability.

---

### 5. Automation with GitHub MCP Server
- **Purpose:**
  - The GitHub MCP Server enables advanced automation and integration with GitHub Projects, Issues, and Pull Requests.
- **Capabilities:**
  - Create, update, and move cards on the Project Board programmatically.
  - Automate Issue creation from external events or templates.
  - Move cards based on PR status (e.g., move to `Review` when a PR is opened).
  - Integrate with external systems (Slack, WhatsApp, etc.) via custom scripts.
- **How to Use:**
  1. Ensure the MCP Server is running and configured with a valid GitHub Personal Access Token.
  2. Use scripts or CLI commands to interact with the MCP Server for board and issue automation.
  3. Document any custom automation scripts in `/scripts` and reference them here.
- **Example Automation Workflows:**
  - **Auto-move card to 'In Progress' when branch is pushed:**
    - MCP script listens for branch push event, finds related card, and moves it.
  - **Auto-move card to 'Review' when PR is opened:**
    - MCP script or GitHub Action triggers on PR open, moves card to 'Review'.
  - **Auto-close card when PR is merged:**
    - MCP script or Action closes the card and issue when PR is merged.
  - **Sample MCP Command (pseudo-code):**
    ```sh
    mcp github project move-card --card-id <id> --column 'In Progress'
    ```
- **Best Practices:**
  - Test all automation in a staging environment before production.
  - Keep automation scripts versioned and documented.
  - Review and update automations regularly for relevance and security.

---

### 6. Incident & Risk Management
- **Incident Reporting:**
  - If a critical bug, security issue, or automation failure occurs, immediately create an Issue labeled `incident`.
  - Assign an owner and add the card to the board in the highest priority column.
- **Risk Mitigation:**
  - Regularly review automation scripts and dependencies for vulnerabilities.
  - Document known risks and mitigations in the Issue or a dedicated section in [RETROS.md](./RETROS.md).
- **Escalation:**
  - If an incident blocks progress, notify the Project Owner and escalate in the team communication channel.

---

### 7. Onboarding Checklist
- [ ] Read `/docs/OVERVIEW.md` for project vision and architecture.
- [ ] Read `/docs/PROJECT_MANAGEMENT.md` (this file) for process and workflow.
- [ ] Read `/docs/DEPLOYMENT.md` for deployment standards.
- [ ] Set up local development environment as per `/README.md`.
- [ ] Join the team communication channel (Slack, WhatsApp, etc.).
- [ ] Get access to the GitHub Project Board and Issues.
- [ ] Review open Issues and current board status.
- [ ] Pair with an Onboarding Buddy for your first contribution.
- [ ] Confirm you understand commit, PR, and review policies.
- [ ] Ask questions early and often!

---

### 8. Best Practices & Continuous Improvement
- **Retrospectives:**
  - After each sprint or major release, add a retrospective entry in [RETROS.md](./RETROS.md).
  - Assign action items and track improvements.
- **Documentation:**
  - Update this file and cross-referenced docs with every process change.
  - Place the full file path at the top of every documentation file.
- **Security:**
  - Never expose sensitive data in issues, PRs, or automation scripts.
  - Use environment variables for credentials.

---

### 9. Glossary
- **MCP:** Management Control Plane, a server for automating GitHub workflows.
- **PR:** Pull Request, a request to merge code changes.
- **Retrospective:** Regular review of what went well, what can improve, and action items.
- **Board/Card:** Visual representation of work items in the Project Board.
- **Incident:** An unplanned interruption or critical issue requiring immediate attention.
- **Onboarding Buddy:** A team member assigned to help new contributors.

---

### 10. References & Related Documents
- [OVERVIEW.md](./OVERVIEW.md): Project vision and architecture
- [ROADMAP.md](./ROADMAP.md): Milestones and planning
- [DEPLOYMENT.md](./DEPLOYMENT.md): Release and deployment process
- [RETROS.md](./RETROS.md): Retrospectives and improvements
- [COMPONENTS.md](./COMPONENTS.md): Component documentation
- [ADR/](./ADR/): Architecture Decision Records

> **Note:** For any major process or automation change, create or update an ADR in `/docs/ADR/`.

---

### 11. Change Log
- **2024-06-11:** Major expansion for robustness: added roles, board definitions, automation examples, incident management, onboarding, glossary, and change log.
- **2024-06-10:** Initial version created.

---

### 12. Automation & Metrics (2024-06-11)
- **Labeler:** Issues and PRs are auto-labeled based on file paths and keywords using `.github/labeler.yml`.
- **Stale Management:** Issues and PRs are automatically marked as stale after 30 days of inactivity and closed after 7 more days using `.github/workflows/stale.yml`.
- **CODEOWNERS:** Code review and responsibility are enforced via `.github/CODEOWNERS`.
- **Metrics:** Use GitHub Insights for repository analytics. Optionally, add a workflow for weekly metrics reporting.
- **Documentation:** All automation and metrics practices are documented here and in the main `README.md`.

// End of file 