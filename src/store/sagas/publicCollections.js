import { put } from 'redux-saga/effects';
import api from '../../services/api';
import { getUserToken } from '../../services/auth';
import { Types } from '../ducks/publicCollections';
// import * as NavigationService from '../../services/navigation';

function* publicCollectionsFetchSaga() {
  try {
    const userAccessToken = yield getUserToken();
    const { data: publicCollections } = yield api.get('/public/collections/', {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });

    yield put({
      type: Types.FETCH_ALL_SUCCESS,
      payload: {
        publicCollections,
      },
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: Types.FETCH_ALL_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}

export default publicCollectionsFetchSaga;
