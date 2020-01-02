// @flow

import React from 'react';
import type { CryptoPrice } from 'type';

type Props = {
  cryptoPrice: CryptoPrice,
  onClick: () => void,
  active: boolean,
}

const CurrencyPriceComponent = (props: Props) => (
  <div className={`container ${props.active ? 'active' : ''}`} onClick={props.onClick}>
    <p className="title">
      {props.cryptoPrice.id}
    </p>
    <p className="title">
      <b>{props.cryptoPrice.price}</b>
    </p>
    <div className="divider" />
    <div className="up-down">
      <p className="detail">
        <span>&#9650;</span>
        <b className="up">{props.cryptoPrice.up}</b>
      </p>
      <p className="detail">
        <span>&#9660;</span>
        <b className="down">{props.cryptoPrice.down}</b>
      </p>
    </div>
    <p className="detail">
      average:
      <b>{props.cryptoPrice.average}</b>
    </p>
    <p className="detail">
      diff:
      <b>{props.cryptoPrice.diff}</b>
    </p>
    <p className="detail">
      sd:
      <b>{props.cryptoPrice.sd}</b>
    </p>
    <style jsx>
      {`
      .title {
        margin-top: 5px;
        font-size: 25px;
        width: 100%;
        text-align: center;
      }
      .detail > b {
        margin-left: 10px;
      }
      span {
        color: grey;
      }
      .divider {
        width: 100%;
        height: 1.5px;
        background-color: grey;
        border-radius: 2px;
      }
      .container {
        width: 270px;
        height: 280px;
        background-color: #fff;
        margin: 20px;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 16px 1px rgba(0,0,0,.05);
        color: #4a4a4a;
      }
      .up-down {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-evenly;
        align-items: center;
      }
      .up-down b {
        font-size: 20px;
      }
      .up {
        color: #4caf50
      }
      .down {
        color: #f44336
      }
      .active {
        box-shadow: 0 0 8px 1px rgba(85,91,100,0.65);
        border-color: #fff;
      } 
    `}
    </style>
  </div>
);

export default CurrencyPriceComponent;
