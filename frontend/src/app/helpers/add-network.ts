// import { CHAIN_ID_AMOY } from "../constants/contract-constants";

// export async function addNetwork(error) {
//   if (error.code === 4902) {
//     const addNetwork = window.confirm(
//       "Amoy network is not added. Do you want to add it now?"
//     );

//     if (!addNetwork) {
//       console.log("Transaction canceled. Amoy network not added.");
//       return;
//     }

//     try {
//       await window.ethereum.request({
//         method: "wallet_addEthereumChain",
//         params: [
//           {
//             chainId: CHAIN_ID_AMOY,
//             chainName: "Amoy Testnet",
//             nativeCurrency: {
//               name: "Matic",
//               symbol: "MATIC",
//               decimals: 18,
//             },
//             rpcUrls: ["https://rpc-amoy.polygon.technology/"],
//             blockExplorerUrls: ["https://www.oklink.com/amoy/"],
//           },
//         ],
//       });
//       console.log("Amoy network added successfully.");
//     } catch (error) {
//       console.error("Error adding Amoy network:", error.message);
//       return;
//     }
//   }
// }
