import { providers } from "ethers";
import { hexValue, hexlify, toUtf8Bytes } from "ethers/lib/utils";

import { pureConfigs } from "./configs/networks.js";
/**
 * @param {providers.Web3Provider} provider
 * @param {number} chainId
 * @returns
 */
export const setupNetwork = (
  provider,
  chainId,
  createNotification = (props) => console.error(props)
) => {
  try {
    const hexChainId = hexValue(chainId);

    console.log(`wallet_switchEthereumChain`, hexChainId);
    // check if the chain to connect to is installed
    return provider
      .request({
        method: `wallet_switchEthereumChain`,
        params: [{ chainId: hexChainId }], // chainId must be in hexadecimal numbers
      })
      .catch((err) => {
        console.log(`wallet_switchEthereumChain catch 1`, err);
        return provider
          .request({
            method: `wallet_addEthereumChain`,
            params: [pureConfigs[chainId]],
          })
          .catch((addError) => {
            console.error(`wallet_addEthereumChain catch 1`, addError);
          });
      });
  } catch (error) {
    createNotification({
      title: `Failed to setup the network in Metamask:`,
      message: error.message,
      event: `error`,
    });

    console.error(`Failed to setup the network in Metamask:`, error);
    return false;
  }
};

/**
 *
 * @param {providers.Web3Provider} provider
 * @param {string} tokenAddress
 * @param {string} tokenSymbol
 * @param {number} tokenDecimals
 */
export const registerToken = async (
  provider,
  tokenAddress,
  tokenSymbol,
  tokenDecimals
) => {
  const tokenAdded = await provider.request({
    method: `wallet_watchAsset`,
    params: {
      type: `ERC20`,
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
      },
    },
  });

  return tokenAdded;
};

export const signMessage = ({ account, message, provider }) => {
  const signer = provider.getSigner(account);
  const hexMessage = hexlify(toUtf8Bytes(message));
  return signer.signMessage(message);
};

const isMobile =
  typeof window === `undefined` ? false : window.innerWidth < 470;

export const signTypedMessage = async ({
  provider,
  account,
  expires,
  signatureElements,
}) => {
  const { domain, types, message } = signatureElements;
  message.expires = expires;
  message.account = account.toLowerCase();

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const signTypedMessage = () =>
      provider.send(`eth_signTypedData`, [
        account.toLowerCase(),
        JSON.stringify(signatureElements),
      ]);

    const signature = isMobile
      ? Promise.race([signTypedMessage(), signTypedMessage()])
      : signTypedMessage();

    return signature;
  }
  delete types.EIP712Domain;
  return provider.getSigner(account)._signTypedData(domain, types, message);
};
const exampleSignatureElements = (chainId) => ({
  types: {
    EIP712Domain: [
      {
        name: `name`,
        type: `string`,
      },
      {
        name: `version`,
        type: `string`,
      },
      {
        name: `chainId`,
        type: `uint256`,
      },
    ],
    LoginToken: [
      { name: `account`, type: `address` },
      { name: `expires`, type: `uint256` },
    ],
  },
  primaryType: `LoginToken`,
  domain: {
    name: `dubaipad.ae`,
    version: `1`,
    chainId,
  },
  message: {
    account: `0x0000000000000000000000000000000000000000`,
    expires: 0,
  },
});
