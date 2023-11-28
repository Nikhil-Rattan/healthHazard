import axios from 'axios';
import { Config } from 'App/Config';
import { is, curryN, gte } from 'ramda';
import { userApiClient, in200s, setAuthToken } from './Client';
//import AsyncStorage from '@react-native-community/async-storage';

// const isWithin = curryN(3, (min, max, value) => {
//   const isNumber = is(Number)
//   return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
// })
// const in200s = isWithin(200, 299)

// /**
//  * This is an example of a service that connects to a 3rd party API.
//  *
//  * Feel free to remove this example from your application.
//  */
// const userApiClient = axios.create({
//   /**
//    * Import the config from the App/Config/index.js file
//    */
//   baseURL: Config.API_URL,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   timeout: 3000,
// })

//akshay , FOR CertifiedTesters LIST GETTING
//4 step
async function GetCertificateTestersInfo(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();

  return userApiClient
    .post('dbo.Sp_GetTesterList/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log('got tester list');
        console.log(response.data.ResultSets);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

//akshay , FOR CertifiedTesters LIST GETTING

async function GetFacilityInfo(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  return userApiClient
    .post('dbo.Sp_GetFacilityList/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      return null;
    });
}

async function GetUserByQrCode(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  return userApiClient
    .post('dbo.SP_GetUserByQRCode/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

async function ScanQRCodeInfo(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  console.log(payload);
  return userApiClient
    .post('DecryptedPatientV2/SP_ScanQRCode_V2', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.resultsets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

async function AddKitResult(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  console.log(payload);
  return userApiClient
    .post('SP_SubmitTestResult_V1/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

async function GetFaqList() {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  return userApiClient
    .get('SP_GetFaqList_MB/json')
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

export const FacilityService = {
  GetFacilityInfo,
  GetUserByQrCode,
  ScanQRCodeInfo,
  AddKitResult,
  GetCertificateTestersInfo,
  GetFaqList,
};
