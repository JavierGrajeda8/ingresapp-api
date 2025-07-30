"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const googleController_1 = require("../controllers/googleController");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', googleController_1.googleController.getApiKey);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
