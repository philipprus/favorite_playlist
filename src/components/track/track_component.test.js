import React from "react";
import { shallow } from "enzyme";
import { getTrackMock } from "../../mockData/trackMock";
import {Track} from "./track";
import Thumbnails from "../thumbnails";
import { Button } from "@material-ui/core";

//Use array destructurig to create mock functions.
let [deleteTrack, onClick] = new Array(2).fill(jest.fn());

function shallowSetup() {
  // Sample props to pass to our shallow render
  const track = getTrackMock();
  const props = {
      track,
      deleteTrack,
      onClick
  }
  // wrapper instance around rendered output
    const enzymeWrapper = shallow(<Track {...props} />).dive();

    return {
        props,
        enzymeWrapper
    };
}

describe("Shallow rendered Track Card", () => {
    it("has an thumbnails", () => {
      const { enzymeWrapper } = shallowSetup();
      var node = enzymeWrapper.find(Thumbnails);
      expect(node).toHaveLength(1);
    });

    it("has an button", () => {
      const { enzymeWrapper } = shallowSetup();
      var node = enzymeWrapper.find(Button);
      expect(node).toHaveLength(1);
    });
});