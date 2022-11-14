import axios from 'axios';

import { Client } from './client';
jest.mock('axios');

class AxiosMock {
  post() {
    return Promise.resolve('test');
  }
}

describe('Client', () => {
  const args = {
    name: 'name',
    surname: 'surname',
    tc: 11111111111,
    birthYear: 2000,
  };

  it('post method should return value', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (axios.create as any).mockReturnValue(new AxiosMock());

    const client = new Client();

    const result = await client.post(args);

    expect(result).toEqual('test');
  });

  it('getBody method should return soap body correctly', () => {
    const client = new Client();

    const result = client.getBody(args);

    expect(
      `<?xml version="1.0" encoding="utf-8"?>
            <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                <soap12:Body>
                    <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
                    <TCKimlikNo>11111111111</TCKimlikNo>
                    <Ad>name</Ad>
                    <Soyad>surname</Soyad>
                    <DogumYili>2000</DogumYili>
                    </TCKimlikNoDogrula>
                </soap12:Body>
            </soap12:Envelope>`
    ).toEqual(result);
  });
});
