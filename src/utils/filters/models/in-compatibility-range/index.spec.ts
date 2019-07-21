import { default as in_compatibility_range } from "./index";
import { IUserDetails } from "../../../../types";

describe("Model:in_compatibility_range", () => {
    it("should return in_compatibility_range object", () => {
        expect(in_compatibility_range).toEqual(expect.objectContaining({
            filter: expect.any(String),
            text: expect.any(String),
            value: expect.any(Array),
            max: expect.any(Number),
            min: expect.any(Number),
            func: expect.any(Function),
        }));
    });

    it("must contain property: compatibility_score", () => {
        expect(in_compatibility_range.filter).toContain("compatibility_score");
    });

    it("filter function return false", () => {
        const el = {
            compatibility_score: 50
        };

        const mock = {
            in_compatibility_range: {
                value: [55, 80]
            }
        };

        expect(in_compatibility_range.func(el as IUserDetails, mock)).toBe(false);
    });

    it("filter function return true", () => {
        const el = {
            compatibility_score: 95
        };

        const mock = {
            in_compatibility_range: {
                value: [50, 99]
            }
        };

        expect(in_compatibility_range.func(el as IUserDetails, mock)).toBe(true);
    });
});