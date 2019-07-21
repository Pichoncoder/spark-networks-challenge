import React from "react";
import TestRenderer, { create } from "react-test-renderer";
import FilterRange from "./filter-range.component";

describe("<FilterRange /> spec", () => {
  it("Snapshot:renders the component", () => {
    const props: any = { handleRange: () => true, text: "Age", filter: "height_in_cm", value: [], min: 18 , max: 99 } ;

      const container = TestRenderer.create(<FilterRange {...props}></FilterRange>);
      expect(container).toMatchSnapshot();
  });
});  