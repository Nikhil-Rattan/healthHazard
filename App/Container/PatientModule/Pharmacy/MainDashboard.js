import React, { Component, createRef } from 'react';
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
  SearchBar,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

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

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import ListCard from 'App/Components/ListCard';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import CustomSearchTextbox from 'App/Components/CustomSearchTextbox';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { LanguageEnum, Enums } from 'App/Enums';
class MainDashboard extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      IsMessageShow: false,
      Message: '',
      searchvalue: '',
      IsCancelButton: false,
      DayName: '',
      Date: '',
      US_Time: '',
      FacilityList: [],
      IsLogoutPopUp: false,
      showPopover: false,
    };
    this.touchable = createRef();
  }
  componentDidMount() {
    this.props.closeAllLoader();
    let { authenticatedUser } = this.props;
    this.props.getUserDetailById({
      UserId: authenticatedUser.UserId,
      UserKey: authenticatedUser.UserKey,
      IsComeFrom: Enums.UpdateUserScreen,
      UserRoleId: authenticatedUser.UserRoleId,
    });

    let payload = {
      FacilityId: 0,
      OrderBy: 'asc',
      OrderByColumn: 'FacilityName',
      PageSize: 250,
      PageNo: 1,
      SearchQuery:
        " and (Zipcode='" +
        this.props.authenticatedUser?.ZipCode +
        "'" +
        '  or CityId=' +
        this.props.authenticatedUser?.CityId +
        " or State='" +
        this.props.authenticatedUser?.State +
        "')",
    };
    // console.log(payload)
    this.props.getAllFacilityProfiles(payload);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allFacility.length != this.props.allFacility.length) {
      this.setState({ FacilityList: this.props.allFacility });
    } else if (this.props.allFacility.length === 0) {
      setTimeout(() => {
        if (this.state.FacilityList.length === 0) {
          let payload = {
            FacilityId: 0,
            OrderBy: 'asc',
            OrderByColumn: 'FacilityName',
            PageSize: 250,
            PageNo: 1,
            SearchQuery: '  ',
          };
          //  console.log(payload)
          this.props.getAllFacilityProfiles(payload);
        }
      }, 1500);
    }
  }

  getItemDetail(item) {
    // console.log( (item))
    NavigationService.navigate('PharmacyDetailsScreen', { itemDetail: item });
  }

  onChangeText(test) {
    if (test != '') {
      this.setState({ searchvalue: test, IsCancelButton: true });
    } else {
      this.setState({ searchvalue: test, IsCancelButton: false });
    }
  }

  _OnClickCancel() {
    this.setState({ IsCancelButton: false });
  }

  _GotoSearchPage() {
    NavigationService.navigate('Pharmacylist');
  }

  componentWillUnmount() {
    this.props.resetAllFacilityStates();
  }

  _ClosePopup() {
    this.setState({ IsLogoutPopUp: false });
    this.props.logOut();
  }
  _TogglePopOver() {
    let showPopover = !this.state.showPopover;
    this.setState({ showPopover });
  }

  _GotoSurvey() {
    if (this.props.authenticatedUser?.IsSurveyCompleted) {
      this.setState({ showPopover: false });
      let SessionMessage = this.props.selectedMessage[
        'InformationMessagesScreen-SurveySubmitted'
      ];
      this.setState({ IsMessageShow: true, Message: SessionMessage });

      return;
    }
    NavigationService.navigate('PatientSurvey');
    this.setState({ showPopover: false });
    this.props.resetAddUserSurvey();
    this.props.resetUserSurvey();
    this.props.getUserSurvey({
      SurveyId: 2,
      UserId: this.props.authenticatedUser?.UserId,
    });
  }

  _OprnTerms() {
    Linking.openURL(this.props.selectedMessage['TermsCondtions-URL']);
    this.setState({ showPopover: false });
  }
  _OprnPrivacyPolicy() {
    Linking.openURL(this.props.selectedMessage['Privacy-URL']);
    this.setState({ showPopover: false });
  }

  _CloseAlert() {
    this.setState({ IsMessageShow: false });
  }

  render() {
    var d = new Date();

    let days = LanguageEnum['WeekDays-' + this.props.locale];
    //   {this.props.locale==LanguageEnum.English?

    //     days= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    // :

    // days=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]

    // }

    let DayName = days[d.getDay()];
    let TodayDate = d.getDate();
    let Todaytime = d.getHours();

    //var UStime = d.getHours();
    var UStime = d.getHours();
    var USMinute = d.getMinutes();

    return (
      <View style={[{ backgroundColor: 'white', flex: 1 }]}>
        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsMessageShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsMessageShow}
          PopUpContainerStyle={{
            backgroundColor: Colors.patientColor,
            alignItems: 'center',
          }}
          HeaderTitle=""
          HeadTitleColor="#FFFFFF"
          SingleButtonText={this.props.selectedMessage['Register-Close']}
          SigleButtonBackground="#FFFFFF"
          MessageColor="#FFFFFF"
          SingleButtonTextColor={Colors.patientColor}
          leftbuttonbordercolor="#FFFFFF"
          leftbuttontextcolor="#FFFFFF"
          rightbuttontextcolor={Colors.patientColor}
          Rightbuttonbackgroundcolor="#FFFFFF"
          AlertMessageTitle={this.state.Message}
          _onRightButtonPress={this._CloseAlert.bind(this)}
          hasSingleButton={true}
        />
        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsLogoutPopUp: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsLogoutPopUp}
          PopUpContainerStyle={{ backgroundColor: Colors.patientColor }}
          HeaderTitle={this.props.selectedMessage['FacProfile-Logout']}
          HeadTitleColor="#FFFFFF"
          MessageColor="#FFFFFF"
          leftbuttonbordercolor="#FFFFFF"
          leftbuttontextcolor="#FFFFFF"
          rightbuttontextcolor={Colors.patientColor}
          Rightbuttonbackgroundcolor="#FFFFFF"
          AlertMessageTitle={
            this.props.selectedMessage['FacProfile-AreYouSureYouWantToLogout']
          }
          _onLeftButtonPress={() => {
            this.setState({ IsLogoutPopUp: false });
          }}
          _onRightButtonPress={this._ClosePopup.bind(this)}
          LeftButtonText={this.props.selectedMessage['FacProfile-Cancel']}
          RightButtonText={this.props.selectedMessage['FacProfile-Confirm']}
        />

        {/* <ScrollView> */}
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 40,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '80%',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={[
                Helpers.lightFont,
                {
                  fontSize: 15,
                  marginLeft: 15,
                  color: '#414141',
                  textAlign: 'left',
                  width: '90%',
                  marginTop: 0,
                  marginBottom: 15,
                },
              ]}>
              {DayName}, {UStime > 12 ? '0' + UStime - 12 : UStime}:
              {USMinute < 10 ? '0' + USMinute : USMinute}
              {UStime < 12 ? ' am' : ' pm'},
            </Text>
            <Text
              numberOfLines={1}
              style={[
                Helpers.bold,
                {
                  fontSize: 20,
                  marginLeft: 15,
                  color: '#333333',
                  textAlign: 'left',
                  width: '90%',
                },
              ]}>
              {UStime < 12
                ? this.props.selectedMessage['SearchFacility-GoodMorning']
                : UStime > 12 && UStime > 16
                  ? this.props.selectedMessage['SearchFacility-GoodEvening']
                  : this.props.selectedMessage['SearchFacility-GoodAfternoon']}
              ,{' '}
            </Text>

            <Text
              numberOfLines={2}
              style={[
                Helpers.bold,
                {
                  fontSize: 20,
                  marginLeft: 15,
                  color: '#333333',
                  textAlign: 'left',
                  width: '90%',
                },
              ]}>
              {this.props.authenticatedUser?.FirstName}
            </Text>
          </View>

          {/* {"Pop Over View"} */}
          <View
            style={{
              width: '20%',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              backgroundColor: 'transparent',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: 15,
              }}>
              <TouchableOpacity
                ref={this.touchable}
                onPress={this._TogglePopOver.bind(this)}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    flexDirection: 'row',
                    borderRadius: 30,
                    backgroundColor: '#F5B100',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#F5B100',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 1,
                    elevation: 15,
                  }}>
                  <Image
                    style={Helpers.tabIcon}
                    resizeMode="contain"
                    source={Images.SettingIcon}
                  />
                </View>
              </TouchableOpacity>
              <Popover
                isVisible={this.state.showPopover}
                from={this.touchable}
                popoverStyle={{ backgroundColor: Colors.patientColor }}
                onRequestClose={() => this.setState({ showPopover: false })}
                placement={PopoverPlacement.BOTTOM}>
                <View style={{ backgroundColor: Colors.patientColor }}>
                  <View
                    style={{
                      borderBottomColor: '#FFFFFF',
                      borderBottomWidth: 0.5,
                      height: 45,
                      width: 200,
                    }}>
                    <TouchableOpacity onPress={this._GotoSurvey.bind(this)}>
                      <View
                        style={[
                          Helpers.bold,
                          { height: 45, width: 200, justifyContent: 'center' },
                        ]}>
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                          }}>
                          {
                            this.props.selectedMessage[
                            'SearchFacility-PatientSurvey'
                            ]
                          }
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#FFFFFF',
                      borderBottomWidth: 0.5,
                      height: 45,
                      width: 200,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        NavigationService.navigate('ProfileScreen');
                        this.setState({ showPopover: false });
                      }}>
                      <View
                        style={[
                          Helpers.bold,
                          { height: 45, width: 200, justifyContent: 'center' },
                        ]}>
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                          }}>
                          {this.props.selectedMessage['ProfileSetting-Profile']}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#FFFFFF',
                      borderBottomWidth: 0.5,
                      height: 45,
                      width: 200,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        NavigationService.navigate('ChangePasswordScreen');
                        this.setState({ showPopover: false });
                      }}>
                      <View
                        style={[
                          Helpers.bold,
                          { height: 45, width: 200, justifyContent: 'center' },
                        ]}>
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                          }}>
                          {
                            this.props.selectedMessage[
                            'ProfileSetting-ChangePassword'
                            ]
                          }
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      borderBottomColor: '#FFFFFF',
                      borderBottomWidth: 0.5,
                      height: 45,
                      width: 200,
                    }}>
                    <TouchableOpacity onPress={this._OprnTerms.bind(this)}>
                      <View
                        style={[
                          Helpers.bold,
                          { height: 45, width: 200, justifyContent: 'center' },
                        ]}>
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                          }}>
                          {
                            this.props.selectedMessage[
                            'ProfileSetting-TermsOfUse'
                            ]
                          }
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#FFFFFF',
                      borderBottomWidth: 0.5,
                      height: 45,
                      width: 200,
                    }}>
                    <TouchableOpacity
                      onPress={this._OprnPrivacyPolicy.bind(this)}>
                      <View
                        style={[
                          Helpers.bold,
                          { height: 45, width: 200, justifyContent: 'center' },
                        ]}>
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                          }}>
                          {
                            this.props.selectedMessage[
                            'ProfileSetting-PrivacyPolicy'
                            ]
                          }
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      borderBottomColor: Colors.patientColor,
                      borderBottomWidth: 0.5,
                      height: 45,
                      width: 200,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ IsLogoutPopUp: true });
                        this.setState({ showPopover: false });
                      }}>
                      <View
                        style={[
                          Helpers.bold,
                          { height: 45, width: 200, justifyContent: 'center' },
                        ]}>
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                          }}>
                          {this.props.selectedMessage['SearchFacility-LogOut']}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </Popover>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'transparent',
            height: 60,
            marginTop: 30,
          }}>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: Colors.TooLightGray,
                width: '90%',
                borderRadius: 30,
              },
              this.state.IsCancelButton ? { width: '70%' } : { width: '90%' },
            ]}>
            <Image
              style={[
                Helpers.iconsmall,
                { marginLeft: 20, marginVertical: 15, tintColor: this.state.IsCancelButton ? "#000000" : "#D3DCE6" },
              ]}
              resizeMode="contain"
              source={Images.SearchIcon}
            />
            {/* {this.state.IsCancelButton ? (
              <Image
                style={[
                  Helpers.iconsmall,
                  {marginLeft: 20, marginVertical: 15},
                ]}
                resizeMode="contain"
                source={Images.BlackSearchIcon}
              />
            ) : (
              <Image
                style={[
                  Helpers.iconsmall,
                  {marginLeft: 20, marginVertical: 15},
                ]}
                resizeMode="contain"
                source={Images.GraySearchIcon}
              />
            )} */}
            <TextInput
              style={{
                height: 40,
                fontSize: 17,
                borderColor: 'gray',
                marginLeft: 10,
                width: '80%',
                marginTop: 3,
              }}
              onChangeText={(text) => this.onChangeText(text)}
              placeholder={
                this.props.selectedMessage[
                'SearchFacility-SearchTestingFacilities'
                ]
              }
              onFocus={this._GotoSearchPage.bind(this)}
              value={this.state.searchvalue}
            />
          </View>
          {this.state.IsCancelButton ? (
            <TouchableOpacity onPress={this._OnClickCancel.bind(this)}>
              <Text
                style={[
                  ,
                  {
                    fontSize: 18,
                    color: Colors.ErrorREdColor,
                    textAlign: 'left',
                    marginLeft: 20,
                    marginTop: 0,
                  },
                ]}>
                {this.props.selectedMessage['FacProfile-Cancel']}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {/* Partially Done search Reult  */}
        <Text
          style={[
            Helpers.mediumFont,
            {
              fontSize: 18,
              color: Colors.lightblack,
              textAlign: 'left',
              marginLeft: 20,
              marginTop: 35,
              marginBottom: 10,
            },
          ]}>
          {this.props.allFacility?.length > 0
            ? this.props.selectedMessage['SearchFacility-NearbyTestingSites'] +
            ' ' +
            '(' +
            this.props.allFacility?.length +
            ')'
            : this.props.selectedMessage['SearchFacilities-NotAvailable']}
        </Text>
        <FlatList
          style={Helpers.Listroot}
          data={this.props.allFacility}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginBottom: 25,
                }}>
                <ListCard
                  name={item.FacilityName}
                  address={item.Address}
                  distance={''}
                  getItemDetail={this.getItemDetail.bind(this, item)}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

