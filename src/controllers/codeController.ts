import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { code } from '../engine/code';

class CodeController {
  public async gc(req: Request, res: Response) {
    const rnd = (Math.random() * 1000).toFixed(0);
    const residecenCode = req.query.residenceCode ? req.query.residenceCode : '';
    console.log('params', req.query);
    const c = code
      .getCode()
      .then((code: any) => {
        const params = { code: code.value + rnd.toString(), residecenCode };        
        console.log('Code generated successfully: ', params);
        res.status(StatusCodes.OK).json({ timestamp: Date.now(), code: params.code });
    })
      .catch((error) => {
        console.log('Error generating code for ' + residecenCode + ':', error);
      });
  }

}

export const codeController = new CodeController();
