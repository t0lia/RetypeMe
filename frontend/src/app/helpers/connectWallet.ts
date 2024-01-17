import { BrowserProvider, getDefaultProvider } from "ethers";

// declare global {
//   interface Window {
//     ethereum?: ethers.providers.ExternalProvider;
//   }
// }

export async function connectWallet() {
  let provider;
  if (window.ethereum == null) {
    provider = getDefaultProvider("maticMumbai");
  } else {
    provider = new BrowserProvider(window.ethereum);
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("Connected account:", accounts[0]);
      return accounts[0];
    } catch (error) {
      console.error("Error connecting to MetaMask:", error.message);
    }
  }
}
