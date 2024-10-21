import path from "path";
import fs from "fs";
import { getMdxContent, MaybeContent } from "./mdx";

export interface DeepDive {
  title: string;
  image: string;
  description: string;
  links: {
    label: string;
    href: string;
  }[];
}

export function getDeepDives(): DeepDive[] {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "deep-dives", "index.json"),
      "utf8"
    )
  );
}

export interface Post {
  title: string;
  description: string;
  image: string;
  date: string;
  url: string;
  external: boolean;
  source: string;
}

export function getAllPostData(): Post[] {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "writing", "index.json"),
      "utf8"
    )
  );
}

export function getAllSlugs(): string[] {
  const data = getAllPostData();

  return data.filter((item) => !item.external).map((item) => item.url);
}

export async function getPost(slug: string): Promise<MaybeContent<Post>> {
  return getMdxContent<Post>("writing", `${slug}.mdx`);
}
