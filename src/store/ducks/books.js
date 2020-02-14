export const Types = {
  FETCH_ALL: 'books@FETCHALL',
  FETCH_ALL_SUCCESS: 'books@FETCH_ALL_SUCCESS',
  FETCH_ALL_FAIL: 'books@FETCH_ALL_FAIL',
  CREATE: 'books@CREATE',
  CREATE_SUCCESS: 'books@CREATE_SUCCESS',
  CREATE_FAIL: 'books@CREATE_FAIL',
};

const INITIAL_STATE = [];

export default function books(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH_ALL:
      return [...state];
    case Types.FETCH_ALL_SUCCESS:
      return action.payload.books;
    case Types.FETCH_ALL_FAIL:
      return [...state];
    case Types.CREATE:
      return [...state];
    case Types.CREATE_SUCCESS:
      return [...state, action.payload.collection];
    case Types.CREATE_FAIL:
      return [...state];
    default:
      return state;
  }
}

export const Creators = {
  fetchAllBooks: () => ({
    type: Types.FETCH_ALL,
  }),
  createBook: book => ({
    type: Types.CREATE,
    payload: book,
  }),
};
