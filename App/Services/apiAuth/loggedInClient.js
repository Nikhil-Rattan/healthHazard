import axios from 'axios';
import {Config} from 'App/Config';

const getAccessToken = async () => {
  try {
    const retrievedItem = null; //await AsyncStorage.getItem('tokenData');
    if (retrievedItem !== null) {
      const item = JSON.parse(retrievedItem);
      console.log(item);
      const authorization = `Bearer ${item.token}`;
      // We have data!!
      return authorization;
    }
    return null;
  } catch (error) {
    // Error retrieving data
  }
};

const loginClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
  },
});
const getLoginClient = async () => {
  loginClient.defaults.headers.common.Authorization = await getAccessToken();
  return loginClient;
};
export default getLoginClient;

function getUrl(config) {
  if (config.baseURL) {
    return config.url.replace(config.baseURL, '');
  }
  return config.url;
}
// Intercept all requests

loginClient.interceptors.request.use(
  (config) => {
    console.log(
      `%c ${config.method.toUpperCase()} - ${getUrl(config)}:`,
      'color: #0086b3; font-weight: bold',
      config,
    );
    return config;
  },
  (error) => Promise.reject(error),
);

// Intercept all responses
loginClient.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      try {
        const value = null; //await AsyncStorage.getItem('tokenData');
        if (value !== null) {
          // We have data!!
          //AsyncStorage.clear();
          alert('UnAuthorized');
        }
      } catch (error) {
        // Error retrieving data
        console.log(error, 'logged in client error');
      }
    }
    console.log(
      `%c ${response.status} - ${getUrl(response.config)}:`,
      'color: #008000; font-weight: bold',
      response,
    );
    return response;
  },
  (error) => {
    console.log(error, 'error console');
    if (error.response.status === 429) {
      Alert.alert('Too many requests. Please try again later.');
    }
    console.log(
      `%c ${error.response.status} - ${getUrl(error.response.config)}:`,
      'color: #a71d5d; font-weight: bold',
      error.response,
    );
    return Promise.reject(error);
  },
);
