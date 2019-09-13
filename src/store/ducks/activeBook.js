export const Types = {
  CHANGE: 'book@CHANGE',
  CHANGE_SUCCESS: 'book@CHANGE_SUCCESS',
  GET_RATING: 'book@GET_RATING',
  GET_RATING_SUCCESS: 'book@GET_RATING_SUCCESS',
  GET_RATING_FAIL: 'book@GET_RATING_FAIL',
  SET_RATING: 'book@SET_RATING',
  SET_RATING_SUCCESS: 'book@SET_RATING_SUCCESS',
};

const INITIAL_STATE = {};

export default function activeBook(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHANGE_SUCCESS:
      return action.payload.book;
    case Types.GET_RATING_SUCCESS:
      return { ...state, rating: action.payload.rating };
    case Types.GET_RATING_FAIL:
      return { ...state, rating: 0 };
    case Types.SET_RATING_SUCCESS:
      return { ...state, rating: action.payload.rating };
    default:
      return state;
  }
}

export const Creators = {
  changeBook: book => ({
    type: Types.CHANGE,
    payload: {
      book,
    },
  }),
  getRating: book => ({
    type: Types.GET_RATING,
    payload: {
      book,
    },
  }),
  setRating: (book, rating) => ({
    type: Types.SET_RATING,
    payload: {
      book,
      rating,
    },
  }),
};
