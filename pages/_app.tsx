import type { AppProps } from "next/app";
import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { AuthProvider } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    styles: {
      global: (props: any) => ({
        body: {
          color: mode("gray.700", "whiteAlpha.900")(props),
        },
      }),
    },
  });

  return (
    <>
      <Head>
        <title>racketfy</title>
        <meta
          name="description"
          content="Easily create and manage tournaments!"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Navbar />
          <Container
            minH="calc(100vh - 3.5rem)"
            maxW="container.sm"
            px={[2, 2, 2, 0]}
            py={2}
          >
            <Component {...pageProps} />
          </Container>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
