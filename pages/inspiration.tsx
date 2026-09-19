import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPageWithLayout } from "next";
import { MDXRemote } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { KeyboardEvent, useState } from "react";
import Layout from "../components/Layout";
import { InspirationItem, getInspirationItems } from "../lib/inspiration";

interface InspirationPageProps {
  items: InspirationItem[];
}

type InspirationTag = InspirationItem["tag"];

const tagFilters: { tag: InspirationTag; label: string }[] = [
  { tag: "animation", label: "Animations" },
  { tag: "music", label: "Music" },
  { tag: "video", label: "Videos" },
  { tag: "location", label: "Locations" },
  { tag: "game", label: "Games" },
];

function getItemKey(item: InspirationItem, index: number) {
  return `${item.title}-${item.index ?? index}`;
}

function getCardRatio(size: InspirationItem["size"]) {
  return size === "large" ? 1.85 : 1;
}

const InspirationPage: NextPageWithLayout<InspirationPageProps> = ({
  items,
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeTag, setActiveTag] = useState<InspirationTag | undefined>();
  const filteredItems =
    activeTag === undefined
      ? items
      : items.filter((item) => item.tag === activeTag);

  function toggleTag(tag: InspirationTag) {
    setActiveTag((current) => (current === tag ? undefined : tag));
  }

  function toggleCard(key: string) {
    setFlippedCards((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleCardKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
    key: string,
  ) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    toggleCard(key);
  }

  return (
    <>
      <NextSeo title="Inspiration | Adam Majmudar" />
      <VStack width="100%" spacing={5} align="stretch">
        <HStack spacing={2} overflowX="auto" whiteSpace="nowrap">
          <Button
            size="sm"
            height="28px"
            minWidth="auto"
            px={3}
            border={0}
            borderRadius={6}
            boxShadow="none"
            bg={activeTag === undefined ? "#F1F1F1" : "transparent"}
            color={activeTag === undefined ? "#666" : "#999"}
            fontSize="xs"
            fontWeight="medium"
            onClick={() => setActiveTag(undefined)}
            _hover={{ bg: activeTag === undefined ? "#EAEAEA" : "#F8F8F8" }}
            _active={{ bg: "#E3E3E3" }}
            _focus={{ boxShadow: "none" }}
          >
            All
          </Button>
          {tagFilters.map(({ tag, label }) => {
            const isActive = activeTag === tag;

            return (
              <Button
                key={tag}
                size="sm"
                height="28px"
                minWidth="auto"
                px={3}
                border={0}
                borderRadius={6}
                boxShadow="none"
                bg={isActive ? "#F1F1F1" : "transparent"}
                color={isActive ? "#666" : "#999"}
                fontSize="xs"
                fontWeight="medium"
                onClick={() => toggleTag(tag)}
                _hover={{ bg: isActive ? "#EAEAEA" : "#F8F8F8" }}
                _active={{ bg: "#E3E3E3" }}
                _focus={{ boxShadow: "none" }}
              >
                {label}
              </Button>
            );
          })}
        </HStack>

        <Grid
          as="section"
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
          gap={{ base: 5, md: 6 }}
          alignItems="start"
        >
          {filteredItems.map((item, index) => {
            const key = getItemKey(item, index);
            const isFlipped = Boolean(flippedCards[key]);

            return (
              <Box
                key={key}
                as="article"
                gridColumn={{
                  base: "span 1",
                  sm: item.size === "large" ? "span 2" : "span 1",
                }}
                sx={{ perspective: "1200px" }}
              >
                <AspectRatio ratio={getCardRatio(item.size)}>
                  <Box
                    position="relative"
                    width="100%"
                    height="100%"
                    cursor="pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`${isFlipped ? "Hide" : "Show"} ${
                      item.title
                    } details`}
                    onClick={() => toggleCard(key)}
                    onKeyDown={(event) => handleCardKeyDown(event, key)}
                    sx={{
                      transformStyle: "preserve-3d",
                      WebkitTransformStyle: "preserve-3d",
                    }}
                  >
                    <Box
                      position="absolute"
                      inset={0}
                      borderRadius={12}
                      overflow="hidden"
                      role="group"
                      zIndex={isFlipped ? 1 : 2}
                      pointerEvents={isFlipped ? "none" : "auto"}
                      sx={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: isFlipped
                          ? "rotateY(-180deg)"
                          : "rotateY(0deg)",
                        transformStyle: "preserve-3d",
                        WebkitTransformStyle: "preserve-3d",
                        transition:
                          "transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1), z-index 0ms linear 260ms",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt=""
                        width="100%"
                        height="100%"
                        objectFit="cover"
                      />
                      <Box
                        position="absolute"
                        inset={0}
                        bg="blackAlpha.200"
                        transition="background-color 160ms ease"
                        _groupHover={{ bg: "blackAlpha.400" }}
                      />
                      <Box position="absolute" bottom={0} left={0} p={4}>
                        <Text
                          color="white"
                          fontWeight="bold"
                          lineHeight="short"
                          fontSize="sm"
                        >
                          {item.title}
                        </Text>
                      </Box>
                    </Box>
                    <VStack
                      position="absolute"
                      inset={0}
                      align="stretch"
                      borderRadius={12}
                      border="1px solid"
                      borderColor="#EAEAEA"
                      bg="white"
                      p={{ base: 4, md: 5 }}
                      zIndex={isFlipped ? 2 : 1}
                      pointerEvents={isFlipped ? "auto" : "none"}
                      sx={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: isFlipped
                          ? "rotateY(0deg)"
                          : "rotateY(180deg)",
                        transformStyle: "preserve-3d",
                        WebkitTransformStyle: "preserve-3d",
                        transition:
                          "transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1), z-index 0ms linear 260ms",
                      }}
                    >
                      <VStack align="stretch" spacing={2}>
                        <Box
                          color="#777"
                          lineHeight="1.35"
                          overflowY="auto"
                          pb={item.links && item.links.length > 0 ? 7 : 0}
                          sx={{
                            ".inspiration-prose p, .inspiration-prose li": {
                              fontSize: "0.85rem !important",
                              lineHeight: "1.35 !important",
                            },
                            ".inspiration-prose p": { my: "0.5rem !important" },
                            ".inspiration-prose p:first-of-type": {
                              mt: "0 !important",
                            },
                            ".inspiration-prose p:last-child": {
                              mb: "0 !important",
                            },
                            "ul, ol": { my: 2, pl: 4 },
                          }}
                        >
                          <Prose className="inspiration-prose">
                            <MDXRemote
                              compiledSource={item.description}
                              scope={{}}
                              frontmatter={{}}
                            />
                          </Prose>
                        </Box>
                      </VStack>
                      {item.links && item.links.length > 0 && (
                        <HStack
                          position="absolute"
                          right={{ base: 4, md: 5 }}
                          bottom={{ base: 4, md: 5 }}
                          spacing={5}
                        >
                          {item.links.map((link) => (
                            <Link
                              key={`${item.title}-${link.href}`}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              color="blue.600"
                              fontSize="sm"
                              onClick={(event) => event.stopPropagation()}
                              onKeyDown={(event) => event.stopPropagation()}
                              _hover={{ textDecoration: "underline" }}
                            >
                              {link.caption}
                            </Link>
                          ))}
                        </HStack>
                      )}
                    </VStack>
                  </Box>
                </AspectRatio>
              </Box>
            );
          })}
        </Grid>
      </VStack>
    </>
  );
};

InspirationPage.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  return {
    props: {
      items: getInspirationItems(),
    },
  };
}

export default InspirationPage;
