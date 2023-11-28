import React, { Component } from 'react';
import {
  StyleSheet,
  Text, View,
  TouchableOpacity, TouchableWithoutFeedback,
  Image, SafeAreaView
} from 'react-native';

import PatientProfileActions from 'App/Stores/PatientProfile/Actions'
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import NavigationService from 'App/Services/NavigationService'

class FindPatientScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchvalue: '', IsCancelButton: false,
      scaleAnimationDialogAlert: false, DayName: '', Date: ''
    };

  }
  componentDidMount() {

  }

  _GotoBackScreen() {

    NavigationService.popScreen()
  }
  goToTop = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  }
  onPressBack_Button() {
    NavigationService.popScreen()
  }

  _addPatient() {
    NavigationService.navigate('FacilityPatientProfileScreen')
  }

  render() {
    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let DayName = days[d.getDay()];
    let TodayDate = d.getDate();


    return (
      <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>


        <View style={[{
          height: 80, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center',
          shadowOffset: { width: 0.5, height: 0.5, },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 15,
        }]}>
          <TouchableOpacity
            style={{ width: 46, height: 46, borderRadius: 46 / 2, marginLeft: 9, backgroundColor: '#f6f5fa', alignItems: 'center' }}
            onPress={this.onPressBack_Button.bind(this)}
          >
            <Image style={{ height: 17, width: 17, marginTop: 16 }} source={Images.GreenBackIcon} />
          </TouchableOpacity>
          <Text style={[{
            color: Colors.facilityColor, textAlign: 'center', marginTop: 10,
            fontSize: 16,
            textAlign: 'left', marginRight: 10, fontFamily: 'gothamrounded-bold'
          }]}>{this.props.selectedMessage["FacilitiesPatientList-PatientsHeader"]} </Text>

          <Text style={[{
            color: Colors.facilityColor, textAlign: 'center', marginTop: 10,
            fontSize: 16,
            textAlign: 'left', color: 'transparent', marginRight: 10, fontFamily: 'gothamrounded-bold'
          }]}>..... </Text>
        </View>

        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1 }}>
          <View style={{ width: '100%', height: 135, marginTop: 80, alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <TouchableWithoutFeedback style={{ height: 135, width: 170, alignSelf: 'center', }}
              onPress={() => { NavigationService.navigate('FacilitiesPatientList', { IsQRCodeSearch: false }) }}>
              <View style={[Helpers.PatientCard, { height: 150, width: 170, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }]}>

                <Image style={{ height: 35, width: 35, marginBottom: 4 }} resizeMode='contain' source={Images.PbyEmail} />
                <Text style={[{ color: '#28998D', fontSize: 12, width: 120, textAlign: 'center' }, Helpers.bold]}>

                  {this.props.selectedMessage["Register-Email"]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{ flexDirection: "row", alignSelf: 'center', marginTop: 40, marginBottom: 25 }}>
            <View style={{ width: 46, height: 46, borderRadius: 46 / 2, marginLeft: 9, backgroundColor: '#f6f5fa', alignItems: 'center' }}>
              <Text style={[Helpers.book, { fontSize: 18, marginTop: 9, color: '#152C52' }]}>OR</Text>
            </View>

          </View>


          <View style={{ width: '100%', height: 135, alignSelf: 'center', justifyContent: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <TouchableWithoutFeedback style={{ height: 135, width: 170, alignSelf: 'center', }}
              onPress={() => { NavigationService.navigate('FacilitiesPatientList', { IsQRCodeSearch: true }) }}>
              <View style={[Helpers.PatientCard, { height: 150, width: 170, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }]}>

                <Image style={{ height: 35, width: 35, marginBottom: 4 }} resizeMode='cover' source={Images.FrameScanQRCode} />
                <Text style={[{ color: '#28998D', fontSize: 12, width: 120, textAlign: 'center' }, Helpers.bold]}>

                  {this.props.selectedMessage["BottomTab-NewQRCode"]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

        </View>
      </SafeAreaView>
    );
  }
}


FindPatientScreen.propTypes = {



  allPatient: PropTypes.any,
  allPatientErrorMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,

  getAllPatientProfiles: PropTypes.func,
  resetAllPatientStates: PropTypes.func,
  selectedMessage: PropTypes.any,
}


const mapStateToProps = (state) => ({
  allPatient: state.patientProfile.allPatient,
  allPatientErrorMessage: state.patientProfile.allPatientErrorMessage,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  selectedMessage: state.startup.selectedMessage,


})

const mapDispatchToProps = (dispatch) => ({
  getAllPatientProfiles: (data) => dispatch(PatientProfileActions.getAllPatientProfiles(data)),
  resetAllPatientStates: () => dispatch(PatientProfileActions.resetAllPatientStates()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPatientScreen)
const styles = StyleSheet.create({

});
