import express from 'express';
import serverless from 'serverless-http';
import bodyParser from 'body-parser';
import { db } from './db';

const app = express();
app.use(bodyParser.json());

app.get('/contacts', (req, res) => {
    res.json(db.getAll());
});

app.post('/contacts', (req, res) => {
    const contact = db.create(req.body);
    res.status(201).json(contact);
});

app.put('/contacts/:id', (req, res) => {
    const contact = db.update(req.params.id, req.body);
    res.status(200).json(contact);
});

app.delete('/contacts/:id', (req, res) => {
    db.delete(req.params.id);
    res.status(204).send();
});

export const handler = serverless(app);