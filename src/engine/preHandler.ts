import { StatusCodes } from 'http-status-codes';
import { ConstantsService } from '../constants/constants';

class PreHandler {
  constructor() {}

  validateQueryParams(queryParams: any): Promise<any> {
    //console.log('queryParams.type == ConstantsService.all', queryParams.type == ConstantsService.all);
    return new Promise((resolve, reject) => {
      if (!queryParams.term) {
        reject({
          statusCode: StatusCodes.NOT_IMPLEMENTED,
          error: ConstantsService.QueryParamErrorTerm,
        });
      }
      if (queryParams.type) {
        if (
          !(
            queryParams.type == ConstantsService.all ||
            queryParams.type == ConstantsService.persons ||
            queryParams.type == ConstantsService.songs ||
            queryParams.type == ConstantsService.movies ||
            queryParams.type == ConstantsService.tvShows
          )
        ) {
          reject({
            statusCode: StatusCodes.NOT_IMPLEMENTED,
            error: ConstantsService.QueryParamErrorTypeNotValid + ': ' + queryParams.type,
          });
        }
      } else {
        reject({ statusCode: StatusCodes.NOT_IMPLEMENTED, error: ConstantsService.QueryParamErrorTypeMissing });
      }
      if (queryParams.orderBy) {
        if (
          !(
            queryParams.orderBy == ConstantsService.name ||
            queryParams.orderBy == ConstantsService.type ||
            queryParams.orderBy == ConstantsService.genre
          )
        ) {
          reject({
            statusCode: StatusCodes.NOT_IMPLEMENTED,
            error: ConstantsService.QueryParamErrorOrderByInvalid + ': ' + queryParams.orderBy,
          });
        }
      }
      if (queryParams.max) {
        try {
          if (parseInt(queryParams.max) < 0) {
            reject({
              statusCode: StatusCodes.NOT_IMPLEMENTED,
              error: ConstantsService.QueryParamErrorMaxPositive + ': ' + queryParams.max,
            });
          } else {
            if (isNaN(queryParams.max)) {
              reject({
                statusCode: StatusCodes.NOT_IMPLEMENTED,
                error: ConstantsService.QueryParamErrorMaxInvalid + ': ' + queryParams.max,
              });
            }
          }
        } catch (error) {
          reject({ statusCode: StatusCodes.NOT_IMPLEMENTED, error: ConstantsService.QueryParamErrorMaxInvalid + ': ' + queryParams.max });
        }
      }
      resolve({ statusCode: StatusCodes.OK });
    });
  }
}

export const preHandler = new PreHandler();
