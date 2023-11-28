import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Helpers, ApplicationStyles } from 'App/Theme';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CustomInputBox from 'App/Components/CustomInputBox';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import { ValidationService } from 'App/Services/ValidationService';
import { Enums } from 'App/Enums';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import RBSheet from 'react-native-raw-bottom-sheet';

class loginScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      IsMessageShow: false,
      Message: '',
      IsPasswordWrong: false,

      inputs: {
        emailId: {
          type: 'email',
          value: '',
          touched: false,
        },
        password: {
          type: 'generic',
          value: '',
          touched: false,
        },
      },
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  _CloseAlert() {
    this.setState({ IsMessageShow: false });
  }

  componentWillUnmount() {

    this.setState({ IsMessageShow: false });
  }

  componentDidMount() {

    this.props.resetAuthenticateStates();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.authenticatedErrorMessage != null &&
      prevProps.authenticatedErrorMessage !=
      this.props.authenticatedErrorMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.authenticatedErrorMessage
      ];
      this.setState({
        Message: Message,
        IsPasswordWrong: true,
      });
    }
  }

  _onForgotPasswordClick() {
    NavigationService.navigate('ForgotPasswordScreen');
    this.RBSheet.close();
  }
  _closePopUp() {
    this.RBSheet.close();
  }
  _onPressButton() {
    // Call ValidationComponent validate method

    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      return;
    }

    const { inputs } = this.state;
    this.props.authenticateUser({
      Email: inputs['emailId'].value,
      Password: inputs['password'].value,
      IsComeFrom: Enums.LogIn,
    });
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  _onPressGoToSignUpPage() {
    // NavigationService.navigate('AccountTypeScreen');
    NavigationService.navigate('UserLicense')
  }

  _onPasswordChange(value) {
    this.onInputChange({ id: 'password', value });
    this.setState({ IsPasswordWrong: false });
  }

  _openErrorPopup() {
    this.RBSheet.open();
  }

  render() {
    return Platform.OS === 'ios' ? (
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[Helpers.fill, { backgroundColor: Colors.white }]}>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={280}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: Colors.patientColor,
            },
          }}>
          <View style={[{ marginTop: 40, width: '100%' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text
                style={[
                  Helpers.btnText,
                  Helpers.mediumFont,
                  { color: Colors.white, fontSize: 25, textAlign: 'center' },
                ]}>
                {this.props.selectedMessage['AccountLogin-IncorrectPassword']}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 16,
              }}>
              <Text
                style={[
                  Helpers.btnText,
                  Helpers.mediumFont,
                  {
                    color: Colors.white,
                    fontSize: 18,
                    textAlign: 'center',
                    width: '80%',
                  },
                ]}>
                {
                  this.props.selectedMessage[
                  'AccountLogin-IncorrectPasswordError'
                  ]
                }
              </Text>
            </View>

            <View
              style={[
                Helpers.btnContainer,
                {
                  flexDirection: 'row',
                  marginTop: 18,
                  justifyContent: 'space-between',
                },
              ]}>
              <TouchableOpacity
                style={[
                  Helpers.btn,
                  {
                    backgroundColor: Colors.patientColor,
                    borderColor: 'white',
                    borderWidth: 1,
                    width: '40%',
                    marginLeft: 20,
                  },
                ]}
                onPress={this._onForgotPasswordClick.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.mediumFont,
                    { color: Colors.white, fontSize: 19 },
                  ]}>
                  {this.props.selectedMessage['AccountLogin-ResetPassword']}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  Helpers.btn,
                  { backgroundColor: 'white', width: '40%', marginRight: 20 },
                ]}
                onPress={this._closePopUp.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.mediumFont,
                    { color: Colors.patientColor, fontSize: 19 },
                  ]}>
                  {this.props.selectedMessage['AccountLogin-TryAgainButton']}
                </Text>
              </TouchableOpacity>
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
          HeaderTitle=""
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
          _onRightButtonPress={this._CloseAlert.bind(this)}
          hasSingleButton={true}
        />
        <Dialog
          dialogStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          visible={this.props.authenticatedIsLoading}>
          <DialogContent style={{ backgroundColor: 'transparent' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={Images.Loaderimg}
                style={{
                  alignItems: 'center',
                  resizeMode: 'center',
                  marginTop: 17,
                }}
              />
            </View>
          </DialogContent>
        </Dialog>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* <View style={[ApplicationStyles.header, { marginTop: 20 }]}>
            <View>
              <Image
                style={{ height: 120, width: 120 }}
                resizeMode="cover"
                source={Images.MainLogo}
              />
            </View>
          </View> */}

          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                ,
                {
                  fontSize: 32,
                  color: Colors.patientColor,
                  textAlign: 'left',
                  width: '90%',
                },
                Helpers.bold,
              ]}>
              {this.props.selectedMessage['AccountLogin-Login']}
            </Text>

            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer, ,
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.patientColor }
                  : {},
              ]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
              placeholder={this.props.selectedMessage['AccountLogin-Email']}
              onChangeText={(value) =>
                this.onInputChange({ id: 'emailId', value })
              }
              value={this.state.inputs.emailId.value}
              inputLabl={''}
              placeholderTextColor="#BDBDBD"
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              hasRightIcon={true}
              keyboardType="email-address"
              rightIcon={
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? Images.InValid
                    : Images.ValidPurple
                  : null
              }
            />

            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer, ,
                this.state.inputs['password'].touched
                  ? this.renderError('password') || this.state.IsPasswordWrong
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.patientColor }
                  : {},
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                {
                  color: this.state.IsPasswordWrong
                    ? 'red'
                    : Colors.patientColor,
                },
              ]}
              placeholder={this.props.selectedMessage['AccountLogin-Password']}
              onChangeText={(value) => this._onPasswordChange(value)}

              value={this.state.inputs.password.value}
              inputLabl={''}
              placeholderTextColor="#BDBDBD"
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              hasRightIcon={true}
              secureTextEntry={true}
              rightIcon={
                this.state.inputs['password'].touched
                  ? this.renderError('password') || this.state.IsPasswordWrong
                    ? Images.InValid
                    : Images.ValidPurple
                  : null
              }
              onPressRightIcon={() => { }}
            />
            {this.state.IsPasswordWrong ? (
              <View style={{ width: '90%', flexDirection: 'row' }}>
                <Image
                  style={{ height: 16, width: 16, marginLeft: 15 }}
                  resizeMode="contain"
                  source={Images.InValid}
                />
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.book,
                    {
                      marginLeft: 10,
                      color: Colors.Black,
                      fontSize: 12,
                      textAlign: 'left',
                    },
                  ]}>
                  {this.props.selectedMessage['AccountLogin-IncorrectPassword']}{' '}
                  <Text
                    onPress={this._openErrorPopup.bind(this)}
                    style={[
                      Helpers.btnText,
                      Helpers.book,
                      { color: Colors.error, fontSize: 12, textAlign: 'left' },
                    ]}>
                    {' '}
                    {
                      this.props.selectedMessage['AccountLogin-ResetPassword']
                    }?{' '}
                  </Text>
                </Text>
              </View>
            ) : null}

            <View style={[Helpers.btnContainer, { marginTop: 18 }]}>
              <TouchableOpacity
                style={[
                  Helpers.btn,
                  {
                    backgroundColor:
                      (this.state.inputs.password.value &&
                        this.state.inputs.emailId.value) == ''
                        ? '#C2CEDB'
                        : '#614698',
                    width: '90%',
                  },
                ]}
                onPress={
                  (this.state.inputs.password.value &&
                    this.state.inputs.emailId.value) == ''
                    ? null
                    : this._onPressButton.bind(this)
                }
              >
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.mediumFont,
                    { color: Colors.white, fontSize: 18 },
                  ]}>
                  {this.props.selectedMessage['AccountLogin-Login']}{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={
                (Helpers.Rectanglebtn,
                {
                  marginTop: 30,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                })
              }
              onPress={this._onForgotPasswordClick.bind(this)}>
              <Text
                style={[
                  Helpers.btnText,
                  {
                    color: Colors.patientColor,
                    fontSize: 16,
                    textAlign: 'center',
                    width: '90%',
                  },
                ]}>
                {' '}
                {
                  this.props.selectedMessage['AccountLogin-IForgotMyPassword']
                }{' '}
              </Text>
            </TouchableOpacity>

            <View style={[Helpers.rowMain, { marginTop: 15, marginBottom: Platform.OS === 'ios' ? 0 : 85 }]}>
              <Text
                style={[
                  Helpers.btnText,
                  {
                    color: Colors.Black,
                    fontSize: Fonts.medium,
                    textAlign: 'center',
                  },
                  Helpers.lightBook,
                ]}>
                {' '}
                {
                  this.props.selectedMessage['AccountLogin-Don’tHaveAnAccount']
                }{' '}
              </Text>
              <TouchableOpacity
                onPress={this._onPressGoToSignUpPage.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.book,
                    {
                      color: Colors.facilityColor,
                      fontSize: 16,
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  {' '}
                  {this.props.selectedMessage['Register-SignUp']}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    ) : (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: Colors.white }]}>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={280}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: Colors.patientColor,
            },
          }}>
          <View style={[{ marginTop: 40, width: '100%' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text
                style={[
                  Helpers.btnText,
                  Helpers.mediumFont,
                  { color: Colors.white, fontSize: 25, textAlign: 'center' },
                ]}>
                {this.props.selectedMessage['AccountLogin-IncorrectPassword']}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 16,
              }}>
              <Text
                style={[
                  Helpers.btnText,
                  Helpers.mediumFont,
                  {
                    color: Colors.white,
                    fontSize: 18,
                    textAlign: 'center',
                    width: '80%',
                  },
                ]}>
                {
                  this.props.selectedMessage[
                  'AccountLogin-IncorrectPasswordError'
                  ]
                }
              </Text>
            </View>

            <View
              style={[
                Helpers.btnContainer,
                {
                  flexDirection: 'row',
                  marginTop: 18,
                  justifyContent: 'space-between',
                },
              ]}>
              <TouchableOpacity
                style={[
                  Helpers.btn,
                  {
                    backgroundColor: Colors.patientColor,
                    borderColor: 'white',
                    borderWidth: 1,
                    width: '40%',
                    marginLeft: 20,
                  },
                ]}
                onPress={this._onForgotPasswordClick.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.mediumFont,
                    { color: Colors.white, fontSize: 16 },
                  ]}>
                  {this.props.selectedMessage['AccountLogin-ResetPassword']}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  Helpers.btn,
                  { backgroundColor: 'white', width: '40%', marginRight: 20 },
                ]}
                onPress={this._closePopUp.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.mediumFont,
                    { color: Colors.patientColor, fontSize: 16 },
                  ]}>
                  {this.props.selectedMessage['AccountLogin-TryAgainButton']}
                </Text>
              </TouchableOpacity>
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
          HeaderTitle=""
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
          _onRightButtonPress={this._CloseAlert.bind(this)}
          hasSingleButton={true}
        />
        <Dialog
          dialogStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          visible={this.props.authenticatedIsLoading}>
          <DialogContent style={{ backgroundColor: 'transparent' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={Images.Loaderimg}
                style={{
                  alignItems: 'center',
                  resizeMode: 'center',
                  marginTop: 17,
                }}
              />
            </View>
          </DialogContent>
        </Dialog>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* <View style={[ApplicationStyles.header, { marginTop: 50 }]}>
            <View>
              <Image
                style={{ height: 120, width: 120 }}
                resizeMode="cover"
                source={Images.MainLogo}
              />
            </View>
          </View> */}

          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                ,
                {
                  fontSize: 32,
                  color: Colors.patientColor,
                  textAlign: 'left',
                  width: '90%',
                },
                Helpers.bold,
              ]}>
              {this.props.selectedMessage['AccountLogin-Login']}
            </Text>

            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer, ,
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.patientColor }
                  : {},
              ]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
              placeholder={this.props.selectedMessage['AccountLogin-Email']}
              onChangeText={(value) =>
                this.onInputChange({ id: 'emailId', value })
              }
              value={this.state.inputs.emailId.value}
              inputLabl={''}
              placeholderTextColor="#BDBDBD"
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              hasRightIcon={true}
              keyboardType="email-address"
              rightIcon={
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? Images.InValid
                    : Images.ValidPurple
                  : null
              }
            />

            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer, ,
                this.state.inputs['password'].touched
                  ? this.renderError('password') || this.state.IsPasswordWrong
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.patientColor }
                  : {},
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                {
                  color: this.state.IsPasswordWrong
                    ? 'red'
                    : Colors.patientColor,
                },
              ]}
              placeholder={this.props.selectedMessage['AccountLogin-Password']}
              onChangeText={(value) => this._onPasswordChange(value)}

              value={this.state.inputs.password.value}
              inputLabl={''}
              placeholderTextColor="#BDBDBD"
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              hasRightIcon={true}
              secureTextEntry={true}
              rightIcon={
                this.state.inputs['password'].touched
                  ? this.renderError('password') || this.state.IsPasswordWrong
                    ? Images.InValid
                    : Images.ValidPurple
                  : null
              }
              onPressRightIcon={() => { }}
            />
            {this.state.IsPasswordWrong ? (
              <View style={{ width: '90%', flexDirection: 'row' }}>
                <Image
                  style={{ height: 16, width: 16, marginLeft: 15 }}
                  resizeMode="contain"
                  source={Images.InValid}
                />
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.book,
                    {
                      marginLeft: 10,
                      color: Colors.Black,
                      fontSize: 12,
                      textAlign: 'left',
                    },
                  ]}>
                  {this.props.selectedMessage['AccountLogin-IncorrectPassword']}{' '}
                  <Text
                    onPress={this._openErrorPopup.bind(this)}
                    style={[
                      Helpers.btnText,
                      Helpers.book,
                      { color: Colors.error, fontSize: 12, textAlign: 'left' },
                    ]}>
                    {' '}
                    {
                      this.props.selectedMessage['AccountLogin-ResetPassword']
                    } ?{' '}
                  </Text>
                </Text>
              </View>
            ) : null}

            <View style={[Helpers.btnContainer, { marginTop: 18 }]}>
              <TouchableOpacity
                style={[
                  Helpers.btn,
                  {
                    backgroundColor:
                      (this.state.inputs.password.value &&
                        this.state.inputs.emailId.value) == ''
                        ? '#C2CEDB'
                        : '#614698',
                    width: '90%',
                  },
                ]}
                onPress={
                  (this.state.inputs.password.value &&
                    this.state.inputs.emailId.value) == ''
                    ? null
                    : this._onPressButton.bind(this)
                }
              >
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.mediumFont,
                    { color: Colors.white, fontSize: 18 },
                  ]}>
                  {this.props.selectedMessage['AccountLogin-Login']}{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={
                (Helpers.Rectanglebtn,
                {
                  marginTop: 30,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                })
              }
              onPress={this._onForgotPasswordClick.bind(this)}>
              <Text
                style={[
                  Helpers.btnText,
                  {
                    color: Colors.patientColor,
                    fontSize: 16,
                    textAlign: 'center',
                    width: '90%',
                  },
                ]}>
                {' '}
                {
                  this.props.selectedMessage['AccountLogin-IForgotMyPassword']
                }{' '}
              </Text>
            </TouchableOpacity>

            <View style={[Helpers.rowMain, { marginTop: 15, marginBottom: 85 }]}>
              <Text
                style={[
                  Helpers.btnText,
                  {
                    color: Colors.Black,
                    fontSize: Fonts.medium,
                    textAlign: 'center',
                  },
                  Helpers.lightBook,
                ]}>
                {' '}
                {
                  this.props.selectedMessage['AccountLogin-Don’tHaveAnAccount']
                }{' '}
              </Text>
              <TouchableOpacity
                onPress={this._onPressGoToSignUpPage.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.book,
                    {
                      color: Colors.facilityColor,
                      fontSize: 16,
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  {' '}
                  {this.props.selectedMessage['Register-SignUp']}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

loginScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  fcmToken: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  selectedMessage: state.startup.selectedMessage,
  fcmToken: state.authenticate.fcmToken,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) =>
    dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(loginScreen);
