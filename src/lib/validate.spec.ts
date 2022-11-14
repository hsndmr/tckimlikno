import { validateTcKimlikNo, verifyTcKimlikNo } from './validate';

jest.mock('./tc-kimlik-no', () => {
  class MockTcKimlikNo {
    validate() {
      return Promise.resolve(true);
    }
    verify() {
      return true;
    }
  }
  return { TcKimlikNo: MockTcKimlikNo };
});

describe('validate', () => {
  it('validateTcKimlikNo', async () => {
    expect(
      await validateTcKimlikNo({
        name: 'HASAN',
        surname: 'DEMİR',
        tc: 10000000146,
        birthYear: 1900,
      })
    ).toEqual(true);
  });
  it('verifyTcKimlikNo', () => {
    expect(verifyTcKimlikNo('10000000146')).toEqual(true);
  });
});
