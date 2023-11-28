import React from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import PatientProfileActions from 'App/Stores/PatientProfile/Actions';

class InvalidNew extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.resetSaveKit();
  }

  _onPressButton() {
  }
  _OnPressRightSideIcon() {
  }
  _onBackButtonPress() {
    NavigationService.navigateAndReset('PatientQRCodeScannerScreen');
  }
  _onFourthStepPressButton() {
    NavigationService.navigateAndReset('PatientHome');
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{ height: 120, width: 120 }}
          resizeMode="contain"
          source={Images.invalidinstruction}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginLeft: 15,
          }}>
          <Text
            style={[
              Helpers.bold,
              { fontSize: 30, color: '#F54949', textAlign: 'center' },
            ]}>
            {this.props.selectedMessage['InvalidScreen-InvalidBold']}
          </Text>
        </View>

        <Text
          style={[
            Helpers.bold,
            {
              marginLeft: 15,
              marginTop: 10,
              fontSize: 15,
              color: Colors.Black,
              textAlign: 'left',
              width: '90%',
            },
          ]}>
          {this.props.selectedMessage['InvalidScreen-InvalidMiddleText']}
        </Text>

        <View style={[Helpers.bottomView, { height: 140 }]}>
          <CustomMultiButtons
            mutliButtonContainer={[
              Helpers.bottomView,
              Helpers.multiButtonContainer,
              {
                justifyContent: 'space-between',
                flexDirection: 'column',
                position: 'relative',
                height: 140,
              },
            ]}
            leftButtonContainer={[
              Helpers.buttonContainer,
              { width: '90%', borderRadius: 13, backgroundColor: '#F54949' },
            ]}
            rightButtonContainer={[
              Helpers.buttonContainer,
              Helpers.buttonContainerWithoutBackground,
              { width: '90%', marginBottom: 15 },
            ]}
            leftButtonTextStyle={[
              Helpers.btnText,
              { fontWeight: 'bold', fontSize: 14 },
            ]}
            leftButtonText={
              this.props.selectedMessage['InvalidScreen-StartANewTest']
            }
            rightButtonTextStyle={[
              Helpers.btnText,
              Helpers.buttonTextWithoutBackgroundContainer,
            ]}
            rightButtonText={
              this.props.selectedMessage['SuccessScreen-GoHomeButton']
            }
            onLeftPress={this._onBackButtonPress.bind(this)}
            onRightPress={this._onFourthStepPressButton.bind(
              this,
            )}></CustomMultiButtons>
        </View>
      </SafeAreaView>
    );
  }
}

InvalidNew.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  isPatientProfileLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  resetSaveKit: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  //  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) =>
    dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
  resetSaveKit: () => dispatch(PatientProfileActions.resetSaveKit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvalidNew);
