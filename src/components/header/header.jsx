import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { FormControl, Select, MenuItem, Button } from "@material-ui/core";
import ModalAddTrack from "../modals/add-track/modal-add-track";
import { MAX_TRACKS, FILTERS } from "../../service/constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setSort, openPage } from "../../redux/actions";


const useStyles = makeStyles( (theme) => ({
  header: {
    flexGrow: 1,
    marginBottom: "40px"
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formSort: {
    color: "#ffffff",
    marginRight: 20
  },
  buttonAdd: {
    color: "#fff", border: "1px solid #fff", marginRight: 10
  },
  countSongs: {
    marginRight: 20
  },
  selectRoot: {
    color: "#fff"
  },
  selectIcon: {
    color: "#fff"
  },
  selectUnderline: {
    borderBottom: "2px solid #ff747e"
  }
}));

function Header(props) {
  const classes = useStyles();
  const { favorite_list_count, statusOpenPage, setSort, sort } = props;

  function handleChange(event) {
    setSort && setSort(event.target.value)
  }
  
  function handlerClosePage() {
    const { openPage } = props;
    openPage && openPage();
    props.history.push("/");
  }

  const formSort = () => {
    return  <form className={classes.formSort} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <Select
                      classes={{root: classes.selectRoot, icon: classes.selectIcon}}
                      value={sort}
                      onChange={handleChange}
                    >
                    <MenuItem value={FILTERS.BY_DEFAULT}>By Date Added</MenuItem>
                    <MenuItem value={FILTERS.BY_ALBUM}>By Album</MenuItem>
                    <MenuItem value={FILTERS.BY_ARTIST}>By Artist</MenuItem>
                    <MenuItem value={FILTERS.BY_TRACK}>By Track</MenuItem>
                    {/* <MenuItem value={FILTERS.BY_TRACK_LENGTH}>By track length</MenuItem> */}
                    </Select>
                </FormControl>
            </form>
  }

  const forOpenPage = statusOpenPage && statusOpenPage.status;

  return (
    <header className={classes.header}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
              <Typography className={classes.title} variant="h6" noWrap>
              <span role="img" aria-label="heart">💖</span> Favorite PlayList Songs
              </Typography>
            {!forOpenPage && formSort()}
            <Typography className={classes.countSongs}>
              Songs: {favorite_list_count}/{MAX_TRACKS}
            </Typography>
            {!forOpenPage && <ModalAddTrack textButton="Add song"/>}
            {forOpenPage && <Button className={classes.buttonAdd} onClick={()=> handlerClosePage()}><span role="img" aria-label="ok">👌</span> Back</Button>}
        </Toolbar>
        
      </AppBar>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
      favorite_list_count: state.tracks.favorite_list ? state.tracks.favorite_list.length : 0,
      statusOpenPage: state.openPage,
      sort: state.sort

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openPage: () => dispatch(openPage()),
    setSort: (sort) => dispatch(setSort(sort))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
