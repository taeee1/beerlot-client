import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { ErrorBoundary } from 'react-error-boundary'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { BottomNav } from '../src/components/shared/BottomNav'
import '../styles/globals.css'
import { theme } from '../styles/theme'
import ReactGA from 'react-ga4'

// TODO: move to env
const REACT_APP_GA_TRACKING_ID = 'G-TTNFK5BWQG'

const gaTrackingId = REACT_APP_GA_TRACKING_ID
ReactGA.initialize(gaTrackingId, {
  gtagOptions: {
    debug_mode: true,
  },
})
ReactGA.send({ hitType: 'pageview' })

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <ErrorBoundary fallback={<div>error</div>}>
            <Component {...pageProps} />
            <BottomNav />
          </ErrorBoundary>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
