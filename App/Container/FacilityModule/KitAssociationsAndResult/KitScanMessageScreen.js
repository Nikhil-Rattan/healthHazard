import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Helpers,
} from 'App/Theme';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import NavigationService from 'App/Services/NavigationService';

class KitScanMessageScreen extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  _onPressButton() {
    NavigationService.navigate('EnterTestResult');
  }
  CapitalizeFirstLetter(str) {
    return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  }
  _onGoToDashboard() {
    NavigationService.navigateAndReset('FacilityHome');
  }

  render() {
    let { scanQRCodeSuccessResonse } = this.props;

    return (
      <SafeAreaView
        style={[
          {
            backgroundColor: Colors.patientColor,
            height: '100%',
            paddingBottom: 150,
          },
        ]}>

        <View
          style={[
            {
              backgroundColor: Colors.facilityColor,
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingBottom: 100,
            },
          ]}>
          {
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
          }

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
                  this.props.scanQRCodeSuccessResonse?.PatientFirstName,
                ) +
                ' ' +
                this.CapitalizeFirstLetter(
                  this.props.scanQRCodeSuccessResonse?.PatientLastName,
                ),
              )
              .replace(
                '(Phone)',
                this.props.scanQRCodeSuccessResonse?.PatientPhoneNo,
              )
              .replace(
                '(Kit Code)',
                this.props.scanQRCodeSuccessResonse?.KitNo,
              )}
          </Text>
        </View>

        <View
          style={{
            bottom: 0,
            position: 'absolute',
            height: 150,
            width: '100%',
            backgroundColor: '#28998D',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View style={[Helpers.btnContainer, { marginBottom: 8 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
              style={[
                Helpers.bigBtnGradient,
                { borderWidth: 1, borderColor: Colors.facilityColor },
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
                  {this.props.selectedMessage['InitTest-EnterTestResults']}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

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
                  {this.props.selectedMessage['InitTest-GoToDashboard']}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

KitScanMessageScreen.propTypes = {
  scanQRCodeSuccessResonse: PropTypes.any,
  selectedMessage: PropTypes.any,
};

const mapStateToProps = (state) => ({
  scanQRCodeSuccessResonse: state.facilityProfile.scanQRCodeSuccessResonse,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KitScanMessageScreen);

const styles = StyleSheet.create({});
