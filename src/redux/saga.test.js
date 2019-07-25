import { put, call} from 'redux-saga/effects';
import {getDataAsync, makeFetchLyrics} from './sagas';
import * as types from "./actionTypes";
import { ENDPOINTS } from '../service/constants';
import { expectSaga } from 'redux-saga-test-plan';


describe('track fetching flow', () => {
    it('Fetches the lyrics failure', () => {
        const generator = makeFetchLyrics();
        expect(generator.next().value)
            .toEqual(put(
                {type: types.FETCH_LYRICS_TRACK_PENDING}
            ));
        expect(generator.next().value)
            .toEqual(put(
              {type: types.FETCH_LYRICS_TRACK_FAILURE}
            ));
    });

    it ('test FETCH_LYRICS_TRACK_SUCCESS', () => {
        
        const actionFake = {payload: {track_id: 16177823}};

        return expectSaga(makeFetchLyrics, actionFake)
                    .put({ type: types.FETCH_LYRICS_TRACK_PENDING})
                    .provide([
                        [call(getDataAsync, ENDPOINTS.get_lyrics_track, actionFake),  {}]
                    ])
                    .put({ type: types.FETCH_LYRICS_TRACK_SUCCESS, payload: { track_id:actionFake.payload.track_id } })
                    .run(false);
    });
      
});
