"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
dotenv.config();
const express_1 = require("./config/express");
const http_1 = tslib_1.__importDefault(require("http"));
// import * as moduleAlias from 'module-alias';
// const sourcePath = 'src';
// moduleAlias.addAliases({
//   '@server': sourcePath,
//   '@config': `${sourcePath}/config`,
//   '@domain': `${sourcePath}/domain`,
//   '@controller': `${sourcePath}/controller`,
//   '@middleware': `${sourcePath}/middleware`,
// });
const PORT = process.env.PORT || '4000';
const HOST = process.env.HOST || '0.0.0.0';
const startServer = async () => {
    const app = (0, express_1.createServer)();
    const server = http_1.default.createServer(app).listen({ host: HOST, port: PORT }, () => {
        const addressInfo = server.address();
        console.log(`Server is ready at http://${addressInfo.address}:${addressInfo.port}`);
    });
    const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    for (let type of signalTraps) {
        process.once(type, async () => {
            console.log(`process.once ${type}`);
            server.close(() => {
                console.log('HTTP server closed');
            });
        });
    }
};
startServer();
