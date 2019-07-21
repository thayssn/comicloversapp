import { put } from 'redux-saga/effects';
import api from '../../services/api';
import { getUserToken } from '../../services/auth';
import { Types } from '../ducks/collections';
import * as NavigationService from '../../services/navigation';

export function* collectionsFetchSaga() {
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

export function* collectionsCreateSaga(action) {
  try {
    const userAccessToken = yield getUserToken();

    const { data: collection } = yield api.post('/user-collections/',
      action.payload,
      {
        params: {
          access_token: userAccessToken,
        },
      });

    yield put({
      type: Types.CREATE_SUCCESS,
      payload: {
        collection,
      },
    });

    yield put({
      type: Types.FETCH_ALL,
    });

    NavigationService.navigate('Main');
  } catch (err) {
    yield put({
      type: Types.CREATE_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}
