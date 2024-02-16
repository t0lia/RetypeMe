import { CHAIN_ID_MUMBAI } from "../constants/contract-constants";

export async function addNetwork(error) {
  if (error.code === 4902) {
    const addNetwork = window.confirm(
      "Mumbai network is not added. Do you want to add it now?"
    );
    if (addNetwork) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: CHAIN_ID_MUMBAI,
              chainName: "Mumbai Testnet",
              nativeCurrency: {
                name: "Matic",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            },
          ],
        });
        console.log("Mumbai network added successfully.");
      } catch (error) {
        console.error("Error adding Mumbai network:", error.message);
        return;
      }
    } else {
      console.log("Transaction canceled. Mumbai network not added.");
      return;
    }
  }
}
