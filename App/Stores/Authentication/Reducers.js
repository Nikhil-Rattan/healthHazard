/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthenticateTypes } from './Actions'

// Reducer function on Loading 
export const authUserLoading = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  authenticatedIsLoading: true, // Set loader to true.
  authenticatedErrorMessage: null, // Contains the Error msg when any Error encountered while Login.
  emailExistErrorMessage: null, // Error msg for already having an Email.
  phoneExistErrorMessage: null
})

// Reducer function called on Successful authentication 
export const authUserSuccess = (state, { authenticatedUser }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  authenticatedUser: authenticatedUser, // BINDING THE INITIAL STATE of AUTHENTICATED USER to UPDATED STATE. 
  authenticatedIsLoading: false, // Set Loading to false and displays the data for user.
  authenticatedErrorMessage: null, // BINDING Error msg to NULL, on succcessful login.
})

// Reducer functioon called on authentication failure. 
export const authUserFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE
  authenticatedUser: null, // BINDING the USER DATA to NULL, on authentication failure. 
  authenticatedIsLoading: false,  // Set Loading to false and displays Error msg.
  authenticatedErrorMessage: errorMessage,  // BINDING the Error msg to corressponding type of Error encountred while login.
})

// Reducer functioon called on registration failure. 
export const registrationUserFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  authenticatedUser: null, // BINDING the USER DATA to NULL, on registration failure. 
  authenticatedIsLoading: false,  // Set Loading to false and displays Error msg.
  registrationErrorMessage: errorMessage, // BINDING the Error msg to corressponding type of Error encountred while Registration.
})
//  Reset the States during Registration of New User or adding tester.
export const resetStates = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  authenticatedIsLoading: false,  // Set Loading to false and Reset the states.
  registrationErrorMessage: null, // BINDING the Error msg to corressponding type of Error encountred while Registration.
  authenticatedErrorMessage: null // BINDING the Error msg to corressponding type of Error encountred while login.

})
// Check the Authentication Status
export const setUserAuthStatus = (state, { status }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  isAuthenticate: status  // Checks the Authenication Status whether it is success or not. 
})

export const authenticateUserByPhoneFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  phoneExistErrorMessage: errorMessage, // BINDING the State of Error msg from NULL to corresponding error msg  .
  phoneExistSuccessMessage: null, // BINDING the  with phone Success Msg.
  authenticatedIsLoading: false,  // Set the loading State to false and display the Error msg.
})

// Reducer called on Successful addition of Email
export const checkEmailExistSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  emailExistErrorMessage: null, // BINDING the Error MSg to Null, on succesful addition of EmailId.
  emailExistSuccessMessage: response, // BINDING the Response with Email Success Msg.
  authenticatedIsLoading: false,  // Set Loading State to false and gives corresponding message. 
})

// Reducer called on failure on addition of Email
export const checkEmailExistFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  emailExistErrorMessage: errorMessage, // BINDING the State of Error msg from NULL to corresponding error msg  .
  emailExistSuccessMessage: null, // BINDING the  with Email Success Msg.
  authenticatedIsLoading: false,  // Set the loading State to false and display the Error msg.
})

// Reducer called on Successful addition of Email
export const checkPhoneExistSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  phoneExistErrorMessage: null, // BINDING the Error MSg to Null, on succesful addition of phone.
  phoneExistSuccessMessage: response, // BINDING the Response with phone Success Msg.
  authenticatedIsLoading: false,  // Set Loading State to false and gives corresponding message. 
})

// Reducer called on failure on addition of phone
export const checkPhoneExistFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  phoneExistErrorMessage: errorMessage, // BINDING the State of Error msg from NULL to corresponding error msg  .
  phoneExistSuccessMessage: null, // BINDING the  with phone Success Msg.
  authenticatedIsLoading: false,  // Set the loading State to false and display the Error msg.
})
export const saveSignUpPayload = (state, { payload }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  signUpPayload: payload, // BINDING THE INITIAL STATE of SignUpPayload to UPDATED Payload.
  authenticatedIsLoading: false, // Set the loading State to false and Sign Up Data.
})

export const saveBuildProfilePayload = (state, { payload }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  buildProfilePayload: payload, // Saving the Update Info into the User payload.
  authenticatedIsLoading: false, // Set the loading State to false and Updating the Profile Info .
})




export const getCityStateByZipCodeSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  cityStateByZipCodeResponse: response, // BINDING the INITIAL STATE Of CITY & STATE with UPDATED One. 
  cityStateByZipCodeErrorMessage: null, // BINDING Error msg to NULL, on succcessful Updation.
  authenticatedIsLoading: false,  // Set the loading State to false and Updating the City and State Values.
})

export const getCityStateByZipCodeFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  cityStateByZipCodeResponse: null,
  cityStateByZipCodeErrorMessage: errorMessage,
  authenticatedIsLoading: false,
})




export const getEthnicityListSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  ethnicityList: response,
  ethnicityListErrorMessage: null,
  authenticatedIsLoading: false,
})

export const getEthnicityListFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  ethnicityList: [],
  ethnicityListErrorMessage: errorMessage,
  authenticatedIsLoading: false,
})




export const getRaceListSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  raceList: response,
  raceListErrorMessage: null,
  authenticatedIsLoading: false,
})

export const getRaceListFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  raceList: [],
  raceListErrorMessage: errorMessage,
  authenticatedIsLoading: false,
})



export const getGenderListSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  genderList: response,
  genderListErrorMessage: null,
  authenticatedIsLoading: false,
})

export const getGenderListFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  genderList: [],
  genderListErrorMessage: errorMessage,
  authenticatedIsLoading: false,
})


export const getParticipationTypeSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  participationTypeList: response,
  participationTypeErrorMessage: null,
  authenticatedIsLoading: false,
})

export const getParticipationTypeFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  participationTypeList: [],
  participationTypeErrorMessage: errorMessage,
  authenticatedIsLoading: false,
})


export const sendVerifyCodeSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  verifyCode: response,
  verificationCodeErrorMessage: null,
  authenticatedIsLoading: false,
})

export const sendVerifyCodeFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  verifyCode: null,
  verificationCodeErrorMessage: errorMessage,
  authenticatedIsLoading: false,
})

export const resetStateCity = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  cityStateByZipCodeResponse: null,
})



export const forgotUpdatePasswordSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  forgotPasswordResponse: response,
  forgotPasswordFailure: null,
  authenticatedIsLoading: false
})

export const forgotUpdatePasswordFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  forgotPasswordResponse: null,
  forgotPasswordFailure: errorMessage,
  authenticatedIsLoading: false
})




export const getUserKeyByEmailSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  userKeyByEmailResponse: response,
  userKeyByEmailErrorMessage: null,
  authenticatedIsLoading: false
})

export const getUserKeyByEmailFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  userKeyByEmailResponse: null,
  userKeyByEmailErrorMessage: errorMessage,
  authenticatedIsLoading: false
})

export const resetEmailExistingStates = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  userKeyByEmailResponse: null,
  userKeyByEmailErrorMessage: null,
  authenticatedIsLoading: false
})



export const resetVerifyCodeState = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  verifyCode: null,
  verificationCodeErrorMessage: null,
})

export const resetUserKeyByEmailStates = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  userKeyByEmailResponse: null,
  userKeyByEmailErrorMessage: null,
})


export const resetForgotPasswordStates = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  forgotPasswordResponse: null,
  forgotPasswordErrorMessage: null,

})


export const updateUserDetailSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  updateUserDetailSuccessMessage: response,
  updateUserDetailErroressage: null,
  authenticatedIsLoading: false
})


export const updateUserDetailFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  updateUserDetailErroressage: errorMessage,
  updateUserDetailSuccessMessage: null,
  authenticatedIsLoading: false
})

export const resetUpdateUserDetail = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  updateUserDetailErroressage: null,
  updateUserDetailSuccessMessage: null,
})

//akshay , FOR CertifiedTesters LIST GETTING
//4 step
export const saveCertifiedTesterRegistrationSuccess = (state, { certifiedTesterSuccess }) => ({  // {CertifiedTestersSuccessResponse} COMING FROM ACTION getCertifiedTestersSuccess:['CertifiedTestersSuccessResponse'],
  ...state,  // SPREAD OPERATOR FOR GETTING PREVIOUS STATE
  certifiedTesterSignup: certifiedTesterSuccess,  // HERE BINDING  WITH INITIAL STATE.....certifiedAllTesters IT IS DEFINED IN INITIAL STATE 
  authenticatedIsLoading: false,
  certifiedTesterSignupErrorMessage: null,
})

export const saveCertifiedTesterRegistrationFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  certifiedTesterSignup: null,// HERE BINDING  WITH INITIAL STATE.....testAllResults IT IS DEFINED IN INITIAL STATE 
  authenticatedIsLoading: false,
  certifiedTesterSignupErrorMessage: errorMessage,
})

export const resetCertifiedTesterExistingStates = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  certifiedTesterSignup: null,
  authenticatedIsLoading: false,
  certifiedTesterSignupErrorMessage: null,
  certifiedTesterSignupResponseSuccess: null,

})
//akshay , FOR CertifiedTesters LIST GETTING


export const setAccountType = (state, { payload }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  accountType: payload

})

//for updateFacility data step 4
export const updateFacilityUserDetailSuccess = (state, { facilityResponse }) => ({  // facilityResponse COMMING FROM ACTION ITS PARAMETER OF SUCCESS  ACTION
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  updateFacilityUserDetailSuccessMessage: facilityResponse, //updateFacilityUserDetailSuccessMessage COMMING FROM INITIAL STATE
  updateFacilityUserDetailErroressage: null,
  authenticatedIsLoading: false
})


export const updateFacilityUserDetailFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  updateFacilityUserDetailErroressage: errorMessage,
  updateFacilityUserDetailSuccessMessage: null,
  authenticatedIsLoading: false
})

export const resetUpdateFacilityUserDetail = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  updateFacilityUserDetailErroressage: null,
  updateFacilityUserDetailSuccessMessage: null,

})



export const getUserSurveySuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  userSurvey: response,
  userSurveyErrorMessage: null,
  authenticatedIsLoading: false
})

export const getUserSurveyFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  userSurvey: null,
  userSurveyErrorMessage: errorMessage,
  authenticatedIsLoading: false
})

export const resetUserSurvey = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  userSurvey: null,
  userSurveyErrorMessage: null,

})





export const addUserSurveySuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  addUserSurveySuccessMessage: response,
  addUserSurveyErrorMessage: null,
  authenticatedIsLoading: false
})


export const addUserSurveyFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  addUserSurveySuccessMessage: null,
  addUserSurveyErrorMessage: errorMessage,
  authenticatedIsLoading: false
})

export const resetAddUserSurvey = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  addUserSurveySuccessMessage: null,
  addUserSurveyErrorMessage: null
})

export const sendResultEmailSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  sendResultResponse: response,
  sendResultErrorMessage: null,
  authenticatedIsLoading: false
})


export const sendResultEmailFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  sendResultResponse: null,
  sendResultErrorMessage: errorMessage,
  authenticatedIsLoading: false
})


export const closeAuthenticateUserLoading = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  authenticatedIsLoading: false
})

export const sessionExpired = (state, { message }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  authenticatedIsLoading: false,
  sessionMessage: message
})



export const changePasswordSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  changePasswordMessage: response,
  changePasswordFailure: null,
  authenticatedIsLoading: false,
})


export const changePasswordFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  changePasswordMessage: null,
  changePasswordFailure: errorMessage,
  authenticatedIsLoading: false,
})


export const resetChangePassword = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  changePasswordMessage: null,
  changePasswordFailure: null,
  authenticatedIsLoading: false,
})



export const getFacilityTypeSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  facilityTypeList: response,
  facilityTypeListErrorMessage: null,
  authenticatedIsLoading: false,
})


export const getFacilityTypeFailure = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  facilityTypeList: [],
  facilityTypeListErrorMessage: errorMessage,
  authenticatedIsLoading: false,
})


export const setFcmToken = (state, { payload }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  fcmToken: payload
})






export const getNotificationCountSuccess = (state, { response }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  badgeCount: response.count,
  notificationSuccess: response.message,
  notificationErrorMessage: null,
})


export const getNotificationCountError = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  badgeCount: 0,
  notificationSuccess: null,
  notificationErrorMessage: errorMessage,
})


export const saveUserProfileImageError = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  profilePic: null,
  profilePicError: errorMessage
})


export const setProfilePic = (state, { payload }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  profilePic: payload,
  profilePicError: null,
  authenticatedIsLoading: false,
})



export const resetProfilePic = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  profilePic: null,
  profilePicError: null,
  authenticatedIsLoading: false,
})


export const updateUserLanguageError = (state, { errorMessage }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  languageError: errorMessage,
  authenticatedIsLoading: false,
})


export const resetUpdateLanguageError = (state) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  languageError: null,
  authenticatedIsLoading: false,
})



