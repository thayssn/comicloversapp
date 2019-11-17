export const Types = {
  CHANGE: 'book@CHANGE',
  CHANGE_SUCCESS: 'book@CHANGE_SUCCESS',
  GET_REVIEW: 'book@GET_REVIEW',
  GET_REVIEW_SUCCESS: 'book@GET_REVIEW_SUCCESS',
  GET_REVIEW_FAIL: 'book@GET_REVIEW_FAIL',
  SET_REVIEW: 'book@SET_REVIEW',
  SET_REVIEW_SUCCESS: 'book@SET_REVIEW_SUCCESS',
  SET_REVIEW_FAIL: 'book@SET_REVIEW_FAIL',
  ADD_TO_COLLECTION: 'book@ADD_TO_COLLECTION',
  ADD_TO_COLLECTION_SUCCESS: 'book@ADD_TO_COLLECTION_SUCCESS',
  ADD_TO_COLLECTION_FAIL: 'book@ADD_TO_COLLECTION_FAIL',
};

const INITIAL_STATE = {
  review: {
    rating: 0,
    comment: null,
    has_book: false,
    favorite: false,
  },
};

export default function activeBook(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHANGE_SUCCESS:
      return { ...state, ...action.payload.book };
    case Types.GET_REVIEW:
      return { ...state, loadingReview: true };
    case Types.GET_REVIEW_SUCCESS:
      return { ...state, review: action.payload.review, loadingReview: false };
    case Types.GET_REVIEW_FAIL:
      return { ...state, ...INITIAL_STATE, loadingReview: false };
    case Types.SET_REVIEW:
      return { ...state, loadingReview: true };
    case Types.SET_REVIEW_SUCCESS:
      return { ...state, review: action.payload.review, loadingReview: false };
    case Types.SET_REVIEW_FAIL:
      return { ...state, loadingReview: false };
    case Types.ADD_TO_COLLECTION:
      return { ...state, loadingAddToCollection: true };
    case Types.ADD_TO_COLLECTION_SUCCESS:
      return { ...state, loadingAddToCollection: false };
    case Types.ADD_TO_COLLECTION_FAIL:
      return { ...state, loadingAddToCollection: false };
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
  getReview: book => ({
    type: Types.GET_REVIEW,
    payload: {
      book,
    },
  }),
  setReview: (book, review) => ({
    type: Types.SET_REVIEW,
    payload: {
      book,
      review,
    },
  }),
  addToCollection: (book, collection) => ({
    type: Types.ADD_TO_COLLECTION,
    payload: {
      book,
      collection,
    },
  }),
};
