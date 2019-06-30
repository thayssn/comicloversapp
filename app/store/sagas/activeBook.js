import { put } from 'redux-saga/effects';
import { Types as activeBookTypes } from '../ducks/activeBook';

function* activeBookSaga(action) {
  yield put({
    type: activeBookTypes.CHANGE_SUCCESS,
    payload: {
      book: action.payload.book,
    },
  });
}

export default activeBookSaga;
