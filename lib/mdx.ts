import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import fs from "fs";

export interface Content<TMetadata = { [key: string]: any }> {
  metadata: TMetadata;
  source: string;
}

export type MaybeContent<TMetadata> = Content<TMetadata> | undefined;

export async function getMdxContent<TMetadata>(
  ...paths: string[]
): Promise<MaybeContent<TMetadata>> {
  const contentPath = path.join(process.cwd(), "content", ...paths);
  if (!fs.existsSync(contentPath)) {
    return undefined;
  }

  const content = fs.readFileSync(contentPath, "utf8");
  const source = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: { development: false },
  });

  return {
    metadata: source.frontmatter as TMetadata,
    source: source.compiledSource,
  };
}
