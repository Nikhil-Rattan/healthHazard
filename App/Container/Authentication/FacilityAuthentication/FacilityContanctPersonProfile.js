import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import { Helpers, Colors, Images } from 'App/Theme';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import CustomInputBox from 'App/Components/CustomInputBox';
import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import NavigationService from 'App/Services/NavigationService'

class FacilityContanctPersonProfile extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        firstName: {
          type: 'firstName',
          value: '',
        },
        lastName: {
          type: 'lastName',
          value: '',
        }
      }
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

  _onBackButtonPress() {
    NavigationService.popScreen()
  }
  _onSignUpPressButton() {

    const firstInvalidCoordinate = this.getFormValidation();
    if (firstInvalidCoordinate !== null) {
      return;
    }

    const { inputs } = this.state

    let { buildProfilePayload } = this.props
    let payload = {
      ...buildProfilePayload,
      "FirstName": inputs['firstName'].value.trim(),
      "LastName": inputs['lastName'].value.trim(),
    }
    this.props.saveBuildProfilePayload(payload)
    NavigationService.navigate('FacilityProfile')
  }

  renderContactForm() {
    return (

      <View style={{ flex: 1 }}>
        <ScrollView overScrollMode='auto' showsVerticalScrollIndicator={false}>
          <HeaderProgress
            rowStyle={[{
              height: 70, backgroundColor: 'transparent',
              justifyContent: 'center', alignItems: 'center',
              flexDirection: 'row'
            }]}
            progressStyle={[Helpers.headerLeftRow]}
            progressCount={30}
            rightColor={Colors.facilityColor}
            leftColor={'#FBFBFB'}
          />

          <View style={{ flexDirection: 'column', alignItems: "flex-start", justifyContent: "center", }}>

            <Text style={[Helpers.BoldTexttitle, { marginBottom: 15 }]}>{this.props.selectedMessage["RegisterCompleteProfile-CompleteYourProfile"]}</Text>

            <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, ,
            this.state.inputs['firstName'].touched
              ? this.renderError('firstName')
                ? { borderColor: Colors.error }
                : { borderColor: Colors.facilityColor }
              : { borderColor: Colors.GreyColor }
            ]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill, { color: Colors.facilityColor }]}
              placeholder={this.props.selectedMessage["RegisterCompleteProfile-EnterYourFirstName"]}
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

            <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, ,
            this.state.inputs['lastName'].touched
              ? this.renderError('lastName')
                ? { borderColor: Colors.error }
                : { borderColor: Colors.facilityColor }
              : { borderColor: Colors.GreyColor }
            ]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill, { color: Colors.facilityColor }]}
              placeholder={this.props.selectedMessage["RegisterCompleteProfile-EnterYourLastName"]}
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
          </View>
          <View style={{ height: 100 }}>

          </View>
        </ScrollView>

        <View style={Helpers.bottomView}>
          <View style={[Helpers.btnContainer, { bottom: 0 }]}>

            <TouchableOpacity style={[Helpers.btn, { backgroundColor: (this.state.inputs.lastName.value && this.state.inputs.firstName.value) == '' ? Colors.DisableGrayColor : Colors.facilityColor, width: '95%' }]}
              onPress={(this.state.inputs.lastName.value && this.state.inputs.firstName.value) == '' ? null : this._onSignUpPressButton.bind(this)}
            >
              <Text style={[Helpers.btnText, { color: Colors.white, fontSize: 17, }]}>
                {this.props.selectedMessage["InstructionSecondScreen-GoToStep"]} 2
              </Text>

            </TouchableOpacity>

          </View>
        </View>


      </View>

    )
  }
  _goBackscreen() {
    NavigationService.popScreen()
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
        {Platform.OS === "ios" ?
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={40}
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}
          >
            {this.renderContactForm()}
          </KeyboardAvoidingView>

          :
          <View
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}
          >
            {this.renderContactForm()}

          </View>
        }
      </SafeAreaView>
    );
  }

}

FacilityContanctPersonProfile.propTypes = {

  saveBuildProfilePayload: PropTypes.func,
  buildProfilePayload: PropTypes.any,
  selectedMessage: PropTypes.any,


}
// getting states from reducers
const mapStateToProps = (state) => ({
  buildProfilePayload: state.authenticate.buildProfilePayload,
  selectedMessage: state.startup.selectedMessage
})
// getting methods from actions
// 'AuthenticateActions' we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({

  saveBuildProfilePayload: (data) => dispatch(AuthenticateActions.saveBuildProfilePayload(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityContanctPersonProfile)