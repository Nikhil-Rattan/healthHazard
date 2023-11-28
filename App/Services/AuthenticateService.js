import axios from 'axios';
import { Config } from 'App/Config';
import { is, curryN, gte } from 'ramda';
import { userApiClient, in200s, setAuthToken } from './Client';
// import AsyncStorage from '@react-native-community/async-storage';
import SInfo from 'react-native-sensitive-info';
function SignIn(userAuthPayload) {
  return userApiClient
    .post('login/SP_AuthenticateUser', userAuthPayload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        // alert(response.data.Token)
        if (response.data.Token) {
          // AsyncStorage.setItem('token', response.data.Token);

          SInfo.setItem('token', response.data.Token, {
            sharedPreferencesName: 'exampleApp',
            keychainService: 'exampleApp',
          }).catch((err) => {
            Alert.alert('Error', err);
          });
        }

        //  AsyncStorage.setItem("uId",response.data.UserId)
        return response.data;
      }

      return null;
    })
    .catch((err) => {
      // what now?
      console.log(err);
      return null;
    });
}

function LogIn(userAuthPayload) {
  return userApiClient
    .post('loginPhoneNo/SP_AuthenticateUserByPhone', userAuthPayload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        // alert(response.data.Token)
        if (response.data.Token) {
          // AsyncStorage.setItem('token', response.data.Token);

          SInfo.setItem('token', response.data.Token, {
            sharedPreferencesName: 'exampleApp',
            keychainService: 'exampleApp',
          }).catch((err) => {
            Alert.alert('Error', err);
          });
        }

        //  AsyncStorage.setItem("uId",response.data.UserId)
        return response.data;
      }

      return null;
    })
    .catch((err) => {
      // what now?
      console.log(err);
      return null;
    });
}

