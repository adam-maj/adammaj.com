import { Box, Flex, Heading, Icon, Image } from "@chakra-ui/react";
import { NextPageWithLayout } from "next";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface IBook {
  title: string;
  coverUrl: string;
  spineBackgroundColor: string;
  spineForegroundColor: string;
}

const books: IBook[] = [
  {
    title: "The Last Question",
    coverUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1375886757l/18299452.jpg",
    spineBackgroundColor: "#000",
    spineForegroundColor: "#fff",
  },
  {
    title: "Zero to One",
    coverUrl:
      "https://img.wook.pt/images/zero-to-one-blake-masters/MXwyMjE1NzUyM3wxODAzNjM1OXwxNTcxMDIyMTAyMDAw/500x",
    spineBackgroundColor: "#5e7fa6",
    spineForegroundColor: "#fff",
  },
  {
    title: "Flowers for Algernon",
    coverUrl:
      "http://prodimage.images-bn.com/pimages/9780156030304_p0_v4_s1200x630.jpg",
    spineBackgroundColor: "#e02f2f",
    spineForegroundColor: "#fff",
  },
  {
    title: "The Power of Now",
    coverUrl:
      "https://kbimages1-a.akamaihd.net/59e80730-aaad-4b30-ac1d-fd5952880c01/1200/1200/False/the-power-of-now-1.jpg",
    spineBackgroundColor: "#f0eda8",
    spineForegroundColor: "#222",
  },
  {
    title: "Life 3.0",
    coverUrl: "https://m.media-amazon.com/images/I/41oUl8JqogL.jpg",
    spineBackgroundColor: "#180b26",
    spineForegroundColor: "#fff",
  },
  {
    title: "Atomic Habits",
    coverUrl:
      "https://img.wook.pt/images/atomic-habits-james-clear/MXwyMTg2NTQxOHwxNzcyMDUzMXwxNjQ3MzQwMzcwMDAw/500x",
    spineBackgroundColor: "#fffff0",
    spineForegroundColor: "#222",
  },
  {
    title: "The Almanack of Naval Ravikant",
    coverUrl:
      "https://kbimages1-a.akamaihd.net/4201b1dd-87a3-449e-bb7a-72d9b20ad321/1200/1200/False/the-almanack-of-naval-ravikant.jpg",
    spineBackgroundColor: "#fff",
    spineForegroundColor: "#000",
  },
  {
    title: "Awaken the Giant Within",
    coverUrl:
      "https://kbimages1-a.akamaihd.net/8e2d7277-e8c5-453b-998e-8f17348a69c2/1200/1200/False/awaken-the-giant-within.jpg",
    spineBackgroundColor: "#b38e32",
    spineForegroundColor: "#000",
  },
  {
    title: "Six Easy Pieces",
    coverUrl: "https://pictures.abebooks.com/isbn/9780201409567-us.jpg",
    spineBackgroundColor: "#f22411",
    spineForegroundColor: "#340b52",
  },
  {
    title: "On The Shortness of Life",
    coverUrl: "https://m.media-amazon.com/images/I/41HlG+jCHDL._AC_SY780_.jpg",
    spineBackgroundColor: "#192859",
    spineForegroundColor: "#fff",
  },
  {
    title: "From Third World To First",
    coverUrl: "https://m.media-amazon.com/images/I/41QFuIPHVOL._AC_SY780_.jpg",
    spineBackgroundColor: "#000",
    spineForegroundColor: "#fff",
  },
];

const Books: NextPageWithLayout = () => {
  const [bookIndex, setBookIndex] = React.useState(-1);
  const [scroll, setScroll] = React.useState(-200);

  const [isScrolling, setIsScrolling] = React.useState(false);
  const [startMouseX, setStartMouseX] = React.useState(0);
  const [startScrollX, setStartScrollX] = React.useState(0);

  const width = 55;
  const height = 400;

  const spineWidth = `${width}px`;
  const coverWidth = `${width * 5.5}px`;
  const bookWidth = `${width * 6}px`;
  const bookHeight = `${height}px`;

  const scrollLeft = () => {
    boundedScroll(scroll + 500);
  };

  const scrollRight = () => {
    boundedScroll(scroll - 500);
  };

  const boundedScroll = (scrollX: number) => {
    setScroll(
      Math.min(0, Math.max(-1 * (width + 15) * (books.length - 8), scrollX))
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
      <Icon as={FaChevronLeft} boxSize={5} onClick={scrollLeft} />
      <Icon as={FaChevronRight} boxSize={5} onClick={scrollRight} />
      <Flex
        alignItems="center"
        gap={4}
        width="container.xs"
        overflowX="hidden"
        cursor="grab"
        onMouseDown={(e) => {
          console.log("down");
          setIsScrolling(true);
          setStartMouseX(e.clientX);
          setStartScrollX(scroll);
        }}
        onMouseMove={(e) => {
          if (isScrolling) {
            const dX = e.clientX - startMouseX;
            boundedScroll(startScrollX + dX);
          }
        }}
        onMouseUp={(e) => setIsScrolling(false)}
        onMouseLeave={() => setIsScrolling(false)}
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
              transition: `width 500ms ease, transform ${
                isScrolling ? "0ms" : "500ms"
              } ease`,
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
              backgroundColor={book.spineBackgroundColor}
              color={book.spineForegroundColor}
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
                fontSize="2xl"
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
                bookIndex === index ? "30deg" : "88.4deg"
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
    </>
  );
};

export default Books;

Books.getLayout = (page) => <Layout>{page}</Layout>;
