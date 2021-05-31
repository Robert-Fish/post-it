import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { Global, css } from "@emotion/react";
import Head from "next/head";

axios.defaults.headers.common["app-id"] = process.env.NEXT_PUBLIC_DUMMY_APP_ID;

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <title>Post It!</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
