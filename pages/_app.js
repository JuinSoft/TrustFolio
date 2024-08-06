import { ChakraProvider } from "@chakra-ui/react";
import { Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import theme from "../theme";

// Chains for connectors to support
const baseSepolia = {
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  rpcUrls: ['https://sepolia.base.org'],
  nativeCurrency: {
    name: 'Base',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: 'Base Sepolia Explorer',
      url: 'https://sepolia-explorer.base.org',
    },
  ],
};

const chains = [baseSepolia];

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl  = baseSepolia.rpcUrls[0]
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        rpc: { [baseSepolia.id]: rpcUrl },
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: "Nextjs-Chakra-ui & Wagmi",
        jsonRpcUrl: rpcUrl,
      },
    }),
  ];
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider autoConnect connectors={connectors}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;