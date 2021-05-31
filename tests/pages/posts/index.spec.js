/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "../../test-utils";
import Posts from "../../../pages/posts/[id[";
import { rest } from "msw";
import { setupServer } from "msw/node";
import * as nextRouter from "next/router";
import postList from "../../../mockResponses/postListDefault";

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

describe("Posts", () => {
  test("should render posts page with back button with valid href", async () => {
    const { getByText, getByTestId } = render(<Posts />);
    await new Promise((r) => setTimeout(r, 5000));
    const backButton = getByTestId("back");
    expect(backButton).toBeVisible();
    expect(backButton).toHaveAttribute("href", "/");
  });
});
