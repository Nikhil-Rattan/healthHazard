import React from 'react';
import {
  Text,
  View,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Helpers } from 'App/Theme'
import { Enums } from 'App/Enums'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'
import Successanimation from './../../Animations/Successanimation'

class SuccessSignupScreen extends ValidationComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  _onPressButton() {

    let dashboad = this.props.authenticatedUser?.UserRoleId == Enums.Patient ? 'PatientHome' : 'FacilityHome'
    NavigationService.navigateAndReset(dashboad)
  }

  render() {
    return (

      <SafeAreaView style={[Helpers.fill, { backgroundColor: Colors.patientColor }]}>
        <Successanimation />

        <View style={[{ backgroundColor: 'transparent', position: 'absolute', width: '100%', height: '43%', flexDirection: 'column', justifyContent: 'flex-end' }]} >
          <Text style={[Helpers.bold, { fontSize: 32, color: 'white', textAlign: 'left', width: '90%', marginLeft: 20, marginBottom: 30 }]}>
            {this.props.selectedMessage["RegisterSuccess-Success!"]}
          </Text>
          <Text style={[, { fontSize: 17, color: 'white', textAlign: 'left', width: '90%', marginLeft: 20 }]}>
            {this.props.selectedMessage["TestingSiteListScreen-YouHaveSuccessfully"]}

          </Text>

        </View>

        <View style={Helpers.bottomView}>
          <View style={[Helpers.btnContainer, { bottom: 0 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={[Helpers.bigBtnGradient, { width: '90%' }]} >
              <TouchableOpacity style={Helpers.btn}
                onPress={this._onPressButton.bind(this)}
              >
                <Text style={[Helpers.btnText, { color: Colors.patientColor, fontSize: Fonts.regular16, fontWeight: '500' }]}>
                  {this.props.selectedMessage["TestingSiteListScreen-ContinueNew"]}

                </Text>
              </TouchableOpacity>

            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>

    );
  }
}



SuccessSignupScreen.propTypes = {
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
)(SuccessSignupScreen)


