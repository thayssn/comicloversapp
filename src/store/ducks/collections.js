export const Types = {
  FETCH_ALL: 'collections@FETCHALL',
  FETCH_ALL_SUCCESS: 'collections@FETCH_ALL_SUCCESS',
  FETCH_ALL_FAIL: 'collections@FETCH_ALL_FAIL',
};

const INITIAL_STATE = [];

export default function collections(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH_ALL:
      return [...state];
    case Types.FETCH_ALL_SUCCESS:
      return action.payload.collections;
    case Types.FETCH_ALL_FAIL:
      return [...state];
    default:
      return state;
  }
}

export const Creators = {
  fetchCollections: () => ({
    type: Types.FETCH_ALL,
  }),
};
