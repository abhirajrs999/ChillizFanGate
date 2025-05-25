import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// Define Chiliz Spicy Testnet
const chilizSpicy = {
  id: 88882,
  name: 'Chiliz Spicy Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'CHZ',
    symbol: 'CHZ',
  },
  rpcUrls: {
    default: {
      http: ['https://spicy-rpc.chiliz.com/'],
    },
    public: {
      http: ['https://spicy-rpc.chiliz.com/'],
    },
  },
  blockExplorers: {
    default: { name: 'ChilizScan', url: 'https://testnet.chiliscan.com' },
  },
  testnet: true,
} as const;

export const config = getDefaultConfig({
  appName: 'ChilizFanGate',
  projectId: '4d8f6d810c64e424803d921a4e3d76f2', // Get from https://cloud.walletconnect.com
  chains: [chilizSpicy],
  ssr: false,
});