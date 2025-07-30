"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
// import mailerRoutes from './routes/mailerRoutes';
const codeRoutes_1 = __importDefault(require("./routes/codeRoutes"));
const googleRoutes_1 = __importDefault(require("./routes/googleRoutes"));
// import firebaseRoutes from './routes/firebaseRoutes';
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        const port = process.env.PORT || 8081;
        this.app.set('port', port);
        // this.app.use(morgan('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        // this.app.use('/mailer', mailerRoutes);
        this.app.use('/code', codeRoutes_1.default);
        this.app.use('/google', googleRoutes_1.default);
        // this.app.use('/firebase', firebaseRoutes);
        // this.app.use('/code', codeRoutes);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
