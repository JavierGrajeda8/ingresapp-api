import { Request, Response } from 'express';

class IndexController {
  public async index(req: Request, res: Response) { 
    
    res.json({ message: 'JGrajeda API is online!!!!!!' });
  }

  public async sendEmail(req: Request, res: Response) {
    res.json({ message: 'Email send' });
  }
}

export const indexController = new IndexController();
