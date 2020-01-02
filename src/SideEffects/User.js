// @flow

import { SetupUser, Logout } from 'stateUpdaters';


export const Login = (email: string, password: string) => async (dispatch: any, getState: function, manager: Object) => {
  const response = await manager.Request({
    url: `${manager.baseUrl}/auth/login`,
    method: 'POST',
    body: {
      email,
      password,
    },
  });

  manager.setToken(response.token);
  dispatch(SetupUser({
    email: response.email,
    admin: response.isAdmin,
    cryptoPrices: response.favouriteCrypto.map(crypto => ({ id: crypto })),
  }));
  manager.Router.push('/');
};

export const LogoutUser = () => (dispatch: any, getState: function, manager: Object) => {
  dispatch(Logout());
  manager.Router.push('/');
  manager.logout();
};

export const Registration = (email: string, password: string) => async (dispatch: any, getState: function, manager: Object) => {
  const response = await manager.Request({
    url: `${manager.baseUrl}/auth/signup`,
    method: 'POST',
    body: {
      email,
      password,
    },
  });

  manager.setToken(response.token);
  dispatch(SetupUser({
    email: response.email,
    admin: response.isAdmin,
    cryptoPrices: [],
  }));
  manager.Router.push('/');
};
