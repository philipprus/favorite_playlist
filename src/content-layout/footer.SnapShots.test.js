import React from "react";
import Footer from "./footer";
import renderer from "react-test-renderer";

it("render footer correctly", () => {
    const tree = renderer.create(<Footer/>).toJSON();

    expect(tree).toMatchSnapshot();

})