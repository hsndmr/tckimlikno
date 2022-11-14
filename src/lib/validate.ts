import { Client } from './client';
import { TcKimlikNo, ValidateArgs } from './tc-kimlik-no';

const tcKimlikNoInstance = new TcKimlikNo(new Client());

export function validateTcKimlikNo(args: ValidateArgs): Promise<boolean> {
  return tcKimlikNoInstance.validate(args);
}

export function verifyTcKimlikNo(tcKimlikNo: string): boolean {
  return tcKimlikNoInstance.verify(tcKimlikNo);
}
