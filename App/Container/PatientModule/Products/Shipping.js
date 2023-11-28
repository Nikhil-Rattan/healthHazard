import React, { Component } from 'react';
import {
  StyleSheet,
  Text, Linking,
  View,
  TouchableHighlight, TouchableOpacity,
  Image, TextInput, KeyboardAvoidingView,
  Alert, Animated,
  ScrollView,
  SafeAreaView, Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
//import {KeyboardAvoidingView} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Metrics, Helpers, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CustomInputBox from 'App/Components/CustomInputBox';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import { ValidationService } from 'App/Services/ValidationService';
import { Enums } from 'App/Enums'
import { Config } from 'App/Config'
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';

class Shipping extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      IsMessageShow: false, Message: '',
      animation: new Animated.Value(0),

      inputs: {
        emailId: {
          type: 'email',
          value: '',
          touched: false
        },
        password: {
          type: 'password',
          value: '',
          touched: false
        }


      }
    };
    super.labels = {
      password: 'Password',
      userName: 'User Name',

    };
    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);

  }





  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != "" && inputs[id].errorLabel != null) {
      return true
    }
    return false;
  }


  componentWillUnmount() {
    this.setState({ IsMessageShow: false })
  }

  submit() {

    this.props.resetEmailExistingStates()
    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {

      return;
    }

    // if we make it to this point, we can actually submit the form
  }
  componentDidMount() {

    this.props.resetEmailExistingStates()
  }

  _onPressCloseButton() {
    this.RBSheet.close()
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.emailExistErrorMessage != null && prevProps.emailExistErrorMessage != this.props.emailExistErrorMessage) {

      const message = this.props.selectedMessage[this.props.emailExistErrorMessage];
      this.setState({ IsMessageShow: true, Message: message })
    }
  }


  _onPressSignUp() {

    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      return;
    }

    if (this.renderError("emailId") || this.renderError("password")) {
      return
    }

    const { inputs } = this.state
    let _API_URL = Config.API_URL
    this.props.checkEmailExist({ Email: inputs["emailId"].value, URL: _API_URL, Password: inputs["password"].value })
  }

  _CloseAlert() {
    this.setState({ IsMessageShow: false })
  }

  render() {
    const IsFacility = this.props.accountType === Enums.Facility

    return (
      <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>
        <View style={{ width: '100%', flex: 1, backgroundColor: 'white' }}>
          <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, marginTop: 28 }}>
            <View style={{ width: 35, justifyContent: 'flex-start', backgroundColor: 'transparent' }}>
              <TouchableOpacity
                style={{ width: 35, height: 35, borderRadius: 35 / 2, backgroundColor: '#8374b1', alignItems: 'center', justifyContent: 'center' }}
                onPress={this._onPressButton}
              >
                <Image style={{ height: 11, width: 11, }} source={Images.BackIcon} />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>

              <Image style={{ height: 100, width: 100 }} source={Images.MainLogo} />
            </View>

          </View>
          <View style={{ width: '90%', backgroundColor: 'white', marginTop: '10%', marginLeft: '5%' }}>
            <Text style={[Helpers.bold, { fontSize: 22, lineHeight: 33, width: '90%', color: '#152C52' }]}>
              {"Confim Shipping address"}
            </Text>
            <Text style={[{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: 15, lineHeight: 18, fontWeight: '500', width: '90%', color: '#152C52', marginTop: '2%' }]}>
              {"123 Pacific BLVD, San Diego, California 90372"}
            </Text>
            <Text style={[Helpers.lightBook, { fontSize: 15, lineHeight: 18, fontWeight: '500', width: '90%', color: '#815CCC', marginTop: '2%' }]}>
              {"Change"}
            </Text>
            <Text style={[Helpers.bold, { fontSize: 18, lineHeight: 27, width: '90%', color: '#152C529', marginTop: 60 }]}>
              {"Add Payment Details"}
            </Text>

          </View>


          <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'center' }}>

            <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, this.renderError("address") ? { borderColor: Colors.error } : { borderColor: Colors.facilityColor }]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill, { color: Colors.facilityColor }]}
              placeholder={this.props.selectedMessage["AddFacility-FacilityAddress"]}
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) => this.onInputChange({ id: 'address', value })}
              value={this.state.inputs.address.value}
              //inputLabl={this.props.selectedMessage["AddFacility-FacilityAddress"]}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable, { color: Colors.facilityColor }]}
              hasEvent={false}
              maxLength={100}
              hasRightIcon={true}
              rightIcon={this.state.inputs["address"].touched ? this.renderError("address") ? Images.InValid : Images.ValidGreen : null}

            />


            <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, this.renderError("zipCode") ? { borderColor: Colors.error } : { borderColor: Colors.facilityColor }]}
              inputBoxstyle={[Helpers.txtRoundInputs, { color: Colors.facilityColor }]}
              placeholder={this.props.selectedMessage["AddFacility-ZipCode"]}
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) => this.onInputChange({ id: 'zipCode', value })}
              onEndEditing={this._onZipCodeInputBlur.bind(this)}
              value={this.state.inputs.zipCode.value}
              //inputLabl={this.props.selectedMessage["AddFacility-ZipCode"]}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              inputBoxLableStyle={[Helpers.inputBoxLable, { color: Colors.facilityColor }]}
              rightIconStyle={[Helpers.rightIconStyle]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={7}
              rightIcon={this.state.inputs["zipCode"].touched ? this.renderError("zipCode") ? Images.InValid : Images.ValidGreen : null}

            >

            </CustomInputBox>



            {/* 
<Text  style={[Helpers.inputBoxLable,{color: Colors.facilityColor}]}>
        {this.state.inputs.phoneNumber.value? this.props.selectedMessage["AddFacility-FacilityPhoneNumber"] :null}
        </Text> */}
            <View style={[Helpers.txtRoundInputContainer, { marginTop: 10 }, this.renderError("phoneNumber") ? { borderColor: Colors.error } : { borderColor: Colors.facilityColor }]}>
              <TextInputMask
                placeholder={this.props.selectedMessage["AddFacility-FacilityPhoneNumber"]}
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
                  ddlContainerStyle={[Helpers.buttonContainer, Metrics.smallVerticalMargin, { backgroundColor: 'transparent', borderWidth: 0.8, borderRadius: 10 }, this.renderError("state") ? { borderColor: Colors.error } : { borderColor: Colors.facilityColor }]}
                  // add Condition
                  ddlLableStyle={[{ width: '70%', paddingLeft: 16, }, { color: Colors.facilityColor }]}
                  ddlIconContainerStyle={[{ width: '30%' }]}
                  ddlIconStyle={[Helpers.rightIconStyle]}
                  popUpListItemTextStyle={[Helpers.popUpListItemTextStyle, { color: Colors.facilityColor }]}
                  popUpListItemStyle={[Helpers.popUpListItemStyle]}
                  popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                  popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                  popUpTitleStyle={[Helpers.popUpTitleStyle, { backgroundColor: Colors.facilityColor }]}
                  popUpTitleAlign={"left"}
                  popUpTitleText={this.props.selectedMessage["RegisterProfile-State"] + " *"}

                  popUpListSrc={this.props.extractedCityState ? this.props.extractedCityState.stateList : []}
                  popUpIsSelected={this.state.statePopUpIsSelected}
                  popUpSelectedValue={this.state.selectedStateValue}
                  popUpSelectedLable={this.state.selectedStateLable}
                  popUpKey={"value"}
                  popUpListItemOnChange={this.popUpStateListItemOnChange.bind(this)}
                  leftIcon={this.state.selectedStateValue ? Images.DDLWhite : Images.DDLGreen}
                  openPopUp={this.props.extractedCityState ? this.props.extractedCityState.stateList.length > 0 : false}
                >

                </CustomDDLPopUp>


              </View>
              <View style={{ width: '45%', backgroundColor: 'transparent' }}>




                <CustomDDLPopUp

                  // add Condition
                  ddlContainerStyle={[Helpers.buttonContainer, Metrics.smallVerticalMargin, { backgroundColor: 'transparent', borderWidth: 0.8, borderRadius: 10 }, this.renderError("city") ? { borderColor: Colors.error } : { borderColor: Colors.facilityColor }]}
                  // add Condition
                  ddlLableStyle={[{ width: '70%', paddingLeft: 16, }, { color: Colors.facilityColor }]}
                  ddlIconContainerStyle={[{ width: '30%' }]}
                  ddlIconStyle={[Helpers.rightIconStyle]}
                  popUpListItemTextStyle={[Helpers.popUpListItemTextStyle, , { color: Colors.facilityColor }]}
                  popUpListItemStyle={[Helpers.popUpListItemStyle]}
                  popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                  popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                  popUpTitleStyle={[Helpers.popUpTitleStyle, { backgroundColor: Colors.facilityColor }]}
                  popUpTitleAlign={"left"}
                  popUpTitleText={this.props.selectedMessage["RegisterProfile-City"] + " *"}

                  popUpListSrc={this.state.cityList}
                  popUpIsSelected={this.state.cityPopUpIsSelected}
                  popUpSelectedValue={this.state.selectedCityValue}
                  popUpSelectedLable={this.state.selectedCityLable}
                  popUpKey={"value"}
                  popUpListItemOnChange={this.popUpCityListItemOnChange.bind(this)}
                  leftIcon={this.state.selectedCityValue ? Images.DDLWhite : Images.DDLGreen}
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

          </View>

        </View>
        <View style={{ width: '90%', height: '3%', backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', marginLeft: '5%', marginTop: '5%' }}>
          <Image
            source={Images.Checkbox}
            style={{ width: 10, height: 10 }}
          />

          <Text style={[{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: 12, lineHeight: 18, fontWeight: '600', color: '#152C52', marginLeft: '5%' }]}>
            {"Billing Address Is Same As Shipping Address"}

          </Text>


        </View>
        <View style={{ width: '90%', height: '3%', backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', marginLeft: '5%' }}>
          <Image
            source={Images.Checkbox}
            style={{ width: 10, height: 10 }}
          />

          <Text style={[{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: 12, lineHeight: 18, fontWeight: '600', color: '#152C52C', marginLeft: '5%' }]}>
            {"Save Payment Details For Later"}

          </Text>


        </View>

        <TouchableOpacity style={{ width: '90%', height: '8%', borderRadius: 10, backgroundColor: '#815CCC', justifyContent: "center", marginTop: '2%', marginBottom: '2%', marginLeft: '5%' }}>


          <Text style={[{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: 20, fontWeight: '500', color: '#FFFFFF', width: '80%', textAlign: 'center', alignItems: 'center' }]}>
            {"Pay Now"}

          </Text>

        </TouchableOpacity>
      </SafeAreaView>


    );
  }
}


Shipping.propTypes = {

  authenticatedIsLoading: PropTypes.bool,
  emailExistErrorMessage: PropTypes.string,
  accountType: PropTypes.number,
  checkEmailExist: PropTypes.func,
  resetEmailExistingStates: PropTypes.func,
  selectedMessage: PropTypes.any,

}


const mapStateToProps = (state) => ({
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  emailExistErrorMessage: state.authenticate.emailExistErrorMessage,
  accountType: state.authenticate.accountType,
  selectedMessage: state.startup.selectedMessage

})

const mapDispatchToProps = (dispatch) => ({
  checkEmailExist: (data) => dispatch(AuthenticateActions.checkEmailExist(data)),
  resetEmailExistingStates: () => dispatch(AuthenticateActions.resetEmailExistingStates()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shipping)

const styles = StyleSheet.create({
  searchTextInput: {
    height: '100%',

    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    width: '40%',
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'center'


  },
  tile: {
    backgroundColor: 'transparent',
    width: '40%',
    height: '50%',
    marginTop: '5%',
    marginHorizontal: 30,
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#818e97',
    borderRadius: 10,

    //paddingHorizontal:'5%'
  },
});