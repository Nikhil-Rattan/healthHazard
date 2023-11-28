import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import { Helpers, Colors, Images } from 'App/Theme';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CustomHeaderNew from 'App/Components/CustomHeaderNew';
import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';
import { ValidationService } from 'App/Services/ValidationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import NavigationService from 'App/Services/NavigationService';
import { TextInputMask } from 'react-native-masked-text';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';

class EditTesterScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      Message: '',
      IsSuccess: false,
      scaleAnimationDialogAlert: false,
      Facility_Name: '',

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
        firstName: {
          type: 'firstName',
          value: '',
        },
        lastName: {
          type: 'lastName',
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
    let { testerInfoForEdit } = this.props;

    const { inputs } = this.state;
    const updatedFacilityNameInput = { value: testerInfoForEdit?.FacilityName };
    const updatedEmailInput = {
      ...inputs['emailId'],
      value: testerInfoForEdit?.Email,
    };
    const updatedFisrtNameInput = {
      ...inputs['firstName'],
      value: testerInfoForEdit?.FirstName,
    };
    const updatedLastNameInput = {
      ...inputs['lastName'],
      value: testerInfoForEdit?.LastName,
    };
    const updatedPhoneInput = {
      ...inputs['phoneNumber'],
      value: testerInfoForEdit?.PhoneNo,
    };

    let input = {
      ...inputs,
      emailId: updatedEmailInput,
      firstName: updatedFisrtNameInput,
      lastName: updatedLastNameInput,
      phoneNumber: updatedPhoneInput,
    };

    this.setState({ inputs: input, Facility_Name: updatedFacilityNameInput });
  }

  _onPressButton() { }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  _CreateCertifiedTester() {
    this.props.resetCertifiedTesterExistingStates();
    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      return;
    }

    const { inputs } = this.state;

    let payload = {
      FacilityTesterId: this.props.testerInfoForEdit?.FacilityTesterId,
      Title: 0,
      FirstName: inputs['firstName'].value,
      LastName: inputs['lastName'].value,
      PhoneNo: inputs['phoneNumber'].value
        .replace(/\s/g, '')
        .replace(/-/g, '')
        .replace(/\(|\)/g, ''),
      Email: inputs['emailId'].value,
      FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
      LoginUserId: this.props.authenticatedUser?.UserId,
      DecryptColumns: [''],
    };

    this.props.saveCertifiedTesterRegistration(payload);
  }

  _onCancelButton() {
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
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: false });
    }

    if (
      this.props.certifiedTesterSignup != null &&
      prevProps.certifiedTesterSignup != this.props.certifiedTesterSignup
    ) {

      let Message =
        this.props.selectedMessage[
        'EditFacProfile-SuccessfyllyFacilityChangesSave'
        ] +
        ' ' +
        this.state.inputs['firstName'].value +
        ' ' +
        this.state.inputs['lastName'].value;
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

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
    this.props.resetCertifiedTesterExistingStates();
  }

  _OnClickCrossButton() {
    NavigationService.popScreen();
  }

  renderProfile() {
    return (
      <View style={{ flex: 1 }}>
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
                { marginTop: 70, color: Colors.BlueColorNew },
              ]}>
              {this.props.selectedMessage['NewTester-NewCertifiedTester']}
            </Text>

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer,
                { borderColor: '#E5E9F2', backgroundColor: '#E5E9F2' },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.BlueColorNew },
              ]}
              placeholderTextColor={Colors.lightblack}
              value={this.state.Facility_Name.value}
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
                Helpers.txtRoundInputContainer,
                this.renderError('firstName')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.facilityColor },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={
                this.props.selectedMessage['RegisterProfile-FirstName']
              }
              placeholderTextColor={Colors.lightblack}
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
                Helpers.txtRoundInputContainer,
                this.renderError('lastName')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.facilityColor },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={
                this.props.selectedMessage['RegisterProfile-LastName']
              }
              placeholderTextColor={Colors.lightblack}
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
                Helpers.txtRoundInputContainer,
                { backgroundColor: '#dddddd' },
                this.renderError('emailId')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.facilityColor },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={this.props.selectedMessage['AccountLogin-Email']}
              placeholderTextColor={Colors.lightblack}
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
              editable={false}
              rightIcon={
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }
            />

            <View
              style={[
                Helpers.txtRoundInputContainer,
                { marginTop: 10 },
                this.renderError('phoneNumber')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.facilityColor },
              ]}>
              <TextInputMask
                placeholder={
                  this.props.selectedMessage['RegisterProfile-PhoneNumber']
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
              backgroundColor: Colors.facilityColor,
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
            this.props.selectedMessage['NewTester-UpdateCertifiedTester']
          }
          rightButtonTextStyle={[
            Helpers.btnText,
            Helpers.buttonTextWithoutBackgroundContainer,
          ]}
          rightButtonText={this.props.selectedMessage['NewTester-Cancel']}
          onLeftPress={this._CreateCertifiedTester.bind(this)}
          onRightPress={this._onCancelButton.bind(this)}></CustomMultiButtons>
      </View>
    );
  }
  render() {
    const IsFacility = this.props.accountType === Enums.Facility;

    let { testerInfoForEdit } = this.props;
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
            this.setState({ IsMessageShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsMessageShow}
          PopUpContainerStyle={{
            backgroundColor: Colors.facilityColor,
            alignItems: 'center',
          }}
          HeaderTitle={this.props.selectedMessage['NewTester-ChangesSaved']}
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
          AlertMessageTitle={this.state.Message}
          _onRightButtonPress={this._CloseAlert.bind(this)}
          hasSingleButton={true}
        />

        <CustomHeaderNew
          HeaderColor={{ backgroundColor: 'white' }}
          textcolorHeader={Colors.BlueColorNew}
          onPressBackButton={this._OnClickCrossButton.bind(this)}
          HeaderTitle={
            testerInfoForEdit.FirstName + ' ' + testerInfoForEdit.LastName
          }
          LeftImage={Images.GreenBackIcon}
        />

        {Platform.OS == 'ios' ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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

EditTesterScreen.propTypes = {
  authenticatedIsLoading: PropTypes.bool,

  certifiedTesterSignupErrorMessage: PropTypes.string,
  certifiedTesterSignup: PropTypes.string,

  saveCertifiedTesterRegistration: PropTypes.func,
  resetCertifiedTesterExistingStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  testerInfoForEdit: PropTypes.func,
  resetTesterForEdit: PropTypes.func,
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
  testerInfoForEdit: state.facilityProfile.testerInfoForEdit,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  saveCertifiedTesterRegistration: (data) =>
    dispatch(AuthenticateActions.saveCertifiedTesterRegistration(data)),
  resetTesterForEdit: () =>
    dispatch(FacilityProfileActions.resetTesterForEdit()),
  resetCertifiedTesterExistingStates: () =>
    dispatch(AuthenticateActions.resetCertifiedTesterExistingStates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTesterScreen);
