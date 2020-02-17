export const Types = {
  FETCH: 'book@FETCH',
  FETCH_SUCCESS: 'book@FETCH_SUCCESS',
  FETCH_FAIL: 'book@FETCH_FAIL',
  REMOVE_BOOK: 'book@REMOVE_FROM_UI',
  REMOVE_BOOKS: 'books@REMOVE',
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
    case Types.REMOVE_BOOK:
      return { ...state, books: state.books.filter(({ id }) => id !== action.payload.bookId) };
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
  removeBook: bookId => ({
    type: Types.REMOVE_BOOK,
    payload: {
      bookId,
    },
  }),
};
