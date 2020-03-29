import * as KEY_CODES  from './keyCodes.js';

const PORT = 8082;
const API_URL = process.env.API_URL || `http://localhost:${PORT}/api`;
const API_TIMEOUT = 1000;

export {PORT,
        API_URL,
        KEY_CODES,
        API_TIMEOUT
      };
