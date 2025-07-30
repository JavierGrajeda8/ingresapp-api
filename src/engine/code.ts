import { fb } from '../engine/firebase';
import { Configuration } from '../models/configuration';
import { getFirestore, collection, doc, setDoc, updateDoc, deleteDoc, getDoc, query, where, getDocs } from 'firebase/firestore';


class Code {
  constructor() {}

  public async getCode(): Promise<any> {
    try {
      const db = fb.getDB();
  
      // Fetching the 'random' document from the 'configuration' collection
      const randomDocRef = doc(db, 'configuration', 'random');
      const randomDocSnapshot = await getDoc(randomDocRef);
  
      // console.log(randomDocSnapshot.exists());
      // console.log(randomDocSnapshot.data());
  
      if (!randomDocSnapshot.exists()) {
        throw new Error('Random configuration document does not exist.');
      }
  
      const d = randomDocSnapshot.data() as Configuration;
      const rnd = (Math.random() * parseInt(d.value, 10)).toFixed(0);
  
      // Fetching the randomly generated document from the 'code' collection
      const codeDocRef = doc(db, 'code', rnd.toString());
      const codeDocSnapshot = await getDoc(codeDocRef);
  
      // console.log(codeDocSnapshot.exists());
  
      if (codeDocSnapshot.exists()) {
        return codeDocSnapshot.data();
      } else {
        throw new Error('Code document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching code:', error);
      throw error;
    }
  }

  public getCodeInstance() {
    let code = new Code();
    return code;
  }
}

export const code = new Code();
