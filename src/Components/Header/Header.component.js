// @flow

import React from 'react';
import dependencies from 'dependencies';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import type { State } from 'type';

type Props = {
  logout: ?() => void,
  location: any,
  isAdmin: boolean,
}

const HeaderComponent = (props: Props) => (
  <div className="header">
    <button
      className={`action ${props.location.pathname === '/' ? 'active' : ''}`}
      onClick={() => {
        dependencies.Router.push('/');
      }}
    >
        home
    </button>
    <button
      className={`action ${props.location.pathname === '/favorites' ? 'active' : ''}`}
      onClick={() => {
        dependencies.Router.push('/favorites');
      }}
    >
          favorites
    </button>
    { props.isAdmin &&
    <button
      className={`action ${props.location.pathname === '/admin/adjust-crypto' ? 'active' : ''}`}
      onClick={() => {
        dependencies.Router.push('/admin/adjust-crypto');
      }}
    >
          adjust crypto
    </button>}
    { props.isAdmin &&
    <button
      className={`action ${props.location.pathname === '/admin/crypto-usage' ? 'active' : ''}`}
      onClick={() => {
        dependencies.Router.push('/admin/crypto-usage');
      }}
    >
          crypto usage
    </button>}
    { props.isAdmin &&
    <button
      className={`action ${props.location.pathname === '/admin/delete-crypto' ? 'active' : ''}`}
      onClick={() => {
        dependencies.Router.push('/admin/delete-crypto');
      }}
    >
          delete crypto
    </button>}
    <button
      className="logout"
      onClick={() => {
        props.logout && props.logout();
      }}
    >
          logout
    </button>
    <style jsx>
      {`
      .header {
        background: linear-gradient(180deg, #d9e7ff 0%, #fff 100%);
        width: 100%;
        height: 100px;
        position: relative;
        align-items: center;
        display: flex;
        flex-direction: row;
      }
      .logout {
        position: absolute;
        right: 10px;
        height: 50px;
        width: 100px;
        background-color: transparent;
        border-color: transparent;
        font-size: 17px;
      }
      .action {
        margin-left: 10px;
        height: 50px;
        width: 100px;
        background-color: transparent;
        border-color: transparent;
        font-size: 17px;
      }
      .active {
        font-weight: 900;
      }
      `}
    </style>
  </div>
);

const mapStateToProps = (state: State) => ({
  isAdmin: state.user && state.user.admin,
});

export default connect(mapStateToProps)(withRouter(HeaderComponent));
