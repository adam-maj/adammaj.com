import { Heading, Stack, Flex, Text, Divider } from "@chakra-ui/react";
import { getAllPostData, Post } from "../../lib/writing";
import type { NextPageWithLayout } from "next";
import Layout from "../../components/Layout";
import Link from "next/link";
import { NextSeo } from "next-seo";

interface WritingProps {
  posts: Post[];
}

const Writing: NextPageWithLayout<WritingProps> = ({ posts }) => {
  return (
    <>
      <NextSeo title="Writing | Adam Majmudar" />
      <Flex direction="column" align="flex-start">
        {posts.map((post) => (
          <Stack width="100%" key={post.title}>
            <Link href={post.url} target={post.external ? "_blank" : "_self"}>
              <Stack mb={4} width="100%">
                <Divider margin="8px 0 !important" width="100%" />
                <Stack>
                  <Heading
                    as="h2"
                    size="md"
                    marginTop="8px !important"
                    mb="0px !important"
                  >
                    {post.title}
                  </Heading>
                  <Text my={0}>{post.description}</Text>
                  <Text color="gray.500" mt={0}>
                    {post.date}
                  </Text>
                </Stack>
              </Stack>
            </Link>
          </Stack>
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
