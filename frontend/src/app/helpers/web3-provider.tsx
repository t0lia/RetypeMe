"use client";

import { WagmiProvider, createConfig, http } from "wagmi";

import * as all from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig, SIWEProvider } from "connectkit";
import { siweConfig } from "./siwe-config";
import { ChainConfig, useConfigStore } from "@/app/store/configStore";
import { Chain } from "wagmi/chains";
import { HttpTransport } from "viem";

const queryClient = new QueryClient();
const { ...chains } = all;

function getChain(chainId: number): Chain {
  const chain = Object.values(chains).find((chain) => chain.id === chainId);
  if (!chain) {
    throw new Error(`Chain with id ${chainId} not found`);
  }
  return chain;
}

const generateTransports = (chains: ChainConfig[]) => {
  return chains.reduce((acc, chain) => {
    acc[chain.id] = http(chain.rpc);
    return acc;
  }, {} as Record<number, HttpTransport>);
};

export const Web3Provider = ({
  children,
  walletConnectProjectId,
}: {
  children: React.ReactNode;
  walletConnectProjectId: string;
}) => {
  const { contractConfig } = useConfigStore();
  const supportedChains = contractConfig.chains.map((chain) => chain.id);

  const chains = supportedChains.map((chainId) => getChain(chainId));

  const transports = generateTransports(contractConfig.chains);
  const wagmiConfig = createConfig(
    getDefaultConfig({
      ssr: true,
      chains: [chains[0], ...chains.slice(1)],
      transports,
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
