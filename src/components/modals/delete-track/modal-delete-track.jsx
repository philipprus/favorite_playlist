import React, { useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import { FILTERS } from "../../../service/constants";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { deleteTrack, addTrack, setSort, clearFetchTracks } from "../../../redux/actions";

const useStyles = makeStyles(theme => ({
  select: {
    width: "100%"
  },
  modal: {
    border: "2px solid #e63421"
  }
}));

function ModalDeleteTrack(props) {
  const classes = useStyles();
  const {open, onClose, favorite_list, track_add, deleteTrack, setSort, addTrack, clearFetchTracks  } = props;
  const [values, setValues] = React.useState({
    track_id: 0
  });

  const handlerAgreeCallback = useCallback(() => {
    if(values.track_id){
      deleteTrack(values.track_id);
    } else {
      deleteTrack(favorite_list[favorite_list.length-1].track_id);
    }
    setSort(FILTERS.BY_DEFAULT)
    addTrack(track_add.track);
    clearFetchTracks();
    onClose && onClose();
  }, [values, favorite_list, track_add, onClose, addTrack, clearFetchTracks, deleteTrack, setSort]);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  // function handlerAgree() {
  //   if(values.track_id){
  //     deleteTrack(values.track_id);
  //   } else {
  //     deleteTrack(favorite_list[favorite_list.length-1].track_id);
  //   }
  //   setSort(FILTERS.BY_DEFAULT)
  //   addTrack(track_add.track);
  //   clearFetchTracks();
  //   onClose && onClose();
  // }

  return (
    <Dialog open={open} className={classes.modal} onClose={onClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title"> <span role="img" aria-label="heart-eyes">😤</span> Warnings: Exceeded the limit </DialogTitle>
    <DialogContent>
      <DialogContentText>
        You exceeded the limit of songs in a favourites. <br/>
        If you press "ok" th oldest song will be deleted.<br/>
        You can choose song to be deleted from the following list.
      </DialogContentText>
      <form  autoComplete="off">
            <FormControl className={classes.select}>
                <Select 
                  value={values.track_id}
                  onChange={handleChange}
                  inputProps={{
                      name: "track_id",
                      id: "track_id",
                  }}
                >   
                    <MenuItem value={0}>
                      Oldest song
                    </MenuItem>
                    { favorite_list.map( (track, index) => 
                                          <MenuItem value={track.track_id} key={`song-for-delete-${index}`}>
                                            {track.track_name}
                                          </MenuItem>)
                                        }
                </Select>
            </FormControl>
        </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>onClose()} color="primary">
        Cancel
      </Button>
      <Button onClick={handlerAgreeCallback} color="primary">
        OK
      </Button>
    </DialogActions>
  </Dialog>
  );
}

const mapStateToProps = (state) => {
    return {
        favorite_list: state.tracks.favorite_list,
        track_add: state.tracks.search_tracks.track_list[0],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTrack: (track_id) => dispatch(deleteTrack(track_id)),
        addTrack:  (track) => dispatch(addTrack(track)),
        setSort: (sort_name) => dispatch(setSort(sort_name)),
        clearFetchTracks: ()=> dispatch(clearFetchTracks()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteTrack);