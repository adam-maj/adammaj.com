import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Prose, withProse } from "@nikolovlazar/chakra-ui-prose";
import Layout from "../components/Layout";
import { ReactElement, useEffect } from "react";
import { DefaultSeo } from "next-seo";
import posthog from "posthog-js";
import { usePostHog } from "next-use-posthog";

const theme = extendTheme(
  {
    fonts: {
      heading: `"Lora", serif`,
      body: `"Lora", sans-serif`,
    },
  },
  withProse({
    baseStyle: {
      "h1, h2, h3, h4, h5, h6": {
        mt: 4,
        mb: 4,
      },
      p: {
        my: 3,
      },
      a: {
        color: "blue.500",
      },
    },
  })
);

const getDefaultLayout = (page: ReactElement) => (
  <Layout>
    <Prose>{page}</Prose>
  </Layout>
);

export default function App({ Component, pageProps }: AppProps) {
  usePostHog("phc_jFlJqpi333LZJJRxwjiFTkKI2Ufv3Pgf0hnbrPuZdLL", {
    api_host: "https://a.thirdweb.com",
  });

  const getLayout = Component.getLayout || getDefaultLayout;

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo
        title="Adam Majmudar"
        description="I'm a constant learner and aspiring technical generalist. I'm also a founding enginer at thirdweb and on gap year from the University of Pennsylvania."
        openGraph={{
          title: "Adam Majmudar",
          description:
            "I'm a constant learner and aspiring technical generalist. I'm also a founding enginer at thirdweb and on gap year from the University of Pennsylvania.",
          images: [
            {
              url: "https://adammaj.com/og-image-dark.jpg",
              type: "image/jpeg",
            },
          ],
          siteName: "Adam Majmudar",
        }}
      />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}
