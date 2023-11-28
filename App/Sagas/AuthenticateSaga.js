import { put, call, select } from 'redux-saga/effects';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import { AuthenticateService } from 'App/Services/AuthenticateService';

import { FirebaseClientService } from 'App/Services/FirebaseClientService';

import PatientProfileActions from 'App/Stores/PatientProfile/Actions';
import NavigationService from 'App/Services/NavigationService';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import {
  Enums,
  Gender,
  ScanEnum,
  ResultTypeEnum,
  LanguageEnum,
  EmailEnum,
  SubjectsEnum,
} from 'App/Enums';
//import AsyncStorage from '@react-native-community/async-storage';
import SInfo from 'react-native-sensitive-info';
import StartupActions from 'App/Stores/Startup/Actions';
import { Config } from 'App/Config';
const getStartup = (state) => state.startup;
const getAuthenticate = (state) => state.authenticate;
/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* authenticateUser(data) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    const authenticate = yield select(getAuthenticate);
    yield put(AuthenticateActions.authenticateUserLoading());

    // Fetch user informations from an API
    // console.log(data)

    const user = data.authUserCredentials;
    console.log(user);

    const response = yield call(AuthenticateService.SignIn, {
      Email: user.Email,
      Password: user.Password,
      AccessToken: user.AccessToken,
    });
    console.log(response);
    let LoginUserRoleId = response?.UserRoleId
      ? response?.UserRoleId
      : response?.UserRoleID;
    let UserRoles = [2, 3, 4];

    if (!UserRoles.includes(LoginUserRoleId)) {
      yield put(
        AuthenticateActions.authenticateUserFailure(
          'AccountLogin-InvalidCredentialsTryAgain',
        ),
      );
      return;
    }

    if (response && response.Status) {
      // yield put(AuthenticateActions.storeUserKey(response.UserKey))

      //

      yield put(
        AuthenticateActions.getUserDetailById({
          UserId: response.UserId,
          UserKey: response.UserKey,
          IsComeFrom: user.IsComeFrom,
          UserRoleId: response?.UserRoleId
            ? response?.UserRoleId
            : response?.UserRoleID,
        }),
      );
      yield put(
        AuthenticateActions.saveFcmToken({
          UserId: response.UserId,
          AccessToken: authenticate.fcmToken,
        }),
      );
      if (response.UserProfileImageReferenceName) {
        yield put(
          AuthenticateActions.getUserProfileImage({
            filename: response.UserProfileImageReferenceName,
          }),
        );
      }
      //NavigationService.navigateAndReset('facilitylist')
    } else {
      // alert('Invalid credentials ,Try again')
      yield put(
        AuthenticateActions.authenticateUserFailure(response.LanguageKey),
      );
    }
  } catch (error) {
    //alert('Invalid credentials ,Try again')
    yield put(
      AuthenticateActions.authenticateUserFailure(
        'AccountLogin-InvalidCredentialsTryAgain',
      ),
    );
  }
}
export function* authenticateUserByPhone(data) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    const authenticate = yield select(getAuthenticate);
    yield put(AuthenticateActions.authenticateUserLoading());

    // Fetch user informations from an API

    const user = data.authUserloginCredentails;
    const response = yield call(AuthenticateService.LogIn, {
      Phone: user.Phone,
      AccessToken: user.AccessToken,
    });
    console.log("authenticateUserByPhone", response);
    let LoginUserRoleId = response?.UserRoleId
      ? response?.UserRoleId
      : response?.UserRoleID;
    let UserRoles = [2, 3, 4];

    if (!UserRoles.includes(LoginUserRoleId)) {
      yield put(
        AuthenticateActions.authenticateUserByPhoneFailure(
          'AccountLogin-InvalidCredentialsTryAgain',
        ),
      );
      return;
    }
    if (response && response.Status) {
      // yield put(AuthenticateActions.storeUserKey(response.UserKey))

      //
      yield put(
        AuthenticateActions.getUserDetailById({
          UserId: response.UserId,
          UserKey: response.UserKey,
          IsComeFrom: user.IsComeFrom,
          UserRoleId: response?.UserRoleId
            ? response?.UserRoleId
            : response?.UserRoleID,
        }),
      );
      yield put(
        AuthenticateActions.saveFcmToken({
          UserId: response.UserId,
          AccessToken: authenticate.fcmToken,
        }),
      );
      if (response.UserProfileImageReferenceName) {
        yield put(
          AuthenticateActions.getUserProfileImage({
            filename: response.UserProfileImageReferenceName,
          }),
        );
      }
      //NavigationService.navigateAndReset('facilitylist')
    } else {
      // alert('Invalid credentials ,Try again')
      yield put(
        AuthenticateActions.authenticateUserByPhoneFailure(response.LanguageKey),
      );
    }
  } catch (error) {
    //alert('Invalid credentials ,Try again')
    yield put(
      AuthenticateActions.authenticateUserByPhoneFailure(
        'AccountLogin-InvalidCredentialsTryAgain',
      ),
    );
  }
}
export function* getUserDetailById({ payload }) {
  try {
    let startUp = yield select(getStartup);
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    yield put(AuthenticateActions.authenticateUserLoading());

    // console.log(payload)
    // Fetch user informations from an API
    let userPayload = {
      UserId: payload.UserId,
      UserKey: payload.UserKey,
      DecryptColumns: ['FirstName', 'LastName', 'DOB', 'Address'],
    };
    const response = yield call(
      payload.UserRoleId === Enums.Patient
        ? AuthenticateService.GetPatientUserById
        : AuthenticateService.GetUserById,
      userPayload,
    );
    if (response) {
      console.log(response, 'dummy')
      yield put(AuthenticateActions.authenticateUserSuccess(response[0]));
      yield put(AuthenticateActions.setUserAuthStatus(true));

      let dashboad =
        payload.IsComeFrom == Enums.SignUp
          ? 'SuccessSignupScreen'
          : response[0].UserRoleId == Enums.Patient
            ? 'PatientHome'
            : 'FacilityHome';
      if (payload.IsComeFrom == Enums.SignUp) {
        NavigationService.navigate(dashboad);
      } else if (payload.IsComeFrom == Enums.LogIn) {
        let selectedlanguage =
          response[0].LanguageId == 1
            ? 'en'
            : response[0].LanguageId == 2
              ? 'sp'
              : 'pr';
        yield put(
          AuthenticateActions.selectIsLanguageChanged(
            selectedlanguage != startUp.locale,
          ),
        );
        NavigationService.navigateAndReset(dashboad);
      }
      // else if(payload.IsComeFrom==Enums.UpdateUserScreen)
      // {
      //   //can implement logic for update user
      // }
    } else {
      //alert('Invalid credentials,Try again')
      yield put(
        AuthenticateActions.authenticateUserFailure(
          'AccountLogin-InvalidCredentialsTryAgain',
        ),
      );
    }
  } catch (error) {
    yield put(
      AuthenticateActions.authenticateUserFailure(
        'AccountLogin-InvalidCredentialsTryAgain',
      ),
    );
  }
}

export function* registrationUser({ registrationInfo }) {
  try {
    let startUp = yield select(getStartup);

    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

    yield put(AuthenticateActions.authenticateUserLoading());
    let NPIResponse = null;

    if (registrationInfo.UserRoleId === Enums.Facility) {
      let NpiPayload = {
        npiNumber: registrationInfo.NPINo,
        requestFrom: 'Mobile',
        physicianName: registrationInfo.PhysicianName,
      };
      NPIResponse = yield call(AuthenticateService.NpiValidate, NpiPayload);
    }

    if (NPIResponse) {
      registrationInfo = {
        ...registrationInfo,
        FacilityStatus: NPIResponse.IsNpiValid,
      };
      console.log(NPIResponse);
    }
    const response = yield call(
      AuthenticateService.SignUpUser,
      registrationInfo,
    );
    // console.log(response);

    if (response) {
      if (response[0].Status) {
        // let tokenPayload={}
        // tokenPayload.fcmTokens=[authenticate.fcmToken]
        // tokenPayload.message="Registered Successfully"

        // yield put(
        //   AuthenticateActions.sendPushNotification(tokenPayload)
        // )

        const emailPayload = {
          Email: registrationInfo.Email,
          PhoneNo: registrationInfo.PhoneNo,
          Params: {
            URL: Config.ImageURL,
            SMSURL: Config.SMSFrontURL,
            IsSpanish: startUp.locale == LanguageEnum.Spanish,
            Language: startUp.locale
          },
          Subject: SubjectsEnum['RegistrationSuccessful-' + startUp.locale],
          // startUp.locale == LanguageEnum.Spanish
          //   ? SubjectsEnum.RegistrationSuccessfulSpanish
          //   : SubjectsEnum.RegistrationSuccessful,
          EmailType:
            registrationInfo.UserRoleId === Enums.Facility
              ? NPIResponse.IsNpiValid
                ? EmailEnum.AccountApproved
                : EmailEnum.Welcome
              : EmailEnum.WelcomePatient,
        };
        yield put(AuthenticateActions.sendResultEmail(emailPayload));
        // let message = response[0].LanguageKey;

        //alert(message)

        if (registrationInfo.UserRoleId === Enums.Facility) {
          NavigationService.navigate('FacilitySignupSuccessScreen');
          //  yield put(AuthenticateActions.authenticateUser(message))
          // yield put(
          //     AuthenticateActions.saveRegistrationFailure(message)
          // )
        } else {
          let userCredential = {
            Email: registrationInfo.Email,
            Password: registrationInfo.Password,
            IsComeFrom: Enums.SignUp,
          };
          yield put(AuthenticateActions.authenticateUser(userCredential));
        }

        //       alert("Registration Successfull, Check your email to proceed further")
        // // yield put(
        // //   AuthenticateActions.resetErrorMessages()
        // // )

        // NavigationService.navigateAndReset('loginScreen')
      } else {
        let message = response[0].LanguageKey;
        // console.log('message')
        // console.log(message)
        //alert(message)
        yield put(AuthenticateActions.saveRegistrationFailure(message));
      }
    } else {
      yield put(AuthenticateActions.saveRegistrationFailure('Oops-Failed'));
    }
  } catch (error) {
    yield put(AuthenticateActions.saveRegistrationFailure('Oops-Failed'));
  }
}

export function* logOut() {
  const authenticate = yield select(getAuthenticate);
  yield put(
    AuthenticateActions.saveFcmToken({
      UserId: authenticate.authenticatedUser?.UserId,
      AccessToken: '',
    }),
  );
  //AsyncStorage.clear();
  SInfo.deleteItem('token', {
    sharedPreferencesName: 'exampleApp',
    keychainService: 'exampleApp',
  });

  yield put(AuthenticateActions.resetProfilePic(false));
  yield put(AuthenticateActions.setUserAuthStatus(false));
  yield put(AuthenticateActions.authenticateUserSuccess({ 'FirstName': '', 'LastName': '' }));
  yield put(PatientProfileActions.resetAllPatientStates(null));
  // yield put(StartupActions.updateLanguage("en"))

  // yield put(PatientProfileActions.closePatientProfileLoading(null) )
  // yield put(FacilityProfileActions.closeFacilityProfileLoading(null) )
  yield put(
    AuthenticateActions.getNotificationCountSuccess({ count: 0, message: '' }),
  );
  NavigationService.navigateAndReset('LaunchingScreen');
}

export function* signOut() {
  const authenticate = yield select(getAuthenticate);
  yield put(
    AuthenticateActions.saveFcmToken({
      UserId: authenticate.authenticatedUser?.UserId,
      AccessToken: '',
    }),
  );
  // AsyncStorage.clear();
  SInfo.deleteItem('token', {
    sharedPreferencesName: 'exampleApp',
    keychainService: 'exampleApp',
  });

  alert('Your session got expired, please login again.');
  yield put(AuthenticateActions.resetProfilePic(false));
  yield put(AuthenticateActions.setUserAuthStatus(false));

  yield put(AuthenticateActions.authenticateUserSuccess(null));
  yield put(PatientProfileActions.resetAllPatientStates(null));

  yield put(PatientProfileActions.closePatientProfileLoading(null));
  yield put(FacilityProfileActions.closeFacilityProfileLoading(null));
  // yield put(StartupActions.updateLanguage("en"))
  yield put(
    AuthenticateActions.getNotificationCountSuccess({ count: 0, message: '' }),
  );
  NavigationService.navigateAndReset('LaunchingScreen');
}

export function* closeAllLoader() {
  yield put(PatientProfileActions.closePatientProfileLoading());
  yield put(FacilityProfileActions.closeFacilityProfileLoading());
  yield put(AuthenticateActions.closeAuthenticateUserLoading());
}

export function* checkEmailExist({ payload }) {
  try {
    let startUp = yield select(getStartup);
    yield put(AuthenticateActions.authenticateUserLoading());
    const response = yield call(AuthenticateService.CheckEmailExist, {
      Email: payload.Email,
    });

    if (response) {
      if (response[0].Status) {
        yield put(AuthenticateActions.saveBuildProfilePayload(payload));
        let EmailPayload = {
          Email: payload.Email,
          Subject: SubjectsEnum['VerificationCode-' + startUp.locale],
          // startUp.locale == LanguageEnum.Spanish
          //   ? SubjectsEnum.VerificationCodeSpanish
          //   : SubjectsEnum.VerificationCode,
          EmailType: EmailEnum.EmailVerify,
          Params: {
            Passcode: '',
            URL: Config.ImageURL,
            SMSURL: Config.SMSFrontURL,
            IsSpanish: startUp.locale == LanguageEnum.Spanish,
            Language: startUp.locale,
          },
          PhoneNo: payload.PhoneNo,
        };
        EmailPayload.Params.Passcode = Math.floor(
          100000 + Math.random() * 900000,
        );
        yield put(AuthenticateActions.sendVerifyCode(EmailPayload));

        NavigationService.navigate('CodeVerificationScreen');
      } else {
        yield put(
          AuthenticateActions.checkEmailExistFailure(response[0].LanguageKey),
        );
      }
    } else {
      yield put(AuthenticateActions.checkEmailExistFailure('Oops-Failed'));
    }
  } catch {
    yield put(AuthenticateActions.checkEmailExistFailure('Oops-Failed'));
  }
}
export function* checkPhoneExist({ payload }) {
  try {
    let startUp = yield select(getStartup);
    yield put(AuthenticateActions.authenticateUserLoading());
    const response = yield call(AuthenticateService.CheckPhoneExist, {
      Phone: payload.PhoneNo,
    });

    if (response) {
      if ((Enums.LogIn === payload.IsComeFrom && response[0].Status === false) || (Enums.SignUp === payload.IsComeFrom && response[0].Status === true)) {
        // yield put(AuthenticateActions.saveBuildProfilePayload(payload));
        let EmailPayload = {
          Email: 'josephqapatient@mailinator.com',
          Subject: SubjectsEnum['VerificationCode-' + startUp.locale],
          EmailType: EmailEnum.EmailVerify,
          Params: {
            Passcode: '',
            URL: Config.ImageURL,
            SMSURL: Config.SMSFrontURL,
          },
          PhoneNo: payload.PhoneNo,
          IsComeFrom: payload.IsComeFrom
        };
        EmailPayload.Params.Passcode = Math.floor(
          100000 + Math.random() * 900000,
        );
        EmailPayload.Params.Passcode = 1234;
        // yield put(AuthenticateActions.checkPhoneExistSuccess(response[0].LanguageKey));
        yield put(AuthenticateActions.sendVerifyCode(EmailPayload));
      } else {
        yield put(
          AuthenticateActions.checkPhoneExistFailure(response[0].LanguageKey),
        );
      }
    } else {
      yield put(AuthenticateActions.checkPhoneExistFailure('Oops-Failed'));
    }
  } catch {
    yield put(AuthenticateActions.checkPhoneExistFailure('Oops-Failed'));
  }
}
export function* getCityStateByZipCode({ payload }) {
  try {
    yield put(AuthenticateActions.authenticateUserLoading());

    const response = yield call(
      AuthenticateService.GetCityAndStateByZipCode,
      payload,
    );

    if (response) {
      yield put(AuthenticateActions.getCityStateByZipCodeSuccess(response));
    } else {
      yield put(
        AuthenticateActions.getCityStateByZipCodeFailure('Oops-Failed'),
      );
    }
  } catch {
    yield put(AuthenticateActions.getCityStateByZipCodeFailure('Oops-Failed'));
  }
}

export function* getParticipationType() {
  try {
    yield put(AuthenticateActions.authenticateUserLoading());
    const response = yield call(AuthenticateService.GetParticipantTypeList);

    if (response) {
      yield put(AuthenticateActions.getParticipationTypeSuccess(response));
    } else {
      yield put(AuthenticateActions.getParticipationTypeFailure('Oops-Failed'));
    }
  } catch {
    yield put(AuthenticateActions.getParticipationTypeFailure('Oops-Failed'));
  }
}

export function* getRaceList() {
  try {
    yield put(AuthenticateActions.authenticateUserLoading());
    const response = yield call(AuthenticateService.GetRaceList);

    if (response) {
      yield put(AuthenticateActions.getRaceListSuccess(response));
    } else {
      yield put(AuthenticateActions.getRaceListFailure('Oops-Failed'));
    }
  } catch {
    yield put(AuthenticateActions.getRaceListFailure('Oops-Failed'));
  }
}

export function* getGenderList() {
  try {
    yield put(AuthenticateActions.authenticateUserLoading());
    const response = yield call(AuthenticateService.GetGenderList);

    if (response) {
      yield put(AuthenticateActions.getGenderListSuccess(response));
    } else {
      yield put(AuthenticateActions.getGenderListFailure('Oops-Failed'));
    }
  } catch {
    yield put(AuthenticateActions.getGenderListFailure('Oops-Failed'));
  }
}

export function* getEthnicityList() {
  try {
    yield put(AuthenticateActions.authenticateUserLoading());

    const response = yield call(AuthenticateService.GetEthnicityList);

    if (response) {
      yield put(AuthenticateActions.getEthnicityListSuccess(response));
    } else {
      yield put(AuthenticateActions.getEthnicityListFailure('Oops-Failed'));
    }
  } catch {
    yield put(AuthenticateActions.getEthincityListFailure('Oops-Failed'));
  }
}

export function* sendVerifyCode({ payload }) {
  try {
    yield put(AuthenticateActions.authenticateUserLoading());

    const response = yield call(
      AuthenticateService.SendVerificationEmail,
      payload,
    );

    //  alert(response)
    console.log("sendVerifyCode", payload, response);
    if (response) {
      let code = payload.Params.Passcode;
      console.log("sendTrue", code)
      yield put(AuthenticateActions.sendVerifyCodeSuccess(code));
      payload.Code = code;
      NavigationService.navigate("PhoneOTPScreen", { ...payload });
    } else {
      console.log("sendFailed")
      yield put(AuthenticateActions.sendVerifyCodeFailure('Oops-Failed'));
    }
  } catch {
    console.log("sendCatch")
    yield put(AuthenticateActions.sendVerifyCodeFailure('Oops-Failed'));
  }
}

export function* sendResultEmail({ payload }) {
  //yield put(AuthenticateActions.authenticateUserLoading())

  try {
    const response = yield call(
      AuthenticateService.SendVerificationEmail,
      payload,
    );

    //  alert(response)

    if (response) {
      // let code= payload.Params.Passcode

      yield put(AuthenticateActions.sendResultEmailSuccess('Sent Mail'));
    } else {
      yield put(AuthenticateActions.sendResultEmailFailure('Oops-Failed'));
    }
  } catch {
    yield put(AuthenticateActions.sendResultEmailFailure('Oops-Failed'));
  }
}

export function* getUserKeyByEmail({ payload }) {
  try {
    let startUp = yield select(getStartup);
    yield put(AuthenticateActions.authenticateUserLoading());

    const response = yield call(AuthenticateService.GetUserKeyByEmail, payload);

    if (response) {
      if (response.length > 0) {
        //  yield put(AuthenticateActions.getUserKeyByEmailSuccess(EmailPayload))
        let EmailPayload = {
          Email: payload.Email,
          Subject: SubjectsEnum['VerificationCode-' + startUp.locale], // (startUp.locale==LanguageEnum.Spanish)?SubjectsEnum.VerificationCodeSpanish:SubjectsEnum.VerificationCode,
          EmailType: EmailEnum.EmailVerify,
          Params: {
            Passcode: '',
            URL: Config.ImageURL,
            SMSURL: Config.SMSFrontURL,
            IsSpanish: startUp.locale == LanguageEnum.Spanish,
            Language: startUp.locale,
          },
          PhoneNo: response[0].PhoneNo,
        };
        EmailPayload.Params.Passcode = Math.floor(
          100000 + Math.random() * 900000,
        );
        //  alert(JSON.stringify(EmailPayload))
        yield put(AuthenticateActions.sendVerifyCode(EmailPayload));
        yield put(AuthenticateActions.getUserKeyByEmailSuccess(response[0]));
      } else {
        // alert(JSON.stringify(response))
        yield put(
          AuthenticateActions.getUserKeyByEmailFailure('Profile-EmailNotExist'),
        );
      }
      // let code= payload.Params.Passcode
    } else {
      yield put(AuthenticateActions.getUserKeyByEmailFailure('Oops-Failed'));
    }
  } catch {
    yield put(AuthenticateActions.getUserKeyByEmailFailure('Oops-Failed'));
  }
}

export function* forgotUpdatePassword({ payload }) {
  try {
    yield put(AuthenticateActions.authenticateUserLoading());
    const response = yield call(
      AuthenticateService.ForgotUpdatePassword,
      payload,
    );

    //  alert(JSON.stringify(response))

    if (response) {
      if (response[0].Status) {
        yield put(
          AuthenticateActions.forgotUpdatePasswordSuccess(
            response[0].LanguageKey,
          ),
        );
      } else {
        yield put(
          AuthenticateActions.forgotUpdatePasswordFailure(
            response[0].LanguageKey,
          ),
        );
      }
      // let code= payload.Params.Passcode
    } else {
      yield put(AuthenticateActions.forgotUpdatePasswordFailure('Oops-Failed'));
    }
  } catch {
    yield put(AuthenticateActions.forgotUpdatePasswordFailure('Oops-Failed'));
  }
}

export function* updateUserDetail({ payload }) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    // const authenticate = yield select(getAuthenticate)
    yield put(AuthenticateActions.authenticateUserLoading());

    let { userPayload, userDetail } = payload;

    const response = yield call(
      AuthenticateService.UpdatePatientDetail,
      userPayload,
    );

    if (response) {
      if (response[0]) {
        if (response[0][0].Status) {
          yield put(
            AuthenticateActions.updateUserDetailSuccess(
              response[0][0].LanguageKey,
            ),
          );
          // yield put(AuthenticateActions.authenticateUserSuccess(response[1]))
          yield put(
            AuthenticateActions.getUserDetailById({
              UserId: userDetail.UserId,
              UserKey: userDetail.UserKey,
              IsComeFrom: Enums.UpdateUserScreen,
              UserRoleId: userDetail.UserRoleId,
            }),
          );
        } else {
          let message = response[0][0].LanguageKey;
          // console.log('message')
          // console.log(message)
          // alert(message)
          yield put(AuthenticateActions.updateUserDetailFailure(message));
        }
      } else {
        yield put(AuthenticateActions.updateUserDetailFailure('Oops-Failed'));
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(AuthenticateActions.updateUserDetailFailure('Oops-Failed'));
  }
}

//for updateFacility data step 6
export function* updateFacilityDetail({ facilityPayload }) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    // const authenticate = yield select(getAuthenticate)
    yield put(AuthenticateActions.authenticateUserLoading());

    const response = yield call(
      AuthenticateService.UpdateFacilityDetail,
      facilityPayload,
    );
    console.log(response[0][0].LanguageKey);
    if (response) {
      if (response[0]) {
        if (response[0][0].Status) {
          yield put(
            AuthenticateActions.updateFacilityUserDetailSuccess(
              response[0][0].LanguageKey,
            ),
          );

          if (response.length > 1) {
            yield put(
              AuthenticateActions.authenticateUserSuccess(response[1][0]),
            );
          }
        } else {
          let message = response[0][0].LanguageKey;
          // console.log('message')
          // console.log(message)
          //alert(message)
          yield put(
            AuthenticateActions.updateFacilityUserDetailFailure(message),
          );
        }
      } else {
        yield put(
          AuthenticateActions.updateFacilityUserDetailFailure('Oops-Failed'),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(
      AuthenticateActions.updateFacilityUserDetailFailure('Oops-Failed'),
    );
  }
}

export function* certifiedTesterRegistrationUser({ certifiedTesterInfo }) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    // const authenticate = yield select(getAuthenticate)
    yield put(AuthenticateActions.authenticateUserLoading());

    const authenticate = yield select(getAuthenticate);
    const response = yield call(
      AuthenticateService.CertifiedtesterSignUpUser,
      certifiedTesterInfo,
    );

    if (response) {
      if (response[0][0].Status) {
        yield put(
          AuthenticateActions.saveCertifiedTesterRegistrationSuccess(
            response[0][0].LanguageKey,
          ),
        );

        if (response.length > 1) {
          if (authenticate.authenticatedUser.UserRoleId == Enums.Tester) {
            //yield put(AuthenticateActions.getUserDetailById())
            console.log(response[1][0]);
            yield put(
              AuthenticateActions.authenticateUserSuccess(response[1][0]),
            );
          }
        }
      } else {
        let message = response[0][0].LanguageKey;
        // console.log('Failure message')
        // console.log(message)
        //alert(message)
        yield put(
          AuthenticateActions.saveCertifiedTesterRegistrationFailure(message),
        );
      }
      yield put(AuthenticateActions.closeAllLoader());
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    console.log(error);
    yield put(
      AuthenticateActions.saveCertifiedTesterRegistrationFailure('Oops-Failed'),
    );
    yield put(AuthenticateActions.closeAllLoader());
  }
}

export function* getUserSurvey({ payload }) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    // const authenticate = yield select(getAuthenticate)
    yield put(AuthenticateActions.authenticateUserLoading());

    const response = yield call(AuthenticateService.GetUserServey, payload);
    // console.log(response);

    if (response) {
      if (response[0][0].Status) {
        let surveyList = response[0][0].IsSurveyCompleted
          ? response[0][0]
          : response[1][0];
        yield put(AuthenticateActions.getUserSurveySuccess(surveyList));
      } else {
        yield put(
          AuthenticateActions.getUserSurveyFailure(
            'Error occured while fetching user servay question,Try again',
          ),
        );
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(AuthenticateActions.getUserSurveyFailure('Oops-Failed'));
  }
}

export function* addUserSurvey({ payload }) {
  try {
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    // const authenticate = yield select(getAuthenticate)
    yield put(AuthenticateActions.authenticateUserLoading());

    const response = yield call(AuthenticateService.AddUserSurvey, payload);
    // console.log(response);

    if (response) {
      if (response[0].Status) {
        yield put(
          AuthenticateActions.addUserSurveySuccess(response[0].LanguageKey),
        );
        let message = response[0].LanguageKey;
        // console.log('Success message')
        // console.log(message)
        //alert(message)
      } else {
        let message = response[0].LanguageKey;
        // console.log('Failure message')
        // console.log(message)
        //alert(message)
        yield put(AuthenticateActions.addUserSurveyFailure(message));
      }
    } else {
      yield put(AuthenticateActions.signOut());
    }
  } catch (error) {
    yield put(AuthenticateActions.addUserSurveyFailure('Oops-Failed'));
  }
}

export function* changePassword({ payload }) {
  try {
    yield put(AuthenticateActions.authenticateUserLoading());
    const response = yield call(AuthenticateService.ChangePassword, payload);

    console.log(response);
    if (response[0].Status) {
      yield put(
        AuthenticateActions.changePasswordSuccess(response[0].LanguageKey),
      );
    } else {
      yield put(
        AuthenticateActions.changePasswordFailure(response[0].LanguageKey),
      );
    }
  } catch {
    yield put(AuthenticateActions.changePasswordFailure('Oops-Failed'));
  }
}

export function* getFacilityType() {
  try {
    yield put(AuthenticateActions.authenticateUserLoading());

    const response = yield call(AuthenticateService.GetFacilityTypeList);

    if (response) {
      yield put(AuthenticateActions.getFacilityTypeSuccess(response));
    } else {
      yield put(AuthenticateActions.getFacilityTypeFailure('Oops-Failed'));
    }
  } catch {
    yield put(AuthenticateActions.getFacilityTypeFailure('Oops-Failed'));
  }
}

export function* getNotificationCount({ payload }) {
  try {
    const response = yield call(
      AuthenticateService.GetNotificationCountByUserId,
      payload,
    );

    if (response) {
      yield put(
        AuthenticateActions.getNotificationCountSuccess({
          count: response[0].NotificationCount,
          message: '',
        }),
      );
    } else {
      yield put(
        AuthenticateActions.getNotificationCountError(
          'Error occured while fetching notification',
        ),
      );
    }
  } catch {
    yield put(AuthenticateActions.getNotificationCountError('Oops-Failed'));
  }
}

export function* resetNoticationCount({ payload }) {
  try {
    const response = yield call(
      AuthenticateService.UpdateNotificationStatus,
      payload,
    );

    if (response) {
      yield put(
        AuthenticateActions.getNotificationCountSuccess({
          count: 0,
          message: '',
        }),
      );
    } else {
      yield put(
        AuthenticateActions.getNotificationCountError(
          'Error occured while fetching notification',
        ),
      );
    }
  } catch {
    yield put(AuthenticateActions.getNotificationCountError('Oops-Failed'));
  }
}

export function* saveFcmToken({ payload }) {
  yield call(AuthenticateService.SaveFcm, payload);
  yield put(AuthenticateActions.getNotificationCount({ UserId: payload.UserId }));
}

export function* getFcmTokenForIos({ payload }) {
  try {
    const response = yield call(
      FirebaseClientService.getFCMTokenForIOS,
      payload,
    );

    if (response) {
      yield put(AuthenticateActions.setFcmToken(response.registration_token));
    } else {
      yield put(
        AuthenticateActions.getNotificationCountError(
          'Error occured while fetching notification',
        ),
      );
    }
  } catch {
    yield put(AuthenticateActions.getNotificationCountError('Oops-Failed'));
  }
}

export function* saveUserProfileImage({ payload }) {
  yield put(AuthenticateActions.authenticateUserLoading());

  try {
    const response = yield call(
      AuthenticateService.SaveUserProfileImage,
      payload,
    );

    if (response) {
      yield put(
        AuthenticateActions.getUserProfileImage({
          filename: response[0].ImageName,
        }),
      );
    } else {
      yield put(
        AuthenticateActions.saveUserProfileImageError(
          'Error occured while profile pic',
        ),
      );
    }
  } catch {
    yield put(AuthenticateActions.saveUserProfileImageError('Oops-Failed'));
  }
}

export function* getUserProfileImage({ payload }) {
  yield put(AuthenticateActions.authenticateUserLoading());

  try {
    const response = yield call(
      AuthenticateService.GetUserProfileImage,
      payload,
    );

    if (response) {
      yield put(AuthenticateActions.setProfilePic(response[0].ProfileImage));
    } else {
      yield put(
        AuthenticateActions.saveUserProfileImageError(
          'Error occured while profile pic',
        ),
      );
    }
  } catch {
    yield put(AuthenticateActions.saveUserProfileImageError('Oops-Failed'));
  }
}

export function* updateUserLanguage({ payload }) {
  const authenticate = yield select(getAuthenticate);

  yield put(AuthenticateActions.authenticateUserLoading());

  try {
    const response = yield call(
      AuthenticateService.UpdateUserLanguage,
      payload,
    );

    if (response) {
      yield put(
        StartupActions.updateLanguage(
          response[0].LanguageId == 1
            ? 'en'
            : response[0].LanguageId == 2
              ? 'sp'
              : 'pr',
        ),
      );
      yield put(AuthenticateActions.selectIsLanguageChanged(false));
      // alert(JSON.stringify({ UserId: authenticate.authenticatedUser.UserId, UserKey: authenticate.authenticatedUser.UserKey, IsComeFrom: Enums.UpdateUserScreen, UserRoleId: authenticate.authenticatedUser.UserRoleId }))
      yield put(
        AuthenticateActions.getUserDetailById({
          UserId: authenticate.authenticatedUser.UserId,
          UserKey: authenticate.authenticatedUser.UserKey,
          IsComeFrom: Enums.UpdateUserScreen,
          UserRoleId: authenticate.authenticatedUser.UserRoleId,
        }),
      );
    } else {
      yield put(
        AuthenticateActions.updateUserLanguageError(
          'Error occured while Setting Language',
        ),
      );
    }
  } catch {
    yield put(AuthenticateActions.updateUserLanguageError('Oops-Failed'));
  }
}
