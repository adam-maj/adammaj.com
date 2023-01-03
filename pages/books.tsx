import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
} from "@chakra-ui/react";
import { NextPageWithLayout } from "next";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import fs from "fs";

interface IBook {
  title: string;
  coverUrl: string;
  spineColor: string;
  textColor: string;
}

interface BooksProps {
  books: IBook[];
}

const Books: NextPageWithLayout<BooksProps> = ({ books }) => {
  const [bookIndex, setBookIndex] = React.useState(-1);
  const [scroll, setScroll] = React.useState(-200);

  const width = 44;
  const height = 280;

  useEffect(() => {
    if (bookIndex === -1) {
      boundedScroll(scroll);
    } else {
      const scrollWindowRight = -scroll + 532;
      const bookPosition = (bookIndex + 1) * 55;
      if (scrollWindowRight - bookPosition < width * 3) {
        boundedScroll(scroll - width * 4);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookIndex]);

  const spineWidth = `${width}px`;
  const coverWidth = `${width * 4.5}px`;
  const bookWidth = `${width * 5.3}px`;
  const bookHeight = `${height}px`;

  const scrollLeft = () => {
    boundedScroll(scroll + 200);
  };

  const scrollRight = () => {
    boundedScroll(scroll - 200);
  };

  const boundedScroll = (scrollX: number) => {
    const conditionalWidth = bookIndex > -1 ? width * 4.5 : 0;
    setScroll(
      Math.min(
        0,
        Math.max(
          -1 * (width + 15) * (books.length - 10) - conditionalWidth,
          scrollX
        )
      )
    );
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
      <HStack align="center" spacing={3} width="container.sm">
        <Button
          variant="ghost"
          onClick={scrollLeft}
          height="300px"
          width="44px"
          borderRightRadius={0}
        >
          <Icon as={FaChevronLeft} boxSize={5} />
        </Button>
        <Flex
          alignItems="center"
          gap={3}
          width="container.sm"
          overflowX="hidden"
          cursor="grab"
        >
          {books.map((book, index) => (
            <button
              key={index}
              onClick={() => {
                if (index === bookIndex) {
                  setBookIndex(-1);
                } else {
                  setBookIndex(index);
                }
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                outline: "none",
                flexShrink: 0,
                transform: `translateX(${scroll}px)`,
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
                  mt="20px"
                  as="h2"
                  style={{ writingMode: "vertical-lr" }}
                  fontSize="lg"
                  fontFamily={`"DM Sans", sans-serif`}
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
                  bookIndex === index ? "30deg" : "88.7deg"
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
                  src={book.coverUrl}
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
          ))}
        </Flex>
        <Button
          variant="ghost"
          onClick={scrollRight}
          height="300px"
          width="44px"
          borderLeftRadius={0}
        >
          <Icon as={FaChevronRight} boxSize={5} />
        </Button>
      </HStack>
    </>
  );
};

export default Books;

Books.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps() {
  const books = JSON.parse(fs.readFileSync("content/books/index.json", "utf8"));

  return {
    props: {
      books,
    },
  };
}
