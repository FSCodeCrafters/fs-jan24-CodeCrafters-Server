'use strict';

import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT ?? 3000;
const server = express();

server.use(cors({ origin: '*' }));

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
