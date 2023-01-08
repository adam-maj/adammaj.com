import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import fs from "fs";

async function writing() {
  const metadata = [];
  const basePath = path.join(process.cwd(), "content", "writing");

  const external = JSON.parse(
    fs.readFileSync(path.join(basePath, "external.json"), "utf8")
  ).map((item) => ({ ...item, external: true }));
  const postPaths = fs.readdirSync(basePath, "utf8");
  const posts = await Promise.all(
    postPaths
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
          url: "/" + path.join("writing", fileName.split(".")[0]),
          external: false,
        };
      })
  );

  metadata.push(...posts);
  metadata.push(...external);
  metadata.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  fs.writeFileSync(
    path.join(basePath, "index.json"),
    JSON.stringify(metadata, undefined, 2)
  );
}

async function books() {
  const basePath = path.join(process.cwd(), "content", "books");

  const bookPaths = fs.readdirSync(basePath, "utf8");
  const books = await Promise.all(
    bookPaths
      .filter((fileName) => fileName.includes(".mdx"))
      .map(async (fileName) => {
        const contentPath = path.join(basePath, fileName);
        const fileContents = fs
          .readFileSync(contentPath, "utf8")
          .split("## My Notes")[0];
        const source = await serialize(fileContents, {
          parseFrontmatter: true,
          mdxOptions: { development: false },
        });

        return {
          ...source.frontmatter,
          slug: "/" + path.join("books", fileName.split(".")[0]),
          summary: source.compiledSource,
        };
      })
  );

  books.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  fs.writeFileSync(
    path.join(basePath, "index.json"),
    JSON.stringify(books, undefined, 2)
  );
}

async function engineering() {
  const metadata = [];
  const basePath = path.join(process.cwd(), "content", "engineering");

  const external = JSON.parse(
    fs.readFileSync(path.join(basePath, "external.json"), "utf8")
  ).map((item) => ({ ...item, external: true }));
  const postPaths = fs.readdirSync(basePath, "utf8");
  const posts = await Promise.all(
    postPaths
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
          url: "/" + path.join("engineering", fileName.split(".")[0]),
          external: false,
        };
      })
  );

  metadata.push(...posts);
  metadata.push(...external);
  metadata.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  fs.writeFileSync(
    path.join(basePath, "index.json"),
    JSON.stringify(metadata, undefined, 2)
  );
}

async function main() {
  await writing();
  await books();
  await engineering();
}

main();
