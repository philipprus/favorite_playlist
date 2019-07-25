export const APIKEY = "7629dddb1ec68ae1209b400db720c6ec";

export const MAX_TRACKS = 19;

export const API_ROOT = "http://api.musixmatch.com/ws/1.1/";

export const ENDPOINTS = {
    search_track: "track.search?f_has_lyrics=1&s_track_rating=desc&s_artist_rating=desc",
    get_track: "track.get",
    get_cover_album: "album.get",
    get_lyrics_track: "track.lyrics.get"
}

export const FILTERS = {
    BY_ALBUM: "BY_ALBUM",
    BY_ARTIST: "BY_ARTIST",
    BY_TRACK: "BY_TRACK",
    BY_DEFAULT: "BY_DEFAULT",
    BY_TRACK_LENGTH: "BY_TRACK_LENGTH"
  };
  