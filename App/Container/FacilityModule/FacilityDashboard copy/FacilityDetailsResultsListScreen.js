import React, { Component } from 'react';
import {
  StyleSheet,
  Text, Linking,
  View,
  TouchableOpacity,
  Alert, SafeAreaView
} from 'react-native';

import PatientProfileActions from 'App/Stores/PatientProfile/Actions'
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme'
import TestResultList from 'App/Components/TestResultList';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions'
import NavigationService from 'App/Services/NavigationService'
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';

class FacilityDetailsResultsListScreen extends ValidationComponent {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    let itemDetail = this.props.route.params.itemDetail;

    let payload = {
      "PatientId": itemDetail.PatientId,
      "FacilityUserId": this.props.authenticatedUser?.FacilityUserId
    }

    this.props.getTestAllResults(payload)
  }

  getItemDetail(item) {

    NavigationService.navigate('PharmacyDetailsScreen', { itemDetail: item })

  }

  _GotoEditProfile() {

    NavigationService.navigate('ProfileScreen')
  }

  componentWillUnmount() {
    this.props.resetAllFacilityStates()
  }

  _CallPhoneNumber(phone) {

    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));

  }

  _gotoTestResult(item) {
    let GoToScreen = ""

    switch (item.ResultName) {

      case 'Positive':
        GoToScreen = { ...item, headerColor: '#fbd1d1', Color: "#f92a2a" }
        break;
      case 'Negative':
        GoToScreen = { ...item, headerColor: '#d1e7e5', Color: "#28998D" }
        break;
      default:
        GoToScreen = { ...item, headerColor: '#dcd7e7', Color: "#614698" }
        break;

    }

    NavigationService.navigate('TestReportScreen', { reportDeatil: GoToScreen })

  }

  _GotoBackScreen() {

    NavigationService.popScreen()
    this.props.resetAllPatientStates()
  }
  render() {

    let itemDetail = this.props.route.params.itemDetail;

    return (
      <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>

        <TopHeaderWithTwoOption
          fullComponentbackgroundColor={Colors.white}
          fullComponentHeight={60}
          IsImage={false}
          LeftImage={Images.GreenBackIcon}
          RightImage={Images.BackIcon}

          onPressLeftButton={this._GotoBackScreen.bind(this)}
        />


        <Text style={[Helpers.BoldTexttitle, { marginTop: 20, marginLeft: 15 }]}>
          {itemDetail.Email}
        </Text>

        <View style={{ backgroundColor: 'white', marginTop: 25, width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={{ width: '80%', flexDirection: 'column', justifyContent: 'flex-start' }}>

            <Text numberOfLines={2} style={[Helpers.bold, { fontSize: 22, marginLeft: 15, color: 'gray', textAlign: 'left', width: '90%' }]}>
              {itemDetail.DisplayPhoneNo}

            </Text>

          </View>

          <View style={{ width: '20%', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 15 }}>
              <TouchableOpacity onPress={this._CallPhoneNumber.bind(this, itemDetail.DisplayPhoneNo)}>
                <View style={{
                  width: 100, height: 45, flexDirection: 'row', borderRadius: 20, backgroundColor: Colors.patientColor, justifyContent: 'center', alignItems: 'center',
                }}>
                  <Text style={[Helpers.mediumFont, { fontSize: 15, color: 'white', textAlign: 'center', width: '90%' }]}>
                    {this.props.selectedMessage["CallScreen-Call"]}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 25 }}>
          <TestResultList
            onPressCard={this._gotoTestResult.bind(this)}
            listStyle={[{ alignItems: 'center', width: '100%' }]}
            hasPatientId={false}
            PatientId={itemDetail.PatientId}
            testAllResults={this.props.testAllResults}
          >
          </TestResultList>
        </View>

      </SafeAreaView>
    );
  }
}

FacilityDetailsResultsListScreen.propTypes = {
  certifiedAllTesters: PropTypes.any,
  allFacilityErrorMessage: PropTypes.string,
  isFacilityProfileLoading: PropTypes.bool,
  authenticatedUser: PropTypes.any,
  getAllCertifiedTesters: PropTypes.func,
  resetAllFacilityStates: PropTypes.func,
  resetAllPatientStates: PropTypes.func, // for Doing null values of FacilityPatientList
  testAllResults: PropTypes.any,
  testAllResultsErrorMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,
  getTestAllResults: PropTypes.func,
  selectedMessage: PropTypes.any,
}


const mapStateToProps = (state) => ({
  certifiedAllTesters: state.facilityProfile.certifiedAllTesters,
  allFacilityErrorMessage: state.facilityProfile.certifiedAllTestersErrorMessage,
  isFacilityProfileLoading: state.facilityProfile.isFacilityProfileLoading,
  testAllResults: state.patientProfile.testAllResults,
  testAllResultsErrorMessage: state.patientProfile.testAllResultsErrorMessage,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,

})

const mapDispatchToProps = (dispatch) => ({
  getAllCertifiedTesters: (data) => dispatch(FacilityProfileActions.getAllCertifiedTesters(data)),
  resetAllFacilityStates: () => dispatch(FacilityProfileActions.resetAllFacilityStates()),
  resetAllPatientStates: () => dispatch(PatientProfileActions.resetAllPatientStates()),
  getTestAllResults: (data) => dispatch(PatientProfileActions.getTestAllResults(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilityDetailsResultsListScreen)

const styles = StyleSheet.create({

});
