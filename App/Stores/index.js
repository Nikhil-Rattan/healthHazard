import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as ExampleReducer } from './Example/Reducers'
import { reducer as AuthenticateReducer } from './Authentication/Reducers'

import { reducer as PatientProfileReducer } from './PatientProfile/Reducers'
import { reducer as FacilityProfileReducer } from './FacilityProfile/Reducers'
import { reducer as StartupReducer } from './Startup/Reducers'
import { reducer as OrderReducer } from './Order/Reducers'


export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    example: ExampleReducer,
    authenticate: AuthenticateReducer,
    patientProfile: PatientProfileReducer,
    facilityProfile: FacilityProfileReducer,
    startup: StartupReducer,
    order: OrderReducer
  })

  return configureStore(rootReducer, rootSaga)
}
