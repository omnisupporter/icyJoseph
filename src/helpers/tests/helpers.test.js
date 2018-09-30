import { shouldFetch, setUpMediaQuery } from "../";

describe("shouldFetch", () => {
  const expiry = "2018-06-11T04:49:03.603Z";
  const veryLateDate = "9999-06-11T05:49:03.603Z";

  it("evaluates if now > expiry", () => {
    expect(shouldFetch(expiry)).toEqual(true);
  });
  it("evaluates true if expiry is undefined", () => {
    expect(shouldFetch(undefined)).toEqual(true);
  });
  it("evaluates expiry < now", () => {
    expect(shouldFetch(veryLateDate)).toEqual(false);
  });
});

describe("setUpMediaQuery", () => {
  it("uses the window", () => {
    const ctx = {
      updateMatches: jest.fn(),
      props: {}
    };
    setUpMediaQuery.bind(ctx)("some query");
    expect(ctx.updateMatches).toHaveBeenCalled();
  });
});
