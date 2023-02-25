import {Box, ChakraProvider, useToast, UseToastOptions} from "@chakra-ui/react";
import type {AppProps} from "next/app";
import {useState} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {Hydrate, QueryClient, QueryClientProvider} from "react-query";
import {RecoilRoot} from "recoil";
import {BottomNav} from "../src/shared/BottomNav";
import "../styles/globals.css";
import {theme} from "../styles/theme";

function MyApp({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <ChakraProvider theme={theme}>
            <ErrorBoundary fallback={<div>error</div>}>
              <Component {...pageProps} />
              <BottomNav />
            </ErrorBoundary>
          </ChakraProvider>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
