import { FirebaseApp, initializeApp } from "firebase/app";import {getFirestore} from 'firebase/firestore'
import getAnalytics from 'firebase/analytics';

class Firebase {

  private app: FirebaseApp;

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

    this.app = initializeApp(firebaseConfig);
  }

  getDB() {
    return getFirestore(this.app);
  }

  getMsg() {
    return null;
  }
}
export const fb = new Firebase();