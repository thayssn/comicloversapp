import { put } from 'redux-saga/effects';
import api from '../../services/api';
import { getUserToken } from '../../services/auth';
import { Types } from '../ducks/collections';
// import { Types as activeCollectionTypes } from '../ducks/activeCollection';
import * as NavigationService from '../../services/navigation';

export function* collectionsFetchSaga() {
  try {
    const userAccessToken = yield getUserToken();
    const { data: collections } = yield api.get('/collections/', {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });

    yield put({
      type: Types.FETCH_ALL_SUCCESS,
      payload: {
        collections: collections.filter(collection => collection.type !== 'public'),
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

    const { data: collection } = yield api.post('/collections/',
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
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

export function* collectionsEditSaga(action) {
  try {
    const userAccessToken = yield getUserToken();
    const { collectionId, data } = action.payload;
    yield api.put(`/collections/${collectionId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });

    yield put({
      type: Types.EDIT_SUCCESS,
    });

    yield put({
      type: Types.FETCH_ALL,
    });

    NavigationService.navigate('Main');
  } catch (err) {
    console.log(err);
    yield put({
      type: Types.EDIT_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}

export function* collectionsDeleteSaga(action) {
  try {
    const userAccessToken = yield getUserToken();

    yield api.delete(`/collections/${action.payload}`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });

    yield put({
      type: Types.DELETE_SUCCESS,
    });

    yield put({
      type: Types.FETCH_ALL,
    });

    NavigationService.navigate('Main');
  } catch (err) {
    console.log(err);
    yield put({
      type: Types.DELETE_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}
