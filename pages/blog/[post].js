import { Section, Text, Flex, Heading } from '../../styles/Styles'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/Link'

const Container = styled.div`
  width: 800px;
  padding-bottom: 120px;

  & > * {
    color: white;
    font-family: 'Rubik', sans-serif;
  }

  & img {
    max-width: 800px;
    width: 800px;
  }
`

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.API_URL}/ghost/api/v3/content/posts/slug/${params.post}/?key=${process.env.CONTENT_API_KEY}`)
  const { posts } = await res.json()

  return {
    props: { 
      post: posts[0]
    }
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export default function Post({ post }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Section bg="dark" />
    )
  }

  return (
    <Section bg="dark">
      <Flex direction="column" align="flex-start">
        <Link href="/blog">
          <Text>Go back</Text>
        </Link>
        <Heading fs="70px">{post.title}</Heading>
        <Container dangerouslySetInnerHTML={{ __html: post.html }} />
      </Flex>
    </Section>
  )
}