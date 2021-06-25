import { ERROR_TYPES, ERROR_MESSAGES } from '../contans';

export default function catchError(error: Error): void {
  // const parseError = JSON.parse(JSON.stringify(error));
  console.log('---- my handle error ---');
  console.log(error);

  switch (true) {
    case error.message.toLocaleLowerCase().includes('timeout of'):
      throw { type: ERROR_TYPES.TIME_OUT, info: error.message };

    case error.message.toLocaleLowerCase().includes('network'):
      throw { type: ERROR_TYPES.NETWORK, info: ERROR_MESSAGES.NETWORK_ERROR };

    default:
      throw { type: ERROR_TYPES.DEFAULT, info: 'Error' };
  }
}
