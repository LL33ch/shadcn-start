import pkg from "@/package.json"

/* The kit's name, its repository and the registry it is installed from (all set in package.json). */
export const site = {
  name: pkg.name,
  description: pkg.description,
  github: pkg.homepage,
  registry: pkg.registry.url,
  namespace: pkg.registry.namespace,
}

/** The command that adds an item of the kit's registry. */
export const addCommand = (...items: string[]) =>
  `npx shadcn@latest add ${items.map((i) => `${site.namespace}/${i}`).join(" ")}`
