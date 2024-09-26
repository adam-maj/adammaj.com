import {
  Box,
  Icon,
  HStack,
  Flex,
  Image,
  Heading,
  Center,
  useDimensions,
  useBreakpointValue,
} from "@chakra-ui/react";
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
  const [hoverIndex, setHoverIndex] = React.useState(-1);
  const [scroll, setScroll] = React.useState(-200);
  const [isMaybeDragging, setIsMaybeDragging] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startScroll, setStartScroll] = React.useState(0);
  const [startPageX, setStartPageX] = React.useState(0);

  const bookshelfRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const scrollRightRef = React.useRef<HTMLDivElement>(null);
  const scrollLeftRef = React.useRef<HTMLDivElement>(null);
  const viewportDimensions = useDimensions(viewportRef, true);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [booksInViewport, setBooksInViewport] = React.useState(0);
  const scrollEvents = useBreakpointValue({
    base: { start: "touchstart", stop: "touchend" },
    sm: { start: "mouseenter", stop: "mouseleave" },
  });

  const width = 41.5;
  const height = 220;

  const spineWidth = `${width}px`;
  const coverWidth = `${width * 4}px`;
  const bookWidth = `${width * 5}px`;
  const bookHeight = `${height}px`;

  const leftBookIndex = Math.max(
    0,
    Math.floor(scroll - (bookIndex > -1 ? width * 4 : 0)) / (width + 12) +
      (bookIndex !== -1 ? 1 : 0) -
      5
  );
  const rightBookIndex = React.useMemo(() => {
    if (!booksInViewport) {
      return 15;
    }

    return Math.min(
      books.length,
      Math.floor(scroll - (bookIndex > -1 ? width * 4 : 0)) / (width + 12) +
        (bookIndex !== -1 ? 1 : 0) +
        booksInViewport +
        5
    );
  }, [booksInViewport, bookIndex, books.length, scroll, width]);

  const minScroll = 0;
  const maxScroll = React.useMemo(() => {
    return (
      (width + 12) * (books.length - booksInViewport) +
      (bookIndex > -1 ? width * 4 : 0) +
      5
    );
  }, [bookIndex, books.length, booksInViewport, width]);

  const boundedScroll = (scrollX: number) => {
    setScroll(Math.max(minScroll, Math.min(maxScroll, scrollX)));
  };

  const boundedRelativeScroll = React.useCallback(
    (incrementX: number) => {
      setScroll((_scroll) =>
        Math.max(minScroll, Math.min(maxScroll, _scroll + incrementX))
      );
    },
    [maxScroll]
  );

  React.useEffect(() => {
    if (router.query.slug && router.query.slug.length > 0 && bookIndex === -1) {
      const idx = books.findIndex((b) =>
        b.slug
          .toLowerCase()
          .includes((router.query.slug as string[])[0].toLowerCase())
      );
      setBookIndex(idx);
    }
  }, []);

  React.useEffect(() => {
    if (bookIndex === -1) {
      boundedRelativeScroll(0);
    } else {
      boundedScroll((bookIndex - (booksInViewport - 4) / 2) * (width + 12));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookIndex, boundedRelativeScroll]);

  React.useEffect(() => {
    if (viewportDimensions) {
      boundedRelativeScroll(0);
      const numberOfBooks = viewportDimensions.contentBox.width / (width + 11);
      setBooksInViewport(numberOfBooks);
    }
  }, [viewportDimensions, boundedRelativeScroll]);

  React.useEffect(() => {
    if (!scrollEvents) {
      return;
    }

    // Create a copy of the scroll events to save for clean-up
    // So it doesn't switch underneath causing us to clean-up the wrong listeners
    const currentScrollEvents = { ...scrollEvents };

    const currentScrollRightRef = scrollRightRef.current;
    const currentScrollLeftRef = scrollLeftRef.current;

    let scrollInterval: NodeJS.Timeout | null = null;

    const setScrollRightInterval = () => {
      setIsScrolling(true);
      scrollInterval = setInterval(() => {
        boundedRelativeScroll(4);
      }, 10);
    };

    const setScrollLeftInterval = () => {
      setIsScrolling(true);
      scrollInterval = setInterval(() => {
        boundedRelativeScroll(-4);
      }, 10);
    };

    const clearScrollInterval = () => {
      setIsScrolling(false);
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };

    currentScrollRightRef!.addEventListener(
      currentScrollEvents.start,
      setScrollRightInterval
    );
    currentScrollRightRef!.addEventListener(
      currentScrollEvents.stop,
      clearScrollInterval
    );

    currentScrollLeftRef!.addEventListener(
      currentScrollEvents.start,
      setScrollLeftInterval
    );
    currentScrollLeftRef!.addEventListener(
      currentScrollEvents.stop,
      clearScrollInterval
    );

    return () => {
      clearScrollInterval();

      currentScrollRightRef!.removeEventListener(
        currentScrollEvents.start,
        setScrollRightInterval
      );
      currentScrollRightRef!.removeEventListener(
        currentScrollEvents.stop,
        clearScrollInterval
      );

      currentScrollLeftRef!.removeEventListener(
        currentScrollEvents.start,
        setScrollLeftInterval
      );
      currentScrollLeftRef!.removeEventListener(
        currentScrollEvents.stop,
        clearScrollInterval
      );
    };
  }, [boundedRelativeScroll]);

  const drag = {
    onDragStart(e: React.PointerEvent<HTMLDivElement>) {
      setIsMaybeDragging(true);
      setStartScroll(scroll);
      setStartPageX(e.pageX);
    },
    onDragMove(e: React.PointerEvent<HTMLDivElement>) {
      if (!isMaybeDragging) return;

      const distance = startPageX - e.pageX;
      if (Math.abs(distance) < 2) {
        return;
      }

      setIsDragging(true);

      e.preventDefault();
      setScroll(
        Math.max(minScroll, Math.min(maxScroll, startScroll + distance))
      );
    },
    onDragEnd() {
      // Add a tiny delay so that books don't open on drag end
      setTimeout(() => {
        setHoverIndex(-1);
        setIsDragging(false);
        setIsMaybeDragging(false);
      }, 1);
    },
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

      <Box position="relative" ref={bookshelfRef}>
        <Box
          position="absolute"
          left={{ base: "-28px", md: "-36px" }}
          height="100%"
          display={scroll > minScroll ? "block" : "none"}
        >
          <Center
            display={{ base: "none", md: "flex" }}
            ref={scrollLeftRef}
            borderRadius="md"
            height="100%"
            width="28px"
            _hover={{
              bg: "#EAEAEA",
            }}
            borderRightRadius={{ base: 0, md: undefined }}
          >
            <Icon as={FaChevronLeft} boxSize={3} color={"#666"} />
          </Center>
          <Center
            display={{ base: "flex", md: "none" }}
            height="100%"
            width="28px"
          >
            <Icon as={FaChevronLeft} boxSize={3} color={"#666"} />
          </Center>
        </Box>
        <HStack
          alignItems="center"
          gap={3}
          overflowX="hidden"
          mt="-12px"
          pt="12px"
          cursor="grab"
          onPointerDown={drag.onDragStart}
          onPointerMove={drag.onDragMove}
          onPointerUp={drag.onDragEnd}
          onPointerLeave={drag.onDragEnd}
          ref={viewportRef}
          position="relative"
          height={`${height + 12}px`}
        >
          {books.map((book, index) => {
            if (index < leftBookIndex || index > rightBookIndex) {
              return undefined;
            }

            return (
              <Box
                position="absolute"
                top={"12px"}
                marginInlineStart="0px !important"
                left={
                  (bookIndex !== -1 && index > bookIndex ? width * 4 : 0) +
                  index * (width + 12)
                }
                key={`${book.title}-${index}`}
                transform={
                  hoverIndex === index && bookIndex === -1
                    ? `translateY(-12px)`
                    : `translateY(0px)`
                }
                transition="left 500ms ease, transform 300ms ease"
              >
                <button
                  onClick={() => {
                    // Don't open books while you're dragging
                    if (isDragging) return;

                    if (index === bookIndex) {
                      setBookIndex(-1);
                      router.push(`/books`);
                    } else {
                      setHoverIndex(-1);
                      setBookIndex(index);
                      router.push(book.slug);
                    }
                  }}
                  onMouseEnter={() => {
                    // Don't hover books while you're dragging
                    if (isDragging) return;

                    if (index !== bookIndex) {
                      setHoverIndex(index);
                    }
                  }}
                  onMouseLeave={() => {
                    // If we're dragging, end animation at end of drag
                    if (isDragging) return;

                    setHoverIndex(-1);
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
                    transition: isDragging
                      ? ``
                      : isScrolling
                      ? `transform 100ms linear`
                      : `all 500ms ease`,
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
                      color={book.textColor}
                      fontFamily={`"DM Sans", sans-serif`}
                      style={{ writingMode: "vertical-rl" }}
                      userSelect="none"
                      textOverflow="ellipsis"
                      textAlign="left"
                      whiteSpace="nowrap"
                      letterSpacing={-0.2}
                      overflow="hidden"
                      maxHeight={`${height - 24}px`}
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
                      bookIndex === index ? "30deg" : `${88.8}deg`
                    }) rotateZ(0deg) skew(0deg, 0deg)`}
                    transition={"all 500ms ease"}
                    willChange="auto"
                    filter="brightness(0.8) contrast(2)"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    bg={book.spineColor}
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
              </Box>
            );
          })}
        </HStack>
        <Box
          position="absolute"
          right={{ base: "-28px", md: "-36px" }}
          pl="10px"
          height="100%"
          top={0}
          display={scroll < maxScroll ? "block" : "none"}
        >
          <Center
            display={{ base: "none", md: "flex" }}
            borderLeftRadius={{ base: 0, md: undefined }}
            borderRightRadius="md"
            ref={scrollRightRef}
            height="100%"
            width="28px"
            _hover={{
              bg: "#EAEAEA",
            }}
          >
            <Icon as={FaChevronRight} boxSize={3} color={"#666"} />
          </Center>
          <Center
            display={{ base: "flex", md: "none" }}
            height="100%"
            width="28px"
          >
            <Icon as={FaChevronRight} boxSize={3} color={"#666"} />
          </Center>
        </Box>
      </Box>
    </>
  );
}
