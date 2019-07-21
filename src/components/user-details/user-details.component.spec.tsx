import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TestRenderer, { create } from "react-test-renderer";
import UserDetails from "./user-details.component";
import { shallow } from "enzyme";
import { UserProps } from "../../types";

describe("<UserDetails /> spec", () => {
  it("Snapshot:check the component", () => {
    const props: UserProps = {
        details: {
            display_name: "Chuck",
            age: 33,
            job_title: "Ninja",
            height_in_cm: 170,
            city: {
              name: "New York",
              lat: 54.00,
              lon: -0.118092
            },
            compatibility_score: 3,
            contacts_exchanged: 0,
            favourite: false,
            religion: "Jew",
        }
    };

      const container = TestRenderer.create(<UserDetails {...props}></UserDetails>);
      expect(container).toMatchSnapshot();
  });
});