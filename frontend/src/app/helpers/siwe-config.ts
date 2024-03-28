import { SiweMessage } from "siwe";
import { SIWEConfig } from "connectkit";

import ApiDomainService from "../api/api-domain-service";

const apiUrl = new ApiDomainService().getRestUrl();

export const siweConfig: SIWEConfig = {
  createMessage: ({ nonce, address, chainId }) => {
    const domain = window.location.host;
    const uri = window.location.origin;
    console.log("uri", uri);
    console.log("domain", domain);
    console.log("createMessage", nonce, address, chainId);
    const siweMessage = new SiweMessage({
      version: "1",
      domain,
      uri,
      address,
      chainId,
      nonce,
      // Human-readable ASCII assertion that the user will sign, and it must not contain `\n`.
      statement:
        "RetypeMe uses cryptographic signatures instead of passwords to verify that you are the owner of this address.",
    });
    console.log(siweMessage);
    return siweMessage.prepareMessage();
  },

  getNonce: async () => {
    return fetch(`${apiUrl}/nonce`, {
      credentials: "include",
    }).then((res) => res.text());
  },

  verifyMessage: async ({ message, signature }) => {
    return fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ message, signature }),
    }).then((res) => res.ok);
  },

  getSession: async () => {
    return fetch(`${apiUrl}/siwe/session`, {
      credentials: "include",
    }).then((res) => (res.ok ? res.json() : null));
  },

  signOut: async () => {
    return fetch(`${apiUrl}/logout`, {
      credentials: "include",
    }).then((res) => res.ok);
  },
};
