import { addNetwork } from "./add-network";
import { CHAIN_ID_AMOY } from "../constants/contract-constants";

export async function changeNetwork() {
  const networkId = await window.ethereum.request({ method: "eth_chainId" });
  if (networkId !== CHAIN_ID_AMOY) {
    const changeNetwork = window.confirm(
      "Please switch to the Amoy network for this transaction. Do you want to switch now?"
    );

    if (!changeNetwork) {
      console.log("Transaction canceled. Network not switched to Amoy.");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CHAIN_ID_AMOY }],
      });
    } catch (error) {
      console.error("Error switching network:", error.message);
      await addNetwork(error);
      return;
    }
  }
}
