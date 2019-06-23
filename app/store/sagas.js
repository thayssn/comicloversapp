import { delay, put, takeEvery } from 'redux-saga/effects';

import { Types } from './ducks/activeBook';

function* asyncChangeBook(action) {
  yield delay(1000);

  yield put({
    type: Types.CHANGE_SUCCESS,
    payload: {
      book: action.payload.book,
    },
  });
}

export default function* root() {
  yield takeEvery(Types.CHANGE, asyncChangeBook);
}
