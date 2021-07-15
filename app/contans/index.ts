import * as KEY_CODES from './keyCodes';
import * as ERROR_TYPES from './ErrorTypes';
import * as ERROR_MESSAGES from './ErrorMessages';

const PORT = process.env.PORT || 8082;
const API_URL = process.env.API_URL || `http://localhost:${PORT}/api`;
const API_TIMEOUT = 1000;

export { PORT, API_URL, KEY_CODES, ERROR_TYPES, API_TIMEOUT, ERROR_MESSAGES };
