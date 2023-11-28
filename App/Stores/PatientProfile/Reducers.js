/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { PatientProfileTypes } from './Actions';

export const patientProfileLoading = (state) => ({
  ...state,
  isPatientProfileLoading: true,
});

export const getCurrentPatientSuccess = (state, { patientProfile }) => ({
  ...state,
  currentPatient: patientProfile,
  isPatientProfileLoading: false,
  currentPatientErrorMessage: null,
});

export const getCurrentPatientFailure = (state, { errorMessage }) => ({
  ...state,
  currentPatient: null,
  isPatientProfileLoading: false,
  currentPatientErrorMessage: errorMessage,
});

export const getAllPatientSuccess = (state, { patients }) => ({
  ...state,
  allPatient: patients,
  isPatientProfileLoading: false,
  allPatientErrorMessage: null,
});

export const getAllPatientFailure = (state, { errorMessage }) => ({
  ...state,
  allPatient: [],
  isPatientProfileLoading: false,
  allPatientErrorMessage: errorMessage,
});

export const resetCurrentPatientStates = (state) => ({
  ...state,
  currentPatient: null,
  isPatientProfileLoading: false,
  currentPatientErrorMessage: null,
});

export const resetAllPatientStates = (state) => ({
  ...state,
  allPatient: [],
  testAllResults: [],
  isPatientProfileLoading: false,
  allPatientErrorMessage: null,
});

export const associateValidateKitWithPatientSuccess = (
  state,
  { successMessage },
) => ({
  ...state,
  isPatientProfileLoading: false,
  associateValidateKitWithPatientSuccessMessage: successMessage,
  associateValidateKitWithPatientFailureMessage: null,
});

export const associateValidateKitWithPatientFailure = (
  state,
  { errorMessage },
) => ({
  ...state,
  isPatientProfileLoading: false,
  associateValidateKitWithPatientSuccessMessage: null,
  associateValidateKitWithPatientFailureMessage: errorMessage,
});

export const resetAssociateKitStates = (state) => ({
  ...state,
  associateValidateKitWithPatientSuccessMessage: null,
  associateValidateKitWithPatientFailureMessage: null,
  isPatientProfileLoading: false,
});

export const addPatientResultSuccess = (state, { successMessage }) => ({
  ...state,
  isPatientProfileLoading: false,
  addPatientResultSuccessMessage: successMessage,
  addPatientResultErrorMessage: null,
});

export const addPatientResultFailure = (state, { errorMessage }) => ({
  ...state,
  isPatientProfileLoading: false,
  addPatientResultSuccessMessage: null,
  addPatientResultErrorMessage: errorMessage,
});

//akshay , FOR TEST_RESULT LIST GETTING
export const getTestAllResultsSuccess = (state, { testResults }) => ({
  // {testResults} COMING FROM ACTION getTestAllResultsSuccess:['testResults'],
  ...state, //  FOR GETTING PREVIOUS STATE
  testAllResults: testResults, // HERE BINDING  WITH INITIAL STATE.....testAllResults IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  allPatientErrorMessage: null,
});

export const getTestAllResultsFailure = (state, { errorMessage }) => ({
  ...state,
  testAllResults: [], // HERE BINDING  WITH INITIAL STATE.....testAllResults IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  allPatientErrorMessage: errorMessage,
});

export const resetCurrentTestResultsStates = (state) => ({
  ...state,
  currentPatient: null,
  isPatientProfileLoading: false,
  currentPatientErrorMessage: null,
});

export const setScanKitPayload = (state, { payload }) => ({
  ...state,
  kitScanResponse: payload,
});

export const getPatientInfoByKitNoSuccess = (state, { response }) => ({
  ...state,
  isPatientProfileLoading: false,
  currentPatient: response.PatientInfo,
  getPatientInfoErrorMessage: null,
  getPatientInfoSuccessMessage: response.SuccessMessage,
});

export const getPatientInfoByKitNoFailure = (state, { errorMessage }) => ({
  ...state,
  isPatientProfileLoading: false,
  currentPatient: null,
  getPatientInfoErrorMessage: errorMessage,
  getPatientInfoSuccessMessage: null,
});

export const resetPatientInfoByKitNo = (state) => ({
  ...state,
  isPatientProfileLoading: false,
  currentPatient: null,
  getPatientInfoErrorMessage: null,
  getPatientInfoSuccessMessage: null,
});

