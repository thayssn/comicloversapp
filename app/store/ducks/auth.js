import { onSignIn } from '../../config/auth';

export const Types = {
  LOGIN: 'user@LOGIN',
  LOGIN_SUCCESS: 'user@LOGIN_SUCCESS',
  LOGIN_FAIL: 'user@LOGIN_FAIL',
  LOGOUT: 'user@LOGOUT',
  LOGOUT_SUCCESS: 'user@LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'user@LOGOUT_FAIL',
};

const INITIAL_STATE = {
  isLogedIn: null,
  token: null,
  user: {},
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      onSignIn(action.payload.userToken);
      return { user: action.payload.user, userToken: action.payload.userToken, isLogedIn: true };
    case Types.LOGOUT_SUCCESS:
      return { isLoggedIn: false, token: null, user: {} };
    default:
      return state;
  }
}

export const Creators = {
  login: user => ({
    type: Types.LOGIN,
    payload: user,
  }),
  logout: () => ({
    type: Types.LOGOUT,
  }),
};
