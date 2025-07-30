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
exports.googleController = void 0;
const firebase_1 = require("../engine/firebase");
const http_status_codes_1 = require("http-status-codes");
const firestore_1 = require("firebase/firestore");
class GoogleController {
    getApiKey(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = firebase_1.fb.getDB();
                // Fetching the 'apiKey' document from the 'configuration' collection
                const apiKeyDocRef = (0, firestore_1.doc)(db, 'configuration', 'apiKey');
                const apiKeyDocSnapshot = yield (0, firestore_1.getDoc)(apiKeyDocRef);
                if (apiKeyDocSnapshot.exists()) {
                    const API_KEY = apiKeyDocSnapshot.data();
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        timestamp: Date.now(),
                        apiKey: API_KEY.value,
                    });
                }
                else {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        timestamp: Date.now(),
                        message: 'API key not found',
                    });
                }
            }
            catch (error) {
                console.error('Error fetching API key:', error);
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    timestamp: Date.now(),
                    message: 'Failed to fetch API key',
                    error: error.message,
                });
            }
        });
    }
}
exports.googleController = new GoogleController();