export const resetPatientInfoMessageByKitNo = (state) => ({
  ...state,
  isPatientProfileLoading: false,
  getPatientInfoErrorMessage: null,
  getPatientInfoSuccessMessage: null,
});

export const closePatientProfileLoading = (state) => ({
  ...state,
  isPatientProfileLoading: false,
});

export const patientKitResultPic = (state, { base64Image }) => ({
  ...state,
  patientKitResultImage: base64Image,
});

export const patientScannedKit = (state, { kitNo }) => ({
  ...state,
  patientScannedKit: kitNo,
});

export const saveKitResultImageSuccess = (state, { successPayload }) => ({
  ...state,
  isPatientProfileLoading: false,
  saveKitResultImageErrorMessage: null,
  saveKitResultImageSuccessMessage: successPayload,
});

export const saveKitResultImageFailure = (state, { errorMessage }) => ({
  ...state,
  isPatientProfileLoading: false,
  saveKitResultImageErrorMessage: errorMessage,
  saveKitResultImageSuccessMessage: null,
});

export const resetSaveKit = (state) => ({
  ...state,
  isPatientProfileLoading: false,
  saveKitResultImageErrorMessage: null,
  saveKitResultImageSuccessMessage: null,
});

//akshay , FOR Telehealth Experts LIST GETTING step 4
export const getAllTelehealthExpertsSuccess = (state, { telehealthExpert }) => ({
  // {telehealthExpert} COMING FROM ACTION getTestAllResultsSuccess:['testResults'],
  ...state, //  FOR GETTING PREVIOUS STATE
  allTelehealthExperts: telehealthExpert, // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  allPatientErrorMessage: null,
});

export const getAllTelehealthExpertsFailure = (state, { errorMessage }) => ({
  ...state,
  allTelehealthExperts: [], // HERE BINDING  WITH INITIAL STATE.....testAllResults IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  allPatientErrorMessage: errorMessage,
});

export const resetAllTelehealthExpertsStates = (state) => ({
  ...state,
  currentPatient: null,
  isPatientProfileLoading: false,
  currentPatientErrorMessage: null,
});

//akshay , FOR Telehealth Experts LIST GETTING step 4
export const getPrescriptionSuccess = (state, { payloadSuccess }) => ({
  // {telehealthExpert} COMING FROM ACTION getTestAllResultsSuccess:['testResults'],
  ...state, //  FOR GETTING PREVIOUS STATE
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  prescriptionList: payloadSuccess,
  prescriptionErrorMessage: null,
});

export const getPrescriptionFailure = (state, { errorMessage }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  prescriptionList: [],
  prescriptionErrorMessage: errorMessage,
});

export const resetPrescription = (state) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  prescriptionList: [],
  prescriptionErrorMessage: null,
});

//akshay , FOR Telehealth Experts LIST GETTING Close

export const getPatientAddressesSuccess = (state, { payloadSuccess }) => ({
  // {telehealthExpert} COMING FROM ACTION getTestAllResultsSuccess:['testResults'],
  ...state, //  FOR GETTING PREVIOUS STATE
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  patientAddresses: payloadSuccess,
  patientAddressesErrorMessage: null,
});

export const getPatientAddressesFailure = (state, { errorMessage }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  patientAddresses: null,
  patientAddressesErrorMessage: errorMessage,
});

export const resetPatientAddresses = (state) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  patientAddresses: null,
  patientAddressesErrorMessage: null,
});

export const compeletePatientOrderSuccess = (state, { payloadSuccess }) => ({
  // {telehealthExpert} COMING FROM ACTION getTestAllResultsSuccess:['testResults'],
  ...state, //  FOR GETTING PREVIOUS STATE
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  compeletePatientOrderSuccessMessage: payloadSuccess,
  compeletePatientOrderErrorMessage: null,
});

export const compeletePatientOrderFailure = (state, { errorMessage }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  compeletePatientOrderSuccessMessage: null,
  compeletePatientOrderErrorMessage: errorMessage,
});

export const resetCompeletePatientOrder = (state) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  compeletePatientOrderSuccessMessage: null,
  compeletePatientOrderErrorMessage: null,
});

export const storePatientProfileImageSuccess = (state, { response }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  selectedPatientProfile: response,
});

