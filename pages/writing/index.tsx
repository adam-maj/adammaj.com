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
      <Flex direction="column" align="flex-start">
        {posts.map((post) => (
          <>
            <Stack
              my={1}
              width="100%"
              display={{ base: "flex", md: "grid" }}
              direction={{ base: "column", md: "row" }}
              gridTemplateColumns={"7fr 2.5fr"}
              align="flex-start"
            >
              <Link
                href={post.url}
                target={post.external ? "_blank" : "_self"}
                // color="blue.500"
                gridColumn={"span 1"}
              >
                <Text>{post.title}</Text>
              </Link>
              <Text
                fontSize="sm"
                gridColumn="span 1"
                textAlign={"right"}
                color="gray.500"
              >
                {post.date}
              </Text>
            </Stack>
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
