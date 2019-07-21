import { default as is_favourite } from "./index";
import { IUserDetails } from "../../../../types";

describe("Model:is_favourite", () => {
  it("should return is_favourite object", () => {
    expect(is_favourite).toEqual(expect.objectContaining({
      filter: expect.any(String),
      text: expect.any(String),
      value: expect.any(Boolean),
      func: expect.any(Function),
    }));
  });

  it("must contain property: favourite", () => {
    expect(is_favourite.filter).toContain("favourite");
  });

  it("filter function return false", () => {
    const el = {
        favourite: false
    };

    expect(is_favourite.func(el as IUserDetails)).toBe(false);
  });

  it("filter function return true", () => {
    const el = {
        favourite: true
    };

    expect(is_favourite.func(el as IUserDetails)).toBe(true);
  });
});