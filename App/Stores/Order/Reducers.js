/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { OrderTypes } from './Actions'


export const paymentLoading = (state) => ({
  ...state, 
  paymentIsLoading: false,
  createIntentErrorMessage: null,
})

export const createIntentSuccess = (state, { payloadSuccess }) => ({
  ...state,
  createIntentResponse: payloadSuccess,
  paymentIsLoading: false,
  createIntentErrorMessage: null,
})

export const createIntentFailure = (state, { errorMessage }) => ({
  ...state,
  createIntentResponse: null,
  paymentIsLoading: false,
  createIntentErrorMessage: errorMessage,
})


export const resetIntent = (state) => ({
  ...state,
  createIntentResponse: null,
  paymentIsLoading: false,
  createIntentErrorMessage: null,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [OrderTypes.PAYMENT_LOADING]: paymentLoading,
  [OrderTypes.CREATE_INTENT_SUCCESS]: createIntentSuccess,
  [OrderTypes.CREATE_INTENT_FAILURE]: createIntentFailure,
  [OrderTypes.RESET_INTENT]: resetIntent,
})


 