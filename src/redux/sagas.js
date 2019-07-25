    
import { takeLatest, put, call, all } from "redux-saga/effects";
import axios from "axios";
import { ENDPOINTS } from "../service/constants";
import { API_ROOT, APIKEY } from "../service/constants";
import { FETCH_TRACKS_SUCCESS, FETCH_TRACKS_FAILURE, FETCH_TRACKS, FETCH_TRACKS_PENDING, ADD_TRACK, FETCH_TRACK_PENDING, FETCH_TRACK_FAILURE, FETCH_TRACK_SUCCESS, FETCH_COVER_ALBUM_SUCCESS, FETCH_COVER_ALBUM_FAILURE, FETCH_LYRICS_TRACK_SUCCESS, FETCH_LYRICS_TRACK_FAILURE, FETCH_LYRICS_TRACK, FETCH_LYRICS_TRACK_PENDING } from "./actionTypes";

const isRequestSucceded = (status) => status >= 200 && status <= 204;

export function makeEndPoint(endPoint) {
  return `${API_ROOT}${endPoint}`
}

export function getDataAsync(ApiEndpoint, action) {
  const endpoint = makeEndPoint(ApiEndpoint);
  axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  return axios.get(endpoint, {
      params: { ...action, apikey:APIKEY },
  });
}

export function* makeFetchTracks(action) {
  yield put({ type: FETCH_TRACKS_PENDING});
  try {
    const response = yield call(getDataAsync, ENDPOINTS.search_track, {q_track: action.payload.name});
    const { data: {message} } = response;
    if (isRequestSucceded(response.status)) {
      const track_list = message.body && message.body.track_list;
      yield put({ type: FETCH_TRACKS_SUCCESS, payload: {track_list} });
    } else {
      yield put({ type: FETCH_TRACKS_FAILURE });
    }
  } catch (error) {
    yield put({ type: FETCH_TRACKS_FAILURE });
    console.error(error);
  }
}

export function* makeFetchTrack(action) {
  yield put({ type: FETCH_TRACK_PENDING});
  try {
    const [track, album] =  yield all([
      call(getDataAsync, ENDPOINTS.get_track, {track_id: action.payload.track.track_id}),
      call(getDataAsync, ENDPOINTS.get_cover_album, {album_id: action.payload.track.album_id}),
    ]);
    if (isRequestSucceded(track.status)) {
      yield put({ type: FETCH_TRACK_SUCCESS, payload: track.data.message.body });
    } else {
      yield put({ type: FETCH_TRACK_FAILURE });
    }

    if (isRequestSucceded(album.status)) {
      yield put({ type: FETCH_COVER_ALBUM_SUCCESS, payload: album.data.message.body });
    } else {
      yield put({ type: FETCH_COVER_ALBUM_FAILURE });
    }
  } catch (error) {
    yield put({ type: FETCH_TRACK_FAILURE });
    console.error(error);
  }
}

export function* makeFetchLyrics(action) {
  yield put({ type: FETCH_LYRICS_TRACK_PENDING});
  try {
    const response = yield call(getDataAsync, ENDPOINTS.get_lyrics_track, {track_id: action.payload.track_id});
    const { data: {message} } = response;
      yield put({ type: FETCH_LYRICS_TRACK_SUCCESS, payload: {...message.body, track_id:action.payload.track_id} });
  } catch (error) {
    yield put({ type: FETCH_LYRICS_TRACK_FAILURE });
    console.error(error);
  }
}

export function* fetchTracksSaga() {
  yield takeLatest(FETCH_TRACKS, makeFetchTracks);
}

export function* fetchTrackSaga() {
  yield takeLatest(ADD_TRACK, makeFetchTrack);
}

export function* fetchLyricsSaga() {
  yield takeLatest(FETCH_LYRICS_TRACK, makeFetchLyrics)
}

export default function* rootSaga() {
  yield all([
    fetchTracksSaga(),
    fetchTrackSaga(),
    fetchLyricsSaga()
  ])
}