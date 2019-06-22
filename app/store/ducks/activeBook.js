export const Types = {
  CHANGE: 'activeBook/CHANGE',
};

const INITIAL_STATE = {};

export function activeBook(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHANGE:
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
