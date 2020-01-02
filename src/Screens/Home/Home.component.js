// @flow

import React, { useEffect } from 'react';
import { CurrencyPrice } from 'components';
import { connect } from 'react-redux';
import type { State, CryptoPrice, Chart } from 'type';
import {
  XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries,
} from 'react-vis';
import io from 'socket.io-client';
import { UpdateCryptoPrice, AddValueToChart } from 'stateUpdaters';
import { SelectCryptoPrice } from 'sideEffects';
import dependencies from 'dependencies';

type Props = {
  cryptoCurrencySelected: string,
  chart: Chart,
  currenciesPrice: Array<CryptoPrice>,
  updateCryptoPrice: (string, ?number, string, string) => void,
  selectCryptoPrice: (string, string) => void,
  addValueToChart: (number) => void,
}

let cryptoCurrencySelected;

const HomeComponent = (props: Props) => {
  cryptoCurrencySelected = props.cryptoCurrencySelected;

  if (props.currenciesPrice && props.currenciesPrice.length === 0) {
    window.location.replace('/favorites');
  }

  useEffect(() => {
    const socket = io(dependencies.baseUrl, {
      query: { token: dependencies.getToken() },
    });
    socket.on('data', action => {
      props.updateCryptoPrice(
        action.crypto,
        action.id,
        action.key,
        action.value,
      );
      if (action.crypto === cryptoCurrencySelected && action.id) {
        props.addValueToChart(action.value);
      }
    });
  }, []);

  const data = props.currenciesPrice && props.currenciesPrice.find(currency => currency.id === props.cryptoCurrencySelected);
  const diff = data ? (Math.max(...props.chart.prices) - Math.min(...props.chart.prices)) / 6 : 0;

  return (
    <div className="container">
      {props.chart && props.chart.prices.length > 0 && props.cryptoCurrencySelected ?
        (
          <div className="chart-container">
            <XYPlot width={700} height={300} yDomain={[Math.min(...props.chart.prices) - diff, Math.max(...props.chart.prices) + diff]}>
              <HorizontalGridLines />
              <LineSeries
                data={props.chart.prices.map((price, index) => ({
                  x: index,
                  y: price,
                }))}
              />
              <XAxis />
              <YAxis />
            </XYPlot>
          </div>
        ) : props.cryptoCurrencySelected ? (
          <div className="container-place-holder">
            <div className="place-holder">
              loading chart...
            </div>
          </div>
        ) : (
          <div className="container-place-holder">
            <div className="place-holder">
              select one currency to show the chart
            </div>
          </div>
        )}
      <div className="prices-container">
        {props.currenciesPrice && props.currenciesPrice.map(cryptoPrice => (
          <CurrencyPrice
            active={cryptoCurrencySelected === cryptoPrice.id}
            onClick={() => {
              if (!cryptoPrice.priceId) {
                alert('no priceID');
              }
              cryptoPrice.priceId && props.selectCryptoPrice(cryptoPrice.id, cryptoPrice.priceId);
            }}
            key={cryptoPrice.id}
            cryptoPrice={cryptoPrice}
          />
        ))}
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            padding-top: 10px;
          }
          .chart-container {
            width: 100%;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container-place-holder {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .place-holder {
            width: 400px;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .chart {
            width: 400px;
            height: 100%;
            background-color: grey;
          }
          .prices-container {
            display: flex;
            flex-wrap: wrap;
          }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  if (!state.user) {
    return {};
  }

  return {
    currenciesPrice: state.user.cryptoPrices,
    chart: state.user.chart,
    cryptoCurrencySelected: state.user.chart ? state.user.chart.cryptoCurrency : undefined,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateCryptoPrice: (crypto: string, id?: string, key: string, value: string) => {
    dispatch(UpdateCryptoPrice(crypto, id, key, value));
  },
  selectCryptoPrice: (cryptoId: string, priceId: string) => {
    dispatch(SelectCryptoPrice(cryptoId, priceId));
  },
  addValueToChart: (price: number) => {
    dispatch(AddValueToChart(price));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
