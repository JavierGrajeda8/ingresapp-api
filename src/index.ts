import express, { Application } from 'express';

import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
// import mailerRoutes from './routes/mailerRoutes';
import codeRoutes from './routes/codeRoutes';
import googleRoutes from './routes/googleRoutes';
// import firebaseRoutes from './routes/firebaseRoutes';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    const port = process.env.PORT || 8081;

    this.app.set('port', port);
    // this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use('/', indexRoutes);
    // this.app.use('/mailer', mailerRoutes);
    this.app.use('/code', codeRoutes);
    this.app.use('/google', googleRoutes);
    // this.app.use('/firebase', firebaseRoutes);
    // this.app.use('/code', codeRoutes);
    
  }

  start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'));
    });
  }
}

const server = new Server();
server.start();
