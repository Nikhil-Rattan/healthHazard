/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { FacilityProfileTypes } from './Actions'



export const facilityProfileLoading = (state) => ({
  ...state,
  isFacilityProfileLoading: true
})

export const getCurrentFacilitySuccess = (state, { facilityProfile }) => ({
  ...state,
  currentFacility: facilityProfile,
  isFacilityProfileLoading: false,
  currentFacilityErrorMessage: null,
})

export const getCurrentFacilityFailure = (state, { errorMessage }) => ({
  ...state,
  currentFacility: null,
  isFacilityProfileLoading: false,
  currentFacilityErrorMessage: errorMessage,
})

export const getAllFacilitySuccess = (state, { facilities }) => ({
  ...state,
  allFacility: facilities,
  isFacilityProfileLoading: false,
  allFacilityErrorMessage: null,
})

export const getAllFacilityFailure = (state, { errorMessage }) => ({
  ...state,
  allFacility: [],
  isFacilityProfileLoading: false,
  allFacilityErrorMessage: errorMessage,
})

export const resetCurrentFacilityStates = (state) => ({
  ...state,
  currentFacility: null,
  isFacilityProfileLoading: false,
  currentFacilityErrorMessage: null,

})


export const resetAllFacilityStates = (state) => ({
  ...state,
  allFacility: [],
  isFacilityProfileLoading: false,
  allFacilityErrorMessage: null,

})



export const getPatientInfoByKitNoSuccess = (state, { responsePayload }) => ({
  ...state,
  currentFacility: responsePayload,
  isFacilityProfileLoading: false,
  currentFacilityErrorMessage: null,
})

export const getPatientInfoByKitNoFailure = (state, { errorMessage }) => ({
  ...state,
  currentFacility: null,
  isFacilityProfileLoading: false,
  currentFacilityErrorMessage: errorMessage,
})




export const savePatientDetailSuccess = (state, { response }) => ({
  ...state,
  patientDetailErrorMessage: null,
  patientDetailSuccessMessage: response.successMessage,
  recentlyAddedPatientResponse: response.patientResponse,
  isFacilityProfileLoading: false
})


export const savePatientDetailFailure = (state, { errorMessage }) => ({
  ...state,
  patientDetailErrorMessage: errorMessage,
  patientDetailSuccessMessage: null,
  recentlyAddedPatientResponse: null,
  isFacilityProfileLoading: false
})

export const resetSavePatientDetail = (state) => ({
  ...state,
  patientDetailErrorMessage: null,
  patientDetailSuccessMessage: null,
  isFacilityProfileLoading: false
})


export const scanQrCodeAndAddResultSuccess = (state, { response }) => ({
  ...state,
  scanQRCodeSuccessMessage: response.successMessage,
  scanQRCodeSuccessResonse: response.scanResponse,
  scanQRCodeErrorMessage: null,
  isFacilityProfileLoading: false
})




export const scanQrCodeAndAddResultFailure = (state, { errorMessage }) => ({
  ...state,
  scanQRCodeSuccessMessage: null,
  scanQRCodeErrorMessage: errorMessage,
  scanQRCodeSuccessResonse: null,
  isFacilityProfileLoading: false
})
//akshay , FOR CertifiedTesters LIST GETTING




export const resetScanQrCodeAndAddResult = (state) => ({
  ...state,
  scanQRCodeSuccessMessage: null,
  scanQRCodeErrorMessage: null,
  isFacilityProfileLoading: false
})





//akshay , FOR CertifiedTesters LIST GETTING
//4 step
export const getCertifiedTestersSuccess = (state, { CertifiedTestersSuccessResponse }) => ({  // {CertifiedTestersSuccessResponse} COMING FROM ACTION getCertifiedTestersSuccess:['CertifiedTestersSuccessResponse'],
  ...state,  //  FOR GETTING PREVIOUS STATE 
  certifiedAllTesters: CertifiedTestersSuccessResponse,  // HERE BINDING  WITH INITIAL STATE.....certifiedAllTesters IT IS DEFINED IN INITIAL STATE 
  isFacilityProfileLoading: false,
  currentFacilityErrorMessage: null,
})

export const getCertifiedTestersFailure = (state, { errorMessage }) => ({
  ...state,
  certifiedAllTesters: [],// HERE BINDING  WITH INITIAL STATE.....testAllResults IT IS DEFINED IN INITIAL STATE 
  isFacilityProfileLoading: false,
  currentFacilityErrorMessage: errorMessage,
})

export const resetAllCertifiedTestersStates = (state) => ({
  ...state,
  certifiedAllTesters: [],
  isFacilityProfileLoading: false,
  currentFacilityErrorMessage: null,

})


export const addKitResultSuccess = (state, { response }) => ({
  ...state,
  isFacilityProfileLoading: false,
  addKitResultSuccessMessage: response,
  addKitResultErrorMessage: null

})



export const addKitResultFailure = (state, { errorMessage }) => ({
  ...state,
  isFacilityProfileLoading: false,
  addKitResultSuccessMessage: null,
  addKitResultErrorMessage: errorMessage

})


export const resetAddKitResult = (state) => ({
  ...state,
  isFacilityProfileLoading: false,
  addKitResultSuccessMessage: null,
  addKitResultErrorMessage: null

})


export const getFaqListSuccess = (state, { response }) => ({
  ...state,
  isFacilityProfileLoading: false,
  faqContentList: response.List,
  faqContentSuccessMessage: response.Message,
  faqContentErrorrMessage: null,
})



export const getFaqListFailure = (state, { errorMessage }) => ({
  ...state,
  isFacilityProfileLoading: false,
  faqContentList: [],
  faqContentSuccessMessage: null,
  faqContentErrorrMessage: errorMessage,

})



