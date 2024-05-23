'use strict';

import express from 'express';
import cors from 'cors';
import { router as productRouter } from './routes/product.route';
import { router as productItem } from './routes/productItem.route';

const PORT = process.env.PORT ?? 3005;
const server = express();

server.use(cors());

server.use('/products', express.json(), productRouter);
server.use('/productItem', express.json(), productItem);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default server;
