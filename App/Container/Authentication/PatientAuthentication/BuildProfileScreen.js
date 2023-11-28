import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import { Helpers, Colors, Images, Metrics } from 'App/Theme';
import { Enums } from 'App/Enums'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import CustomInputBox from 'App/Components/CustomInputBox';

import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import { ExtractCityState } from 'App/Stores/Authentication/Selectors'
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import NavigationService from 'App/Services/NavigationService'
import { TextInputMask } from 'react-native-masked-text'

class BuildProfileScreen extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      statePicked: this.props.selectedMessage["RegisterProfile-SelectState"],
      // cityPicked: this.props.selectedMessage["RegisterProfile-SelectCity"],

      selectedStateValue: null,
      statePopUpIsSelected: false,
      selectedStateLable: this.props.selectedMessage["RegisterProfile-SelectState"],

      // selectedCityValue: null,
      // cityPopUpIsSelected: false,
      // selectedCityLable: null,

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
          touched: false,
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
          type: 'generic',
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


  componentDidUpdate(prevProps) {


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
          // this.onInputChange({ id: 'city', value })
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

          // this.onInputChange({ id: 'city', value: cityBySateName[0].value })
        }

        this.setState({
          cityList: cityBySateName,
        })
      }
    }

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
  // onChangeCityText(value) {
  //   this.onInputChange({ id: 'city', value })

  // }

  resetCityStateValue() {
    this.props.resetStateCity();
    var inputs = this.state.inputs;
    inputs.state.value = inputs.city.value = ''
    this.onInputChange({ id: 'state', value: '' })
    // this.onInputChange({ id: 'city', value: '' })

    this.setState({
      inputs: inputs,
      selectedStateValue: null,
      statePopUpIsSelected: false,
      selectedStateLable: this.props.selectedMessage["RegisterProfile-SelectState"],
      selectedCityValue: null,
      cityPopUpIsSelected: false,
      selectedCityLable: this.props.selectedMessage["RegisterProfile-SelectCity"],
      cityList: []
    });
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != "" && inputs[id].errorLabel != null) {
      return true
    }
    return false;
  }

  _onZipCodeInputBlur(event) {

    this.resetCityStateValue()
    if (!this.renderError("zipCode")) {
      this.props.getCityStateByZipCode({ zipCode: event.nativeEvent.text })
    }
  }

  popUpStateListItemOnChange = (selectedStateValue) => {

    let value = ''
    // this.onInputChange({ id: 'city', value })
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
        // this.onInputChange({ id: 'city', value: cityBySateName[0].value })
      }, 500);
    }
  }


  popUpCityListItemOnChange = (selectedCityValue) => {

    let value = selectedCityValue.value

    // this.onInputChange({ id: 'city', value })
    this.setState({ selectedCityValue: selectedCityValue.value, selectedCityLable: selectedCityValue.label, cityPopUpIsSelected: false })
  }

  _onBackButtonPress() {
    NavigationService.popScreen()
  }

  _onSignUpPressButton() {

    const { inputs } = this.state
    const firstInvalidCoordinate = this.getFormValidation();
    if (firstInvalidCoordinate !== null) {
      return;
    }
    if (inputs.state.value == null || inputs.city.value == null) {
      return;
    }

    if (!this._isDateValid(inputs['dob'].value)) {
      return;
    }
    let { buildProfilePayload } = this.props
    const { Phone } = this.props.route.params;
    let payload = {
      ...buildProfilePayload,
      "FirstName": inputs['firstName'].value.trim(),
      "LastName": inputs['lastName'].value.trim(),
      "FacilityName": "",
      "ContactName": "",
      "PhysicianName": "",
      "Email": inputs['emailId'].value.trim() ?? "",
      "DOB": inputs['dob'].value,
      "Password": "1234",
      "Address": inputs['address'].value.trim(),
      "City": inputs['city'].value,
      "State": inputs['state'].value,
      "ZipCode": inputs['zipCode'].value,
      "PhoneNo": Phone,
      "FacilityPhone": "",
      "Fax": "",
      "UserRoleId": Enums.Patient,
      "Age": this.getAge(inputs['dob'].value),
      "DecryptColumns": ["FirstName", "LastName", "DOB", "Address", "Password"]
    }

    this.props.saveBuildProfilePayload(payload)
    NavigationService.navigate('AdditionalDetailScreen')
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

  renderBuildProfileForm() {
    const IsFacility = this.props.accountType === Enums.Facility;
    return (
      <>
        <ScrollView overScrollMode='auto' showsVerticalScrollIndicator={false}>
          <HeaderProgress
            rowStyle={[, { height: 70, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}
            progressStyle={[Helpers.headerLeftRow]}
            progressCount={50}
            rightColor={Colors.patientColor}
            leftColor={'#FBFBFB'}
          />

          <View style={{ flexDirection: 'column', alignItems: "flex-start", justifyContent: "center", }}>

            <Text style={[Helpers.BoldTexttitle, { marginBottom: 17 }]}>{this.props.selectedMessage["RegisterProfile-BuildYourProfile"]}</Text>

            <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, { borderColor: Colors.GreyColor }, this.state.inputs['firstName'].touched ? this.renderError("firstName") ? { borderColor: Colors.error } : { borderColor: Colors.patientColor } : {}]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
              placeholder={this.props.selectedMessage["RegisterProfile-EnterYourFirstName"]}
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) => this.onInputChange({ id: 'firstName', value })}
              value={this.state.inputs.firstName.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              allowFontScaling={false}
              hasRightIcon={true}
              maxLength={20}
              rightIcon={this.state.inputs["firstName"].touched ? this.renderError("firstName") ? Images.InValid : Images.ValidPurple : null}

            />
            <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, { borderColor: Colors.GreyColor }, this.state.inputs['lastName'].touched ? this.renderError("lastName") ? { borderColor: Colors.error } : { borderColor: Colors.patientColor } : {}]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
              placeholder={this.props.selectedMessage["RegisterProfile-EnterYourLastName"]}
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) => this.onInputChange({ id: 'lastName', value })}
              value={this.state.inputs.lastName.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              maxLength={20}
              hasRightIcon={true}
              rightIcon={this.state.inputs["lastName"].touched ? this.renderError("lastName") ? Images.InValid : Images.ValidPurple : null}

            />
            <CustomInputBox
              containerStyle={[Helpers.txtRoundInputContainer, { borderColor: Colors.GreyColor }, this.state.inputs['emailId'].touched ? this.renderError("emailId") ? { borderColor: Colors.error } : { borderColor: Colors.patientColor } : {}]}
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
            <View style={[Helpers.txtRoundInputContainer, { marginTop: 10, },
            this.state.inputs["dob"].touched
              ? this.renderError("dob")
                ? { borderColor: Colors.error } :
                { borderColor: Colors.patientColor } :
              { borderColor: Colors.GreyColor }]}>
              <TextInputMask
                placeholder={this.props.selectedMessage["RegisterProfile-DateOfBirth"]}
                placeholderTextColor={Colors.placeholderGraycolor}
                style={[Helpers.txtRoundInputs, Helpers.fill]}
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY'
                }}
                onEndEditing={this._onDOBInputBlur.bind(this)}
                returnKeyType='done'
                value={this.state.inputs.dob.value}
                onChangeText={this.onChangeDOBText.bind(this)}

              />

              {this.state.inputs["dob"].touched ?

                this.renderError("dob") ?
                  <Image style={[Helpers.rightIconStyle]} resizeMode='contain' source={Images.InValid} />
                  :
                  <Image style={[Helpers.rightIconStyle]} resizeMode='contain' source={Images.ValidPurple} />
                : null
              }


            </View>

            <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, { borderColor: Colors.GreyColor }, this.state.inputs['address'].touched ? this.renderError("address") ? { borderColor: Colors.error } : { borderColor: Colors.patientColor } : {}]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
              placeholder={this.props.selectedMessage["RegisterProfile-StreetAddress"]}
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) => this.onInputChange({ id: 'address', value })}
              value={this.state.inputs.address.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={40}
              rightIcon={this.state.inputs["address"].touched ? this.renderError("address") ? Images.InValid : Images.ValidPurple : null}

            />


            <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, { borderColor: Colors.GreyColor }, this.state.inputs['zipCode'].touched ? this.renderError("zipCode") ? { borderColor: Colors.error } : { borderColor: Colors.patientColor } : {}]}
              inputBoxstyle={[Helpers.txtRoundInputs]}
              placeholder={this.props.selectedMessage["RegisterProfile-ZipCode"]}
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) => { this.resetCityStateValue(); this.onInputChange({ id: 'zipCode', value }); }}
              onEndEditing={this._onZipCodeInputBlur.bind(this)}
              value={this.state.inputs.zipCode.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              rightIconStyle={[Helpers.rightIconStyle]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={7}
              rightIcon={this.state.inputs["zipCode"].touched ? this.renderError("zipCode") ? Images.InValid : Images.ValidPurple : null}

            >

            </CustomInputBox>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
              <View style={{ width: '45%', marginTop: 4 }}>

                <CustomDDLPopUp
                  // add Condition
                  ddlContainerStyle={[Helpers.buttonContainer, Metrics.smallVerticalMargin, { backgroundColor: 'transparent', borderWidth: 0.8, borderRadius: 10 },
                  this.state.inputs['state'].touched
                    ? this.state.selectedStateValue != null && !this.renderError('state')
                      ? { borderColor: Colors.patientColor } :
                      { borderColor: Colors.error } :
                    { borderColor: Colors.GreyColor }
                  ]}
                  // add Condition
                  ddlLableStyle={[{ width: '70%', paddingLeft: 16, },
                  this.state.inputs['state'].touched && !this.renderError("state") && this.state.selectedStateValue != null ?
                    { color: Colors.patientColor } :
                    { color: Colors.GreyColor }
                  ]}
                  ddlIconContainerStyle={[{ width: '30%' }]}
                  ddlIconStyle={[Helpers.rightIconStyle]}
                  popUpListItemTextStyle={[Helpers.popUpListItemTextStyle]}
                  popUpListItemStyle={[Helpers.popUpListItemStyle]}
                  popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                  popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                  popUpTitleStyle={[Helpers.popUpTitleStyle]}
                  popUpTitleAlign={"left"}
                  popUpTitleText={this.props.selectedMessage["RegisterProfile-State"] + " *"}

                  popUpListSrc={this.props.extractedCityState ? this.props.extractedCityState.stateList : []}
                  popUpIsSelected={this.state.statePopUpIsSelected}
                  popUpSelectedValue={this.state.selectedStateValue}
                  popUpSelectedLable={this.state.selectedStateLable}
                  popUpKey={"value"}
                  popUpListItemOnChange={this.popUpStateListItemOnChange.bind(this)}
                  leftIcon={this.state.selectedStateValue ? Images.DDLPurple : Images.DDLGrey}
                  openPopUp={this.props.extractedCityState ? this.props.extractedCityState.stateList.length > 0 : false}
                >

                </CustomDDLPopUp>


              </View>
              <View style={{ width: '45%', backgroundColor: 'transparent', marginTop: Platform.OS === 'ios' ? 0 : -4 }}>


                <CustomInputBox
                  containerStyle={[Helpers.txtRoundInputContainer, {
                    borderColor: Colors.GreyColor,
                    borderWidth: 0.8
                  },
                  this.state.inputs['city'].touched ?
                    this.renderError('city') ?
                      { borderColor: Colors.error } :
                      { borderColor: Colors.patientColor } : {}]}
                  // containerStyle={[
                  //   Helpers.txtRoundInputContainer,
                  //   this.renderError('city') ? { borderColor: Colors.error } : {},
                  // ]}
                  inputBoxstyle={[Helpers.txtRoundInputs, Helpers.lightBook]}
                  placeholder={
                    this.props.selectedMessage["RegisterProfile-City"]
                  }
                  placeholderTextColor={Colors.placeholderGraycolor}
                  onChangeText={(value) => this.onInputChange({ id: 'city', value })}
                  // onChangeText={(value) => { this.resetCityStateValue(); this.onInputChange({ id: 'zipCode', value }) }}
                  // onEndEditing={this._onZipCodeInputBlur.bind(this)}
                  value={this.state.inputs.city.value}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  inputBoxLableStyle={[Helpers.inputBoxLable]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  hasEvent={false}
                  hasRightIcon={true}
                  maxLength={50}
                  rightIcon={
                    this.state.inputs['city'].touched
                      ? this.renderError('city')
                        ? Images.InValid
                        : Images.ValidPurple
                      : null
                  }></CustomInputBox>


                {/* <CustomDDLPopUp

                  // add Condition
                  ddlContainerStyle={[Helpers.buttonContainer, Metrics.smallVerticalMargin, { backgroundColor: 'transparent', borderWidth: 0.8, borderRadius: 10 },
                  this.state.inputs['city'].touched
                    ? this.state.selectedCityValue != null && !this.renderError('city')
                      ? { borderColor: Colors.patientColor } :
                      { borderColor: Colors.error } :
                    { borderColor: Colors.GreyColor }
                  ]}
                  // add Condition
                  ddlLableStyle={[{ width: '70%', paddingLeft: 16, },
                  this.state.inputs['city'].touched && !this.renderError("city") && this.state.selectedCityValue != null
                    ? { color: Colors.patientColor } :
                    { color: Colors.GreyColor }
                  ]}
                  ddlIconContainerStyle={[{ width: '30%' }]}
                  ddlIconStyle={[Helpers.rightIconStyle]}
                  popUpListItemTextStyle={[Helpers.popUpListItemTextStyle]}
                  popUpListItemStyle={[Helpers.popUpListItemStyle]}
                  popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                  popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                  popUpTitleStyle={[Helpers.popUpTitleStyle]}
                  popUpTitleAlign={"left"}
                  popUpTitleText={this.props.selectedMessage["RegisterProfile-City"] + " *"}

                  popUpListSrc={this.state.cityList}
                  popUpIsSelected={this.state.cityPopUpIsSelected}
                  popUpSelectedValue={this.state.selectedCityValue}
                  popUpSelectedLable={this.state.selectedCityLable}
                  popUpKey={"value"}
                  popUpListItemOnChange={this.popUpCityListItemOnChange.bind(this)}
                  leftIcon={this.state.selectedCityValue ? Images.DDLPurple : Images.DDLGrey}
                  openPopUp={this.state.cityList.length > 0}
                >

                </CustomDDLPopUp> */}
              </View>
              {this.state.IsButtomTrue ?
                <View style={{ height: 200 }}></View>
                :
                null
              }
            </View>
          </View>
        </ScrollView>


        <CustomMultiButtons
          mutliButtonContainer={[Helpers.bottomView, Helpers.multiButtonContainer, { justifyContent: 'space-between', position: 'relative' }]}
          leftButtonContainer={[Helpers.buttonContainer, Helpers.buttonContainerWithoutBackground]}
          rightButtonContainer={[Helpers.buttonContainer, { width: '40%', borderRadius: 13 }]}
          leftButtonTextStyle={[Helpers.btnText, Helpers.buttonTextWithoutBackgroundContainer]}
          rightButtonTextStyle={[Helpers.btnText, { fontWeight: "bold", fontSize: 14 }]}
          leftButtonText={this.props.selectedMessage["RegisterProfile-Back"]}
          rightButtonText={this.props.selectedMessage["RegisterProfile-Step2"]}
          onLeftPress={this._onBackButtonPress.bind(this)}
          onRightPress={this._onSignUpPressButton.bind(this)}
        ></CustomMultiButtons>


      </>


    )
  }



  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* {"Render Form code for IOS"} */}
        {Platform.OS === "ios" ?
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={40}
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}
          >
            {this.renderBuildProfileForm()}

          </KeyboardAvoidingView>

          :
          // {"Render Form code for Android"}
          <View
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}
          >

            {this.renderBuildProfileForm()}

          </View>
        }
      </SafeAreaView>

    );
  }

}

BuildProfileScreen.propTypes = {

  authenticatedIsLoading: PropTypes.bool,

  cityList: PropTypes.array,
  stateList: PropTypes.array,
  cityStateByZipCodeErrorMessage: PropTypes.string,
  cityStateByZipCodeResponse: PropTypes.any,
  getCityStateByZipCode: PropTypes.func,
  extractedCityState: PropTypes.any,
  saveBuildProfilePayload: PropTypes.func,
  buildProfilePayload: PropTypes.any,
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
)(BuildProfileScreen)
