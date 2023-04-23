"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const location_router_1 = tslib_1.__importDefault(require("../controller/location/location.router"));
const errorHandler_1 = tslib_1.__importDefault(require("../middleware/errorHandler"));
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.disable('x-powered-by');
    app.get('/health', (_req, res) => {
        res.send('UP');
    });
    app.use('/', location_router_1.default);
    app.use(errorHandler_1.default);
    return app;
};
exports.createServer = createServer;
