import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import { ExampleTypes } from 'App/Stores/Example/Actions';
import { AuthenticateTypes } from 'App/Stores/Authentication/Actions';
import { FacilityProfileTypes } from 'App/Stores/FacilityProfile/Actions';
import { PatientProfileTypes } from 'App/Stores/PatientProfile/Actions';

import { StartupTypes } from 'App/Stores/Startup/Actions';
import { OrderTypes } from 'App/Stores/Order/Actions';

import { startup, updateLanguage, getAllMessages } from './StartupSaga';
import {
  authenticateUser,
  authenticateUserByPhone,
  registrationUser,
  getUserDetailById,
  signOut,
  checkEmailExist,
  checkPhoneExist,
  getCityStateByZipCode,
  getEthnicityList,
  getRaceList,
  getParticipationType,
  sendVerifyCode,
  getUserKeyByEmail,
  forgotUpdatePassword,
  updateUserDetail,
  certifiedTesterRegistrationUser,
  updateFacilityDetail,
  addUserSurvey,
  getUserSurvey,
  sendResultEmail,
  logOut,
  getGenderList,
  changePassword,
  getFacilityType,
  GetAllMessagesList,
  closeAllLoader,
  saveFcmToken,
  getNotificationCount,
  resetNoticationCount,
  getFcmTokenForIos,
  saveUserProfileImage,
  getUserProfileImage,
  updateUserLanguage,
} from './AuthenticateSaga';
import {
  getCurrentFacilityProfile,
  getAllFacilityProfiles,
  getFacilityByQrCode,
  savePatientDetail,
  scanQrCodeAndAddResult,
  getAllCertifiedTesters,
  addKitResult,
  getFaqList,
  getNearByFacility,
  getTesterForEdit,
} from './FacilityProfileSaga';
import {
  getCurrentPatientProfile,
  getAllPatientProfiles,
  associateValidateKitWithPatient,
  getPatientInfoByKitNo,
  getAllTelehealthExperts,
  addPatientResult,
  getAllTestResultsProfiles,
  saveKitResultImage,
  getPrescription,
  getPatientAddresses,
  compeletePatientOrder,
  storePatientProfileImage,
  editShippingAddress,
  getOrderDetail,
  getOrderHistory,
} from './PatientProfileSaga';

