import React from 'react';
import { Text, View, TouchableOpacity, Image, SafeAreaView, Platform, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import { check, request, PERMISSIONS } from 'react-native-permissions';
class LastStepScreen extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }
  async _onPressButton() {
    try {
      request(Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
        check(PERMISSIONS.IOS.CAMERA || PERMISSIONS.ANDROID.CAMERA)
          .then((result) => {
            if (result == 'granted') {
              NavigationService.navigate('KitQRCodeScanner');
            }
            else {
              Linking.openSettings();
            }
          })
      });
    } catch (err) {
      console.warn(err);
    }
  }
  _OnPressRightSideIcon() {
  }
  _onBackButtonPress() {
    NavigationService.navigate('InstructionForthScreen');
  }
  _onFourthStepPressButton() {
    NavigationService.navigate('InstructionFifthScreen');
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
          source={Images.viewinstructionIcon}
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
              { fontSize: 30, color: Colors.patientColor, textAlign: 'center' },
            ]}>
            {this.props.selectedMessage['LastStepScreen-LastStep']}
          </Text>
        </View>

        <Text
          style={[
            Helpers.bold,
            {
              marginLeft: 15,
              marginTop: 10,
              fontSize: 19,
              color: Colors.Black,
              textAlign: 'center',
              width: '90%',
            },
          ]}>
          {this.props.selectedMessage['LastStepScreen-LastStepMiddletext']}
        </Text>

        <View style={Helpers.bottomView}>
          <View style={[Helpers.btnContainer, { bottom: 0 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#614698', '#614698', '#614698']}
              style={[
                Helpers.bigBtnGradient,
                {
                  width: '90%',
                  borderWidth: 1,
                  borderColor: Colors.patientColor,
                },
              ]}>
              <TouchableOpacity
                style={Helpers.btn}
                onPress={this._onPressButton.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.white, fontSize: 17 },
                  ]}>
                  {
                    this.props.selectedMessage[
                    'LastStepScreen-ScanTestKitLastScreen'
                    ]
                  }
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

LastStepScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) =>
    dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LastStepScreen);