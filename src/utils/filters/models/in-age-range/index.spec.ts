import { default as in_age_range } from "./index";
import { IUserDetails } from '../../../../types';

describe('Model:in_age_range', () => {
    it('should return in_age_range object', () => {
        expect(in_age_range).toEqual(expect.objectContaining({
            filter: expect.any(String),
            text: expect.any(String),
            value: expect.any(Array),
            max:expect.any(Number),
            min:expect.any(Number),
            func: expect.any(Function),
        }));
    })

    it('must contain property: age', () => {
        expect(in_age_range.filter).toContain('age');
    });

    it('filter function return false', () => {
        const el = {
            age: 33
        }

        const mock = {
            in_age_range: {
                value: [34, 44]
            }
        }

        expect(in_age_range.func(el as IUserDetails, mock)).toBe(false);
    });

    it('filter function return true', () => {
        const el = {
            age: 33
        }

        const mock = {
            in_age_range: {
                value: [22, 50]
            }
        }
        expect(in_age_range.func(el as IUserDetails, mock)).toBe(true);
    });
});