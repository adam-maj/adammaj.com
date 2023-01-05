import { Container, VStack, Text, Flex, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

function Navigation({
  link,
  children,
  isExternal,
}: {
  link: string;
  children: string;
  isExternal?: boolean;
}) {
  const router = useRouter();
  const isActive =
    link === "/" ? router.asPath === link : router.asPath.includes(link);

  return (
    <Link href={link} target={isExternal ? "_blank" : "_self"}>
      <Text
        fontFamily={`"Lora", serif`}
        fontSize="lg"
        color={isActive ? "black" : "gray.500"}
        _hover={{ color: "black" }}
      >
        {children}
      </Text>
    </Link>
  );
}

function Layout({ children }: PropsWithChildren) {
  return (
    <Container position="relative" mt={20} pb="10em">
      <Flex position="absolute" right="100%" mr="160px">
        <VStack position="fixed" align="flex-start" spacing={10}>
          <VStack align="flex-start">
            <Text fontWeight="bold" fontSize="smaller">
              NAVIGATION
            </Text>
            <Navigation link="/">Home</Navigation>
            <Navigation link="/writing">Writing</Navigation>
            <Navigation link="/engineering">Engineering</Navigation>
            <Navigation link="/books">Books</Navigation>
            <Navigation link="/notes">Notes</Navigation>
          </VStack>
          <VStack align="flex-start">
            <Text fontWeight="bold" fontSize="smaller">
              FIND ME ON
            </Text>
            <Navigation
              link="https://www.youtube.com/channel/UChRuoAb-aIi-N4LWsRKOYLg"
              isExternal
            >
              YouTube
            </Navigation>
            <Navigation link="https://twitter.com/majmudaradam" isExternal>
              Twitter
            </Navigation>
            <Navigation link="https://github.com/adam-maj" isExternal>
              GitHub
            </Navigation>
          </VStack>
        </VStack>
      </Flex>
      <Container width="container.md" position="relative">
        <Box
          width="100%"
          bg="white"
          height={20}
          position="fixed"
          top={0}
          zIndex={100}
        />
        {children}
      </Container>
    </Container>
  );
}

export default Layout;
