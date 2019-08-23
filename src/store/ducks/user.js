export const Types = {
  FETCH: 'user@FETCH',
  FETCH_SUCCESS: 'books@FETCH_SUCCESS',
  FETCH_FAIL: 'books@FETCH_FAIL',
};

const INITIAL_STATE = {};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH:
      return { ...state };
    case Types.FETCH_SUCCESS:
      return action.payload.user;
    case Types.FETCH_FAIL:
      return { ...state };
    default:
      return state;
  }
}

export const Creators = {
  fetchUser: () => ({
    type: Types.FETCH,
  }),
};
