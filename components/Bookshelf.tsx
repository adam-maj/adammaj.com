import {
  Box,
  Button,
  Icon,
  HStack,
  Flex,
  Heading,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Book } from "../lib/books";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";

interface BookshelfProps {
  books: Book[];
}

export function Bookshelf({ books }: BookshelfProps) {
  const router = useRouter();
  const [bookIndex, setBookIndex] = React.useState(-1);
  const [scroll, setScroll] = React.useState(-200);

  const width = 41.5;
  const height = 220;
  const booksInViewport = 12;

  const spineWidth = `${width}px`;
  const coverWidth = `${width * 4}px`;
  const bookWidth = `${width * 5}px`;
  const bookHeight = `${height}px`;

  const minScroll = 0;
  const maxScroll =
    (width + 10) * (books.length - booksInViewport) +
    (bookIndex > -1 ? width * 4 : 0);

  React.useEffect(() => {
    if (bookIndex === -1) {
      boundedScroll(scroll);
    } else {
      boundedScroll((bookIndex - 4) * (width + 11));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookIndex]);

  const boundedScroll = (scrollX: number) => {
    setScroll(Math.max(minScroll, Math.min(maxScroll, scrollX)));
  };

  return (
    <>
      <svg
        style={{
          position: "absolute",
          inset: 0,
          visibility: "hidden",
        }}
      >
        <defs>
          <filter id="paper" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="8"
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="white"
              surfaceScale="1"
              result="diffLight"
            >
              <feDistantLight azimuth="45" elevation="35" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </svg>

      <HStack
        alignItems="center"
        gap={1}
        width="container.sm"
        overflowX="hidden"
        cursor="grab"
      >
        {books.map((book, index) => {
          return (
            <button
              key={book.title}
              onClick={() => {
                if (index === bookIndex) {
                  setBookIndex(-1);
                  router.push(`/books`);
                } else {
                  setBookIndex(index);
                  router.push(book.slug);
                }
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                outline: "none",
                flexShrink: 0,
                transform: `translateX(-${scroll}px)`,
                width: bookIndex === index ? bookWidth : spineWidth,
                perspective: "1000px",
                WebkitPerspective: "1000px",
                gap: "0px",
                transition: `all 500ms ease`,
                willChange: "auto",
              }}
            >
              <Flex
                alignItems="flex-start"
                justifyContent="center"
                width={spineWidth}
                height={bookHeight}
                flexShrink={0}
                transformOrigin="right"
                backgroundColor={book.spineColor}
                color={book.textColor}
                transform={`translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(${
                  bookIndex === index ? "-60deg" : "0deg"
                }) rotateZ(0deg) skew(0deg, 0deg)`}
                transition={"all 500ms ease"}
                willChange="auto"
                filter="brightness(0.8) contrast(2)"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <span
                  style={{
                    pointerEvents: "none",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 50,
                    height: bookHeight,
                    width: spineWidth,
                    opacity: 0.4,
                    filter: "url(#paper)",
                  }}
                />
                <Heading
                  mt="12px"
                  as="h2"
                  fontSize="xs"
                  fontFamily={`"DM Sans", sans-serif`}
                  style={{ writingMode: "vertical-rl" }}
                  userSelect="none"
                >
                  {book.title}
                </Heading>
              </Flex>
              <Box
                position="relative"
                flexShrink={0}
                overflow="hidden"
                transformOrigin="left"
                transform={`translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(${
                  bookIndex === index ? "30deg" : "88.8deg"
                }) rotateZ(0deg) skew(0deg, 0deg)`}
                transition={"all 500ms ease"}
                willChange="auto"
                filter="brightness(0.8) contrast(2)"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <span
                  style={{
                    pointerEvents: "none",
                    position: "fixed",
                    top: 0,
                    right: 0,
                    zIndex: 50,
                    height: bookHeight,
                    width: coverWidth,
                    opacity: 0.4,
                    filter: "url(#paper)",
                  }}
                />
                <span
                  style={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 50,
                    height: bookHeight,
                    width: coverWidth,
                    background: `linear-gradient(to right, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.25) 4px, rgba(255, 255, 255, 0.25) 6px, transparent 7px, transparent 9px, rgba(255, 255, 255, 0.25) 9px, transparent 12px)`,
                  }}
                />
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  width={coverWidth}
                  height={bookHeight}
                  style={{
                    transition: "all 500ms ease",
                    willChange: "auto",
                  }}
                />
              </Box>
            </button>
          );
        })}
      </HStack>

      <Slider
        width="container.sm"
        size="sm"
        value={scroll}
        min={minScroll}
        max={maxScroll}
        onChange={(val) => setScroll(val)}
      >
        <SliderTrack>
          <SliderFilledTrack bg="blue.500" />
        </SliderTrack>
        <SliderThumb border="1px solid" borderColor="gray.200" />
      </Slider>
    </>
  );
}