function SignUpUser(registrationUserInfoPayload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  console.log(registrationUserInfoPayload);
  return userApiClient
    .post('register/SP_UserSignUp', registrationUserInfoPayload)
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

async function GetPatientUserById(payload) {
  await setAuthToken();
  return userApiClient
    .post('DecryptedPatient/SP_GetUserById', payload)
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]

        return response.data.resultsets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

async function GetUserById(payload) {
  await setAuthToken();
  console.log(JSON.stringify(payload));
  //DecryptedPatient/SP_GetUserById
  return userApiClient
    .post('dbo.SP_GetUserById/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets[0]);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]

        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

async function GetUserServey(payload) {
  await setAuthToken();
  console.log(JSON.stringify(payload));
  return userApiClient
    .post('dbo.SP_GetUserSurvey/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]

        return response.data.ResultSets;
      }

      return null;
    })
    .catch((err) => {
      // what now?
      console.log(err);
      return null;
    });
}

async function AddUserSurvey(payload) {
  await setAuthToken();
  console.log(JSON.stringify(payload));
  return userApiClient
    .post('dbo.SP_AddUserSurvey/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]

        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

function GetClubs() {
  return userApiClient
    .get('dbo.SP_GetClubList/other/common/verify/token/unAuth/json')
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets[0]);
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
function GetDistricts() {
  return userApiClient
    .get('dbo.SP_GetDistrictList/other/common/verify/token/unAuth/json')
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets[0]);
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

function GetCityAndStateByZipCode(payload) {
  return userApiClient
    .post('checkUsernameExist/SP_GetCityAndStateByZipCode', payload)
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets[0])
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
function CheckEmailExist(payload) {
  return userApiClient
    .post('checkUsernameExist/SP_CheckEmailExist', payload)
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets[0]);
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

function CheckPhoneExist(payload) {
  return userApiClient
    .post('checkUsernameExist/SP_CheckPhoneExist', payload)
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets[0]);
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

function GetRaceList() {
  return userApiClient
    .get('checkUsernameExist/SP_GetRaceList')
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets[0]);
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

function GetGenderList() {
  return userApiClient
    .get('checkUsernameExist/SP_GetGenderList')
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets[0]);
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

function GetParticipantTypeList() {
  return userApiClient
    .get('checkUsernameExist/SP_GetParticipantTypeList')
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets[0]);
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

function GetEthnicityList() {
  return userApiClient
    .get('checkUsernameExist/SP_GetEthnicityList')
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets[0]);
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

function GetFacilityTypeList() {
  return userApiClient
    .get('checkUsernameExist/SP_GetFacilityTypeList')
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets[0]);
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

function SendVerificationEmail(payload) {
  return userApiClient
    .post('SendMail', payload)
    .then((response) => {
      console.log('SendMail', payload, response.data);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return true;
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

function GetUserKeyByEmail(payload) {
  return userApiClient
    .post('common/SP_GetUserKeyByEmail', payload)
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        console.log('response.data.ResultSets[0]');
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

function ForgotUpdatePassword(payload) {
  return userApiClient
    .post('forgotUpdatepassword/SP_ForgotUpdatePassword', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data);
        console.log('response ');
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

function UpdatePatientDetail(payload) {
  console.log('JSON.stringify(payload)');
  console.log(JSON.stringify(payload));
  return userApiClient
    .post('AddEditPatient/SP_AddEditPatient_V1', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        console.log('response ');
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.ResultSets;
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

//for updateFacility data step 5
async function UpdateFacilityDetail(facilityPayload) {
  await setAuthToken();
  console.log('JSON.stringify(facilityPayload)');
  console.log(JSON.stringify(facilityPayload));
  return userApiClient
    .post('SP_AddEditFacility', facilityPayload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        console.log('response ');
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.ResultSets;
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

// akshay for certifiedtesterAuth
//5 STEP

async function CertifiedtesterSignUpUser(registrationUserInfoPayload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  return userApiClient
    .post(
      'createAccFromAdm/SP_AddEditFacilityTester_V1',
      registrationUserInfoPayload,
    )
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.ResultSets;
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

async function ChangePassword(changePasswordPayload) {
  // type = 1 for registration ,2 for forget pass ,3 change password
  await setAuthToken();
  console.log(changePasswordPayload);
  return userApiClient
    .post('changePassword/SP_ChangeUserPassword', changePasswordPayload)
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

async function GetAllMessagesList() {
  // type = 1 for registration ,2 for forget pass ,3 change password
  // await setAuthToken()

  return userApiClient
    .get('checkUsernameExist/SP_GetAllMessagesList_MB')
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        //console.log(response.data.ResultSets)

        return response.data.ResultSets[0];
      }

      return null;
    })
    .catch((err) => {
      // what now?
      return null;
    });
}

async function NpiValidate(npiPayload) {
  console.log('JSON.stringify(npiPayload)');
  console.log(JSON.stringify(npiPayload));
  return userApiClient
    .post('NpiValidate', npiPayload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data);
        console.log('response ');
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

async function GetNotificationCountByUserId(notificationPayload) {
  await setAuthToken();

  return userApiClient
    .post('dbo.SP_GetNotificationCountByUserId/json', notificationPayload)
    .then((response) => {
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        console.log('response ');
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

async function UpdateNotificationStatus(notificationPayload) {
  await setAuthToken();

  return userApiClient
    .post('dbo.SP_UpdateNotificationStatus/json', notificationPayload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        console.log('response ');
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

async function SaveFcm(notificationPayload) {
  await setAuthToken();

  return userApiClient
    .post('dbo.SP_SaveFcm/json', notificationPayload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        console.log('response ');
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

async function SaveUserProfileImage(payload) {
  await setAuthToken();

  return userApiClient
    .post('dbo.SP_SaveUserProfileImage/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log(response.data.ResultSets);
        console.log('response ');
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

async function GetUserProfileImage(payload) {
  await setAuthToken();

  return userApiClient
    .post('dbo.Sp_GetUserProfileImage/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        // console.log(response.data.ResultSets);
        console.log('response ');
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

async function UpdateUserLanguage(payload) {
  await setAuthToken();
  return userApiClient
    .post('dbo.SP_UpdateUserLanguage/json', payload)
    .then((response) => {
      console.log(response);
      if (in200s(response.status) && response.data != 'UnAuthorized') {
        console.log('response ');
        console.log(response.data.ResultSets);

        // console.log(response.headers.token)
        // let token=response.headers.token.split(":")[0];
        // let uId=response.headers.token.split(":")[1]
        // AsyncStorage.setItem("token",token)
        // AsyncStorage.setItem("uId",uId)
        return response.data.ResultSets[0];
      }
      console.log('null');
      return null;
    })
    .catch((err) => {
      // what now?
      console.log(err);
      return null;
    });
}

// akshay for certifiedtesterAuth

export const AuthenticateService = {
  SignIn,
  LogIn,
  SignUpUser,
  GetDistricts,
  GetClubs,
  GetUserById,
  GetCityAndStateByZipCode,
  CheckEmailExist,
  CheckPhoneExist,
  GetRaceList,
  GetParticipantTypeList,
  GetEthnicityList,
  SendVerificationEmail,
  GetUserKeyByEmail,
  ForgotUpdatePassword,
  UpdatePatientDetail,
  CertifiedtesterSignUpUser,
  UpdateFacilityDetail,
  GetPatientUserById,
  GetUserServey,
  AddUserSurvey,
  GetGenderList,
  ChangePassword,
  GetFacilityTypeList,
  GetAllMessagesList,
  NpiValidate,
  GetNotificationCountByUserId,
  UpdateNotificationStatus,
  SaveFcm,
  SaveUserProfileImage,
  GetUserProfileImage,
  UpdateUserLanguage,
};
