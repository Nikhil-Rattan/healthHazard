import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Alert,
  SearchBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import { KeyboardAvoidingView } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Helpers,
  ApplicationStyles,
} from 'App/Theme';
import CustomInputBox from 'App/Components/CustomInputBox';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { ExtractCityState } from 'App/Stores/Authentication/Selectors';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import ListCard from 'App/Components/ListCard';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import CustomSearchTextbox from 'App/Components/CustomSearchTextbox';
import { Enums } from 'App/Enums';
import { ValidationService } from 'App/Services/ValidationService';

import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import PatientProfileActions from 'App/Stores/PatientProfile/Actions';
import OrderActions from 'App/Stores/Order/Actions';
import { TextInputMask } from 'react-native-masked-text';
//import stripe from 'App/NativeLib/StripePaymentModule';
import { Config } from 'App/Config';
class EditShipping extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      statePicked: this.props.selectedMessage['RegisterProfile-SelectState'],
      cityPicked: this.props.selectedMessage['RegisterProfile-SelectCity'],
      cityList: [],
      selectedStateValue: null,
      statePopUpIsSelected: false,
      selectedStateLable: this.props.selectedMessage[
        'RegisterProfile-SelectState'
      ],

      selectedCityValue: null,
      cityPopUpIsSelected: false,
      selectedCityLable: this.props.selectedMessage[
        'RegisterProfile-SelectCity'
      ],
      inputs: {
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
      },
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
    this.isFormValid = ValidationService.isFormValid.bind(this);
  }

  componentWillUnmount() {
    this.props.resetStateCity();
  }

  componentDidMount() {
    this.props.resetStateCity();
    this.props.resetEditShippingAddress();

    const { patientAddresses } = this.props;
    const { inputs } = this.state;

    // Home Address
    const updatedAddressInput = {
      ...inputs['address'],
      value: patientAddresses.ShippingAddress,
    };
    const updatedCityInput = {
      ...inputs['city'],
      value: patientAddresses?.ShippingCityId,
    };
    const updatedStateInput = {
      ...inputs['state'],
      value: patientAddresses?.ShippingState,
    };
    const updatedZipCodeInput = {
      ...inputs['zipCode'],
      value: patientAddresses?.ShippingZipCode,
    };
    const updatedPhoneInput = {
      ...inputs['phoneNumber'],
      value: patientAddresses.ShippingPhoneNo,
    };
    let input = {
      ...inputs,
      address: updatedAddressInput,
      city: updatedCityInput,
      state: updatedStateInput,
      zipCode: updatedZipCodeInput,
      phoneNumber: updatedPhoneInput,
    };

    this.setState({
      inputs: input,

      selectedStateValue: patientAddresses?.ShippingState,
      statePopUpIsSelected: false,
      selectedStateLable: patientAddresses?.ShippingState,

      selectedCityValue: patientAddresses?.ShippingCityId,
      cityPopUpIsSelected: false,
      selectedCityLable: patientAddresses?.ShippingCity,
    });
    this.props.getCityStateByZipCode({
      zipCode: patientAddresses?.ShippingZipCode,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.editShippingAddressSuccess != null) {
      this.props.resetEditShippingAddress();
      NavigationService.popScreen();
    }

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

        //  this.setState({statePicked:picked,cityList:cityBySateName })

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

        //  this.setState({statePicked:picked,cityList:cityBySateName })

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

  EditShippingAddres() {
    let orderDetail = this.props.route.params.orderDetail;
    const firstInvalidCoordinate = this.getFormValidation();
    if (firstInvalidCoordinate != null) {
      return;
    }

    const userPayload = {
      PatientId: this.props.authenticatedUser?.PatientId,
      Email: this.props.authenticatedUser?.Email,
      FirstName: this.props.authenticatedUser?.FirstName,
      LastName: this.props.authenticatedUser?.LastName,
      Address: this.state.inputs['address'].value.trim(),
      PhoneNo: this.state.inputs['phoneNumber'].value
        .replace(/\s/g, '')
        .replace(/-/g, '')
        .replace(/\(|\)/g, ''),
      City: this.state.inputs['city'].value,
      State: this.state.inputs['state'].value,
      ZipCode: this.state.inputs['zipCode'].value,
      LoginUserId: this.props.authenticatedUser?.UserId,
      DecryptColumns: ['Address', 'FirstName', 'LastName'],
      UserKey: this.props.authenticatedUser?.UserKey,
      OrderId: orderDetail.OrderId,
    };

    this.props.editShippingAddress(userPayload);
  }

  _onZipCodeInputBlur(event) {
    this.props.resetStateCity();

    this.resetCityStateValue();
    this.onInputChange({ id: 'state', value: '' });
    //  alert(this.state.inputs['state'].value)
    if (!this.renderError('zipCode')) {
      this.props.getCityStateByZipCode({ zipCode: event.nativeEvent.text });
    }
  }

  popUpStateListItemOnChange = (selectedStateValue) => {
    // alert(this.state.selectedStateLable)

    let value = '';
    this.onInputChange({ id: 'city', value });
    value = selectedStateValue.value;
    //  this.setError("state",)
    this.onInputChange({ id: 'state', value });

    let cities = this.props.extractedCityState
      ? this.props.extractedCityState.cityList
      : [];

    let cityBySateName = cities.filter((data) => {
      return data.stateName === value;
    });

    //  this.setState({statePicked:picked,cityList:cityBySateName })
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
    //alert(selectedValue)

    let value = selectedCityValue.value;
    //  this.setError("state",)
    this.onInputChange({ id: 'city', value });
    //  this.setState({statePicked:picked,cityList:cityBySateName })
    this.setState({
      selectedCityValue: selectedCityValue.value,
      selectedCityLable: selectedCityValue.label,
      cityPopUpIsSelected: false,
    });
  };

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
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
      selectedStateLable: this.props.selectedMessage[
        'RegisterProfile-SelectState'
      ],
      selectedCityValue: null,
      cityPopUpIsSelected: false,
      selectedCityLable: this.props.selectedMessage[
        'RegisterProfile-SelectCity'
      ],
      cityList: [],
    });
  }

  _onPressButton() {
    NavigationService.popScreen();
  }
  render() {
    return (
      <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 28,
            }}>
            <View
              style={{
                width: 35,
                justifyContent: 'flex-start',
                backgroundColor: 'transparent',
              }}>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 35 / 2,
                  backgroundColor: '#f5f5f6',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={this._onPressButton}>
                <Image
                  style={{ height: 11, width: 11 }}
                  source={Images.PurPleBackIcon}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
              }}>
              <Image
                style={{ height: 100, width: 100 }}
                source={Images.MainLogo}
              />
            </View>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <Text style={[Helpers.BoldTexttitle, { marginHorizontal: 10 }]}>
              {this.props.selectedMessage['Product-EditShipping']}
            </Text>

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer,
                this.renderError('address') ? { borderColor: Colors.error } : {},
              ]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
              //placeholder={this.props.selectedMessage["RegisterProfile-StreetAddress"]}
              //placeholderTextColor={Colors.placeholderGraycolor}
              placeholder={
                this.props.selectedMessage['EditPatientScreen-StreetNew']
              }
              placeholderTextColor="#8492A6"
              onChangeText={(value) =>
                this.onInputChange({ id: 'address', value })
              }
              value={this.state.inputs.address.value}
              //inputLabl={this.props.selectedMessage["RegisterProfile-Address"]}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={40}
              rightIcon={
                this.state.inputs['address'].touched
                  ? this.renderError('address')
                    ? Images.InValid
                    : Images.ValidPurple
                  : null
              }
            />

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer,
                this.renderError('zipCode') ? { borderColor: Colors.error } : {},
              ]}
              inputBoxstyle={[Helpers.txtRoundInputs]}
              placeholder={
                this.props.selectedMessage['RegisterProfile-ZipCode']
              }
              // placeholderTextColor={Colors.placeholderGraycolor}
              // placeholder='Postcode'
              placeholderTextColor="#8492A6"
              onChangeText={(value) => {
                this.resetCityStateValue();
                this.onInputChange({ id: 'zipCode', value })
              }}
              onEndEditing={this._onZipCodeInputBlur.bind(this)}
              value={this.state.inputs.zipCode.value}
              // inputLabl={this.props.selectedMessage["RegisterProfile-ZipCode"]}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              rightIconStyle={[Helpers.rightIconStyle]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={7}
              rightIcon={
                this.state.inputs['zipCode'].touched
                  ? this.renderError('zipCode')
                    ? Images.InValid
                    : Images.ValidPurple
                  : null
              }></CustomInputBox>

            <View
              style={[
                Helpers.txtRoundInputContainer,
                { marginTop: 15 },
                this.renderError('phoneNumber')
                  ? { borderColor: Colors.error }
                  : {},
              ]}>
              <TextInputMask
                placeholder={
                  this.props.selectedMessage['RegisterProfile-PhoneNumber']
                }
                placeholderTextColor={Colors.placeholderGraycolor}
                style={[Helpers.txtRoundInputs, Helpers.fill]}
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
                    source={Images.ValidPurple}
                  />
                )
              ) : null}
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 5,
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
                      : {},
                  ]}
                  // add Condition
                  ddlLableStyle={[
                    { width: '70%', paddingLeft: 16 },
                    { color: Colors.patientColor },
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
                    this.props.selectedMessage['RegisterProfile-State'] + ' *'
                  }
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
                      ? Images.DDLPurple
                      : Images.DDLPurple
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
                    this.renderError('city') ? { borderColor: Colors.error } : {},
                  ]}
                  // add Condition
                  ddlLableStyle={[
                    { width: '70%', paddingLeft: 16 },
                    { color: Colors.patientColor },
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
                    this.props.selectedMessage['RegisterProfile-City'] + ' *'
                  }
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
                      ? Images.DDLPurple
                      : Images.DDLPurple
                  }
                  openPopUp={this.state.cityList.length > 0}></CustomDDLPopUp>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[Helpers.btnContainer, { marginBottom: 15, marginTop: 25 }]}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#614698', '#614698', '#614698']}
            style={[Helpers.bigBtnGradient]}>
            <TouchableOpacity
              style={[
                Helpers.btn,
                {
                  backgroundColor: !this.isFormValid()
                    ? '#C2CEDB'
                    : Colors.patientColor,
                },
              ]}
              onPress={
                !this.isFormValid() ? null : this.EditShippingAddres.bind(this)
              }>
              <Text
                style={[Helpers.btnText, { color: Colors.white, fontSize: 15 }]}>
                {this.props.selectedMessage['EditFacProfile-SaveChanges']}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

