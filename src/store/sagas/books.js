import { put } from 'redux-saga/effects';
import api from '../../services/api';
import { Types } from '../ducks/books';
import { getUserToken } from '../../services/auth';
import * as NavigationService from '../../services/navigation';

export function* booksSaga() {
  try {
    const { data: books } = yield api.get('/books/');

    yield put({
      type: Types.FETCH_ALL_SUCCESS,
      payload: {
        books,
      },
    });
  } catch (err) {
    yield put({
      type: Types.FETCH_ALL_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}

export function* booksCreateSaga(action) {
  try {
    const userAccessToken = yield getUserToken();
    console.log('booksCreateSaga', action);
    const { data: book } = yield api.post('/userbook/store/',
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
        body: action.payload,
      });

    yield put({
      type: Types.CREATE_SUCCESS,
      payload: {
        book,
      },
    });

    yield put({
      type: Types.FETCH_ALL,
    });

    NavigationService.navigate('Main');
  } catch (err) {
    console.log('booksCreateSaga error', err);
    yield put({
      type: Types.CREATE_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}
