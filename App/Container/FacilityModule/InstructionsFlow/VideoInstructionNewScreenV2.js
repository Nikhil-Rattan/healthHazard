import React from 'react';
import { SafeAreaView } from 'react-native';
import IFramWebView from 'App/Components/IFramWebView';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme'
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'

class VideoInstructionNewScreen extends ValidationComponent {

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
    NavigationService.popScreen()

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

          <IFramWebView></IFramWebView>

        }

      </SafeAreaView>

    );
  }
}



VideoInstructionNewScreen.propTypes = {
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
)(VideoInstructionNewScreen)


