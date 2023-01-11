import { getMdxContent, MaybeContent } from "./mdx";
import path from "path";
import fs from "fs";

export interface Book {
  title: string;
  author: string;
  date: string;
  rating: number;
  coverImage: string;
  spineColor: string;
  textColor: string;
  slug: string;
  summary: string;
}

export function getAllBooks(): Book[] {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "books", "index.json"),
      "utf8"
    )
  );
}

export function getAllSlugs(): string[] {
  const data = getAllBooks();
  return data.map((item) => item.slug);
}

export async function getBook(slug: string): Promise<MaybeContent<Book>> {
  const book = await getMdxContent<Book>("books", `${slug}.mdx`);
  if (!book) {
    return undefined;
  }

  return {
    ...book,
  };
}
