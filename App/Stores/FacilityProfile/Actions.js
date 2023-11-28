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
  
  getCurrentFacilityProfile:['facilityPayload'],
  getCurrentFacilitySuccess: ['facilityProfile'], 
  getCurrentFacilityFailure: ['errorMessage'],
  resetCurrentFacilityStates:null,
  // authenticate user informations
  
  // The operation has started and is loading
  facilityProfileLoading: null,
  closeFacilityProfileLoading: null,
  // User informations were successfully fetched

  savePatientDetail:['payload'],
  savePatientDetailSuccess:['response'],
  savePatientDetailFailure:['errorMessage'],
  resetSavePatientDetail:null,
  

  getPatientInfoByKitNo:['kitPayload'],
  getPatientInfoByKitNoSuccess:['responsePayload'],
  getPatientInfoByKitNoFailure:['errorMessage'],


  getAllFacilityProfiles:['facilityPayload'],
  getAllFacilitySuccess: ['facilities'],
  getAllFacilityFailure: ['errorMessage'],
  resetAllFacilityStates:null,


  getNearByFacility:['facilityNearByPayload'],
  getNearByFacilitySuccess: ['nearByfacilities'],
  getNearByFacilityFailure: ['errorMessage'],
  resetAllNearByFacilityStates:null,

  getFacilityByQrCode:['code'],


      //akshay , CertifiedTesters LIST GETTING  
      // Step first
      getAllCertifiedTesters:['CertifiedTestersPayload'],  // its mathods which for api call 
      getCertifiedTestersSuccess:['CertifiedTestersSuccessResponse'],  // for getting response of list after api all success
      getCertifiedTestersFailure:['errorMessageFailureResponse'],  // if any error comes after api  call
      resetAllCertifiedTestersStates:null,
        //akshay , CertifiedTesters LIST GETTING
    scanQrCodeAndAddResult: ['payload'],
    scanQrCodeAndAddResultSuccess: ['response'],
    scanQrCodeAndAddResultFailure: ['errorMessage'],
    resetScanQrCodeAndAddResult: null,

    getFaqList: null,
    getFaqListSuccess: ['response'],
    getFaqListFailure: ['errorMessage'],
    resetFaqList: null,

    addKitResult: ['payload'],
    addKitResultSuccess: ['response'],
    addKitResultFailure: ['errorMessage'],
    resetAddKitResult: null,
 
    getTesterForEditSuccess:['response'], 
    resetTesterForEdit:null

   
})

export const FacilityProfileTypes = Types
export default Creators
