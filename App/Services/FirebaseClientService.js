import { Config } from 'App/Config';

import { Alert } from 'react-native';
import axios from 'axios';

import { is, curryN, gte } from 'ramda';

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number);
  return (
    isNumber(min) &&
    isNumber(max) &&
    isNumber(value) &&
    gte(value, min) &&
    gte(max, value)
  );
});
const in200s = isWithin(200, 299);

/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */
const userApiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */

  baseURL: 'https://iid.googleapis.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'key=AAAA-ireMLw:APA91bEGm2hYhUflBYvRafNPkjDOaj7LGj-1T9l7gGhXSQNAzmwv2ZAggjYLeOl94qllu0Hwx6O3uEJ7Uy6R2s4mZ-tDm3DUnlmvcoA8oEV7cP3sK1Z-8ieUWtwP4NpvSxnQnygOEjuc',
  },
  timeout: 3000,
});

function getFCMTokenForIOS(payload) {
  console.log('service starts');

  let body = {
    application: 'com.sorrento.covistix.m',
    sandbox: true,
    apns_tokens: [payload.token],
  };

  console.log(body);
  return userApiClient
    .post('iid/v1:batchImport', body)
    .then((response) => {
      if (in200s(response.status)) {
        console.log('Success to send notification,  ', response.data.results);

        return response.data.results[0];
      }

      return null;
    })
    .catch(function (error) {
      console.log(error); // Network Error
      console.log(error.status); // undefined
      console.log(error.code); // undefined
    });
}

export const FirebaseClientService = {
  getFCMTokenForIOS,
};
