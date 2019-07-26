export const Types = {
  FETCH: 'book@FETCH',
  FETCH_SUCCESS: 'book@FETCH_SUCCESS',
  FETCH_FAIL: 'book@FETCH_FAIL',
};

const INITIAL_STATE = {};

export default function activeCollection(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH:
      return { ...state, loading: true };
    case Types.FETCH_SUCCESS:
      return { ...action.payload.collection, loading: false };
    case Types.FETCH_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export const Creators = {
  fetchCollection: collectionId => ({
    type: Types.FETCH,
    payload: {
      collectionId,
    },
  }),
};
