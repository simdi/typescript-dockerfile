import express from 'express';

const router = express.Router();

router.get('/', (_req, res, next) => {
  res.send('Home page');
  next();
});

router.get('/user', (_req, res, next) => {
  res.send({ user: 'Simdi'});
  next();
});

router.get('/pages', (_req, res, next) => {
  res.send('Page page');
  next();
});

router.get('/page/:id', (req, res, next) => {
  const result = {
    param: req.params,
    query: req.query,
  }
  res.send(result);
  next();
});

export default router;