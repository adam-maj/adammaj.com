import fs from "fs";
import path from "path";

export interface InspirationItem {
  title: string;
  size: "small" | "large";
  tag: "music" | "animation" | "video" | "place" | "game";
  date: string;
  description: string;
  image: string;
  links?: {
    href: string;
    caption: string;
  }[];
}

export function getInspirationItems(): InspirationItem[] {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "inspiration", "index.json"),
      "utf8"
    )
  );
}
