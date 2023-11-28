import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  AppState,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TestResultList from 'App/Components/TestResultList';
import TestMenuItem from 'App/Components/TestMenuItem';
import { KeyboardAvoidingView } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Helpers,
  ApplicationStyles,
} from 'App/Theme';

import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CustomHeader from 'App/Components/CustomHeader';
import ButtonWithTextandImage from 'App/Components/ButtonWithTextandImage';
import { Enums } from 'App/Enums';
import { LanguageEnum } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import PatientProfileActions from 'App/Stores/PatientProfile/Actions';
class MyTestResultsScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),

      testResultsList: [],
      currentPage: 1,
      pageLimit: 10,
      allLoaded: false,
    };
    this._GetNotificationCount = this._GetNotificationCount.bind(this);
  }
  componentDidMount() {
    console.log(
      '.................................................................',
    );

    // this.props.getTestAllResults(payload);
    this._onFocus();
    console.log(
      '.................................................................',
    );

    AppState.addEventListener('change', this._GetNotificationCount);
    this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      this._onFocus();
    });
    this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
      this._onBlur();
    });
  }

  _onFocus = async () => {
    await this.setState({ currentDate: new Date(), currentPage: 1, allLoaded: false, testResultsList: [] });
    this._getRecords();
  }

  _onBlur = () => {
    console.log("BlurTestesList", this.state.currentPage);
    this.setState({ currentDate: new Date(), currentPage: 1, allLoaded: false, testResultsList: [] });
    this.props.resetAllPatientStates();
  }

  _getRecords = () => {
    if (this.state.currentPage == 1)
      this.props.resetAllPatientStates();
    let payload = {
      PatientId: this.props.authenticatedUser?.PatientId,
      //"PatientId":29,
      FacilityUserId: 0,
      PageSize: this.state.pageLimit,
      PageNo: this.state.currentPage
    };
    console.log("UserTESTPayload", payload)
    this.props.getTestAllResults(payload);
  }

  async componentDidUpdate(prevProps, prevState) {
    // if (this.props.testAllResults.length > 0 && prevProps.certifiedAllTesters.length != this.props.testAllResults.length) {
    const { testResultsList, currentPage } = this.state;

    var isExist = false;
    if (this.props.testAllResults.length > 0) {
      isExist = testResultsList.some(element => {
        if (element.PatientTestResultId === this.props.testAllResults[0].PatientTestResultId) {
          return true;
        }
      });
    }

    if (this.state.currentPage > 1 && this.props.testAllResults.length == 0 && (!this.state.allLoaded)) {
      await this.setState({ allLoaded: true });
    }

    if (this.props.testAllResults.length > 0) {
      if (testResultsList.length == 0 && currentPage == 1) {
        this.setState({ testResultsList: this.props.testAllResults });
      }
      else if (!isExist) {
        this.setState({ testResultsList: testResultsList.concat(this.props.testAllResults) })
      }
    } else if (testResultsList.length > 0 && !this.state.allLoaded) {
      this.setState({ testResultsList: [] });
    }

    // if ((prevProps.certifiedAllTesters.length != this.props.testAllResults.length)) {
    //   this.setState({ testResultsList: this.props.testAllResults });
    // }
  }

  scroll_timer = 0;
  handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    clearTimeout(this.scroll_timer);
    this.scroll_timer = setTimeout(() => {
      const paddingToBottom = 100;
      if (
        layoutHeight + scrollPosition >= contentHeight - paddingToBottom &&
        (!this.state.allLoaded)
      ) {
        this.setState({ currentPage: this.state.currentPage + 1 });
        this._getRecords();
      }
    }, 200);
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this._GetNotificationCount);
    if (typeof this._unsubscribeFocus != 'undefined') this._unsubscribeFocus();
    if (typeof this._unsubscribeBlur != 'undefined') this._unsubscribeBlur();
  }

  _onPressButton() {
    this.props.getUserDetailById({
      UserId: this.props.authenticatedUser?.UserId,
      UserKey: this.props.authenticatedUser?.UserKey,
      IsComeFrom: Enums.LogIn,
      UserRoleId: this.props.authenticatedUser?.UserRoleId,
    });
  }

  _goto_Test_Result_Single(item) {
    // alert(item.ResultName)
    let GoToScreen = '';

    switch (item.ResultName) {
      case 'Positive':
        GoToScreen = { ...item, headerColor: '#fbd1d1', Color: '#f92a2a' };
        break;
      case 'Negative':
        GoToScreen = { ...item, headerColor: '#d1e7e5', Color: '#28998D' };
        break;
      default:
        GoToScreen = { ...item, headerColor: '#dcd7e7', Color: '#614698' };

        break;
    }
    NavigationService.navigate('TestReportScreen', { reportDeatil: GoToScreen });
  }

  _gotoTestResult(item) {
    let GoToScreen = '';

    switch (item.ResultName) {
      case 'Positive':
        GoToScreen = { ...item, headerColor: '#fbd1d1', Color: '#f92a2a' };
        break;
      case 'Negative':
        GoToScreen = { ...item, headerColor: '#d1e7e5', Color: '#28998D' };
        break;
      default:
        GoToScreen = { ...item, headerColor: '#dcd7e7', Color: '#614698' };

        break;
    }
    NavigationService.navigate('TestReportScreen', { reportDeatil: GoToScreen });
  }
  _onPressItem(item) {
    this.props.onPressCard(item);
  }

  _GetNotificationCount() {
    if (!(AppState.currentState == 'background')) {
      let { UserId } = this.props.authenticatedUser;
      this.props.getNotificationCount({ UserId: UserId });
    }
  }

  render() {
    const pastResult =
      this.state.testResultsList.length > 1
        ? this.state.testResultsList.slice(1, this.state.testResultsList.length)
        : [];
    var d = this.state.currentDate;

    let days = LanguageEnum['WeekDays-' + this.props.locale];
    // {this.props.locale==LanguageEnum.English?

    // days= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    // :

    // days=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]

    // }

    let DayName = days[d.getDay()];

    //var UStime = d.getHours();
    var UStime = d.getHours();
    var USMinute = d.getMinutes();
    return (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: '#f6f5f9' }]}>
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
        <ScrollView onScroll={this.handleScroll}>
          <View
            style={{
              backgroundColor: '#00000',
              marginTop: 40,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginLeft: 20,
              }}>
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 15,
                    color: '#8492A6',
                    textAlign: 'left',
                    width: '90%',
                    marginTop: 0,
                    marginBottom: 5,
                  },
                ]}>
                {DayName} {UStime > 12 ? '0' + UStime - 12 : UStime}:
                {USMinute < 10 ? '0' + USMinute : USMinute}
                {UStime < 12 ? ' am' : ' pm'}
              </Text>
              <Text
                // numberOfLines={1}
                style={[
                  Helpers.bold,
                  {
                    fontSize: 30,
                    lineHeight: 40,
                    color: '#414141',
                    textAlign: 'left',
                    width: '90%',
                  },
                ]}>
                {this.props.selectedMessage['PatientDashboard-MyTestResults']}
              </Text>
            </View>
          </View>

          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 20,
                marginLeft: 20,
                color: '#8492A6',
                textAlign: 'left',
                width: '90%',
                marginTop: 25,
                marginBottom: 5,
              },
            ]}>
            {this.state.testResultsList.length > 0
              ? this.props.selectedMessage['PatientDashboard-NewResults']
              : ''}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            {this.state.testResultsList.length > 0 ? (
              this.state.testResultsList[0].ResultName === 'Positive' ? (
                <TestMenuItem
                  key={this.state.testResultsList[0].PatientTestResultId}
                  itemContainerStyle={[
                    Helpers.tabItemContainerStyle,
                    {
                      backgroundColor: '#f92a2a',
                      borderRadius: 20,
                      height: 90,
                      borderColor: 'transparent',
                      borderWidth: 0.2,
                      width: '100%',
                    },
                  ]}
                  imageContainerStyle={[
                    {
                      height: 55,
                      width: 55,
                      borderRadius: 10,
                      backgroundColor: '#ffffff',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    },
                  ]}
                  leftImage={null}
                  hasImage={false}
                  digitdatecolor="#F54949"
                  textContainerStyle={[Helpers.tabItemTextContainerStyle]}
                  headerTextStyle={[
                    Helpers.btnText,
                    Helpers.bold,
                    {
                      color: '#FFFFFF',
                      fontSize: 16,
                      textAlign: 'left',
                      marginLeft: 5,
                    },
                  ]}
                  parahgraphTextStyle={[
                    Helpers.btnText,
                    {
                      color: '#FFFFFF',
                      fontSize: 14,
                      textAlign: 'left',
                      marginLeft: 5,
                    },
                  ]}
                  headerText={
                    this.props.selectedMessage[
                    'CallScreen-' +
                    this.state.testResultsList[0].ResultName +
                    'TestResults'
                    ]
                  }
                  parahgraphText={
                    this.props.selectedMessage[
                    this.state.testResultsList[0].TestDateResultMonth
                    ] +
                    ' ' +
                    this.state.testResultsList[0].TestDateResultInfo
                  }
                  iconContainerStyle={[Helpers.tabItemIconContainerStyle]}
                  rightImage={Images.WhiteInfoIcon}
                  dateNo={this.state.testResultsList[0].ResultDay}
                  dateMonth={
                    this.props.selectedMessage[
                    this.state.testResultsList[0].ResultMonth
                    ]
                  }
                  onPressCard={this._goto_Test_Result_Single.bind(
                    this,
                    this.state.testResultsList[0],
                  )}></TestMenuItem>
              ) : this.state.testResultsList[0].ResultName === 'Negative' ? (
                <TestMenuItem
                  key={this.state.testResultsList[0].PatientTestResultId}
                  itemContainerStyle={[
                    Helpers.tabItemContainerStyle,
                    {
                      backgroundColor: '#28998D',
                      borderRadius: 20,
                      height: 90,
                      borderColor: 'transparent',
                      borderWidth: 0.2,
                      width: '100%',
                    },
                  ]}
                  imageContainerStyle={[
                    {
                      height: 60,
                      width: 60,
                      borderRadius: 10,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    },
                  ]}
                  leftImage={null}
                  hasImage={false}
                  digitdatecolor="#28998D"
                  textContainerStyle={[Helpers.tabItemTextContainerStyle]}
                  headerTextStyle={[
                    Helpers.btnText,
                    Helpers.bold,
                    {
                      color: '#FFFFFF',
                      fontSize: 16,
                      textAlign: 'left',
                      marginLeft: 5,
                    },
                  ]}
                  parahgraphTextStyle={[
                    Helpers.btnText,
                    {
                      color: '#FFFFFF',
                      fontSize: 14,
                      textAlign: 'left',
                      marginLeft: 5,
                    },
                  ]}
                  headerText={
                    this.props.selectedMessage[
                    'CallScreen-' +
                    this.state.testResultsList[0].ResultName +
                    'TestResults'
                    ]
                  }
                  parahgraphText={
                    this.props.selectedMessage[
                    this.state.testResultsList[0].TestDateResultMonth
                    ] +
                    ' ' +
                    this.state.testResultsList[0].TestDateResultInfo
                  }
                  iconContainerStyle={[Helpers.tabItemIconContainerStyle]}
                  rightImage={Images.WhiteInfoIcon}
                  dateNo={this.state.testResultsList[0].ResultDay}
                  dateMonth={
                    this.props.selectedMessage[
                    this.state.testResultsList[0].ResultMonth
                    ]
                  }
                  onPressCard={this._goto_Test_Result_Single.bind(
                    this,
                    this.state.testResultsList[0],
                  )}></TestMenuItem>
              ) : (
                <TestMenuItem
                  key={this.state.testResultsList[0].PatientTestResultId}
                  itemContainerStyle={[
                    Helpers.tabItemContainerStyle,
                    {
                      backgroundColor: Colors.patientColor,
                      borderRadius: 20,
                      height: 90,
                      borderColor: 'transparent',
                      borderWidth: 0.2,
                      width: '100%',
                    },
                  ]}
                  imageContainerStyle={[
                    {
                      height: 55,
                      width: 55,
                      borderRadius: 10,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    },
                  ]}
                  leftImage={null}
                  hasImage={false}
                  digitdatecolor="#815CCC"
                  textContainerStyle={[Helpers.tabItemTextContainerStyle]}
                  headerTextStyle={[
                    Helpers.btnText,
                    Helpers.bold,
                    {
                      color: '#FFFFFF',
                      fontSize: 16,
                      textAlign: 'left',
                      marginLeft: 5,
                    },
                  ]}
                  parahgraphTextStyle={[
                    Helpers.btnText,
                    {
                      color: '#FFFFFF',
                      fontSize: 14,
                      textAlign: 'left',
                      marginLeft: 5,
                    },
                  ]}
                  headerText={
                    this.props.selectedMessage[
                    'CallScreen-' +
                    this.state.testResultsList[0].ResultName +
                    'TestResults'
                    ]
                  }
                  parahgraphText={
                    this.props.selectedMessage[
                    this.state.testResultsList[0].TestDateResultMonth
                    ] +
                    ' ' +
                    this.state.testResultsList[0].TestDateResultInfo
                  }
                  iconContainerStyle={[Helpers.tabItemIconContainerStyle]}
                  rightImage={Images.WhiteInfoIcon}
                  dateNo={this.state.testResultsList[0].ResultDay}
                  dateMonth={
                    this.props.selectedMessage[
                    this.state.testResultsList[0].ResultMonth
                    ]
                  }
                  onPressCard={this._goto_Test_Result_Single.bind(
                    this,
                    this.state.testResultsList[0],
                  )}></TestMenuItem>
              )
            ) : null}
          </View>

          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 20,
                marginLeft: 20,
                color: '#C2CEDB',
                textAlign: 'left',
                width: '90%',
                marginTop: 25,
                marginBottom: 5,
              },
            ]}>
            {this.state.testResultsList.length > 0
              ? this.props.selectedMessage['PatientDashboard-PastResults']
              : ''}
          </Text>
          {this.state.testResultsList.length > 0 ? (
            <TestResultList
              onPressCard={this._gotoTestResult.bind(this)}
              listStyle={[{ alignItems: 'center', width: '100%' }]}
              testAllResults={pastResult}></TestResultList>
          ) : (
            <Text
              style={[
                Helpers.lightBook,
                { fontSize: 25, textAlign: 'center', width: '100%' },
              ]}>
              {this.props.selectedMessage['¡Sin resultados de prueba!']}
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

MyTestResultsScreen.propTypes = {
  authenticatedUser: PropTypes.any,
  selectedMessage: PropTypes.any,
  onPressCard: PropTypes.func,
  testAllResults: PropTypes.any,
  testAllResultsErrorMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,
  locale: PropTypes.any,
  // getTestAllResults: PropTypes.func ,
  resetAllPatientStates: PropTypes.func,
  getNotificationCount: PropTypes.func,
};
TestResultList.defaultProps = {
  onPressCard: () => { },
  hasPatientId: true,
  PatientId: 0,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
  testAllResults: state.patientProfile.testAllResults,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  locale: state.startup.locale,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetailById: (data) =>
    dispatch(AuthenticateActions.getUserDetailById(data)),

  getTestAllResults: (data) =>
    dispatch(PatientProfileActions.getTestAllResults(data)),
  resetAllPatientStates: () =>
    dispatch(PatientProfileActions.resetAllPatientStates()),
  getNotificationCount: (data) =>
    dispatch(AuthenticateActions.getNotificationCount(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTestResultsScreen);

const styles = StyleSheet.create({});
