"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSoap = void 0;
const http_status_codes_1 = require("http-status-codes");
const soap = require('soap-as-promise');
class RequestSoap {
    constructor() { }
    request(wsdl, args, methodName) {
        new Promise((resolve, reject) => {
            soap
                .createClient(wsdl)
                .then((client) => {
                return client[methodName](args);
            })
                .then((res) => {
                return resolve({ statusCode: http_status_codes_1.StatusCodes.OK, data: res });
            })
                .catch((err) => {
                return reject(err);
            });
        });
    }
}
exports.requestSoap = new RequestSoap();
