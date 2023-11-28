import { put, call, select } from 'redux-saga/effects'
import ExampleActions from 'App/Stores/Example/Actions'
import StartupActions from 'App/Stores/Startup/Actions'
import NavigationService from 'App/Services/NavigationService'
import { Enums } from 'App/Enums'
import { Messages } from 'App/I18n/AllLangiagesMessage'
import { AuthenticateService } from 'App/Services/AuthenticateService'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
const getAuthenticate = state => state.authenticate
const getStartup = state => state.startup
/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  // console.log("Reached")
  // yield put(StartupActions.getAllMessages())  
  let startUp = yield select(getStartup)
  yield put(
    StartupActions.getAllMessagesSuccess(Messages))
  yield put(StartupActions.updateLanguage(startUp.locale ? startUp.locale : 'sp'))

  const authenticate = yield select(getAuthenticate)
  // Add more operations you need to do at startup here
  // ...

  // When those operations are finished we redirect to the main screen

  if (authenticate.isAuthenticate) {


    console.log("Called")
    setTimeout(() => {
      let dashboad = authenticate.authenticatedUser?.UserRoleId == Enums.Patient ? 'PatientHome' : 'FacilityHome'
      NavigationService.navigateAndReset(dashboad)
    }, 3600);
  }
  else {
    setTimeout(() => {
      NavigationService.navigateAndReset('LaunchingScreen')
    }, 3600);
  }

}

export function* getAllMessages() {
  let startUp = yield select(getStartup)
  try {


    console.log("start calling")
    yield put(AuthenticateActions.authenticateUserLoading())



    const response = yield call(AuthenticateService.GetAllMessagesList)

    if (response) {
      console.log("got response")
      if (response[0].Status) {
        console.log("got StaT" + response[0].Status)
        let messageResponse = response[0].MessagesText
        let parseContext = JSON.parse(JSON.parse(messageResponse))
        // alert(JSON.stringify(parseContext))

        yield put(
          StartupActions.getAllMessagesSuccess(parseContext))
        console.log("CALLED Sta")
        yield put(StartupActions.updateLanguage(startUp.locale ? startUp.locale : 'sp'))
        console.log("CALLED UPDATE LANGUAGE")
      }

      else {

        //   yield put(
        //     StartupActions.getAllMessagesFailure('Oops-Failed')
        // )
        yield put(
          StartupActions.getAllMessagesSuccess(Messages))
        yield put(StartupActions.updateLanguage(startUp.locale ? startUp.locale : 'sp'))

      }

    }


  } catch (error) {
    yield put(
      StartupActions.getAllMessagesSuccess(Messages))
    yield put(StartupActions.updateLanguage(startUp.locale ? startUp.locale : 'sp'))
  }
}


export function* updateLanguage({ locale }) {

  let startUp = yield select(getStartup)

  if (startUp.allMessage[locale]) {
    yield put(StartupActions.updateLanguageSuccess({ data: startUp.allMessage[locale], locale: locale }))
  }
  else {
    //alert("Error Occured while set app language")
    yield put(StartupActions.updateLanguageFailure('Oops-Failed'))
  }

}
