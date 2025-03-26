import express from 'express';
import serverless from 'serverless-http';
import bodyParser from 'body-parser';
import { db } from './db';

const app = express();
app.get('/contacts', (req, res, next) => {
  try {
    res.json(db.getAll());
  } catch (err) {
    next(err);
  }
});

app.post('/contacts', (req, res, next) => {
  try {
    const contact = db.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
});

app.put('/contacts/:id', (req, res, next) => {
  try {
    const contact = db.update(req.params.id, req.body);
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
});

app.delete('/contacts/:id', (req, res, next) => {
  try {
    db.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error',
    });
  }
);

export const handler = serverless(app);
