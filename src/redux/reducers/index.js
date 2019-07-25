import { combineReducers } from "redux";
import sort from "./sorts";
import tracks from "./tracks";
import { TOGGLE_PAGE } from "../actionTypes";


const openPage = (state = { status: false}, action) => {
    switch (action.type) {
        case TOGGLE_PAGE:
            return {
                ...state,
                status: !state.status
            };
        default: 
            return state;
    }
}

export default combineReducers({ tracks, sort, openPage });
