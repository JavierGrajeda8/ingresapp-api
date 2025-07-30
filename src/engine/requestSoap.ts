import { StatusCodes } from 'http-status-codes';
const soap = require('soap-as-promise');

class RequestSoap {
  constructor() {}

  request(wsdl: string, args: string, methodName: string) {
    new Promise((resolve, reject) => {
      soap
        .createClient(wsdl)
        .then((client: any) => {
          return client[methodName](args);
        })
        .then((res: any) => {
          return resolve({ statusCode: StatusCodes.OK, data: res });
        })
        .catch((err: any) => {
          return reject(err);
        });
    });
  }
}

export const requestSoap = new RequestSoap();
