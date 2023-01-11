import fs from "fs";
import path from "path";

function getAllBookSlugs() {
  const data = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "books", "index.json"),
      "utf8"
    )
  );
  return data.map((item) => item.slug);
}

function getAllWritingSlugs() {
  const data = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "writing", "index.json"),
      "utf8"
    )
  );

  return data.filter((item) => !item.external).map((item) => item.url);
}

function getAllEngineeringSlugs() {
  const data = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "engineering", "index.json"),
      "utf8"
    )
  );

  return data.filter((item) => !item.external).map((item) => item.url);
}

async function main() {
  const bookSlugs = getAllBookSlugs();
  const writingSlugs = getAllWritingSlugs();
  const engineeringSlugs = getAllEngineeringSlugs();
  const allSlugs = [...bookSlugs, ...writingSlugs, ...engineeringSlugs];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://adammaj.com</loc>
  </url>
  <url>
    <loc>https://adammaj.com/writing</loc>
  </url>
  <url>
    <loc>https://adammaj.com/engineering</loc>
  </url>
  <url>
    <loc>https://adammaj.com/books</loc>
  </url>
  <url>
    <loc>https://adammaj.com/notes</loc>
  </url>${allSlugs
    .map((slug) => {
      return `
  <url>
    <loc>${`https://adammaj.com${slug}`}</loc>
  </url>`;
    })
    .join("")}
</urlset>`;

  if (fs.existsSync("public/sitemap.xml")) {
    fs.unlinkSync("public/sitemap.xml");
  }

  fs.writeFileSync("public/sitemap.xml", sitemap);
}

main();
