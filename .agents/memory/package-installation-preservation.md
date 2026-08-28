---
name: Package installation preservation
description: A package-management caveat when setting up imported JavaScript projects.
---

When setting up an imported JavaScript project, inspect the package manifest and lockfiles after dependency installation. The automated package installer may resolve newer versions and rewrite semver ranges in the manifest, even when the requested packages came from the existing manifest.

**Why:** Preserving the imported dependency contract avoids unrelated upgrades and keeps the project aligned with its existing lockfile and source history.

**How to apply:** Prefer the repository's existing package manager and lockfile. After installation, review the manifest diff and undo any version-range changes that were not part of the requested setup.