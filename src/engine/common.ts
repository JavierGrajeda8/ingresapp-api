class Common {
  constructor() {}

  public compare(a: any, b: any, property: string) {
    if (a[property] < b[property]) {
      return -1;
    }
    if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  }

  public getErrorResponse(url: string, error: any) {
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

  public getNotFoundResponse(url: string) {
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

  public getGenericErrorResponse(statusCode: number, error: string) {
    return [
      {
        timestamp: Date.now(),
        statusCode: statusCode,
        error: error,
      },
    ];
  }

  public queryParamsIn(inParams: any, params: any) {
    inParams = JSON.parse(inParams);
    let resp: any = {};
    for (var x in inParams) {
      var attrValue = inParams[x];
      //console.log('attrValue', attrValue);
      if (attrValue.type == 'constant') {
        resp[attrValue.object] = attrValue.value;
      } else if (attrValue.type == 'variable') {
        resp[attrValue.object] = params[attrValue.value];
      }
      // endpoint = endpoint + x + '=' + attrValue + '&';
    }
    //console.log('resp', resp);
    return resp;
    // { soap_method: 'GetListByName', name: req.query.term }
  }

  public deepRoute(resp: any, resultRoute: string) {
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
        } else {
          resp = resp[resultRoute];
        }
      }
      return resp;
    } catch (error) {
    //   console.log('resultRouteError', error);
      return resp;
    }
  }

  public queryParamsOut(resp: any, resultRoute: string, outParams: any, url: string) {
    // console.log('resultRoute', resultRoute);
    // console.log('outParams', outParams);
    // console.log('resp', resp);
    let result: any = [];
    
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
      resp.forEach((r0: any) => {
        let r = this.deepRoute(r0, resultRoute);
        //console.log('r', r);
        if (r) {
          let attr: any = {};
          for (var x in outParamsAux) {
            var attrValue = outParamsAux[x];
            //console.log('attrValue', attrValue);
            //console.log('x', x);
            try {
              if (attrValue.type == 'variable' || attrValue.type == 'variableArray') {
                if (!attrValue.sufix) {
                  attr[x] = (attrValue.label ? attrValue.label : '') + r[attrValue.route].toString();
                } else {
                  attr[x] = (attrValue.label ? attrValue.label : '') + r[attrValue.route][attrValue.sufix].toString();
                }
              } else if (attrValue.type == 'constant') {
                attr[x] = attrValue.value;
              } else if (attrValue.type == 'parent') {
                attr[x] = url;
              } else {
                attr[x] = '';
              }
            } catch (error: any) {
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
    } catch (error) {
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

  public convertQueryParam(query: Object) {
    // {"soap_method":"GetListByName","name":"peter"}
    const resp = this.replaceAll(
      this.replaceAll(this.replaceAll(this.replaceAll(JSON.stringify(query), '","', '&'), '":"', '='), '{"', '?'),
      '"}',
      ''
    );
    try {
      return resp;
    } catch (error) {
      return '';
    }
  }

  private replaceAll(string: string, search: string, replace: string) {
    return string.split(search).join(replace);
  }

}

export const common = new Common();
