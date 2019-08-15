export const Types = {
  CHANGE: 'book@CHANGE',
  CHANGE_SUCCESS: 'book@CHANGE_SUCCESS',
};

const INITIAL_STATE = {};

export default function activeBook(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHANGE_SUCCESS:
      console.log('wtf', action.payload.book);
      return action.payload.book;
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
};
