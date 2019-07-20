import { put } from 'redux-saga/effects';
import api from '../../services/api';
import { getUserToken } from '../../services/auth';
import { Types } from '../ducks/collections';

function* collectionsSaga() {
  try {
    const userAccessToken = yield getUserToken();
    const { data: { objects: collections } } = yield api.get('/user-collections/', {
      params: {
        access_token: userAccessToken,
      },
    });

    yield put({
      type: Types.FETCH_ALL_SUCCESS,
      payload: {
        collections,
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

export default collectionsSaga;
