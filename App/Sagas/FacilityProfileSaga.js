import {put, call, select} from 'redux-saga/effects';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import {FacilityService} from 'App/Services/FacilityService';
import NavigationService from 'App/Services/NavigationService';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import {AuthenticateService} from 'App/Services/AuthenticateService';
import {LanguageEnum, SubjectsEnum, EmailEnum, Enums} from 'App/Enums';
import {Config} from 'App/Config';
const getStartup = (state) => state.startup;
/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* getCurrentFacilityProfile({facilityPayload}) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    yield put(FacilityProfileActions.facilityProfileLoading());

    // Fetch user informations from an API

    const response = yield call(
      FacilityService.GetFacilityInfo,
      facilityPayload,
    );
    //console.log(response);
    if (response) {
      if (response.length > 0) {
        yield put(
          FacilityProfileActions.getCurrentFacilitySuccess(response[0]),
        );
      } else {
        yield put(
          FacilityProfileActions.getCurrentFacilityFailure('Oops-Failed'),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(FacilityProfileActions.getCurrentFacilityFailure('Oops-Failed'));
  }
}

export function* getAllFacilityProfiles({facilityPayload}) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    yield put(FacilityProfileActions.facilityProfileLoading());

    // Fetch user informations from an API

    const response = yield call(
      FacilityService.GetFacilityInfo,
      facilityPayload,
    );
    //console.log(response);
    if (response) {
      if (response.length > 0) {
        console.log(response.length);
        yield put(FacilityProfileActions.getAllFacilitySuccess(response));
      } else {
        yield put(FacilityProfileActions.getAllFacilityFailure('Oops-Failed'));
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(FacilityProfileActions.getAllFacilityFailure('Oops-Failed'));
  }
}

export function* getNearByFacility({facilityNearByPayload}) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    yield put(FacilityProfileActions.facilityProfileLoading());

    // Fetch user informations from an API

    const response = yield call(
      FacilityService.GetFacilityInfo,
      facilityNearByPayload,
    );
    //console.log(response);
    if (response) {
      if (response.length > 0) {
        console.log(response.length);
        yield put(FacilityProfileActions.getNearByFacilitySuccess(response));
      } else {
        yield put(
          FacilityProfileActions.getNearByFacilityFailure('Oops-Failed'),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(FacilityProfileActions.getNearByFacilityFailure('Oops-Failed'));
  }
}

export function* getFacilityByQrCode({code}) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    yield put(FacilityProfileActions.facilityProfileLoading());

    // Fetch user informations from an API

    const response = yield call(FacilityService.GetUserByQrCode, code);
    //console.log(response);
    if (response) {
      if (response.length > 0) {
        yield put(
          FacilityProfileActions.getCurrentFacilitySuccess(response[0]),
        );
        NavigationService.navigate('FacilityDetails');
      } else {
        yield put(
          FacilityProfileActions.getCurrentFacilityFailure('Oops-Failed'),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(FacilityProfileActions.getCurrentFacilityFailure('Oops-Failed'));
  }
}

//akshay , FOR CertifiedTesters LIST GETTING
// 6 step
export function* getAllCertifiedTesters({CertifiedTestersPayload}) {
  try {
    console.log(CertifiedTestersPayload);
    // NOTE here we can give any method name getAllCertifiedTesters but we always try to copy method from action
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    yield put(FacilityProfileActions.facilityProfileLoading());

    // Fetch user informations from an API

    const response = yield call(
      FacilityService.GetCertificateTestersInfo,
      CertifiedTestersPayload,
    ); //GetCertificateTestersInfo method name comming from facilityservices.js
    //CertifiedTestersPayload comming from action  getAllCertifiedTesters:['CertifiedTestersPayload'],
    //console.log(response);
    if (response) {
      if (response.length > 0) {
        yield put(FacilityProfileActions.getCertifiedTestersSuccess(response));
        //getCertifiedTestersSuccess comming from  getCertifiedTestersSuccess:['CertifiedTestersSuccessResponse'],
      } else {
        yield put(FacilityProfileActions.getCertifiedTestersSuccess([]));
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(FacilityProfileActions.getCertifiedTestersFailuer('Oops-Failed'));
  }
}
//akshay , FOR CertifiedTesters LIST GETTING

export function* savePatientDetail({payload}) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    // const authenticate = yield select(getAuthenticate)
    yield put(FacilityProfileActions.facilityProfileLoading());

    //  let {userPayload}=payload

    const response = yield call(
      AuthenticateService.UpdatePatientDetail,
      payload,
    );
    //console.log(response);

    if (response) {
      if (response[0][0].Status) {
        //console.log(JSON.stringify(response))

        yield put(
          FacilityProfileActions.savePatientDetailSuccess({
            successMessage: response[0][0].LanguageKey,
            patientResponse: response[1][0],
          }),
        );
        // yield put(AuthenticateActions.authenticateUserSuccess(response[1]))
        // yield put(AuthenticateActions.getUserDetailById({UserId:userDetail.UserId,UserKey:userDetail.UserKey,IsComeFrom:Enums.UpdateUserScreen}))
      } else {
        let message = response[0].LanguageKey;
        //alert(message)
        yield put(FacilityProfileActions.savePatientDetailFailure(message));
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(FacilityProfileActions.savePatientDetailFailure('Oops-Failed'));
  }
}

export function* scanQrCodeAndAddResult({payload}) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    // const authenticate = yield select(getAuthenticate)
    yield put(FacilityProfileActions.facilityProfileLoading());

    //  let {userPayload}=payload

    const response = yield call(FacilityService.ScanQRCodeInfo, payload);

    if (response) {
      if (response[0].Status) {
        //console.log(JSON.stringify(response))

        yield put(
          FacilityProfileActions.scanQrCodeAndAddResultSuccess({
            successMessage: response[0].ResponseMessage,
            scanResponse: response[0],
          }),
        );
        // yield put(AuthenticateActions.authenticateUserSuccess(response[1]))
        // yield put(AuthenticateActions.getUserDetailById({UserId:userDetail.UserId,UserKey:userDetail.UserKey,IsComeFrom:Enums.UpdateUserScreen}))
      } else {
        let message = response[0].LanguageKey;
        // alert(message)
        yield put(
          FacilityProfileActions.scanQrCodeAndAddResultFailure(message),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(
      FacilityProfileActions.scanQrCodeAndAddResultFailure('Oops-Failed'),
    );
  }
}

export function* addKitResult({payload}) {
  try {
    let startUp = yield select(getStartup);
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    // const authenticate = yield select(getAuthenticate)
    yield put(FacilityProfileActions.facilityProfileLoading());

    //  let {userPayload}=payload

    const response = yield call(FacilityService.AddKitResult, payload);

    if (response) {
      if (response[0].Status) {
        yield put(
          FacilityProfileActions.addKitResultSuccess(response[0].LanguageKey),
        );
        if (payload.KitNo === null) {
          return false;
        }
        else {
        const emailPayload = {
          Email: response[0].PatientEmail,
          Params: {
            URL: Config.ImageURL,
            SMSURL: Config.SMSFrontURL,
            IsSpanish: startUp.locale == LanguageEnum.Spanish,
          },
          Subject: SubjectsEnum['TestResultReady-' + startUp.locale], //  (startUp.locale==LanguageEnum.Spanish)?SubjectsEnum.TestResultReadySpanish:SubjectsEnum.TestResultReady,
          EmailType: EmailEnum.TestResult,
          PhoneNo: response[0].PatientPhoneNo,
          PushNotification: {
            Deviceid: response[0].PatientAccessToken,
            NotificationType: Enums.PushNotificationResultMarked,
            NotificationFromId: payload.LoginUserId,
            NotificationToId: response[0].PatientUserId,
          },
        };

        yield put(AuthenticateActions.sendResultEmail(emailPayload));

        }
        // yield put(AuthenticateActions.authenticateUserSuccess(response[1]))
        // yield put(AuthenticateActions.getUserDetailById({UserId:userDetail.UserId,UserKey:userDetail.UserKey,IsComeFrom:Enums.UpdateUserScreen}))
      } else {
        let message = response[0].LanguageKey;
        // alert(message)
        yield put(FacilityProfileActions.addKitResultFailure(message));
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(FacilityProfileActions.addKitResultFailure('Oops-Failed'));
  }
}

export function* getFaqList() {
  try {
    yield put(FacilityProfileActions.facilityProfileLoading());

    const startUp = yield select(getStartup);
    const response = yield call(FacilityService.GetFaqList);

    if (response) {
      if (response[0].Status) {
        let faqResponse = response[0][startUp.locale];
        console.log('----------------------------------');
        console.log(JSON.parse(faqResponse));
        let parseContext = JSON.parse(JSON.parse(faqResponse));

        yield put(
          FacilityProfileActions.getFaqListSuccess({
            List: parseContext,
            Message: 'Added Successfully',
          }),
        );
      } else {
        yield put(FacilityProfileActions.getFaqListFailure('Oops-Failed'));
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(FacilityProfileActions.getFaqListFailure('Oops-Failed'));
  }
}
