import { NextPageWithLayout } from "next";
import Layout from "../components/Layout";
import { DeepDive, getDeepDives } from "../lib/writing";
import { NextSeo } from "next-seo";
import { Divider, Image, VStack, Text, HStack, Link } from "@chakra-ui/react";

interface PageProps {
  data: DeepDive[];
}

const Page: NextPageWithLayout<PageProps> = ({ data }) => {
  return (
    <>
      <NextSeo title="Deep Dives | Adam Majmudar" />
      <VStack width="100%" spacing={4}>
        <Divider width="100%" />
        {data.map((dive) => (
          <>
            <VStack width="100%" align="flex-start" spacing={1}>
              {/* <Image width="100%" src={dive.image} alt={dive.title} /> */}
              <Text fontWeight="bold">{dive.title}</Text>
              <Text fontSize="sm" color="gray.600" pb={4}>
                {dive.description}
              </Text>
              <HStack fontSize="sm" color="blue.600" spacing={6}>
                {dive.links.map((link, i) => (
                  <Link key={i} href={link.href} target="_blank">
                    {link.label}
                  </Link>
                ))}
              </HStack>
            </VStack>
            <Divider width="100%" />
          </>
        ))}
      </VStack>
    </>
  );
};

Page.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  const data = getDeepDives();
  return { props: { data } };
}

export default Page;
