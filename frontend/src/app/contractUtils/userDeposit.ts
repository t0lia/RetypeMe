import { gameContract, provider } from "../contracts/GameContract";
import { parseEther } from "ethers";

export async function userDeposit(sessionId: string) {
  try {
    const signer = await provider.getSigner();
    const connectedContract = gameContract.connect(signer);
    const amountInWei = parseEther("0.1");

    // Call the deposit function with sessionId and specify msg.value
    const depositTx = await connectedContract.deposit(sessionId, {
      value: amountInWei,
    });

    await depositTx.wait();
  } catch (error) {
    console.error(error);
  }
}