export const storePatientProfileImageError = (state, { errorMessage }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  selectedPatientProfile: null,
});

export const resetPatientProfileImage = (state) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  selectedPatientProfile: null,
});

export const resetEditShippingAddress = (state) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  editShippingAddressError: null,
  editShippingAddressSuccess: null,
});

export const editShippingAddressFailure = (state, { errorMessage }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  editShippingAddressError: errorMessage,
  editShippingAddressSuccess: null,
});

export const editShippingAddressSuccess = (state, { payloadSuccess }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  editShippingAddressError: null,
  editShippingAddressSuccess: payloadSuccess,
});

export const resetGetOrderHistory = (state) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  orderList: null,
  orderListError: null,
});

export const getOrderHistoryFailure = (state, { errorMessage }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  orderList: null,
  orderListError: errorMessage,
});

export const getOrderHistorySuccess = (state, { payloadSuccess }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  orderList: payloadSuccess,
  orderListError: null,
});

export const resetGetOrderDetail = (state) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  orderTracking: null,
  orderTrackingError: null,
});

export const getOrderDetailFailure = (state, { errorMessage }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  orderTracking: null,
  orderTrackingError: errorMessage,
});

export const getOrderDetailSuccess = (state, { payloadSuccess }) => ({
  ...state,
  // HERE BINDING  WITH INITIAL STATE.....allTelehealthExperts IT IS DEFINED IN INITIAL STATE
  isPatientProfileLoading: false,
  orderTracking: payloadSuccess,
  orderTrackingError: null,
});

