import fs from "fs";
import path from "path";

export interface Drawing {
  title: string;
  image: string;
  date: string;
}

function getDrawingTimestamp(date: string): number | undefined {
  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) ? undefined : timestamp;
}

export function getDrawingItems(): Drawing[] {
  const drawingItems: Drawing[] = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "drawing", "data.json"),
      "utf8"
    )
  );

  return drawingItems
    .map((drawing, index) => ({
      drawing,
      index,
      timestamp: getDrawingTimestamp(drawing.date),
    }))
    .sort((a, b) => {
      if (a.timestamp !== undefined && b.timestamp !== undefined) {
        return b.timestamp - a.timestamp;
      }

      if (a.timestamp !== undefined) {
        return -1;
      }

      if (b.timestamp !== undefined) {
        return 1;
      }

      return a.index - b.index;
    })
    .map(({ drawing }) => drawing);
}
