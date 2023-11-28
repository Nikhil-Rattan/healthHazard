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

async function GetPatientInfo(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  console.log(payload);
  return userApiClient
    .post('dbo.Sp_GetPatientList/json', payload)
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

async function GetTestResultsInfo(payload) {
  //Sp_GetPatientList_V1
  //  await setAuthToken()

  await setAuthToken();
  return userApiClient
    .post('SP_GetPatientTestInfoByPatientId_MB/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        //  alert(response.data.ResultSets);
        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?

      return null;
    });
}
async function AssociateValidateKitWithPatientOrder(payload) {
  // SP_AssociateValidateKitWithPatient
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  console.log(JSON.stringify(payload));
  return userApiClient
    .post('dbo.SP_AssociateValidateKitWithPatientOrder/json', payload)
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

async function AssociateValidateKitWithPatient(payload) {
  // SP_AssociateValidateKitWithPatient
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  console.log(JSON.stringify(payload));
  return userApiClient
    .post('dbo.SP_AssociateValidateKitWithPatient/json', payload)
    .then((response) => {
      console.log(response, "Hello");
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

async function GetPatientInfoByKitNo(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  console.log(payload);
  return userApiClient
    .post('DecryptedPatientV2/SP_GetKitInfoByNo', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.resultsets);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.resultsets;
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

async function AddPatientResult(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();

  return userApiClient
    .post('dbo.SP_AddPatientResult/json', payload)
    .then((response) => {
      // console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);
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

async function SavePatientTestImage(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  //SP_SavePatientTestImage_v2
  //console.log(payload)
  // console.log('Calll');
  return userApiClient
    .post('dbo.SP_SavePatientTestKitImage/json', payload)
    .then((response) => {
      // console.log('response');
      // console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);
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

async function GetAllTelehealthExperts(payload) {
  //Sp_GetPatientList_V1
  await setAuthToken();
  //alert(JSON.stringify(payload))
  return userApiClient
    .post('dbo.Sp_GetTeleHealthList/json', payload)
    .then((response) => {
      // console.log(response);

      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);

        return response.data.ResultSets[0];
      }

      return null;
    });
}

async function GetPrescription(payload) {
  //Sp_GetPatientList_V1
  await setAuthToken();
  // console.log(JSON.stringify(payload));
  return userApiClient
    .post('dbo.Sp_GetOrderByStatusAndPatientId/json', payload)
    .then((response) => {
      // console.log(response);

      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);

        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      console.log(err);
      return null;
    });
}

async function GetPatientAddresses(payload) {
  //Sp_GetPatientList_V1
  await setAuthToken();

  return userApiClient
    .post('DecryptedPatientV2/Sp_GetPatientAddress', payload)
    .then((response) => {
      // console.log(response);

      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.resultsets);

        return response.data.resultsets[0];
      }

      // return null;
    })
    .catch((err) => {
      // what now?
      // alert(err);
      return null;
    });
}

async function EditShippingAddresses(payload) {
  //Sp_GetPatientList_V1
  //Sp_GetPatientList_V1
  await setAuthToken();
  console.log(JSON.stringify(payload));
  return userApiClient
    .post('AddEditPatient/Sp_EditShippingAddress', payload)
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);

        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      console.log(err);
      return null;
    });
}

async function CompeletePatientOrder(payload) {
  //Sp_GetPatientList_V1
  await setAuthToken();
  //alert(JSON.stringify(payload))
  return userApiClient
    .post('dbo.SP_CompeletePatientOrder/json', payload)
    .then((response) => {
      // console.log(response);

      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);

        return response.data.ResultSets[0];
      }

      return null;
    });
}

async function InsertShippingBillingAddress(payload) {
  //Sp_GetPatientList_V1
  await setAuthToken();
  // console.log(JSON.stringify(payload));
  return userApiClient
    .post('AddEditPatient/Sp_InsertShippingBillingAddress', payload)
    .then((response) => {
      // console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);

        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      console.log(err);
      return null;
    });
}

async function UpdatePaymentStatus(payload) {
  //Sp_GetPatientList_V1
  await setAuthToken();
  //alert(JSON.stringify(payload))
  return userApiClient
    .post('dbo.Sp_UpdateOrderPaymentStatus/json', payload)
    .then((response) => {
      // console.log(response);

      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);

        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      // console.log(err);
      return null;
    });
}

async function GetOrderHistoryList(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();

  return userApiClient
    .post('dbo.Sp_GetOrderList_MB/json', payload)
    .then((response) => {
      // console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);
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

async function GetOrderTracking(payload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();

  return userApiClient
    .post('dbo.SP_GetOrderTrackingByOrderId_MB/json', payload)
    .then((response) => {
      // console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);
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

export const PatientService = {
  GetPatientInfo,
  GetTestResultsInfo,
  AssociateValidateKitWithPatient,
  GetPatientInfoByKitNo,
  AddPatientResult,
  SavePatientTestImage,
  GetAllTelehealthExperts,
  GetPrescription,
  GetPatientAddresses,
  CompeletePatientOrder,
  AssociateValidateKitWithPatientOrder,
  InsertShippingBillingAddress,
  UpdatePaymentStatus,
  EditShippingAddresses,
  GetOrderHistoryList,
  GetOrderTracking,
};