export const selectIsLanguageChanged = (state, { payload }) => ({
  ...state, // SPREAD OPERATOR FOR GETTING PREVIOUS STATE 
  IsSelectionLangaugeDiffrent: payload,
  authenticatedIsLoading: false,
})


export const reducer = createReducer(INITIAL_STATE, {
  [AuthenticateTypes.AUTHENTICATE_USER_LOADING]: authUserLoading,
  [AuthenticateTypes.AUTHENTICATE_USER_SUCCESS]: authUserSuccess,
  [AuthenticateTypes.AUTHENTICATE_USER_FAILURE]: authUserFailure,


  [AuthenticateTypes.SAVE_REGISTRATION_FAILURE]: registrationUserFailure,
  [AuthenticateTypes.RESET_AUTHENTICATE_STATES]: resetStates,
  [AuthenticateTypes.SET_USER_AUTH_STATUS]: setUserAuthStatus,


  [AuthenticateTypes.CHECK_EMAIL_EXIST_SUCCESS]: checkEmailExistSuccess,
  [AuthenticateTypes.CHECK_EMAIL_EXIST_FAILURE]: checkEmailExistFailure,

  [AuthenticateTypes.CHECK_PHONE_EXIST_SUCCESS]: checkPhoneExistSuccess,
  [AuthenticateTypes.CHECK_PHONE_EXIST_FAILURE]: checkPhoneExistFailure,
  [AuthenticateTypes.AUTHENTICATE_USER_BY_PHONE_FAILURE]: authenticateUserByPhoneFailure,

  [AuthenticateTypes.GET_CITY_STATE_BY_ZIP_CODE_SUCCESS]: getCityStateByZipCodeSuccess,
  [AuthenticateTypes.GET_CITY_STATE_BY_ZIP_CODE_FAILURE]: getCityStateByZipCodeFailure,

  [AuthenticateTypes.GET_ETHNICITY_LIST_SUCCESS]: getEthnicityListSuccess,
  [AuthenticateTypes.GET_ETHNICITY_LIST_FAILURE]: getEthnicityListFailure,
  [AuthenticateTypes.RESET_STATE_CITY]: resetStateCity,

  [AuthenticateTypes.GET_RACE_LIST_SUCCESS]: getRaceListSuccess,
  [AuthenticateTypes.GET_RACE_LIST_FAILURE]: getRaceListFailure,

  [AuthenticateTypes.GET_GENDER_LIST_SUCCESS]: getGenderListSuccess,
  [AuthenticateTypes.GET_GENDER_LIST_FAILURE]: getGenderListFailure,

  [AuthenticateTypes.GET_PARTICIPATION_TYPE_SUCCESS]: getParticipationTypeSuccess,
  [AuthenticateTypes.GET_PARTICIPATION_TYPE_FAILURE]: getParticipationTypeFailure,

  [AuthenticateTypes.SAVE_SIGN_UP_PAYLOAD]: saveSignUpPayload,
  [AuthenticateTypes.SAVE_BUILD_PROFILE_PAYLOAD]: saveBuildProfilePayload,

  [AuthenticateTypes.SEND_VERIFY_CODE_SUCCESS]: sendVerifyCodeSuccess,
  [AuthenticateTypes.SEND_VERIFY_CODE_FAILURE]: sendVerifyCodeFailure,

  [AuthenticateTypes.FORGOT_UPDATE_PASSWORD_SUCCESS]: forgotUpdatePasswordSuccess,
  [AuthenticateTypes.FORGOT_UPDATE_PASSWORD_FAILURE]: forgotUpdatePasswordFailure,

  [AuthenticateTypes.GET_USER_KEY_BY_EMAIL_SUCCESS]: getUserKeyByEmailSuccess,
  [AuthenticateTypes.GET_USER_KEY_BY_EMAIL_FAILURE]: getUserKeyByEmailFailure,
  [AuthenticateTypes.RESET_EMAIL_EXISTING_STATES]: resetEmailExistingStates,

  [AuthenticateTypes.RESET_VERIFY_CODE_STATE]: resetVerifyCodeState,
  [AuthenticateTypes.RESET_USER_KEY_BY_EMAIL_STATES]: resetUserKeyByEmailStates,
  [AuthenticateTypes.RESET_FORGOT_PASSWORD_STATES]: resetForgotPasswordStates,


  [AuthenticateTypes.UPDATE_USER_DETAIL_SUCCESS]: updateUserDetailSuccess,
  [AuthenticateTypes.UPDATE_USER_DETAIL_FAILURE]: updateUserDetailFailure,
  [AuthenticateTypes.RESET_UPDATE_USER_DETAIL]: resetUpdateUserDetail,

  // akshay for certifiedtesterAuth
  //3 STEP

  [AuthenticateTypes.SAVE_CERTIFIED_TESTER_REGISTRATION_SUCCESS]: saveCertifiedTesterRegistrationSuccess,  //GET_CERTIFIED_TESTERS_SUCCESS it is comming from action file here we are only writing in caps letters
  [AuthenticateTypes.SAVE_CERTIFIED_TESTER_REGISTRATION_FAILURE]: saveCertifiedTesterRegistrationFailure,
  [AuthenticateTypes.RESET_CERTIFIED_TESTER_EXISTING_STATES]: resetCertifiedTesterExistingStates,
  // akshay for certifiedtesterAuth

  [AuthenticateTypes.SET_ACCOUNT_TYPE]: setAccountType,

  //for updateFacility data step 3
  [AuthenticateTypes.UPDATE_FACILITY_USER_DETAIL_SUCCESS]: updateFacilityUserDetailSuccess,  //GET_CERTIFIED_TESTERS_SUCCESS it is comming from action file here we are only writing in caps letters
  [AuthenticateTypes.UPDATE_FACILITY_USER_DETAIL_FAILURE]: updateFacilityUserDetailFailure,
  [AuthenticateTypes.RESET_UPDATE_FACILITY_USER_DETAIL]: resetUpdateFacilityUserDetail,


  [AuthenticateTypes.RESET_USER_SURVEY]: resetUserSurvey,  //GET_CERTIFIED_TESTERS_SUCCESS it is comming from action file here we are only writing in caps letters
  [AuthenticateTypes.GET_USER_SURVEY_SUCCESS]: getUserSurveySuccess,
  [AuthenticateTypes.GET_USER_SURVEY_FAILURE]: getUserSurveyFailure,

  [AuthenticateTypes.RESET_ADD_USER_SURVEY]: resetAddUserSurvey,  //GET_CERTIFIED_TESTERS_SUCCESS it is comming from action file here we are only writing in caps letters
  [AuthenticateTypes.ADD_USER_SURVEY_SUCCESS]: addUserSurveySuccess,
  [AuthenticateTypes.ADD_USER_SURVEY_FAILURE]: addUserSurveyFailure,


  //GET_CERTIFIED_TESTERS_SUCCESS it is comming from action file here we are only writing in caps letters
  [AuthenticateTypes.SEND_RESULT_EMAIL_SUCCESS]: sendResultEmailSuccess,
  [AuthenticateTypes.SEND_RESULT_EMAIL_FAILURE]: sendResultEmailFailure,
  [AuthenticateTypes.CLOSE_AUTHENTICATE_USER_LOADING]: closeAuthenticateUserLoading,

  [AuthenticateTypes.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [AuthenticateTypes.CHANGE_PASSWORD_FAILURE]: changePasswordFailure,
  [AuthenticateTypes.RESET_CHANGE_PASSWORD]: resetChangePassword,


  [AuthenticateTypes.GET_FACILITY_TYPE_SUCCESS]: getFacilityTypeSuccess,
  [AuthenticateTypes.GET_FACILITY_TYPE_FAILURE]: getFacilityTypeFailure,

  [AuthenticateTypes.SET_FCM_TOKEN]: setFcmToken,
  [AuthenticateTypes.GET_NOTIFICATION_COUNT_SUCCESS]: getNotificationCountSuccess,
  [AuthenticateTypes.GET_NOTIFICATION_COUNT_ERROR]: getNotificationCountError,

  [AuthenticateTypes.SAVE_USER_PROFILE_IMAGE_ERROR]: saveUserProfileImageError,
  [AuthenticateTypes.SET_PROFILE_PIC]: setProfilePic,
  [AuthenticateTypes.RESET_PROFILE_PIC]: resetProfilePic,

  [AuthenticateTypes.UPDATE_USER_LANGUAGE_ERROR]: updateUserLanguageError,
  [AuthenticateTypes.RESET_UPDATE_LANGUAGE_ERROR]: resetUpdateLanguageError,
  [AuthenticateTypes.SELECT_IS_LANGUAGE_CHANGED]: selectIsLanguageChanged,


})


