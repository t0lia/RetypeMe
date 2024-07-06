import {create} from "zustand";
import ApiDomainService from "@/app/api/api-domain-service";

export interface ConfigState {
  contractConfig: ContractConfig; // Define a more specific type based on your configuration
  setConractConfig: (config: any) => void;
  fetchContractConfig: () => Promise<ContractConfig>;
  wagmiConfig: any;
  setWagmiConfig: (config: any) => void;
}

export interface ContractConfig {
  chains: ChainConfig[];
  abi: any[];
}

export interface ChainConfig {
  id: number;
  name: string;
  rpc: string;
  contract: string;
}


const abi: any[] = [];

const chains: ChainConfig[] = [];

export const useConfigStore = create<ConfigState>((set) => ({
  contractConfig: {chains, abi},
  wagmiConfig: {},
  setConractConfig: (contractConfig) => set({contractConfig}),
  setWagmiConfig: (wagmiConfig) => set({wagmiConfig}),
  fetchContractConfig: async () => {
    const apiUrl = new ApiDomainService().getRestUrl();
    return fetch(`${apiUrl}/contract/config`)
      .then((response) => response.json())
      .then((data) => {
        set({contractConfig: data});
        return data;
      });
  }
}));
