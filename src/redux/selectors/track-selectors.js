import { createSelector } from "reselect";
import { FILTERS } from "../../service/constants";
import { sortTracksByKey } from "../../service/sort";

export const getFavoriteTracks = (state) => state.tracks && state.tracks.favorite_list;
export const getSort = (state) => state && state.sort;
export const getSearchTracks = (state) => state.tracks && state.tracks.search_tracks;

export const makeGetFavoriteTracksBySort = createSelector(
    [getFavoriteTracks, getSort],
    (tracks, sort) => {
        switch (sort) {
            case FILTERS.BY_ALBUM:
                return sortTracksByKey(tracks, "album_name");
            case FILTERS.BY_ARTIST:
                return sortTracksByKey(tracks, "artist_name");
            case FILTERS.BY_TRACK:
                    return sortTracksByKey(tracks, "track_name");
            case FILTERS.BY_DEFAULT:
                return tracks;
            default:
                return tracks;
        }
    }
)