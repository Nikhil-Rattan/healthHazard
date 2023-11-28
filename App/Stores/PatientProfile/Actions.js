import {createActions} from 'reduxsauce';

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
const {Types, Creators} = createActions({
  storePatientProfileImage: ['payload'],
  storePatientProfileImageSuccess: ['response'],
  storePatientProfileImageError: ['errorMessage'],
  resetPatientProfileImage: null,

  getCurrentPatientProfile: ['patientPayload'],
  getCurrentPatientSuccess: ['patientProfile'],
  getCurrentPatientFailure: ['errorMessage'],
  resetCurrentPatientStates: null,
  // authenticate user informations

  // The operation has started and is loading
  patientProfileLoading: null,
  closePatientProfileLoading: null,
  // User informations were successfully fetched

  associateValidateKitWithPatient: ['patientPayload'],
  associateValidateKitWithPatientSuccess: ['successMessage'],
  associateValidateKitWithPatientFailure: ['errorMessage'],
  resetAssociateKitStates: null,

  getPatientInfoByKitNo: ['patientPayload'],
  getPatientInfoByKitNoSuccess: ['response'],
  getPatientInfoByKitNoFailure: ['errorMessage'],
  resetPatientInfoByKitNo: null,
  resetPatientInfoMessageByKitNo: null,

  addPatientResult: ['patientPayload'],
  addPatientResultSuccess: ['successMessage'],
  addPatientResultFailure: ['errorMessage'],

  getAllPatientProfiles: ['patientPayload'],
  getAllPatientSuccess: ['patients'],
  getAllPatientFailure: ['errorMessage'],
  resetAllPatientStates: null,
  patientKitResultPic: ['base64Image'],
  patientScannedKit: ['kitNo'],

  //akshay , FOR TEST_RESULT LIST GETTING
  getTestAllResults: ['testResultsPayload'], // its mathods which for api call
  getTestAllResultsSuccess: ['testResults'], // for getting response of list after api all success
  getTestAllResultsFailure: ['errorMessage'], // if any error comes after api  call
  resetAllTestResultsStates: null,
  setScanKitPayload: ['payload'],
  //akshay , FOR TEST_RESULT LIST GETTING

  saveKitResultImage: ['payload'], // its mathods which for api call
  saveKitResultImageSuccess: ['successPayload'], // for getting response of list after api all success
  saveKitResultImageFailure: ['errorMessage'], // if any error comes after api  call
  resetSaveKit: [null],

  //akshay , FOR Telehealth Experts LIST GETTING  1step
  getAllTelehealthExperts: ['telehealthExpertPayload'], // its mathods which for api call
  getAllTelehealthExpertsSuccess: ['telehealthExpert'], // for getting response of list after api all success
  getAllTelehealthExpertsFailure: ['errorMessage'], // if any error comes after api  call
  resetAllTelehealthExpertsStates: null,
  //akshay , FOR Telehealth Experts LIST GETTING

  getPrescription: ['payload'], // its mathods which for api call
  getPrescriptionSuccess: ['payloadSuccess'], // for getting response of list after api all success
  getPrescriptionFailure: ['errorMessage'], // if any error comes after api  call
  resetPrescription: null,

  getPatientAddresses: ['payload'], // its mathods which for api call
  getPatientAddressesSuccess: ['payloadSuccess'], // for getting response of list after api all success
  getPatientAddressesFailure: ['errorMessage'], // if any error comes after api  call
  resetPatientAddresses: null,

  compeletePatientOrder: ['payload'], // its mathods which for api call
  compeletePatientOrderSuccess: ['payloadSuccess'], // for getting response of list after api all success
  compeletePatientOrderFailure: ['errorMessage'], // if any error comes after api  call
  resetCompeletePatientOrder: null,

  editShippingAddress: ['payload'],
  editShippingAddressSuccess: ['payloadSuccess'],
  editShippingAddressFailure: ['errorMessage'],
  resetEditShippingAddress: null,

  getOrderHistory: ['payload'],
  getOrderHistorySuccess: ['payloadSuccess'],
  getOrderHistoryFailure: ['errorMessage'],
  resetGetOrderHistory: null,

  getOrderDetail: ['payload'],
  getOrderDetailSuccess: ['payloadSuccess'],
  getOrderDetailFailure: ['errorMessage'],
  resetGetOrderDetail: null,
});

export const PatientProfileTypes = Types;
export default Creators;
