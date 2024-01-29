export function createElement (html: string) {
  const container = document.createElement('div')
  container.innerHTML = html.trim()
  if (!container.firstChild) throw new Error()
  return container.firstChild as HTMLElement
}

export function $x (xpath: string) {
  const snapshot = document.evaluate(
    xpath, document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  )
  return [...Array(snapshot.snapshotLength)]
    .map((_, i) => snapshot.snapshotItem(i) as Node)
}
