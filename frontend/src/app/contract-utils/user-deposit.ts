import { gameContract, provider } from "../contracts/game-contract";
// import { parseEther, id } from "ethers";
// import { changeNetwork } from "../helpers/change-network";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { abi, contractAddress } from "../contracts/game-contract";
import { parseEther } from "viem";

export async function userDeposit() {
  // try {
  //   // await changeNetwork();
  //   const signer = await provider.getSigner();
  //   const connectedContract = gameContract.connect(signer);
  //   const amountInWei = parseEther("0.001");
  //   const sessionId = sessionStorage.getItem("sessionId");
  //   if (!sessionId) {
  //     console.error("Session ID not found.");
  //     return;
  //   }
  //   const hashSessionId = id(sessionId);
  //   const depositTx = await connectedContract.deposit("", {
  //     value: amountInWei,
  //   });
  //   const response = await depositTx.wait();
  //   return response;
  // } catch (error) {
  //   console.error(error);
  // }
  const { writeContract, data: hash } = useWriteContract();
  async function deposit() {
    writeContract({
      abi,
      address: contractAddress,
      functionName: "deposit",
      args: [],
      value: parseEther("0.001"),
    });
  }
  try {
    console.log("works");
    deposit();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash,
      });
    console.log("RECEIPT", isConfirming, isConfirmed, hash);
  } catch (error) {
    console.log(error);
  }
}
