import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  VStack,
  Text,
  Card,
  Divider,
} from "@chakra-ui/react";
import { NextPageWithLayout } from "next";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { MDXRemote } from "next-mdx-remote";
import { Book, getAllBooks } from "../lib/books";
import Link from "next/link";

function getBookId(title: string) {
  return title.toLowerCase().replaceAll(" ", "-");
}

interface BooksProps {
  books: Book[];
}

const Books: NextPageWithLayout<BooksProps> = ({ books }) => {
  const [bookIndex, setBookIndex] = React.useState(-1);
  const [scroll, setScroll] = React.useState(-200);

  const width = 40;
  const height = 220;
  const booksInViewport = 10.3;

  useEffect(() => {
    if (bookIndex === -1) {
      boundedScroll(scroll);
    } else {
      const scrollWindowRight = -scroll + 532;
      const bookPosition = (bookIndex + 1) * (width + booksInViewport);
      if (scrollWindowRight - bookPosition < width * 5) {
        boundedScroll(scroll - width * 5);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookIndex]);

  const spineWidth = `${width}px`;
  const coverWidth = `${width * 4}px`;
  const bookWidth = `${width * 6}px`;
  const bookHeight = `${height}px`;

  const scrollLeft = () => {
    boundedScroll(scroll + 250);
  };

  const scrollRight = () => {
    boundedScroll(scroll - 250);
  };

  const boundedScroll = (scrollX: number) => {
    const conditionalWidth = bookIndex > -1 ? width * 5 : 0;
    setScroll(
      Math.min(
        0,
        Math.max(
          -1 * (width + 10) * (books.length - booksInViewport) -
            conditionalWidth,
          scrollX
        )
      )
    );
  };

  return (
    <Flex direction="column" gap={10}>
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
      <Flex position="absolute" left="88%">
        <Box height="container.sm" position="fixed" pt={"210px"}>
          <HStack
            align="center"
            spacing={3}
            width="container.sm"
            zIndex={50}
            transform="rotate(-90deg)"
          >
            <Button
              variant="ghost"
              onClick={scrollLeft}
              height={bookHeight}
              width={spineWidth}
              borderRightRadius={0}
            >
              <Icon as={FaChevronLeft} boxSize={5} />
            </Button>
            <HStack
              alignItems="center"
              gap={1}
              width="container.sm"
              overflowX="hidden"
              cursor="grab"
            >
              {books.map((book, index) => {
                return (
                  <Link
                    key={book.title}
                    href={`#${getBookId(book.title)}`}
                    onClick={(e) => bookIndex === index && e.preventDefault()}
                  >
                    <button
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
                        transform: `translateX(${scroll}px) rotateZ(${
                          bookIndex === index ? "90deg" : "0deg"
                        }) translateX(${bookIndex === index ? "20px" : `0px`})`,
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
                  </Link>
                );
              })}
            </HStack>
            <Button
              variant="ghost"
              onClick={scrollRight}
              height={bookHeight}
              width={spineWidth}
              borderLeftRadius={0}
            >
              <Icon as={FaChevronRight} boxSize={5} />
            </Button>
          </HStack>
        </Box>
      </Flex>
      <Stack spacing={5}>
        {books.map((book, index) => (
          <Stack
            width="container.sm"
            key={book.title}
            id={getBookId(book.title)}
            scrollMarginTop={20}
          >
            <Stack width="container.sm">
              <Divider mb={3} width="100%" />
              <Flex
                direction="row"
                width="container.sm"
                align="flex-start"
                gap={6}
              >
                <Image
                  border="1px solid"
                  borderColor="gray.200"
                  src={book.coverImage}
                  alt={book.title}
                  width={"110px"}
                  height={"160px"}
                />
                <VStack align="flex-start" flexGrow={1}>
                  <Heading size="md">{book.title}</Heading>
                  <Text color="#999" size="md">
                    {book.author}
                  </Text>
                  <Text color="#666">
                    Read: {book.date} • Rating: {book.rating}/10
                  </Text>
                  <Prose>
                    <MDXRemote compiledSource={book.summary} />
                  </Prose>
                </VStack>
              </Flex>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Flex>
  );
};

export default Books;

Books.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps() {
  const books = await getAllBooks();
  books.sort((a, b) => a.rating - b.rating).reverse();

  return {
    props: {
      books,
    },
  };
}
