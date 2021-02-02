import { Section, Flex, Heading, Text } from '../styles/Styles'
import Navbar from '../components/Navbar'

export async function getServerSideProps({ ctx }) {
  const res = await fetch(`${process.env.API_URL}/ghost/api/v3/content/posts/?key=${process.env.CONTENT_API_KEY}&fields=title,slug,reading_time,feature_image`)
  const { posts } = await res.json()

  return {
    props: { posts }
  }
}

export default function Blog({ posts }) {
  return (
    <>
      <Navbar blog/>
      <Section bg="dark">
        <Flex direction="column" align="flex-start">
          <Heading>Welcome to my blog!</Heading>
          {posts.map(post =>
            <Text>{post.title}</Text>
          )}
        </Flex>
      </Section>
    </>
  )
}