import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { BaseClient } from './client.interface';
import { TCKimlikNoValidate } from './tc-kimlik-no-validate.interface';

export class Client implements BaseClient {
  _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create({
      baseURL: 'https://tckimlik.nvi.gov.tr/service/kpspublic.asmx?WSDL',
      headers: { 'Content-Type': 'application/soap+xml' },
    });
  }

  post(args: TCKimlikNoValidate): Promise<AxiosResponse> {
    return this._axiosInstance.post('', this.getBody(args));
  }

  getBody({ name, surname, tc, birthYear }: TCKimlikNoValidate) {
    return `<?xml version="1.0" encoding="utf-8"?>
            <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                <soap12:Body>
                    <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
                    <TCKimlikNo>${tc}</TCKimlikNo>
                    <Ad>${name}</Ad>
                    <Soyad>${surname}</Soyad>
                    <DogumYili>${birthYear}</DogumYili>
                    </TCKimlikNoDogrula>
                </soap12:Body>
            </soap12:Envelope>`;
  }
}
