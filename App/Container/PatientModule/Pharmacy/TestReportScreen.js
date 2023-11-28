import React, { Component } from 'react';
import {
  StyleSheet,
  Text, Linking,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image, TextInput,
  Alert, SearchBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ResultAnimation from './../../Animations/ResultAnimation'
import { KeyboardAvoidingView } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Metrics, Helpers, ApplicationStyles } from 'App/Theme'

import Dialog, { DialogContent } from 'react-native-popup-dialog';

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'
import ListCard from 'App/Components/ListCard';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import TestReportTopHeader from 'App/Components/TestReportTopHeader';
import QRCode from 'react-native-qrcode-svg';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';

class TestReportScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      Phonenoforhelp: '+1 (800) 203-5108)'
    }
  }

  _onBackButton() {
    NavigationService.popScreen()
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
  _seeGuidelines() {
    NavigationService.navigate('FAQNewScreen', { PositiveFAQ: 0 })
  }
  render() {
    let reportDeatil = this.props.route.params.reportDeatil;

    return (
      <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>

        <ScrollView>
          <View style={{ top: 0 }}>
            <View style={{ height: 300, width: '100%', position: 'absolute', backgroundColor: reportDeatil.Color }}>
              <ResultAnimation />
            </View>
            <TestReportTopHeader
              TopText={this.props.selectedMessage["PatResult-COVID19RapidAntigenTestResults"]}
              TestResultTest={this.props.selectedMessage["TestResult-" + reportDeatil.ResultName]}
              //  BGColor={reportDeatil.Color}
              //TopHeaderResultImage={reportDeatil.Color == '#614698' ? Images.TopHeaderPurpleImageTest : reportDeatil.Color == Colors.facilityColor ? Images.TopHeaderGreenImageTest : Images.TopHeaderRedImageTest}
              onPressBackButton={this._onBackButton.bind(this)}
            />
          </View>
          <View style={{ alignItems: 'center', minHeight: 50, paddingVertical: 8, backgroundColor: reportDeatil.headerColor, width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[{ color: reportDeatil.Color, fontSize: 14, textAlign: 'center' }, Helpers.mediumFont]}>
              {this.props.selectedMessage["PatResult-TestKitId"]}: {reportDeatil.KitNo}</Text>
          </View>

          <View style={{ height: 50, backgroundColor: 'white', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text numberOfLines={1} style={[{ width: '37%', color: Colors.Black, marginLeft: 8, height: 50, fontSize: 13, marginTop: 8 }, Helpers.mediumFont]}>
              {this.props.selectedMessage["PatResult-TestDate"]}
            </Text>
            <Text numberOfLines={1} style={[{ textAlign: 'right', width: '58%', color: Colors.lightblack, height: 50, marginRight: 8, fontSize: 13, marginTop: 8 }, Helpers.mediumFont]}>
              {reportDeatil.TestDate} PST</Text>
          </View>


          <View style={{ height: 50, backgroundColor: 'white', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text numberOfLines={1} style={[{ width: '40%', color: Colors.Black, marginLeft: 8, height: 50, fontSize: 13, marginTop: 8 }, Helpers.mediumFont]}>
              {this.props.selectedMessage["PatResult-TimeOfResults"]}
            </Text>
            <Text numberOfLines={1} style={[{ textAlign: 'right', width: '55%', color: reportDeatil.Color, height: 50, marginRight: 8, fontSize: 13, marginTop: 8 }, Helpers.mediumFont,]}>
              {reportDeatil.TestDateResult} PST</Text>
          </View>


          {/* <View style={{ height: 50, backgroundColor: 'white', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text numberOfLines={1} style={[{ width: '35%', backgroundColor: 'transparent', color: Colors.Black, marginLeft: 8, height: 50, fontSize: 13, }, Helpers.mediumFont]}>
              {reportDeatil.IsFacility ? this.props.selectedMessage["PatResult-TestFacility"] : this.props.selectedMessage["EditPatientScreen-TelehealthResults"]}
            </Text>
            <Text numberOfLines={1} style={[{ textAlign: 'right', width: '60%', backgroundColor: 'transparent', color: Colors.Black, height: 50, marginRight: 8, fontSize: 13, }, Helpers.mediumFont]}>
              {reportDeatil.IsFacility ? reportDeatil.FacilityName : reportDeatil.TeleHealthName}</Text>
          </View> */}

          {reportDeatil.ResultName == 'Negative' ?
            <View style={{ height: 200, marginTop: 20, backgroundColor: Colors.white, flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
              <View style={{ flexDirection: 'row', height: 50, justifyContent: 'flex-start', marginLeft: 20, }}>

                <Image style={[Helpers.iconsmall, { marginRight: 5, marginTop: 2, }]} resizeMode='contain' source={Images.GreeninformationIcon} />

                <Text style={[Helpers.btnText, { color: reportDeatil.Color, fontSize: 20, textAlign: 'center', }, Helpers.mediumFont]}>

                  {this.props.selectedMessage["PatientDashboard-NeedHelp"]}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                <Text style={[Helpers.btnText, { color: 'black', fontSize: 15, textAlign: 'left', width: '90%' }]}>
                  {this.props.selectedMessage["PatientDashboard-NegativeTextResults"]}
                  {/* If you have questions about your test results or exhibiting symptoms, contact your healthcare professional. */}
                </Text>
              </View>



            </View>

            : reportDeatil.ResultName == 'Positive' ?
              <View style={{ height: 200, backgroundColor: Colors.white, flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                <View style={{ flexDirection: 'row', height: 50, justifyContent: 'flex-start', marginLeft: 20, }}>
                  <Image style={[Helpers.iconsmall, { marginRight: 7, marginTop: 2 }]} resizeMode='contain' source={Images.RedinformationIcon} />
                  <Text style={[Helpers.btnText, { color: reportDeatil.Color, fontSize: 20, textAlign: 'center', }, Helpers.mediumFont]}>
                    {this.props.selectedMessage["PatResult-Important!"]}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                  <Text style={[Helpers.btnText, { color: 'black', fontSize: 15, textAlign: 'left', width: '90%' }]}> {this.props.selectedMessage["PatResult-AlertMessage"]} </Text>
                </View>




              </View>


              : reportDeatil.ResultName == 'Inconclusive' ?


                <View style={{ height: 200, backgroundColor: Colors.white, flexDirection: 'column', justifyContent: 'flex-start', width: '100%', }}>
                  <View style={{ flexDirection: 'row', height: 50, justifyContent: 'flex-start', marginLeft: 20, }}>
                    <Image style={[Helpers.iconsmall, { marginRight: 5, marginTop: 2, }]} resizeMode='contain' source={Images.PurpleinformationIcon} />
                    <Text style={[Helpers.btnText, { color: reportDeatil.Color, fontSize: 20, textAlign: 'center', }, Helpers.mediumFont]}>
                      {this.props.selectedMessage["PatientDashboard-NextSteps"]}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                    <Text style={[Helpers.btnText, { color: 'black', fontSize: 15, textAlign: 'left', width: '90%', }]}>
                      {this.props.selectedMessage["PatientDashboard-InconclusiveTextResults"]}
                      {/* The results of your test are inconclusive.  Please contact the Sorrento Help line at +1 (800) 203-5108 or email CustomerService@covistix.com for a replacement test. */}
                    </Text>
                  </View>

                </View>

                : null}

          <View style={{ height: 150 }}></View>
        </ScrollView>

        {reportDeatil.ResultName == 'Negative' ?
          <View style={Helpers.bottomView}>
            <View style={[Helpers.btnContainer, { bottom: 0 }]}>

              <TouchableOpacity style={[Helpers.btn, { backgroundColor: Colors.facilityColor, width: '95%', alignSelf: 'center', }]}
                onPress={() => Linking.openURL(this.props.selectedMessage["Result-Link"])}
              >
                <Text style={[Helpers.btnText, { color: Colors.white, fontSize: 17, }]}>
                  {this.props.selectedMessage["PatientDashboard-NegativeBelowButtonText"]}
                </Text>

              </TouchableOpacity>
            </View>
          </View>
          : reportDeatil.ResultName == 'Positive' ?
            <View style={Helpers.bottomView}>
              <View style={[Helpers.btnContainer, { bottom: 0 }]}>
                <TouchableOpacity style={[Helpers.btn, { backgroundColor: 'red', width: '95%', alignSelf: 'center', }]}
                  onPress={this._seeGuidelines.bind(this)}
                >
                  <Text style={[Helpers.btnText, { color: Colors.white, fontSize: 14, }]}>
                    {this.props.selectedMessage["PatientDashboard-PositiveBelowButtonText"]}
                  </Text>

                </TouchableOpacity>
              </View>
            </View>
            : reportDeatil.ResultName == 'Inconclusive' ?
              <View style={[Helpers.bottomView, { height: 130 }]}>

                <TouchableOpacity style={[Helpers.btn, { backgroundColor: Colors.patientColor, width: '95%', alignSelf: 'center', }]}
                  onPress={this._CallPhoneNumber.bind(this, this.state.Phonenoforhelp)}
                >
                  <Image style={[Helpers.iconsmall, { marginRight: 5, }]} resizeMode='contain' source={Images.whitephoneIcon} />
                  <Text style={[Helpers.btnText, { color: Colors.white, fontSize: 17, }]}>
                    {this.props.selectedMessage["PatientDashboard-GiveUsACall"]}
                  </Text>

                </TouchableOpacity>
                <TouchableOpacity style={[Helpers.btn, { backgroundColor: 'white', width: '95%', alignSelf: 'center', marginTop: 8, borderWidth: 1, borderColor: Colors.patientColor }]}
                  onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=')}

                >
                  <Text style={[Helpers.btnText, { color: Colors.patientColor, fontSize: 17, }]}>
                    {this.props.selectedMessage["PatientDashboard-SendUsAnEmail"]}
                  </Text>

                </TouchableOpacity>

              </View>
              : null}

      </SafeAreaView>
    );
  }
}

TestReportScreen.propTypes = {
  authenticatedUser: PropTypes.any,
  selectedMessage: PropTypes.any
}

TestReportScreen.defaultProps = {
  onPressCard: () => { }
}

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,

})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestReportScreen)

const styles = StyleSheet.create({}); 
