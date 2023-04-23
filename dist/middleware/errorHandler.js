"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, _req, res, next) => {
    if (res.headersSent)
        return next(error);
    res.status(500).send(error.message);
};
exports.default = errorHandler;
