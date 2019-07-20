export const Types = {
  LOGIN: 'user@LOGIN',
  LOGIN_SUCCESS: 'user@LOGIN_SUCCESS',
  LOGIN_FAIL: 'user@LOGIN_FAIL',
  LOGOUT: 'user@LOGOUT',
  LOGOUT_SUCCESS: 'user@LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'user@LOGOUT_FAIL',
};

const INITIAL_STATE = {
  token: null,
  user: {},
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN:
      return { ...state, loading: true };
    case Types.LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        userToken: action.payload.userToken,
        loading: false,
      };
    case Types.LOGIN_FAIL:
      return { ...state, loading: false, authError: 'Não foi possível realizar o login.' };
    case Types.LOGOUT:
      return { ...state, loading: true };
    case Types.LOGOUT_SUCCESS:
      return {
        token: null,
        user: {},
        loading: false,
      };
    case Types.LOGOUT_FAIL:
      return { ...state, loading: false };
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
