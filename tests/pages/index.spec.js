/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../test-utils";
import Home from "../../pages/index";
import { act, fireEvent } from "@testing-library/react";

describe("Home", () => {
  test("should render a grid of 10 users as cards", () => {
    const { getAllByTestId } = render(<Home />);
    const profiles = getAllByTestId("profile");
    expect(profiles.length).toBe(10);
  });

  test("should render a load more button to load 10 more users into the existing user grid", () => {
    const { getByText } = render(<Home />);
    const loadMoreButton = getByText("Load More");
    expect(loadMoreButton).toBeVisible();
  });

  test("should display 10 more users than currently show in user grid", async () => {
    const currentNoOfUsersInGrid = 10;
    const { getByText } = render(<Home />);
    const loadMoreButton = getByText("Load More");

    await act(async () => {
      fireEvent.click(loadMoreButton);
    });

    const profiles = getAllByTestId("profile");

    expect(profiles.length).toBe(currentNoOfUsersInGrid + 10);
  });

  test("should render a search bar", () => {
    const { getByTestId } = render(<Home />);
    const searchBar = getByTestId("searchbar");

    expect(searchBar).toBeVisible();
  });

  test("should render a list of users that must contain the first name or last name of the searched value in the search bar", async () => {
    const searchedValue = "jim";
    const { getByTestId, findByText } = render(<Home />);
    const searchBar = getByTestId("searchbar");

    await act(async () => {
      fireEvent.change(searchBar, { target: { value: searchedValue } });
    });

    const firstResult = findByText("jim");
    expect(firstResult).toBeVisible();
  });

  test("should render a list of users that must contain the email of the searched value in the search bar", async () => {
    const searchedValue = "jim@example.com";
    const { getByTestId, findByText } = render(<Home />);
    const searchBar = getByTestId("searchbar");

    await act(async () => {
      fireEvent.change(searchBar, { target: { value: searchedValue } });
    });

    const firstResult = findByText("jim");
    expect(firstResult).toBeVisible();
  });
});
