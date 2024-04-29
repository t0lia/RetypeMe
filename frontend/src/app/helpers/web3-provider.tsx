"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { polygonAmoy, blastSepolia, scrollSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig, SIWEProvider } from "connectkit";
import { siweConfig } from "./siwe-config";

const queryClient = new QueryClient();

export const Web3Provider = ({
  children,
  walletConnectProjectId,
}: {
  children: React.ReactNode;
  walletConnectProjectId: string;
}) => {
  const wagmiConfig = createConfig(
    getDefaultConfig({
      ssr: true,
      chains: [scrollSepolia, polygonAmoy, blastSepolia],
      transports: {
        // [scrollSepolia.id]: http("https://sepolia-rpc.scroll.io/"), // OFFICIAL PUBLIC RPC
        // [scrollSepolia.id]: http("https://scroll-sepolia.public.blastapi.io"), // PUBLIC RPC FROM BLASTAPI
        [scrollSepolia.id]: http(
          // `https://rpc.ankr.com/scroll_sepolia_testnet/${process.env.NEXT_PUBLIC_ENV_LOCAL_SCROLL_SEPOLIA_API_KEY_ANKR}` // FREE RPC FROM ANKR
          `https://rpc.ankr.com/scroll_sepolia_testnet/${process.env.NEXT_PUBLIC_ENV_LOCAL_SCROLL_SEPOLIA_API_KEY_CHAINSTACK}` // FREE RPC FROM CHAINSTACK
        ),
        [polygonAmoy.id]: http(
          `https://polygon-amoy.infura.io/v3/${process.env.NEXT_PUBLIC_ENV_LOCAL_INFURA_AMOY_API_KEY}`
        ),
        [blastSepolia.id]: http(
          `https://blast-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_ENV_LOCAL_INFURA_AMOY_API_KEY}`
        ),
      },

      // Required API Keys
      walletConnectProjectId: walletConnectProjectId,

      // Required App Info
      appName: "RetypeMe",

      // Optional App Info
      appDescription:
        "Master blind typing skills, race against friends, and own your achievements as NFTs on RetypeMe. Elevate your typing experience with engaging competitions and a community-driven platform. Start your journey to faster, more accurate typing today!",
      appUrl: "https://retypeme.xyz",
      appIcon: "/favicon.ico", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    })
  );

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
