// @flow

type CryptoCurrencies = Array<string>

export type CryptoPrice = {
  id: string,
  priceId: string,
  price: number,
  average: number,
  diff: number,
  sd: number,
  up: number,
  down: number,
}

export type Chart = {
  cryptoCurrency: string,
  prices: Array<number>
}

export type User = {
  email: string,
  admin: boolean,
  cryptoPrices: Array<CryptoPrice>,
  chart?: Chart,
}

export type State = {
  user?: User,
  cryptoCurrencies?: CryptoCurrencies
}

export type Action = {
  +type: string,
  +updateState: (state: State) => State,
}
