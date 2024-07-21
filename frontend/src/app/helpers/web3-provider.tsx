"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, SIWEProvider } from "connectkit";
import { siweConfig } from "./siwe-config";
import { useConfigStore } from "@/app/store/configStore";
import { useEffect, useState } from "react";
import { constructWagmiConfig } from "./wagmi-contract-builder";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

export const Web3Provider = ({
  children,
  walletConnectProjectId,
}: {
  children: React.ReactNode;
  walletConnectProjectId: string;
}) => {
  const [wagmiConfig, setStateWagmiConfig] = useState(null);

  const { fetchContractConfig, setWagmiConfig } = useConfigStore();

  useEffect(() => {
    fetchContractConfig()
      .then((contractConfig) => {
        let wagmiCfg = constructWagmiConfig(
          walletConnectProjectId,
          contractConfig
        );
        setStateWagmiConfig(wagmiCfg);
        setWagmiConfig(wagmiCfg);
      })
      .catch((error) => console.error("Failed to load configuration", error));
  }, [walletConnectProjectId]);

  return (
    <div>
      {!wagmiConfig ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <SIWEProvider {...siweConfig}>
              <ConnectKitProvider>{children}</ConnectKitProvider>
            </SIWEProvider>
          </QueryClientProvider>
        </WagmiProvider>
      )}
    </div>
  );
};
