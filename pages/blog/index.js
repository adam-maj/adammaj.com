import { useState, useEffect } from 'react'
import { Section, Flex, Heading, Text, Image, Input, Button, Span } from '../../styles/Styles'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import styled from 'styled-components'
import moment from 'moment'
import axios from 'axios'

const Container = styled(Section)`
  min-height: 100vh;
  height: 100%;
  padding: 120px 40px;

  @media (max-width: 720px) {
    padding: 120px 0px;
  }
`

const FlexContainer = styled(Flex)`
  align-items: flex-start;
  max-width: 1400px;
  direction: ${props => props.direction};
  
  @media (max-width: 720px) {
    align-items: center;
    width: 100%;
  }
`

const Rule = styled.hr`
  margin-top: 40px;
  margin-bottom: 40px;
  color: #222222;
  width: 100%;
`

const Box = styled(Flex)`
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
  const [email, setEmail] = useState('')

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
      return "calc(100vw - 80px)"
    } else if (windowDimensions.width < 1400) {
      return "35%"
    } else {
      return "520px"
    }
  }

  function isEmailValid() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) || !email;
  }

  async function subscribe() {
    if (isEmailValid()) {
      axios.post('/api/subscribe/', {
        email
      })
      setEmail('')
    }
  }

  // Don't render component until dimensions load to prevent flash
  if (!windowDimensions.width) {
    return (
      <>
        <Navbar blog />
        <Section minHeight="100vh" height="100%"/>
      </>
    )
  }

  return (
    <>
      <Navbar blog />
      <Container>
        <FlexContainer direction={windowDimensions.width < 768 && "column"}>

          <Flex direction="column" align="flex-start" width={getWidth()} ml="20px" mr="20px">
            <Heading color="dark" fs="52px">Blog</Heading>
            <Text color="dark" fs="16px !important">
              I often write about a variety of topics I find interesting including:
              <ul>
                <li>Consciousness and neuroscience</li>
                <li>Philosophy and psychology</li>
                <li>Productivity, skill development, and personal growth</li>
                <li>Education & learning</li>
                <li>and much much more...</li>
              </ul>

              <br />

              <Span fw="bold">
                If you enjoy reading my posts, 
                please consider entering your email below to get updates when I post!
              </Span>
            </Text>
            <Flex>
              <Input 
                br="4px 0px 0px 4px"
                placeholder={windowDimensions.width < 928 && windowDimensions.width > 768 ? "Your email" : "example@gmail.com"}
                margin="0px !important"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Button 
                br="0px 4px 4px 0px"
                color="#111"
                primary
                onClick={subscribe}
              >
                Submit
              </Button>
            </Flex>

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
            <Flex direction="column" width={windowDimensions.width > 768 ? "50%" : "calc(100vw - 80px)"} ml="20px" mr="20px">
              {posts.map(post =>
                <>
                  <Post post={post} />
                  <Rule />
                </>
              )}
            </Flex>
          )}


        </FlexContainer>
      </Container>
    </>
  )
}

function Post({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Box>
        <Image mb="16px" src={post.feature_image} width="100%"/>
        <Text fs="24px" fw="500" color="dark">{post.title}</Text>
        <Text color="dark">"{post.excerpt}... "</Text>
        <Flex justify="space-between" width="100%">
          <Text color="gray.600">{moment(post.published_at).format("MMMM D, YYYY")}</Text>
          <Text color="gray.600">{post.reading_time} Minute Read</Text>
        </Flex>
      </Box>
    </Link>
  )
}