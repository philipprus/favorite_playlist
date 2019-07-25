import { SET_SORT } from "../actionTypes";
import { FILTERS } from "../../service/constants";

const initialState = FILTERS.BY_DEFAULT;

const sort = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT: {
      return action.payload.sort;
    }
    default: {
      return state;
    }
  }
};

export default sort;