MainDashboard.propTypes = {
  allFacility: PropTypes.any,
  allFacilityErrorMessage: PropTypes.string,
  isFacilityProfileLoading: PropTypes.bool,
  authenticatedUser: PropTypes.any,
  getAllFacilityProfiles: PropTypes.func,
  resetAllFacilityStates: PropTypes.func,
  logOut: PropTypes.func,
  getUserSurvey: PropTypes.func,
  resetUserSurvey: PropTypes.func,
  resetAddUserSurvey: PropTypes.func,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
  getUserDetailById: PropTypes.func,
};

const mapStateToProps = (state) => ({
  allFacility: state.facilityProfile.allFacility,
  allFacilityErrorMessage: state.facilityProfile.allFacilityErrorMessage,
  isFacilityProfileLoading: state.facilityProfile.isFacilityProfileLoading,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});

const mapDispatchToProps = (dispatch) => ({
  getAllFacilityProfiles: (data) =>
    dispatch(FacilityProfileActions.getAllFacilityProfiles(data)),
  resetAllFacilityStates: () =>
    dispatch(FacilityProfileActions.resetAllFacilityStates()),
  logOut: () => dispatch(AuthenticateActions.logOut()),
  getUserSurvey: (data) => dispatch(AuthenticateActions.getUserSurvey(data)),
  resetUserSurvey: () => dispatch(AuthenticateActions.resetUserSurvey()),
  resetAddUserSurvey: () => dispatch(AuthenticateActions.resetAddUserSurvey()),
  getUserDetailById: (data) =>
    dispatch(AuthenticateActions.getUserDetailById(data)),
  closeAllLoader: () =>
    dispatch(AuthenticateActions.closeAllLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

const styles = StyleSheet.create({});