import { createIntent } from './OrderSaga';

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(StartupTypes.UPDATE_LANGUAGE, updateLanguage),

    takeLatest(AuthenticateTypes.CHECK_EMAIL_EXIST, checkEmailExist),
    takeLatest(AuthenticateTypes.CHECK_PHONE_EXIST, checkPhoneExist),
    takeLatest(
      AuthenticateTypes.GET_CITY_STATE_BY_ZIP_CODE,
      getCityStateByZipCode,
    ),

    takeLatest(AuthenticateTypes.GET_GENDER_LIST, getGenderList),
    takeLatest(AuthenticateTypes.GET_ETHNICITY_LIST, getEthnicityList),
    takeLatest(AuthenticateTypes.GET_RACE_LIST, getRaceList),
    takeLatest(AuthenticateTypes.GET_PARTICIPATION_TYPE, getParticipationType),
    takeLatest(AuthenticateTypes.SEND_VERIFY_CODE, sendVerifyCode),
    takeLatest(AuthenticateTypes.SEND_RESULT_EMAIL, sendResultEmail),

    takeLatest(AuthenticateTypes.GET_USER_KEY_BY_EMAIL, getUserKeyByEmail),
    takeLatest(AuthenticateTypes.FORGOT_UPDATE_PASSWORD, forgotUpdatePassword),
    takeLatest(AuthenticateTypes.UPDATE_USER_DETAIL, updateUserDetail),

    takeLatest(AuthenticateTypes.AUTHENTICATE_USER, authenticateUser),
    takeLatest(AuthenticateTypes.AUTHENTICATE_USER_BY_PHONE, authenticateUserByPhone),
    takeLatest(AuthenticateTypes.GET_USER_DETAIL_BY_ID, getUserDetailById),
    takeLatest(AuthenticateTypes.SAVE_REGISTRATION, registrationUser),
    takeLatest(AuthenticateTypes.SIGN_OUT, signOut),
    takeLatest(AuthenticateTypes.LOG_OUT, logOut),

    takeLatest(
      FacilityProfileTypes.GET_CURRENT_FACILITY_PROFILE,
      getCurrentFacilityProfile,
    ),
    takeLatest(
      FacilityProfileTypes.GET_ALL_FACILITY_PROFILES,
      getAllFacilityProfiles,
    ),
    takeLatest(FacilityProfileTypes.GET_NEAR_BY_FACILITY, getNearByFacility),

    takeLatest(
      FacilityProfileTypes.GET_FACILITY_BY_QR_CODE,
      getFacilityByQrCode,
    ),
    takeLatest(FacilityProfileTypes.SAVE_PATIENT_DETAIL, savePatientDetail),
    takeLatest(
      FacilityProfileTypes.SCAN_QR_CODE_AND_ADD_RESULT,
      scanQrCodeAndAddResult,
    ),

    takeLatest(
      PatientProfileTypes.GET_CURRENT_PATIENT_PROFILE,
      getCurrentPatientProfile,
    ),
    takeLatest(
      PatientProfileTypes.GET_ALL_PATIENT_PROFILES,
      getAllPatientProfiles,
    ),
    takeLatest(
      PatientProfileTypes.ASSOCIATE_VALIDATE_KIT_WITH_PATIENT,
      associateValidateKitWithPatient,
    ),
    takeLatest(
      PatientProfileTypes.GET_PATIENT_INFO_BY_KIT_NO,
      getPatientInfoByKitNo,
    ),

    takeLatest(PatientProfileTypes.ADD_PATIENT_RESULT, addPatientResult),
    takeLatest(PatientProfileTypes.SAVE_KIT_RESULT_IMAGE, saveKitResultImage),

    //akshay , FOR TEST_RESULT LIST GETTING
    //  takeLatest(PatientProfileTypes.GET_CURRENT_FACILITY_PROFILE, getCurrentFacilityProfile),
    takeLatest(
      PatientProfileTypes.GET_TEST_ALL_RESULTS,
      getAllTestResultsProfiles,
    ),

    //akshay , FOR TEST_RESULT LIST GETTINGgetTestAllResults

    //akshay , FOR CertifiedTesters LIST GETTING
    // 7 steps
    takeLatest(
      FacilityProfileTypes.GET_ALL_CERTIFIED_TESTERS,
      getAllCertifiedTesters,
    ),
    // need to import  at top getCertifiedTestersProfiles
    // NOTE:  check  FacilityProfileTypes
    // getCertifiedTestersProfiles comming from facilityProfilesaga
    // GET_ALL_CETTIFIED_TESTERS comming from action    getAllCertifiedTesters:['CertifiedTestersPayload'],
    //akshay , FOR CertifiedTesters LIST GETTINGgetTestAllResults
    takeLatest(FacilityProfileTypes.ADD_KIT_RESULT, addKitResult),

    takeLatest(
      AuthenticateTypes.SAVE_CERTIFIED_TESTER_REGISTRATION,
      certifiedTesterRegistrationUser,
    ),

    takeLatest(
      AuthenticateTypes.UPDATE_FACILITY_USER_DETAIL,
      updateFacilityDetail,
    ),
    takeLatest(FacilityProfileTypes.GET_FAQ_LIST, getFaqList),

    takeLatest(AuthenticateTypes.ADD_USER_SURVEY, addUserSurvey),
    takeLatest(AuthenticateTypes.GET_USER_SURVEY, getUserSurvey),
    takeLatest(AuthenticateTypes.CHANGE_PASSWORD, changePassword),
    takeLatest(AuthenticateTypes.GET_FACILITY_TYPE, getFacilityType),
    takeLatest(StartupTypes.GET_ALL_MESSAGES, getAllMessages),

    takeLatest(
      PatientProfileTypes.GET_ALL_TELEHEALTH_EXPERTS,
      getAllTelehealthExperts,
    ),
    takeLatest(OrderTypes.CREATE_INTENT, createIntent),
    takeLatest(PatientProfileTypes.GET_PRESCRIPTION, getPrescription),
    takeLatest(PatientProfileTypes.GET_PATIENT_ADDRESSES, getPatientAddresses),
    takeLatest(
      PatientProfileTypes.COMPELETE_PATIENT_ORDER,
      compeletePatientOrder,
    ),
    takeLatest(AuthenticateTypes.CLOSE_ALL_LOADER, closeAllLoader),
    takeEvery(AuthenticateTypes.GET_NOTIFICATION_COUNT, getNotificationCount),
    takeLatest(
      AuthenticateTypes.RESET_NOTIFICATION_COUNT,
      resetNoticationCount,
    ),
    takeLatest(AuthenticateTypes.SAVE_FCM_TOKEN, saveFcmToken),
    takeLatest(AuthenticateTypes.GET_FCM_TOKEN_FOR_IOS, getFcmTokenForIos),
    takeLatest(AuthenticateTypes.SAVE_USER_PROFILE_IMAGE, saveUserProfileImage),

    takeLatest(AuthenticateTypes.GET_USER_PROFILE_IMAGE, getUserProfileImage),
    takeLatest(AuthenticateTypes.UPDATE_USER_LANGUAGE, updateUserLanguage),
    takeLatest(
      PatientProfileTypes.STORE_PATIENT_PROFILE_IMAGE,
      storePatientProfileImage,
    ),
    takeLatest(PatientProfileTypes.EDIT_SHIPPING_ADDRESS, editShippingAddress),
    takeLatest(PatientProfileTypes.GET_ORDER_DETAIL, getOrderDetail),
    takeLatest(PatientProfileTypes.GET_ORDER_HISTORY, getOrderHistory),
  ]);
}
