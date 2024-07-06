import { createConfig, http } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { ChainConfig, ContractConfig } from "@/app/store/configStore";
import * as all from "viem/chains";
import { Chain } from "wagmi/chains";
import { HttpTransport } from "viem";

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

export function constructWagmiConfig(walletConnectProjectId: string, contractConfig: ContractConfig) {
  const supportedChains = contractConfig.chains.map((chain: any) => chain.id);
  const chains = supportedChains.map((chainId: any) => getChain(chainId));
  const transports = generateTransports(contractConfig.chains);

  const config = createConfig(
    getDefaultConfig({
      ssr: true,
      chains: [chains[0], ...chains.slice(1)],
      transports,
      walletConnectProjectId,
      appName: "RetypeMe",
      appDescription:
        "Master blind typing skills, race against friends, and own your achievements as NFTs on RetypeMe. Elevate your typing experience with engaging competitions and a community-driven platform. Start your journey to faster, more accurate typing today!",
      appUrl: "https://retypeme.xyz",
      appIcon: "/favicon.ico",
    })
  );

  return config;
}
