import * as types from "./actionTypes";


export const fetchTracks = (name) => ({
  type: types.FETCH_TRACKS,
  payload: { name }
});

export const clearFetchTracks = () => ({
  type: types.CLEAR_FETCH_TRACKS
})

export const addTrack = (track) => ({
  type: types.ADD_TRACK,
  payload: { track }
});

export const deleteTrack = (index_track) => ({
  type: types.DELETE_TRACK,
  payload: index_track
});

export const openPage = () => ({
  type: types.TOGGLE_PAGE
});

export const setSort = (sort) => ({
   type: types.SET_SORT, 
   payload: { sort } 
});

export const getLyrics = (track_id) => ({
  type: types.FETCH_LYRICS_TRACK,
  payload: {track_id}
})