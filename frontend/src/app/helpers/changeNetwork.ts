import { addNetwork } from "./addNetwork";

export async function changeNetwork() {
  const networkId = await window.ethereum.request({ method: "eth_chainId" });
  // 0x13881 is Mumbai 80001
  if (networkId !== "0x13881") {
    const changeNetwork = window.confirm(
      "Please switch to the Mumbai network for this transaction. Do you want to switch now?"
    );
    if (changeNetwork) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        });
      } catch (error) {
        console.error("Error switching network:", error.message);
        await addNetwork(error);
        return;
      }
    } else {
      console.log("Transaction canceled. Network not switched to Mumbai.");
      return;
    }
  }
}
