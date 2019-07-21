import { default as in_height_range } from "./index";
import { IUserDetails } from "../../../../types";

describe("Model:in_height_range", () => {
    it("should return in_height_range object", () => {
        expect(in_height_range).toEqual(expect.objectContaining({
            filter: expect.any(String),
            text: expect.any(String),
            value: expect.any(Array),
            max: expect.any(Number),
            min: expect.any(Number),
            func: expect.any(Function),
        }));
    });

    it("must contain property: height_in_cm", () => {
        expect(in_height_range.filter).toContain("height_in_cm");
    });

    it("filter function return false", () => {
        const el = {
            height_in_cm: 150
        };

        const mock = {
            in_height_range: {
                value: [155, 190]
            }
        };

        expect(in_height_range.func(el as IUserDetails, mock)).toBe(false);
    });

    it("filter function return true", () => {
        const el = {
            height_in_cm: 135
        };

        const mock = {
            in_height_range: {
                value: [135, 190]
            }
        };

        expect(in_height_range.func(el as IUserDetails, mock)).toBe(true);
    });
});