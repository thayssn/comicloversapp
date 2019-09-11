export const Types = {
  FETCH_ALL: 'publicCollections@FETCHALL',
  FETCH_ALL_SUCCESS: 'publicCollections@FETCH_ALL_SUCCESS',
  FETCH_ALL_FAIL: 'publicCollections@FETCH_ALL_FAIL',
};

const INITIAL_STATE = [];

export default function publicCollections(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH_ALL:
      return [...state];
    case Types.FETCH_ALL_SUCCESS:
      return action.payload.publicCollections;
    case Types.FETCH_ALL_FAIL:
      return [...state];
    default:
      return state;
  }
}

export const Creators = {
  fetchPublicCollections: () => ({
    type: Types.FETCH_ALL,
  }),
};
