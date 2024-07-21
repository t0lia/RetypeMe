import { create } from "zustand";
import ApiDomainService from "@/app/api/api-domain-service";
import { Abi } from "viem";

export interface ConfigState {
  contractConfig: ContractConfig;
  setConractConfig: (config: ContractConfig) => void;
  fetchContractConfig: () => Promise<ContractConfig>;
  wagmiConfig: any;
  setWagmiConfig: (config: any) => void;
}

0;
export interface ContractConfig {
  chains: ChainConfig[];
  abi: Abi[];
}

export interface ChainConfig {
  id: number;
  name: string;
  rpc: string;
  contract: string;
}

const abi: Abi[] = [];

const chains: ChainConfig[] = [];

export const useConfigStore = create<ConfigState>((set) => ({
  contractConfig: { chains, abi },
  wagmiConfig: {},
  setConractConfig: (contractConfig) => set({ contractConfig }),
  setWagmiConfig: (wagmiConfig) => set({ wagmiConfig }),
  fetchContractConfig: async () => {
    const apiUrl = new ApiDomainService().getRestUrl();
    return fetch(`${apiUrl}/contract/config`)
      .then((response) => response.json())
      .then((data) => {
        set({ contractConfig: data });
        return data;
      });
  },
}));
