import { default as has_contact } from "./index";
import { IUserDetails } from '../../../../types';

describe('Model:has_contact', () => {
  it('should return has_contact object', () => {
    expect(has_contact).toEqual(expect.objectContaining({
      filter: expect.any(String),
      text: expect.any(String),
      value: expect.any(Boolean),
      func: expect.any(Function),
    }));
  });

  it('must contain property: contacts_exchanged', () => {
    expect(has_contact.filter).toContain('contacts_exchanged');
  });

  it('filter function return false', () => {
    const el = {
      contacts_exchanged: 0
    }

    expect(has_contact.func(el as IUserDetails)).toBe(false);
  });

  it('filter function return true', () => {
    const el = {
      contacts_exchanged: 99
    }

    expect(has_contact.func(el as IUserDetails)).toBe(true);
  });
});