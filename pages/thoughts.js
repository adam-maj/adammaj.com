
export async function getServerSideProps({ ctx }) {
  const res = await fetch(`${process.env.API_URL}/ghost/api/v3/content/posts/?key=${process.env.CONTENT_API_KEY}`)
  const { posts } = await res.json()

  return {
    props: { posts }
  }
}

export default function Thoughts({ posts }) {
  console.log(posts)

  return (
    <>
    </>
  )
}