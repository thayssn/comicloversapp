export const Types = {
  CHANGE: 'CHANGE',
  CHANGE_SUCCESS: 'CHANGE_SUCCESS',
};

const INITIAL_STATE = {};

export default function activeBook(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHANGE_SUCCESS:
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
