"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeController = void 0;
const http_status_codes_1 = require("http-status-codes");
const code_1 = require("../engine/code");
class CodeController {
    gc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rnd = (Math.random() * 1000).toFixed(0);
            const residecenCode = req.query.residenceCode ? req.query.residenceCode : '';
            console.log('params', req.query);
            const c = code_1.code
                .getCode()
                .then((code) => {
                const params = { code: code.value + rnd.toString(), residecenCode };
                console.log('Code generated successfully: ', params);
                res.status(http_status_codes_1.StatusCodes.OK).json({ timestamp: Date.now(), code: params.code });
            })
                .catch((error) => {
                console.log('Error generating code for ' + residecenCode + ':', error);
            });
        });
    }
}
exports.codeController = new CodeController();
