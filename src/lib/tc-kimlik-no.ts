import { BaseClient } from './client.interface';
import { TCKimlikNoValidate } from './tc-kimlik-no-validate.interface';

export interface ValidateArgs extends TCKimlikNoValidate {
  autoUppercase?: boolean;
}

export class TcKimlikNo {
  constructor(private readonly client: BaseClient) {}

  async validate({
    name,
    surname,
    tc,
    birthYear,
    autoUppercase = true,
  }: ValidateArgs): Promise<boolean> {
    if (autoUppercase) {
      name = name.toLocaleUpperCase('tr-TR');
      surname = surname.toLocaleUpperCase('tr-TR');
    }

    if (name.match(/^[A-Z. ÇĞÖŞÜİ]+$/gm) === null) {
      return false;
    }

    if (surname.match(/^[A-Z. ÇĞÖŞÜİ]+$/gm) === null) {
      return false;
    }

    if (birthYear.toString().match(/^\d{4}$/gm) === null) {
      return false;
    }

    if (!this.verify(tc.toString())) {
      return false;
    }

    const response = await this.client.post({ name, surname, tc, birthYear });

    return (
      response.data.match(
        '<TCKimlikNoDogrulaResult>true</TCKimlikNoDogrulaResult>'
      ) !== null
    );
  }

  verify(tcKimlikNo: string) {
    if (tcKimlikNo.length !== 11) {
      return false;
    }

    if (tcKimlikNo.match(/^[1-9]{1}[0-9]{9}[0,2,4,6,8]{1}/gm) === null) {
      return false;
    }

    const checksumDigits = this.generateChecksumDigits(tcKimlikNo);

    if (checksumDigits[0] !== tcKimlikNo[9]) {
      return false;
    }

    if (checksumDigits[1] !== tcKimlikNo[10]) {
      return false;
    }

    return true;
  }

  // Generates Checksum Digits from the first 9 Digits.
  generateChecksumDigits(tcKimlikNo: string): string {
    const oddDigitsSum =
      parseInt(tcKimlikNo[0]) +
      parseInt(tcKimlikNo[2]) +
      parseInt(tcKimlikNo[4]) +
      parseInt(tcKimlikNo[6]) +
      parseInt(tcKimlikNo[8]);

    const evenDigitsSum =
      parseInt(tcKimlikNo[1]) +
      parseInt(tcKimlikNo[3]) +
      parseInt(tcKimlikNo[5]) +
      parseInt(tcKimlikNo[7]);

    let digit10 = (oddDigitsSum * 7 - evenDigitsSum) % 10;
    const digit11 = (oddDigitsSum + evenDigitsSum + digit10) % 10;

    if (digit10 < 0) {
      digit10 += 10;
    }

    return digit10.toString() + digit11.toString();
  }
}
