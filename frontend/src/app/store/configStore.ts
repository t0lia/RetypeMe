import create from 'zustand'

interface ConfigState {
  config: Contract; // Define a more specific type based on your configuration
  setConfig: (config: any) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  config: {address: "", chains: [], abi: []},
  setConfig: (config) => set({config})
}));

interface Contract {
  address: string;
  chains: Chain[];
  abi: any[];
}

interface Chain {
  id: number;
  name: string;
  rpc: string;
}