/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  //Sign In States

  selectedPatientProfile: null,

  patientKitResultImage: null,
  patientScannedKit: null,
  currentPatient: null,

  getPatientInfoErrorMessage: null,
  getPatientInfoSuccessMessage: null,

  currentPatientErrorMessage: null,
  currentPatientSuccessMessage: null,
  // Register States

  allPatient: [],
  allPatientErrorMessage: null,
  allPatientSuccessMessage: null,
  // Common loader
  isPatientProfileLoading: false,

  //akshay , FOR TEST_RESULT LIST GETTING
  testAllResults: [],
  testAllResultsSuccessMessage: null,
  testAllResultsErrorMessage: null,
  //akshay , FOR TEST_RESULT LIST GETTING

  associateValidateKitWithPatientSuccessMessage: null,
  associateValidateKitWithPatientFailureMessage: null,

  addPatientResultErrorMessage: null,
  addPatientResultSuccessMessage: null,
  kitScanResponse: null,

  saveKitResultImageErrorMessage: null,
  saveKitResultImageSuccessMessage: null,

  //akshay , FOR Telehealth Experts LIST GETTING 2 step
  allTelehealthExperts: [],
  allTelehealthExpertsSuccessMessage: null,
  allTelehealthExpertsErrorMessage: null,
  //akshay , FOR TEST_RESULT LIST GETTING

  prescriptionList: [],
  prescriptionErrorMessage: null,

  patientAddresses: null,
  patientAddressesErrorMessage: null,

  compeletePatientOrderSuccessMessage: null,
  compeletePatientOrderErrorMessage: null,

  editShippingAddressError: null,
  editShippingAddressSuccess: null,

  orderList: null,
  orderListError: null,

  orderTracking: null,
  orderTrackingError: null,
};
