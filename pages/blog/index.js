import { Section, Flex, Heading, Text, Image } from '../../styles/Styles'
import Navbar from '../../components/Navbar'
import Link from 'next/Link'
import styled from 'styled-components'

const Rule = styled.hr`
  margin-top: 40px;
  margin-bottom: 40px;
  color: #222222;
  width: 100%;
`

const Post = styled(Flex)`
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
    props: { posts }
  }
}

export default function Blog({ posts }) {
  console.log(posts)

  return (
    <>
      <Navbar blog/>
      <Section height="100%" pb="120px">
        <Flex align="flex-start" mt="80px" maxWidth="1400px">

          <Flex direction="column" align="flex-start" width="600px">
            <Heading color="dark" fs="64px">Blog</Heading>
            <Text color="dark" fs="20px">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Mauris convallis sem varius odio fermentum, non consequat purus porta.”
            </Text>
          </Flex>

          <Flex direction="column" width="50%" ml="40px">
            {posts.filter((post, index) => index % 2 === 0).map(post =>
              <>
                <Link href={`/blog/${post.slug}`}>
                  <Post>
                    <Text fs="24px" fw="500" color="dark">{post.title}</Text>
                    <Text color="dark">"{post.excerpt}... "</Text>
                    <Image mb="16px" src={post.feature_image} width="100%"/>
                    <Flex justify="space-between" width="100%">
                      <Text color="gray.600">February 1, 2020</Text>
                      <Text color="gray.600">7 Minute Read</Text>
                    </Flex>
                  </Post>
                </Link>
                <Rule />
              </>
            )}
          </Flex>

          <Flex direction="column" width="50%" ml="40px">
            {posts.filter((post, index) => index % 2 === 1).map(post =>
              <>
                <Link href={`/blog/${post.slug}`}>
                  <Post>
                    <Text fs="24px" fw="500" color="dark">{post.title}</Text>
                    <Text color="dark">"{post.excerpt}... "</Text>
                    <Image mb="16px" src={post.feature_image} width="100%"/>
                    <Flex justify="space-between" width="100%">
                      <Text color="gray.600">February 1, 2020</Text>
                      <Text color="gray.600">7 Minute Read</Text>
                    </Flex>
                  </Post>
                </Link>
                <Rule />
              </>
            )}
          </Flex>

        </Flex>
      </Section>
    </>
  )
}