//akshay , FOR TEST_RESULT LIST GETTING
export const reducer = createReducer(INITIAL_STATE, {
  [PatientProfileTypes.GET_CURRENT_PATIENT_SUCCESS]: getCurrentPatientSuccess,
  [PatientProfileTypes.GET_CURRENT_PATIENT_FAILURE]: getCurrentPatientFailure,
  [PatientProfileTypes.RESET_CURRENT_PATIENT_STATES]: resetCurrentPatientStates,

  [PatientProfileTypes.GET_ALL_PATIENT_SUCCESS]: getAllPatientSuccess,
  // GET_ALL_PATIENT_SUCCESS in this we are getting response from saga js file  here it is in caps only
  [PatientProfileTypes.GET_ALL_PATIENT_FAILURE]: getAllPatientFailure,
  [PatientProfileTypes.RESET_ALL_PATIENT_STATES]: resetAllPatientStates,

  [PatientProfileTypes.PATIENT_PROFILE_LOADING]: patientProfileLoading,

  //akshay , FOR TEST_RESULT LIST GETTING
  [PatientProfileTypes.GET_TEST_ALL_RESULTS_SUCCESS]: getTestAllResultsSuccess,
  [PatientProfileTypes.GET_TEST_ALL_RESULTS_FAILURE]: getTestAllResultsFailure,
  [PatientProfileTypes.RESET_ALL_TEST_RESULTS_STATES]: resetCurrentTestResultsStates,

  // NOTE: getAllPatientSuccess & getAllPatientFailure & resetAllPatientStates ALL ARE METHODS WHICH WE ARE IMPLEMENTED  WITH IN PAGE WE ARE JUST BINDING THE METHODS HERE

  //akshay , FOR TEST_RESULT LIST GETTING

  [PatientProfileTypes.ASSOCIATE_VALIDATE_KIT_WITH_PATIENT_SUCCESS]: associateValidateKitWithPatientSuccess,
  [PatientProfileTypes.ASSOCIATE_VALIDATE_KIT_WITH_PATIENT_FAILURE]: associateValidateKitWithPatientFailure,
  [PatientProfileTypes.SET_SCAN_KIT_PAYLOAD]: setScanKitPayload,
  [PatientProfileTypes.RESET_ASSOCIATE_KIT_STATES]: resetAssociateKitStates,
  [PatientProfileTypes.ADD_PATIENT_RESULT_SUCCESS]: addPatientResultSuccess,
  [PatientProfileTypes.ADD_PATIENT_RESULT_FAILURE]: addPatientResultFailure,

  [PatientProfileTypes.GET_PATIENT_INFO_BY_KIT_NO_SUCCESS]: getPatientInfoByKitNoSuccess,
  [PatientProfileTypes.GET_PATIENT_INFO_BY_KIT_NO_FAILURE]: getPatientInfoByKitNoFailure,
  [PatientProfileTypes.RESET_PATIENT_INFO_BY_KIT_NO]: resetPatientInfoByKitNo,
  [PatientProfileTypes.RESET_PATIENT_INFO_MESSAGE_BY_KIT_NO]: resetPatientInfoMessageByKitNo,

  [PatientProfileTypes.CLOSE_PATIENT_PROFILE_LOADING]: closePatientProfileLoading,

  [PatientProfileTypes.PATIENT_KIT_RESULT_PIC]: patientKitResultPic,
  [PatientProfileTypes.PATIENT_SCANNED_KIT]: patientScannedKit,

  [PatientProfileTypes.SAVE_KIT_RESULT_IMAGE_SUCCESS]: saveKitResultImageSuccess,
  [PatientProfileTypes.SAVE_KIT_RESULT_IMAGE_FAILURE]: saveKitResultImageFailure,
  [PatientProfileTypes.RESET_SAVE_KIT]: resetSaveKit,

  //akshay , FOR Telehealth Experts LIST GETTING 3 step
  [PatientProfileTypes.GET_ALL_TELEHEALTH_EXPERTS_SUCCESS]: getAllTelehealthExpertsSuccess,
  [PatientProfileTypes.GET_ALL_TELEHEALTH_EXPERTS_FAILURE]: getAllTelehealthExpertsFailure,
  [PatientProfileTypes.RESET_ALL_TELEHEALTH_EXPERTS_STATES]: resetAllTelehealthExpertsStates,

  // NOTE: getAllPatientSuccess & getAllPatientFailure & resetAllPatientStates ALL ARE METHODS WHICH WE ARE IMPLEMENTED  WITH IN PAGE WE ARE JUST BINDING THE METHODS HERE

  //akshay , FOR TEST_RESULT LIST GETTING

  [PatientProfileTypes.GET_PRESCRIPTION_SUCCESS]: getPrescriptionSuccess,
  [PatientProfileTypes.GET_PRESCRIPTION_FAILURE]: getPrescriptionFailure,
  [PatientProfileTypes.RESET_PRESCRIPTION]: resetPrescription,

  [PatientProfileTypes.GET_PATIENT_ADDRESSES_SUCCESS]: getPatientAddressesSuccess,
  [PatientProfileTypes.GET_PATIENT_ADDRESSES_FAILURE]: getPatientAddressesFailure,
  [PatientProfileTypes.RESET_PATIENT_ADDRESSES]: resetPatientAddresses,

  [PatientProfileTypes.COMPELETE_PATIENT_ORDER_SUCCESS]: compeletePatientOrderSuccess,
  [PatientProfileTypes.COMPELETE_PATIENT_ORDER_FAILURE]: compeletePatientOrderFailure,
  [PatientProfileTypes.RESET_COMPELETE_PATIENT_ORDER]: resetCompeletePatientOrder,

  [PatientProfileTypes.RESET_PATIENT_PROFILE_IMAGE]: resetPatientProfileImage,
  [PatientProfileTypes.STORE_PATIENT_PROFILE_IMAGE_SUCCESS]: storePatientProfileImageSuccess,
  [PatientProfileTypes.STORE_PATIENT_PROFILE_IMAGE_ERROR]: storePatientProfileImageError,

  [PatientProfileTypes.EDIT_SHIPPING_ADDRESS_SUCCESS]: editShippingAddressSuccess,
  [PatientProfileTypes.EDIT_SHIPPING_ADDRESS_FAILURE]: editShippingAddressFailure,
  [PatientProfileTypes.RESET_EDIT_SHIPPING_ADDRESS]: resetEditShippingAddress,

  [PatientProfileTypes.GET_ORDER_HISTORY_SUCCESS]: getOrderHistorySuccess,
  [PatientProfileTypes.GET_ORDER_HISTORY_FAILURE]: getOrderHistoryFailure,
  [PatientProfileTypes.RESET_GET_ORDER_HISTORY]: resetGetOrderHistory,

  [PatientProfileTypes.GET_ORDER_DETAIL_SUCCESS]: getOrderDetailSuccess,
  [PatientProfileTypes.GET_ORDER_DETAIL_FAILURE]: getOrderDetailFailure,
  [PatientProfileTypes.RESET_GET_ORDER_DETAIL]: resetGetOrderDetail,
});
