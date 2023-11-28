import axios, { CancelToken } from 'axios';
import { Config } from 'App/Config';
import { is, curryN, gte } from 'ramda';
//import AsyncStorage from '@react-native-community/async-storage';
import SInfo from 'react-native-sensitive-info';

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
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

async function setAuthToken() {
  userApiClient.defaults.headers.common['token'] = '';
  delete userApiClient.defaults.headers.common['token'];

  // const token = await AsyncStorage.getItem("token");
  const token = await SInfo.getItem('token', {
    sharedPreferencesName: 'exampleApp',
    keychainService: 'exampleApp',
  });
  if (token) {
    //console.log(token + 'sharedPreferencesName');
    userApiClient.defaults.headers.common['token'] = `${token}`;
  }
}

const stripeApiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.PAYMENTAPI_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export { userApiClient, stripeApiClient, in200s, setAuthToken };
