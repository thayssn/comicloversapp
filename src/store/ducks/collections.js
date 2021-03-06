export const Types = {
  FETCH_ALL: 'collections@FETCHALL',
  FETCH_ALL_SUCCESS: 'collections@FETCH_ALL_SUCCESS',
  FETCH_ALL_FAIL: 'collections@FETCH_ALL_FAIL',
  CREATE: 'collections@CREATE',
  CREATE_SUCCESS: 'collections@CREATE_SUCCESS',
  CREATE_FAIL: 'collections@CREATE_FAIL',
  EDIT: 'collections@EDIT',
  EDIT_SUCCESS: 'collections@EDIT_SUCCESS',
  EDIT_FAIL: 'collections@EDIT_FAIL',
  DELETE: 'collections@DELETE',
  DELETE_SUCCESS: 'collections@DELETE_SUCCESS',
  DELETE_FAIL: 'collections@DELETE_FAIL',
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
    case Types.CREATE:
      return [...state];
    case Types.CREATE_SUCCESS:
      return [...state, action.payload.collection];
    case Types.CREATE_FAIL:
      return [...state];
    case Types.EDIT:
      return [...state];
    case Types.EDIT_SUCCESS:
      return [...state];
    case Types.EDIT_FAIL:
      return [...state];
    case Types.DELETE:
      return [...state];
    case Types.DELETE_SUCCESS:
      return [...state];
    case Types.DELETE_FAIL:
      return [...state];
    default:
      return state;
  }
}

export const Creators = {
  fetchCollections: () => ({
    type: Types.FETCH_ALL,
  }),
  createCollection: collection => ({
    type: Types.CREATE,
    payload: collection,
  }),
  editCollection: (data, collectionId, collectionTitle) => ({
    type: Types.EDIT,
    payload: { data, collectionId, collectionTitle },
  }),
  deleteCollection: id => ({
    type: Types.DELETE,
    payload: id,
  }),
};
