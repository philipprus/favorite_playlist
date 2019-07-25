import React, { useCallback } from "react";
import { Track } from "../../components/track/track";
import { Grid } from "@material-ui/core";
import ModalAddTrack from "../../components/modals/add-track/modal-add-track";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openPage, deleteTrack } from "../../redux/actions";
import { makeGetFavoriteTracksBySort } from "../../redux/selectors/track-selectors";
import PropTypes from "prop-types"


function Playlist(props) {

     const handlerOpen = useCallback((track_id) => () => {
        props.history.push("/"+track_id);
        props.openPage();
    }, [props]);
    
    const handleDeleteTrack = useCallback((trackId) => () => {
        props.deleteTrack(trackId);
    }, [props])
  
    function playlistView() { 
        const { favorite_list } = props;
        return favorite_list.map( (track, index) => {
           return ( 
           <Grid item xs={12} sm={6} md={3} key={`grid-${index}`} >
                <Track track={track} onClick={handlerOpen(track.track_id)} deleteTrack={handleDeleteTrack(track.track_id)} />
           </Grid>); 
        });
    }

    function renderNoSong() {
        return (
            <Grid item xs={12} sm={12} md={12} >
                <div style={{textAlign:"center", height: "60vh", minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "center", }}>
                    <h2>
                        <span role="img" aria-label="heart">😅</span> <br/>
                        No Favorites songs in playlist. 
                    </h2>
                    <p>
                        Please, add your favorite songs.
                    </p>
                    <ModalAddTrack textButton="Add song" color="blue"/>
                </div>
            </Grid>
        );
    }

    function renderPlaylist(){
        const { favorite_list } = props;

        if (favorite_list.length > 0 ) {
            return playlistView()
        } else {
            return renderNoSong();
        }
    }

    return (
        <Grid container  spacing={3}>
            {renderPlaylist()}
        </Grid>
    );
}


const mapStateToProps = (state) => {
    return {
        favorite_list: makeGetFavoriteTracksBySort(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openPage: () => dispatch(openPage()),
        deleteTrack: (track_id) => dispatch(deleteTrack(track_id))
    };
};

Playlist.propTypes = {
    openPage: PropTypes.func.isRequired,
    deleteTrack: PropTypes.func.isRequired,

  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Playlist));