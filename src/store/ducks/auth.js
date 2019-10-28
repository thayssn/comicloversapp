export const Types = {
  LOGIN: 'user@LOGIN',
  LOGIN_SUCCESS: 'user@LOGIN_SUCCESS',
  LOGIN_FAIL: 'user@LOGIN_FAIL',
  LOGOUT: 'user@LOGOUT',
  LOGOUT_SUCCESS: 'user@LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'user@LOGOUT_FAIL',
  RESET_PASSWORD: 'user@RESET_PASSWORD',
  RESET_PASSWORD_SUCCESS: 'user@RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAIL: 'user@RESET_PASSWORD_FAIL',
  LOGIN_FB: 'user@LOGIN_FB',
  LOGIN_FB_SUCCESS: 'user@LOGIN_FB_SUCCESS',
  LOGIN_FB_FAIL: 'user@LOGIN_FB_FAIL',
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
    case Types.LOGIN_FB:
      return { ...state, loading: true };
    case Types.LOGIN_FB_SUCCESS:
      return {
        user: action.payload.user,
        userToken: action.payload.userToken,
        loading: false,
      };
    case Types.LOGIN_FB_FAIL:
      return { ...state, loading: false, authError: 'Não foi possível realizar o login com facebook.' };
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
    case Types.RESET_PASSWORD:
      return { ...state, loading: true };
    case Types.RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, successMessage: 'Enviado com sucesso.' };
    case Types.RESET_PASSWORD_FAIL:
      return { ...state, loading: false, errorMessage: 'Houve um erro. Verifique se as informações estão corretas.' };
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
  requestResetPassword: email => ({
    type: Types.RESET_PASSWORD,
    payload: email,
  }),
  loginWithFB: user => ({
    type: Types.LOGIN_FB,
    payload: user,
  }),
};
