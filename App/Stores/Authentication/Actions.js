import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * Action names are turned to SNAKE_CASE into the `Types` variable. This can be used
 * to listen to actions:
 *
 * - to trigger reducers to update the state, for example in App/Stores/Example/Reducers.js
 * - to trigger sagas, for example in App/Sagas/index.js
 *
 * Actions can be dispatched:
 *
 * - in React components using `dispatch(...)`, for example in App/App.js
 * - in sagas using `yield put(...)`, for example in App/Sagas/ExampleSaga.js
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */
const { Types, Creators } = createActions({

  // setFCM 
  setFcmToken: ['payload'],
  getFcmTokenForIos: ['payload'],
  getNotificationCount: ['payload'],
  getNotificationCountSuccess: ['response'],
  getNotificationCountError: ['errorMessage'],
  resetNotificationCount: ['payload'],
  saveFcmToken: ['payload'],

  // Profile picture 
  saveUserProfileImage: ["payload"],
  saveUserProfileImageSuccess: ["response"],
  saveUserProfileImageError: ["errorMessage"],
  setProfilePic: ['payload'],
  getUserProfileImage: ["payload"],
  resetProfilePic: null,

  // Language
  selectIsLanguageChanged: ['payload'],
  updateUserLanguage: ['payload'],
  updateUserLanguageError: ["errorMessage"],
  resetUpdateLanguageError: null,

  // authenticate user informations
  authenticateUser: ['authUserCredentials'],
  setAccountType: ['payload'],
  authenticateUserAfterRegistration: ['authUserCredentials'],
  authenticateUserByPhone: ['authUserloginCredentails'],


  // The operation has started and is loading
  authenticateUserLoading: null,
  closeAuthenticateUserLoading: null,
  closeAllLoader: null,

  // User informations were successfully fetched
  authenticateUserSuccess: ['authenticatedUser'],
  authenticateUserByPhoneSuccess: ['authenticatedUser'],

  // An error occurred
  authenticateUserFailure: ['errorMessage'],
  authenticateUserByPhoneFailure: ['errorMessage'],

  // Updating the user information
  updateUserDetail: ['payload'],
  updateUserDetailSuccess: ['response'],
  updateUserDetailFailure: ['errorMessage'],
  resetUpdateUserDetail: null,

  saveRegistration: ['registrationInfo'],

  // regitration informations were successfully stored
  saveRegistrationSuccess: ['registerUserInfo'],

  // An error occurred while registration
  saveRegistrationFailure: ['errorMessage'],
  resetEmailExistingStates: null,
  resetAuthenticateStates: null,
  setUserAuthStatus: ['status'],
  getUserDetailById: ['payload'],

  // Email Verification
  sendVerifyCode: ['payload'],
  sendVerifyCodeSuccess: ['response'],
  sendVerifyCodeFailure: ['errorMessage'],
  resetVerifyCodeState: null,

  sendResultEmail: ['payload'],
  sendResultEmailSuccess: ['response'],
  sendResultEmailFailure: ['errorMessage'],

  checkEmailExist: ['payload'],
  checkEmailExistSuccess: ['response'],
  checkEmailExistFailure: ['errorMessage'],

  // Phone verfication
  checkPhoneExist: ['payload'],
  checkPhoneExistSuccess: ['response'],
  checkPhoneExistFailure: ['errorMessage'],

  getUserKeyByEmail: ['payload'],
  getUserKeyByEmailSuccess: ['response'],
  getUserKeyByEmailFailure: ['errorMessage'],
  resetUserKeyByEmailStates: null,

  // Change Password
  forgotUpdatePassword: ['payload'],
  forgotUpdatePasswordSuccess: ['response'],
  forgotUpdatePasswordFailure: ['errorMessage'],
  resetForgotPasswordStates: null,
  changePassword: ['payload'],
  changePasswordSuccess: ['response'],
  changePasswordFailure: ['errorMessage'],
  resetChangePassword: null,

  // Sign Up Details 
  saveSignUpPayload: ['payload'],
  saveBuildProfilePayload: ['payload'],

  getCityStateByZipCode: ['payload'],
  getCityStateByZipCodeSuccess: ['response'],
  getCityStateByZipCodeFailure: ['errorMessage'],
  resetStateCity: [null],

  getEthnicityList: [null],
  getEthnicityListSuccess: ['response'],
  getEthnicityListFailure: ['errorMessage'],

  getRaceList: [null],
  getRaceListSuccess: ['response'],
  getRaceListFailure: ['errorMessage'],

  getParticipationType: [null],
  getParticipationTypeSuccess: ['response'],
  getParticipationTypeFailure: ['errorMessage'],

  getGenderList: [null],
  getGenderListSuccess: ['response'],
  getGenderListFailure: ['errorMessage'],

  signOut: null,
  logOut: null,

  // Adding Tester in Facility Module
  saveCertifiedTesterRegistration: ['certifiedTesterInfo'],// TesterInfo need to use in saga file in method
  saveCertifiedTesterRegistrationSuccess: ['certifiedTesterSuccess'],
  saveCertifiedTesterRegistrationFailure: ['errorMessage'],
  resetCertifiedTesterExistingStates: null,

  // Updating Facility Details
  updateFacilityUserDetail: ['facilityPayload'],
  updateFacilityUserDetailSuccess: ['facilityResponse'],
  updateFacilityUserDetailFailure: ['errorMessage'],
  resetUpdateFacilityUserDetail: null,

  // Patient Survey for Facility Module
  getUserSurvey: ['payload'],
  getUserSurveySuccess: ['response'],
  getUserSurveyFailure: ['errorMessage'],
  resetUserSurvey: null,


  addUserSurvey: ['payload'],
  addUserSurveySuccess: ['response'],
  addUserSurveyFailure: ['errorMessage'],
  resetAddUserSurvey: null,

  // Facility Details
  getFacilityType: [null],
  getFacilityTypeSuccess: ['response'],
  getFacilityTypeFailure: ['errorMessage'],

})

export const AuthenticateTypes = Types
export default Creators
