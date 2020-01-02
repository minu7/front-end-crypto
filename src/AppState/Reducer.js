// @flow

import type { State, Action } from 'type';
import AppState from './State';

const reducer = (currentState: State = AppState, action: Action): State => {
  if (action.updateState == null) {
    return currentState;
  }


  return action.updateState(currentState);
};

export default reducer;
