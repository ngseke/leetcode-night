import { request, gql } from 'graphql-request'

export interface LikesAndDislikes {
  likes: number,
  dislikes: number,
}

const cache = new Map<string, LikesAndDislikes>()

export async function fetchLikesAndDislikes (titleSlug: string) {
  const cached = cache.get(titleSlug)
  if (cached) return cached

  const query = gql`
    query questionTitle($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        likes
        dislikes
      }
    }
  `
  const data = await request(
    'https://leetcode.com/graphql/',
    query,
    { titleSlug }
  )

  const likesAndDislikes = data.question as LikesAndDislikes
  cache.set(titleSlug, likesAndDislikes)

  return likesAndDislikes
}
