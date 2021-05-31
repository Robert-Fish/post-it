/**
 * @jest-environment jsdom
 */

import { act, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React from "react";
import Home from "../../pages/index";
import { render } from "../test-utils";
import userListResponseExpanded from "../../mockResponses/useListMoreResults";
import userListResponse from "../../mockResponses/userListDefault";

const server = setupServer(
  rest.get("https://dummyapi.io/data/api/user", (req, res, ctx) => {
    const limit = req.url.searchParams.get("limit");

    if (limit === 20) {
      return res(ctx.status(200), ctx.json(userListResponseExpanded));
    } else {
      return res(ctx.status(200), ctx.json(userListResponse));
    }
  })
);

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});
afterEach(() => server.resetHandlers());

describe("Home", () => {
  test("should render a grid of 10 users as cards", async () => {
    const { getAllByTestId } = render(<Home />);
    await new Promise((r) => setTimeout(r, 1000));
    const users = getAllByTestId("profile");
    expect(users.length).toBe(10);
  });

  test("should render a load more button to load 1s0 more users into the existing user grid", async () => {
    const { getByTestId } = render(<Home />);
    await new Promise((r) => setTimeout(r, 1000));
    const loadMoreButton = getByTestId("load-more");
    expect(loadMoreButton).toBeInTheDocument();
  });

  test("should display 10 more users than currently show in user grid", async () => {
    const currentNoOfUsersInGrid = 10;
    const { getByText, getAllByTestId } = render(<Home />);
    await new Promise((r) => setTimeout(r, 1000));
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
    const searchedValue = "heinz-georg.fiedler@example.com";
    const { getByTestId, findByText, findByTestId } = render(<Home />);
    await new Promise((r) => setTimeout(r, 3000));
    const searchBar = getByTestId("searchbar");

    await act(async () => {
      fireEvent.change(searchBar, { target: { value: searchedValue } });
    });
    await new Promise((r) => setTimeout(r, 3000));

    const firstResult = findByTestId("profile");
    expect(firstResult).toBeVisible();
  });
});
