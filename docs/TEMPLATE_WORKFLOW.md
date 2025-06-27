# TEMPLATE WORKFLOW

**Full file path:** personal-website-eng-guild-template/docs/TEMPLATE_WORKFLOW.md

---

# Engineering Guild Template Workflow

This document explains how to use, customize, and keep your personal Engineering Guild site up-to-date with the latest improvements from the official template. Follow these steps to ensure you benefit from all updates while maintaining your own customizations.

---

## 1. Fork or Use the Template

- Go to the official Engineering Guild Template repository on GitHub.
- Click **"Use this template"** or **"Fork"** to create your own copy.
- Clone your new repository to your local machine:

```sh
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

---

## 2. Set Up the Upstream Remote

- Add the official template as an upstream remote to receive future updates:

```sh
git remote add upstream https://github.com/ENGINEERING_GUILD/personal-website-eng-guild-template.git
```

- Verify remotes:

```sh
git remote -v
```

---

## 3. Syncing Updates from the Template

- To update your fork with the latest changes from the template:

```sh
git fetch upstream
# Merge changes from the template's main branch into your branch
# Replace 'main' with the correct branch name if different

git checkout main
git merge upstream/main
```

- Resolve any merge conflicts if they appear (see best practices below).
- Push the updated code to your GitHub repository:

```sh
git push origin main
```

---

## 4. Customization Best Practices

- **Keep custom code modular:** Place your custom components, pages, or configuration in a dedicated `custom/` folder or use clearly marked config files.
- **Avoid editing core template files directly** unless necessary. This reduces merge conflicts when syncing updates.
- **Document your changes:** Add comments and keep a changelog of your customizations.
- **Use environment variables** for sensitive or user-specific data.
- **Regularly sync with upstream** to minimize the risk of large, complex merge conflicts.

> **Note:** The `custom/` folder is the recommended place for all user-specific customizations. You can override or extend components and pages by placing your versions in `custom/` and updating imports as needed. Use config files for settings and environment variables for secrets.

---

## 5. Recommended Folder Structure

```
personal-website-eng-guild-template/
  custom/           # Your custom components, pages, configs
  components/       # Core template components (do not edit directly)
  pages/            # Core template pages (extend, do not overwrite)
  ...
```

- **Override by extension:** If you need to customize a component or page, create a new one in `custom/` and import it where needed, rather than modifying the original.

---

## 6. Automating Sync (Optional)

- Advanced users can use scripts or GitHub Actions to automate syncing from upstream. See the [GitHub documentation](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) for more details.

---

## 7. Conflict Resolution

- If you have customized files that are also updated in the template, Git will prompt you to resolve conflicts during merge.
- Review each conflict carefully, keeping your changes and integrating upstream improvements as needed.
- Test your site after every sync to ensure everything works as expected.

---

## 8. Getting Help

- If you encounter issues, consult the Engineering Guild documentation or ask for help in the community channels.

---

**Keep this file up-to-date with any changes to the workflow or best practices.** 