// @flow

import type { Action, State, User } from 'type';

export const SetupUser = (user: User): Action => ({
  type: 'SetupUser',
  updateState: (state: State) => ({
    ...state,
    user,
  }),
});

export const Logout = (): Action => ({
  type: 'Logout',
  updateState: (state: State) => ({
    ...state,
    user: undefined,
  }),
});
