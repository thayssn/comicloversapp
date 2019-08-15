import { put } from 'redux-saga/effects';
import * as NavigationService from '../../services/navigation';
import { Types } from '../ducks/activeBook';
import api from '../../services/api';

function* activeBookSaga(action) {
  try {
    const { data: book } = yield api.get(`/books/${action.payload.book.id}`);
    // yield put({
    //   type: Types.FETCH_SUCCESS,
    //   payload: {
    //     collection,
    //   },
    // });
    yield put({
      type: Types.CHANGE_SUCCESS,
      payload: {
        book,
      },
    });
    NavigationService.navigate('BookDetail', { id: book._id, title: book.title });
  } catch (err) {
    console.log('Error tring to get book', err);
  }
}

export default activeBookSaga;
