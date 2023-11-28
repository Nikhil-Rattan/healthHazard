import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import { Helpers, Fonts, Images } from 'App/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Enums } from 'App/Enums'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

class FacilitySignUp extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "", lastName: "", email: "",
      facilityName: '', Contact: '', Address: '',
      password: "", confirmPassword: "", userName: "", lic: "", faxNo: ""
    };

  }

  componentDidMount() {
    this.props.resetAuthenticateStates()
  }


  _onPressButton() {
    // Call ValidationComponent validate method 
    const { firstName, lastName, email, facilityName, password, lic, confirmPassword, userName, Contact, Address, faxNo } = this.state;

    if (firstName == '') {
      this.setState({ errorFirstName: true })
    }
    else if (lastName == '') {
      this.setState({ errorLastName: true })
    }
    else if (userName == '') {
      this.setState({ errorUserName: true })
    }
    else if (email == '') {
      this.setState({ ErrorStateEmail: true })
    }
    else if (lic == '') {
      this.setState({ errorNPILIC: true })
    }
    else if (facilityName == '') {
      this.setState({ errorFacilityName: true })
    }
    else if (Contact == '') {
      this.setState({ ErrorStateMobile: true })
    }
    else if (Address == '') {
      this.setState({ errorAddress: true })
    }
    else if (password == '') {
      this.setState({ ErrorStatePass: true })
    }
    else if (confirmPassword == '') {
      this.setState({ errorStateConfirmPassword: true })
    }
    else {
      let payload = {
        FirstName: firstName,
        LastName: lastName,
        FacilityName: facilityName,
        Address1: Address,
        Address2: '',
        Phone: Contact,
        Fax: faxNo,
        UserName: userName,
        Email: email,
        NpiLicense: lic,
        Password: password,
        UserRoleId: Enums.Facility,
        DOB: null
      }
      this.props.saveRegistration(payload)
    }
  }

  firstNameChangeText(txt) {
    if (txt != "") {
      this.setState({ firstName: txt, errorFirstName: false })
    }
    else {
      this.setState({ firstName: txt, errorFirstName: true })
    }
  }

  lasttNameChangeText(txt) {
    if (txt != "") {
      this.setState({ lastName: txt, errorLastName: false })
    }
    else {
      this.setState({ lastName: txt, errorLastName: true })
    }
  }

  UserNameChangeText(txt) {
    if (txt != "") {
      this.setState({ userName: txt, errorUserName: false })
    }
    else {
      this.setState({ userName: txt, errorUserName: true })
    }
  }

  Emailvalidate = (txt) => {

    if (txt == '') {
      this.setState({ email: txt, ErrorStateEmail: true })
    }
    else {
      this.setState({ email: txt, ErrorStateEmail: false })
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(txt) === false) {

      this.setState({ email: txt, invalidEmail: true })
      return false;
    }
    else {
      this.setState({ email: txt, invalidEmail: false })

    }
  }

  Facilityvalidate(txt) {
    if (txt != "") {
      this.setState({ facilityName: txt, errorFacilityName: false })
    }
    else {
      this.setState({ facilityName: txt, errorFacilityName: true })
    }
  }

  NPI_LICvalidate(txt) {
    if (txt != "") {
      this.setState({ lic: txt, errorNPILIC: false })
    }
    else {
      this.setState({ lic: txt, errorNPILIC: true })
    }
  }

  FaxNovalidate(txt) {
    this.setState({ faxNo: txt })
  }


  ContactNovalidate(text) {
    if (text == '') {
      this.setState({ Contact: text, ErrorStateMobile: true })
    }
    else {
      this.setState({ Contact: text, ErrorStateMobile: false })
    }

    let reg = /^((\+)?(\d{2}[-]))?(\d{10}){1}?$/;
    if (reg.test(text) === false) {
      this.setState({ Contact: text, invalidphoneno: true })
    }
    else {
      this.setState({ Contact: text, invalidphoneno: false })

    }
  }

  Addressvalidate(txt) {
    if (txt != "") {
      this.setState({ Address: txt, errorAddress: false })
    }
    else {
      this.setState({ Address: txt, errorAddress: true })
    }
  }

  passwordValidation(text) {
    if (text == '') {
      this.setState({ password: text, ErrorStatePass: true, })

    } else if (text !== "undefined") {
      if (text.length < 8 || text.length > 15) {
        this.setState({ password: text, InvalidPassLength: true, ErrorStatePass: false })

      } else if (
        !text.match(
          /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/
        )
      ) {
        this.setState({ password: text, InvalidPass: true, InvalidPassLength: false, })
      } else {

        this.setState({ password: text, InvalidPass: false, InvalidPassLength: false, ErrorStatePass: false, disablebuttoncolor: false, textPassboxbordercolor: false })
      }

    }

  }

  _Confirmvalidate(text) {
    if (text == '') {
      this.setState({ confirmPassword: text, errorStateConfirmPassword: true, })
    }
    else {
      this.setState({ confirmPassword: text, errorStateConfirmPassword: false, })
    }
    if (text != this.state.password) {
      this.setState({ confirmPassword: text, mismatchPassword: true, })
    }
    else {
      this.setState({ confirmPassword: text, mismatchPassword: false, })
    }
  }

  render() {

    return (
      <SafeAreaView >

        <Dialog
          dialogStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          visible={this.props.authenticatedIsLoading}
        >
          <DialogContent style={{ backgroundColor: 'transparent' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={Images.Loaderimg}
                style={{ alignItems: 'center', resizeMode: 'center', marginTop: 17 }}
              />

            </View>
          </DialogContent>
        </Dialog>
        <ScrollView     >


          <Text style={[Fonts.h3, { textAlign: 'center', width: '100%', marginTop: 20, marginBottom: 20 }]}>
            Create an account
          </Text>

          <View style={{ flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>

            <View style={Helpers.txtInputContainer} >

              <TextInput style={Helpers.txtInputs}
                placeholder='Facility Name'
                value={this.state.facilityName}
                onChangeText={(text) => this.Facilityvalidate(text)}

              />
            </View >
            {this.state.errorFacilityName ?
              <Text style={Helpers.errorMessage}>
                * Please enter facility name to proceed.
              </Text>
              : null}

            <View style={Helpers.txtInputContainer} >
              <TextInput style={Helpers.txtInputs}
                placeholder='First Name'
                value={this.state.firstName}
                onChangeText={(text) => this.firstNameChangeText(text)}
              />
            </View >
            {this.state.errorFirstName ?
              <Text style={Helpers.errorMessage}>
                * Please enter  first name to proceed.
              </Text>
              : null}
            <View style={Helpers.txtInputContainer} >
              <TextInput style={Helpers.txtInputs}
                placeholder='Last Name'
                value={this.state.lastName}
                onChangeText={(text) => this.lasttNameChangeText(text)}

              />
            </View >
            {this.state.errorLastName ?
              <Text style={Helpers.errorMessage}>
                * Please enter  last name to proceed.
              </Text>
              : null}

            <View style={Helpers.txtInputContainer} >
              <TextInput style={Helpers.txtInputs}
                placeholder='User Name'
                value={this.state.userName}
                onChangeText={(text) => this.UserNameChangeText(text)}
              />
            </View >
            {this.state.errorUserName ?
              <Text style={Helpers.errorMessage}>
                * Please enter  User name to proceed.
              </Text>
              : null}
            <View style={Helpers.txtInputContainer} >

              <TextInput style={Helpers.txtInputs}
                placeholder='E-mail'
                value={this.state.email}
                onChangeText={(text) => this.Emailvalidate(text)}
              />
            </View >
            {this.state.ErrorStateEmail ? (
              <Text style={Helpers.errorMessage}>
                * Please enter email to proceed.
              </Text>)
              : this.state.invalidEmail ? (
                <Text style={Helpers.errorMessage}>
                  * Invalid email address !.
                </Text>
              ) : null}
            <View style={Helpers.txtInputContainer} >

              <TextInput style={Helpers.txtInputs}
                placeholder='NPI/LIC #'
                value={this.state.lic}
                onChangeText={(text) => this.NPI_LICvalidate(text)}

              />
            </View >
            {this.state.errorNPILIC ?
              <Text style={Helpers.errorMessage}>
                * Please enter npi/lic name to proceed.
              </Text>
              : null}



            <View style={Helpers.txtInputContainer} >

              <TextInput style={Helpers.txtInputs}
                placeholder='Fax No.'
                value={this.state.faxNo}
                onChangeText={(text) => this.FaxNovalidate(text)}
              />
            </View >

            <View style={Helpers.txtInputContainer} >
              <TextInput style={Helpers.txtInputs}
                placeholder="Contact No."
                placeholderTextColor="#595959"
                value={this.state.Contact}
                underlineColorAndroid='transparent'
                keyboardType='phone-pad'
                onChangeText={(text) => this.ContactNovalidate(text)}

              />
            </View>
            {this.state.ErrorStateMobile ? (
              <Text style={Helpers.errorMessage}>
                * Please enter the contact No. to proceed!.
              </Text>
            ) : this.state.invalidphoneno ? (
              <Text style={Helpers.errorMessage}>
                * Invalid contact No. !.
              </Text>
            ) : this.state.MobilenoExist ? (
              <Text style={Helpers.errorMessage}>
                * Contact No. already exist!.
              </Text>
            ) : null}


            <View style={Helpers.txtInputContainer} >

              <TextInput style={Helpers.txtInputs}
                placeholder="Address"
                placeholderTextColor="#595959"
                underlineColorAndroid='transparent'
                value={this.state.Address}
                onChangeText={(text) => this.Addressvalidate(text)}


              />
            </View>
            {this.state.errorAddress ?
              <Text style={Helpers.errorMessage}>
                * Please enter address to proceed.
              </Text>
              : null}

            <View style={Helpers.txtInputContainer} >
              <TextInput style={Helpers.txtInputs} ref="password"
                placeholder='Password'
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) => this.passwordValidation(text)}
              />
            </View >
            {this.state.ErrorStatePass ? (
              <Text style={Helpers.errorMessage}>
                * Enter password to proceed !.
              </Text>
            ) : this.state.InvalidPassLength ? (
              <Text style={Helpers.errorMessage}>
                * Password at least 8-15 characters long !.
              </Text>
            ) : this.state.InvalidPass ? (
              <Text style={Helpers.errorMessage}>
                * One upper, lower and special character.
              </Text>
            ) : null}
            <View style={Helpers.txtInputContainer} >
              <TextInput style={Helpers.txtInputs} ref="confirmPassword"
                placeholder='Confirm Password'
                secureTextEntry={true}
                value={this.state.confirmPassword}
                onChangeText={text => this._Confirmvalidate(text)}
              />
            </View >
            {this.state.errorStateConfirmPassword ?
              (
                <Text style={Helpers.errorMessage}>
                  * Please confirm password to proceed!.
                </Text>
              ) : this.state.mismatchPassword ? (
                <Text style={Helpers.errorMessage}>
                  * Mismatch Password!.
                </Text>
              ) : null}

            <View style={Helpers.btnContainer}>
              <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#1e9a8d', '#2b9d91', '#2b9d91']} style={Helpers.btnGradient} >
                <TouchableOpacity style={Helpers.btn}
                  onPress={this._onPressButton.bind(this)}
                >
                  <Text style={Helpers.btnText}>Register </Text>

                </TouchableOpacity>

              </LinearGradient>
            </View>

          </View>

          <View style={{ marginBottom: 50 }}>

          </View>

        </ScrollView>


      </SafeAreaView>
    );
  }

}

FacilitySignUp.propTypes = {

  registrationErrorMessage: PropTypes.string,
  registrationSuccessMessage: PropTypes.string,
  authenticatedIsLoading: PropTypes.bool,
  saveRegistration: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,

}
// getting states from reducers
const mapStateToProps = (state) => ({

  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  registrationSuccessMessage: state.authenticate.registrationSuccessMessage,
  registrationErrorMessage: state.authenticate.registrationErrorMessage,


})
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions 
const mapDispatchToProps = (dispatch) => ({

  saveRegistration: (data) => dispatch(AuthenticateActions.saveRegistration(data)),
  resetAuthenticateStates: () => dispatch(AuthenticateActions.resetAuthenticateStates()),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilitySignUp)
