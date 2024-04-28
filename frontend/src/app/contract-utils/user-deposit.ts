// import {
//   useAccount,
//   useWaitForTransactionReceipt,
//   useWriteContract,
// } from "wagmi";
// import { abi, contractAddress } from "../contracts/game-contract";
// import { parseEther } from "viem";
// import RestApiService from "../api/rest-api-service";
// import { RaceStatistic } from "../api/ws-api-service";
// import { useModal } from "connectkit";

// export async function userDeposit(sessionStat: RaceStatistic) {
//   const { writeContract, data: hash } = useWriteContract();
//   async function deposit() {
//     writeContract({
//       abi,
//       address: contractAddress,
//       functionName: "deposit",
//       args: [],
//       value: parseEther("0.001"),
//     });
//   }
//   try {
//     deposit();
//     const { isLoading: isConfirming, isSuccess: isConfirmed } =
//       useWaitForTransactionReceipt({
//         hash,
//       });
//     console.log(
//       "RECEIPT:",
//       "loading:",
//       isConfirming,
//       "confirmed:",
//       isConfirmed,
//       "hash:",
//       hash
//     );
//     return isConfirmed;
//   } catch (error) {
//     console.log(error);
//   }
// }
