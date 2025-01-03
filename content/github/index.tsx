// Start of Selection
import Script from "next/script";

export function Repo({
  slug,
  description,
}: {
  slug: string;
  description: string;
}) {
  // A simple approximation of the modern GitHub card using OpenGraph data
  // for the "${slug}" repository.
  return (
    <>
      <a
        href={`https://github.com/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          border: "1px solid #e1e4e8",
          borderRadius: "6px",
          textDecoration: "none",
          color: "inherit",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif",
          marginBottom: "16px",
        }}
      >
        <img
          src={`https://opengraph.githubassets.com/1/${slug}`}
          alt={`${slug} repository`}
          style={{
            width: "100%",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
        />
        <div style={{ padding: "12px" }}>
          <div
            style={{ fontWeight: "600", fontSize: "16px", marginBottom: "4px" }}
          >
            {slug}
          </div>
          <div style={{ fontSize: "14px", color: "#586069" }}>
            {description}
          </div>
        </div>
      </a>
      <Script />
    </>
  );
}
