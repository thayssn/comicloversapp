export const Types = {
  LOADING: 'load@LOADING',
  LOADING_COMPLETE: 'load@COMPLETE',
};

const INITIAL_STATE = false;

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOADING:
      return true;
    case Types.LOADING_COMPLETE:
      return false;
    default:
      return state;
  }
}
