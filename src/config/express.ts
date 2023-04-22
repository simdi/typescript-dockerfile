import express from 'express';

const createServer = (): express.Application => {
  const app = express();

  return app;
};

export { createServer };