import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.tsx'
import { config } from './config/wagmi'
import { DemoProvider } from './contexts/DemoContext' // Add this

import '@rainbow-me/rainbowkit/styles.css'
import './index.css'

const queryClient = new QueryClient()

const theme = extendTheme({
  colors: {
    brand: {
      50: '#ffe5e5',
      100: '#ffb3b3',
      200: '#ff8080',
      300: '#ff4d4d',
      400: '#ff1a1a',
      500: '#e60000',
      600: '#cc0000',
      700: '#b30000',
      800: '#990000',
      900: '#800000',
    },
  },
  fonts: {
    heading: 'system-ui, sans-serif',
    body: 'system-ui, sans-serif',
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ChakraProvider theme={theme}>
            <DemoProvider> {/* Add this wrapper */}
              <App />
            </DemoProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)