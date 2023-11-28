import { put, call } from 'redux-saga/effects';
import PatientProfileActions from 'App/Stores/PatientProfile/Actions';
import { PatientService } from 'App/Services/PatientService';
import NavigationService from 'App/Services/NavigationService';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import { AuthenticateService } from 'App/Services/AuthenticateService';
/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* getCurrentPatientProfile({ patientPayload }) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(PatientService.GetPatientInfo, patientPayload);
    ////console.log(response);
    if (response) {
      if (response.length > 0) {
        yield put(PatientProfileActions.getCurrentPatientSuccess(response[0]));
      } else {
        yield put(
          PatientProfileActions.getCurrentPatientFailure('Oops-Failed'),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(PatientProfileActions.getCurrentPatientFailure('Oops-Failed'));
  }
}

export function* getAllPatientProfiles({ patientPayload }) {
  //  comming from action getTestAllResults:['testResultsPayload'], here testResultsPayload is parameter
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  try {
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(PatientService.GetPatientInfo, patientPayload);
    //console.log(response);
    if (response) {
      if (response.length > 0) {
        console.log(response.length);
        yield put(PatientProfileActions.getAllPatientSuccess(response));
        // getAllPatientSuccess comming from action   getAllPatientSuccess: ['patients'],
        // after that this response going to reducer
      } else {
        yield put(PatientProfileActions.getAllPatientFailure('Oops-Failed'));
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(PatientProfileActions.getAllPatientFailure('Oops-Failed'));
  }
}

export function* getAllTestResultsProfiles({ testResultsPayload }) {
  //  comming from action getTestAllResults:['testResultsPayload'], here testResultsPayload is parameter
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  try {
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(
      PatientService.GetTestResultsInfo,
      testResultsPayload,
    );
    //console.log(response);
    if (response) {
      if (response.length > 0) {
        console.log(response.length);
        yield put(PatientProfileActions.getTestAllResultsSuccess(response));
        // getAllPatientSuccess comming from action   getAllPatientSuccess: ['patients'],
        // after that this response going to reducer
      } else {
        yield put(
          PatientProfileActions.getTestAllResultsFailure('Oops-Failed'),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(PatientProfileActions.getTestAllResultsFailure('Oops-Failed'));
  }
}

export function* associateValidateKitWithPatient({ patientPayload }) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(
      patientPayload.FacilityUserId > 0
        ? PatientService.AssociateValidateKitWithPatient
        : PatientService.AssociateValidateKitWithPatientOrder,
      patientPayload,
    );
    console.log('----------------Hello----------------', response);

    if (response) {
      console.log(response.length);
      if (response[0].Status) {
        // alert(response[0].LanguageKey)
        yield put(
          PatientProfileActions.associateValidateKitWithPatientSuccess(
            { Message: response[0].LanguageKey, Status: response[0].Status }
          ),
        );
      } else {
        // alert(response[0].LanguageKey)
        yield put(
          PatientProfileActions.associateValidateKitWithPatientFailure(
            response[0].LanguageKey,
          ),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(
      PatientProfileActions.associateValidateKitWithPatientFailure(
        'Oops-Failed',
      ),
    );
  }
}

export function* getPatientInfoByKitNo({ patientPayload }) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(
      PatientService.GetPatientInfoByKitNo,
      patientPayload,
    );
    //console.log(response);
    if (response) {
      if (response.length > 1) {
        console.log(response[2][0].HasPatientInfo);

        let PatientInfo = {
          ...response[0][0],
          KitNo: patientPayload.kitNo,
          HasKitIntiatedIssue: false,
        };

        yield put(
          PatientProfileActions.getPatientInfoByKitNoSuccess({
            PatientInfo: PatientInfo,
            SuccessMessage: response[2][0].LanguageKey,
          }),
        );
      } else if (response[0][0].Status) {
        console.log(response[0][0].HasPatientInfo);

        let PatientInfo = (PatientInfo = {
          KitNo: patientPayload.kitNo,
          HasKitIntiatedIssue: true,
        });

        yield put(
          PatientProfileActions.getPatientInfoByKitNoSuccess({
            PatientInfo: PatientInfo,
            SuccessMessage: response[0][0].LanguageKey,
          }),
        );

        // NavigationService.replaceNavigateRoute('PatientDetailsScreen','FacilityQrCodeScanner')
      } else {
        yield put(
          PatientProfileActions.getPatientInfoByKitNoFailure(
            response[0][0].LanguageKey,
          ),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(
      PatientProfileActions.getPatientInfoByKitNoFailure('Oops-Failed'),
    );
  }
}

export function* addPatientResult({ patientPayload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(PatientProfileActions.patientProfileLoading());

  try {
    // Fetch user informations from an API

    const response = yield call(
      PatientService.AddPatientResult,
      patientPayload,
    );
    //console.log(response);
    if (response) {
      if (response.length > 0) {
        console.log(response.length);
        //  alert(response[0].LanguageKey)
        yield put(
          PatientProfileActions.addPatientResultSuccess(
            response[0].LanguageKey,
          ),
        );
        NavigationService.popScreen();
      } else {
        // alert('Error occured while saving patient result.')
        yield put(PatientProfileActions.addPatientResultFailure('Oops-Failed'));
      }
    } else {
      //  alert('Error occured while saving patient result.')
      // yield put(
      //   PatientProfileActions.addPatientResultFailure('Error occured while saving patient result.')
      // )
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    // alert('Error occured while saving patient result.')
    yield put(PatientProfileActions.addPatientResultFailure('Oops-Failed'));
  }
}

export function* saveKitResultImage({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(PatientProfileActions.patientProfileLoading());

  try {
    // Fetch user informations from an API
    console.log('Call saga');

    const response = yield call(PatientService.SavePatientTestImage, payload);

    console.log(response);
    if (response) {
      if (response.length > 0) {
        console.log(response.length);
        //  alert(response[0].LanguageKey)
        yield put(
          PatientProfileActions.saveKitResultImageSuccess(
            response[0].LanguageKey,
          ),
        );
      } else {
        // alert('Error occured while saving patient result.')
        yield put(
          PatientProfileActions.saveKitResultImageFailure('Oops-Failed'),
        );
      }
    } else {
      //  alert('Error occured while saving patient result.')
      // yield put(
      //   PatientProfileActions.addPatientResultFailure('Error occured while saving patient result.')
      // )
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    // alert('Error occured while saving patient result.')
    yield put(PatientProfileActions.saveKitResultImageFailure('Oops-Failed'));
  }
}

export function* getAllTelehealthExperts({ telehealthExpertPayload }) {
  //  comming from action getTestAllResults:['testResultsPayload'], here testResultsPayload is parameter
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  try {
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(
      PatientService.GetAllTelehealthExperts,
      telehealthExpertPayload,
    );
    //console.log(response);
    if (response) {
      if (response.length > 0) {
        console.log(response.length);
        yield put(
          PatientProfileActions.getAllTelehealthExpertsSuccess(response),
        );
        // getAllPatientSuccess comming from action   getAllPatientSuccess: ['patients'],
        // after that this response going to reducer
      } else {
        yield put(
          PatientProfileActions.getAllTelehealthExpertsFailure('Oops-Failed'),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(
      PatientProfileActions.getAllTelehealthExpertsFailure('Oops-Failed'),
    );
  }
}

export function* getPrescription({ payload }) {
  //  comming from action getTestAllResults:['testResultsPayload'], here testResultsPayload is parameter
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  try {
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(PatientService.GetPrescription, payload);
    //console.log(response);
    if (response) {
      console.log(response.length);
      yield put(PatientProfileActions.getPrescriptionSuccess(response));
      // getAllPatientSuccess comming from action   getAllPatientSuccess: ['patients'],
      // after that this response going to reducer
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(PatientProfileActions.getPrescriptionFailure('Oops-Failed'));
  }
}

export function* getPatientAddresses({ payload }) {
  //  comming from action getTestAllResults:['testResultsPayload'], here testResultsPayload is parameter
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  try {
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(PatientService.GetPatientAddresses, payload);
    //console.log(response);
    if (response) {
      console.log(response);
      yield put(PatientProfileActions.getPatientAddressesSuccess(response[0]));
      // getAllPatientSuccess comming from action   getAllPatientSuccess: ['patients'],
      // after that this response going to reducer
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(PatientProfileActions.getPatientAddressesFailure('Oops-Failed'));
  }
}

export function* compeletePatientOrder({ payload }) {
  //  comming from action getTestAllResults:['testResultsPayload'], here testResultsPayload is parameter
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  try {
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(PatientService.UpdatePaymentStatus, payload);
    //console.log(response);
    if (response) {
      if (response[0].Status) {
        yield put(
          PatientProfileActions.compeletePatientOrderSuccess(
            response[0].ResponseMessage,
          ),
        );
      } else {
        yield put(
          PatientProfileActions.compeletePatientOrderFailure(
            response[0].ResponseMessage,
          ),
        );
      }

      // getAllPatientSuccess comming from action   getAllPatientSuccess: ['patients'],
      // after that this response going to reducer
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(
      PatientProfileActions.compeletePatientOrderFailure('Oops-Failed'),
    );
  }
}

export function* storePatientProfileImage({ payload }) {
  yield put(PatientProfileActions.patientProfileLoading());

  try {
    const response = yield call(
      AuthenticateService.GetUserProfileImage,
      payload,
    );

    if (response) {
      yield put(
        PatientProfileActions.storePatientProfileImageSuccess(
          response[0].ProfileImage,
        ),
      );
    } else {
      yield put(
        PatientProfileActions.storePatientProfileImageError(
          'Error occured while profile pic',
        ),
      );
    }
  } catch {
    yield put(
      PatientProfileActions.storePatientProfileImageError('Oops-Failed'),
    );
  }
}

export function* editShippingAddress({ payload }) {
  //  comming from action getTestAllResults:['testResultsPayload'], here testResultsPayload is parameter
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  try {
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(PatientService.EditShippingAddresses, payload);
    //console.log(response);
    if (response) {
      console.log(response);

      let userPayload = {
        PatientId: payload.PatientId,
        DecryptColumns: ['ShippingAddress', 'BillingAddress'],
        UserKey: payload.UserKey,
        OrderId: payload.OrderId,
      };

      yield put(PatientProfileActions.getPatientAddresses(userPayload));

      yield put(
        PatientProfileActions.editShippingAddressSuccess(
          'Edit-ShippingSuccess',
        ),
      );
      // getAllPatientSuccess comming from action   getAllPatientSuccess: ['patients'],
      // after that this response going to reducer
    } else {
      yield put(AuthenticateActions.signOut());
      // yield put(
      //   PatientProfileActions.editShippingAddressFailure('Oops-Failed'),
      // );
    }
  } catch (error) {
    yield put(PatientProfileActions.editShippingAddressFailure('Oops-Failed'));
  }
}

export function* getOrderHistory({ payload }) {
  //  comming from action getTestAllResults:['testResultsPayload'], here testResultsPayload is parameter
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  try {
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(PatientService.GetOrderHistoryList, payload);
    //console.log(response);
    if (response) {
      console.log(' hgjhgj Test ');
      console.log(response);
      yield put(PatientProfileActions.getOrderHistorySuccess(response));
      // getAllPatientSuccess comming from action   getAllPatientSuccess: ['patients'],
      // after that this response going to reducer
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(PatientProfileActions.getOrderHistoryFailure('Oops-Failed'));
  }
}

export function* getOrderDetail({ payload }) {
  //  comming from action getTestAllResults:['testResultsPayload'], here testResultsPayload is parameter
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  try {
    yield put(PatientProfileActions.patientProfileLoading());

    // Fetch user informations from an API

    const response = yield call(PatientService.GetOrderTracking, payload);
    //console.log(response);
    if (response) {
      console.log(response);
      yield put(PatientProfileActions.getOrderDetailSuccess(response));
      // getAllPatientSuccess comming from action   getAllPatientSuccess: ['patients'],
      // after that this response going to reducer
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(PatientProfileActions.getOrderDetailFailure('Oops-Failed'));
  }
}
