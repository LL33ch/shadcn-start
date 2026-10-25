# shadcn-start

A shadcn/ui kit on [Base UI](https://base-ui.com): surfaces that step up in brightness instead of borders, one accent colour, and spring motion written in CSS. It is a [shadcn registry](https://ui.shadcn.com/docs/registry), so you add the components you need with the shadcn CLI and own the code.

The docs, with every component live and its source, are this repository's Next.js app.

## Install

In a project with React 19 and Tailwind CSS v4 that has run `npx shadcn@latest init`, add the registry to `components.json`:

```json
{
  "registries": {
    "@shadcn-start": "https://raw.githubusercontent.com/LL33ch/shadcn-start/main/public/r/{name}.json"
  }
}
```

Then add the theme first, and the components you need:

```bash
npx shadcn@latest add @shadcn-start/theme
npx shadcn@latest add @shadcn-start/button @shadcn-start/dialog @shadcn-start/select
```

The theme replaces the colour tokens `init` wrote, so add it by name: a component brings it along too, but then only the missing tokens are added. The full guide, with the layout set-up, is on the Installation page of the docs.

To make it your own, open `/create` in the docs: pick the accent and colours for light and dark, the radius and the density, then copy the CSS to the end of `globals.css`.

## Develop

```bash
npm install
npm run dev        # the docs at http://localhost:3000
npm run typecheck
npm run lint
```

| Path | What |
|---|---|
| `components/ui` | The components, one file each |
| `app/globals.css` | Tokens and the shared motion: the source of the `theme` item |
| `components/menu-glide.tsx`, `components/press-footprint.tsx` | Client helpers mounted once in the layout |
| `components/docs` | The docs: `mdx` and `examples` (from shadcn-ui/ui `apps/v4`), and the generated content |
| `app/(docs)` | The docs routes: `/`, `/docs/installation`, `/docs/<component>` |
| `app/blocks` | A gallery of shadcn blocks built from the kit |
| `app/create`, `components/create` | The theme editor: colours, radius and density, copied out as CSS |

After changing `components/docs/mdx` or `components/docs/examples`, rebuild the docs content:

```bash
npm run docs
```

## Publish the registry

The registry is built from the sources and served from GitHub as static JSON in `public/r`:

```bash
npm run registry   # writes registry.json, then public/r/*.json
```

Commit `registry.json` and `public/r` with the change. The address the registry is served from, and its namespace, are set in `package.json` under `registry`; the docs read them from there. To try an install before pushing, build a copy that points at a local server:

```bash
REGISTRY_URL=http://127.0.0.1:8765 node scripts/build-registry.mjs
npx shadcn build -o /tmp/r && python -m http.server 8765 -d /tmp/r
node scripts/build-registry.mjs   # back to the published address
```
