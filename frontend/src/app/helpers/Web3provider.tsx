"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig, SIWEProvider } from "connectkit";
import { siweConfig } from "./siwe-config";

const queryClient = new QueryClient();

const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: [polygonMumbai],
    transports: {
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
    appUrl: "https://retypeme.xyz",
    appIcon: "https://retypeme.xyz/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <SIWEProvider {...siweConfig}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </SIWEProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
