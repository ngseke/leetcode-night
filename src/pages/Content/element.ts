export function createElement (html: string) {
  const container = document.createElement('div')
  container.innerHTML = html.trim()
  if (!container.firstChild) throw new Error()
  return container.firstChild
}
