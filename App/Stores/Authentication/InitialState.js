/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {

  //Sign In States
  isAuthenticate: false,
  accountType: 2,
  authenticatedUser: {},
  authenticatedErrorMessage: null,
  authenticatedSuccessMessage: null,

  // Register States
  fcmToken: null,
  userKeyByEmailResponse: null,
  userKeyByEmailErrorMessage: null,
  userAccessKey: null,
  sessionMessage: null,

  registrationErrorMessage: null,
  registrationSuccessMessage: null,

  ethnicityList: [],
  ethnicityListErrorMessage: null,
  raceList: [],
  raceListErrorMessage: null,
  participationTypeList: [],
  participationTypeErrorMessage: null,
  genderList: [],
  genderListErrorMessage: null,
  cityList: [],
  stateList: [],
  cityStateByZipCodeResponse: null,
  cityStateByZipCodeErrorMessage: null,

  // Language States
  languageError: null,
  IsSelectionLangaugeDiffrent: false,

  // User Profile States
  userProfile: null,
  userProfileErrorMessage: null,
  profilePic: null,
  profilePicError: null,

  // Change Password
  changePasswordMessage: null,
  changePasswordFailure: null,
  forgotPasswordResponse: null,
  forgotPasswordErrorMessage: null,

  // Common loader
  authenticatedIsLoading: false,

  // VerificationCode
  emailExistErrorMessage: null,
  phoneExistErrorMessage: null,
  signUpPayload: null,
  emailExistSuccessMessage: null,
  phoneExistSuccessMessage: null,
  buildProfilePayload: null,
  verifyCode: null,
  verificationCodeErrorMessage: null,

  // Update Profile for Patient
  updateUserDetailErroressage: null,
  updateUserDetailSuccessMessage: null,

  // Add tester for Facility Module
  certifiedTesterSignup: null,
  certifiedTesterSignupResponseSuccess: null,
  certifiedTesterSignupErrorMessage: null,

  //For Update Facility data 
  updateFacilityUserDetailErroressage: null,
  updateFacilityUserDetailSuccessMessage: null,

  userSurvey: null,
  userSurveySuccessMessage: null,
  userSurveyErrorMessage: null,

  addUserSurveySuccessMessage: null,
  addUserSurveyErrorMessage: null,
  sendResultResponse: null,
  sendResultErrorMessage: null,

  facilityTypeList: [],
  facilityTypeListErrorMessage: null,

  // For Push notification
  badgeCount: 0,
  notificationSuccess: null,
  notificationErrorMessage: null,
}
