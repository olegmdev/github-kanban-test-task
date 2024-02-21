'use strict';
import dotenv from 'dotenv';
import { createServer } from './createServer.js';

dotenv.config();

const PORT = process.env.PORT ?? 3001;

createServer().listen(PORT, () => {
  console.log(`Server is listening PORT ${PORT}`);
});
