// @flow

import {
  SetupCryptoCurrencies, SetupChart, SetupUser, SelectCryptoCurrency as StateUpdaterSelectCryptoCurrency,
} from 'stateUpdaters';

export const CryptoCurrencies = () => (dispatch: any, getState: function, manager: Object) => {
  manager.Request({
    url: `${manager.baseUrl}/crypto/list`,
    method: 'GET',
    token: manager.getToken(),
  })
    .then(response => {
      dispatch(SetupCryptoCurrencies(response));
    })
    .catch(error => {
      alert(error);
    });
};

export const SetFavoriteCurrencies = (cryptocurrencies: Array<string>) => async (dispatch: any, getState: function, manager: Object) => {
  const user = await manager.Request({
    url: `${manager.baseUrl}/crypto/set-favourite`,
    method: 'POST',
    body: {
      cryptocurrencies,
    },
    token: manager.getToken(),
  });

  dispatch(SetupUser({
    email: user.email,
    admin: user.isAdmin,
    cryptoPrices: user.favouriteCrypto.map(favourite => ({
      id: favourite,
    })),
  }));
};

export const SelectCryptoPrice = (cryptoId: string, idPrice: string) => async (dispatch: any, getState: function, manager: Object) => {
  if (getState().user && getState().user.chart && cryptoId === getState().user.chart.cryptoCurrency) {
    return;
  }
  dispatch(StateUpdaterSelectCryptoCurrency(cryptoId));

  const history = await manager.Request({
    url: `${manager.baseUrl}/crypto/prices?crypto=${cryptoId}&id=${idPrice}`,
    method: 'GET',
    token: manager.getToken(),
  });

  dispatch(SetupChart(history));
};

export const AdjustCrypto = (cryptoId: string, factor: number) => async (dispatch: any, getState: function, manager: Object) => manager.Request({
  url: `${manager.baseUrl}/admin/adjust-crypto`,
  method: 'POST',
  body: {
    crypto: cryptoId,
    factor,
  },
  token: manager.getToken(),
});

export const CryptoUsage = () => (dispatch: any, getState: function, manager: Object) => manager.Request({
  url: `${manager.baseUrl}/admin/crypto-usage`,
  method: 'GET',
  token: manager.getToken(),
});

export const DeleteCrypto = (cryptoId: string) => async (dispatch: any, getState: function, manager: Object) => manager.Request({
  url: `${manager.baseUrl}/admin/delete-crypto`,
  method: 'DELETE',
  body: {
    crypto: cryptoId,
  },
  token: manager.getToken(),
});
