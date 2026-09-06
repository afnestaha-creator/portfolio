---
name: Artifact registration recovery
description: What to do when an artifact is removed from the inventory but its source directory remains
---

When an artifact disappears from the artifact inventory, its source files may remain while its managed workflow and preview registration are gone. Preserve the source, recreate the artifact registration with the same slug, then restore the app files without overwriting the newly generated artifact metadata or Vite config.

**Why:** The portfolio media update exposed that an artifact can be removed from the registry while leaving an apparently usable directory behind; the stale directory cannot be presented or restarted on its own.

**How to apply:** Check `listArtifacts()` before preview work. If the directory exists but the artifact is absent, keep a temporary copy, recreate the artifact, restore source and public assets, and verify the new managed workflow starts.