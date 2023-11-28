import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import {
  Helpers,
  Colors,
  Fonts,
  ApplicationStyles,
  Images,
  Metrics,
} from 'App/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';
import CustomButton from 'App/Components/CustomButton';

import CustomDDL from 'App/Components/CustomDDL';
import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import { color } from 'react-native-reanimated';
import { ExtractCityState } from 'App/Stores/Authentication/Selectors';
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import NavigationService from 'App/Services/NavigationService';
import { TextInputMask } from 'react-native-masked-text';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
class ChangePassword extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      Message: '',
      IsSuccess: false,
      scaleAnimationDialogAlert: false,
      inputs: {
        currentPassword: {
          type: 'password',
          value: '',
          touched: false,
        },
        newPassword: {
          type: 'password',
          value: '',
        },
        confirmPassword: {
          type: 'generic',
          value: '',
        },
      },

      popUpIsSelected: false,
      SelectedLable: 'Gender at Birth',
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  componentDidMount() {
    this.props.resetChangePassword();
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  _UpdatePassword() {
    const { inputs } = this.state;
    if (inputs['newPassword'].value != inputs['confirmPassword'].value) {
      this.onChangePasswordText(inputs['confirmPassword'].value);
      return;
    }

    this.props.resetChangePassword();
    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      return;
    }

    //

    let payload = {
      CurrentPassword: inputs['currentPassword'].value,
      NewPassword: inputs['newPassword'].value,
      UserId: this.props.authenticatedUser.UserId,
      UserKey: this.props.authenticatedUser?.UserKey ?? '',
    };

    //alert(JSON.stringify(payload))

    this.props.changePassword(payload);
  }

  _onCancelButton() {
    NavigationService.popScreen();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.changePasswordFailure != null &&
      prevProps.changePasswordFailure != this.props.changePasswordFailure
    ) {
      let Message = this.props.selectedMessage[
        this.props.changePasswordFailure
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: false });
    }

    if (
      this.props.changePasswordMessage != null &&
      prevProps.changePasswordMessage != this.props.changePasswordMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.changePasswordMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: true });
    }
  }
  _CloseAlert() {
    let { IsSuccess } = this.state;
    this.setState({ IsMessageShow: false });
    if (IsSuccess) {
      NavigationService.popScreen();
    }
  }

  _onPressCloseButton() {
    this.RBSheet.close();
  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
    this.props.resetChangePassword();
  }
  _onPasswordInputBlur(event) {
    let { inputs } = this.state;
    this.onChangePasswordText(inputs['confirmPassword'].value);
  }

  onChangePasswordText(value) {
    // this.onInputChange({id: 'confirmPassword', value})
    const { inputs } = this.state;
    let updatedPasswordError = null;
    if (inputs['newPassword'].value != value) {
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

  render() {
    const IsPatient =
      this.props.authenticatedUser?.UserRoleId === Enums.Patient;
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
              backgroundColor: IsPatient
                ? Colors.patientColor
                : Colors.facilityColor,
            },
          }}>
          <View style={[{ marginTop: 20 }]}>
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
          </View>
          <View
            style={[Helpers.btnContainer, { position: 'absolute', bottom: 20 }]}>
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
        </RBSheet>
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
            this.setState({ IsMessageShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsMessageShow}
          PopUpContainerStyle={{
            backgroundColor: IsPatient
              ? Colors.patientColor
              : Colors.facilityColor,
            alignItems: 'center',
          }}
          HeaderTitle=" "
          HeadTitleColor="#FFFFFF"
          SingleButtonText={this.props.selectedMessage['Register-Close']}
          SigleButtonBackground="#FFFFFF"
          MessageColor="#FFFFFF"
          SingleButtonTextColor={
            IsPatient ? Colors.patientColor : Colors.facilityColor
          }
          leftbuttonbordercolor="#FFFFFF"
          leftbuttontextcolor="#FFFFFF"
          rightbuttontextcolor={
            IsPatient ? Colors.patientColor : Colors.facilityColor
          }
          Rightbuttonbackgroundcolor="#FFFFFF"
          AlertMessageTitle={this.state.Message}
          _onRightButtonPress={this._CloseAlert.bind(this)}
          hasSingleButton={true}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={40}
          style={{ flex: 1, backgroundColor: 'white' }}>
          <View
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            <ScrollView
              overScrollMode="auto"
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: 15 }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={[Helpers.BoldTexttitle, { marginTop: 100 }]}>
                  {this.props.selectedMessage['ProfileSetting-ChangePassword']}
                </Text>

                <CustomInputBox
                  containerStyle={[
                    Helpers.txtRoundInputContainer,
                    this.renderError('currentPassword')
                      ? { borderColor: Colors.error }
                      : {
                        borderColor: IsPatient
                          ? Colors.patientColor
                          : Colors.facilityColor,
                      },
                  ]}
                  inputBoxstyle={[
                    Helpers.txtRoundInputs,
                    Helpers.fill,
                    {
                      color: IsPatient
                        ? Colors.patientColor
                        : Colors.facilityColor,
                    },
                  ]}
                  placeholder={this.props.selectedMessage['Register-Password']}
                  secureTextEntry=""
                  placeholderTextColor={Colors.lightblack}
                  onChangeText={(value) =>
                    this.onInputChange({ id: 'currentPassword', value })
                  }
                  value={this.state.inputs.currentPassword.value}
                  // inputLabl={ this.props.selectedMessage["Register-Password"]}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  inputBoxLableStyle={[
                    Helpers.inputBoxLable,
                    {
                      color: IsPatient
                        ? Colors.patientColor
                        : Colors.facilityColor,
                    },
                  ]}
                  hasRightIcon={true}
                  secureTextEntry={true}
                  maxLength={24}

                  rightIcon={
                    this.state.inputs['currentPassword'].touched
                      ? this.renderError('currentPassword')
                        ? Images.InValid
                        : IsPatient
                          ? Images.ValidPurple
                          : Images.ValidGreen
                      : Images.Information
                    // : null
                  }
                  onPressRightIcon={() => {
                    this.renderError('newPassword') ? null : this.RBSheet.open();
                  }}
                  hasEvent={true}
                />

                <CustomInputBox
                  containerStyle={[
                    Helpers.txtRoundInputContainer,
                    this.renderError('newPassword')
                      ? { borderColor: Colors.error }
                      : {
                        borderColor: IsPatient
                          ? Colors.patientColor
                          : Colors.facilityColor,
                      },
                  ]}
                  inputBoxstyle={[
                    Helpers.txtRoundInputs,
                    Helpers.fill,
                    {
                      color: IsPatient
                        ? Colors.patientColor
                        : Colors.facilityColor,
                    },
                  ]}
                  placeholder={this.props.selectedMessage['Register-NewPassword']}
                  secureTextEntry=""
                  placeholderTextColor={Colors.lightblack}
                  onChangeText={(value) =>
                    this.onInputChange({ id: 'newPassword', value })
                  }
                  // onEndEditing={this._onPasswordInputBlur.bind(this)}
                  value={this.state.inputs.newPassword.value}
                  //inputLabl={ this.props.selectedMessage["Register-NewPassword"]}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  rightIconStyle={[Helpers.rightIconStyle, { marginTop: '55%' }]}
                  inputBoxLableStyle={[
                    Helpers.inputBoxLable,
                    {
                      color: IsPatient
                        ? Colors.patientColor
                        : Colors.facilityColor,
                    },
                  ]}
                  hasRightIcon={true}
                  secureTextEntry={true}
                  maxLength={24}
                  rightIcon={
                    this.state.inputs['newPassword'].touched
                      ? this.renderError('newPassword')
                        ? Images.InValid
                        : IsPatient
                          ? Images.ValidPurple
                          : Images.ValidGreen
                      : Images.Information
                  }
                  onPressRightIcon={() => {
                    this.renderError('newPassword') ? null : this.RBSheet.open();
                  }}
                  hasEvent={true}
                />

                <CustomInputBox
                  containerStyle={[
                    Helpers.txtRoundInputContainer, ,
                    this.renderError('confirmPassword')
                      ? { borderColor: Colors.error }
                      : {
                        borderColor: IsPatient
                          ? Colors.patientColor
                          : Colors.facilityColor,
                      },
                  ]}
                  inputBoxstyle={[
                    Helpers.txtRoundInputs,
                    Helpers.fill,
                    {
                      color: IsPatient
                        ? Colors.patientColor
                        : Colors.facilityColor,
                    },
                  ]}
                  placeholder={
                    this.props.selectedMessage['Register-ConfirmPassword']
                  }
                  secureTextEntry=""
                  placeholderTextColor={Colors.lightblack}
                  onChangeText={this.onChangePasswordText.bind(this)}
                  value={this.state.inputs.confirmPassword.value}
                  //inputLabl={ this.props.selectedMessage["Register-ConfirmPassword"]}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  inputBoxLableStyle={[
                    Helpers.inputBoxLable,
                    {
                      color: IsPatient
                        ? Colors.patientColor
                        : Colors.facilityColor,
                    },
                  ]}
                  hasRightIcon={true}
                  secureTextEntry={true}
                  maxLength={24}
                  rightIcon={
                    this.state.inputs['confirmPassword'].touched
                      ? this.renderError('confirmPassword')
                        ? Images.InValid
                        : IsPatient
                          ? Images.ValidPurple
                          : Images.ValidGreen
                      : null
                  }
                  hasEvent={false}
                />
              </View>
            </ScrollView>
          </View>
          <CustomMultiButtons
            mutliButtonContainer={[
              Helpers.bottomView,
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
                backgroundColor: IsPatient
                  ? Colors.patientColor
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
              this.props.selectedMessage['ProfileSetting-UpdatePassword']
            }
            rightButtonTextStyle={[
              Helpers.btnText,
              Helpers.buttonTextWithoutBackgroundContainer,
            ]}
            rightButtonText={this.props.selectedMessage['NewTester-Cancel']}
            onLeftPress={this._UpdatePassword.bind(this)}
            onRightPress={this._onCancelButton.bind(this)}></CustomMultiButtons>

        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

ChangePassword.propTypes = {
  authenticatedIsLoading: PropTypes.bool,
  changePasswordMessage: PropTypes.string,
  changePasswordFailure: PropTypes.string,
  authenticatedUser: PropTypes.any,

  selectedMessage: PropTypes.any,
  changePassword: PropTypes.func,
  resetChangePassword: PropTypes.func,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  changePasswordMessage: state.authenticate.changePasswordMessage,
  changePasswordFailure: state.authenticate.changePasswordFailure,
  selectedMessage: state.startup.selectedMessage,
  authenticatedUser: state.authenticate.authenticatedUser,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  changePassword: (data) => dispatch(AuthenticateActions.changePassword(data)),
  resetChangePassword: () =>
    dispatch(AuthenticateActions.resetChangePassword()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
