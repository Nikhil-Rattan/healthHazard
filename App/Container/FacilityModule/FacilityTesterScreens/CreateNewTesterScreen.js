import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import {
  Helpers,
  Colors,
  Fonts,
  Images,
} from 'App/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from 'react-native-popup-dialog';

import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';
import { ValidationService } from 'App/Services/ValidationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import NavigationService from 'App/Services/NavigationService';
import { TextInputMask } from 'react-native-masked-text';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import { AuthenticateService } from 'App/Services/AuthenticateService';
class CreateNewTesterScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsEmailDialogShow: false,
      IsOnProcess: false,
      IsMessageShow: false,
      Message: '',
      scaleAnimationDialogAlert: false,
      IsSuccess: false,
      _facilityname: '',

      inputs: {
        emailId: {
          type: 'email',
          value: '',
          touched: false,
        },
        password: {
          type: 'password',
          value: '',
          touched: false,
        },
        firstName: {
          type: 'firstName',
          value: '',
        },
        lastName: {
          type: 'lastName',
          value: '',
        },
        phoneNumber: {
          type: 'phone',
          value: '',
        },
      },
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
    this.isFormValid = ValidationService.isFormValid.bind(this);
  }

  _gotFacilityName() {
    let Facility_Name = this.props.authenticatedUser?.FacilityName;
    this.setState({ _facilityname: Facility_Name });
  }
  componentDidMount() {
    this._gotFacilityName();
  }

  _onPressButton() { }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  async _CreateCertifiedTester() {
    this.props.resetCertifiedTesterExistingStates();
    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      return;
    }

    const { inputs } = this.state;

    let phoneNumber = inputs['phoneNumber'].value
      .replace(/\s/g, '')
      .replace(/-/g, '')
      .replace(/\(|\)/g, '');
    let payload = {
      FacilityTesterId: 0,
      Title: 0,
      FirstName: inputs['firstName'].value,
      LastName: inputs['lastName'].value,
      PhoneNo: phoneNumber,
      Email: inputs['emailId'].value,
      Password: inputs['password'].value,
      FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
      LoginUserId: this.props.authenticatedUser?.UserId,
      DecryptColumns: ['Password'],
    };

    this.setState({ IsOnProcess: true });
    const response = await AuthenticateService.CheckEmailExist({ Email: payload.Email });
    if (response) {
      console.log(response);
      if (response[0].Status) {
        this.props.saveCertifiedTesterRegistration(payload);
        this.setState({ IsOnProcess: false });
      } else {
        this.setState({ IsEmailDialogShow: true, IsOnProcess: false });
      }
    } else {
      this.setState({ IsOnProcess: false });
      console.log("Something went wrong");
    }


  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
    this.props.resetCertifiedTesterExistingStates();
  }

  _onCancelButton() {
    NavigationService.popScreen();
  }
  onPressBack_Button() {
    NavigationService.popScreen();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.certifiedTesterSignupErrorMessage != null &&
      prevProps.certifiedTesterSignupErrorMessage !=
      this.props.certifiedTesterSignupErrorMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.certifiedTesterSignupErrorMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: true });
    }

    if (
      this.props.certifiedTesterSignup != null &&
      prevProps.certifiedTesterSignup != this.props.certifiedTesterSignup
    ) {
      let Message = this.props.selectedMessage[
        this.props.certifiedTesterSignup
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: true });
    }
  }
  _CloseAlert() {
    let { IsSuccess } = this.state;
    this.setState({ IsMessageShow: false });
    if (IsSuccess) {
      NavigationService.navigateAndReset('FacilityHome');
    }
  }
  _Finish() {
    this.setState({ scaleAnimationDialogAlert: false });
    NavigationService.navigateAndReset('FacilityHome');
  }
  _onPressCloseButton() {
    this.RBSheet.close();
  }
  _nonclickable() { }
  _CloseEmailAlert() {
    this.setState({ IsEmailDialogShow: false });
  }
  renderProfile() {
    return (
      <View style={{ flex: 1 }}>
        <Dialog
          width={0.9}
          visible={this.state.scaleAnimationDialogAlert}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => { }}>
          <DialogContent style={{ backgroundColor: Colors.facilityColor }}>
            <Text
              style={[
                Helpers.bold,
                {
                  fontSize: 23,
                  textAlign: 'center',
                  marginTop: 20,
                  color: '#FFFFFF',
                },
              ]}>
              {this.props.selectedMessage['NewTester-CertifiedTesterCreated']}!
            </Text>

            <Text
              style={[
                Helpers.book,
                {
                  fontSize: 17,
                  textAlign: 'center',
                  marginTop: 10,
                  color: '#FFFFFF',
                },
              ]}>
              {
                this.props.selectedMessage[
                'TestingSiteListScreen-YouHaveSuccessfullyRegistered'
                ]
              }{' '}
              {this.state.inputs['firstName'].value}{' '}
              {this.state.inputs['lastName'].value}.
            </Text>

            <View
              style={{
                backgroundColor: 'transparent',
                height: 70,
                width: '100%',
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <View style={[Helpers.btnContainer, { marginTop: 18 }]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                  style={[Helpers.bigBtnGradient, { width: '75%' }]}>
                  <TouchableOpacity
                    style={Helpers.btn}
                    onPress={this._Finish.bind(this)}
                  >
                    <Text
                      style={[
                        Helpers.btnText,
                        { color: Colors.facilityColor, fontSize: 15 },
                      ]}>
                      {this.props.selectedMessage['NewTester-Finish']}{' '}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </DialogContent>
        </Dialog>

        <View
          style={[
            {
              height: 80,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            },
          ]}>
          <TouchableOpacity
            style={{
              width: 46,
              height: 46,
              borderRadius: 46 / 2,
              marginLeft: 9,
              backgroundColor: '#f6f5fa',
              alignItems: 'center',
            }}
            onPress={this.onPressBack_Button.bind(this)}>
            <Image
              style={{ height: 17, width: 17, marginTop: 16 }}
              source={Images.GreenBackIcon}
            />
          </TouchableOpacity>
          <Image
            style={{ height: 90, width: 90, marginTop: 16 }}
            source={Images.MainLogo}
          />
          <Text
            style={[
              {
                color: Colors.white,
                textAlign: 'center',
                marginTop: 10,
                fontSize: 16,
                textAlign: 'left',
                marginRight: 10,
                fontFamily: 'gothamrounded-bold',
              },
            ]}>
            ....{' '}
          </Text>
        </View>

        <ScrollView overScrollMode="auto" showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                Helpers.BoldTexttitle,
                Helpers.mediumFont,
                { marginTop: 50, width: '100%' },
              ]}>
              {this.props.selectedMessage['NewTester-NewRegisteredTesterPage']}
            </Text>

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, ,
                { borderColor: '#E5E9F2', backgroundColor: '#E5E9F2' },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.BlueColorNew },
              ]}
              placeholder={
                this.props.selectedMessage['RegisterProfile-FirstName']
              }
              placeholderTextColor={Colors.placeholderGraycolor}
              value={this.state._facilityname}
              maxLength={20}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              editable={false}
              hasRightIcon={true}
            />

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, { borderColor: Colors.GreyColor },
                this.state.inputs['firstName'].touched
                  ? this.renderError('firstName')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : {}
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={
                this.props.selectedMessage['RegisterProfile-FirstName']
              }
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) =>
                this.onInputChange({ id: 'firstName', value })
              }
              value={this.state.inputs.firstName.value}
              maxLength={20}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              hasRightIcon={true}
              rightIcon={
                this.state.inputs['firstName'].touched
                  ? this.renderError('firstName')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }
            />
            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, { borderColor: Colors.GreyColor },
                this.state.inputs['lastName'].touched
                  ? this.renderError('lastName')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : {}
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={
                this.props.selectedMessage['RegisterProfile-LastName']
              }
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) =>
                this.onInputChange({ id: 'lastName', value })
              }
              value={this.state.inputs.lastName.value}
              maxLength={20}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              hasRightIcon={true}
              rightIcon={
                this.state.inputs['lastName'].touched
                  ? this.renderError('lastName')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }
            />

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, { borderColor: Colors.GreyColor },
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : {}
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={this.props.selectedMessage['AccountLogin-Email']}
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) =>
                this.onInputChange({ id: 'emailId', value })
              }
              value={this.state.inputs.emailId.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              hasRightIcon={true}
              rightIcon={
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }
            />

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer,
                this.state.inputs['password'].touched
                  ? this.renderError('password')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={this.props.selectedMessage['NewTester-TempPassword']}
              secureTextEntry=""
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) =>
                this.onInputChange({ id: 'password', value })
              }
              value={this.state.inputs.password.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle, { marginTop: '55%' }]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasRightIcon={true}
              secureTextEntry={true}
              rightIcon={
                this.state.inputs['password'].touched
                  ? this.renderError('password')
                    ? Images.InValid
                    : Images.ValidGreen
                  : Images.Information
              }
              onPressRightIcon={() => {
                this.renderError('password') ? null : this.RBSheet.open();
              }}
              hasEvent={true}
            />
            <View
              style={[
                Helpers.txtRoundInputContainer,
                { marginTop: 10, },
                this.state.inputs['phoneNumber'].touched
                  ? this.renderError('phoneNumber')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
              ]}>
              <TextInputMask
                placeholder={
                  this.props.selectedMessage[
                  'RegisterCompleteProfile-PhoneNumber'
                  ]
                }
                placeholderTextColor={Colors.placeholderGraycolor}
                style={[
                  Helpers.txtRoundInputs,
                  Helpers.fill,
                  { color: Colors.facilityColor },
                ]}
                type={'custom'}
                options={{
                  mask: '+99 999 999-9999',
                }}
                maxLength={14}
                keyboardType="phone-pad"
                returnKeyType="done"
                value={this.state.inputs.phoneNumber.value}
                onChangeText={(value) =>
                  this.onInputChange({ id: 'phoneNumber', value })
                }
              />

              {this.state.inputs['phoneNumber'].touched ? (
                this.renderError('phoneNumber') ? (
                  <Image
                    style={[Helpers.rightIconStyle]}
                    resizeMode="contain"
                    source={Images.InValid}
                  />
                ) : (
                  <Image
                    style={[Helpers.rightIconStyle]}
                    resizeMode="contain"
                    source={Images.ValidGreen}
                  />
                )
              ) : null}
            </View>
          </View>
        </ScrollView>

        <CustomMultiButtons
          mutliButtonContainer={[
            Helpers.bottomView,
            { position: 'relative' },
            Helpers.multiButtonContainer,
            {
              justifyContent: 'space-between',
              flexDirection: 'column',
              position: 'relative',
              height: 140,
              backgroundColor: 'white',
            },
          ]}
          leftButtonContainer={[
            Helpers.buttonContainer,
            {
              width: '90%',
              borderRadius: 13,
              backgroundColor: !this.isFormValid() && this.state.IsOnProcess
                ? '#C2CEDB'
                : Colors.facilityColor,
            },
          ]}
          rightButtonContainer={[
            Helpers.buttonContainer,
            Helpers.buttonContainerWithoutBackground,
            { width: '90%', marginBottom: 15 },
          ]}
          leftButtonTextStyle={[
            Helpers.btnText,
            { fontWeight: 'bold', fontSize: 14 },
          ]}
          leftButtonText={
            this.props.selectedMessage['NewTester-CreateCertifiedTester']
          }
          rightButtonTextStyle={[
            Helpers.btnText,
            Helpers.buttonTextWithoutBackgroundContainer,
          ]}
          rightButtonText={this.props.selectedMessage['NewTester-Cancel']}
          onLeftPress={
            !this.isFormValid() && this.state.IsOnProcess
              ? this._nonclickable.bind(this)
              : this._CreateCertifiedTester.bind(this)
          }
          onRightPress={this._onCancelButton.bind(this)}></CustomMultiButtons>
      </View>
    );
  }
  render() {
    const IsFacility = this.props.accountType === Enums.Facility;
    return (
      <SafeAreaView style={{ flex: 1 }}>
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

        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsEmailDialogShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsEmailDialogShow}
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
          _onRightButtonPress={this._CloseEmailAlert.bind(this)}
          hasSingleButton={true}
        />

        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsMessageShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsMessageShow}
          PopUpContainerStyle={{
            backgroundColor: Colors.facilityColor,
            alignItems: 'center',
          }}
          HeaderTitle={
            this.props.selectedMessage['NewTester-CertifiedTesterCreated']
          }
          HeadTitleColor="#FFFFFF"
          SingleButtonText={
            this.props.selectedMessage['RegisterAddDetails-Finish']
          }
          SigleButtonBackground="#FFFFFF"
          MessageColor="#FFFFFF"
          SingleButtonTextColor={Colors.facilityColor}
          leftbuttonbordercolor="#FFFFFF"
          leftbuttontextcolor="#FFFFFF"
          rightbuttontextcolor={Colors.facilityColor}
          Rightbuttonbackgroundcolor="#FFFFFF"
          AlertMessageTitle={
            this.props.selectedMessage['NewTester-successfullyAdded'] +
            ' ' +
            this.state.inputs['firstName'].value +
            ' ' +
            this.state.inputs['lastName'].value +
            '.'
            // +
            // this.props.selectedMessage[
            // 'CreateNewTesterScreen-SorrentoAdministratorNew'
            // ]
          }
          _onRightButtonPress={this._CloseAlert.bind(this)}
          hasSingleButton={true}
        />

        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={400}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: IsFacility
                ? Colors.facilityColor
                : Colors.facilityColor,
            },
          }}>
          <View style={[{ marginTop: 40, width: '100%' }]}>
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
              {this.props.selectedMessage['Register-1Number']}{' '}
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
                  onPress={this._onPressCloseButton.bind(this)}>
                  <Text
                    style={[
                      Helpers.btnText,
                      Helpers.mediumFont,
                      { color: Colors.crossREDcolor, fontSize: Fonts.regular16 },
                    ]}>
                    {this.props.selectedMessage['Register-Close']}{' '}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </RBSheet>

        {Platform.OS == 'ios' ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={40}
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            {this.renderProfile()}
          </KeyboardAvoidingView>
        ) : (
          <View
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            {this.renderProfile()}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

CreateNewTesterScreen.propTypes = {
  authenticatedIsLoading: PropTypes.bool,

  certifiedTesterSignupErrorMessage: PropTypes.string,
  certifiedTesterSignup: PropTypes.string,

  saveCertifiedTesterRegistration: PropTypes.func,
  resetCertifiedTesterExistingStates: PropTypes.func,
  selectedMessage: PropTypes.any,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  cityList: state.authenticate.cityList,
  stateList: state.authenticate.stateList,
  cityStateByZipCodeResponse: state.authenticate.cityStateByZipCodeResponse,
  certifiedTesterSignup: state.authenticate.certifiedTesterSignup,
  certifiedTesterSignupErrorMessage:
    state.authenticate.certifiedTesterSignupErrorMessage,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  saveCertifiedTesterRegistration: (data) =>
    dispatch(AuthenticateActions.saveCertifiedTesterRegistration(data)),

  resetCertifiedTesterExistingStates: () =>
    dispatch(AuthenticateActions.resetCertifiedTesterExistingStates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewTesterScreen);
