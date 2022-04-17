import React from 'react'

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


export default function Footer() {
  return (
    <footer className="ts-content">
      <div className="ts-meta is-small is-secondary">
        {
          links.map(({ title, url }, key) => (
            <a
              key={key}
              className='item'
              target='_blank'
              rel='noopener noreferrer'
              href={url}
            > {title}</a>
          ))
        }
      </div>
    </footer >
  )
}
