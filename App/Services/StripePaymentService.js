import axios from 'axios';
import {Config} from 'App/Config';
import {is, curryN, gte} from 'ramda';
import {userApiClient, in200s, setAuthToken} from './Client';

async function CreatePaymentIntent(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  // console.log(payload);
  return userApiClient
    .post('stripe/CreatePayment', payload)
    .then((response) => {
      // console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data;
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

export const StripePaymentService = {
  CreatePaymentIntent,
};
