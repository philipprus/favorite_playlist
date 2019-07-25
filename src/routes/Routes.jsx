import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TrackPage from "../pages/track-page/track-page";
import Header from "../components/header/header";
import { Container } from "@material-ui/core";
import Footer from "../content-layout/footer";
import NotFoundPage from "../components/notFoundPage";
import Playlist from "../pages/playlist/playlist";

export function Routes() {
    return (
        <BrowserRouter>
            <Header/>
            <Container style={{minHeight: "60vh"}}>
                <Switch>
                    <Route path="/:trackID" component={TrackPage} />
                    <Route path="/" component={Playlist} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Container>
            <Footer/>
        </BrowserRouter>
    )
}