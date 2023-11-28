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
  Helpers,
} from 'App/Theme';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import NavigationService from 'App/Services/NavigationService';

class KitSacanIntiateScreen extends ValidationComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() { }

  _onPressButton() {
    NavigationService.navigate('FacilityEnterTestResult');
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
    let { kitScanResponse } = this.props;
    const alertColor = kitScanResponse?.HasKitIntiatedIssue
      ? Colors.ErrorREdColor
      : Colors.facilityColor;
    return (
      <SafeAreaView
        style={[
          {
            backgroundColor: kitScanResponse?.HasKitIntiatedIssue
              ? 'red'
              : Colors.facilityColor,
            position: 'relative',
            height: '100%',
            paddingBottom: 150,
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
              paddingBottom: 25,
            },
          ]}>
          <Successanimation />
          {kitScanResponse?.HasKitIntiatedIssue ? (
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
              {/* //No Patient Connected */}
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

          {kitScanResponse?.HasKitIntiatedIssue ? (
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
                  '' +
                  this.CapitalizeFirstLetter(
                    this.props.buildProfilePayload?.FirstName,
                  ) +
                  ' ' +
                  this.CapitalizeFirstLetter(
                    this.props.buildProfilePayload?.LastName,
                  ) +
                  '',
                )
                .replace(
                  '(Phone)',
                  '' + this.props.buildProfilePayload
                    ? this.formatPhoneNumber(
                      this.props.buildProfilePayload?.PhoneNo,
                    ) + ''
                    : '',
                )
                .replace(
                  '(Kit Code)',
                  '' + this.props.kitScanResponse?.KitNo + '',
                )}
            </Text>
          )}
        </View>

        <View
          style={{
            bottom: 0,
            height: 150,
            position: 'absolute',
            width: '100%',
            backgroundColor: kitScanResponse?.HasKitIntiatedIssue
              ? Colors.ErrorREdColor
              : Colors.facilityColor,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          {!kitScanResponse?.HasKitIntiatedIssue ? (
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

          {!kitScanResponse?.HasKitIntiatedIssue ? (
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
                    {this.props.selectedMessage['InitTest-GoToDashboard']}{' '}
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
                  <Text style={[Helpers.btnText, { color: 'red', fontSize: 15 }]}>
                    {' '}
                    {this.props.selectedMessage['InitTest-GoToDashboard']}{' '}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

KitSacanIntiateScreen.propTypes = {
  kitScanResponse: PropTypes.any,
  recentlyAddedPatientResponse: PropTypes.any,
  buildProfilePayload: PropTypes.any,
  selectedMessage: PropTypes.any,
};

const mapStateToProps = (state) => ({
  kitScanResponse: state.patientProfile.kitScanResponse,
  recentlyAddedPatientResponse:
    state.facilityProfile.recentlyAddedPatientResponse,
  buildProfilePayload: state.authenticate.buildProfilePayload,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KitSacanIntiateScreen);

const styles = StyleSheet.create({});
