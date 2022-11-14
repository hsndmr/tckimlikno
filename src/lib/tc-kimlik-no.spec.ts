import { BaseClient } from './client.interface';
import { TcKimlikNo } from './tc-kimlik-no';
import { TCKimlikNoValidate } from './tc-kimlik-no-validate.interface';

class Client implements BaseClient {
  data = 'data<TCKimlikNoDogrulaResult>true</TCKimlikNoDogrulaResult>data';

  post(_: TCKimlikNoValidate): any {
    return {
      data: this.data,
    };
  }
  getBody(_: TCKimlikNoValidate): string {
    return 'body';
  }
}

const tcKimlikNo = new TcKimlikNo(new Client());

describe('TcKimlikNo@verify', () => {
  it('must contain only numbers', () => {
    expect(tcKimlikNo.verify('notNumber')).toBe(false);
  });

  it('returns false for more than 11 digits', () => {
    expect(tcKimlikNo.verify('123456789012')).toBe(false);
  });

  it('returns false for more than 11 digits', () => {
    expect(tcKimlikNo.verify('123456789012')).toBe(false);
  });

  it('returns false when number begins with 0', () => {
    expect(tcKimlikNo.verify('02345678901')).toBe(false);
  });

  it('returns false when last digit is odd', () => {
    expect(tcKimlikNo.verify('12345678901')).toBe(false);
    expect(tcKimlikNo.verify('12345678903')).toBe(false);
    expect(tcKimlikNo.verify('12345678905')).toBe(false);
    expect(tcKimlikNo.verify('12345678907')).toBe(false);
    expect(tcKimlikNo.verify('12345678909')).toBe(false);
  });

  it('tenth digit must be mod 10 of sum of odd digits multiplied by 7 minus even digits', () => {
    expect(tcKimlikNo.verify('11000000146')).toBe(false);
    expect(tcKimlikNo.verify('10000000146')).toBe(true);
  });

  it('eleventh digit must be mod 10 of sum of all digits plus 10th digit', () => {
    expect(tcKimlikNo.verify('11000000144')).toBe(false);
    expect(tcKimlikNo.verify('10000000146')).toBe(true);
  });
});

describe('TcKimlikNo@validate', () => {
  it('must be with a valid citizen number', async () => {
    const isValid = await tcKimlikNo.validate({
      name: 'HASAN',
      surname: 'DEMİR',
      tc: 1,
      birthYear: 1900,
    });
    expect(isValid).toBe(false);
  });

  it('must be with a valid name', async () => {
    const args = {
      name: '0',
      surname: 'DEMİR',
      tc: 10000000146,
      birthYear: 1900,
    };

    expect(await tcKimlikNo.validate(args)).toBe(false);

    expect(await tcKimlikNo.validate({ ...args, name: '!' })).toBe(false);
  });

  it('must be with a valid surname', async () => {
    const args = {
      name: 'HASAN',
      surname: '0',
      tc: 10000000146,
      birthYear: 1900,
    };

    expect(await tcKimlikNo.validate(args)).toBe(false);

    expect(await tcKimlikNo.validate({ ...args, surname: '!' })).toBe(false);
  });

  it('must be with a valid surname', async () => {
    const args = {
      name: 'HASAN',
      surname: '0',
      tc: 10000000146,
      birthYear: 1900,
    };

    expect(await tcKimlikNo.validate(args)).toBe(false);

    expect(await tcKimlikNo.validate({ ...args, surname: '!' })).toBe(false);
  });

  it('it must be with a valid birth year', async () => {
    const args = {
      name: 'HASAN',
      surname: 'DEMİR',
      tc: 10000000146,
      birthYear: 123,
    };

    expect(await tcKimlikNo.validate(args)).toBe(false);
  });

  it('dot character is allowed on name', async () => {
    const args = {
      name: 'H. HÜSEYİN',
      surname: 'DEMİR',
      tc: 10000000146,
      birthYear: 1900,
    };

    expect(await tcKimlikNo.validate(args)).toBe(true);
  });

  it('dot character is allowed on surname', async () => {
    const args = {
      name: 'HASAN',
      surname: 'D. DEMİR',
      tc: 10000000146,
      birthYear: 1900,
    };

    expect(await tcKimlikNo.validate(args)).toBe(true);
  });

  it('should return false from service', async () => {
    const client = new Client();

    client.data =
      'data<TCKimlikNoDogrulaResult>false</TCKimlikNoDogrulaResult>data';
    const tcKimlikNo = new TcKimlikNo(client);

    const args = {
      name: 'HASAN',
      surname: 'DEMİR',
      tc: 10000000146,
      birthYear: 1900,
    };

    expect(await tcKimlikNo.validate(args)).toBe(false);
  });
});