EditShipping.propTypes = {
  authenticatedUser: PropTypes.any,
  signOut: PropTypes.func,
  selectedMessage: PropTypes.any,
  getTesterForEditSuccess: PropTypes.func,
  resetTesterForEdit: PropTypes.func,
  getUserDetailById: PropTypes.func,

  cityList: PropTypes.array,
  stateList: PropTypes.array,
  cityStateByZipCodeErrorMessage: PropTypes.string,
  cityStateByZipCodeResponse: PropTypes.any,
  getCityStateByZipCode: PropTypes.func,
  extractedCityState: PropTypes.any,
  resetStateCity: PropTypes.func,
  patientAddresses: PropTypes.any,
  patientAddressesErrorMessage: PropTypes.any,

  editShippingAddress: PropTypes.func,
  resetEditShippingAddress: PropTypes.func,
  editShippingAddressError: PropTypes.any,
  editShippingAddressSuccess: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,

  cityList: state.authenticate.cityList,
  stateList: state.authenticate.stateList,
  cityStateByZipCodeResponse: state.authenticate.cityStateByZipCodeResponse,
  extractedCityState: ExtractCityState(
    state.authenticate.cityStateByZipCodeResponse,
  ),
  patientAddresses: state.patientProfile.patientAddresses,
  patientAddressesErrorMessage:
    state.patientProfile.patientAddressesErrorMessage,

  editShippingAddressError: state.patientProfile.editShippingAddressError,
  editShippingAddressSuccess: state.patientProfile.editShippingAddressSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  // signOut: () => dispatch(AuthenticateActions.signOut()),
  //getTesterForEditSuccess: (data) => dispatch(FacilityProfileActions.getTesterForEditSuccess(data)),
  // resetTesterForEdit:()=>dispatch(FacilityProfileActions.resetTesterForEdit()),
  getUserDetailById: (data) =>
    dispatch(AuthenticateActions.getUserDetailById(data)),

  getCityStateByZipCode: (data) =>
    dispatch(AuthenticateActions.getCityStateByZipCode(data)),
  resetStateCity: () => dispatch(AuthenticateActions.resetStateCity()),
  // signOut: () => dispatch(AuthenticateActions.signOut()),
  //getTesterForEditSuccess: (data) => dispatch(FacilityProfileActions.getTesterForEditSuccess(data)),
  editShippingAddress: (data) =>
    dispatch(PatientProfileActions.editShippingAddress(data)),
  resetEditShippingAddress: () =>
    dispatch(PatientProfileActions.resetEditShippingAddress()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditShipping);

const styles = StyleSheet.create({
  searchTextInput: {
    height: '100%',

    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    width: '40%',
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  tile: {
    backgroundColor: 'transparent',
    width: '40%',
    height: '100%',
    marginHorizontal: 30,

    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#815CCC',

    borderRadius: 10,

    //paddingHorizontal:'5%'
  },
  borderround: {
    width: '90%',
    height: '10%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: '5%',
    marginTop: '3%',
    borderStyle: 'solid',
    borderColor: '#815CCC',
    borderWidth: 2,
  },
});
