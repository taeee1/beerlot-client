import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, useToast, UseToastOptions } from "@chakra-ui/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { theme } from "../theme";
import { Suspense, useState } from "react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  const toast = useToast();
  const handleToast = (options: UseToastOptions) => {
    const defaultOptions: UseToastOptions = {
      status: "info",
      duration: 5000,
      isClosable: true,
    };

    toast({
      ...defaultOptions,
      ...options,
    });
  };
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {},
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Suspense fallback={<div>loading...</div>}>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </Suspense>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
