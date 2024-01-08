export function shortWalletName(str: string) {
  const first5 = str.slice(0, 6);
  const last5 = str.slice(-4);
  return `${first5}...${last5}`;
}

export async function handleConnectWallet() {
  const { ethereum } = window;
  let walletAddress = "";

  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    walletAddress = accounts[0];
  } catch (err) {
    console.error(err);
  }
  return walletAddress;
}
