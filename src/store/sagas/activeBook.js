import { put } from 'redux-saga/effects';
import * as NavigationService from '../../services/navigation';
import { Types as activeBookTypes } from '../ducks/activeBook';
import { Types as collectionsTypes } from '../ducks/collections';
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
      type: activeBookTypes.CHANGE_SUCCESS,
      payload: {
        book,
      },
    });
    NavigationService.navigate('BookDetail', { id: book._id, title: book.title });
  } catch (err) {
    console.log('Error tring to get book', err);
  }
}

export function* activeBookGetReviewSaga(action) {
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
      type: activeBookTypes.GET_REVIEW_SUCCESS,
      payload: {
        review,
      },
    });
  } catch (err) {
    yield put({
      type: activeBookTypes.GET_REVIEW_FAIL,
    });
  }
}

export function* activeBookSetReviewSaga(action) {
  try {
    const { book, review } = action.payload;
    const userToken = yield getUserToken();
    yield api.post(`/books/${book.id}/review`,
      review,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

    yield put({
      type: activeBookTypes.SET_REVIEW_SUCCESS,
      payload: {
        review,
      },
    });

    yield put({
      type: activeBookTypes.GET_REVIEW,
      payload: {
        book,
      },
    });

    NavigationService.navigate('BookDetail', { id: book._id, title: book.title });
  } catch (err) {
    console.log('Error tring to rate book', err);
  }
}

export function* activeBookAddToCollectionSaga(action) {
  try {
    const { book, collection } = action.payload;
    const userToken = yield getUserToken();
    yield api.post(`/collections/${collection.id}/books`, {
      books: [book.id],
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    yield put({
      type: activeBookTypes.ADD_TO_COLLECTION_SUCCESS,
    });

    yield put({
      type: collectionsTypes.FETCH_ALL,
      payload: {
        book,
      },
    });
  } catch (err) {
    yield put({
      type: activeBookTypes.ADD_TO_COLLECTION_FAIL,
    });

    console.log('Error tring to add book to collection', err);
  }
}

export function* activeBookRemoveFromCollectionSaga(action) {
  try {
    const { book, collection } = action.payload;
    const userToken = yield getUserToken();
    yield api.delete(`/collections/${collection.id}/books/${book.id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

    yield put({
      type: activeBookTypes.REMOVE_FROM_COLLECTION_SUCCESS,
    });

    yield put({
      type: collectionsTypes.FETCH_ALL,
      payload: {
        book,
      },
    });
  } catch (err) {
    yield put({

      type: activeBookTypes.REMOVE_FROM_COLLECTION_FAIL,
    });
    console.log('Error tring to remove book from collection', err);
  }
}
