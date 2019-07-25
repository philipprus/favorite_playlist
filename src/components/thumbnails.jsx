import React from "react"
import PropTypes from "prop-types"
import { CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    media: {
      height: 150,
    }, 
    noMedia: {
      height: 150,
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      fontSize: 40
    }
  });

const Thumbnails = (props) => {
    const classes = useStyles();
    const {album, noImage} = props;
    return album && album.album_coverart_100x100 ? <CardMedia
            className={classes.media}
            image={album.album_coverart_100x100}
            title={album.album_name}
        /> : <div className={classes.noMedia} style={{backgroundColor: noImage.bg}}> {noImage.icon} </div>
}

Thumbnails.propTypes = {
  album: PropTypes.object,
  noImage: PropTypes.object.isRequired
}

export default Thumbnails;