import { Router } from 'express';
import { googleController } from '../controllers/googleController';

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', googleController.getApiKey);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
