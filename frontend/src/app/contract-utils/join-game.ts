// import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
// import { abi, contractAddress } from "../contracts/game-contract";
// import { parseEther, keccak256, toBytes } from "viem";

// export async function joinGame() {
//   //   const { writeContract, data: hash } = useWriteContract();
//   const sessionId = sessionStorage.getItem("sessionId");
//   const hashSessionId = keccak256(toBytes(sessionId as string));
//   console.log(
//     "VIEM:",
//     keccak256(toBytes(sessionId as string)),
//     "SessionID",
//     sessionId
//   );
//   //   async function join() {
//   writeContract({
//     abi,
//     address: contractAddress,
//     functionName: "joinGame",
//     args: [hashSessionId],
//     value: parseEther("0.001"),
//   });
//   const { isLoading: isConfirming, isSuccess: isConfirmed } =
//     useWaitForTransactionReceipt({
//       //   hash,
//     });

//   console.log(
//     "RECEIPT:",
//     "loading:",
//     isConfirming,
//     "confirmed:",
//     isConfirmed,
//     "hash:"
//     // hash
//   );
//   return isConfirmed;
// }
// //   try {
// //     join();
// //     const { isLoading: isConfirming, isSuccess: isConfirmed } =
// //       useWaitForTransactionReceipt({
// //         hash,
// //       });

// //     console.log(
// //       "RECEIPT:",
// //       "loading:",
// //       isConfirming,
// //       "confirmed:",
// //       isConfirmed,
// //       "hash:",
// //       hash
// //     );
// //     return isConfirmed;
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }
