import { BrowserProvider, getDefaultProvider } from "ethers";
import RestApiService from "../api/rest-api-service";

export async function connectWallet() {
  let provider;
  if (window.ethereum === null) {
    provider = getDefaultProvider("maticMumbai");
  } else {
    provider = new BrowserProvider(window.ethereum);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      const nonce = await new RestApiService().getNonce(address);
      const message = `RetypeMe uses cryptographic signatures instead of passwords to verify that you are the owner of this address.

Wallet: ${address}

Nonce: ${nonce}`;
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, address],
      });

      await new RestApiService().sendLoginData(address, signature);
      return accounts[0];
    } catch (error) {
      console.error("Error connecting to MetaMask:", error.message);
    }
  }
}
