export function shortWalletName(str: string) {
  if (str === undefined) return "not connected";
  const first5 = str.slice(0, 6);
  const last5 = str.slice(-4);
  return `${first5}...${last5}`;
}
