import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { GetStaticPropsContext, NextPageWithLayout } from "next";
import path from "path";
import fs from "fs";
import { Heading, Image, Flex } from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import Layout from "../../components/Layout";

interface MdxProps {
  source: {
    frontmatter: {
      [key: string]: any;
    };
    compiledSource: string;
  };
}

const Mdx: NextPageWithLayout<MdxProps> = ({ source }) => {
  return (
    <Flex direction="column">
      <Heading size="xl">{source.frontmatter.title}</Heading>
      <Prose>
        <MDXRemote {...source} />
      </Prose>
    </Flex>
  );
};

export default Mdx;

Mdx.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params) {
    return { props: {} };
  }

  const contentPath = path.join("content/writing", `${params.slug}.mdx`);
  const fileContents = fs.readFileSync(contentPath, "utf8");
  const source = await serialize(fileContents, {
    parseFrontmatter: true,
    mdxOptions: { development: false },
  });

  return { props: { source } };
}

export async function getStaticPaths() {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = fs
    .readdirSync("content/writing")
    .filter((fileName) => fileName.includes(".mdx"))
    .map((slug) => ({ params: { slug: slug.split(".")[0] } }));

  return {
    paths,
    fallback: false,
  };
}
