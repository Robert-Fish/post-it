/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../../test-utils";
import Posts from "../../../pages/posts/index";

describe("Posts", () => {
  it("should render posts", () => {
    render(<Posts />);
  });
});
