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
  Icon,
  MenuGroup,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import Link from "next/link";
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
  const textColor = useColorModeValue(
    isActive ? "black" : "gray.500",
    isActive ? "white" : "gray.400"
  );
  const hoverColor = useColorModeValue("black", "white");

  return (
    <Link href={link} target={isExternal ? "_blank" : "_self"}>
      <Text fontSize="lg" color={textColor} _hover={{ color: hoverColor }}>
        {children}
      </Text>
    </Link>
  );
}

function ColorModeButton() {
  const { toggleColorMode } = useColorMode();
  const ColorIcon = useColorModeValue(IoMoonOutline, IoSunnyOutline);

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={<ColorIcon />}
      size="sm"
      variant="outline"
      onClick={toggleColorMode}
    />
  );
}

function Layout({ children }: PropsWithChildren) {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const menuColor = useColorModeValue("white", "black");

  return (
    <Container
      position="relative"
      mt={{ base: 16, md: 20 }}
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
            <Navigation link="/writing">Writing</Navigation>
            <Navigation link="/books">Books</Navigation>
          </VStack>
          <VStack align="flex-start">
            <Text fontWeight="bold" fontSize="smaller">
              FIND ME ON
            </Text>
            <Navigation link="https://twitter.com/majmudaradam" isExternal>
              Twitter
            </Navigation>
            <Navigation link="https://github.com/adam-maj" isExternal>
              GitHub
            </Navigation>
          </VStack>
          <VStack align="flex-start">
            <Text fontWeight="bold" fontSize="smaller">
              THEME
            </Text>
            <ColorModeButton />
          </VStack>
        </VStack>
      </Flex>
      <Container width={{ md: "container.md" }} position="relative">
        <Box
          width="100%"
          height={20}
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
          borderBottomColor={borderColor}
        >
          <Container px={8}>
            <Flex justify="space-between" width="100%">
              <HStack spacing={8}>
                <Navigation link="/">Home</Navigation>
                <Navigation link="/writing">Writing</Navigation>
                <Navigation link="/books">Books</Navigation>
              </HStack>
              <Flex gap={2}>
                <ColorModeButton />
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<Icon as={FiMenu} boxSize={4} />}
                    variant="outline"
                    size="sm"
                  />
                  <MenuList bg={menuColor}>
                    <MenuGroup title="NAVIGATION">
                      <VStack align="flex-start" px={4} spacing={3} mb={4}>
                        <Navigation link="/">Home</Navigation>
                        <Navigation link="/writing">Writing</Navigation>
                        <Navigation link="/books">Books</Navigation>
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
                          link="https://github.com/adam-maj"
                          isExternal
                        >
                          GitHub
                        </Navigation>
                      </VStack>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Container>
        </Flex>
        {children}
      </Container>
    </Container>
  );
}

export default Layout;
