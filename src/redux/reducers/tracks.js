import {FETCH_TRACKS, FETCH_TRACKS_SUCCESS, ADD_TRACK, FETCH_TRACKS_FAILURE, SAVE_PLAYLIST, GET_PLAYLIST, DELETE_TRACK, FETCH_TRACK_SUCCESS, FETCH_COVER_ALBUM_SUCCESS, FETCH_LYRICS_TRACK_SUCCESS, FETCH_LYRICS_TRACK_PENDING, FETCH_LYRICS_TRACK_FAILURE, CLEAR_FETCH_TRACKS } from "../actionTypes";
import { combineReducers } from "redux";
import { getRandomEmoji, getRandomColor } from "../../service/common";

const search_tracks = (state = {track_list: []}, action) => {
    switch (action.type) {
        case FETCH_TRACKS:
            return {
                ...state,
                status: "loading"
            };
        case FETCH_TRACKS_SUCCESS:
            const { payload } = action;
            if (payload) {
                return {
                    ...state,
                    ...payload,
                    status: "idle"
                };
            }
            return {
                status: "idle"
            };
        case FETCH_TRACKS_FAILURE:
            const { error } = action
            return {
                ...state,
                status: "failed",
                error
            };
        case CLEAR_FETCH_TRACKS: 
            return {
                ...state,
                track_list: [],
                status: ""
            }
        default: 
            return state;
    }
};

const favorite_list = (state = [], action) => {
    switch (action.type) {
        case ADD_TRACK:
            const { payload } = action;
            const track = {...payload.track, added_date: Date.now(), noImage: {icon: getRandomEmoji(), bg: getRandomColor()}};
            const isExist = state.some(el => el.track_id === track.track_id);
            
            if(isExist) { return state }
              return [
                  track,
                  ...state
              ];
        case FETCH_TRACK_SUCCESS: 
            return state.map((track) => {
                if (track.track_id === action.payload.track.track_id) {
                return Object.assign({}, track, {
                    ...action.payload.track
                })
                }
                return track
            })
        case FETCH_COVER_ALBUM_SUCCESS: 
            return state.map((track) => {

                if (track.album_id === action.payload.album.album_id) {
                    const album = {...action.payload.album }
                    return Object.assign({}, track, {
                    album: album
                    })
                }
                return track
            })
        case FETCH_LYRICS_TRACK_SUCCESS: 
            return state.map((track) => {
                if (track.track_id === action.payload.track_id) {
                return Object.assign({}, track, {
                    lyrics: {...action.payload.lyrics, status: "idle"},
                })
                }
                return track
            })
        case GET_PLAYLIST:
                return {
                    ...state,
                };
        case SAVE_PLAYLIST:
                return {
                    ...state,
                };
        case DELETE_TRACK: 
            return state.filter((item) => item.track_id !== action.payload );
        default: 
            return state;
    }
};

const lyrics = (state = {}, action) => {
    switch (action.type) {
        case FETCH_LYRICS_TRACK_PENDING: 
            return {
                ...state,
                status: "loading"
            }
        case FETCH_LYRICS_TRACK_SUCCESS: 
            return {
                ...state,
                status: "idle"
            }
        case FETCH_LYRICS_TRACK_FAILURE: 
            return {
                ...state,
                status: "error"
            }
        default: 
            return state;
    }
}
export default combineReducers({search_tracks, favorite_list, lyrics});