"use client";

import {WagmiProvider, createConfig, http} from "wagmi";
import {polygonMumbai} from "wagmi/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConnectKitProvider, getDefaultConfig, SIWEConfig, SIWEProvider} from "connectkit";
import {SiweMessage} from "siwe";
import ApiDomainService from "@/app/api/api-domain-service";

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



const siweConfig: SIWEConfig = {


  createMessage: ({nonce, address, chainId}) => {

    const domain = window.location.host;
    const uri = window.location.origin;
    console.log('uri', uri);
    console.log('domain', domain);
    console.log('createMessage', nonce, address, chainId);
    const siweMessage = new SiweMessage({
      version: '1',
      domain,
      uri,
      address,
      chainId,
      nonce,
      // Human-readable ASCII assertion that the user will sign, and it must not contain `\n`.
      statement: 'Sign in With Ethereum.',
    });
    console.log(siweMessage);
    return siweMessage.prepareMessage();
  },

  getNonce: async () => {
    const apiUrl = new ApiDomainService().getRestUrl();
    return fetch(`${apiUrl}/nonce`, {
      credentials: 'include',
    }).then((res) => res.text());
  },

  verifyMessage: async ({message, signature}) => {
    const apiUrl = new ApiDomainService().getRestUrl();
    return fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({message, signature}),
    }).then((res) => res.ok);
  },

  getSession: async () => {
    const apiUrl = new ApiDomainService().getRestUrl();
    return fetch(`${apiUrl}/siwe/session`, {
      credentials: 'include',
    }).then((res) => res.ok ? res.json() : null);
  },

  signOut: async () => {
    const apiUrl = new ApiDomainService().getRestUrl();
    return fetch(`${apiUrl}/logout`, {
      credentials: 'include',
    }).then((res) => res.ok);
  },


};

export const Web3Provider = ({children}: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SIWEProvider {...siweConfig}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </SIWEProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
