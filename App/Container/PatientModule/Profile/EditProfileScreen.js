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
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import {
  Metrics,
  Helpers,
  Colors,
  Fonts,
  ApplicationStyles,
  Images,
} from 'App/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';
import CustomButton from 'App/Components/CustomButton';
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import { TextInputMask } from 'react-native-masked-text';
import CustomDDL from 'App/Components/CustomDDL';
import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import { color } from 'react-native-reanimated';
import NavigationService from 'App/Services/NavigationService';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import StartupActions from 'App/Stores/Startup/Actions';
import { LanguageEnum } from 'App/Enums';
class EditProfileScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsSuccess: false,
      IsMessageShow: false,
      Message: '',
      inputs: {
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
        emailId: {
          type: 'email',
          value: '',
        },
        language: {
          type: 'cities',
          value: '',
          touched: true,
        },
      },

      currentLocale: 'en',
      selectedValue: LanguageEnum['LanguageValue-' + this.props.locale],
      popUpIsSelected: false,
      SelectedLable: LanguageEnum['LanguageLable-' + this.props.locale],
      LanguageList: [
        {
          LanguageId: 1,
          Name: this.props.selectedMessage['EditFacProfile-English'],
          Locale: 'en',
        },
        {
          LanguageId: 2,
          Name: this.props.selectedMessage['EditFacProfile-Spanish'],
          Locale: 'sp',
        },
        {
          LanguageId: 3,
          Name: this.props.selectedMessage['EditFacProfile-Portugues'],
          Locale: 'pr',
        },
      ],
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  findLanguageById(LanguageId) {
    let selectedLanguage = this.state.LanguageList.filter((d) => {
      return d.LanguageId === LanguageId;
    });

    return selectedLanguage;
  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.updateUserDetailErroressage != null &&
      prevProps.updateUserDetailErroressage !=
      this.props.updateUserDetailErroressage
    ) {
      //  this.RBErrorSheet.open()
      let Message = this.props.selectedMessage[
        this.props.updateUserDetailErroressage
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: false });
    }

    if (
      this.props.updateUserDetailSuccessMessage != null &&
      prevProps.updateUserDetailSuccessMessage !=
      this.props.updateUserDetailSuccessMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.updateUserDetailSuccessMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: true });
    }
  }

  componentDidMount() {
    const {
      FirstName,
      LastName,
      Email,
      PhoneNo,
      LanguageId,
    } = this.props.authenticatedUser;

    const { inputs } = this.state;
    const updatedEmailInput = { ...inputs['emailId'], value: Email };
    const updatedFisrtNameInput = { ...inputs['firstName'], value: FirstName };
    const updatedLastNameInput = { ...inputs['lastName'], value: LastName };
    const updatedPhoneInput = { ...inputs['phoneNumber'], value: PhoneNo };

    let input = {
      ...inputs,
      emailId: updatedEmailInput,
      firstName: updatedFisrtNameInput,
      lastName: updatedLastNameInput,
      phoneNumber: updatedPhoneInput,
    };

    let selectedLanguage = this.findLanguageById(LanguageId);
    if (selectedLanguage.length > 0) {
      this.setState({
        selectedValue: selectedLanguage[0].LanguageId,
        popUpIsSelected: false,
        SelectedLable: selectedLanguage[0].Name,
        currentLocale: selectedLanguage[0].Locale,
      });
      const updatedLanguageInput = { ...inputs['language'], value: LanguageId };
      input = { ...input, language: updatedLanguageInput };
    }
    this.setState({ inputs: input });
    this.props.resetUpdateUserDetail();
  }

  popUpListItemOnChange = (selectedValue) => {
    let { popUpIsSelected } = this.state;
    this.setState({
      selectedValue: selectedValue.LanguageId,
      SelectedLable: selectedValue.Name,
      popUpIsSelected: false,
      currentLocale: selectedValue.Locale,
    });
    this.onInputChange({ id: 'language', value: selectedValue.LanguageId });
  };
  _onSignUpPressButton() {
    NavigationService.popScreen();
  }

  _onLeftPressButton() {
    const firstInvalidCoordinate = this.getFormValidation();
    if (firstInvalidCoordinate != null) {
      return;
    }

    const userPayload = {
      PatientId: this.props.authenticatedUser?.PatientId,
      TitleId: 0,
      FirstName: this.state.inputs['firstName'].value.trim(),
      LastName: this.state.inputs['lastName'].value.trim(),
      Email: this.state.inputs['emailId'].value,
      Address: this.props.authenticatedUser?.Address,
      DOB: this.props.authenticatedUser?.DOB,
      Age: this.getAge(this.props.authenticatedUser?.DOB),
      PhoneNo: this.state.inputs['phoneNumber'].value
        .replace(/\s/g, '')
        .replace(/-/g, '')
        .replace(/\(|\)/g, ''),
      CityId: this.props.authenticatedUser?.CityId,
      State: this.props.authenticatedUser?.State,
      ZipCode: this.props.authenticatedUser?.ZipCode,
      GenderId: this.props.authenticatedUser?.GenderId,
      EthnicityId: this.props.authenticatedUser?.EthnicityId,
      RaceId: this.props.authenticatedUser?.RaceId,
      ParticipantTypeId: this.props.authenticatedUser?.ParticipantTypeId,
      FacilityUserId: 0,
      LoginUserId: this.props.authenticatedUser?.UserId,
      DecryptColumns: [],
      LangaugeId: this.state.inputs['language'].value,
      UserKey: this.props.authenticatedUser?.UserKey,
    };
    userPayload.DecryptColumns = ['FirstName', 'LastName', 'DOB', 'Address'];
    let userDetail = {
      UserKey: this.props.authenticatedUser?.UserKey,
      UserId: this.props.authenticatedUser?.UserId,
      UserRoleId: this.props.authenticatedUser?.UserRoleId,
    };
    let payload = {
      userPayload: userPayload,
      userDetail: userDetail,
    };

    this.props.updateUserDetail(payload);
    this.props.updateLanguage(this.state.currentLocale);
  }

  getAge(DOB) {
    let today = new Date();
    let birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  _CloseAlert() {
    let { IsSuccess } = this.state;
    this.setState({ IsMessageShow: false });
    if (IsSuccess) {
      NavigationService.popScreen();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <SafeAreaView style={{ flex: 1 }}>
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
            HeaderTitle=" "
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            <ScrollView
              contentContainerStyle={{
                backgroundColor: 'white',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text style={[Helpers.BoldTexttitle, { marginTop: 80 }]}>
                {this.props.selectedMessage['EditFacProfile-EditProfile']}
              </Text>

              <CustomInputBox
                containerStyle={[
                  Helpers.RectangletxtInputContainer,
                  this.renderError('firstName')
                    ? { borderColor: Colors.error }
                    : {},
                  { marginTop: 0, width: '100%' },
                ]}
                inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
                placeholder={
                  this.props.selectedMessage['RegisterProfile-FirstName']
                }
                onChangeText={(value) =>
                  this.onInputChange({ id: 'firstName', value })
                }
                value={this.state.inputs.firstName.value}
                // inputLabl={this.props.selectedMessage["RegisterProfile-FirstName"] }
                componentStyle={[Helpers.column, Helpers.crossStart]}
                rightIconStyle={[Helpers.rightIconStyle]}
                inputBoxLableStyle={[Helpers.inputBoxLable]}
                hasEvent={false}
                maxLength={20}
                hasRightIcon={true}
                rightIcon={
                  this.state.inputs['firstName'].touched
                    ? this.renderError('firstName')
                      ? Images.InValid
                      : Images.ValidPurple
                    : null
                }
              />
              <CustomInputBox
                containerStyle={[
                  Helpers.RectangletxtInputContainer,
                  this.renderError('lastName') ? { borderColor: Colors.error } : {},
                  { marginTop: 0, width: '100%' },
                ]}
                inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
                placeholder={
                  this.props.selectedMessage['RegisterProfile-LastName']
                }
                onChangeText={(value) =>
                  this.onInputChange({ id: 'lastName', value })
                }
                value={this.state.inputs.lastName.value}
                // inputLabl={this.props.selectedMessage["RegisterProfile-LastName"] }
                componentStyle={[Helpers.column, Helpers.crossStart]}
                rightIconStyle={[Helpers.rightIconStyle]}
                inputBoxLableStyle={[Helpers.inputBoxLable]}
                hasEvent={false}
                hasRightIcon={true}
                maxLength={20}
                rightIcon={
                  this.state.inputs['lastName'].touched
                    ? this.renderError('lastName')
                      ? Images.InValid
                      : Images.ValidPurple
                    : null
                }
              />
              <CustomInputBox
                containerStyle={[
                  Helpers.RectangletxtInputContainer,
                  { backgroundColor: '#E5E9F2' },
                  this.renderError('emailId') ? { borderColor: Colors.error } : {},
                  { marginTop: 0, width: '100%' },
                ]}
                inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
                placeholder={this.props.selectedMessage['AccountLogin-Email']}
                onChangeText={(value) =>
                  this.onInputChange({ id: 'emailId', value })
                }
                value={this.state.inputs.emailId.value}
                //  inputLabl={this.props.selectedMessage["AccountLogin-Email"] }
                componentStyle={[Helpers.column, Helpers.crossStart]}
                rightIconStyle={[Helpers.rightIconStyle]}
                inputBoxLableStyle={[Helpers.inputBoxLable]}
                hasEvent={false}
                hasRightIcon={true}
                editable={false}
                rightIcon={
                  this.state.inputs['emailId'].touched
                    ? this.renderError('emailId')
                      ? Images.InValid
                      : Images.ValidPurple
                    : null
                }
              />

              <Text style={Helpers.inputBoxLable}>
                {this.state.inputs.phoneNumber.value
                  ? this.props.selectedMessage[
                  'RegisterCompleteProfile-PhoneNumber'
                  ]
                  : null}
              </Text>
              <View
                style={[
                  Helpers.txtRoundInputContainer,
                  { marginTop: 1 },
                  this.renderError('phoneNumber')
                    ? { borderColor: Colors.error }
                    : {},
                ]}>
                <TextInputMask
                  placeholder={
                    this.props.selectedMessage[
                    'RegisterCompleteProfile-PhoneNumber'
                    ]
                  }
                  placeholderTextColor={Colors.placeholderGraycolor}
                  style={[Helpers.txtRoundInputs, Helpers.fill]}
                  type={'custom'}
                  options={{
                    mask: '+99 999 999-9999',
                  }}
                  maxLength={16}
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
                      source={Images.ValidPurple}
                    />
                  )
                ) : null}
              </View>

              <CustomDDLPopUp
                // add Condition
                ddlContainerStyle={[
                  Helpers.buttonContainer,
                  Metrics.smallVerticalMargin,
                  this.state.inputs['language'].touched
                    ? this.renderError('language')
                      ? {
                        borderColor: 'red',
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                      }
                      : this.state.selectedValue
                        ? {}
                        : {
                          backgroundColor: 'transparent',
                          borderColor: Colors.patientColor,
                          borderWidth: 0.8,
                        }
                    : this.state.selectedValue
                      ? {}
                      : {
                        backgroundColor: 'transparent',
                        borderColor: Colors.patientColor,
                        borderWidth: 0.8,
                      },
                ]}
                // add Condition
                ddlLableStyle={[
                  { width: '70%', paddingLeft: 16 },
                  {
                    color: this.state.selectedValue
                      ? 'white'
                      : Colors.patientColor,
                  },
                ]}
                ddlIconContainerStyle={[{ width: '30%' }]}
                ddlIconStyle={[Helpers.rightIconStyle]}
                popUpListItemTextStyle={[Helpers.popUpListItemTextStyle]}
                popUpListItemStyle={[Helpers.popUpListItemStyle]}
                popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                popUpTitleStyle={[Helpers.popUpTitleStyle]}
                popUpTitleAlign={'left'}
                popUpTitleText={
                  this.props.selectedMessage['LanguageScreen-LanguageSelection']
                }
                popUpListSrc={this.state.LanguageList}
                popUpIsSelected={this.state.popUpIsSelected}
                popUpSelectedValue={this.state.selectedValue}
                popUpSelectedLable={'Language:' + this.state.SelectedLable}
                popUpKey={'LanguageId'}
                popUpListItemOnChange={this.popUpListItemOnChange.bind(this)}
                leftIcon={
                  this.state.selectedValue ? Images.DDLWhite : Images.DDLPurple
                }
                openPopUp={true}></CustomDDLPopUp>
            </ScrollView>

            <CustomMultiButtons
              mutliButtonContainer={[
                Helpers.bottomView,
                Helpers.multiButtonContainer,
                {
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  position: 'relative',
                  height: 140,
                },
              ]}
              leftButtonContainer={[
                Helpers.buttonContainer,
                { width: '98%', borderRadius: 13 },
              ]}
              rightButtonContainer={[
                Helpers.buttonContainer,
                Helpers.buttonContainerWithoutBackground,
                { width: '98%', marginBottom: 15 },
              ]}
              leftButtonTextStyle={[
                Helpers.btnText,
                { fontWeight: 'bold', fontSize: 14 },
              ]}
              leftButtonText={
                this.props.selectedMessage['EditFacProfile-SaveChanges']
              }
              rightButtonTextStyle={[
                Helpers.btnText,
                Helpers.buttonTextWithoutBackgroundContainer,
              ]}
              rightButtonText={
                this.props.selectedMessage['EditFacProfile-Cancel']
              }
              onLeftPress={this._onLeftPressButton.bind(this)}
              onRightPress={this._onSignUpPressButton.bind(
                this,
              )}></CustomMultiButtons>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

EditProfileScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  updateUserDetail: PropTypes.func,
  resetUpdateUserDetail: PropTypes.func,
  updateUserDetailErroressage: PropTypes.string,
  updateUserDetailSuccessMessage: PropTypes.string,
  selectedMessage: PropTypes.any,
  updateLanguage: PropTypes.func,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  updateUserDetailErroressage: state.authenticate.updateUserDetailErroressage,
  updateUserDetailSuccessMessage:
    state.authenticate.updateUserDetailSuccessMessage,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) =>
    dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
  updateUserDetail: (data) =>
    dispatch(AuthenticateActions.updateUserDetail(data)),
  resetUpdateUserDetail: () =>
    dispatch(AuthenticateActions.resetUpdateUserDetail()),
  updateLanguage: (data) => dispatch(StartupActions.updateLanguage(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
