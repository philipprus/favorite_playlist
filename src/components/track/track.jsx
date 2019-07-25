import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { cropLongString } from "../../service/common";
import Thumbnails from "../thumbnails";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    card: {
      minHeight: 300,
      position: "relative",
      overflow: "inherit"
    },
    media: {
      height: 100,
    },
    title: {
      height: 70,
      fontSize: "1.3rem"
    },
    subTitle: {
      height: 40
    },
    closeButton: {
      position: "absolute",
      right: "-15px",
      background: "linear-gradient(45deg, #da0d3a 30%, #fca0a0 90%)",
      borderRadius: "50%",
      border: 0,
      padding: "5px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      top: "-15px",
      color: "#fff",
      zIndex: 10
    }
  });

export function Track(props) {
    const { album_name, artist_name, track_name, album, noImage } = props.track;
    const {onClick, deleteTrack} = props;
    const classes = useStyles();
    
    return (
        <Card className={classes.card}   >
          <IconButton aria-label="Close" className={classes.closeButton} onClick={()=>deleteTrack()} >
          <CloseIcon />
        </IconButton>
          <CardActionArea onClick={()=>onClick()}>
            <Thumbnails album={album} noImage={noImage}  />
            <CardContent>
              <Typography className={classes.title} gutterBottom  component="h2">
                {cropLongString(track_name, 30)}
              </Typography>
              <Typography  color="textSecondary" component="p" className={classes.subTitle}>
                  Artist: {cropLongString(artist_name, 20)}  <br/>
                  Album: {cropLongString(album_name,20)} <br/>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button onClick={onClick} className="buttonMore" size="small" color="primary">
              More...
            </Button>
          </CardActions>
        </Card>
      );
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  deleteTrack: PropTypes.func.isRequired
}