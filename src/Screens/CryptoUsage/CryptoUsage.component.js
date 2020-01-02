// @flow

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CryptoUsage } from 'sideEffects';
import {
  RadialChart,
} from 'react-vis';

type Props = {
  getUsage: () => Promise<any>
}

const CryptoUsageComponent = (props: Props) => {
  const [usage, setUsage] = useState([]);

  const call = async () => {
    const usages = await props.getUsage();
    setUsage(usages);
  };

  useEffect(() => {
    call();
  }, []);
  return (
    <div>
      <div className="container">
        {usage.length > 0 ? (
          <RadialChart
            data={usage.map(singleUsage => ({
            // eslint-disable-next-line no-underscore-dangle
              label: singleUsage._id,
              angle: singleUsage.count,
            }))}
            showLabels
            labelsRadiusMultiplier={0.6}
            width={600}
            height={600}
          />
        ) : 'loading...'}
      </div>
      <style jsx>
        {`
        text {
          background-color: #ffffff;
        }
        .container {
          display: flex;
          justify-content: center;
          aligin-items: center;
          padding-top: 20px;
        }
        `}
      </style>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getUsage: () => dispatch(CryptoUsage()),
});

export default connect(undefined, mapDispatchToProps)(CryptoUsageComponent);
