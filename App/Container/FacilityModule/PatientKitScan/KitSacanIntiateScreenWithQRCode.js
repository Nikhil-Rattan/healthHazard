import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Successanimation from './../../Animations/Successanimation';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Helpers,
  ApplicationStyles,
} from 'App/Theme';
import PatientProfileActions from 'App/Stores/PatientProfile/Actions';

import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CustomHeader from 'App/Components/CustomHeader';
import ButtonWithTextandImage from 'App/Components/ButtonWithTextandImage';
import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
class KitSacanIntiateScreenWithQRCode extends ValidationComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.resetPatientInfoMessageByKitNo();
  }

  _onPressButton() {
    NavigationService.navigate('EnterTestResultWithQR');
  }

  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }
  CapitalizeFirstLetter(str) {
    return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  }

  _onGoToDashboard() {
    NavigationService.navigateAndReset('FacilityHome');
  }

  render() {
    let { currentPatient } = this.props;

    console.log(currentPatient);
    const alertColor = currentPatient?.HasKitIntiatedIssue
      ? Colors.ErrorREdColor
      : Colors.facilityColor;
    if (currentPatient) {
      return (
        // <SafeAreaView style={[Helpers.fill, { backgroundColor: Colors.buttonPURPLEcolor }]}>
        //   <Image
        //     resizeMode='cover'
        //     source={currentPatient?.HasKitIntiatedIssue ? Images.NoPatientImage : Images.InitiatedImage}
        //     style={{ width: '100%', flex: 1 }}
        //   />

        <SafeAreaView
          style={[
            Helpers.fill,
            {
              backgroundColor: currentPatient?.HasKitIntiatedIssue
                ? 'red'
                : Colors.facilityColor,
              height: '100%',
              position: 'relative',
            },
          ]}>
          <View
            style={[
              {
                backgroundColor: alertColor,
                position: 'absolute',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingBottom: currentPatient?.HasKitIntiatedIssue ? 150 : 50,
              },
            ]}>
            <Successanimation />

            {currentPatient?.HasKitIntiatedIssue ? (
              <Text
                style={[
                  Helpers.bold,
                  {
                    fontSize: 25,
                    color: 'white',
                    textAlign: 'left',
                    width: '90%',
                    marginLeft: 20,
                  },
                ]}>
                {
                  this.props.selectedMessage[
                  'Information-Screen-TheCOVISTIXTestKitisnotassociatedwithapatient'
                  ]
                }
              </Text>
            ) : (
              <Text
                style={[
                  Helpers.bold,
                  {
                    fontSize: 30,
                    color: 'white',
                    textAlign: 'left',
                    width: '90%',
                    marginLeft: 20,
                  },
                ]}>
                {this.props.selectedMessage['InitTest-InitiateTest']}
              </Text>
            )}
            {currentPatient?.HasKitIntiatedIssue ? (
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 20,
                    color: 'white',
                    textAlign: 'left',
                    width: '90%',
                    marginLeft: 20,
                  },
                ]}>
                {this.props.selectedMessage[
                  'Information-Screen-ThistestkitNotConnectedToPatient'
                ]
                  .toString()
                  .replace(
                    '(kitNo)',
                    '(QR Code: ' + this.props.currentPatient?.KitNo + ')',
                  )}
              </Text>
            ) : (
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 17,
                    color: 'white',
                    textAlign: 'left',
                    width: '90%',
                    marginLeft: 20,
                  },
                ]}>
                {this.props.selectedMessage[
                  'InitTest-SuccessfullyPatientConnectWithKit'
                ]
                  .replace(
                    '(name)',
                    this.CapitalizeFirstLetter(
                      this.props.currentPatient?.FirstName,
                    ) +
                    ' ' +
                    this.CapitalizeFirstLetter(
                      this.props.currentPatient?.LastName,
                    ),
                  )
                  .replace(
                    '(Phone)',
                    this.props.currentPatient
                      ? this.formatPhoneNumber(
                        this.props.currentPatient?.PhoneNo,
                      )
                      : '',
                  )
                  .replace('(Kit Code)', this.props.currentPatient?.KitNo)}
              </Text>
            )}
          </View>

          <View
            style={{
              bottom: 0,
              height: 150,
              width: '100%',
              position: 'absolute',
              backgroundColor: !currentPatient?.HasKitIntiatedIssue
                ? '#28998D'
                : '#fa2a2a',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            {!currentPatient?.HasKitIntiatedIssue ? (
              <View style={[Helpers.btnContainer, { marginBottom: 8 }]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                  style={[
                    Helpers.bigBtnGradient,
                  ]}>
                  <TouchableOpacity
                    style={Helpers.btn}
                    onPress={this._onPressButton.bind(this)}>
                    <Text
                      style={[
                        Helpers.btnText,
                        { color: Colors.facilityColor, fontSize: 15 },
                      ]}>
                      {' '}
                      {
                        this.props.selectedMessage['InitTest-EnterTestResults']
                      }{' '}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ) : null}
            {!currentPatient?.HasKitIntiatedIssue ? (
              <View style={[Helpers.btnContainer, { marginBottom: 15 }]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#28998D', '#28998D', '#28998D']}
                  style={[Helpers.bigBtnGradient]}>
                  <TouchableOpacity
                    style={[
                      Helpers.btn,
                      { borderWidth: 1, borderColor: 'white', borderRadius: 15 },
                    ]}
                    onPress={this._onGoToDashboard.bind(this)}>
                    <Text
                      style={[
                        Helpers.btnText,
                        { color: Colors.white, fontSize: 15 },
                      ]}>
                      {' '}
                      {
                        this.props.selectedMessage['InitTest-GoToDashboard']
                      }{' '}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ) : (
              <View style={[Helpers.btnContainer, { marginBottom: 15 }]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                  style={[Helpers.bigBtnGradient]}>
                  <TouchableOpacity
                    style={[
                      Helpers.btn,
                      { borderWidth: 1, borderColor: 'red', borderRadius: 15 },
                    ]}
                    onPress={this._onGoToDashboard.bind(this)}>
                    <Text
                      style={[Helpers.btnText, { color: 'red', fontSize: 15 }]}>
                      {' '}
                      {
                        this.props.selectedMessage['InitTest-GoToDashboard']
                      }{' '}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            )}
          </View>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  }
}

KitSacanIntiateScreenWithQRCode.propTypes = {
  currentPatient: PropTypes.any,
  selectedMessage: PropTypes.any,
  // authenticatedIsLoading: PropTypes.bool,
  // authenticatedErrorMessage: PropTypes.string,
  // authenticateUser: PropTypes.func ,
  // resetAuthenticateStates:PropTypes.func
  resetPatientInfoMessageByKitNo: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentPatient: state.patientProfile.currentPatient,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  resetPatientInfoMessageByKitNo: () =>
    dispatch(PatientProfileActions.resetPatientInfoMessageByKitNo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KitSacanIntiateScreenWithQRCode);

const styles = StyleSheet.create({});
