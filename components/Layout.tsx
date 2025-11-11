import {
  Container,
  VStack,
  Text,
  Flex,
  Box,
  HStack,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Icon,
  MenuGroup,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { FiMenu } from "react-icons/fi";

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
    <Link
      href={link}
      target={isExternal ? "_blank" : "_self"}
      color={isActive ? "black" : "gray.500"}
      _hover={{ color: "black" }}
    >
      <Text fontSize="lg">{children}</Text>
    </Link>
  );
}

function Layout({ children }: PropsWithChildren) {
  return (
    <Container
      position="relative"
      mt={{ base: 16 }}
      pb={{ base: 8, md: "10em" }}
      gap={{ md: 10 }}
    >
      <Flex
        position="absolute"
        right="100%"
        mr="160px"
        display={{ base: "none", lg: "flex" }}
      >
        <VStack position="fixed" align="flex-start" spacing={10}>
          <VStack align="flex-start">
            <Text fontWeight="bold" fontSize="smaller">
              NAVIGATION
            </Text>
            <Navigation link="/">Home</Navigation>
            <Navigation link="/reading">Reading</Navigation>
            <Navigation link="/writing">Writing</Navigation>
            <Navigation link="/deep-dives">Deep Dives</Navigation>
          </VStack>
          <VStack align="flex-start">
            <Text fontWeight="bold" fontSize="smaller">
              FIND ME ON
            </Text>
            <Navigation link="https://twitter.com/majmudaradam" isExternal>
              Twitter
            </Navigation>
            <Navigation link="https://substack.com/@adammaj" isExternal>
              Substack
            </Navigation>
            <Navigation link="https://github.com/adam-maj" isExternal>
              GitHub
            </Navigation>
          </VStack>
        </VStack>
      </Flex>
      <Container width={{ md: "container.md" }} position="relative">
        <Box
          width="100%"
          bg="white"
          height={16}
          position="fixed"
          top={0}
          zIndex={100}
          display={{ base: "none", lg: "block" }}
        />
        <Flex
          justify="space-between"
          position="fixed"
          top={0}
          display={{ base: "flex", lg: "none" }}
          height={12}
          zIndex={50}
          left={0}
          width="100%"
          align="center"
          borderBottom="1px solid"
          borderBottomColor="gray.200"
          bg="white"
        >
          <Container px={8}>
            <Flex justify="space-between" width="100%">
              <HStack spacing={8}>
                <Navigation link="/">Home</Navigation>
                <Navigation link="/reading">Reading</Navigation>
                <Navigation link="/writing">Writing</Navigation>
              </HStack>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<Icon as={FiMenu} boxSize={4} />}
                  variant="outline"
                  size="sm"
                />
                <MenuList>
                  <MenuGroup title="NAVIGATION">
                    <VStack align="flex-start" px={4} spacing={3} mb={4}>
                      <Navigation link="/">Home</Navigation>
                      <Navigation link="/reading">Reading</Navigation>
                      <Navigation link="/writing">Writing</Navigation>
                      <Navigation link="/deep-dives">Deep Dives</Navigation>
                    </VStack>
                  </MenuGroup>
                  <MenuGroup title="FIND ME ON">
                    <VStack align="flex-start" px={4} spacing={3} mb={2}>
                      <Navigation
                        link="https://twitter.com/majmudaradam"
                        isExternal
                      >
                        Twitter
                      </Navigation>
                      <Navigation
                        link="https://substack.com/@adammaj"
                        isExternal
                      >
                        Substack
                      </Navigation>
                      <Navigation link="https://github.com/adam-maj" isExternal>
                        GitHub
                      </Navigation>
                    </VStack>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Flex>
          </Container>
        </Flex>
        {children}
      </Container>
    </Container>
  );
}

export default Layout;
