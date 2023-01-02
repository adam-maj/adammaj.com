import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { GetStaticPropsContext } from "next";
import path from "path";
import fs from "fs";
import { Heading, Image, Flex } from "@chakra-ui/react";

interface MdxProps {
  source: {
    frontmatter: {
      [key: string]: any;
    };
    compiledSource: string;
  };
}

export default function Mdx({ source }: MdxProps) {
  return (
    <Flex direction="column">
      <Heading size="5xl">{source.frontmatter.title}</Heading>
      {source.frontmatter.image && (
        <Image
          mt="12px"
          src={source.frontmatter.image}
          alt={source.frontmatter.title}
        />
      )}
      <MDXRemote {...source} />
    </Flex>
  );
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params) {
    return { props: {} };
  }

  const contentPath = path.join("data/writing", `${params.slug}.mdx`);
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
    .readdirSync("data/writing")
    .map((slug) => ({ params: { slug: slug.split(".")[0] } }));

  return {
    paths,
    fallback: false,
  };
}
