import { AxiosResponse } from 'axios';

import { TCKimlikNoValidate } from './tc-kimlik-no-validate.interface';

export interface BaseClient {
  post(args: TCKimlikNoValidate): Promise<AxiosResponse>;
  getBody(args: TCKimlikNoValidate): string;
}
