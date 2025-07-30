import { Router } from 'express';
import { codeController } from '../controllers/codeController';

class CodeRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', codeController.gc);
  }
}

const codeRoutes = new CodeRoutes();
export default codeRoutes.router;
