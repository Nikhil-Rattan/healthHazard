import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import { Helpers, Colors, Fonts, Images } from 'App/Theme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ValidationService } from 'App/Services/ValidationService';
import NavigationService from 'App/Services/NavigationService';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';


class ForgotPasswordScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      Message: '',
      IsMessageShowForgeneratePaswordSuccesss: false,
      HeaderTitle: '',
      verificationCode: '',
      isValid: false,
      touched: false,
      canEnterEmailShow: true,
      canVerifyPasscodeShow: false,
      canCreatePasswordShow: false,
      inputs: {
        emailId: {
          type: 'email',
          value: '',
          touched: false,
        },
        passcode: {
          type: 'generic',
          value: '',
          touched: false,
        },
        password: {
          type: 'password',
          value: '',
          touched: false,
        },
        confirmPassword: {
          type: 'generic',
          value: '',
          touched: false,
        },
      },
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  componentDidMount() {
    this.props.resetVerifyCodeState();
    this.props.resetUserKeyByEmailStates();
    this.props.resetForgotPasswordStates();
    this.props.resetEmailExistingStates();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.verifyCode != null &&
      prevProps.verifyCode != this.props.verifyCode
    ) {
      this.setState({
        canEnterEmailShow: false,
        canVerifyPasscodeShow: true,
        canCreatePasswordShow: false,
      });
    }

    if (
      this.props.verificationCodeErrorMessage != null &&
      prevProps.verificationCodeErrorMessage !=
      this.props.verificationCodeErrorMessage
    ) {
      const message = this.props.selectedMessage[
        this.props.verificationCodeErrorMessage
      ];

      this.setState({
        canEnterEmailShow: true,
        canVerifyPasscodeShow: false,
        canCreatePasswordShow: false,
        Message: message,
        IsMessageShow: true,
        IsMessageShowForgeneratePaswordSuccesss: false,
        HeaderTitle: '',
      });
    }

    if (
      this.props.userKeyByEmailErrorMessage != null &&
      prevProps.userKeyByEmailErrorMessage !=
      this.props.userKeyByEmailErrorMessage
    ) {
      const message = this.props.selectedMessage[
        this.props.userKeyByEmailErrorMessage
      ];

      this.setState({
        canEnterEmailShow: true,
        canVerifyPasscodeShow: false,
        canCreatePasswordShow: false,
        Message: message,
        IsMessageShow: true,
        IsMessageShowForgeneratePaswordSuccesss: false,
        HeaderTitle: '',
      });
    }

    if (
      this.props.forgotPasswordResponse != null &&
      prevProps.forgotPasswordResponse != this.props.forgotPasswordResponse
    ) {

      const message = this.props.selectedMessage[
        'AccountForgotPassword-PasswordchangedSuccess'
      ];
      this.setState({
        Message: message,
        IsMessageShow: true,
        IsMessageShowForgeneratePaswordSuccesss: true,
        HeaderTitle: this.props.selectedMessage['RegisterSuccess-Success!'],
      });
    }

    if (
      this.props.forgotPasswordErrorMessage != null &&
      prevProps.forgotPasswordErrorMessage !=
      this.props.forgotPasswordErrorMessage
    ) {
      const message = this.props.selectedMessage[
        this.props.forgotPasswordErrorMessage
      ];
      this.setState({
        Message: message,
        IsMessageShow: true,
        IsMessageShowForgeneratePaswordSuccesss: false,
        HeaderTitle: '',
      });
    }
  }

  componentWillUnmount() {
    this.props.resetVerifyCodeState();
    this.props.resetUserKeyByEmailStates();
    this.props.resetForgotPasswordStates();
    this.setState({ IsMessageShow: false });
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  onChangeVerifyCodeText(value) {

    if (value == this.props.verifyCode) {
      this.setState({ isValid: true, verificationCode: value, touched: true });
      this.onInputChange({ id: 'passcode', value: value });
    } else {
      this.setState({ isValid: false, verificationCode: value, touched: true });
    }
  }

  _onVerifiEmailPress() {
    const firstInvalidCoordinate = this.getFormValidation();
    if (firstInvalidCoordinate != null && this.renderError('emailId')) {
      return;
    }
    this.props.resetVerifyCodeState();
    this.props.resetUserKeyByEmailStates();
    this.props.getUserKeyByEmail({ Email: this.state.inputs['emailId'].value });

  }

  _onValiatePassPress() {
    if (this.state.inputs['passcode'].value == this.props.verifyCode) {
      const { inputs } = this.state;
      const updatedPasswordTouch = { ...inputs['password'], touched: false };
      const updatedConfirmPasswordTouch = {
        ...inputs['confirmPassword'],
        touched: false,
      };
      let input = {
        ...inputs,
        password: updatedPasswordTouch,
        confirmPassword: updatedConfirmPasswordTouch,
      };

      this.setState({
        canEnterEmailShow: false,
        canVerifyPasscodeShow: false,
        canCreatePasswordShow: true,
      });

      setTimeout(() => {
        this.setState({
          inputs: input,
        });
      }, 10);

    }
  }

  _onPressCloseButton() {
    this.RBSheet.close();
  }

  _openErrorPopup() {
    this.RBSheet.open();
  }
  _onSetPasswordPress() {
    if (this.state.inputs['confirmPassword'].value == "") {
      return;
    }

    if (this.state.inputs['password'].value != this.state.inputs['confirmPassword'].value) {
      return;
    }
    let payload = {
      Email: this.state.inputs['emailId'].value,
      UserKey: this.props.userKeyByEmailResponse.UserKey,
      Password: this.state.inputs['password'].value,
    };

    if (!this.renderError('password')) {
      this.props.resetForgotPasswordStates();
      this.props.forgotUpdatePassword(payload);
    }
  }

  _ClosePopup() {
    this.setState({ IsMessageShow: false });

    if (this.state.IsMessageShowForgeneratePaswordSuccesss) {
      NavigationService.popScreen();
    }
  }

  _GoBack() {
    NavigationService.popScreen();
  }

  onChangePasswordText(value) {

    const { inputs } = this.state;
    let updatedPasswordError = null;
    if (inputs['password'].value != value) {
      updatedPasswordError = {
        ...inputs['confirmPassword'],
        errorLabel: '^Required',
        value,
        touched: true,
      };
    } else {
      updatedPasswordError = {
        ...inputs['confirmPassword'],
        errorLabel: null,
        value,
        touched: true,
      };
    }

    let input = {
      ...inputs,
      confirmPassword: updatedPasswordError,
    };

    this.setState({ inputs: input });
  }
  _onPasswordInputBlur(event) {
    let { inputs } = this.state;
    this.onChangePasswordText(inputs['confirmPassword'].value);
  }

  renderPrfile() {
    const {
      canEnterEmailShow,
      canVerifyPasscodeShow,
      canCreatePasswordShow,
    } = this.state;
    return (
      <ScrollView
        style={[
          Helpers.fill,
          { backgroundColor: 'white', paddingHorizontal: 10 },
        ]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: '15.5%' }}>
          <Image
            style={Helpers.Mainlogo}
            resizeMode="contain"
            source={Images.MainLogo}
          />
        </View>

        <View
          style={{
            height: '60%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              Helpers.bold,
              {
                fontSize: 32,
                color: Colors.patientColor,
                textAlign: 'left',
                width: '90%',
                marginBottom: 10,
              },
            ]}>
            {canCreatePasswordShow
              ? this.props.selectedMessage[
              'AccountForgotPassword-CreatePassword'
              ]
              : this.props.selectedMessage['AccountLogin-ResetPassword']}
          </Text>

          {/* Verify Email defaul Input */}
          {canEnterEmailShow && (
            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer, ,
                { marginTop: 0, width: '100%' },
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.patientColor }
                  : {},
              ]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
              placeholder={
                this.props.selectedMessage['AccountForgotPassword-Email']
              }
              onChangeText={(value) =>
                this.onInputChange({ id: 'emailId', value })
              }
              value={this.state.inputs.emailId.value}
              keyboardType={'email-address'}
              placeholderTextColor="#BDBDBD"
              inputLabl={''}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              hasRightIcon={true}
              rightIcon={
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? Images.InValid
                    : Images.ValidPurple
                  : null
              }
            />
          )}

          {/* Verify Passcode  */}
          {canVerifyPasscodeShow && (
            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, ,
                { marginTop: 0, width: '100%' },
                this.state.touched && !this.state.isValid
                  ? { borderColor: Colors.error }
                  : {},
              ]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
              placeholder={
                this.props.selectedMessage[
                'AccountForgotPassword-EnterThe6DigitsPasscode'
                ]
              }
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={this.onChangeVerifyCodeText.bind(this)}
              value={this.state.verificationCode}
              maxLength={6}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              hasRightIcon={true}
              keyboardType={'numeric'}
              rightIcon={
                this.state.touched
                  ? !this.state.isValid
                    ? Images.InValid
                    : Images.ValidPurple
                  : null
              }
            />
          )}

          {/* Create PassWord  */}

          {canCreatePasswordShow && (
            <View style={{ width: '100%' }}>
              <CustomInputBox
                containerStyle={[
                  Helpers.RectangletxtInputContainer, ,
                  { marginTop: 0, width: '100%' },
                  this.state.inputs['password'].touched
                    ? this.state.inputs.password.value.length < 7 ||
                      this.state.inputs.password.value.length > 25
                      ? { borderColor: '#F5B100' }

                      : this.renderError('password')
                        ? { borderColor: Colors.error }
                        : { borderColor: Colors.patientColor }
                    : {},
                ]}
                inputBoxstyle={[
                  Helpers.txtRoundInputs,
                  Helpers.fill,
                  {
                    color:
                      this.state.inputs.password.value.length < 7 ||
                        this.state.inputs.password.value.length > 25
                        ? '#F5B100'
                        : Colors.patientColor,
                  },
                ]}
                placeholder={
                  this.props.selectedMessage['AccountForgotPassword-Password']
                }
                onChangeText={(value) =>
                  this.onInputChange({ id: 'password', value })
                }
                value={this.state.inputs.password.value}
                maxLength={24}
                inputLabl={''}
                onEndEditing={this._onPasswordInputBlur.bind(this)}
                placeholderTextColor="#8492A6"
                componentStyle={[Helpers.column, Helpers.crossStart]}
                rightIconStyle={[Helpers.rightIconStyle]}
                inputBoxLableStyle={[Helpers.inputBoxLable]}
                hasEvent={true}
                hasRightIcon={false}
                secureTextEntry={true}
                rightIcon={
                  this.state.inputs['password'].touched
                    ? this.state.inputs.password.value.length < 7 ||
                      this.state.inputs.password.value.length > 25
                      ? Images.YellowwarningIcon
                      : this.renderError('password')
                        ? Images.InValid
                        : Images.ValidPurple
                    : Images.Information
                }
                onPressRightIcon={() => {
                  this.RBSheet.open();
                }}
              />
              {(this.state.inputs.password.value.length < 7 ||
                this.state.inputs.password.value.length > 25) &&
                this.state.inputs['password'].touched ? (
                <View style={{ width: '90%', flexDirection: 'row' }}>
                  <Image
                    style={{ height: 16, width: 16, marginLeft: 15 }}
                    resizeMode="contain"
                    source={Images.YellowwarningIcon}
                  />
                  <Text
                    style={[
                      Helpers.btnText,
                      {
                        marginLeft: 10,
                        color: Colors.Black,
                        fontSize: 12,
                        textAlign: 'left',
                      },
                    ]}>
                    {
                      this.props.selectedMessage[
                      'AccountForgotPassword-PasswordNotEnough'
                      ]
                    }
                    {/* Password not long enough. */}
                    <Text
                      onPress={this._openErrorPopup.bind(this)}
                      style={[
                        Helpers.btnText,
                        { color: '#F5B100', fontSize: 12, textAlign: 'left' },
                      ]}>
                      {' '}
                      {
                        this.props.selectedMessage[
                        'AccountForgotPassword-LearnWhy'
                        ]
                      }
                      {/* Learn why? */}
                    </Text>
                  </Text>
                </View>
              ) : null}

              <CustomInputBox
                containerStyle={[
                  Helpers.RectangletxtInputContainer, ,
                  { marginTop: 15, width: '100%' },
                  this.state.inputs['confirmPassword'].touched
                    ? this.renderError("confirmPassword") ?
                      { borderColor: Colors.error } : { borderColor: Colors.patientColor } : {}
                ]}
                inputBoxstyle={[
                  Helpers.txtRoundInputs,
                  Helpers.fill,
                  { color: Colors.patientColor },
                ]}
                placeholder={
                  this.props.selectedMessage['Register-ConfirmPassword']
                }
                maxLength={24}
                placeholderTextColor="#8492A6"
                onChangeText={this.onChangePasswordText.bind(this)}
                value={this.state.inputs.confirmPassword.value}
                componentStyle={[Helpers.column, Helpers.crossStart]}
                rightIconStyle={[Helpers.rightIconStyle]}
                inputBoxLableStyle={[
                  Helpers.inputBoxLable
                ]}
                hasRightIcon={true}
                secureTextEntry={true}
                rightIcon={
                  this.state.inputs['confirmPassword'].touched
                    ? this.renderError('confirmPassword')
                      ? Images.InValid
                      : Images.ValidPurple
                    : null
                }
                hasEvent={false}
              />

              {this.state.inputs['confirmPassword'].touched ? (
                this.renderError('confirmPassword') ? (
                  <View style={{ width: '90%', flexDirection: 'row' }}>
                    <Image
                      style={{ height: 16, width: 16, marginLeft: 15 }}
                      resizeMode="contain"
                      source={Images.InValid}
                    />
                    <Text
                      style={[
                        Helpers.btnText,
                        {
                          marginLeft: 10,
                          color: Colors.Black,
                          fontSize: 12,
                          textAlign: 'left',
                        },
                      ]}>
                      {
                        this.props.selectedMessage[
                        'AccountForgotPassword-FieldsNotMatched'
                        ]
                      }
                      {/* Password fields do not match. */}
                    </Text>
                  </View>
                ) : null
              ) : null}
            </View>
          )}
          <View style={[Helpers.rowMain, { alignSelf: 'center', marginTop: 50, marginBottom: '10%' }]}>
            <TouchableOpacity
              style={[
                Helpers.btn,
                {
                  backgroundColor:
                    this.state.inputs.emailId.value == ''
                      ? '#C2CEDB'
                      : '#614698',
                  width: '99%',
                },
              ]}
              onPress={
                canEnterEmailShow
                  ? this.state.inputs.emailId.value == ''
                    ? null
                    : this._onVerifiEmailPress.bind(this)
                  : canVerifyPasscodeShow
                    ? this._onValiatePassPress.bind(this)
                    : canCreatePasswordShow
                      ? this._onSetPasswordPress.bind(this)
                      : () => { }
              }>
              <Text
                style={[
                  Helpers.btnText,
                  { color: Colors.white, fontSize: Fonts.regular16 },
                ]}>
                {canEnterEmailShow
                  ? this.props.selectedMessage[
                  'AccountForgotPassword-SendPasscode'
                  ]
                  : canVerifyPasscodeShow
                    ? this.props.selectedMessage[
                    'AccountForgotPassword-VerifyPasscode'
                    ]
                    : canCreatePasswordShow
                      ? this.props.selectedMessage[
                      'AccountForgotPassword-CreatePassword'
                      ]
                      : ''}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    );
  }

  render() {
    const {
      canEnterEmailShow,
      canVerifyPasscodeShow,
      canCreatePasswordShow,
    } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={400}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: '#F5B100',
            },
          }}>
          <View style={[{ marginTop: 20, width: '100%' }]}>
            <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center', marginBottom: 20 }}>
              <Image
                style={[Helpers.iconsmall, { marginRight: 5 }]}
                resizeMode="contain"
                source={Images.WhiteInfoIcon}
              />
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit={Platform.OS == 'ios' ? true : false}
                style={[
                  Helpers.btnText,
                  Helpers.mediumFont,
                  { flex: 1, paddingHorizontal: 4, color: Colors.white, fontSize: 22, fontWeight: '600', textAlign: 'left' },
                ]}>
                {this.props.selectedMessage['Register-PasswordRequirements']}
              </Text>
            </View>
            <Text
              style={[
                Helpers.btnText,
                {
                  color: Colors.white,
                  fontSize: 14,
                  textAlign: 'left',
                  marginLeft: 30,
                },
              ]}>
              {this.props.selectedMessage['Register-MustContainCharacters']}
            </Text>
            <Text
              style={[
                Helpers.btnText,
                {
                  color: Colors.white,
                  fontSize: 14,
                  textAlign: 'left',
                  marginLeft: 30,
                  marginTop: 10,
                },
              ]}>
              {this.props.selectedMessage['Register-1LowercaseLetter']}
            </Text>
            <Text
              style={[
                Helpers.btnText,
                {
                  color: Colors.white,
                  fontSize: 14,
                  textAlign: 'left',
                  marginLeft: 30,
                  marginTop: 10,
                },
              ]}>
              {this.props.selectedMessage['Register-1UppercaseLetter']}
            </Text>
            <Text
              style={[
                Helpers.btnText,
                {
                  color: Colors.white,
                  fontSize: 14,
                  textAlign: 'left',
                  marginLeft: 30,
                  marginTop: 10,
                },
              ]}>
              {this.props.selectedMessage['Register-1Number']}{' '}
            </Text>
            <Text
              style={[
                Helpers.btnText,
                {
                  color: Colors.white,
                  fontSize: 14,
                  textAlign: 'left',
                  marginLeft: 30,
                  marginTop: 10,
                },
              ]}>
              {this.props.selectedMessage['Register-1Symbol']}
            </Text>

            <View
              style={[Helpers.btnContainer, { marginTop: 14, marginBottom: 12 }]}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                style={[Helpers.bigBtnGradient, { width: '60%' }]}>
                <TouchableOpacity
                  style={Helpers.btn}
                  onPress={this._onPressCloseButton.bind(this)}
                >
                  <Text
                    style={[Helpers.btnText, { color: '#F5B100', fontSize: 17 }]}>

                    {this.props.selectedMessage['Register-Okay']}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </RBSheet>

        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsMessageShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsMessageShow}
          PopUpContainerStyle={{
            backgroundColor: Colors.patientColor,
            alignItems: 'center',
          }}
          HeaderTitle={this.state.HeaderTitle}
          HeadTitleColor="#FFFFFF"
          SingleButtonText={this.props.selectedMessage['Register-Close']}
          SigleButtonBackground="#FFFFFF"
          MessageColor="#FFFFFF"
          SingleButtonTextColor={Colors.patientColor}
          leftbuttonbordercolor="#FFFFFF"
          leftbuttontextcolor="#FFFFFF"
          rightbuttontextcolor={Colors.patientColor}
          Rightbuttonbackgroundcolor="#FFFFFF"
          AlertMessageTitle={this.state.Message}
          _onRightButtonPress={this._ClosePopup.bind(this)}
          hasSingleButton={true}
        />

        <TopHeaderWithTwoOption
          HeaderTitle=""
          fullComponentbackgroundColor={Colors.white}
          fullComponentHeight={60}
          RightHeaderTitle="Edit"
          IsImage={true}
          LeftImage={Images.PurPleBackIcon}
          RightImage={Images.BackIcon}
          RightSideTitleColor={Colors.patientColor}
          onPressLeftButton={this._GoBack.bind(this)}
        />
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            {this.renderPrfile()}
          </KeyboardAvoidingView>
        ) : (
          <View
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            {this.renderPrfile()}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

ForgotPasswordScreen.propTypes = {
  registrationErrorMessage: PropTypes.string,
  registrationSuccessMessage: PropTypes.string,
  authenticatedIsLoading: PropTypes.bool,
  saveRegistration: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  verifyCode: PropTypes.any,
  verificationCodeErrorMessage: PropTypes.string,
  buildProfilePayload: PropTypes.any,
  sendVerifyCode: PropTypes.func,
  forgotPasswordResponse: PropTypes.any,
  forgotUpdatePassword: PropTypes.func,
  getUserKeyByEmail: PropTypes.func,
  userKeyByEmailResponse: PropTypes.any,
  userKeyByEmailErrorMessage: PropTypes.string,
  resetVerifyCodeState: PropTypes.func,
  resetUserKeyByEmailStates: PropTypes.func,
  resetForgotPasswordStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  verifyCode: state.authenticate.verifyCode,
  verificationCodeErrorMessage: state.authenticate.verificationCodeErrorMessage,
  buildProfilePayload: state.authenticate.buildProfilePayload,
  forgotPasswordResponse: state.authenticate.forgotPasswordResponse,
  userKeyByEmailResponse: state.authenticate.userKeyByEmailResponse,
  userKeyByEmailErrorMessage: state.authenticate.userKeyByEmailErrorMessage,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  saveRegistration: (data) =>
    dispatch(AuthenticateActions.saveRegistration(data)),
  resetEmailExistingStates: () =>
    dispatch(AuthenticateActions.resetEmailExistingStates()),
  sendVerifyCode: (data) => dispatch(AuthenticateActions.sendVerifyCode(data)),
  forgotUpdatePassword: (data) =>
    dispatch(AuthenticateActions.forgotUpdatePassword(data)),
  getUserKeyByEmail: (data) =>
    dispatch(AuthenticateActions.getUserKeyByEmail(data)),
  resetVerifyCodeState: () =>
    dispatch(AuthenticateActions.resetVerifyCodeState()),
  resetUserKeyByEmailStates: () =>
    dispatch(AuthenticateActions.resetUserKeyByEmailStates()),
  resetForgotPasswordStates: () =>
    dispatch(AuthenticateActions.resetForgotPasswordStates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);
