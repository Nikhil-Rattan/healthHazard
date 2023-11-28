import React from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Easing,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeaderNew from 'App/Components/CustomHeaderNew';
import Telehealthexpertlist from 'App/Components/Telehealthexpertlist';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Helpers } from 'App/Theme';

import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import PatientActions from 'App/Stores/PatientProfile/Actions';
import NavigationService from 'App/Services/NavigationService';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
class TelehealthExpertsScreens extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      spinAnim: new Animated.Value(0),
      centerDrop: new Animated.Value(0),
      firstWave: new Animated.Value(0),
      secondWave: new Animated.Value(0),
      thirdWave: new Animated.Value(0),
      Isloading: true,

      patientDataList: [],
      currentPage: 1,
      pageLimit: 10,
      allLoaded: false,
    };
  }

  componentDidMount() {
    console.log('start');
    //this.props.resetAllTelehealthExpertsStates()
    this._getRecords();

    const { centerDrop, firstWave, secondWave, thirdWave } = this.state;

    const createAnimation = function (value, duration, easing, delay = 0) {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay,
        useNativeDriver: true,
      });
    };

    Animated.parallel([
      Animated.loop(createAnimation(centerDrop, 2000, Easing.ease, 1000)),
      Animated.loop(createAnimation(firstWave, 2000, Easing.ease, 500)),
      Animated.loop(createAnimation(secondWave, 2000, Easing.ease, 500)),
      Animated.loop(createAnimation(thirdWave, 2000, Easing.ease, 1000)),
    ]).start();

    Animated.loop(
      Animated.timing(this.state.spinAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    this.animationInterval = setInterval(() => {
      this._RunLoader();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.animationInterval);
  }

  _getRecords() {
    let payload = {
      TeleHealthId: 0,
      IsActive: 1,
      IsRejected: 0,
      IsDeleted: 0,
      OrderBy: 'asc',
      OrderByColumn: 'TeleHealthName',
      PageSize: this.state.pageLimit,
      PageNo: this.state.currentPage,
      SearchQuery: '',
    };
    this.props.getAllTelehealthExperts(payload);
  }

  _RunLoader() {
    if (this.props.isPatientProfileLoading) {
      this.setState({ Isloading: true });
    } else {
      this.setState({ Isloading: false });
    }
  }

  _onPressButton() {
    let dashboad =
      this.props.authenticatedUser?.UserRoleId == Enums.Patient
        ? 'PatientHome'
        : 'FacilityHome';
    NavigationService.navigateAndReset(dashboad);
  }

  getItemDetail(item) {
    const { IsDoctor } = this.props.route.params;
    NavigationService.navigate('TelehealthExpertDetails', {
      itemDetail: { ...item, IsDoctor },
    });
  }
  _GoBackScreen() {
    NavigationService.popScreen();
  }

  scroll_timer = 0;
  handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    clearTimeout(this.scroll_timer);
    this.scroll_timer = setTimeout(() => {
      const paddingToBottom = 200;
      if (
        layoutHeight + scrollPosition >= contentHeight - paddingToBottom &&
        (!this.state.allLoaded)
      ) {
        this.setState({ currentPage: this.state.currentPage + 1 })
        this._getRecords();
      }
    }, 200);
  };

  async componentDidUpdate(prevProps) {
    const { patientDataList, currentPage } = this.state;

    var isExist = false;
    if (this.props.allTelehealthExperts.length > 0) {
      isExist = patientDataList.some(element => {
        if (element.TeleHealthUserId === this.props.allTelehealthExperts[0].TeleHealthUserId) {
          return true;
        }
      });
    }

    if (this.state.currentPage > 1 && this.props.allTelehealthExperts.length == 0 && (!this.state.allLoaded)) {
      await this.setState({ allLoaded: true });
    }

    if (this.props.allTelehealthExperts.length > 0) {
      if (patientDataList.length == 0 && currentPage == 1) {
        this.setState({ patientDataList: this.props.allTelehealthExperts });
      }
      else if (!isExist) {
        this.setState({ patientDataList: patientDataList.concat(this.props.allTelehealthExperts) })
      }
    } else if (patientDataList.length > 0 && !this.state.allLoaded) {
      this.setState({ patientDataList: [] });
    }
  }

  renderLoader() {
    const { centerDrop, firstWave, secondWave, thirdWave } = this.state;
    // const spin = this.state.spinAnim.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg']
    // });
    const opacityCenterDrop = centerDrop.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const opacityFirstWave = firstWave.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const opacitySecondWave = secondWave.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const opacityThirdWave = thirdWave.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          <Image
            style={{ width: 70, height: 70 }}
            resizeMode="cover"
            source={Images.MainLogo}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text
            style={[
              Helpers.bold,
              {
                fontSize: 24,
                color: Colors.patientColor,
                textAlign: 'center',
                width: '90%',
                marginBottom: 30,
              },
            ]}>
            {/* {this.props.selectedMessage["RegisterSuccess-Success!"]} */}
            Searching For Available Physicians...
          </Text>
        </View>

        <View
          style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
          <Animated.Image
            style={{
              height: 400,
              width: 400,
              position: 'absolute',
              opacity: opacityThirdWave,
            }}
            source={Images.WaveImage}
          />

          <Animated.Image
            style={{
              height: 300,
              width: 300,
              position: 'absolute',
              opacity: opacitySecondWave,
            }}
            source={Images.WaveImage}
          />

          <Animated.Image
            style={{
              height: 200,
              width: 200,
              position: 'absolute',
              opacity: opacityFirstWave,
            }}
            source={Images.WaveImage}
          />

          {/* <Animated.Image
    style={{height:100, width: 100,transform: [{rotate: spin}],position:'absolute',opacity:opacityThirdWave }}
    source={Images.WaveImage} /> */}
          <Animated.Image
            style={{
              height: 50,
              width: 50,
              position: 'absolute',
              opacity: opacityCenterDrop,
            }}
            source={Images.centerDropImage}
          />
        </View>

        <View style={Helpers.bottomView}>
          <View style={[Helpers.btnContainer, { bottom: 0 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
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
                onPress={this._GoBackScreen.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.patientColor, fontSize: 17 },
                  ]}>
                  {this.props.selectedMessage['InstructionThirdScreen-GoBack']}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { IsDoctor } = this.props.route.params;
    return (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: '#fff' }]}>
        <Dialog
          dialogStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          visible={this.props.isPatientProfileLoading}>
          <DialogContent style={{ backgroundColor: 'transparent' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={Images.Loaderimg}
                style={{
                  alignItems: 'center',
                  resizeMode: 'center',
                  marginTop: 17,
                }}
              />
            </View>
          </DialogContent>
        </Dialog>
        <View style={{ flex: 1 }}>
          <CustomHeaderNew
            HeaderColor={{ backgroundColor: Colors.white }}
            onPressBackButton={this._onPressButton.bind(this)}
            HeaderTitle={
              IsDoctor
                ? this.props.selectedMessage['TestingSiteListScreen-Physicians']
                : this.props.selectedMessage[
                'TestingSiteListScreen-CallToOrder'
                ]
            }
            LeftImage={Images.PurPleBackIcon}
            textcolorHeader="#614698"
          />
          <ScrollView ref={(c) => { this.scroll = c }} onScroll={this.handleScroll}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 25,
              }}>
              <Text
                numberOfLines={2}
                style={[
                  Helpers.bold,
                  {
                    fontSize: 23,
                    color: Colors.patientColor,
                    textAlign: 'left',
                    width: '90%',
                    marginBottom: 15,
                  },
                ]}>
                {IsDoctor
                  ? this.props.selectedMessage['TestingSiteListScreen-Physicians']
                  : null}
                {IsDoctor ? ' ' : ''}
                {
                  this.props.selectedMessage[
                  'TestingSiteListScreen-AvailableCovistix'
                  ]
                }{' '}
                {IsDoctor
                  ? ''
                  : this.props.selectedMessage[
                  'TestingSiteListScreen-TelehealthExperts'
                  ]}
              </Text>
            </View>

            <FlatList
              data={this.state.patientDataList}
              keyExtractor={(item) => {
                return item.id;
              }}
              maxToRenderPerBatch={this.state.pageLimit}
              windowSize={this.state.pageLimit}

              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginBottom: 5,
                    }}>
                    <Telehealthexpertlist
                      TitleText={
                        IsDoctor
                          ? 'Dr.' + item.PhysicianName
                          : item.TeleHealthName
                      }
                      DescriptionText={item.Address}
                      backgroundColorContainer="#efedf5"
                      ListRightImage={Images.PurPletelehealthexpertCallIcon}
                      DiscriptionColor="#000000"
                      TitleColor={Colors.patientColor}
                      IconClick={this.getItemDetail.bind(this, item)}
                    />
                  </View>
                );
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

TelehealthExpertsScreens.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,

  allTelehealthExperts: PropTypes.any,
  allTelehealthExpertsErrorMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,

  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,

  allTelehealthExperts: state.patientProfile.allTelehealthExperts,
  allTelehealthExpertsErrorMessage:
    state.patientProfile.allTelehealthExpertsErrorMessage,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,

  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTelehealthExperts: (data) =>
    dispatch(PatientActions.getAllTelehealthExperts(data)),
  resetAllTelehealthExpertsStates: () =>
    dispatch(PatientActions.resetAllTelehealthExpertsStates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TelehealthExpertsScreens);
