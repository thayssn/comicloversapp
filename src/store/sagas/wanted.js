import { put } from 'redux-saga/effects';
import api from '../../services/api';
import { getUserToken } from '../../services/auth';
import { Types } from '../ducks/wanted';

export default function* wantedFetchSaga(action) {
  try {
    const userAccessToken = yield getUserToken();
    const { data: wanted } = yield api.get('/books/review/wanted', {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
      query: {
        limit: action.payload.limit,
        page: action.payload.page,
      },
    });
    yield put({
      type: Types.FETCH_ALL_SUCCESS,
      payload: {
        wanted: wanted.books,
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
