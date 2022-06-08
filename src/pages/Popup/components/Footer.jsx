import styled from 'styled-components'
import { VERSION } from '../../../constants'
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
  {
    title: `v${VERSION}`,
    url: 'https://github.com/ngseke/leetcode-night/releases',
  },
]

const Wrapper = styled.footer.attrs({
  className: 'ts-content',
})({
  fontFamily: '"Noto Sans TC"',
})

export default function Footer () {
  return (
    <Wrapper>
      <div className="ts-meta is-small is-secondary">
        {
          links.map(({ title, url }, key) => (
            <Link key={key} className="item" href={url}>{title}</Link>
          ))
        }
      </div>
    </Wrapper>
  )
}
