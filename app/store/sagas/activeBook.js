import { put } from 'redux-saga/effects';
import { Types } from '../ducks/activeBook';

function* activeBookSaga(action) {
  yield put({
    type: Types.CHANGE_SUCCESS,
    payload: {
      book: action.payload.book,
    },
  });
}

export default activeBookSaga;
