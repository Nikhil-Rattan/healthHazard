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
import { Helpers, Colors, Images, Metrics } from 'App/Theme';
import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';
import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import { ExtractCityState } from 'App/Stores/Authentication/Selectors';
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import NavigationService from 'App/Services/NavigationService';
import { TextInputMask } from 'react-native-masked-text';

class FacilityProfile extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedStateValue: null,
      statePopUpIsSelected: false,
      selectedStateLable: this.props.selectedMessage['AddFacility-SelectState'],

      selectedCityValue: null,
      cityPopUpIsSelected: false,
      selectedCityLable: this.props.selectedMessage['AddFacility-SelectCity'],

      selectedFacilityTypeValue: null,
      facilityTypePopUpIsSelected: false,
      selectedFacilityTypeLable: this.props.selectedMessage[
        'AddFacility-SelectFacility'
      ],

      cityList: [],
      inputs: {
        facilityName: {
          type: 'generic',
          value: '',
        },
        contactName: {
          type: 'contactName',
          value: '',
        },
        address: {
          type: 'generic',
          value: '',
        },
        city: {
          type: 'cities',
          value: '',
        },
        phoneNumber: {
          type: 'phone',
          value: '',
        },
        state: {
          type: 'generic',
          value: '',
        },
        zipCode: {
          type: 'zipcode',
          value: '',
        },
        facilityType: {
          type: 'generic',
          value: '',
        },
      },
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  componentDidMount() {
    this.props.resetStateCity();
    this.props.getFacilityType();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.extractedCityState?.stateList.length == 1) {
      if (
        prevProps?.extractedCityState.stateList.length == 0 &&
        this.props?.extractedCityState?.stateList.length == 1
      ) {
        this.setState({
          selectedStateValue: this.props.extractedCityState?.stateList[0].value,
          statePopUpIsSelected: false,
          selectedStateLable: this.props.extractedCityState?.stateList[0].Name,
        });
        let stateValue = this.props.extractedCityState?.stateList[0].value;

        setTimeout(() => {
          this.onInputChange({ id: 'state', value: stateValue });
        }, 500);

        let cities = this.props.extractedCityState
          ? this.props.extractedCityState.cityList
          : [];

        let cityBySateName = cities.filter((data) => {
          return data.stateName === stateValue;
        });

        if (cityBySateName.length == 1) {
          this.setState({
            selectedCityValue: cityBySateName[0].value,
            cityPopUpIsSelected: false,
            selectedCityLable: cityBySateName[0].Name,
          });
          let value = cityBySateName[0].value;
          this.onInputChange({ id: 'city', value });
        }

        this.setState({
          cityList: cityBySateName,
        });
      } else if (
        prevProps?.extractedCityState?.stateList.length == 1 &&
        this.props?.extractedCityState?.stateList.length == 1 &&
        prevProps?.extractedCityState?.stateList[0].value !=
        this.props.extractedCityState?.stateList[0].value
      ) {
        this.setState({
          selectedStateValue: this.props.extractedCityState?.stateList[0].value,
          statePopUpIsSelected: false,
          selectedStateLable: this.props.extractedCityState?.stateList[0].Name,
        });
        let stateSelectedValue = this.props.extractedCityState?.stateList[0]
          .value;

        setTimeout(() => {
          this.onInputChange({ id: 'state', value: stateSelectedValue });
        }, 500);

        let cities = this.props.extractedCityState
          ? this.props.extractedCityState.cityList
          : [];

        let cityBySateName = cities.filter((data) => {
          return data.stateName === stateSelectedValue;
        });

        if (cityBySateName.length == 1) {
          this.setState({
            selectedCityValue: cityBySateName[0].value,
            cityPopUpIsSelected: false,
            selectedCityLable: cityBySateName[0].Name,
          });

          this.onInputChange({ id: 'city', value: cityBySateName[0].value });
        }
        this.setState({
          cityList: cityBySateName,
        });
      }
    }
  }
  resetCityStateValue() {
    var inputs = this.state.inputs;
    inputs.state.value = inputs.city.value = ''
    this.onInputChange({ id: 'state', value: '' })
    this.onInputChange({ id: 'city', value: '' })
    this.setState({
      inputs: inputs,
      selectedStateValue: null,
      statePopUpIsSelected: false,
      selectedStateLable: this.props.selectedMessage['AddFacility-SelectState'],
      selectedCityValue: null,
      cityPopUpIsSelected: false,
      selectedCityLable: this.props.selectedMessage['AddFacility-SelectCity'],
      cityList: [],
    });

  }

  _onPressButton() { }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  popUpListItemOnChange = (selectedValue) => {
    let { popUpIsSelected } = this.state;
    this.setState({
      selectedValue: selectedValue.id,
      SelectedLable: selectedValue.name,
      popUpIsSelected: false,
    });
  };

  _onZipCodeInputBlur(event) {
    this.props.resetStateCity();

    this.resetCityStateValue();
    if (!this.renderError('zipCode')) {
      this.props.getCityStateByZipCode({ zipCode: event.nativeEvent.text });
    }
  }

  popUpFacilityTypeListItemOnChange = (selectedValue) => {
    this.onInputChange({
      id: 'facilityType',
      value: selectedValue.FacilityTypeId,
    });

    this.setState({
      selectedFacilityTypeValue: selectedValue.FacilityTypeId,
      facilityTypePopUpIsSelected: false,
      selectedFacilityTypeLable: selectedValue[this.props.locale],
    });
  };

  popUpStateListItemOnChange = (selectedStateValue) => {

    let value = '';
    this.onInputChange({ id: 'city', value });
    value = selectedStateValue.value;
    this.onInputChange({ id: 'state', value });

    let cities = this.props.extractedCityState
      ? this.props.extractedCityState.cityList
      : [];

    let cityBySateName = cities.filter((data) => {
      return data.stateName === value;
    });
    this.setState({
      cityList: cityBySateName,
      selectedStateValue: selectedStateValue.value,
      selectedStateLable: selectedStateValue.Name,
      statePopUpIsSelected: false,
    });

    if (cityBySateName.length == 1) {
      this.setState({
        selectedCityValue: cityBySateName[0].value,
        cityPopUpIsSelected: false,
        selectedCityLable: cityBySateName[0].Name,
      });

      setTimeout(() => {
        this.onInputChange({ id: 'city', value: cityBySateName[0].value });
      }, 500);
    }
  };

  popUpCityListItemOnChange = (selectedCityValue) => {
    let value = selectedCityValue.value;
    this.onInputChange({ id: 'city', value });
    this.setState({
      selectedCityValue: selectedCityValue.value,
      selectedCityLable: selectedCityValue.label,
      cityPopUpIsSelected: false,
    });
  };
  _goBackscreen() {
    NavigationService.popScreen();
  }
  renderPrfile() {
    return (
      <View style={{ flex: 1 }}>
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
            onPress={this._goBackscreen.bind(this)}>
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
          <HeaderProgress
            rowStyle={[
              ,
              {
                height: 70,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              },
            ]}
            progressStyle={[Helpers.headerLeftRow]}
            progressCount={75}
            rightColor={Colors.facilityColor}
            leftColor={'#FBFBFB'}
          />

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text
              style={[Helpers.BoldTexttitle, Helpers.bold, { marginBottom: 15 }]}>
              {
                this.props.selectedMessage[
                'PateintQrCodeResultScreen-CreateANewFacility'
                ]
              }
            </Text>

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, ,
                this.renderError('facilityName')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.facilityColor },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={
                this.props.selectedMessage['AddFacility-FacilityName']
              }
              placeholderTextColor={Colors.placeholderGraycolor}
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
              maxLength={20}
              hasRightIcon={true}
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
                Helpers.txtRoundInputContainer, ,
                this.renderError('contactName')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.facilityColor },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={
                this.props.selectedMessage['AddFacility-FacilityContactName']
              }
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) =>
                this.onInputChange({ id: 'contactName', value })
              }
              value={this.state.inputs.contactName.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              maxLength={20}
              hasRightIcon={true}
              rightIcon={
                this.state.inputs['contactName'].touched
                  ? this.renderError('contactName')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }
            />

            <CustomDDLPopUp
              // add Condition
              ddlContainerStyle={[
                Helpers.buttonContainer,
                Metrics.smallVerticalMargin,
                { borderRadius: 9 },
                { backgroundColor: 'transparent', borderWidth: 0.8 },
                this.renderError('facilityType')
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
                this.props.selectedMessage['AddFacility-SelectFacility'] + ' *'
              }
              IspatientLogin={true}
              popUpListSrc={this.props.facilityTypeList}
              popUpIsSelected={this.state.facilityTypePopUpIsSelected}
              popUpSelectedValue={this.state.selectedFacilityTypeValue}
              popUpSelectedLable={this.state.selectedFacilityTypeLable}
              popUpKey={'FacilityTypeId'}
              popUpListItemOnChange={this.popUpFacilityTypeListItemOnChange.bind(
                this,
              )}
              leftIcon={
                this.state.selectedFacilityTypeValue
                  ? Images.DDLGreen
                  : Images.DDLGreen
              }
              ddlListText={this.props.locale}></CustomDDLPopUp>

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, ,
                this.renderError('address')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.facilityColor },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={
                this.props.selectedMessage['AddFacility-FacilityAddress']
              }
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) =>
                this.onInputChange({ id: 'address', value })
              }
              value={this.state.inputs.address.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              maxLength={100}
              hasRightIcon={true}
              rightIcon={
                this.state.inputs['address'].touched
                  ? this.renderError('address')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }
            />

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, ,
                this.renderError('zipCode')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.facilityColor },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                { color: Colors.facilityColor },
              ]}
              placeholder={this.props.selectedMessage['AddFacility-ZipCode']}
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) => {
                this.resetCityStateValue();
                this.onInputChange({ id: 'zipCode', value })
              }}
              onEndEditing={this._onZipCodeInputBlur.bind(this)}
              value={this.state.inputs.zipCode.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              rightIconStyle={[Helpers.rightIconStyle]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={7}
              rightIcon={
                this.state.inputs['zipCode'].touched
                  ? this.renderError('zipCode')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }></CustomInputBox>

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
                  this.props.selectedMessage['AddFacility-FacilityPhoneNumber']
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
                    style={[Helpers.rightIconStyle, { marginBottom: '5.5%' }]}
                    resizeMode="contain"
                    source={Images.InValid}
                  />
                ) : (
                  <Image
                    style={[Helpers.rightIconStyle, { marginBottom: '5.5%' }]}
                    resizeMode="contain"
                    source={Images.ValidGreen}
                  />
                )
              ) : null}
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View style={{ width: '45%' }}>
                <CustomDDLPopUp
                  // add Condition
                  ddlContainerStyle={[Helpers.buttonContainer, Metrics.smallVerticalMargin, { borderRadius: 9 }, { backgroundColor: 'transparent', borderWidth: 0.8 },
                  this.state.inputs['state'].touched
                    ? this.state.selectedStateValue != null && !this.renderError('state')
                      ? { borderColor: Colors.facilityColor } :
                      { borderColor: Colors.error } :
                    { borderColor: Colors.facilityColor }
                  ]}
                  // add Condition
                  ddlLableStyle={[{ width: '70%', paddingLeft: 16, },
                  this.state.inputs['state'].touched && !this.renderError("state") && this.state.selectedStateValue != null ?
                    { color: Colors.facilityColor } :
                    { color: Colors.GreyColor }
                  ]}
                  ddlIconContainerStyle={[{ width: '30%' }]}
                  ddlIconStyle={[Helpers.rightIconStyle]}
                  popUpListItemTextStyle={[
                    Helpers.popUpListItemTextStyle,
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
                    this.props.selectedMessage['RegisterProfile-State'] + ' *'
                  }
                  IspatientLogin={true}
                  popUpListSrc={
                    this.props.extractedCityState
                      ? this.props.extractedCityState.stateList
                      : []
                  }
                  popUpIsSelected={this.state.statePopUpIsSelected}
                  popUpSelectedValue={this.state.selectedStateValue}
                  popUpSelectedLable={this.state.selectedStateLable}
                  popUpKey={'value'}
                  popUpListItemOnChange={this.popUpStateListItemOnChange.bind(
                    this,
                  )}
                  leftIcon={
                    this.state.selectedStateValue
                      ? Images.DDLGreen
                      : Images.DDLGreen
                  }
                  openPopUp={
                    this.props.extractedCityState
                      ? this.props.extractedCityState.stateList.length > 0
                      : false
                  }></CustomDDLPopUp>
              </View>
              <View style={{ width: '45%', backgroundColor: 'transparent' }}>
                <CustomDDLPopUp
                  // add Condition
                  ddlContainerStyle={[Helpers.buttonContainer, Metrics.smallVerticalMargin, { borderRadius: 9 }, { backgroundColor: 'transparent', borderWidth: 0.8 },
                  this.state.inputs['city'].touched
                    ? this.state.selectedCityValue != null && !this.renderError('city')
                      ? { borderColor: Colors.facilityColor } :
                      { borderColor: Colors.error } :
                    { borderColor: Colors.facilityColor }
                  ]}
                  // add Condition
                  ddlLableStyle={[{ width: '70%', paddingLeft: 16, },
                  this.state.inputs['city'].touched && !this.renderError("city") && this.state.selectedCityValue != null
                    ? { color: Colors.facilityColor } :
                    { color: Colors.GreyColor }
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
                    this.props.selectedMessage['RegisterProfile-City'] + ' *'
                  }
                  IspatientLogin={true}
                  popUpListSrc={this.state.cityList}
                  popUpIsSelected={this.state.cityPopUpIsSelected}
                  popUpSelectedValue={this.state.selectedCityValue}
                  popUpSelectedLable={this.state.selectedCityLable}
                  popUpKey={'value'}
                  popUpListItemOnChange={this.popUpCityListItemOnChange.bind(
                    this,
                  )}
                  leftIcon={
                    this.state.selectedCityValue
                      ? Images.DDLGreen
                      : Images.DDLGreen
                  }
                  openPopUp={this.state.cityList.length > 0}></CustomDDLPopUp>
              </View>
              {this.state.IsButtomTrue ? (
                <View style={{ height: 300 }}></View>
              ) : null}
            </View>
          </View>
          <View style={{ height: 100 }}></View>
        </ScrollView>

        <View style={[Helpers.bottomView, { position: 'relative' }]}>
          <View style={[Helpers.btnContainer, { bottom: 0 }]}>
            <TouchableOpacity
              style={[
                Helpers.btn,
                {
                  backgroundColor:
                    (this.state.inputs.address.value &&
                      this.state.inputs.city.value &&
                      this.state.inputs.contactName.value &&
                      this.state.inputs.facilityName.value &&
                      this.state.inputs.facilityType.value &&
                      this.state.inputs.phoneNumber.value &&
                      this.state.inputs.state.value &&
                      this.state.inputs.zipCode.value) == ''
                      ? Colors.DisableGrayColor
                      : Colors.facilityColor,
                  width: '95%',
                },
              ]}
              onPress={
                (this.state.inputs.address.value &&
                  this.state.inputs.city.value &&
                  this.state.inputs.contactName.value &&
                  this.state.inputs.facilityName.value &&
                  this.state.inputs.facilityType.value &&
                  this.state.inputs.phoneNumber.value &&
                  this.state.inputs.state.value &&
                  this.state.inputs.zipCode.value) == ''
                  ? null
                  : this._onSignUpPressButton.bind(this)
              }>
              <Text
                style={[Helpers.btnText, { color: Colors.white, fontSize: 17 }]}>
                {this.props.selectedMessage['InstructionSecondScreen-GoToStep']}{' '}
                3
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _onBackButtonPress() {
    NavigationService.popScreen();
  }

  _onSignUpPressButton() {
    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      return;
    }

    const { inputs } = this.state;

    let { buildProfilePayload } = this.props;
    let phoneNumber = inputs['phoneNumber'].value
      .replace(/\s/g, '')
      .replace(/-/g, '')
      .replace(/\(|\)/g, '');
    let payload = {
      ...buildProfilePayload,
      FacilityName: inputs['facilityName'].value.trim(),
      ContactName: inputs['contactName'].value.trim(),
      Address: inputs['address'].value.trim(),
      CityId: inputs['city'].value,
      State: inputs['state'].value,
      ZipCode: inputs['zipCode'].value,
      FacilityPhone: phoneNumber,
      UserRoleId: Enums.Facility,
      FacilityTypeId: inputs['facilityType'].value,
      DecryptColumns: ['Password'],
    };
    this.props.saveBuildProfilePayload(payload);
    NavigationService.navigate('FacilityPhysicianProfile');
  }
  _HideBottom() {

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={40}
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

FacilityProfile.propTypes = {
  authenticatedIsLoading: PropTypes.bool,
  cityStateByZipCodeErrorMessage: PropTypes.string,
  cityStateByZipCodeResponse: PropTypes.any,
  getCityStateByZipCode: PropTypes.func,
  extractedCityState: PropTypes.any,
  saveBuildProfilePayload: PropTypes.func,
  buildProfilePayload: PropTypes.any,
  resetStateCity: PropTypes.func,
  selectedMessage: PropTypes.any,
  getFacilityType: PropTypes.func,
  facilityTypeList: PropTypes.any,
  locale: PropTypes.any,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,

  cityStateByZipCodeResponse: state.authenticate.cityStateByZipCodeResponse,
  extractedCityState: ExtractCityState(
    state.authenticate.cityStateByZipCodeResponse,
  ),
  buildProfilePayload: state.authenticate.buildProfilePayload,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
  facilityTypeList: state.authenticate.facilityTypeList,
});
// getting methods from actions
// 'AuthenticateActions' we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  saveRegistration: (data) =>
    dispatch(AuthenticateActions.saveRegistration(data)),
  getCityStateByZipCode: (data) =>
    dispatch(AuthenticateActions.getCityStateByZipCode(data)),
  saveBuildProfilePayload: (data) =>
    dispatch(AuthenticateActions.saveBuildProfilePayload(data)),
  resetStateCity: () => dispatch(AuthenticateActions.resetStateCity()),
  getFacilityType: () => dispatch(AuthenticateActions.getFacilityType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacilityProfile);
