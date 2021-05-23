import * as KEY_CODES from './keyCodes.js';
import * as ERROR_TYPES from './ErrorTypes.js';
import * as ERROR_MESSAGES from './ErrorMessages.js';

const PORT = 8082;
// const API_URL = process.env.API_URL || `http://localhost:${PORT}/api`;
const API_URL = 'https://my-links-api.herokuapp.com/api';
const API_TIMEOUT = 1000;

export { PORT, API_URL, KEY_CODES, ERROR_TYPES, API_TIMEOUT, ERROR_MESSAGES };
