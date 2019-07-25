import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { TrackNoImage } from "../../track/track-no-image";
import { isLoading, isIdle } from "../../../service/deep-objects";
import { MAX_TRACKS, FILTERS } from "../../../service/constants";
import ModalDeleteTrack from "../delete-track/modal-delete-track";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { fetchTracks, addTrack, clearFetchTracks, setSort } from "../../../redux/actions";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    minHeight: 369,
    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%"
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none",
  },
  textField : {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
    },
    ">label": {
      fontSize: 10
    }
  },
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 20px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
  closeButton: {
    position: "absolute",
    right: "5px",
    background: "#fff",
    borderRadius: "50%",
    border: 0,
    padding: "5px",
    top: "5px",
    color: "#000",
    zIndex: 10
  }
}));

function ModalAddTrack(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hadleDeleteModalOpen = () => {
    setOpenDeleteModal(true);
  }

  const hadleDeleteModalClose = () => {
    console.log("close");
    setOpenDeleteModal(false);
  }

  const [values, setValues] = React.useState({
    name: "",
  });

  const handleChange = name => event => {
    const { fetchTracks } = props;
    const { value } = event.target;
    setValues({ ...values, [name]: value });
    fetchTracks(value);
  };

  const hadlerAddTrack = track => {
    const { addTrack, songsCount, clearFetchTracks, setSort } = props;

    if ( songsCount >= MAX_TRACKS ) {
      hadleDeleteModalOpen();
    } else {
      setSort(FILTERS.BY_DEFAULT)
      addTrack && addTrack(track);
      setValues({ ...values, name: "" });
      clearFetchTracks && clearFetchTracks();
    }
  }

  const {textButton} = props;

  const displayCardTrack = () => {

    const {search_tracks} = props;
    
    if ( isLoading(search_tracks) ) {
      return "Loading"
    }
    if ( isIdle(search_tracks) && search_tracks && search_tracks.track_list  && search_tracks.track_list.length > 0 ) {
        const { track_list } = search_tracks;
        const track = track_list[0].track;
        return  <TrackNoImage 
                    track={track} 
                    text_button={"😎 Add Song"} 
                    addTrack={() => hadlerAddTrack(track)} 
                />
    } 
    if ( isIdle(search_tracks) && search_tracks && search_tracks.track_list  && search_tracks.track_list.length === 0 ) {
      return <>Not found</>;
    }
    return <></>;
  }

  return (
    <div>
      <Button 
        type="button" 
        classes={{root: classes.root, label: classes.label}} 
        onClick={handleOpen}
      >
          {textButton}
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <IconButton 
            aria-label="Close" 
            className={classes.closeButton} 
            onClick={()=>handleClose()} 
          >
            <CloseIcon />
          </IconButton>
          <h2>Add Song <span role="img" aria-label="smiling face with heart-eyes">😍</span></h2>
          <p>
            Please, write name song.
          </p>
          <form noValidate autoComplete="off">
            <TextField
              id="standard-name"
              label="Write track name"
              className={classes.textField}
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
            />
          </form>

         {displayCardTrack()}

        </div>
      </Modal>
      <ModalDeleteTrack 
        open={openDeleteModal} 
        onClose={()=>hadleDeleteModalClose()}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        search_tracks: state.tracks.search_tracks,
        songsCount: state.tracks.favorite_list.length
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTracks: (title) => dispatch(fetchTracks(title)),
        addTrack:  (track) => dispatch(addTrack(track)),
        clearFetchTracks: ()=> dispatch(clearFetchTracks()),
        setSort: (sort)=> dispatch(setSort(sort))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalAddTrack);