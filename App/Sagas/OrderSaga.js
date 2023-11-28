import { put, call, all } from 'redux-saga/effects';
import OrderActions from 'App/Stores/Order/Actions';
import { StripePaymentService } from 'App/Services/StripePaymentService';
import { PatientService } from 'App/Services/PatientService';

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* createIntent({ payload }) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(OrderActions.paymentLoading());

  // Fetch user informations from an API

  let { paymentIntentPayload, addressPayload } = payload;

  const { paymentIntentResponse, addressResponse } = yield all({
    paymentIntentResponse: call(
      StripePaymentService.CreatePaymentIntent,
      paymentIntentPayload,
    ),
    addressResponse: call(
      PatientService.InsertShippingBillingAddress,
      addressPayload,
    ),
  });

  console.log(paymentIntentResponse);
  console.log(addressResponse);

  if (paymentIntentResponse && addressResponse) {
    if (paymentIntentResponse.Status && addressResponse[0]?.Status) {
      yield put(
        OrderActions.createIntentSuccess(
          paymentIntentResponse.Result.client_secret,
        ),
      );
    } else {
      yield put(
        OrderActions.createIntentFailure(paymentIntentResponse.Message),
      );
    }
  }
  {
    yield put(OrderActions.createIntentFailure('Oops-Failed'));
  }
}
