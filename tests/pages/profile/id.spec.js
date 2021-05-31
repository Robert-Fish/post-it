/**
 * @jest-environment jsdom
 */

import React from "react";
import user from "../../../mockResponses/user";
import ProfileDetail from "../../../pages/profile/[id]";
import { render } from "../../test-utils";

describe("Profile Detail", () => {
  test("should render a home link with a valid href", () => {
    const { getByText, getByTestId } = render(<ProfileDetail user={user} />);
    const goBackBtn = getByText("Home");

    expect(goBackBtn).toHaveAttribute("href", "/");
  });

  test("should render a view posts link with a valid href", () => {
    const { getByText, getByTestId } = render(<ProfileDetail user={user} />);
    const goBackBtn = getByText("View Posts");

    expect(goBackBtn).toHaveAttribute("href", `/posts?byUser=${user.id}`);
  });

  test("should render the profile image", () => {
    const { getByText, getByTestId } = render(<ProfileDetail user={user} />);
    const image = getByTestId("profile-image");
    expect(image).toBeVisible();
  });

  test("should render the profile name", () => {
    const { getByText, getByTestId } = render(<ProfileDetail user={user} />);
    const image = getByTestId("profile-name");
    expect(image).toBeVisible();
  });

  test("should render the profile gender", () => {
    const { getByText, getByTestId } = render(<ProfileDetail user={user} />);
    const image = getByTestId("profile-gender");
    expect(image).toBeVisible();
  });

  test("should render the profile container", () => {
    const { getByText, getByTestId } = render(<ProfileDetail user={user} />);
    const image = getByTestId("profile-container");
    expect(image).toBeVisible();
  });
});
