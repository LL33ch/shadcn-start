<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## UI design

- Build from shadcn/ui components in `components/ui` and customise them through tokens (`app/globals.css`) and variants, not one-off styles. Each component's header comment states its design: read it before changing one.
- Surfaces step up in brightness instead of borders: `bg-background` -> `bg-card` -> `bg-muted`/`bg-field` -> `bg-accent`/`bg-knob`. `primary` is the one accent; `ok`, `warn` and `destructive` only mean state. Tints come from `color-mix`, not new hex values.
- Radii nest: inner radius = outer radius - padding (a 24 dropdown with padding 6 has 18 rows). Buttons, chips and switches are pills.
- Everything scales from the theme (`/create` edits it): write a radius as `rounded-[calc(24px*var(--radius-factor,1))]`, and sizes, paddings and offsets on the spacing scale (`h-8.5`, not `h-[34px]`), so `--radius-factor` and `--spacing` reach them. Type sizes and container widths stay in px.
- Motion runs on the springs in `app/globals.css` (`--spring-bouncy`, `--spring-pop`, `--spring-soft`, `--spring-smooth`, `--spring-lead`, `--spring-glide`): SOFT for things that open, SMOOTH for sizes and colours of state, exits in 110-180ms on `--ease-in`.

- The docs are the app: `/` introduces the kit, `/docs/installation` installs it and `/docs/<component>` shows each component with live examples (sources: `components/docs/mdx` and `components/docs/examples`, copied from shadcn-ui/ui `apps/v4`). After changing them run `npm run docs` to rebuild `components/docs/generated/content.json` and `components/docs/registry.ts`. The shadcn block gallery is `/blocks`.
- A component restyled for the kit goes into `restyled` in `lib/docs.ts` (the docs mark it New).

- The kit is a shadcn registry served from GitHub (`package.json` -> `registry`). After changing a component, `app/globals.css`, `components/menu-glide.tsx` or `components/press-footprint.tsx`, run `npm run registry` and commit `registry.json` and `public/r`.

- One component, one file: a component in `components/ui` lives in a single `<name>.tsx` (its variants, hooks and parts included). Shared motion CSS goes to `app/globals.css`.

- Server rendering first: a component in `components/ui` has no `use client`, hooks or effects unless it cannot work without them. State goes to CSS (`data-*` attributes, `:has`, `@starting-style`) or to the Base UI primitive underneath.

