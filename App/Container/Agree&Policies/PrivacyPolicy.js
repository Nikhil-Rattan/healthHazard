import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Helpers } from 'App/Theme'
import CustomHeader from 'App/Components/CustomHeader';
import ButtonWithTextandImage from 'App/Components/ButtonWithTextandImage';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'
import { Enums } from 'App/Enums';

class PrivacyPolicy extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  _OnClickCrossButton() {
    NavigationService.navigate('UserLicense')
  }

  _BackGo() {
    NavigationService.navigate('SignUp')
  }

  render() {
    const IsFacility = this.props.accountType === Enums.Facility
    return (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: Colors.white }]}>
        <CustomHeader
          HeaderColor={{ backgroundColor: IsFacility ? Colors.facilityColor : Colors.patientColor }}
          onPressBackButton={this._OnClickCrossButton.bind(this)}
          HeaderTitle='Privacy Policy'
          LeftImage={Images.BackIcon}
        />
        <ScrollView >
          <View style={{ alignItems: 'center' }}>
            <Text style={[Helpers.textLeft, { width: '90%', fontSize: Fonts.input, marginTop: 20 }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text style={[Helpers.textLeft, { width: '90%', fontSize: Fonts.input, marginTop: 20 }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text style={[Helpers.textLeft, { width: '90%', fontSize: Fonts.input, marginTop: 20 }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text style={[Helpers.textLeft, { width: '90%', fontSize: Fonts.input, marginTop: 20 }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text style={[Helpers.textLeft, { width: '90%', fontSize: Fonts.input, marginTop: 20 }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text style={[Helpers.textLeft, { width: '90%', fontSize: Fonts.input, marginTop: 20, marginBottom: 100 }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>

        </ScrollView>

        <ButtonWithTextandImage
          onPressBackButton={this._BackGo.bind(this)}
          ButtonText='Agree and Continue'

          ButtonImage={Images.ForwordIcon}
        />


      </SafeAreaView>
    );
  }
}



PrivacyPolicy.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  accountType: PropTypes.any,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func
}


const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  accountType: state.authenticate.accountType

})

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) => dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () => dispatch(AuthenticateActions.resetAuthenticateStates()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacyPolicy)

const styles = StyleSheet.create({

});
