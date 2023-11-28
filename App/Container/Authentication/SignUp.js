import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Animated,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Fonts,
  Images,
  Helpers,
  ApplicationStyles,
} from 'App/Theme';
import NavigationService from 'App/Services/NavigationService';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CustomInputBox from 'App/Components/CustomInputBox';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import { ValidationService } from 'App/Services/ValidationService';
import { Enums } from 'App/Enums';
import { Config } from 'App/Config';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import CustomPhoneInput from 'App/Components/CustomPhoneInput';
class SignUp extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      IsMessageShow: false,
      Message: '',
      animation: new Animated.Value(0),

      inputs: {
        emailId: {
          type: 'email',
          value: '',
          touched: false,
        },
        phoneNumber: {
          type: 'phone',
          value: '',
        },
        password: {
          type: 'password',
          value: '',
          touched: false,
        },
      },
    };
    super.labels = {
      password: 'Password',
      userName: 'User Name',
    };
    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
    this.isFormValid = ValidationService.isFormValid.bind(this);
    this.mask = '+52 [000] [000]-[0000]';
  }

  resetState() {
    this.setState({
      IsMessageShow: false,
      Message: '',
      animation: new Animated.Value(0),

      inputs: {
        emailId: {
          type: 'email',
          value: '',
          touched: false,
        },
        phoneNumber: {
          type: 'phone',
          value: '',
        },
        password: {
          type: 'password',
          value: '',
          touched: false,
        },
      },
    });
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
  }

  submit() {
    this.props.resetEmailExistingStates();
    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      return;
    }

    // if we make it to this point, we can actually submit the form
  }
  componentDidMount() {
    this.props.resetEmailExistingStates();
  }

  _onPressCloseButton() {
    this.RBSheet.close();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.emailExistErrorMessage != null &&
      prevProps.emailExistErrorMessage != this.props.emailExistErrorMessage
    ) {
      const message = this.props.selectedMessage[
        this.props.emailExistErrorMessage
      ];
      this.setState({ IsMessageShow: true, Message: message });
    }
  }

  _onPressSignUp() {
    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      return;
    }

    if (this.renderError('emailId') || this.renderError('password')) {
      return;
    }

    const { inputs } = this.state;
    let _API_URL = Config.API_URL;
    let phoneNumber = inputs['phoneNumber'].value
      .replace(/\s/g, '')
      .replace(/-/g, '')
      .replace(/\(|\)/g, '');
    this.props.checkEmailExist({
      Email: inputs['emailId'].value,
      URL: _API_URL,
      Password: inputs['password'].value,
      PhoneNo: phoneNumber,
    });
  }

  _CloseAlert() {
    this.setState({ IsMessageShow: false });
  }

  renderCreateForm() {
    const IsFacility = this.props.accountType === Enums.Facility;
    return (
      <View>
        {/* <View style={[ApplicationStyles.header]}>
          <View>
            <Image
              style={{ height: 120, width: 120 }}
              resizeMode="cover"
              source={Images.MainLogo}
            />
          </View>
        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView
            style={{
              flex: 1,
              marginTop: '18%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                ,
                {
                  fontSize: 32,
                  color: IsFacility ? Colors.facilityColor : Colors.patientColor,
                  textAlign: 'left',
                  width: '90%',
                },
                Helpers.bold,
              ]}>
              {this.props.selectedMessage['Register-CreateAccount']}
            </Text>

            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer, ,
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? { borderColor: Colors.error }
                    : {
                      borderColor: IsFacility
                        ? Colors.facilityColor
                        : Colors.patientColor,
                    }
                  : { borderColor: '#BDBDBD' },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: IsFacility ? Colors.facilityColor : Colors.patientColor },
              ]}
              placeholder={this.props.selectedMessage['Register-Email']}
              placeholderTextColor="#BDBDBD"
              onChangeText={(value) => this.onInputChange({ id: 'emailId', value })}
              value={this.state.inputs.emailId.value}
              inputLabl={''}
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
                    : IsFacility
                      ? Images.ValidGreen
                      : Images.ValidPurple
                  : null
              }
            />
            <CustomPhoneInput
              containerStyle={[
                Helpers.RectangletxtInputContainer,
                this.state.inputs['phoneNumber'].touched
                  ? this.renderError('phoneNumber')
                    ? { borderColor: Colors.error }
                    : {
                      borderColor: IsFacility
                        ? Colors.facilityColor
                        : Colors.patientColor,
                    }
                  : { borderColor: '#BDBDBD' },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: IsFacility ? Colors.facilityColor : Colors.patientColor },
              ]}
              placeholder={
                this.props.selectedMessage['RegisterProfile-PhoneNumber']
              }
              mask={this.mask}
              placeholderTextColor="#BDBDBD"
              keyboardType="phone-pad"
              onChangeText={(formatted, extracted) => {
                this.onInputChange({ id: 'phoneNumber', value: '+52' + extracted })
              }}
              value={this.state.inputs.phoneNumber.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              hasRightIcon={true}
              rightIcon={
                this.state.inputs['phoneNumber'].touched
                  ? this.renderError('phoneNumber')
                    ? Images.InValid
                    : IsFacility
                      ? Images.ValidGreen
                      : Images.ValidPurple
                  : null
              }
            />

            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer,
                { marginTop: 5 },
                this.state.inputs['password'].touched
                  ? this.renderError('password')
                    ? { borderColor: Colors.WarningYellow }
                    : {
                      borderColor: IsFacility
                        ? Colors.facilityColor
                        : Colors.patientColor,
                    }
                  : { borderColor: '#BDBDBD' },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                {
                  color: this.renderError('password')
                    ? Colors.WarningYellow
                    : IsFacility
                      ? Colors.facilityColor
                      : Colors.patientColor,
                },
              ]}
              placeholder={this.props.selectedMessage['Register-Password']}
              placeholderTextColor="#BDBDBD"
              maxLength={24}
              onChangeText={(value) =>
                this.onInputChange({ id: 'password', value })
              }
              value={this.state.inputs.password.value}
              inputLabl={''}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={true}
              hasRightIcon={false}
              secureTextEntry={true}
              rightIcon={
                this.state.inputs['password'].touched
                  ? this.renderError('password')
                    ? Images.YellowwarningIcon
                    : IsFacility
                      ? Images.ValidGreen
                      : Images.ValidPurple
                  : Images.Information
              }
              onPressRightIcon={() => {
                this.RBSheet.open();
              }}
            />

            {this.renderError('password') ? (
              <View
                style={[
                  Helpers.rowMain,
                  { width: '90%', justifyContent: 'flex-start' },
                ]}>
                <Image
                  style={{ height: 18, width: 18, marginLeft: Platform.OS == 'ios' ? 0 : 15 }}
                  resizeMode="contain"
                  source={Images.YellowwarningIcon}
                />
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.mediumFont,
                    { color: Colors.Black, fontSize: 14, textAlign: 'left', flex: 1 },
                  ]}>
                  {' '}
                  {this.props.selectedMessage['Register-PasswordFormat']}{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.RBSheet.open();
                  }}>
                  <Text
                    style={[
                      Helpers.btnText,
                      Helpers.mediumFont,
                      {
                        color: Colors.WarningYellow,
                        fontSize: 14,
                        textAlign: 'left',
                      },
                    ]}>
                    {' '}
                    {this.props.selectedMessage['Register-LearnMore']}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={[Helpers.btnContainer, { marginTop: 35 }]}>
              <TouchableOpacity
                style={[
                  Helpers.btn,
                  {
                    width: '90%',
                    backgroundColor: !this.isFormValid()
                      ? '#C2CEDB'
                      : IsFacility
                        ? Colors.facilityColor
                        : Colors.patientColor,
                  },
                ]}
                onPress={
                  !this.isFormValid() ? null : this._onPressSignUp.bind(this)
                }
              >
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.white, fontSize: Fonts.regular16 },
                  ]}>
                  {this.props.selectedMessage['Register-SignUp']}{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                Helpers.rowMain,
                { marginTop: 20, marginBottom: 25, height: 45, marginBottom: '15%' },
              ]}>
              <Text
                style={[
                  Helpers.btnText, { alignSelf: 'center' },
                  Helpers.mediumFont,
                  { color: Colors.Black, fontSize: 14, textAlign: 'center' },
                ]}>
                {' '}
                {this.props.selectedMessage['Register-AlreadyHaveAnAccount']}{' '}
              </Text>
              <TouchableOpacity style={{ alignSelf: 'center' }}
                onPress={() => {
                  NavigationService.navigate('LoginWithPhoneOREmail', { isFromLogin: true });
                }}>
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.mediumFont,
                    {
                      color: IsFacility ? Colors.blueColor : Colors.facilityColor,
                      fontSize: 14,
                      textAlign: 'left',
                    },
                  ]}>
                  {' '}
                  {this.props.selectedMessage['Launch-Login']}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }

  render() {
    const IsFacility = this.props.accountType === Enums.Facility;

    return Platform.OS === 'ios' ? (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[Helpers.fill, { backgroundColor: Colors.white }]}>
        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsMessageShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsMessageShow}
          PopUpContainerStyle={{
            justifyContent: 'center',
            backgroundColor: '#F5B100',
            alignItems: 'center',
          }}

          HeaderTitle={this.props.selectedMessage['RegPatient-EmailExist']}
          HeadTitleColor="#FFFFFF"
          SingleButtonText={this.props.selectedMessage['Register-Okay']}
          SigleButtonBackground="white"
          MessageColor="#FFFFFF"
          SingleButtonTextColor="#F5B100"
          leftbuttonbordercolor="#F5B100"
          AlertMessageTitle={
            this.props.selectedMessage[
            'CreateNewTesterScreen-PleaseSelectAnotherEmail'
            ]
          }
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
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={400}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: Colors.WarningYellow,
            },
          }}>
          <View style={[{ width: '100%', marginTop: 20 }]}>
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
                Helpers.mediumFont,
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
                Helpers.mediumFont,
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
                Helpers.mediumFont,
                {
                  color: Colors.white,
                  fontSize: 14,
                  textAlign: 'left',
                  marginLeft: 30,
                  marginTop: 10,
                },
              ]}>
              {this.props.selectedMessage['Register-1UppercaseLetter']}{' '}
            </Text>
            <Text
              style={[
                Helpers.btnText,
                Helpers.mediumFont,
                {
                  color: Colors.white,
                  fontSize: 14,
                  textAlign: 'left',
                  marginLeft: 30,
                  marginTop: 10,
                },
              ]}>
              {this.props.selectedMessage['Register-1Number']}
            </Text>
            <Text
              style={[
                Helpers.btnText,
                Helpers.mediumFont,
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
              style={[Helpers.btnContainer, { marginTop: '19%' }]}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                style={[Helpers.bigBtnGradient, { width: '90%' }]}>
                <TouchableOpacity
                  style={Helpers.btn}
                  onPress={this._onPressCloseButton.bind(this)}
                >
                  <Text
                    style={[
                      Helpers.btnText,
                      Helpers.mediumFont,
                      { color: '#F5B100', fontSize: Fonts.regular16 },
                    ]}>
                    {this.props.selectedMessage['Register-Okay']}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </RBSheet>
        {this.renderCreateForm()}
      </KeyboardAvoidingView>
    ) : (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: Colors.white }]}>
        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsMessageShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsMessageShow}
          PopUpContainerStyle={{
            backgroundColor: '#F5B100',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          HeaderTitle={this.props.selectedMessage['Register-EmailAlreadyExist']}
          HeadTitleColor="#FFFFFF"
          SingleButtonText={this.props.selectedMessage['Register-Okay']}
          SigleButtonBackground="white"
          MessageColor="#FFFFFF"
          SingleButtonTextColor="#F5B100"
          leftbuttonbordercolor="#F5B100"
          AlertMessageTitle={
            this.props.selectedMessage[
            'CreateNewTesterScreen-PleaseSelectAnotherEmail'
            ]
          }
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

        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={400}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: Colors.WarningYellow,
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
                Helpers.mediumFont,
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
                Helpers.mediumFont,
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
                Helpers.mediumFont,
                {
                  color: Colors.white,
                  fontSize: 14,
                  textAlign: 'left',
                  marginLeft: 30,
                  marginTop: 10,
                },
              ]}>
              {this.props.selectedMessage['Register-1UppercaseLetter']}{' '}
            </Text>
            <Text
              style={[
                Helpers.btnText,
                Helpers.mediumFont,
                {
                  color: Colors.white,
                  fontSize: 14,
                  textAlign: 'left',
                  marginLeft: 30,
                  marginTop: 10,
                },
              ]}>
              {this.props.selectedMessage['Register-1Number']}
            </Text>
            <Text
              style={[
                Helpers.btnText,
                Helpers.mediumFont,
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
              style={[Helpers.btnContainer, { marginTop: 18, marginBottom: 12 }]}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                style={[Helpers.bigBtnGradient, { width: '90%' }]}>
                <TouchableOpacity
                  style={Helpers.btn}
                  onPress={this._onPressCloseButton.bind(this)}
                >
                  <Text
                    style={[
                      Helpers.btnText,
                      Helpers.mediumFont,
                      { color: '#F5B100', fontSize: Fonts.regular16 },
                    ]}>
                    {this.props.selectedMessage['Register-Okay']}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </RBSheet>

        <ScrollView style={{ flex: 1 }}>{this.renderCreateForm()}</ScrollView>
      </SafeAreaView>
    );
  }
}

SignUp.propTypes = {
  authenticatedIsLoading: PropTypes.bool,
  emailExistErrorMessage: PropTypes.string,
  accountType: PropTypes.number,
  checkEmailExist: PropTypes.func,
  resetEmailExistingStates: PropTypes.func,
  selectedMessage: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  emailExistErrorMessage: state.authenticate.emailExistErrorMessage,
  accountType: state.authenticate.accountType,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  checkEmailExist: (data) =>
    dispatch(AuthenticateActions.checkEmailExist(data)),
  resetEmailExistingStates: () =>
    dispatch(AuthenticateActions.resetEmailExistingStates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({});