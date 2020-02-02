import { put } from 'redux-saga/effects';
import api from '../../services/api';
import { getUserToken } from '../../services/auth';
import { Types } from '../ducks/favorites';

export default function* favoritesFetchSaga(action) {
  try {
    const userAccessToken = yield getUserToken();
    const { data: favorites } = yield api.get('/books/review/favorites', {
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
        favorites,
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
