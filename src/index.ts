import * as dotenv from 'dotenv';
dotenv.config();
import { createServer } from "@config/express";
import http from 'http';
import { AddressInfo } from "net";
import * as moduleAlias from 'module-alias';

const sourcePath = 'src';
moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
  '@domain': `${sourcePath}/domain`,
  '@controller': `${sourcePath}/controller`,
  '@middleware': `${sourcePath}/middleware`,
});

const PORT: string = process.env.PORT || '4000';
const HOST: string = process.env.HOST || '0.0.0.0';

const startServer = async () => {
  const app = createServer();

  const server = http.createServer(app).listen({ host: HOST, port: PORT }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(`Server is ready at http://${addressInfo.address}:${addressInfo.port}`);
  });

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  for (let type of signalTraps) {
    process.once(type, async () => {
      console.log(`process.once ${type}`);

      server.close(() => {
        console.log('HTTP server closed');
      })
    })
  }
}

startServer();