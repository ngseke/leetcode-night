import React from 'react'
import styled from 'styled-components'
import github from '../images/github.png'

const Link = styled.a({
  display: 'inline-block',
  marginTop: 20
})

const Image = styled.img({
  width: 20,
  height: 20,
})

export default function GithubLink() {
  return (
    <>
      <Link
        href="https://github.com/ngseke/leetcode-dark-mode"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={github} alt="GitHub-Logo" />
      </Link>
    </>
  )
}
