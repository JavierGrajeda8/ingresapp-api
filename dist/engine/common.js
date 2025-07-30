"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.common = void 0;
class Common {
    constructor() { }
    compare(a, b, property) {
        if (a[property] < b[property]) {
            return -1;
        }
        if (a[property] > b[property]) {
            return 1;
        }
        return 0;
    }
    getErrorResponse(url, error) {
        return [
            {
                timestamp: Date.now(),
                provider: url,
                count: 0,
                error: error.toString(),
                statusCode: 500,
            },
        ];
    }
    getNotFoundResponse(url) {
        return [];
        // return [
        //     {
        //       timestamp: Date.now(),
        //       provider: url,
        //       count: 0,
        //       statusCode: 404,
        //     },
        //   ];
    }
    getGenericErrorResponse(statusCode, error) {
        return [
            {
                timestamp: Date.now(),
                statusCode: statusCode,
                error: error,
            },
        ];
    }
    queryParamsIn(inParams, params) {
        inParams = JSON.parse(inParams);
        let resp = {};
        for (var x in inParams) {
            var attrValue = inParams[x];
            //console.log('attrValue', attrValue);
            if (attrValue.type == 'constant') {
                resp[attrValue.object] = attrValue.value;
            }
            else if (attrValue.type == 'variable') {
                resp[attrValue.object] = params[attrValue.value];
            }
            // endpoint = endpoint + x + '=' + attrValue + '&';
        }
        //console.log('resp', resp);
        return resp;
        // { soap_method: 'GetListByName', name: req.query.term }
    }
    deepRoute(resp, resultRoute) {
        //console.log('resultRoute', resultRoute);
        try {
            if (resultRoute.length > 0) {
                if (resultRoute.indexOf('.') > 0) {
                    const route = resultRoute.split('.');
                    route.forEach((rt) => {
                        // console.log('route', rt);
                        // console.log('route', resp[rt]);
                        resp = resp[rt];
                    });
                    resp = resp;
                }
                else {
                    resp = resp[resultRoute];
                }
            }
            return resp;
        }
        catch (error) {
            //   console.log('resultRouteError', error);
            return resp;
        }
    }
    queryParamsOut(resp, resultRoute, outParams, url) {
        // console.log('resultRoute', resultRoute);
        // console.log('outParams', outParams);
        // console.log('resp', resp);
        let result = [];
        // try {
        //   if (resultRoute.length > 0) {
        //     if (resultRoute.indexOf('.') > 0) {
        //       const route = resultRoute.split('.');
        //       route.forEach((rt) => {
        //         // console.log('route', rt);
        //         // console.log('route', resp[rt]);
        //         resp = resp[rt];
        //       });
        //       resp = [resp];
        //     } else {
        //       resp = [resp[resultRoute]];
        //     }
        //   }
        // } catch (error) {
        //   console.log('resultRouteError', error);
        // }
        // console.log('resp', resp);
        let outParamsAux = JSON.parse(outParams);
        // console.log('outParamsAux', outParamsAux);
        try {
            resp.forEach((r0) => {
                let r = this.deepRoute(r0, resultRoute);
                //console.log('r', r);
                if (r) {
                    let attr = {};
                    for (var x in outParamsAux) {
                        var attrValue = outParamsAux[x];
                        //console.log('attrValue', attrValue);
                        //console.log('x', x);
                        try {
                            if (attrValue.type == 'variable' || attrValue.type == 'variableArray') {
                                if (!attrValue.sufix) {
                                    attr[x] = (attrValue.label ? attrValue.label : '') + r[attrValue.route].toString();
                                }
                                else {
                                    attr[x] = (attrValue.label ? attrValue.label : '') + r[attrValue.route][attrValue.sufix].toString();
                                }
                            }
                            else if (attrValue.type == 'constant') {
                                attr[x] = attrValue.value;
                            }
                            else if (attrValue.type == 'parent') {
                                attr[x] = url;
                            }
                            else {
                                attr[x] = '';
                            }
                        }
                        catch (error) {
                            console.log('error', error.toString());
                        }
                    }
                    result.push(attr);
                }
            });
            //   let resultAux = resp.map((obj: any) => {
            //     return outParamsAux.map((param: any) => {
            //       let id = param.id;
            //       return { id: obj[param.route][param.sufix] };
            //     });
            //   });
            //   console.log('resultAux', resultAux);
        }
        catch (error) {
            console.log('error', error);
        }
        console.log('result_', result);
        return result;
        //   return
        //   });
        //   let tmp =
        //     param.type == 'variable'
        //       ? resp.map((obj: any) => {
        //           if (param.label.length > 0) {
        //             return param.label + obj[param.route][param.sufix];
        //           } else {
        //             return obj[param.route][param.sufix];
        //           }
        //         })
        //       : param.type == 'parent'
        //       ? [url]
        //       : [param.value];
        //   console.log('tmp', tmp);
        // for (var x in outParamsAux) {
        //   let y = outParamsAux[x];
        //   console.log('y', y);
        // }
        // let rd: [] = resp.map((obj: any) => {
        //   return {
        //     name:
        //
        //     type: 'person',
        //     description: 'ID : ' + obj.PersonIdentification.ID._text + ' SSN : ' + obj.PersonIdentification.SSN._text,
        //     detail: ' BIRTHDAY : ' + obj.PersonIdentification.DOB._text,
        //     image: '',
        //     genre: '',
        //     provider: 'url + common.convertQueryParam(queryParams)',
        //   };
        // });
        // console.log('rd', rd);
        // return rd;
    }
    convertQueryParam(query) {
        // {"soap_method":"GetListByName","name":"peter"}
        const resp = this.replaceAll(this.replaceAll(this.replaceAll(this.replaceAll(JSON.stringify(query), '","', '&'), '":"', '='), '{"', '?'), '"}', '');
        try {
            return resp;
        }
        catch (error) {
            return '';
        }
    }
    replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }
}
exports.common = new Common();
