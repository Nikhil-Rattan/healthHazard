import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  BackHandler,
  Image,
  TouchableOpacity,
} from 'react-native';
import Dialog, { DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Colors, Images, Helpers } from 'App/Theme';
import NavigationService from 'App/Services/NavigationService';
import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class AccountTypeScreen extends Component {
  constructor(props) {
    super(props);

    const slides = [
      {
        key: '1',
        title: this.props.selectedMessage['NeedCovidTest-INeedACovid19Test'],
        text: this.props.selectedMessage['NeedCovidTest-UseAtHome'],
        image: require('./../../Assets/Images/CoviStixImages/Slider1.png'),
        backgroundColor: '#ffffff',
      },
      {
        key: '2',
        title: this.props.selectedMessage[
          'AdministerCovidTest-WeAdministerCovid-19Tests'
        ],
        text: this.props.selectedMessage['AdministerCovidTest-PrimaryContact'],
        image: require('./../../Assets/Images/CoviStixImages/Slider2.png'),
        backgroundColor: '#ffffff',
      },
    ];

    this.state = {
      scaleAnimationDialogAlert: true,
      SelectsecondImage: false,
      showRealApp: false,
      IsSwipeNext: false,
      slides: slides,
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
    this.setState({ scaleAnimationDialogAlert: false });
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  _onPressGetStarted() {
    let type = this.state.IsSwipeNext ? Enums.Facility : Enums.Patient;
    this.props.setAccountType(type);

    setTimeout(() => {
      NavigationService.navigate('UserLicense');
    }, 500);
  }

  _onPressButtonNext() {
    this.setState({ IsSwipeNext: true });
    this.AppIntroSlider.goToSlide(1);
  }
  _onPressButtonBack() {
    this.setState({ IsSwipeNext: false });
    this.AppIntroSlider.goToSlide(0);
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Text style={[Helpers.bold, styles.name]} numberOfLines={2} adjustsFontSizeToFit={Platform.OS == 'ios' ? true : false}>{item.title}</Text>
        </View>

        {this.state.IsSwipeNext ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <TouchableOpacity onPress={this._onPressButtonBack.bind(this)}>
                <Image
                  style={[
                    { width: 70, height: 70, marginLeft: 12, marginVertical: 15 },
                  ]}
                  resizeMode="stretch"
                  source={Images.BackHexaImage}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '80%',
              }}>
              <Image
                style={{ height: '65%', width: '80%', marginLeft: 0 }}
                resizeMode={'stretch'}
                source={item.image}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '80%',
              }}>
              <Image
                style={{ height: '65%', width: '80%', marginLeft: 70 }}
                resizeMode={'stretch'}
                source={item.image}
              />
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <TouchableOpacity onPress={this._onPressButtonNext.bind(this)}>
                <Image
                  style={[
                    {
                      width: 70,
                      height: 70,
                      marginRight: 20,
                      marginVertical: 15,
                    },
                  ]}
                  resizeMode="stretch"
                  source={Images.ForwordHexaImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text style={[Helpers.bold, styles.text]}>{item.text}</Text>

        <View
          style={[Helpers.btnContainer, { marginBottom: 5, height: 20 }]}></View>
      </View>
    );
  };

  _Changebutton(index) {
    if (index == 1) {
      this.setState({ IsSwipeNext: true });
      this.AppIntroSlider.goToSlide(1);
    } else {
      this.setState({ IsSwipeNext: false });
      this.AppIntroSlider.goToSlide(0);
    }
  }

  _ChooseAccountType() {
    this.setState({ scaleAnimationDialogAlert: false });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Dialog
          width={0.9}
          visible={this.state.scaleAnimationDialogAlert}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => { }}>
          <DialogContent style={{ backgroundColor: Colors.patientColor }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 23,
                    textAlign: 'center',
                    marginTop: 20,
                    color: '#FFFFFF',
                    width: '80%',
                  },
                ]}>
                {
                  this.props.selectedMessage[
                  'AccountType-WhichOptionBestDescribesYou'
                  ]
                }
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text
                style={[
                  Helpers.book,
                  {
                    fontSize: 17,
                    textAlign: 'center',
                    marginTop: 10,
                    color: '#FFFFFF',
                    width: '80%',
                  },
                ]}>
                {this.props.selectedMessage['AccountType-PleaseChooseOptions']}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                height: 70,
                width: '100%',
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <View style={[Helpers.btnContainer, { marginTop: 18 }]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                  style={[Helpers.bigBtnGradient, { width: '90%' }]}>
                  <TouchableOpacity
                    style={Helpers.btn}
                    onPress={this._ChooseAccountType.bind(this)}
                  >
                    <Text
                      style={[
                        Helpers.btnText,
                        { color: Colors.patientColor, fontSize: 15 },
                      ]}>
                      {this.props.selectedMessage['AccountType-ChoosePersona']}{' '}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </DialogContent>
        </Dialog>

        <AppIntroSlider
          dotStyle={{ borderColor: '#614698', borderWidth: 1, marginBottom: '60%' }}
          activeDotStyle={{ backgroundColor: '#614698', marginBottom: '60%' }}
          renderItem={this._renderItem}
          data={this.state.slides}
          dotClickEnabled={true}
          showNextButton={false}
          showDoneButton={false}
          onSlideChange={this._Changebutton.bind(this)}
          ref={(ref) => (this.AppIntroSlider = ref)}
        />
        {this.state.IsSwipeNext ? (
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[
                Colors.facilityColor,
                Colors.facilityColor,
                Colors.facilityColor,
              ]}
              style={[Helpers.bigBtnGradient, { width: '90%' }]}>
              <TouchableOpacity
                style={Helpers.btn}
                onPress={this._onPressGetStarted.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.white, fontSize: 15 },
                  ]}>
                  {this.props.selectedMessage['AdministerCovidTest-GetStarted']}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#614698', '#614698', '#614698']}
              style={[Helpers.bigBtnGradient, { width: '90%' }]}>
              <TouchableOpacity
                style={Helpers.btn}
                onPress={this._onPressGetStarted.bind(this)}
              >
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.white, fontSize: 15 },
                  ]}>
                  {' '}
                  {this.props.selectedMessage['AdministerCovidTest-GetStarted']}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

