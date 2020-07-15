import { put } from 'redux-saga/effects';
import api from '../../services/api';
import { Types } from '../ducks/books';
import { getUserToken } from '../../services/auth';
import * as NavigationService from '../../services/navigation';

export function* booksFetchAllSaga() {
  try {
    const userAccessToken = yield getUserToken();
    const { data: books } = yield api.get('/books/',
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });

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
export function* booksSearchSaga({ payload }) {
  try {
    const userAccessToken = yield getUserToken();
    const { data: { books } } = yield api.get(
      '/books/search',
      {
        params: payload,
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      },
    );

    yield put({
      type: Types.SEARCH_SUCCESS,
      payload: {
        books,
      },
    });
  } catch (err) {
    yield put({
      type: Types.SEARCH_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}

export function* booksCreateSaga({ payload }) {
  try {
    const userAccessToken = yield getUserToken();
    const { data: book } = yield api.post('/books',
      payload,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
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
