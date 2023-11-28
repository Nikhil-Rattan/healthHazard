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
  Helpers,
  Colors,
  Images,
  Metrics,
} from 'App/Theme';

import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';
import { ValidationService } from 'App/Services/ValidationService';
import { ExtractCityState } from 'App/Stores/Authentication/Selectors';
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import NavigationService from 'App/Services/NavigationService';
import { TextInputMask } from 'react-native-masked-text';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import CustomHeaderNew from 'App/Components/CustomHeaderNew';

class ManageFacilityProfile extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      Message: '',
      IsSuccess: false,
      AlertHeader: '',

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
        physicianName: {
          type: 'generic',
          value: '',
        },
        physicianPhoneNumber: {
          type: 'phone',
          value: '',
        },
        npi: {
          type: 'npi',
          value: '',
        },
      },
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
    this.formToched = ValidationService.isFormToched.bind(this);
    this.isFormValid = ValidationService.isFormValid.bind(this);
    this.loadFacilityDetail = this.loadFacilityDetail.bind(this);
  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
  }
  componentDidMount() {
    this.props.resetUpdateFacilityUserDetail();
    this.props.resetStateCity();
    this.loadFacilityDetail();
  }

  loadFacilityDetail() {

    const {
      FacilityName,
      FacilityPhoneNo,
      ZipCode,
      State,
      CityId,
      CityName,
      PhysicianName,
      Address,
      FacilityPhysicianPhoneNo,
      NPINo,
    } = this.props.authenticatedUser;
    const { inputs } = this.state;
    const updatedFacilityNameInput = {
      ...inputs['facilityName'],
      value: FacilityName,
    };
    // location
    const updatedPhoneInput = {
      ...inputs['phoneNumber'],
      value: FacilityPhoneNo,
    };
    const updatedZipCodeInput = { ...inputs['zipCode'], value: ZipCode };
    const updatedStateInput = { ...inputs['state'], value: State };
    const updatedCityInput = { ...inputs['city'], value: CityId };
    const updatedAddressInput = { ...inputs['address'], value: Address };

    // Primary contant
    const updatedPhysicianNameInput = {
      ...inputs['physicianName'],
      value: PhysicianName,
    };
    const updatedPhysicianPhoneNoInput = {
      ...inputs['physicianPhoneNumber'],
      value: FacilityPhysicianPhoneNo,
    };
    const updatedPhysicianNPIInput = { ...inputs['npi'], value: NPINo };

    let input = {
      ...inputs,
      facilityName: updatedFacilityNameInput,
      phoneNumber: updatedPhoneInput,
      zipCode: updatedZipCodeInput,
      state: updatedStateInput,
      city: updatedCityInput,
      address: updatedAddressInput,
      physicianName: updatedPhysicianNameInput,
      physicianPhoneNumber: updatedPhysicianPhoneNoInput,
      npi: updatedPhysicianNPIInput,
    };

    this.setState({
      inputs: input,
      selectedStateValue: State,
      statePopUpIsSelected: false,
      selectedStateLable: State,

      selectedCityValue: CityId,
      cityPopUpIsSelected: false,
      selectedCityLable: CityName,
    });

    this.props.getCityStateByZipCode({ zipCode: ZipCode });
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
        } else if (!cityBySateName.some(el => el.value === this.state.inputs.city.value)) {
          // if(!cityBySateName.some(el => el.value === this.state.inputs.city.value))
          this.onInputChange({ id: 'city', value: '' });
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
        this.props.authenticatedUser.FacilityName;
      this.setState({
        IsMessageShow: true,
        Message: Message,
        IsSuccess: true,
        AlertHeader: this.props.selectedMessage['EditFacProfile-SaveChanges'],
      });
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
    this.onInputChange({ id: 'state', value: '' });
    if (!this.renderError('zipCode')) {
      this.props.getCityStateByZipCode({ zipCode: event.nativeEvent.text });
    }
  }

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
    } else {
      this.setState({
        selectedCityValue: null,
        cityPopUpIsSelected: false,
        selectedCityLable: this.props.selectedMessage[
          'AddFacility-SelectCity'
        ],
      });
      setTimeout(() => {
        this.onInputChange({ id: 'city', value: "" });
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

  renderPrfile() {
    console.log(this.isFormValid());
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: 'relative',
            top: 0,
            backgroundColor: 'white',
            height: 70,
          }}>
          <CustomHeaderNew
            HeaderColor={{ backgroundColor: 'white' }}
            textcolorHeader={Colors.facilityColor}
            onPressBackButton={() => {
              NavigationService.popScreen();
            }}
            HeaderTitle={
              this.props.selectedMessage['EditFacProfile-EditProfile']
            }
            LeftImage={Images.GreenBackIcon}
            buttonCircleColor={'transparent'}
          />
        </View>
        <ScrollView overScrollMode="auto" showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text style={[Helpers.BoldTexttitle]}>
              {this.props.selectedMessage['FacilityMenu-FacilityInformation']}
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
              inputLabl={''}
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

            {/* Location Detail */}
            <View style={{ width: '100%', marginVertical: 15 }}>
              <Text style={[Helpers.BoldTexttitle]}>
                {this.props.selectedMessage['EditFacProfile-LocationDetails']}
              </Text>

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
                inputLabl={''}
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
                inputLabl={''}
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
                  { marginTop: '5.2%', },
                  this.renderError('phoneNumber')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor },
                ]}>
                <TextInputMask
                  placeholder={
                    this.props.selectedMessage[
                    'AddFacility-FacilityPhoneNumber'
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

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginTop: '2%'
                }}>
                <View style={{ width: '45%' }}>
                  <CustomDDLPopUp
                    // add Condition
                    ddlContainerStyle={[
                      Helpers.buttonContainer,
                      Metrics.smallVerticalMargin,
                      { borderRadius: 8 },
                      { backgroundColor: 'transparent', borderWidth: 0.8 },
                      this.renderError('state')
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
                        ? Images.DDLWhite
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
                    ddlContainerStyle={[
                      Helpers.buttonContainer,
                      Metrics.smallVerticalMargin,
                      { borderRadius: 8 },
                      { backgroundColor: 'transparent', borderWidth: 0.8 },
                      this.renderError('city')
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
                        ? Images.DDLWhite
                        : Images.DDLGreen
                    }
                    openPopUp={this.state.cityList.length > 0}></CustomDDLPopUp>
                </View>
              </View>
            </View>

            {/* Primary Contact */}
            <View style={{ width: '100%' }}>
              <Text style={[Helpers.BoldTexttitle,]}>
                {this.props.selectedMessage['FacilityMenu-PrimaryContactView']}
              </Text>

              <CustomInputBox
                containerStyle={[
                  Helpers.txtRoundInputContainer, { marginBottom: '5%' },
                  this.renderError('physicianName')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor },
                ]}
                inputBoxstyle={[
                  Helpers.txtRoundInputs,
                  Helpers.fill,
                  { color: Colors.facilityColor },
                ]}
                placeholder={
                  this.props.selectedMessage['AddOnsitePhysician-PhysicianName']
                }
                placeholderTextColor={Colors.placeholderGraycolor}
                onChangeText={(value) =>
                  this.onInputChange({ id: 'physicianName', value })
                }
                value={this.state.inputs.physicianName.value}
                inputLabl={''}
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
                  this.state.inputs['physicianName'].touched
                    ? this.renderError('physicianName')
                      ? Images.InValid
                      : Images.ValidGreen
                    : null
                }
              />

              <View
                style={[
                  Helpers.txtRoundInputContainer,
                  { marginTop: 5, },
                  this.renderError('physicianPhoneNumber')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor },
                ]}>
                <TextInputMask
                  placeholder={
                    this.props.selectedMessage['AddOnsitePhysician-PhoneNumber']
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
                  value={this.state.inputs.physicianPhoneNumber.value}
                  onChangeText={(value) =>
                    this.onInputChange({ id: 'physicianPhoneNumber', value })
                  }
                />

                {this.state.inputs['physicianPhoneNumber'].touched ? (
                  this.renderError('physicianPhoneNumber') ? (
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

              <CustomInputBox
                containerStyle={[
                  Helpers.txtRoundInputContainer, { marginBottom: '8%' },
                  { backgroundColor: '#E5E9F2' },
                  this.renderError('npi')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor },
                ]}
                inputBoxstyle={[
                  Helpers.txtRoundInputs,
                  Helpers.fill,
                  { color: Colors.facilityColor },
                ]}
                placeholder={'NPI #'}
                placeholderTextColor={Colors.placeholderGraycolor}
                onChangeText={(value) => this.onInputChange({ id: 'npi', value })}
                value={'NPI #' + this.state.inputs.npi.value}
                inputLabl={''}
                componentStyle={[Helpers.column, Helpers.crossStart]}
                rightIconStyle={[Helpers.rightIconStyle]}
                inputBoxLableStyle={[
                  Helpers.inputBoxLable,
                  { color: Colors.facilityColor },
                ]}
                hasEvent={false}
                maxLength={30}
                keyboardType="phone-pad"
                returnKeyType="done"
                hasRightIcon={true}
                editable={false}
                OnFocus={this._HideBottom.bind(this)}
                rightIcon={
                  this.state.inputs['npi'].touched
                    ? this.renderError('npi')
                      ? Images.InValid
                      : Images.ValidGreen
                    : null
                }
              />
            </View>
          </View>
        </ScrollView>

        <View style={[Helpers.bottomView, { position: 'relative' }]}>
          <TouchableOpacity
            style={[
              Helpers.btn,
              {
                backgroundColor: !this.isFormValid() ? '#C2CEDB' : '#28998D',
                width: '90%',
              },
            ]}
            onPress={
              !this.isFormValid() ? null : this._onSignUpPressButton.bind(this)
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
      </View>
    );
  }

  _onBackButtonPress() {
    NavigationService.popScreen();
  }

  _CloseAlert() {
    let { IsSuccess } = this.state;
    this.setState({ IsMessageShow: false });
    if (IsSuccess) {
      NavigationService.popScreen();
    }
  }

  _onSignUpPressButton() {
    const firstInvalidCoordinate = this.getFormValidation();
    if (firstInvalidCoordinate != null) {
      return;
    }

    const userPayload = {
      FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
      FirstName: this.props.authenticatedUser?.FirstName,
      LastName: this.props.authenticatedUser?.LastName,
      FacilityName: this.state.inputs['facilityName'].value.trim(),
      ContactName: this.props.authenticatedUser?.ContactName,
      PhysicianName: this.state.inputs['physicianName'].value.trim(),
      Email: this.props.authenticatedUser?.FacilityEmail,
      DOB: null,
      Address: this.state.inputs['address'].value.trim(),
      WebsiteURL: this.props.authenticatedUser?.WebsiteURL,
      CityId: this.state.inputs['city'].value,
      State: this.state.inputs['state'].value.trim(),
      ZipCode: this.state.inputs['zipCode'].value.trim(),
      PhoneNo: this.props.authenticatedUser?.FacilityUserPhoneNo,
      FacilityPhone: this.state.inputs['phoneNumber'].value
        .replace(/\s/g, '')
        .replace(/-/g, '')
        .replace(/\(|\)/g, ''),
      PhysicianPhoneNo: this.state.inputs['physicianPhoneNumber'].value
        .replace(/\s/g, '')
        .replace(/-/g, '')
        .replace(/\(|\)/g, ''),
      Fax: this.props.authenticatedUser?.Fax,
      NPINo: this.state.inputs['npi'].value,
      LoginUserId: this.props.authenticatedUser?.UserId,
      UserKey: '',
    };
    userPayload.DecryptColumns = [];

    this.props.updateFacilityUserDetail(userPayload);
  }
  _HideBottom() {
  }

  render() {
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

ManageFacilityProfile.propTypes = {
  authenticatedIsLoading: PropTypes.bool,
  cityStateByZipCodeErrorMessage: PropTypes.string,
  cityStateByZipCodeResponse: PropTypes.any,
  getCityStateByZipCode: PropTypes.func,
  extractedCityState: PropTypes.any,
  saveBuildProfilePayload: PropTypes.func,
  buildProfilePayload: PropTypes.any,
  resetStateCity: PropTypes.func,
  selectedMessage: PropTypes.any,
  authenticatedUser: PropTypes.any,
  updateFacilityUserDetailErroressage: PropTypes.string,
  updateFacilityUserDetailSuccessMessage: PropTypes.string,
  updateFacilityUserDetail: PropTypes.func,
  resetUpdateFacilityUserDetail: PropTypes.func,
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
  authenticatedUser: state.authenticate.authenticatedUser,
  updateFacilityUserDetailErroressage:
    state.authenticate.updateFacilityUserDetailErroressage,
  updateFacilityUserDetailSuccessMessage:
    state.authenticate.updateFacilityUserDetailSuccessMessage,
});
// getting methods from actions
// 'AuthenticateActions' we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  saveRegistration: (data) =>
    dispatch(AuthenticateActions.saveRegistration(data)),
  getCityStateByZipCode: (data) =>
    dispatch(AuthenticateActions.getCityStateByZipCode(data)),

  resetStateCity: () => dispatch(AuthenticateActions.resetStateCity()),

  updateFacilityUserDetail: (data) =>
    dispatch(AuthenticateActions.updateFacilityUserDetail(data)),
  resetUpdateFacilityUserDetail: () =>
    dispatch(AuthenticateActions.resetUpdateFacilityUserDetail()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageFacilityProfile);
