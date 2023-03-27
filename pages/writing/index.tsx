import {
  Heading,
  Link,
  Flex,
  Text,
  Stack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { getAllPostData, Post } from "../../lib/writing";
import type { NextPageWithLayout } from "next";
import Layout from "../../components/Layout";
import { NextSeo } from "next-seo";

interface WritingProps {
  posts: Post[];
}

const Writing: NextPageWithLayout<WritingProps> = ({ posts }) => {
  return (
    <>
      <NextSeo title="Writing | Adam Majmudar" />
      <Flex direction="column" align="flex-start" width="100%" gap={3}>
        <Divider width="100%" />
        {posts.map((post) => (
          <>
            <Stack width="100%" align="flex-start" spacing={1}>
              <Link
                href={post.url}
                target={post.external ? "_blank" : "_self"}
                color="blue.600"
              >
                <Text>{post.title}</Text>
              </Link>
              <Text fontSize="sm" textAlign={"right"} color="gray.500">
                {post.date}
              </Text>
            </Stack>
            <Divider width="100%" />
          </>
        ))}
      </Flex>
    </>
  );
};

export default Writing;

Writing.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  const posts = getAllPostData();
  return { props: { posts } };
}
