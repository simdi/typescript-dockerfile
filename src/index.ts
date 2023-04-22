import * as dotenv from 'dotenv';
dotenv.config();
import { createServer } from "@config/express";
import http from 'http';
import { AddressInfo } from "net";

const PORT: string = process.env.PORT || '4000';
const HOST: string = process.env.HOST || '0.0.0.0';

const startServer = async () => {
  const app = createServer();

  const server = http.createServer(app).listen({ host: HOST, port: PORT }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(`Server is ready at http://${addressInfo.address}:${addressInfo.port}`);
  });

}

startServer();