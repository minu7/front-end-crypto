// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import type { State } from 'type';
import { SetFavoriteCurrencies, CryptoCurrencies } from 'sideEffects';

type Props = {
  cryptoPrices: Array<string>,
  cryptoCurrencies: Array<string>,
  getCryptoCurrencies: () => void,
  setFavorites: (Array<string>) => Promise<any>,
}

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const FavoritesComponent = (props: Props) => {
  const [favourites, setFavourites] = useState(props.cryptoPrices);
  const [filter, setFilter] = useState('');
  const [loadingSaveChange, setLoadingSaveChange] = useState(false);

  useEffect(() => {
    props.getCryptoCurrencies();
  }, []);

  const listOfFavourites = props.cryptoCurrencies && props.cryptoCurrencies.filter(favourite => favourite.includes(filter));

  return (
    <div>
      <h1>search the currency</h1>
      <input
        value={filter}
        onChange={e => {
          setFilter(e.target.value);
        }}
      />
      <div className="title">select your favorite currency:</div>
      <div className="grid">
        {
        listOfFavourites && listOfFavourites.map(currency => (
          <div
            className={`container-checkbox ${favourites.includes(currency) ? 'active' : ''}`}
            key={currency}
            onClick={() => {
              if (!favourites.includes(currency)) {
                setFavourites([...favourites, currency]);
              } else {
                setFavourites(favourites.filter(favorite => favorite !== currency));
              }
            }}
          >
            {currency}
          </div>
        ))
      }
      </div>
      {!arraysEqual(favourites, props.cryptoPrices) &&
      (
        <div className="bottom-bar">
          <div className="save">
            {
              !loadingSaveChange ? (
                <button onClick={() => {
                  setLoadingSaveChange(true);
                  props.setFavorites(favourites).then(() => {
                    alert('changes successfully applied');
                    setLoadingSaveChange(false);
                  }).catch(error => {
                    alert(`error: ${error}`);
                    setLoadingSaveChange(false);
                  });
                }}
                >
                  save the changes
                </button>
              ) : (
                <div>loading....</div>
              )
            }
          </div>
        </div>
      )}
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
        .active {
          background-color: #add8e6;
        }
        .bottom-bar {
          position: fixed;
          bottom: 0;
          background-color: #d9e7ff;
          height: 80px;
          width: 100vw
        }
        .save {
          height: 80px;
          width: 260px;
          position: absolute;
          right: 0;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 23px;
          font-weight: 900;
        }
        .save > button {
          font-size: 23px;
          font-weight: 900;
          width: 100%;
          height: 100%;
        }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  cryptoCurrencies: state.cryptoCurrencies,
  cryptoPrices: state.user ? state.user.cryptoPrices.map(favourite => favourite.id) : [],
});

const mapDispatchToProps = (dispatch) => ({
  setFavorites: (currencies: Array<string>) => dispatch(SetFavoriteCurrencies(currencies)),
  getCryptoCurrencies: () => {
    dispatch(CryptoCurrencies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);
