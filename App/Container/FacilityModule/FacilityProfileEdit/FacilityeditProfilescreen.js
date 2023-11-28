import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import {
  Metrics,
  Helpers,
  Colors,
  Images,
} from 'App/Theme';

import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import { ValidationService } from 'App/Services/ValidationService';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import NavigationService from 'App/Services/NavigationService';
import CustomHeaderNew from 'App/Components/CustomHeaderNew';
import StartupActions from 'App/Stores/Startup/Actions';
import { LanguageEnum } from 'App/Enums';

class FacilityeditProfilescreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      Message: '',
      IsSuccess: false,
      AlertHeader: '',
      currentLocale: 'en',
      selectedValue: LanguageEnum['LanguageValue-' + this.props.locale], //this.props.locale=="en"?1:2,
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

      scaleAnimationDialogAlert: false,
      inputs: {
        facilityName: {
          type: 'facilityName',
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
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
    this.formToched = ValidationService.isFormToched.bind(this);
  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
  }

  _CloseAlert() {
    let { IsSuccess } = this.state;
    this.setState({ IsMessageShow: false });
    if (IsSuccess) {
      NavigationService.popScreen();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.updateFacilityUserDetailErroressage != null) {
      let Message = this.props.selectedMessage[
        this.props.updateFacilityUserDetailErroressage
      ];
      this.props.resetUpdateFacilityUserDetail();
      this.setState({
        IsMessageShow: true,
        Message: Message,
        IsSuccess: false,
        AlertHeader: '',
      });
    }

    if (this.props.updateFacilityUserDetailSuccessMessage != null) {

      let Message = this.props.selectedMessage[
        this.props.updateFacilityUserDetailSuccessMessage
      ];
      this.props.resetUpdateFacilityUserDetail();
      Message =
        this.props.selectedMessage[
        'EditFacProfile-SuccessfyllyFacilityChangesSave'
        ] +
        ' ' +
        this.props.authenticatedUser.FirstName +
        ' ' +
        this.props.authenticatedUser.LastName;

      this.setState({
        IsMessageShow: true,
        Message: Message,
        IsSuccess: true,
        AlertHeader: this.props.selectedMessage['NewTester-ChangesSaved'],
      });
    }
  }

  componentDidMount() {
    const {
      FacilityName,
      FirstName,
      LastName,
      FacilityEmail,
      FacilityPhoneNo,
      LanguageId,
    } = this.props.authenticatedUser;
    const { inputs } = this.state;
    const updatedEmailInput = { ...inputs['emailId'], value: FacilityEmail };
    const updatedFacilityNameInput = {
      ...inputs['facilityName'],
      value: FacilityName,
    };
    const updatedFirstNameInput = { ...inputs['firstName'], value: FirstName };
    const updatedLastNameInput = { ...inputs['lastName'], value: LastName };

    let input = {
      ...inputs,
      emailId: updatedEmailInput,
      facilityName: updatedFacilityNameInput,
      firstName: updatedFirstNameInput,
      lastName: updatedLastNameInput,
    };

    let selectedLanguage = this.findLanguageById(LanguageId);
    if (selectedLanguage.length > 0) {
      this.setState({
        selectedValue: selectedLanguage[0].LanguageId,
        popUpIsSelected: true,
        SelectedLable: selectedLanguage[0].Name,
        currentLocale: selectedLanguage[0].Locale,
      });
      const updatedLanguageInput = { ...inputs['language'], value: LanguageId };
      input = { ...input, language: updatedLanguageInput };
    }

    this.setState({ inputs: input });
    this.props.resetUpdateFacilityUserDetail();

  }

  findLanguageById(LanguageId) {
    let selectedLanguage = this.state.LanguageList.filter((d) => {
      return d.LanguageId === LanguageId;
    });

    return selectedLanguage;
  }

  _onSignUpPressButton() {
    NavigationService.navigate('ProfileScreen');
  }
  _onSaveChangesPressButton() {
    if (this.formToched()) {
      this.setState({ scaleAnimationDialogAlert: true });
    } else {
      NavigationService.popScreen();
    }
  }
  _onLeftPressButton() {
    const firstInvalidCoordinate = this.getFormValidation();
    if (firstInvalidCoordinate != null) {
      return;
    }
    const userPayload = {
      FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
      FirstName: this.state.inputs['firstName'].value.trim(),
      LastName: this.state.inputs['lastName'].value.trim(),
      FacilityName: this.state.inputs['facilityName'].value.trim(),
      ContactName: this.props.authenticatedUser?.ContactName,
      PhysicianName: this.props.authenticatedUser?.PhysicianName,
      Email: this.state.inputs['emailId'].value,
      DOB: null,
      Address: this.props.authenticatedUser?.Address,
      WebsiteURL: this.props.authenticatedUser?.WebsiteURL,
      CityId: this.props.authenticatedUser?.CityId,
      State: this.props.authenticatedUser?.State,
      ZipCode: this.props.authenticatedUser?.ZipCode,
      PhoneNo: this.props.authenticatedUser?.FacilityUserPhoneNo,
      FacilityPhone: this.props.authenticatedUser?.FacilityPhoneNo,
      PhysicianPhoneNo: this.props.authenticatedUser?.FacilityPhysicianPhoneNo,
      Fax: this.props.authenticatedUser?.Fax,
      NPINo: this.props.authenticatedUser?.NPINo,
      LoginUserId: this.props.authenticatedUser?.UserId,
      UserKey: '',
      LanguageId: this.state.inputs['language'].value,

    };
    userPayload.DecryptColumns = [];

    this.props.updateFacilityUserDetail(userPayload);
    this.setState({ scaleAnimationDialogAlert: false });
    this.props.updateLanguage(this.state.currentLocale);

  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  _ClosePopup() {
    this.setState({ scaleAnimationDialogAlert: false });
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

  render() {
    const { FirstName, LastName } = this.props.authenticatedUser;
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
          HeaderTitle={this.state.AlertHeader}
          HeadTitleColor="#FFFFFF"
          SingleButtonText={this.props.selectedMessage['Register-Close']}
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
          <CustomPopUpDailog
            onHardwareBackPress={() => {
              this.setState({ scaleAnimationDialogAlert: false });
              return true;
            }}
            scaleAnimationDialogAlert={this.state.scaleAnimationDialogAlert}
            PopUpContainerStyle={{ backgroundColor: Colors.facilityColor }}
            HeaderTitle={
              this.props.selectedMessage['EditFacProfile-SaveChanges']
            }
            HeadTitleColor="#FFFFFF"
            MessageColor="#FFFFFF"
            leftbuttonbordercolor="#FFFFFF"
            leftbuttontextcolor="#FFFFFF"
            rightbuttontextcolor={Colors.facilityColor}
            Rightbuttonbackgroundcolor="#FFFFFF"
            AlertMessageTitle={
              this.props.selectedMessage['EditFacProfile-Confirm']
            }
            _onLeftButtonPress={this._ClosePopup.bind(this)}
            _onRightButtonPress={this._onLeftPressButton.bind(this)}
            LeftButtonText={this.props.selectedMessage['FacProfile-Cancel']}
            RightButtonText={this.props.selectedMessage['FacProfile-Confirm']}
          />

          <CustomHeaderNew
            HeaderColor={{ backgroundColor: 'white' }}
            textcolorHeader={Colors.facilityColor}
            onPressBackButton={() => {
              NavigationService.popScreen();
            }}
            HeaderTitle={FirstName + ' ' + LastName}
            LeftImage={Images.GreenBackIcon}
            buttonCircleColor={'transparent'}
            textTransform="capitalize"
          />
          <ScrollView
            contentContainerStyle={{
              backgroundColor: 'white',
              width: '100%',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text style={[Helpers.BoldTexttitle, { marginTop: 10 }]}>
              {' '}
              {this.props.selectedMessage['EditFacProfile-EditProfile']}
            </Text>

            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer,
                { backgroundColor: '#E5E9F2' },
                this.renderError('facilityName')
                  ? { borderColor: Colors.error }
                  : {},
                { marginTop: 0, width: '100%' },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={
                this.props.selectedMessage['AddFacility-FacilityName']
              }
              onChangeText={(value) =>
                this.onInputChange({ id: 'facilityName', value })
              }
              value={this.state.inputs.facilityName.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={25}
              editable={false}
              rightIcon={
                this.state.inputs['facilityName'].touched
                  ? this.renderError('facilityName')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }
            />
            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer, ,
                this.renderError('firstName')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.facilityColor },
                { marginTop: 0, width: '100%' },
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
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={25}
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
                Helpers.RectangletxtInputContainer, ,
                this.renderError('lastName') ? { borderColor: Colors.error } : { borderColor: Colors.facilityColor },
                { marginTop: 0, width: '100%' },
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
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={25}
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
                Helpers.RectangletxtInputContainer,
                { backgroundColor: '#E5E9F2' },
                this.renderError('emailId') ? { borderColor: Colors.error } : { borderColor: Colors.facilityColor },
                { marginTop: 0, width: '100%' },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={this.props.selectedMessage['AccountLogin-Email']}
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

            <CustomDDLPopUp
              ddlContainerStyle={[
                Helpers.buttonContainer,
                Metrics.smallVerticalMargin,
                { borderRadius: 9 },
                { backgroundColor: 'transparent', borderWidth: 0.8 },
                this.renderError('language')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.facilityColor },
              ]}
              // add Condition
              ddlLableStyle={[
                { width: '70%', paddingLeft: 16 },
                { color: Colors.facilityColor },
              ]}
              ddlIconContainerStyle={[{ width: '30%' }]}
              ddlIconStyle={[Helpers.rightIconStyle]}
              popUpListItemTextStyle={[
                Helpers.popUpListItemTextStyle,
                ,
                { color: Colors.facilityColor },
              ]}
              popUpListItemStyle={[Helpers.popUpListItemStyle]}
              popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
              popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
              popUpTitleStyle={[
                Helpers.popUpTitleStyle,
                { backgroundColor: Colors.facilityColor },
              ]}
              popUpTitleAlign={'left'}
              popUpTitleText={
                this.props.selectedMessage['LanguageScreen-LanguageSelection']
              }
              IspatientLogin={true}
              popUpListSrc={this.state.LanguageList}
              popUpIsSelected={this.state.popUpIsSelected}
              popUpSelectedValue={this.state.selectedValue}
              popUpSelectedLable={'Language:' + this.state.SelectedLable}
              popUpKey={'LanguageId'}
              popUpListItemOnChange={this.popUpListItemOnChange.bind(this)}
              leftIcon={
                this.state.selectedValue ? Images.DDLGreen : Images.DDLGreen
              }></CustomDDLPopUp>

            <View style={{ height: 25 }}></View>
          </ScrollView>

          <View style={[Helpers.bottomView, { position: 'relative', marginBottom: '6.5%' }]}>
            <TouchableOpacity
              style={[
                Helpers.btn,
                {
                  backgroundColor: !this.isFormValid() ? '#C2CEDB' : '#28998D',
                  width: '90%',
                },
              ]}
              onPress={
                !this.isFormValid()
                  ? null
                  : this._onSaveChangesPressButton.bind(this)
              }
            >
              <Text
                style={[
                  Helpers.btnText,
                  Helpers.mediumFont,
                  { color: Colors.white, fontSize: 18 },
                ]}>
                {this.props.selectedMessage['EditFacProfile-SaveChanges']}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

FacilityeditProfilescreen.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,

  updateFacilityUserDetail: PropTypes.func,
  resetUpdateFacilityUserDetail: PropTypes.func,
  updateFacilityUserDetailErroressage: PropTypes.string,
  updateFacilityUserDetailSuccessMessage: PropTypes.string,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
  updateLanguage: PropTypes.func,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  updateFacilityUserDetailErroressage:
    state.authenticate.updateFacilityUserDetailErroressage,
  updateFacilityUserDetailSuccessMessage:
    state.authenticate.updateFacilityUserDetailSuccessMessage,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) =>
    dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
  updateFacilityUserDetail: (data) =>
    dispatch(AuthenticateActions.updateFacilityUserDetail(data)),
  resetUpdateFacilityUserDetail: () =>
    dispatch(AuthenticateActions.resetUpdateFacilityUserDetail()),
  updateLanguage: (data) => dispatch(StartupActions.updateLanguage(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityeditProfilescreen);
