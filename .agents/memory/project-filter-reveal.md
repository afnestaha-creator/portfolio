---
name: Project filter reveal behavior
description: Animation state requirements for dynamically filtered project cards
---

Any project-card filter that replaces the rendered card nodes must re-run the scroll-reveal observer for the new nodes. Otherwise the cards keep the initial hidden reveal state and can appear missing when a user returns to the full list.

**Why:** Filtering recreated the project cards, but the original observer only ran at page mount, so returning to the full list produced hidden cards until the animation state was refreshed.

**How to apply:** When changing a rendered collection, either observe the collection after each filter change or avoid applying one-time hidden animation classes to dynamically recreated items.