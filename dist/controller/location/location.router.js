"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (_req, res, next) => {
    res.send('Home page');
    next();
});
router.get('/user', (_req, res, next) => {
    res.send({ user: 'Simdi' });
    next();
});
router.get('/page', (_req, res, next) => {
    res.send('Page page');
    next();
});
router.get('/page/:id', (req, res, next) => {
    const result = {
        param: req.params,
        query: req.query,
    };
    res.send(result);
    next();
});
exports.default = router;
