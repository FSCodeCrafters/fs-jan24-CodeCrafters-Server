'use strict';

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { router as productRouter } from './routes/product.route';
import { router as productItem } from './routes/productItem.route';
import { router as authRouter } from './routes/auth.route';
import passport from 'passport';
import './strategies/google-strategy';

const PORT = process.env.PORT ?? 3005;
const server = express();

server.use(cors());
server.use(express.json());

server.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

server.use(passport.initialize());
server.use(passport.session());

server.use('/products', express.json(), productRouter);
server.use('/productItem', express.json(), productItem);
server.use('/', express.json(), authRouter);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default server;
