const INITIAL_STATE = {};

export default function activeBook(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CHANGE_BOOK':
      return action.book;
    default:
      return state;
  }
}
