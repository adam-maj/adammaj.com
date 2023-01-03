import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import fs from "fs";

async function main() {
  const basePath = path.join(process.cwd(), "content", "writing");

  const writing = [];
  const external = JSON.parse(
    fs.readFileSync(path.join(basePath, "external.json"), "utf8")
  ).map((item) => ({ ...item, external: true }));
  const files = fs.readdirSync(basePath);
  const fileData = await Promise.all(
    files
      .filter((fileName) => fileName.includes(".mdx"))
      .map(async (fileName) => {
        const contentPath = path.join(basePath, fileName);
        const fileContents = fs.readFileSync(contentPath, "utf8");

        const source = await serialize(fileContents, {
          parseFrontmatter: true,
          mdxOptions: { development: false },
        });

        return {
          ...source.frontmatter,
          url: `/writing/${fileName.split(".")[0]}`,
          external: false,
        };
      })
  );

  writing.push(...fileData);
  writing.push(...external);
  writing.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  fs.writeFileSync(
    path.join(basePath, "index.json"),
    JSON.stringify(writing, undefined, 2)
  );
}

main();
