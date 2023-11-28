import React from 'react';
import {
  Text,
  View,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import IFramWebView from 'App/Components/IFramWebView';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme'
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'

class VideoInstructionScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    this.state = { IsVideoShown: true }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      console.log('test--------------------')
      this.setState({ IsVideoShown: true })
    });
  }


  componentWillUnmount() {

    this._unsubscribe()
  }

  _onPressButton() {
    this.setState({ IsVideoShown: false })
    NavigationService.navigate('LastStepScreen')
  }
  _OnPressRightSideIcon() {
    NavigationService.popScreen()
  }

  render() {
    return (

      <SafeAreaView style={[Helpers.fill, { backgroundColor: 'white' }]}>
        <TopHeaderWithTwoOption
          fullComponentbackgroundColor={Colors.patientColor}
          fullComponentHeight={60}
          IsImage={true}
          RightImage={Images.CrossIcon}
          MiddleHeaderTitlecolor='#FFFFFF'
          onPressRightButton={this._OnPressRightSideIcon.bind(this)}
        />

        {this.state.IsVideoShown &&

          <IFramWebView {...this.props}></IFramWebView>

        }


        <View style={Helpers.bottomView}>
          <View style={[Helpers.btnContainer, { bottom: 0 }]}>

            <TouchableOpacity style={[Helpers.btn, { backgroundColor: Colors.patientColor, width: '90%' }]}
              onPress={this._onPressButton.bind(this)}
            >
              <Text style={[Helpers.btnText, { color: Colors.white, fontSize: 17, }]}>
                {this.props.selectedMessage["TestingSiteListScreen-NextNew"]}
              </Text>

            </TouchableOpacity>

          </View>
        </View>



      </SafeAreaView>

    );
  }
}


VideoInstructionScreen.propTypes = {
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
)(VideoInstructionScreen)


