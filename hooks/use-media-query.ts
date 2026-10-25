import * as React from "react"

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    const result = window.matchMedia(query)
    const onChange = () => setValue(result.matches)
    onChange()
    result.addEventListener("change", onChange)
    return () => result.removeEventListener("change", onChange)
  }, [query])

  return value
}
