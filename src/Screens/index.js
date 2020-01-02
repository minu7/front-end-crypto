// @flow

import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import Favorites from './Favorites';
import CryptoUsage from './CryptoUsage';
import AdjustCrypto from './AdjustCrypto';
import DeleteCrypto from './DeleteCrypto';

const router = [
  {
    path: '/',
    component: Home,
    exact: true,
    showHeader: true,
    forAdmin: false,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    showHeader: false,
    forAdmin: false,
  },
  {
    path: '/signup',
    component: Registration,
    exact: true,
    showHeader: false,
    forAdmin: false,
  },
  {
    path: '/favorites',
    component: Favorites,
    exact: true,
    showHeader: true,
    forAdmin: false,
  },
  {
    path: '/admin/crypto-usage',
    component: CryptoUsage,
    exact: true,
    showHeader: true,
    forAdmin: true,
  },
  {
    path: '/admin/adjust-crypto',
    component: AdjustCrypto,
    exact: true,
    showHeader: true,
    forAdmin: true,
  },
  {
    path: '/admin/delete-crypto',
    component: DeleteCrypto,
    exact: true,
    showHeader: true,
    forAdmin: true,
  },
];

export {
  router, Home, Login, Favorites, CryptoUsage,
};
