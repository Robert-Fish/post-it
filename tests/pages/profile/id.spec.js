/**
 * @jest-environment jsdom
 */

import { act, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React from "react";
import { render } from "../../test-utils";
import userListResponseExpanded from "../../../mockResponses/useListMoreResults";
import userListResponse from "../../../mockResponses/userListDefault";
import ProfileDetail from "../../../pages/profile/[id]";

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

describe("Profile Detail", () => {
  test("should render a profile card", () => {

    const { getByText, getByTestId } = render(<ProfileDetail user={} />);
  });
});
