// @flow

import type { Action, State } from 'type';

export const SetupCryptoCurrencies = (cryptoCurrencies: Array<string>): Action => ({
  type: 'SetupCryptoCurrencies',
  updateState: (state: State) => ({
    ...state,
    cryptoCurrencies,
  }),
});

export const SelectCryptoCurrency = (currencyId: string): Action => ({
  type: 'SelectCryptoCurrency',
  updateState: (state: State) => {
    if (!state.user) {
      return state;
    }

    return {
      ...state,
      user: {
        ...state.user,
        chart: {
          cryptoCurrency: currencyId,
          prices: [],
        },
      },
    };
  },
});

export const SetupChart = (prices: Array<number>): Action => ({
  type: 'SetupChart',
  updateState: (state: State) => {
    if (!state.user || !state.user.chart) {
      return state;
    }

    const pricesAndOld = [...prices, ...state.user.chart.prices];

    return {
      ...state,
      user: {
        ...state.user,
        chart: {
          ...state.user.chart,
          prices: pricesAndOld.slice(Math.max(prices.length - 50, 1)),
        },
      },
    };
  },
});

export const AddValueToChart = (price: number): Action => ({
  type: 'AddValueToChart',
  updateState: (state: State) => {
    if (!state.user || !state.user.chart) {
      return state;
    }

    const prices = [...state.user.chart.prices, price];

    return {
      ...state,
      user: {
        ...state.user,
        chart: {
          ...state.user.chart,
          prices: prices.slice(Math.max(prices.length - 50, 1)),
        },
      },
    };
  },
});

export const UpdateCryptoPrice = (crypto: string, priceId?: string, key: string, value: string): Action => ({
  type: 'UpdateCryptoPrice',
  updateState: (state: State) => {
    const cryptoFind = state.user && state.user.cryptoPrices.find(cryptoPrice => cryptoPrice.id === crypto);

    if (!state.user) {
      return state;
    }
    return {
      ...state,
      user: {
        ...state.user,
        cryptoPrices: cryptoFind ? state.user.cryptoPrices.map(itemCryptoPrice => {
          if (itemCryptoPrice.id === crypto) {
            if (priceId !== undefined) {
              return { ...itemCryptoPrice, priceId, [key]: value };
            }
            return { ...itemCryptoPrice, [key]: value };
          }

          return itemCryptoPrice;
        }) : [...state.user.cryptoPrices, {
          id: crypto,
          priceId: priceId || '',
          price: 0,
          average: 0,
          diff: 0,
          sd: 0,
          up: 0,
          down: 0,
          [key]: value,
        }],
      },
    };
  },
});
