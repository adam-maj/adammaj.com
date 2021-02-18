import { useState, useEffect } from 'react'
import { Section, Flex, Heading, Text, Image } from '../../styles/Styles'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import styled from 'styled-components'
import moment from 'moment'

const Rule = styled.hr`
  margin-top: 40px;
  margin-bottom: 40px;
  color: #222222;
  width: 100%;
`

const Container = styled(Flex)`
  align-items: flex-start;
  flex-direction: column;
  cursor: pointer;

  & > *, p {
    cursor: pointer;
  }
`

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}/ghost/api/v3/content/posts/?key=${process.env.CONTENT_API_KEY}`)
  const { posts } = await res.json()

  return {
    props: { posts },
    revalidate: 1
  }
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function Blog({ posts }) {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    handleResize()

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  function getWidth() {
    if (windowDimensions.width < 768) {
      return "calc(100vw - 120px)"
    } else if (windowDimensions.width < 1400) {
      return "35%"
    } else {
      return "520px"
    }
  }

  // Don't render component until dimensions load to prevent flash
  if (!windowDimensions.width) {
    return (
      <>
        <Navbar blog />
        <Section height="100vh" />
      </>
    )
  }

  return (
    <>
      <Navbar blog />
      <Section height="100vh" padding="120px 40px">
        <Flex align="flex-start" maxWidth="1400px" direction={windowDimensions.width < 768 && "column"}>

          <Flex direction="column" align="flex-start" width={getWidth()} ml="20px" mr="20px">
            <Heading color="dark" fs="52px">Blog</Heading>
            <Text color="dark" fs="16px !important">
              I often write about a variety of topics I find interesting including
              consciousness & awareness, productivity, time management, education and learning, 
              skill development, personal growth, philosophy, psychology and much more.
              <br /><br />
              I'll put all of my writings here for other people to see as well.
            </Text>
            {windowDimensions.width < 768 && <Rule/>}
          </Flex>

          {windowDimensions.width > 1400 ? (
            <>
              <Flex direction="column" width="50%" ml="20px" mr="20px">
                {posts.filter((post, index) => index % 2 === 0).map(post =>
                  <>
                    <Post post={post} />
                    <Rule />
                  </>
                )}
              </Flex>

              <Flex direction="column" width="50%" ml="20px" mr="20px">
                {posts.filter((post, index) => index % 2 === 1).map(post =>
                  <>
                    <Post post={post} />
                    <Rule />
                  </>
                )}
              </Flex>
            </>
          ) : (
            <Flex direction="column" width={windowDimensions.width > 768 ? "50%" : "calc(100vw - 120px)"} ml="20px" mr="20px">
              {posts.map(post =>
                <>
                  <Post post={post} />
                  <Rule />
                </>
              )}
            </Flex>
          )}


        </Flex>
      </Section>
    </>
  )
}

function Post({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Container>
        <Image mb="16px" src={post.feature_image} width="100%"/>
        <Text fs="24px" fw="500" color="dark">{post.title}</Text>
        <Text color="dark">"{post.excerpt}... "</Text>
        <Flex justify="space-between" width="100%">
          <Text color="gray.600">{moment(post.published_at).format("MMMM D, YYYY")}</Text>
          <Text color="gray.600">{post.reading_time} Minute Read</Text>
        </Flex>
      </Container>
    </Link>
  )
}