export function getSlug () {
  const url = location.href
  const pattern = /problems\/([^/]+)/
  const slug = pattern.exec(url)?.[1]

  return slug
}
