import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { cropLongString } from "../../service/common";
import PropTypes from "prop-types";

export function TrackNoImage(props) {
    const { album_name, artist_name, track_name } = props.track;
    const { addTrack, text_button } = props;
    return (
        <Card>
          <CardActionArea onClick={()=>addTrack(props.track)}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {track_name ? cropLongString(track_name, 30) : "No name"}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Artist: {artist_name ? cropLongString(artist_name, 20) : "No Artist name"} | Album: {album_name ? cropLongString(album_name,20) : "No Album Name"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button onClick={()=>addTrack(props.track)} size="small" color="primary">
              {text_button}
            </Button>
          </CardActions>
        </Card>
      );
}

TrackNoImage.propTypes = {
  track: PropTypes.object.isRequired,
  addTrack: PropTypes.func.isRequired
}