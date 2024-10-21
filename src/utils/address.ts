import { withBrowserConnector } from "web3subscriber/src/client";
import { DelphinusBrowserConnector } from "web3subscriber/src/provider";


export function addressAbbreviation(address: string, tailLength: number) {
  return address.substring(0,8) + "..." + address.substring(address.length - tailLength, address.length);
}

export function hexAbbreviation(address: string, tailLength: number) {
  return address.substring(0,3) + "..." + address.substring(address.length - tailLength, address.length);
}

export async function signMessage(message: string) {
  const signature = await withBrowserConnector(async (provider: DelphinusBrowserConnector) => {
    if (!provider) {
      throw new Error("No provider found!");
    }
    const signature = provider.sign(message);
    return signature;
  });
  return signature;
}

export async function switchNetwork(chainId: number) {
  await withBrowserConnector(async (provider: DelphinusBrowserConnector) => {
    if (!provider) {
      throw new Error("No provider found!");
    }
    await provider.provider.send("wallet_switchEthereumChain", [
      { chainId: "0x" + chainId.toString(16) },
    ]);
  });
}


