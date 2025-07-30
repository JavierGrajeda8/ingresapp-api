"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fb = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
class Firebase {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyCCtejiJvqg3n0Xf76CDhJQ7lCoOLz1iY0",
            authDomain: "ingresapp-jg.firebaseapp.com",
            databaseURL: "https://ingresapp-jg.firebaseio.com",
            projectId: "ingresapp-jg",
            storageBucket: "ingresapp-jg.appspot.com",
            messagingSenderId: "327251504047",
            appId: "1:327251504047:web:7946057a40aee3412f9d5a",
            measurementId: "G-HJ5VCSTSWD"
        };
        this.app = (0, app_1.initializeApp)(firebaseConfig);
    }
    getDB() {
        return (0, firestore_1.getFirestore)(this.app);
    }
    getMsg() {
        return null;
    }
}
exports.fb = new Firebase();
