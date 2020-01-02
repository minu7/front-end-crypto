// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import type { State } from 'type';
import { SetFavoriteCurrencies, CryptoCurrencies, DeleteCrypto } from 'sideEffects';

type Props = {
  cryptoCurrencies: Array<string>,
  getCryptoCurrencies: () => void,
  deleteCrypto: (string) => Promise<any>,
}

const DeleteCryptoComponent = (props: Props) => {
  const [filter, setFilter] = useState('');
  const [loadingdeleteCrypto, setLoadingdeleteCrypto] = useState(undefined);

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
      <div className="title">select one to delete data currency:</div>
      <div className="grid">
        {
        listOfCrypto && listOfCrypto.map(currency => (
          <div
            className={`container-checkbox ${loadingdeleteCrypto === currency ? 'loading' : ''}`}
            key={currency}
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              const confirmFlag = confirm(`are you sure to delete currency: ${currency}`);
              if (!confirmFlag) {
                return;
              }
              setLoadingdeleteCrypto(currency);
              props.deleteCrypto(currency).then(() => {
                alert('successfully deleted');
                setLoadingdeleteCrypto(undefined);
              }).catch(error => {
                alert(`alert ${error}`);
                setLoadingdeleteCrypto(undefined);
              });
            }}
          >
            {loadingdeleteCrypto === currency ? 'deleting...' : currency}
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
  deleteCrypto: (cryptoId: string) => dispatch(DeleteCrypto(cryptoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCryptoComponent);
