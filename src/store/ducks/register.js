
export const Types = {
  REGISTER: 'user@REGISTER',
  REGISTER_SUCCESS: 'user@REGISTER_SUCCESS',
  REGISTER_FAIL: 'user@REGISTER_FAIL',
};

const INITIAL_STATE = {
  loading: false,
};

export default function register(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REGISTER:
      return { loading: true };
    case Types.REGISTER_SUCCESS:
      return { loading: false };
    case Types.REGISTER_FAIL:
      return { loading: false, registerError: 'Não foi possível realizar o cadastro.' };
    default:
      return state;
  }
}

export const Creators = {
  register: user => ({
    type: Types.REGISTER,
    payload: user,
  }),
};