export const resetFaqList = (state) => ({
  ...state,
  isFacilityProfileLoading: false,
  faqContentList: [],
  faqContentSuccessMessage: null,
  faqContentErrorrMessage: null,

})




export const getNearByFacilitySuccess = (state, { nearByfacilities }) => ({
  ...state,
  allNearByFacility: nearByfacilities,
  allNearByErrorMessage: null,
  allNearBySuccessMessage: null,
})

export const getNearByFacilityFailure = (state, { errorMessage }) => ({
  ...state,
  allNearByFacility: [],
  allNearByErrorMessage: null,
  allNearBySuccessMessage: errorMessage,
})

export const resetAllNearByFacilityStates = (state) => ({
  ...state,
  allNearByFacility: [],
  allNearByErrorMessage: null,
  allNearBySuccessMessage: null,

})

export const closeFacilityProfileLoading = (state) => ({
  ...state,
  isFacilityProfileLoading: false,

})

export const getTesterForEditSuccess = (state, { response }) => ({
  ...state,
  testerInfoForEdit: response,
  isFacilityProfileLoading: false,


})


export const resetTesterForEdit = (state) => ({
  ...state,
  testerInfoForEdit: null,
  isFacilityProfileLoading: false,


})






export const reducer = createReducer(INITIAL_STATE, {


  [FacilityProfileTypes.GET_CURRENT_FACILITY_SUCCESS]: getCurrentFacilitySuccess,
  [FacilityProfileTypes.GET_CURRENT_FACILITY_FAILURE]: getCurrentFacilityFailure,
  [FacilityProfileTypes.RESET_CURRENT_FACILITY_STATES]: resetCurrentFacilityStates,

  [FacilityProfileTypes.GET_ALL_FACILITY_SUCCESS]: getAllFacilitySuccess,
  [FacilityProfileTypes.GET_ALL_FACILITY_FAILURE]: getAllFacilityFailure,
  [FacilityProfileTypes.RESET_ALL_FACILITY_STATES]: resetAllFacilityStates,


  [FacilityProfileTypes.GET_NEAR_BY_FACILITY_SUCCESS]: getNearByFacilitySuccess,
  [FacilityProfileTypes.GET_NEAR_BY_FACILITY_FAILURE]: getNearByFacilityFailure,
  [FacilityProfileTypes.RESET_ALL_NEAR_BY_FACILITY_STATES]: resetAllNearByFacilityStates,




  [FacilityProfileTypes.FACILITY_PROFILE_LOADING]: facilityProfileLoading,

  [FacilityProfileTypes.GET_PATIENT_INFO_BY_KIT_NO_SUCCESS]: getPatientInfoByKitNoSuccess,

  [FacilityProfileTypes.GET_PATIENT_INFO_BY_KIT_NO_FAILURE]: getPatientInfoByKitNoFailure,



  //akshay , FOR CertifiedTesters LIST GETTING
  //3 step
  [FacilityProfileTypes.GET_CERTIFIED_TESTERS_SUCCESS]: getCertifiedTestersSuccess,  //GET_CERTIFIED_TESTERS_SUCCESS it is comming from action file here we are only writing in caps letters
  [FacilityProfileTypes.GET_CERTIFIED_TESTERS_FAILURE]: getCertifiedTestersFailure,
  [FacilityProfileTypes.RESET_ALL_CERTIFIED_TESTERS_STATES]: resetAllCertifiedTestersStates,

  // NOTE: getCertifiedTestersSuccess & getCertifiedTestersFailure & resetAllCertifiedTestersStates ALL ARE METHODS WHICH WE ARE IMPLEMENTED  WITH IN PAGE WE ARE JUST BINDING THE METHODS HERE 

  //akshay , FOR CertifiedTesters LIST GETTING

  [FacilityProfileTypes.SAVE_PATIENT_DETAIL_SUCCESS]: savePatientDetailSuccess,
  [FacilityProfileTypes.SAVE_PATIENT_DETAIL_FAILURE]: savePatientDetailFailure,
  [FacilityProfileTypes.RESET_SAVE_PATIENT_DETAIL]: resetSavePatientDetail,

  [FacilityProfileTypes.SCAN_QR_CODE_AND_ADD_RESULT_SUCCESS]: scanQrCodeAndAddResultSuccess,
  [FacilityProfileTypes.SCAN_QR_CODE_AND_ADD_RESULT_FAILURE]: scanQrCodeAndAddResultFailure,
  [FacilityProfileTypes.RESET_SCAN_QR_CODE_AND_ADD_RESULT]: resetScanQrCodeAndAddResult,



  [FacilityProfileTypes.ADD_KIT_RESULT_SUCCESS]: addKitResultSuccess,

  [FacilityProfileTypes.ADD_KIT_RESULT_FAILURE]: addKitResultFailure,

  [FacilityProfileTypes.RESET_ADD_KIT_RESULT]: resetAddKitResult,


  [FacilityProfileTypes.GET_FAQ_LIST_SUCCESS]: getFaqListSuccess,
  [FacilityProfileTypes.GET_FAQ_LIST_FAILURE]: getFaqListFailure,
  [FacilityProfileTypes.RESET_FAQ_LIST]: resetFaqList,
  [FacilityProfileTypes.CLOSE_FACILITY_PROFILE_LOADING]: closeFacilityProfileLoading,

  [FacilityProfileTypes.GET_TESTER_FOR_EDIT_SUCCESS]: getTesterForEditSuccess,
  [FacilityProfileTypes.RESET_TESTER_FOR_EDIT]: resetTesterForEdit,




})


