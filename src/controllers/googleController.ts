import { Request, Response } from 'express';
import { fb } from '../engine/firebase';
import { StatusCodes } from 'http-status-codes';
import { doc, getDoc } from 'firebase/firestore';

class GoogleController {
  
  public async getApiKey(req: Request, res: Response): Promise<void> {
    try {
      const db = fb.getDB();
  
      // Fetching the 'apiKey' document from the 'configuration' collection
      const apiKeyDocRef = doc(db, 'configuration', 'apiKey');
      const apiKeyDocSnapshot = await getDoc(apiKeyDocRef);
  
      if (apiKeyDocSnapshot.exists()) {
        const API_KEY = apiKeyDocSnapshot.data() as any;
        res.status(StatusCodes.OK).json({
          timestamp: Date.now(),
          apiKey: API_KEY.value,
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          timestamp: Date.now(),
          message: 'API key not found',
        });
      }
    } catch (error: any) {
      console.error('Error fetching API key:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        message: 'Failed to fetch API key',
        error: error.message,
      });
    }
  }
}

export const googleController = new GoogleController();
