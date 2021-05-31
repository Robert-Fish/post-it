/**
 * @jest-environment jsdom
 */

import { rest } from "msw";
import { setupServer } from "msw/node";
import * as nextRouter from "next/router";
import React from "react";
import postList from "../../../mockResponses/postListDefault";
import Comments from "../../../pages/comments";
import { render } from "../../test-utils";

const server = setupServer(
  rest.get("https://dummyapi.io/data/api/user", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postList));
  })
);

beforeAll(() => {
  server.listen();
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: "/posts",
    query: {
      byUser: "6wy6UNkZueJfIUfq88d5",
    },
  }));
});
afterAll(() => {
  server.close();
});
afterEach(() => server.resetHandlers());

describe("Comments", () => {
  test("should render list of comment cards", () => {
    const { getAllByTestId } = render(<Comments />);
    const comments = getAllByTestId("comment");
    expect(comments.length).toBeEqual(5);
  });

  test("should back button to return home", () => {
    const { getByTestId } = render(<Comments />);
    const backButton = getByTestId("back");
    expect(backButton).toBeVisible();
    expect(backButton).toHaveAttribute("href", "/");
  });

  test("should display profile image in comment card", () => {
    const { getByTestId } = render(<Comments />);
    const backButton = getByTestId("profile-image");
    expect(backButton).toBeVisible();
  });

  test("should display profile name in comment card", () => {
    const { getByTestId } = render(<Comments />);
    const profileName = getByTestId("profile-name");
    expect(profileName).toBeVisible();
  });

  test("should display comment publish date in comment card", () => {
    const { getByTestId } = render(<Comments />);
    const publishDate = getByTestId("comment-publish-date");
    expect(publishDate).toBeVisible();
  });

  test("should display comment text in comment card", () => {
    const { getByTestId } = render(<Comments />);
    const commentText = getByTestId("comment-text");
    expect(commentText).toBeVisible();
  });
});
