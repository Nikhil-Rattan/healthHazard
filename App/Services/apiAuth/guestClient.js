import axios from 'axios'
import { Config } from 'App/Config'

 
  
  /**
   * This is an example of a service that connects to a 3rd party API.
   *
   * Feel free to remove this example from your application.
   */
  const client = axios.create({
    /**
     * Import the config from the App/Config/index.js file
     */
    baseURL: Config.API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',    
    },
    timeout: 3000,
  })
  export default client;
  

  function getUrl(config) {
    if (config.baseURL) {
     return config.url.replace(config.baseURL, '');
    } 
     return config.url;
    }
    client.interceptors.request.use(
    config => {
    console.log(`%c ${config.method.toUpperCase()} - ${getUrl(config)}:`,'color: #0086b3; font-weight: bold',config,);
    return config;
   }, error => Promise.reject(error),);
   // Intercept all responses
   client.interceptors.response.use(
   async response => {console.log(`%c ${response.status} - ${getUrl(response.config)}:`,
   'color: #008000; font-weight: bold',
   response,);return response;},
   error => {console.log(`%c ${error.response.status} - ${getUrl(error.response.config)}:`,'color: #a71d5d; font-weight: bold',error.response,);
   return Promise.reject(error);
   },
   );
 

 

 
 
 