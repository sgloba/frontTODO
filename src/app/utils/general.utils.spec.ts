import { isEmail } from './general.util';

describe('isEmail', () => {





  it('should validate test emails', function () {
    const testEmails = [
      {email: 'asd', isValid: false},
      {email: '123', isValid: false},
      {email: 'a@sd', isValid: false},
      {email: 'as@d.saf', isValid: true},
    ]

    testEmails.forEach(({ email, isValid }) => {
      expect(isEmail(email)).toBe(isValid);
    })
  });
})
