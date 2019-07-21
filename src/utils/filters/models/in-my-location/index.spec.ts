import { default as in_my_location } from "./index";
import { IUserDetails } from '../../../../types';

describe('Model:in_my_location', () => {
  it('should return in_my_location object', () => {
    expect(in_my_location).toEqual(expect.objectContaining({
      filter: expect.any(String),
      text: expect.any(String),
      value: expect.any(Boolean),
      func: expect.any(Function),
    }));
  });

  it('must contain property: city_name', () => {
    expect(in_my_location.filter).toContain('city_name');
  });

  it('filter function return true', () => {
    const el = {
      city: {
        name: 'London'
      }
    }

    expect(in_my_location.func(el as IUserDetails)).toBe(true);
  });
});