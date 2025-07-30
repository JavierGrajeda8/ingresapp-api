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
exports.code = void 0;
const firebase_1 = require("../engine/firebase");
const firestore_1 = require("firebase/firestore");
class Code {
    constructor() { }
    getCode() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = firebase_1.fb.getDB();
                // Fetching the 'random' document from the 'configuration' collection
                const randomDocRef = (0, firestore_1.doc)(db, 'configuration', 'random');
                const randomDocSnapshot = yield (0, firestore_1.getDoc)(randomDocRef);
                // console.log(randomDocSnapshot.exists());
                // console.log(randomDocSnapshot.data());
                if (!randomDocSnapshot.exists()) {
                    throw new Error('Random configuration document does not exist.');
                }
                const d = randomDocSnapshot.data();
                const rnd = (Math.random() * parseInt(d.value, 10)).toFixed(0);
                // Fetching the randomly generated document from the 'code' collection
                const codeDocRef = (0, firestore_1.doc)(db, 'code', rnd.toString());
                const codeDocSnapshot = yield (0, firestore_1.getDoc)(codeDocRef);
                // console.log(codeDocSnapshot.exists());
                if (codeDocSnapshot.exists()) {
                    return codeDocSnapshot.data();
                }
                else {
                    throw new Error('Code document does not exist.');
                }
            }
            catch (error) {
                console.error('Error fetching code:', error);
                throw error;
            }
        });
    }
    getCodeInstance() {
        let code = new Code();
        return code;
    }
}
exports.code = new Code();