AccountTypeScreen.propTypes = {
  registrationErrorMessage: PropTypes.string,
  registrationSuccessMessage: PropTypes.string,
  authenticatedIsLoading: PropTypes.bool,
  accountType: PropTypes.any,
  saveRegistration: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  verifyCode: PropTypes.string,
  verificationCodeErrorMessage: PropTypes.string,
  buildProfilePayload: PropTypes.any,
  sendVerifyCode: PropTypes.func,
  setAccountType: PropTypes.func,
  selectedMessage: PropTypes.any,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  accountType: state.authenticate.accountType,
  selectedMessage: state.startup.selectedMessage,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  saveRegistration: (data) =>
    dispatch(AuthenticateActions.saveRegistration(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
  sendVerifyCode: (data) => dispatch(AuthenticateActions.sendVerifyCode(data)),
  setAccountType: (data) => dispatch(AuthenticateActions.setAccountType(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTypeScreen);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#21d6d9',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
  },
  textStyle: {
    color: '#fff',
    fontSize: 22,
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#ee6769',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },

  name: {
    fontSize: 31,
    color: 'black',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 17,
    color: '#414141',
    textAlign: 'center',
    width: '90%',
    marginTop: 20,
  },
  body: {
    backgroundColor: 'white',
    height: '60%',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },

  Logobox: {
    marginTop: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    elevation: 2,
    paddingTop: 10,
  },
  Logoimage: {
    alignItems: 'center',
    width: 250,
    height: 70,
    marginBottom: 20,
  },
  image: {
    height: 350,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },

  hexagon: {
    width: 100,
    height: 55,
  },
  hexagonInner: {
    width: 50,
    height: 30,
    backgroundColor: 'red',
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderLeftColor: 'transparent',
    borderRightWidth: 25,
    borderRightColor: 'transparent',
    borderTopWidth: 15,
    borderTopColor: 'red',
  },
  hexagonBefore: {
    position: 'absolute',
    top: -15,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderLeftColor: 'transparent',
    borderRightWidth: 25,
    borderRightColor: 'transparent',
    borderBottomWidth: 15,
    borderBottomColor: 'red',
  },
});
