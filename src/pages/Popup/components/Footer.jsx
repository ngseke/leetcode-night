import Link from './Link'

const links = [
  {
    title: 'GitHub',
    url: 'https://github.com/ngseke/leetcode-night',
  },
  {
    title: 'Issues',
    url: 'https://github.com/ngseke/leetcode-night/issues',
  },
]

export default function Footer () {
  return (
    <footer className="ts-content">
      <div className="ts-meta is-small is-secondary">
        {
          links.map(({ title, url }, key) => (
            <Link key={key} className="item" href={url}>{title}</Link>
          ))
        }
      </div>
    </footer>
  )
}
