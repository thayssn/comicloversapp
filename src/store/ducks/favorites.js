export const Types = {
  EDIT: 'favorites@EDIT',
  EDIT_SUCCESS: 'favorites@EDIT_SUCCESS',
  EDIT_FAIL: 'favorites@EDIT_FAIL',
  FETCH_ALL: 'favorites@FETCH_ALL',
  FETCH_ALL_SUCCESS: 'favorites@FETCH_ALL_SUCCESS',
  FETCH_ALL_FAIL: 'favorites@FETCH_ALL_FAIL',
};

const INITIAL_STATE = [];

export default function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.EDIT:
      return [...state];
    case Types.EDIT_SUCCESS:
      return [...state];
    case Types.EDIT_FAIL:
      return [...state];
    case Types.FETCH_ALL:
      return [...state];
    case Types.FETCH_ALL_SUCCESS:
      return action.payload.favorites;
    case Types.FETCH_ALL_FAIL:
      return [...state];
    default:
      return state;
  }
}

export const Creators = {
  editFavorite: data => ({
    type: Types.EDIT,
    payload: { data },
  }),
  fetchFavorites: data => ({
    type: Types.FETCH_ALL,
    payload: { data },
  }),
};
