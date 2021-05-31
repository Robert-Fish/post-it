/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../test-utils";
import Home from "../../pages/index";

describe("Home", () => {
  test("should render a grid of 10 users as cards", async () => {
    await render(<Home />);
  });
});
