import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Section, Flex, Heading, Image } from '../../styles/Styles'
import Subscribe from '../../components/Subscribe'
import Navbar from '../../components/Navbar'
import styled from 'styled-components'

const Box = styled(Section)`
  height: auto;
  justify-content: center;

  @media (max-width: 720px) {
    padding-top: 50px;
  }
`

const Comments = styled.div`
  width: min(90vw, 600px);
  margin-bottom: 100px;
`

const Container = styled.div`
  width: min(90vw, 600px);

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
      post: posts[0],
      revalidate: 60
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

  useEffect(() => {
    loadComments()
  }, [])

  function loadComments() {
    window.disqus_config = () => {
      this.page.url = window.location.href
      this.page.identifier = post.slug
    }

    const script = document.createElement('script')
		script.src = 'https://adammaj.disqus.com/embed.js'
		script.setAttribute('data-timestamp', Date.now().toString())

		document.body.appendChild(script)
  }

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
          <Subscribe width="min(90vw, 600px)" light mt="80px" mb="120px">
            If you enjoyed this post, please consider entering your email 
            below to get updates when I post and stay up to date on what I'm working on!
          </Subscribe>
          <Comments id="disqus_thread" />
        </Flex>
      </Box>
    </>
  )
}