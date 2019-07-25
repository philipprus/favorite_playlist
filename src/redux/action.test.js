import * as actions from "./actions";
import * as types from "./actionTypes";

describe("actions", () => {
  it("should create an action to search songs", () => {
    const name = "Song"
    const expectedAction = {
      type: types.FETCH_TRACKS,
      payload: {name}
    }
    expect(actions.fetchTracks(name)).toEqual(expectedAction)
  });

  it("should create an action to delete song", () => {
    const index_track = "23552654"
    const expectedAction = {
        type: types.DELETE_TRACK,
        payload: index_track
    }
    expect(actions.deleteTrack(index_track)).toEqual(expectedAction)
  });
})