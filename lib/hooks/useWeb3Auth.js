import { useCallback, useEffect } from "react";

import { constants } from "ethers";
const { AddressZero } = constants;

import utils from "@rogwild/next-utils";
const { createNotification } = utils.components.SpringNotification;

import { setupNetwork } from "../wallet-actions.js";
import connectorsByName, { connectorLocalStorageKey } from "../connectors";

import { supportedChains } from "../configs/networks.js";
import { actions, selectors } from "../redux/slices/web3.js";

const useWeb3Auth = ({
  useDispatch,
  useSelector,
  useWeb3React,
  autoSetupNetwork = true,
}) => {
  const dispatch = useDispatch();
  const reduxChainId = useSelector(selectors.selectChainId);
  const showWeb3Login = useSelector(selectors.selectShowWeb3Login);
  const {
    chainId,
    activate,
    deactivate,
    account = AddressZero,
    library: provider,
  } = useWeb3React();

  const logout = useCallback(() => {
    console.log(`web3 logout`);
    deactivate();

    localStorage.removeItem(connectorLocalStorageKey);

    // This localStorage key is set by @web3-react/walletconnect-connector
    if (localStorage.walletConnect || localStorage.walletconnect) {
      connectorsByName.walletConnect.close();
      connectorsByName.walletConnect.walletConnectProvider = null;
    }
  }, [provider]);

  const login = useCallback(
    async (connectorId, connectorUid) => {
      const connector = connectorsByName[connectorId];
      connector.connectorUid = connectorUid;

      if (connector) {
        window.localStorage.setItem(connectorLocalStorageKey, connectorId);
        window.localStorage.setItem(`connectorUid`, connectorUid);
        console.log(`web3 login`);

        return new Promise((resolve, reject) => {
          activate(connector, async (error) => {
            console.log(`activate`, error);
            if (
              connectorUid === `metamask` &&
              error?.message ===
                `Already processing eth_requestAccounts. Please wait.`
            ) {
              createNotification({
                title: `Please open your MetaMask and follow the instructions`,
                event: `warning`,
              });
              return;
            }

            console.log({
              error: error,
              reduxChainId,
              provider,
              connectorUid,
              connector,
            });

            if (error.name === `UnsupportedChainIdError`) {
              const provider =
                connectorUid === `metamask`
                  ? window.ethereum
                  : connector.walletConnectProvider;

              await setupNetwork(provider, reduxChainId);
              activate(connector, (err) => console.log(`activate 2`, err));

              return;
            } else {
              window.localStorage.removeItem(connectorLocalStorageKey);
              if (error.name === `NoEthereumProviderError`) {
                createNotification({
                  title: `Provider Error, no provider was found`,
                  event: `error`,
                });

                reject(error);
              } else if (
                error.name === `UserRejectedRequestErrorInjected` ||
                error.name === `UserRejectedRequestErrorWalletConnect`
              ) {
                if (connectorUid !== `metamask`) {
                  const walletConnector = connector;
                  walletConnector.walletConnectProvider = null;
                }

                createNotification({
                  title: error?.message,
                  event: `error`,
                });

                reject(error);

                return;
              }
            }

            createNotification({
              title: error?.message,
              event: `error`,
            });
            logout();
            reject(error);
          }).then(resolve);
        });
      }

      createNotification({
        title: `Unable to find connector, the connector config is wrong`,
        event: `error`,
      });

      throw new Error(
        `Unable to find connector, the connector config is wrong`
      );
    },
    [activate]
  );

  const setupProviderNetwork = (chainId) => {
    const connectorId = localStorage[connectorLocalStorageKey];
    const connectorUid = localStorage.connectorUid;

    const connector = connectorsByName[connectorId];
    const provider =
      connectorUid === `metamask`
        ? window.ethereum
        : connector.walletConnectProvider;

    setupNetwork(provider, chainId);
  };

  useEffect(() => {
    console.log("useWeb3Auth setupNetwork", {
      provider,
      reduxChainId,
      chainId,
    });
    if (!autoSetupNetwork) return;
    if (chainId == reduxChainId || !provider) return;
    if (supportedChains.includes(chainId)) {
      dispatch(actions.setupNetwork(chainId));
    }
  }, [chainId, reduxChainId, provider]);

  useEffect(() => {
    const connectorKey = localStorage.getItem(connectorLocalStorageKey);
    const connectorUid = localStorage.getItem(`connectorUid`);

    if (connectorKey && connectorUid) {
      login(connectorKey, connectorUid).catch((err) =>
        console.error(`login`, err)
      );
    }
  }, []);

  return {
    login,
    logout,
    account: account.toLowerCase(),
    provider,
    chainId,
    showWeb3Login,
    setShowWeb3Login: (show) => dispatch(actions.setShowWeb3Login(show)),
    setupProviderNetwork: (chainId) => {},
  };
};

export default useWeb3Auth;
