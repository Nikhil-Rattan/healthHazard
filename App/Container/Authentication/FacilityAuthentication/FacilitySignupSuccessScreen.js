import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Successanimation from './../../Animations/Successanimation'
import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Helpers } from 'App/Theme'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'

class FacilitySignupSuccessScreen extends ValidationComponent {

  _onPressButton() {

    NavigationService.navigateAndReset("LaunchingScreen")
  }

  render() {
    return (

      <SafeAreaView style={{ flex: 1 }}>
        <View style={[Helpers.fill, { backgroundColor: Colors.facilityColor }]}>

          <Successanimation />

          <View style={[{ backgroundColor: 'transparent', position: 'absolute', width: '100%', height: '43%', flexDirection: 'column', justifyContent: 'flex-end' }]} >
            <Text style={[, { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'left', width: '90%', marginLeft: 20 }]}>
              {this.props.selectedMessage["FacilitySuccess-Success!"]}
            </Text>
            <Text style={[, { fontSize: 17, color: 'white', textAlign: 'left', width: '90%', marginLeft: 20 }]}>
              {this.props.selectedMessage["FacilitySuccess-SorrentoAdministratorReview"]}
            </Text>

          </View>

          <View style={[Helpers.bottomView, { backgroundColor: Colors.facilityColor }]}>
            <View style={[Helpers.btnContainer, { bottom: 0 }]}>
              <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={[Helpers.bigBtnGradient, { width: '90%' }]} >
                <TouchableOpacity style={Helpers.btn}
                  onPress={this._onPressButton.bind(this)}
                >
                  <Text style={[Helpers.btnText, { color: Colors.facilityColor, fontSize: Fonts.regular16 }]}>
                    {this.props.selectedMessage["Launch-Login"]} </Text>

                </TouchableOpacity>

              </LinearGradient>
            </View>
          </View>
        </View>
      </SafeAreaView>

    );
  }
}



FacilitySignupSuccessScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any
}

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  selectedMessage: state.startup.selectedMessage
})

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) => dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () => dispatch(AuthenticateActions.resetAuthenticateStates()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacilitySignupSuccessScreen)

const styles = StyleSheet.create({

});
