export namespace ConstantsService {
    export const all = '0';
    export const songs = '1';
    export const movies = '2';
    export const tvShows = '3';
    export const persons = '4';
    export const name = 'name';
    export const type = 'type';
    export const genre = 'genre';

    export const QueryParamErrorTerm = 'The parameter \'term\' is missing';
    export const QueryParamErrorTypeNotValid = 'The parameter \'type\' is not valid';
    export const QueryParamErrorTypeMissing = 'The parameter \'type\'  is missing';
    export const QueryParamErrorOrderByInvalid = 'The parameter \'orderBy\' is not valid';
    export const QueryParamErrorMaxPositive = 'The parameter \'max\' must be a positive integer number';
    export const QueryParamErrorMaxInvalid = 'The parameter \'max\' is not a number, please check';

    export const orderByDefault = name;
    export const maxDefault = 50;
}