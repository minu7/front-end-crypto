// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import type { State } from 'type';
import { SetFavoriteCurrencies, CryptoCurrencies, AdjustCrypto } from 'sideEffects';

type Props = {
  cryptoCurrencies: Array<string>,
  getCryptoCurrencies: () => void,
  adjustCrypto: (string, number) => Promise<any>,
}

const AdjustCryptoComponent = (props: Props) => {
  const [filter, setFilter] = useState('');
  const [loadingAdjustCrypto, setLoadingAdjustCrypto] = useState(undefined);

  useEffect(() => {
    props.getCryptoCurrencies();
  }, []);

  const listOfCrypto = props.cryptoCurrencies.filter(crypto => crypto.includes(filter));

  return (
    <div>
      <h1>search the currency</h1>
      <input
        value={filter}
        onChange={e => {
          setFilter(e.target.value);
        }}
      />
      <div className="title">select one currency for apply factor:</div>
      <div className="grid">
        {
        listOfCrypto && listOfCrypto.map(currency => (
          <div
            className={`container-checkbox ${loadingAdjustCrypto === currency ? 'loading' : ''}`}
            key={currency}
            onClick={() => {
              const factor = parseInt(prompt('Please enter factor', 10));
              if (!factor) {
                return;
              }
              if (typeof factor !== 'number') {
                alert('you must insert an number, retry');
                return;
              }
              setLoadingAdjustCrypto(currency);
              props.adjustCrypto(currency, factor).then(() => {
                alert('changes successfully applied');
                setLoadingAdjustCrypto(undefined);
              }).catch(error => {
                alert(`alert ${error}`);
                setLoadingAdjustCrypto(undefined);
              });
            }}
          >
            {loadingAdjustCrypto === currency ? 'loading...' : currency}
          </div>
        ))
      }
      </div>
      <style jsx>
        {`
        .search {
          display: flex;
          flex-direction: row;
          height: 20px;
          aligin-items: center;
          justify-content: center;
        }
        .filter {
          margin: auto;
          margin-top: 10px;
          width: 80%;
          align-items: center;
          justify-content: space-between;
          display: flex;
          font-size: 18px;
          background-color: #cccccc;
          padding: 20px;
          border-radius: 6px;
        }
        h1 {
          margin: 0px;
          margin-left: 20px;
        }
        input {
          margin-top: 10px;
          margin-left: 20px;
          width: 400px;
          height: 50px;
          border-radius: 10px;
          border-color: #f5f5f5;
          background-color: #f5f5f5;
          font-size: 21px;
        }
        p {
          margin: 0px;
          margin-right: 20px;
        }
        .title {
          width: 100%;
          aligin-items: center;
          justify-content: center;
          font-size: 21px;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .grid {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          font-size: 20px;
        }
        .container-checkbox {
          width: 200px;
          height: 200px;
          display: flex;
          flex-direction: row;
          background-color: #cccccc;
          margin: 10px;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
        }
        .loading {
          background-color: #add8e6;
        }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  cryptoCurrencies: state.cryptoCurrencies,
});

const mapDispatchToProps = (dispatch) => ({
  setFavorites: (currencies: Array<string>) => dispatch(SetFavoriteCurrencies(currencies)),
  getCryptoCurrencies: () => {
    dispatch(CryptoCurrencies());
  },
  adjustCrypto: (cryptoId: string, factor: number) => dispatch(AdjustCrypto(cryptoId, factor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdjustCryptoComponent);
