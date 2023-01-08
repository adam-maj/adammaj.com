import path from "path";
import fs from "fs";
import { getMdxContent, MaybeContent } from "./mdx";

export interface Build {
  title: string;
  description: string;
  image: string;
  date: string;
  url: string;
  external: boolean;
  source: string;
}

export function getAllBuildData(): Build[] {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "engineering", "index.json"),
      "utf8"
    )
  );
}

export function getAllSlugs(): string[] {
  const data = getAllBuildData();

  return data.filter((item) => !item.external).map((item) => item.url);
}

export async function getBuil(slug: string): Promise<MaybeContent<Build>> {
  return getMdxContent<Build>("engineering", `${slug}.mdx`);
}
