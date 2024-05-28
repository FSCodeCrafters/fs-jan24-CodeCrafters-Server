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
const allowedList = [
  'http://localhost:5173',
  'https://fs-jan24-codecrafters.github.io',
];

// testing deploy

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    if (!origin || allowedList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
};
server.use(cors(corsOptions));
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
