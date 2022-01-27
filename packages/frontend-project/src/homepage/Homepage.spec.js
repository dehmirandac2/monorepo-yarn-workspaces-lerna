import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import Homepage from ".";

describe("Homepage", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<Homepage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
