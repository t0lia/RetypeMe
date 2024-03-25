"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    // chains: [mainnet],
    chains: [polygonMumbai],
    transports: {
      // RPC URL for each chain
      //   [mainnet.id]: http(
      //     `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      //   ),
      [polygonMumbai.id]: http(
        `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_ENV_LOCAL_INFURA_API_KEY}`
      ),
    },

    // Required API Keys
    walletConnectProjectId:
      process.env.ENV_LOCAL_WALLETCONNECT_PROJECT_ID ?? "",

    // Required App Info
    appName: "RetypeMe",

    // Optional App Info
    appDescription:
      "Master blind typing skills, race against friends, and own your achievements as NFTs on RetypeMe. Elevate your typing experience with engaging competitions and a community-driven platform. Start your journey to faster, more accurate typing today!",
    appUrl: "https://retypeme.xyz", // your app's url
    appIcon: "https://retypeme.xyz/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
