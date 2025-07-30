"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../constants/constants");
class PreHandler {
    constructor() { }
    validateQueryParams(queryParams) {
        //console.log('queryParams.type == ConstantsService.all', queryParams.type == ConstantsService.all);
        return new Promise((resolve, reject) => {
            if (!queryParams.term) {
                reject({
                    statusCode: http_status_codes_1.StatusCodes.NOT_IMPLEMENTED,
                    error: constants_1.ConstantsService.QueryParamErrorTerm,
                });
            }
            if (queryParams.type) {
                if (!(queryParams.type == constants_1.ConstantsService.all ||
                    queryParams.type == constants_1.ConstantsService.persons ||
                    queryParams.type == constants_1.ConstantsService.songs ||
                    queryParams.type == constants_1.ConstantsService.movies ||
                    queryParams.type == constants_1.ConstantsService.tvShows)) {
                    reject({
                        statusCode: http_status_codes_1.StatusCodes.NOT_IMPLEMENTED,
                        error: constants_1.ConstantsService.QueryParamErrorTypeNotValid + ': ' + queryParams.type,
                    });
                }
            }
            else {
                reject({ statusCode: http_status_codes_1.StatusCodes.NOT_IMPLEMENTED, error: constants_1.ConstantsService.QueryParamErrorTypeMissing });
            }
            if (queryParams.orderBy) {
                if (!(queryParams.orderBy == constants_1.ConstantsService.name ||
                    queryParams.orderBy == constants_1.ConstantsService.type ||
                    queryParams.orderBy == constants_1.ConstantsService.genre)) {
                    reject({
                        statusCode: http_status_codes_1.StatusCodes.NOT_IMPLEMENTED,
                        error: constants_1.ConstantsService.QueryParamErrorOrderByInvalid + ': ' + queryParams.orderBy,
                    });
                }
            }
            if (queryParams.max) {
                try {
                    if (parseInt(queryParams.max) < 0) {
                        reject({
                            statusCode: http_status_codes_1.StatusCodes.NOT_IMPLEMENTED,
                            error: constants_1.ConstantsService.QueryParamErrorMaxPositive + ': ' + queryParams.max,
                        });
                    }
                    else {
                        if (isNaN(queryParams.max)) {
                            reject({
                                statusCode: http_status_codes_1.StatusCodes.NOT_IMPLEMENTED,
                                error: constants_1.ConstantsService.QueryParamErrorMaxInvalid + ': ' + queryParams.max,
                            });
                        }
                    }
                }
                catch (error) {
                    reject({ statusCode: http_status_codes_1.StatusCodes.NOT_IMPLEMENTED, error: constants_1.ConstantsService.QueryParamErrorMaxInvalid + ': ' + queryParams.max });
                }
            }
            resolve({ statusCode: http_status_codes_1.StatusCodes.OK });
        });
    }
}
exports.preHandler = new PreHandler();
