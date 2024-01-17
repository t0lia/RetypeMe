import { gameContract, provider } from "../contracts/GameContract";
import { parseEther, id } from "ethers";
import { changeNetwork } from "../helpers/changeNetwork";

export async function userDeposit() {
  try {
    await changeNetwork();

    const signer = await provider.getSigner();
    const connectedContract = gameContract.connect(signer);
    const amountInWei = parseEther("0.1");
    const sessionId = sessionStorage.getItem("sessionId");

    if (!sessionId) {
      console.error("Session ID not found.");
      return;
    }
    const hashSessionId = id(sessionId);

    const depositTx = await connectedContract.deposit(hashSessionId, {
      value: amountInWei,
    });

    const response = await depositTx.wait();
    return response;
  } catch (error) {
    console.error(error);
  }
}
