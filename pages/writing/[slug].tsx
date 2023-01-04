import { MDXRemote } from "next-mdx-remote";
import { GetStaticPropsContext, NextPageWithLayout } from "next";
import { Heading, Flex } from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import Layout from "../../components/Layout";
import { getAllSlugs, getPost, Post as PostMetadata } from "../../lib/writing";
import { Content } from "../../lib/mdx";

interface PostProps {
  post: Content<PostMetadata>;
}

const Post: NextPageWithLayout<PostProps> = ({ post }) => {
  return (
    <Flex direction="column" gap={4}>
      <Heading size="xl">{post.metadata.title}</Heading>
      <Prose>
        <MDXRemote compiledSource={post.source} />
      </Prose>
    </Flex>
  );
};

export default Post;

Post.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params || !params.slug || typeof params.slug !== "string") {
    return { redirect: { destination: "/" } };
  }

  const post = await getPost(params.slug as string);
  if (!post) {
    return { redirect: { destination: "/" } };
  }

  return { props: { post } };
}

export async function getStaticPaths() {
  const paths = getAllSlugs();

  return {
    paths,
    fallback: false,
  };
}
