import { Heading, Stack, Flex, Text, Divider } from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import { serialize } from "next-mdx-remote/serialize";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "../../components/Layout";

interface WritingProps {
  posts: {
    title: string;
    description: string;
    image: string;
    date: string;
    slug: string;
  }[];
}

const Writing: NextPageWithLayout<WritingProps> = ({ posts }) => {
  return (
    <Flex direction="column" align="flex-start">
      {posts.map((post) => (
        <Link href={post.slug} key={post.title}>
          <Stack mb={4}>
            <Divider margin="8px 0 !important" />
            <Stack>
              <Heading
                as="h2"
                size="lg"
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
      ))}
    </Flex>
  );
};

export default Writing;

Writing.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  const posts = fs.readdirSync("data/writing").map(async (slug) => {
    const contentPath = path.join("data/writing", slug);
    const fileContents = fs.readFileSync(contentPath, "utf8");
    const source = await serialize(fileContents, {
      parseFrontmatter: true,
      mdxOptions: { development: false },
    });

    return {
      ...source.frontmatter,
      slug: `/writing/${slug.split(".")[0]}`,
    };
  });

  return { props: { posts: await Promise.all(posts) } };
}
