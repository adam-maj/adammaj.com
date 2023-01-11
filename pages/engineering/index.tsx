import {
  Heading,
  Stack,
  Flex,
  Text,
  Divider,
  HStack,
  Image,
} from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Build, getAllBuildData } from "../../lib/engineering";
import { NextSeo } from "next-seo";

interface EngineeringProps {
  builds: Build[];
}

const Engineering: NextPageWithLayout<EngineeringProps> = ({ builds }) => {
  return (
    <>
      <NextSeo title="Engineering | Adam Majmudar" />
      <Flex direction="column" align="flex-start">
        {builds.map((build) => (
          <Stack width="100%" key={build.title}>
            <Link href={build.url} target={build.external ? "_blank" : "_self"}>
              <Stack mb={4} width="100%">
                <Divider margin="8px 0 !important" width="100%" />
                <HStack gap={5} display="grid" gridTemplateColumns={"2fr 5fr"}>
                  <Image
                    src={build.image}
                    alt={build.title}
                    gridColumn={"span 1"}
                    objectFit="cover"
                  />

                  <Stack gridColumnStart={1} gridColumn="span 1">
                    <Heading
                      as="h2"
                      size="md"
                      marginTop="8px !important"
                      mb="0px !important"
                    >
                      {build.title}
                    </Heading>
                    <Text my={0}>{build.description}</Text>
                    <Text color="gray.500" mt={0}>
                      {build.date}
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
            </Link>
          </Stack>
        ))}
      </Flex>
    </>
  );
};

export default Engineering;

Engineering.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  const builds = getAllBuildData();
  return { props: { builds } };
}
