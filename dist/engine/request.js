"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const http_status_codes_1 = require("http-status-codes");
const request_promise_1 = __importDefault(require("request-promise"));
const parser = require('xml-js');
class Request {
    constructor() { }
    apiRequest(url, contentType, method, args, responseType) {
        let options = {};
        //console.log('args0', args);
        if (contentType == 'multipart/form-data') {
            options = {
                uri: url,
                method: method,
                rejectUnauthorized: false,
                headers: {
                    'Content-type': contentType,
                },
                formData: args,
            };
        }
        else if (contentType == 'application/json') {
            let endpoint = '?';
            for (var x in args) {
                var attrValue = args[x];
                endpoint = endpoint + x + '=' + attrValue + '&';
            }
            endpoint = endpoint.substr(0, endpoint.length - 1);
            if (!endpoint || endpoint === 'null') {
                endpoint = '';
            }
            url = url + endpoint;
            if (method == 'GET') {
                options = {
                    uri: endpoint == url,
                    method: method,
                    rejectUnauthorized: false,
                    headers: {
                        'Content-type': contentType,
                    },
                };
            }
            else if (method == 'POST') {
                options = {
                    uri: url,
                    body: args,
                    method: method,
                    json: true,
                    headers: {
                        'Content-type': contentType,
                    },
                };
            }
        }
        //console.log('url', url);
        //console.log('options', JSON.stringify(options));
        return new Promise((resolve, reject) => {
            request_promise_1.default
                .get(url, options)
                .then((res) => {
                // console.log('res', res);
                if (responseType.toUpperCase() == 'JSON') {
                    return resolve({ statusCode: http_status_codes_1.StatusCodes.OK, data: JSON.parse(res) });
                }
                else if (responseType.toUpperCase() == 'XML') {
                    // console.log('resp', res);
                    let respJson = parser.xml2json(res, { compact: true, ignoreComment: true, space: 4 });
                    // console.log('respJson', res);
                    respJson = JSON.parse(respJson);
                    return resolve({
                        statusCode: http_status_codes_1.StatusCodes.OK,
                        data: [respJson],
                    });
                }
            })
                .catch((err) => {
                console.log('ERR', err);
                reject({ statusCode: 500, data: err });
            });
            // createFetch(base(h))
            //   .then(res => {
            //     return resolve({ statusCode: HttpStatus.OK, data: res });
            //   })
            //   .catch(err => {
            //     return reject(err);
            //   });
        });
    }
}
exports.request = new Request();
