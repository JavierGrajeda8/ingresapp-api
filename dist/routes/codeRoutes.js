"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const codeController_1 = require("../controllers/codeController");
class CodeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', codeController_1.codeController.gc);
    }
}
const codeRoutes = new CodeRoutes();
exports.default = codeRoutes.router;
