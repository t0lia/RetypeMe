import { gameContract, provider } from "../contracts/game-contract";
import { id } from "ethers";
import { changeNetwork } from "../helpers/change-network";

export async function withdrawWinnings() {
  try {
    await changeNetwork();

    const signer = await provider.getSigner();
    const connectedContract = gameContract.connect(signer);
    const sessionId = sessionStorage.getItem("sessionId");

    if (!sessionId) {
      console.error("Session ID not found.");
      return;
    }
    const hashSessionId = id(sessionId);

    const withdrawWinnings = await connectedContract.withdrawWinnings(
      hashSessionId
    );

    const response = await withdrawWinnings.wait();
    return response;
  } catch (error) {
    console.error(error);
  }
}
