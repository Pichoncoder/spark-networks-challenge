import { default as has_photo } from "./index";
import { IUserDetails } from '../../../../types';

describe('Model:has_photo', () => {
  it('should return has_photo object', () => {
    expect(has_photo).toEqual(expect.objectContaining({
      filter: expect.any(String),
      text: expect.any(String),
      value: expect.any(Boolean),
      func: expect.any(Function),
    }));
  })

  it('must contain property: main_photo', () => {
    expect(has_photo.filter).toContain('main_photo');
  });

  it('filter function return false', () => {
    const el = {
      main_photo: ''
    }

   expect(has_photo.func(el as IUserDetails)).toBe(false);
  });

  it('filter function return true', () => {
    const el = {
      main_photo: 'img.png'
    }

   expect(has_photo.func(el as IUserDetails)).toBe(true);
  });
});