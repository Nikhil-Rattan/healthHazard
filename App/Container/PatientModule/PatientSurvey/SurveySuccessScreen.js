import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Successanimation from '../../Animations/Successanimation'
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Fonts,
  Helpers,
} from 'App/Theme';
import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';

class SurveySuccessScreen extends ValidationComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() { }

  _onPressButton() {
    this.props.getUserDetailById({
      UserId: this.props.authenticatedUser?.UserId,
      UserKey: this.props.authenticatedUser?.UserKey,
      IsComeFrom: Enums.UpdateUserScreen,
      UserRoleId: this.props.authenticatedUser?.UserRoleId,
    });
    NavigationService.navigateAndReset('PatientHome');

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[Helpers.fill, { backgroundColor: Colors.patientColor }]}>

          <Successanimation />
          <View style={[{ backgroundColor: 'transparent', position: 'absolute', width: '100%', height: '43%', flexDirection: 'column', justifyContent: 'flex-end' }]} >
            <Text style={[, { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'left', width: '90%', marginLeft: 20 }]}>
              {this.props.selectedMessage["FacilitySuccess-Success!"]}
            </Text>
            <Text style={[, { fontSize: 17, color: 'white', textAlign: 'left', width: '90%', marginLeft: 20, marginTop: '6%' }]}>
              {this.props.selectedMessage["PatSurvey-YouHaveSubmittedYourSurvey"]}
            </Text>

          </View>

          <View style={[Helpers.bottomView, { backgroundColor: Colors.patientColor }]}>
            <View style={[Helpers.btnContainer, { bottom: 0 }]}>
              <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={[Helpers.bigBtnGradient, { width: '90%' }]} >
                <TouchableOpacity style={Helpers.btn}
                  onPress={this._onPressButton.bind(this)}
                >
                  <Text style={[Helpers.btnText, { color: Colors.patientColor, fontSize: Fonts.regular16 }]}>
                    {this.props.selectedMessage["PatSurvey-GoToDashboard"]} </Text>

                </TouchableOpacity>

              </LinearGradient>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

SurveySuccessScreen.propTypes = {
  authenticatedUser: PropTypes.any,
  selectedMessage: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetailById: (data) =>
    dispatch(AuthenticateActions.getUserDetailById(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurveySuccessScreen);

const styles = StyleSheet.create({});
