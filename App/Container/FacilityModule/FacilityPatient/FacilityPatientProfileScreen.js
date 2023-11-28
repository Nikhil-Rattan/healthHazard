import React, { Component } from 'react';
import {
  View, Text, ScrollView,
  SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import { AuthenticateService } from 'App/Services/AuthenticateService';
import { Helpers, Colors, Images, Metrics } from 'App/Theme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import { bool, PropTypes } from 'prop-types'
import CustomInputBox from 'App/Components/CustomInputBox';
import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import { ExtractCityState } from 'App/Stores/Authentication/Selectors'
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import NavigationService from 'App/Services/NavigationService'
import { TextInputMask } from 'react-native-masked-text'
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
class FacilityPatientProfileScreen extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      IsEmailDialogShow: false,
      IsOnProcess: false,
      statePicked: this.props.selectedMessage["RegisterProfile-SelectState"],
      cityPicked: this.props.selectedMessage["RegisterProfile-SelectCity"],

      selectedStateValue: null,
      statePopUpIsSelected: false,
      selectedStateLable: this.props.selectedMessage["RegisterProfile-SelectState"],

      selectedCityValue: null,
      cityPopUpIsSelected: false,
      selectedCityLable: this.props.selectedMessage["RegisterProfile-SelectCity"],

      cityList: [],
      inputs: {
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
        dob: {
          type: 'dob',
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
      },


    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);

  }

  componentDidMount() {
    this.props.resetStateCity()
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.extractedCityState?.stateList.length == 1) {

      if (prevProps?.extractedCityState.stateList.length == 0 && this.props?.extractedCityState?.stateList.length == 1) {

        this.setState({

          selectedStateValue: this.props.extractedCityState?.stateList[0].value,
          statePopUpIsSelected: false,
          selectedStateLable: this.props.extractedCityState?.stateList[0].Name,
        })
        let stateValue = this.props.extractedCityState?.stateList[0].value;

        setTimeout(() => {
          this.onInputChange({ id: 'state', value: stateValue })
        }, 500);

        let cities = this.props.extractedCityState ? this.props.extractedCityState.cityList : []


        let cityBySateName = cities.filter((data) => { return data.stateName === stateValue })



        if (cityBySateName.length == 1) {

          this.setState({

            selectedCityValue: cityBySateName[0].value,
            cityPopUpIsSelected: false,
            selectedCityLable: cityBySateName[0].Name,
          })
          let value = cityBySateName[0].value;
          this.onInputChange({ id: 'city', value })
        }

        this.setState({
          cityList: cityBySateName,
        })


      }
      else if (prevProps?.extractedCityState?.stateList.length == 1 && this.props?.extractedCityState?.stateList.length == 1 && prevProps?.extractedCityState?.stateList[0].value != this.props.extractedCityState?.stateList[0].value) {

        this.setState({

          selectedStateValue: this.props.extractedCityState?.stateList[0].value,
          statePopUpIsSelected: false,
          selectedStateLable: this.props.extractedCityState?.stateList[0].Name,
        })
        let stateSelectedValue = this.props.extractedCityState?.stateList[0].value;

        setTimeout(() => {
          this.onInputChange({ id: 'state', value: stateSelectedValue })
        }, 500);

        let cities = this.props.extractedCityState ? this.props.extractedCityState.cityList : []


        let cityBySateName = cities.filter((data) => { return data.stateName === stateSelectedValue })
        if (cityBySateName.length == 1) {
          this.setState({

            selectedCityValue: cityBySateName[0].value,
            cityPopUpIsSelected: false,
            selectedCityLable: cityBySateName[0].Name,
          })

          this.onInputChange({ id: 'city', value: cityBySateName[0].value })
        }
        this.setState({
          cityList: cityBySateName,
        })
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
      selectedStateLable: this.props.selectedMessage["RegisterProfile-SelectState"],
      selectedCityValue: null,
      cityPopUpIsSelected: false,
      selectedCityLable: this.props.selectedMessage["RegisterProfile-SelectCity"],
      cityList: []
    })
  }



  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != "" && inputs[id].errorLabel != null) {
      return true
    }
    return false;
  }

  _onZipCodeInputBlur(event) {
    this.props.resetStateCity()
    this.resetCityStateValue()
    this.onInputChange({ id: 'state', value: '' })
    if (!this.renderError("zipCode")) {
      this.props.getCityStateByZipCode({ zipCode: event.nativeEvent.text })
    }
  }
  popUpStateListItemOnChange = (selectedStateValue) => {

    let value = ''
    this.onInputChange({ id: 'city', value })
    value = selectedStateValue.value
    this.onInputChange({ id: 'state', value })

    let cities = this.props.extractedCityState ? this.props.extractedCityState.cityList : []


    let cityBySateName = cities.filter((data) => { return data.stateName === value })
    this.setState({
      cityList: cityBySateName, selectedStateValue: selectedStateValue.value, selectedStateLable: selectedStateValue.Name, statePopUpIsSelected: false
    })

    if (cityBySateName.length == 1) {

      this.setState({
        selectedCityValue: cityBySateName[0].value,
        cityPopUpIsSelected: false,
        selectedCityLable: cityBySateName[0].Name,
      })


      setTimeout(() => {
        this.onInputChange({ id: 'city', value: cityBySateName[0].value })
      }, 500);
    }

  }


  popUpCityListItemOnChange = (selectedCityValue) => {

    let value = selectedCityValue.value
    this.onInputChange({ id: 'city', value })
    this.setState({ selectedCityValue: selectedCityValue.value, selectedCityLable: selectedCityValue.label, cityPopUpIsSelected: false })

  }
  _isDateValid(date) {

    let inputDate = new Date(date)
    let currentDate = new Date()
    let lastDate = new Date(new Date().setFullYear(new Date().getFullYear() - 120));
    if (inputDate > currentDate || inputDate < lastDate) {
      return false
    }
    return true
  }
  onChangeDOBText(value) {

    this.onInputChange({ id: 'dob', value })
  }

  async _onSignUpPressButton() {

    const { inputs } = this.state
    if (!this._isDateValid(inputs['dob'].value)) {
      return;
    }
    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      return;
    }

    let phoneNumber = inputs['phoneNumber'].value.replace(/\s/g, "").replace(/-/g, '').replace(/\(|\)/g, "")
    const userPayload = {
      PatientId: 0,
      TitleId: 0,
      FirstName: this.state.inputs["firstName"].value,
      LastName: this.state.inputs["lastName"].value,
      Email: this.state.inputs["emailId"].value,
      Address: this.state.inputs["address"].value,
      DOB: this.state.inputs["dob"].value,
      PhoneNo: phoneNumber,
      CityId: this.state.inputs["city"].value,
      State: this.state.inputs["state"].value,
      ZipCode: this.state.inputs["zipCode"].value,
      FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
      LoginUserId: this.props.authenticatedUser?.UserId,
      Age: this.getAge(this.state.inputs["dob"].value),
      DecryptColumns: ["FirstName", "LastName", "DOB", "Address"]
    };

    this.setState({ IsOnProcess: true });
    const response = await AuthenticateService.CheckEmailExist({ Email: userPayload.Email });
    if (response) {
      console.log(response);
      if (response[0].Status) {
        this.props.saveBuildProfilePayload(userPayload);
        this.setState({ IsOnProcess: false });
        NavigationService.navigate('FacilityPatientAdditionalDetailScreen');
      } else {
        this.setState({ IsEmailDialogShow: true, IsOnProcess: false });
      }
    } else {
      this.setState({ IsOnProcess: false });
      console.log("Something went wrong");
    }
  }

  getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  }


  _onDOBInputBlur(event) {
    let value = event.nativeEvent.text
    if (value == "" || this.renderError('dob')) {
      return
    }
    const { inputs } = this.state
    let updatedDOBError = null

    if (!this._isDateValid(value)) {
      updatedDOBError = { ...inputs["dob"], errorLabel: '^Required', value, touched: true }
    }
    else {
      updatedDOBError = { ...inputs["dob"], errorLabel: null, value, touched: true }
    }

    let input = {
      ...inputs,
      dob: updatedDOBError
    };

    this.setState({ inputs: input })
  }

  _goBackscreen() {
    NavigationService.popScreen()
  }
  _validateRequired() {
    return !(this.state.selectedCityValue && this.state.selectedStateValue && this.state.inputs.phoneNumber.value && this.state.inputs.zipCode.value && this.state.inputs.firstName.value && this.state.inputs.lastName.value && this.state.inputs.emailId.value && this.state.inputs.dob.value && this.state.inputs.address.value && (!this.state.IsOnProcess));
  }

  _CloseEmailAlert() {
    this.setState({ IsEmailDialogShow: false });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={[{ height: 80, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }]}>
          <TouchableOpacity
            style={{ width: 46, height: 46, borderRadius: 46 / 2, marginLeft: 9, backgroundColor: '#f6f5fa', alignItems: 'center' }}
            onPress={this._goBackscreen.bind(this)}
          >
            <Image style={{ height: 17, width: 17, marginTop: 16 }} source={Images.GreenBackIcon} />
          </TouchableOpacity>
          <Image style={{ height: 90, width: 90, marginTop: 16 }} source={Images.MainLogo} />
          <Text style={[{
            color: Colors.white, textAlign: 'center', marginTop: 10,
            fontSize: 16,
            textAlign: 'left', marginRight: 10, fontFamily: 'gothamrounded-bold'
          }]}>.... </Text>
        </View>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white' }}>
          <HeaderProgress
            rowStyle={[, { height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '90%' }]}
            progressStyle={[Helpers.headerLeftRow]}
            progressCount={25}
            rightColor={Colors.facilityColor}
            leftColor={'#FBFBFB'}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}
        >
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
              'CreateNewPatientScreen-PleaseSelectAnotherEmail'
              ]
            }
            _onRightButtonPress={this._CloseEmailAlert.bind(this)}
            hasSingleButton={true}
          />
          <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, }}>

            <ScrollView overScrollMode='auto' showsVerticalScrollIndicator={false}>

              <View style={{ flexDirection: 'column', alignItems: "flex-start", justifyContent: "center" }}>

                <Text style={[Helpers.BoldTexttitle, { marginTop: 20, marginBottom: 15 }]}>{this.props.selectedMessage["RegPatient-RegisterPatient"]}</Text>

                <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, ,
                this.state.inputs['firstName'].touched
                  ? this.renderError('firstName')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
                ]}
                  inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill, { color: Colors.facilityColor }]}
                  placeholder={this.props.selectedMessage["RegisterProfile-EnterYourFirstName"]}
                  placeholderTextColor={Colors.placeholderGraycolor}
                  onChangeText={(value) => this.onInputChange({ id: 'firstName', value })}
                  value={this.state.inputs.firstName.value}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  inputBoxLableStyle={[Helpers.inputBoxLable, { color: Colors.facilityColor }]}
                  hasEvent={false}
                  maxLength={20}
                  hasRightIcon={true}
                  rightIcon={this.state.inputs["firstName"].touched ? this.renderError("firstName") ? Images.InValid : Images.ValidGreen : null}

                />
                <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, {},
                this.state.inputs['lastName'].touched
                  ? this.renderError('lastName')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
                ]}
                  inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill, { color: Colors.facilityColor }]}
                  placeholder={this.props.selectedMessage["RegisterProfile-EnterYourLastName"]}
                  placeholderTextColor={Colors.placeholderGraycolor}
                  onChangeText={(value) => this.onInputChange({ id: 'lastName', value })}
                  value={this.state.inputs.lastName.value}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  inputBoxLableStyle={[Helpers.inputBoxLable, { color: Colors.facilityColor }]}
                  hasEvent={false}
                  maxLength={20}
                  hasRightIcon={true}
                  rightIcon={this.state.inputs["lastName"].touched ? this.renderError("lastName") ? Images.InValid : Images.ValidGreen : null}

                />

                <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, ,
                this.state.inputs['emailId'].touched
                  ? this.renderError('emailId')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
                ]}
                  inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill, { color: Colors.facilityColor }]}
                  placeholder={this.props.selectedMessage["AccountLogin-Email"]}
                  placeholderTextColor={Colors.placeholderGraycolor}
                  onChangeText={(value) => this.onInputChange({ id: 'emailId', value })}
                  value={this.state.inputs.emailId.value}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  inputBoxLableStyle={[Helpers.inputBoxLable, { color: Colors.facilityColor }]}
                  hasEvent={false}
                  hasRightIcon={true}
                  rightIcon={this.state.inputs["emailId"].touched ? this.renderError("emailId") ? Images.InValid : Images.ValidGreen : null}

                />

                <View style={[Helpers.txtRoundInputContainer, { marginTop: 10, },
                this.state.inputs["dob"].touched
                  ? this.renderError("dob")
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
                ]}>
                  <TextInputMask
                    placeholder={this.props.selectedMessage["RegisterProfile-DateOfBirth"]}
                    placeholderTextColor={Colors.placeholderGraycolor}
                    style={[Helpers.txtRoundInputs, Helpers.fill, { color: Colors.facilityColor }]}
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY'
                    }}
                    onEndEditing={this._onDOBInputBlur.bind(this)}
                    value={this.state.inputs.dob.value}
                    returnKeyType="done"
                    onChangeText={this.onChangeDOBText.bind(this)}
                  />

                  {this.state.inputs["dob"].touched ?

                    this.renderError("dob") ?
                      <Image style={[Helpers.rightIconStyle]} resizeMode='contain' source={Images.InValid} />
                      :
                      <Image style={[Helpers.rightIconStyle]} resizeMode='contain' source={Images.ValidGreen} />
                    : null
                  }


                </View>

                <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, ,
                this.state.inputs['address'].touched
                  ? this.renderError('address')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }

                ]}
                  inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill, { color: Colors.facilityColor }]}
                  placeholder={this.props.selectedMessage["RegisterProfile-StreetAddress"]}
                  placeholderTextColor={Colors.placeholderGraycolor}
                  onChangeText={(value) => this.onInputChange({ id: 'address', value })}
                  value={this.state.inputs.address.value}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  inputBoxLableStyle={[Helpers.inputBoxLable, { color: Colors.facilityColor }]}
                  hasEvent={false}
                  maxLength={40}
                  hasRightIcon={true}
                  rightIcon={this.state.inputs["address"].touched ? this.renderError("address") ? Images.InValid : Images.ValidGreen : null}
                />


                <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, ,
                this.state.inputs['zipCode'].touched
                  ? this.renderError('zipCode')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
                ]}
                  inputBoxstyle={[Helpers.txtRoundInputs, { color: Colors.facilityColor }]}
                  placeholder={this.props.selectedMessage["RegisterProfile-ZipCode"]}
                  placeholderTextColor={Colors.placeholderGraycolor}
                  onChangeText={(value) => {
                    this.resetCityStateValue();
                    this.onInputChange({ id: 'zipCode', value });
                  }}
                  onEndEditing={this._onZipCodeInputBlur.bind(this)}
                  value={this.state.inputs.zipCode.value}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  inputBoxLableStyle={[Helpers.inputBoxLable, { color: Colors.facilityColor }]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  hasEvent={false}
                  hasRightIcon={true}
                  maxLength={7}
                  rightIcon={this.state.inputs["zipCode"].touched ? this.renderError("zipCode") ? Images.InValid : Images.ValidGreen : null}

                >
                </CustomInputBox>

                <View style={[Helpers.txtRoundInputContainer, { marginTop: 10, },
                this.state.inputs["phoneNumber"].touched
                  ? this.renderError("phoneNumber")
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
                ]}>
                  <TextInputMask
                    placeholder={this.props.selectedMessage["RegisterProfile-PhoneNumber"]}
                    placeholderTextColor={Colors.placeholderGraycolor}
                    style={[Helpers.txtRoundInputs, Helpers.fill, { color: Colors.facilityColor }]}
                    type={'custom'}
                    options={{
                      mask: '+99 999 999-9999'
                    }}
                    maxLength={14}
                    keyboardType="phone-pad"
                    returnKeyType='done'
                    value={this.state.inputs.phoneNumber.value}
                    onChangeText={(value) => this.onInputChange({ id: 'phoneNumber', value })}
                  />


                  {this.state.inputs["phoneNumber"].touched ?

                    this.renderError("phoneNumber") ?
                      <Image style={[Helpers.rightIconStyle]} resizeMode='contain' source={Images.InValid} />
                      :
                      <Image style={[Helpers.rightIconStyle]} resizeMode='contain' source={Images.ValidGreen} />
                    : null
                  }
                </View>

                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                  <View style={{ width: '45%' }}>

                    <CustomDDLPopUp

                      // add Condition
                      ddlContainerStyle={[Helpers.buttonContainer, Metrics.smallVerticalMargin, { borderRadius: 9 }, { backgroundColor: 'transparent', borderWidth: 0.8 },
                      this.state.inputs['state'].touched
                        ? this.state.selectedStateValue != null && !this.renderError('state')
                          ? { borderColor: Colors.facilityColor } :
                          { borderColor: Colors.error } :
                        { borderColor: Colors.GreyColor }
                      ]}
                      // add Condition
                      ddlLableStyle={[{ width: '70%', paddingLeft: 16, },
                      this.state.inputs['state'].touched && !this.renderError("state") && this.state.selectedStateValue != null ?
                        { color: Colors.facilityColor } :
                        { color: Colors.GreyColor }
                      ]}
                      ddlIconContainerStyle={[{ width: '30%' }]}
                      ddlIconStyle={[Helpers.rightIconStyle]}
                      popUpListItemTextStyle={[Helpers.popUpListItemTextStyle, { color: Colors.facilityColor }]}
                      popUpListItemStyle={[Helpers.popUpListItemStyle]}
                      popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                      popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                      popUpTitleStyle={[Helpers.popUpTitleStyle, { backgroundColor: Colors.facilityColor }]}
                      popUpTitleAlign={"left"}
                      popUpTitleText={this.props.selectedMessage["RegisterProfile-State"] + " *"}
                      IspatientLogin={true}
                      popUpListSrc={this.props.extractedCityState ? this.props.extractedCityState.stateList : []}
                      popUpIsSelected={this.state.statePopUpIsSelected}
                      popUpSelectedValue={this.state.selectedStateValue}
                      popUpSelectedLable={this.state.selectedStateLable}
                      popUpKey={"value"}
                      popUpListItemOnChange={this.popUpStateListItemOnChange.bind(this)}
                      leftIcon={this.state.selectedStateValue ? Images.DDLGreen : Images.DDLGrey}
                      openPopUp={this.props.extractedCityState ? this.props.extractedCityState.stateList.length > 0 : false}
                    >
                    </CustomDDLPopUp>


                  </View>
                  <View style={{ width: '45%', backgroundColor: 'transparent', }}>

                    <CustomDDLPopUp

                      // add Condition
                      ddlContainerStyle={[Helpers.buttonContainer, Metrics.smallVerticalMargin, { borderRadius: 9 }, { backgroundColor: 'transparent', borderWidth: 0.8 },
                      this.state.inputs['city'].touched
                        ? this.state.selectedCityValue != null && !this.renderError('city')
                          ? { borderColor: Colors.facilityColor } :
                          { borderColor: Colors.error } :
                        { borderColor: Colors.GreyColor }
                      ]}
                      // add Condition
                      ddlLableStyle={[{ width: '70%', paddingLeft: 16, },
                      this.state.inputs['city'].touched && !this.renderError("city") && this.state.selectedCityValue != null
                        ? { color: Colors.facilityColor } :
                        { color: Colors.GreyColor }
                      ]}
                      ddlIconContainerStyle={[{ width: '30%' }]}
                      ddlIconStyle={[Helpers.rightIconStyle]}
                      popUpListItemTextStyle={[Helpers.popUpListItemTextStyle, { color: Colors.facilityColor }]}
                      popUpListItemStyle={[Helpers.popUpListItemStyle]}
                      popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                      popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                      popUpTitleStyle={[Helpers.popUpTitleStyle, { backgroundColor: Colors.facilityColor }]}
                      popUpTitleAlign={"left"}
                      popUpTitleText={this.props.selectedMessage["RegisterProfile-City"] + " *"}
                      IspatientLogin={true}
                      popUpListSrc={this.state.cityList}
                      popUpIsSelected={this.state.cityPopUpIsSelected}
                      popUpSelectedValue={this.state.selectedCityValue}
                      popUpSelectedLable={this.state.selectedCityLable}
                      popUpKey={"value"}
                      popUpListItemOnChange={this.popUpCityListItemOnChange.bind(this)}
                      leftIcon={this.state.selectedCityValue ? Images.DDLGreen : Images.DDLGrey}
                      openPopUp={this.state.cityList.length > 0}
                    >

                    </CustomDDLPopUp>
                  </View>
                  {this.state.IsButtomTrue ?
                    <View style={{ height: 200 }}></View>
                    :
                    null
                  }

                </View>


                <View style={{ height: 40 }}></View>


              </View>
            </ScrollView>

            <View style={{ marginBottom: '8%', height: 70, width: '100%', backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'flex-end' }}>

              <View style={[Helpers.btnContainer, { marginBottom: 15, }]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  colors={['#28998D', '#28998D', '#28998D']} style={[Helpers.bigBtnGradient, { width: '97%' }]} >
                  <TouchableOpacity style={[Helpers.btn, { backgroundColor: this._validateRequired() ? Colors.DisableGrayColor : Colors.facilityColor }]}
                    onPress={this._validateRequired() ? null : this._onSignUpPressButton.bind(this)}
                  >
                    <Text style={[Helpers.btnText, { color: Colors.white, fontSize: 15 }]}>{this.props.selectedMessage["RegPatient-ProceedToStep2"]} </Text>

                  </TouchableOpacity>

                </LinearGradient>
              </View>
            </View>

          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

}

FacilityPatientProfileScreen.propTypes = {

  authenticatedIsLoading: PropTypes.bool,

  cityList: PropTypes.array,
  stateList: PropTypes.array,
  cityStateByZipCodeErrorMessage: PropTypes.string,
  cityStateByZipCodeResponse: PropTypes.any,
  getCityStateByZipCode: PropTypes.func,
  extractedCityState: PropTypes.any,
  saveBuildProfilePayload: PropTypes.func,
  buildProfilePayload: PropTypes.any,
  authenticatedUser: PropTypes.any,
  resetStateCity: PropTypes.func,
  selectedMessage: PropTypes.any
}
// getting states from reducers
const mapStateToProps = (state) => ({

  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  cityList: state.authenticate.cityList,
  stateList: state.authenticate.stateList,
  cityStateByZipCodeResponse: state.authenticate.cityStateByZipCodeResponse,
  extractedCityState: ExtractCityState(state.authenticate.cityStateByZipCodeResponse),
  buildProfilePayload: state.authenticate.buildProfilePayload,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage

})
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions 
const mapDispatchToProps = (dispatch) => ({

  saveRegistration: (data) => dispatch(AuthenticateActions.saveRegistration(data)),
  getCityStateByZipCode: (data) => dispatch(AuthenticateActions.getCityStateByZipCode(data)),
  saveBuildProfilePayload: (data) => dispatch(AuthenticateActions.saveBuildProfilePayload(data)),
  resetStateCity: () => dispatch(AuthenticateActions.resetStateCity()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityPatientProfileScreen)
