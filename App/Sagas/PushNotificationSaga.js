import { put, call } from 'redux-saga/effects'
 
import { FirebaseClientService } from 'App/Services/FirebaseClientService' 
 
/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* sendNotification(data) {
  
 

let payload=data.notificationPayload;
 
  const response = yield call(FirebaseClientService.SendPushNotification,payload)
  console.log(response);

  if (!response) {
 alert('Error Occured while sending notification')
  }

  // yield put(DashboardActions.setUserStatus(false))



  // yield put(DashboardActions.setUserStatus(false))
  
  // yield put(CalenderAction.setEventGameType({typeId:0,eventId:0}))
 

  //   yield put(AuthenticateActions.authenticateUserSuccess({}))
 
 
 
}