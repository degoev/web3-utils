const authTokensStorageKey = `authTokensStorage`;

export const authTokensManager = {
  _getStorage() {
    return readJson(localStorage[authTokensStorageKey], {});
  },

  _setAccountStorage(address, accountStorage) {
    const storage = this._getStorage() || {};

    storage[address] = accountStorage;

    localStorage.setItem(authTokensStorageKey, JSON.stringify(storage));
  },

  _getAccountStorage(address) {
    const accountStorage = this._getStorage()[address] || {};

    return {
      jwt: accountStorage.jwt,
    };
  },

  _setToken(address, tokenKey, token) {
    const accountStorage = this._getAccountStorage(address.toLowerCase());

    accountStorage[tokenKey] = token;

    this._setAccountStorage(address.toLowerCase(), accountStorage);
  },

  _getToken(address, tokenKey) {
    return this._getAccountStorage(address.toLowerCase())[tokenKey];
  },

  getJwt(address) {
    if (!address) {
      address = this.getCurrentAccount();
    }
    return this._getToken(address, `jwt`);
  },

  getCurrentAccount() {
    return localStorage.getItem(`currentWeb3Account`);
  },

  setJwt(address, jwt) {
    if (!address) {
      address = this.getCurrentAccount();
    }
    return this._setToken(address, `jwt`, jwt);
  },

  setCurrentAccount(address) {
    localStorage.setItem(`currentWeb3Account`, address.toLowerCase());
  },

  clearCurrentAccount() {
    localStorage.removeItem(`currentWeb3Account`);
  },

  removeJwt(address) {
    if (!address) {
      address = this.getCurrentAccount();
    }
    console.log(`removeJwt`);
    return this._setToken(address, `jwt`, null);
  },
};

const localStorage =
  typeof window === `undefined`
    ? { setItem: () => {}, getItem: () => {} }
    : window.localStorage;

const readJson = (json, defaultValue = null) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return defaultValue;
  }
};
