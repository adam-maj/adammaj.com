import { Section, Flex, Heading, Image } from '../../styles/Styles'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Box = styled(Section)`
  height: auto;
  justify-content: center;

  @media (max-width: 720px) {
    padding-top: 0px;
  }
`

const Container = styled.div`
  width: min(90vw, 600px);
  padding-bottom: 120px;

  & img {
    max-width: min(90vw, 600px);
    width: min(90vw, 600px);
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
      <Section/>
    )
  }

  return (
    <>
      <Navbar blog />
      <Box>
        <Flex direction="column" mt="40px">
          <Heading fs="32px" width="min(90vw, 600px)" fw="600" color="dark">{post.title}</Heading>
          <Image src={post.feature_image} width="min(90vw, 600px)" mb="20px" />
          <Container dangerouslySetInnerHTML={{ __html: post.html }} />
        </Flex>
      </Box>
    </>
  )
}