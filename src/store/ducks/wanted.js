export const Types = {
  FETCH_ALL: 'wanted@FETCH_ALL',
  FETCH_ALL_SUCCESS: 'wanted@FETCH_ALL_SUCCESS',
  FETCH_ALL_FAIL: 'wanted@FETCH_ALL_FAIL',
};

const INITIAL_STATE = [];

export default function wanted(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH_ALL:
      return [...state];
    case Types.FETCH_ALL_SUCCESS:
      return action.payload.wanted;
    case Types.FETCH_ALL_FAIL:
      return [...state];
    default:
      return state;
  }
}

export const Creators = {
  fetchWanted: data => ({
    type: Types.FETCH_ALL,
    payload: { data },
  }),
};
