import { put } from 'redux-saga/effects';
import * as NavigationService from '../../services/navigation';
import { Types } from '../ducks/activeBook';
import api from '../../services/api';
import { getUserToken } from '../../services/auth';

export function* activeBookSaga(action) {
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

export function* activeBookGetRatingSaga(action) {
  try {
    const { book } = action.payload;
    const userToken = yield getUserToken();
    const { data: review } = yield api.get(`/books/${book.id}/review`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

    yield put({
      type: Types.GET_RATING_SUCCESS,
      payload: {
        rating: review.rating,
      },
    });
  } catch (err) {
    console.log('Error tring to rate book', err);

    yield put({
      type: Types.GET_RATING_FAIL,
    });
  }
}

export function* activeBookSetRatingSaga(action) {
  try {
    const { book, rating } = action.payload;
    const userToken = yield getUserToken();
    yield api.post(`/books/${book.id}/review`, {
      rating,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    yield put({
      type: Types.SET_RATING_SUCCESS,
      payload: {
        rating,
      },
    });
    NavigationService.navigate('BookDetail', { id: book._id, title: book.title });
  } catch (err) {
    console.log('Error tring to rate book', err);
  }
}
