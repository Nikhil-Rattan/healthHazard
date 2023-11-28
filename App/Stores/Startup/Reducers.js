/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { StartupTypes } from './Actions'
 

export const updateLanguage = (state,{locale}) => ({
  ...state,
  locale: locale,
  errorMessage: null,
})

export const updateLanguageSuccess = (state,{response}) => ({
  ...state, 
  selectedMessage:response.data, 
  locale:response.locale, 
  errorMessage: null,
})

export const updateLanguageFailure = (state,{errorMessage}) => ({
  ...state,
  locale:null,
  selectedMessage:[], 
  errorMessage: errorMessage,
})


export const getAllMessagesSuccess = (state,{response}) => ({
  ...state, 
  allMessage:response, 
  errorMessage: null,
})


export const getAllMessagesFailure = (state,{errorMessage}) => ({
  ...state,
  allMessage:[], 
  errorMessage: errorMessage,
})

 
/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  // [StartupTypes.UPDATE_LANGUAGE]: fetchUserLoading,
  [StartupTypes.UPDATE_LANGUAGE_SUCCESS]: updateLanguageSuccess,
  [StartupTypes.GET_ALL_MESSAGES_SUCCESS]: getAllMessagesSuccess,
  [StartupTypes.GET_ALL_MESSAGES_FAILURE]: getAllMessagesFailure,
})
