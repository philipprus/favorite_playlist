import * as React from "react";
import { Grid, Button } from "@material-ui/core";
import Thumbnails from "../../components/thumbnails";
import { isLoading } from "../../service/deep-objects";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openPage, getLyrics } from "../../redux/actions";


const useStyles = () => ({

    backButton: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 20px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    pageStyle: {
        marginBottom: "100px"
    }
  });

class TrackPage extends React.Component {

    handlerClosePage = () => {
        const { openPage } = this.props;
        openPage && openPage();
        this.props.history.push("/");
    }

    getLirycs = () => {
        const { has_lyrics, track_id, lyrics } = this.props.track;
        const { getLyrics } = this.props;
        has_lyrics && !lyrics && getLyrics(track_id);
    }

    renderLyrics = () => {
        const { lyrics, status_lyrics  } = this.props.track;
        if (!lyrics) {
            return <p>No lyrics</p>
        }
        if(isLoading(status_lyrics)) {
            return <p>Loading</p>
        }
        if(lyrics) {
            return (
                <>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7}}>
                        {lyrics && lyrics.lyrics_body}
                    </div>
                    <h5>Copyright</h5>
                    <p>{lyrics && lyrics.lyrics_copyright}</p>
                </>);
        }
    }

    render(){
        const { classes } = this.props;
        
        if(!this.props.track) {
            return <Grid container className={classes.pageStyle} spacing={3}>
            <Grid item xs={12}>
                No track
            </Grid>
            <Grid item xs={12}>
                <Button className={classes.backButton} onClick={()=> this.handlerClosePage()}><span role="img" aria-label="ok">👌</span> Back to playlist</Button>
            </Grid>
        </Grid> ;
        } else {
            this.getLirycs();
        }
        
        const { track_name, album_name, artist_name, album, noImage  } = this.props.track;

        return (
            <div>
                <Grid container className={classes.pageStyle} spacing={3}>
                    <Grid item xs={3}>
                        <Thumbnails album={album} noImage={noImage}  />
                    </Grid>
                    <Grid item xs={9}>
                        <h2>{track_name}</h2>
                        <p><strong>Album name:</strong> { album_name }</p>
                        <p><strong>Artist name:</strong> { artist_name }</p>
                        <h3>Lyrics</h3>
                        {this.renderLyrics()}
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={classes.backButton} onClick={()=> this.handlerClosePage()}><span role="img" aria-label="ok">👌</span> Back to playlist</Button>
                    </Grid>
                </Grid> 
            </div>);
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        track: state.tracks.favorite_list.find(track => track.track_id === Number(ownProps.match.params.trackID)),
        status_lyrics: state.lyrics
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openPage: ()=> dispatch(openPage()),
        getLyrics: (track_id) => dispatch(getLyrics(track_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(useStyles)(TrackPage)));