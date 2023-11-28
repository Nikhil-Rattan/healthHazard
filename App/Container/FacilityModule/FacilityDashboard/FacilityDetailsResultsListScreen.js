import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import PatientProfileActions from 'App/Stores/PatientProfile/Actions';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Images,
  Helpers,
} from 'App/Theme';
import TestResultList from 'App/Components/TestResultList';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import NavigationService from 'App/Services/NavigationService';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';

class FacilityDetailsResultsListScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      testResultsList: [],
      currentPage: 1,
      pageLimit: 10,
      allLoaded: false,
    };

  }
  componentDidMount() {
    let itemDetail = this.props.route.params.itemDetail;
    this._getRecords();
    this.props.resetPatientProfileImage();
    this.props.storePatientProfileImage({
      filename: itemDetail.UserProfileImageReferenceName,
    });
  }

  _getRecords = () => {
    // if (this.state.currentPage == 1)
    //   this.props.resetAllPatientStates();

    let itemDetail = this.props.route.params.itemDetail;
    let payload = {
      PatientId: itemDetail.PatientId,
      FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
      PageSize: this.state.pageLimit,
      PageNo: this.state.currentPage
    };

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

  getItemDetail(item) {
    NavigationService.navigate('PharmacyDetailsScreen', { itemDetail: item });
  }

  _GotoEditProfile() {
    NavigationService.navigate('ProfileScreen');
  }

  componentWillUnmount() {
    this.props.resetPatientProfileImage();
    this.props.resetAllFacilityStates();
  }

  _CallPhoneNumber(phone) {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
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

  _onPressButton() {
    let itemDetail = this.props.route.params.itemDetail;
    this.props.savePatientDetailSuccess({
      successMessage: null,
      patientResponse: itemDetail,
    });
    NavigationService.navigate('ScanPatientQRScreen', {
      isCreateTest: true,
      patientData: itemDetail,
    });
  }
  _GotoBackScreen() {
    NavigationService.popScreen();
    // this.props.resetAllPatientStates();
  }
  render() {
    let itemDetail = this.props.route.params.itemDetail;
    return (
      <SafeAreaView style={[{ backgroundColor: '#EFF2F7', flex: 1 }]}>

        <TopHeaderWithTwoOption
          fullComponentbackgroundColor="#EFF2F7"
          fullComponentHeight={60}
          IsImage={false}
          LeftImage={Images.GreenBackIcon}
          RightImage={Images.BackIcon}
          RightSideTitleColor={Colors.facilityColor}
          onPressLeftButton={this._GotoBackScreen.bind(this)}
        />
        <ScrollView onScroll={this.handleScroll}>
          {this.props.selectedPatientProfile ? (
            <Image
              style={[
                Helpers.PharmacyPic,
                { borderRadius: 50, alignSelf: 'center' },
              ]}
              resizeMode="cover"
              source={{
                uri: `data:image/jpeg;base64,${this.props.selectedPatientProfile}`,
              }}
            />
          ) : (
            <Image
              style={[
                Helpers.PharmacyPic,
                { borderRadius: 50, alignSelf: 'center' },
              ]}
              resizeMode="contain"
              source={Images.UserImagegreen}
            />
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text
              style={[
                Helpers.BoldTexttitle,
                {
                  marginTop: 20,
                  color: Colors.BlueColorNew,
                  textAlign: 'center',
                  width: '100%',
                },
              ]}>
              {itemDetail.Email}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              source={Images.FacilityPhoneIcon}
              style={Helpers.iconsmall}
            />
            <Text
              numberOfLines={2}
              style={[
                Helpers.bold,
                {
                  fontSize: 22,
                  color: Colors.facilityColor,
                  marginLeft: 10,
                  textAlign: 'center',
                },
              ]}>
              {itemDetail.DisplayPhoneNo}
            </Text>
          </View>

          <Text
            style={[
              Helpers.bold,
              {
                fontSize: 20,
                marginLeft: 20,
                color: Colors.BlueColorNew,
                textAlign: 'left',
                width: '90%',
                marginTop: 25,
                marginBottom: 5,
              },
            ]}>
            {this.props.selectedMessage['PatientDashboard-PastResults']}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 25,
            }}>
            <TestResultList
              onPressCard={this._gotoTestResult.bind(this)}
              listStyle={[{ alignItems: 'center', width: '100%' }]}
              hasPatientId={false}
              PatientId={itemDetail.PatientId}
              testAllResults={this.state.testResultsList}></TestResultList>

          </View>
          <View style={{ height: 80 }}></View>
        </ScrollView>
        <View style={[Helpers.bottomView, { backgroundColor: '#EFF2F7' }]}>
          <View style={[Helpers.btnContainer, { bottom: 0 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#28998D', '#28998D', '#28998D']}
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
                    'FacilityDetailsResultScreen-CreateANewFacility'
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

FacilityDetailsResultsListScreen.propTypes = {
  certifiedAllTesters: PropTypes.any,
  allFacilityErrorMessage: PropTypes.string,
  isFacilityProfileLoading: PropTypes.bool,
  authenticatedUser: PropTypes.any,
  getAllCertifiedTesters: PropTypes.func,
  resetAllFacilityStates: PropTypes.func,
  resetAllPatientStates: PropTypes.func, // for Doing null values of FacilityPatientList
  testAllResults: PropTypes.any,
  testAllResultsErrorMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,
  getTestAllResults: PropTypes.func,
  selectedMessage: PropTypes.any,
  savePatientDetailSuccess: PropTypes.func,
  selectedPatientProfile: PropTypes.any,
};

const mapStateToProps = (state) => ({
  certifiedAllTesters: state.facilityProfile.certifiedAllTesters,
  allFacilityErrorMessage:
    state.facilityProfile.certifiedAllTestersErrorMessage,
  isFacilityProfileLoading: state.facilityProfile.isFacilityProfileLoading,
  testAllResults: state.patientProfile.testAllResults,
  testAllResultsErrorMessage: state.patientProfile.testAllResultsErrorMessage,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
  selectedPatientProfile: state.patientProfile.selectedPatientProfile,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCertifiedTesters: (data) =>
    dispatch(FacilityProfileActions.getAllCertifiedTesters(data)),
  resetAllFacilityStates: () =>
    dispatch(FacilityProfileActions.resetAllFacilityStates()),
  resetAllPatientStates: () =>
    dispatch(PatientProfileActions.resetAllPatientStates()),
  getTestAllResults: (data) =>
    dispatch(PatientProfileActions.getTestAllResults(data)),
  savePatientDetailSuccess: (data) =>
    dispatch(FacilityProfileActions.savePatientDetailSuccess(data)),
  storePatientProfileImage: (data) =>
    dispatch(PatientProfileActions.storePatientProfileImage(data)),
  resetPatientProfileImage: () =>
    dispatch(PatientProfileActions.resetPatientProfileImage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityDetailsResultsListScreen);

const styles = StyleSheet.create({});
