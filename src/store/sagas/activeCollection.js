import { put } from 'redux-saga/effects';
import { Types } from '../ducks/activeCollection';
import api from '../../services/api';
import { getUserToken } from '../../services/auth';

function* activeCollectionSaga(action) {
  try {
    const userToken = yield getUserToken();
    const { data: collection } = yield api.get(`/collections/${action.payload.collectionId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    yield put({
      type: Types.FETCH_SUCCESS,
      payload: {
        collection,
      },
    });
  } catch (err) {
    console.log('Error tring to get collection', err);
  }
}

export default activeCollectionSaga;
