import React from "react";
import { Container } from "@material-ui/core";
import musicMatch from "../assets/images/logo-musicmatch.svg"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( (theme) => ({
    footer: {
      marginBottom: "40px",
      marginTop: "40px",
      textAlign: "center"
    }
  }));

  
const Footer = () => {
  const classes = useStyles();

    return <Container className={classes.footer}>
            <p>Powered API by</p>
                <img src={musicMatch} alt="Logo MusicMatch" />
            </Container>;
}

export default Footer;