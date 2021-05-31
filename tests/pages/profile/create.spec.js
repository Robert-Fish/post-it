/**
 * @jest-environment jsdom
 */

import { act, fireEvent } from "@testing-library/react";
import React from "react";
import CreateProfile from "../../../pages/profile/create";
import { render } from "../../test-utils";

describe("Profile Detail", () => {
  test("should render a home link with a valid href", () => {
    const { getByText, getByTestId } = render(<CreateProfile />);
    const goBackBtn = getByText("Back");

    expect(goBackBtn).toHaveAttribute("href", "/");
  });

  test("should render a heading saying create profile", () => {
    const { getByText, getByTestId } = render(<CreateProfile />);
    const heading = getByText("Create Profile");

    expect(heading).toBeVisible();
  });

  test("should render the form", () => {
    const { getByText, getByTestId } = render(<CreateProfile />);
    const form = getByTestId("profile-form");
    expect(form).toBeVisible();
  });

  test("should show an error if first name is invalid", () => {
    const { getByText, getByTestId } = render(<CreateProfile />);
    const firstNameField = getByTestId("profile-form-firstName");

    act(() => {
      fireEvent.change(firstNameField, { target: { value: "j" } });
    });
    const error = getByTestId("profile-form-firstname-error");
    expect(error).toBeVisible();
  });

  test("should show an error if last name is invalid", () => {
    const { getByText, getByTestId } = render(<CreateProfile />);
    const lastNameField = getByTestId("profile-form-lastName");

    act(() => {
      fireEvent.change(lastNameField, { target: { value: "de" } });
    });
    const error = getByTestId("profile-form-lastname-error");
    expect(error).toBeVisible();
  });

  test("should show an error if email is invalid", () => {
    const { getByText, getByTestId } = render(<CreateProfile />);
    const emailField = getByTestId("profile-form-email");

    act(() => {
      fireEvent.change(emailField, { target: { value: "dsadadsade" } });
    });
    const error = getByTestId("profile-form-email-error");
    expect(error).toBeVisible();
  });

  test("should show an error if gender is not select", () => {
    const { getByText, getByTestId } = render(<CreateProfile />);

    const error = getByTestId("profile-form-gender-error");
    expect(error).toBeVisible();
  });

  test("should show an error if mobile is invalid", () => {
    const { getByText, getByTestId } = render(<CreateProfile />);
    const mobileField = getByTestId("profile-form-mobile");

    act(() => {
      fireEvent.change(mobileField, { target: { value: "223df" } });
    });
    const error = getByTestId("profile-form-mobile-error");
    expect(error).toBeVisible();
  });

  test("should show an error if dob is invalid", () => {
    const { getByText, getByTestId } = render(<CreateProfile />);
    const dobField = getByTestId("profile-dob-email");

    act(() => {
      fireEvent.change(dobField, { target: { value: "22dasd" } });
    });
    const error = getByTestId("profile-form-dob-error");
    expect(error).toBeVisible();
  });
});
