/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  //Sign In States
  currentFacility: null, 
  currentFacilityErrorMessage: null, 
  currentFacilitySuccessMessage: null, 

  testerInfoForEdit: null,  


  // Register States
 
  allFacility: [], 
  allFacilityErrorMessage: null, 
  allFacilitySuccessMessage: null, 
  // Common loader
  isFacilityProfileLoading: false,


  allNearByFacility: [],
  allNearByErrorMessage: null, 
  allNearBySuccessMessage: null, 

  
 patientDetailErrorMessage:null, 
 patientDetailSuccessMessage:null,


 recentlyAddedPatientResponse : null , 

 
 scanQRCodeSuccessMessage:null,
 scanQRCodeSuccessResonse:null,
 scanQRCodeErrorMessage:null,


  //akshay , FOR CertifiedTesters LIST GETTING
  // 2 step
  certifiedAllTesters:[],
  certifiedAllTestersSuccessMessage:null,
  certifiedAllTestersErrorMessage:null,
  //akshay , FOR CertifiedTesters LIST GETTING


  faqContentList:[],
  faqContentSuccessMessage:null,
  faqContentErrorrMessage:null,
  
  addKitResultSuccessMessage:null ,
  addKitResultErrorMessage:null

}
