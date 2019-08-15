import { put } from 'redux-saga/effects';
import { Types } from '../ducks/activeCollection';
import api from '../../services/api';

function* activeCollectionSaga(action) {
  try {
    const { data: collection } = yield api.get(`/collections/${action.payload.collectionId}`);
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
