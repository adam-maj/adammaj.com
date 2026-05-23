import {
  AspectRatio,
  Box,
  Divider,
  Grid,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPageWithLayout } from "next";
import { MDXRemote } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import { KeyboardEvent, useState } from "react";
import {
  FiImage,
  FiMapPin,
  FiMonitor,
  FiMusic,
  FiVideo,
} from "react-icons/fi";
import { IconType } from "react-icons";
import Layout from "../components/Layout";
import { InspirationItem, getInspirationItems } from "../lib/inspiration";

interface InspirationPageProps {
  items: InspirationItem[];
}

const tagIcons: Record<InspirationItem["tag"], IconType> = {
  animation: FiImage,
  game: FiMonitor,
  music: FiMusic,
  place: FiMapPin,
  video: FiVideo,
};

function getItemKey(item: InspirationItem, index: number) {
  return `${item.title}-${index}`;
}

function getCardRatio(size: InspirationItem["size"]) {
  return size === "large" ? 1.85 : 1;
}

const InspirationPage: NextPageWithLayout<InspirationPageProps> = ({
  items,
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  function toggleCard(key: string) {
    setFlippedCards((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleCardKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
    key: string
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
        <Divider width="100%" />
        {items.length === 0 ? (
          <Text color="gray.500" fontSize="sm">
            Add items to content/inspiration/*.mdx.
          </Text>
        ) : (
          <Grid
            as="section"
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
            gap={{ base: 5, md: 6 }}
            alignItems="start"
          >
            {items.map((item, index) => {
              const key = getItemKey(item, index);
              const isFlipped = Boolean(flippedCards[key]);
              const TypeIcon = tagIcons[item.tag] || FiImage;

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
                          bg="blackAlpha.400"
                          transition="background-color 160ms ease"
                          _groupHover={{ bg: "blackAlpha.300" }}
                        />
                        <Box position="absolute" top={0} left={0} p={4}>
                          <Text
                            color="white"
                            fontWeight="bold"
                            lineHeight="short"
                            textShadow="0 1px 8px rgba(0, 0, 0, 0.45)"
                          >
                            {item.title}
                          </Text>
                        </Box>
                        <Icon
                          as={TypeIcon}
                          position="absolute"
                          right={4}
                          bottom={4}
                          color="white"
                          boxSize={5}
                          filter="drop-shadow(0 1px 6px rgba(0, 0, 0, 0.45))"
                        />
                      </Box>
                      <VStack
                        position="absolute"
                        inset={0}
                        align="stretch"
                        justify="space-between"
                        spacing={4}
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
                            color="gray.500"
                            fontSize="sm"
                            lineHeight="short"
                            sx={{
                              p: { my: 1 },
                              "p:first-of-type": { mt: 0 },
                              "p:last-child": { mb: 0 },
                              "ul, ol": { my: 1, pl: 4 },
                            }}
                          >
                            <MDXRemote
                              compiledSource={item.description}
                              scope={{}}
                              frontmatter={{}}
                            />
                          </Box>
                        </VStack>
                        {item.links && item.links.length > 0 && (
                          <VStack align="flex-start" spacing={1}>
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
                          </VStack>
                        )}
                      </VStack>
                    </Box>
                  </AspectRatio>
                </Box>
              );
            })}
          </Grid>
        )}
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
