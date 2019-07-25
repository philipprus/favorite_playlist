import sort from "./sorts";
import * as types from "../actionTypes";
import {FILTERS} from "../../service/constants"

describe(">>>R E D U C E R --- Test sort",()=>{
    it("+++ reducer for SET_SORT", () => {
        let state = {soft: FILTERS.BY_DEFAULT}
        state = sort(state, {type: types.SET_SORT, payload: { sort: FILTERS.BY_ALBUM }})
        expect(state).toEqual(FILTERS.BY_ALBUM)
    });
});