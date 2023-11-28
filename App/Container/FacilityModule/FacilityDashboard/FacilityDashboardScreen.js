import React, { Component, createRef } from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Images,
  Helpers,
} from 'App/Theme';

import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { LanguageEnum } from 'App/Enums';
import { Enums } from '../../../Enums';

class FacilityDashboardScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchvalue: '',
      IsCancelButton: false,
      DayName: '',
      Date: '',
      Faq: [],
      IsLogoutPopUp: false,
      showPopover: false,
      FaqTabClose: false,
    };

    this.touchable = createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.faqContentSuccessMessage != null &&
      prevProps.faqContentSuccessMessage != this.props.faqContentSuccessMessage
    ) {

      let list = this.props.faqContentList.slice();

      this.setState({ Faq: list });
    }
  }

  componentDidMount() {
    this.props.resetFaqList();
    this.props.getFaqList();
  }

  getUserDetail() {
    let { authenticatedUser } = this.props;
    this.props.getUserDetailById({
      UserId: authenticatedUser.UserId,
      UserKey: authenticatedUser.UserKey,
      IsComeFrom: Enums.UpdateUserScreen,
      UserRoleId: authenticatedUser.UserRoleId,
    });
  }

  onChangeText(test) {
    if (test != '') {
      this.setState({ searchvalue: test, IsCancelButton: true });
    } else {
      this.setState({ searchvalue: test, IsCancelButton: false });
    }
  }

  _OnClickCancel() {
    this.setState({ IsCancelButton: false, searchvalue: '' });
    this.setState({ Faq: this.props.faqContentList });
  }

  _ClosePopup() {
    this.setState({ IsLogoutPopUp: false });
    this.props.logOut();
  }
  _GotoSearchPage() {
    NavigationService.navigate('FacilitiesPatientList');
  }

  componentWillUnmount() {
    this.props.resetAllFacilityStates();
  }

  SearchTextChanged(text) {
    if (text != '') {
      let filter = this.state.Faq.filter((d) => {
        return d.Question.toLowerCase().includes(text.toLowerCase());
      });
      this.setState({ searchvalue: text, IsCancelButton: true, Faq: filter });
    } else {
      this.setState({
        searchvalue: text,
        IsCancelButton: false,
        Faq: this.props.faqContentList,
      });
    }
  }

  _closeBottomSheet() {
    this.setState({ searchvalue: '', IsCancelButton: false });
  }
  renderChildItem(item) {
    if (item.IsImageURL) {
      return (
        <Image
          style={[{ height: 200, width: 200, marginLeft: 50 }]}
          resizeMode="contain"
          source={{ uri: item.ContentText }}
        />
      );
    } else if (item.Child.length > 0) {
      return item.Child.map((i) => {
        return this.renderChildItem(i);
      });
    } else if (item.IsButton) {
      return (
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: '90%',
          }}>
          <TouchableOpacity onPress={this.downloadPDF.bind(this, item.URL)}>
            <View
              style={{
                width: 150,
                height: 40,
                flexDirection: 'row',
                borderRadius: 20,
                backgroundColor: Colors.patientColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 12,
                    color: 'white',
                    textAlign: 'center',
                    width: '90%',
                  },
                ]}>
                {item.ContentText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <Text
          style={[
            Helpers.btnText,
            {
              color: Colors.Black,
              fontSize: 14,
              textAlign: 'left',
              marginLeft: 30,
              marginTop: 5,
            },
          ]}>
          {item.ContentText}
        </Text>
      );
    }
  }

  _ShowQuestionDetails(item) {

    let faq = this.state.Faq.slice();

    let index = faq.findIndex((d) => {
      return d.Question == item.Question;
    });
    faq[index].IsQuestionClicked = !faq[index].IsQuestionClicked;
    this.setState({ Faq: faq });
  }

  _ResetList() {
    NavigationService.navigate('FAQNewScreen');
  }

  renderItem(Item) {
    return (
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: '#DCDCDC',
            }}>
            <View
              style={{
                flexDirection: 'column',
                marginVertical: 15,
                width: '85%',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  Helpers.btnText,
                  {
                    color: Item.IsQuestionClicked
                      ? Colors.patientColor
                      : Colors.Black,
                    fontSize: 14,
                    textAlign: 'left',
                    marginLeft: 30,
                    marginTop: 5,
                  },
                ]}>
                {Item.Question}
              </Text>
              {Item.IsQuestionClicked
                ? Item.Child.map((data) => {
                  return <View>{this.renderChildItem(data)}</View>;
                })
                : null}
            </View>
            <View style={{ width: '15%' }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: 10,
                  flexDirection: 'column',
                  borderRadius: 50 / 2,
                  justifyContent: Item.IsQuestionClicked
                    ? 'flex-start'
                    : 'center',
                }}
                onPress={this._ShowQuestionDetails.bind(this, Item)}>
                <Image
                  style={[
                    Helpers.iconsmall,
                    {
                      marginTop: Item.IsQuestionClicked ? 22 : 10,
                      transform: [
                        { rotate: Item.IsQuestionClicked ? '270deg' : '180deg' },
                      ],
                    },
                  ]}
                  resizeMode="contain"
                  source={Images.PurPleBackIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  downloadPDF(URL) {
    Linking.canOpenURL(URL)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(URL);
        }
      })
      .catch((err) => console.log(err));
  }
  _CloseFAQtb() {
    this.setState({ FaqTabClose: true });
    this.RBSheet.close();
  }

  _OprnTerms() {
    Linking.openURL(this.props.selectedMessage['TermsCondtions-URL']);
    this.setState({ showPopover: false });
  }
  _OprnPrivacyPolicy() {
    Linking.openURL(this.props.selectedMessage['Privacy-URL']);
    this.setState({ showPopover: false });
  }
  _OprnLicenseAgreemnt() {
    Linking.openURL('https://www.covistix.com/eula');
    this.setState({ showPopover: false });
  }

  render() {

    var d = new Date();
    let days = [];

    days = LanguageEnum['WeekDays-' + this.props.locale];

    let DayName = days[d.getDay()];
    var UStime = d.getHours();
    var USMinute = d.getMinutes();
    return (
      <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={600}
          openDuration={250}
          onClose={this._closeBottomSheet.bind(this)}
          customStyles={{
            container: {
              backgroundColor: Colors.buttonPURPLEcolor,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
          }}>
          <View
            style={[
              {
                marginBottom: 50,
                width: '100%',
                position: 'relative',
                backgroundColor: '#fbfbfb',
                height: '100%',
              },
            ]}>
            <TouchableOpacity
              onPress={this._CloseFAQtb.bind(this)}
              style={{
                backgroundColor: '#614698',
                height: 120,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
              <View
                style={{
                  width: 80,
                  marginTop: 10,
                  height: 4,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}></View>

              <Text
                style={[
                  Helpers.btnText,
                  Helpers.bold,
                  {
                    color: Colors.white,
                    fontSize: 24,
                    textAlign: 'center',
                    marginTop: 15,
                    marginBottom: 20,
                  },
                ]}>
                {' '}
                FAQ{' '}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 88,
                justifyContent: 'center',
                position: 'absolute',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'transparent',
                height: 55,
              }}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    marginTop: 0,
                    justifyContent: 'center',
                    backgroundColor: 'white',
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
                      { marginLeft: 20, marginVertical: 15 },
                    ]}
                    resizeMode="contain"
                    source={Images.BlackSearchIcon}
                  />
                ) : (
                  <Image
                    style={[
                      Helpers.iconsmall,
                      { marginLeft: 20, marginVertical: 15 },
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
                  placeholder={
                    this.props.selectedMessage['FAQuestion-SearchQuestion']
                  }
                  onChangeText={this.SearchTextChanged.bind(this)}
                  value={this.state.searchvalue}
                />
              </View>
              {this.state.IsCancelButton ? (
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 50,
                    marginLeft: 10,
                    borderRadius: 50 / 2,
                    alignItems: 'center',
                    backgroundColor: 'red',
                  }}
                  onPress={this._OnClickCancel.bind(this)}>
                  <Image
                    style={[Helpers.iconsmall, { marginVertical: 17 }]}
                    resizeMode="contain"
                    source={Images.CrossIcon}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={{ height: 25, marginTop: 5 }}></View>
            <ScrollView>
              <View style={{ alignItems: 'center', height: 80 }}>
                <Text
                  style={[
                    Helpers.btnText,
                    Helpers.bold,
                    {
                      color: Colors.lightblack,
                      fontSize: 18,
                      marginTop: 50,
                      textAlign: 'center',
                    },
                  ]}>
                  {this.props.selectedMessage['FAQuestion-TopQuestion']}{' '}
                </Text>
              </View>

              {this.state.Faq.map((i) => {
                return this.renderItem(i);
              })}

              <View style={{ height: 50, marginBottom: 50 }}></View>
            </ScrollView>

            <View
              style={[
                Helpers.bottomView,
                { backgroundColor: 'white', height: 65 },
              ]}>
              <View style={[Helpers.btnContainer, { bottom: 0, height: 65 }]}>
                <TouchableOpacity
                  style={{
                    height: 65,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                  onPress={this._CloseFAQtb.bind(this)}>
                  <Image
                    style={{ width: 60, height: 60, marginRight: 20 }}
                    resizeMode="contain"
                    source={Images.inActiveCenterIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RBSheet>

        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsLogoutPopUp: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsLogoutPopUp}
          PopUpContainerStyle={{ backgroundColor: Colors.facilityColor }}
          HeaderTitle={this.props.selectedMessage['FacProfile-Logout']}
          HeadTitleColor="#FFFFFF"
          MessageColor="#FFFFFF"
          leftbuttonbordercolor="#FFFFFF"
          leftbuttontextcolor="#FFFFFF"
          rightbuttontextcolor={Colors.facilityColor}
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
              width: '20%',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              backgroundColor: 'transparent',
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <TouchableOpacity onPress={this._ResetList.bind(this)}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    marginLeft: 16,
                    flexDirection: 'row',
                    borderRadius: 30,
                    backgroundColor: Colors.patientColor,
                    justifyContent: 'center',
                    alignItems: 'center',

                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 1,
                    elevation: 15,
                  }}>
                  <Image
                    style={Helpers.tabIcon}
                    resizeMode="contain"
                    source={Images.FacilityQuestionIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: '60%',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image
                style={{ width: 70, height: 50 }}
                resizeMode="cover"
                source={Images.MainLogo}
              />
            </View>
          </View>

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
                onPress={() => {
                  this.setState({ showPopover: true });
                }}>
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
                placement={PopoverPlacement.BOTTOM}
                from={this.touchable}
                popoverStyle={{ backgroundColor: Colors.facilityColor }}
                onRequestClose={() => this.setState({ showPopover: false })}>
                <View style={{ backgroundColor: Colors.facilityColor }}>
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
                            color: Colors.white,
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
                            color: Colors.white,
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
                            color: Colors.white,
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
                            color: Colors.white,
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
                      borderBottomColor: Colors.facilityColor,
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
                            color: Colors.white,
                          }}>
                          {this.props.selectedMessage['ProfileSetting-LogOut']}
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
            marginTop: 100,
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
                marginTop: 4,
              },
            ]}>
            {DayName}, {UStime > 12 ? '0' + UStime - 12 : UStime}:
            {USMinute < 10 ? '0' + USMinute : USMinute}
            {UStime < 12 ? 'am' : 'pm'},
          </Text>
          <Text
            numberOfLines={2}
            style={[
              Helpers.bold,
              {
                fontSize: 28,
                marginLeft: 15,
                color: '#333333',
                textAlign: 'left',
                width: '90%',
              },
            ]}>
            {this.props.selectedMessage['FacDashboard-Hello']},{' '}
            {this.props.authenticatedUser?.FirstName}
          </Text>
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
            {
              <Image
                style={[
                  Helpers.iconsmall,
                  { marginLeft: 20, marginVertical: 15 },
                ]}
                resizeMode="contain"
                source={Images.GraySearchIcon}
              />
            }
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
                this.props.selectedMessage['FacDashboard-SearchPatient']
              }
              onFocus={this._GotoSearchPage.bind(this)}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

FacilityDashboardScreen.propTypes = {
  allFacility: PropTypes.any,
  allFacilityErrorMessage: PropTypes.string,
  isFacilityProfileLoading: PropTypes.bool,
  authenticatedUser: PropTypes.any,
  getAllFacilityProfiles: PropTypes.func,
  resetAllFacilityStates: PropTypes.func,
  getFaqList: PropTypes.func,
  faqContentList: PropTypes.any,
  faqContentSuccessMessage: PropTypes.any,
  faqContentErrorrMessage: PropTypes.any,
  logOut: PropTypes.func,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
  getUserDetailById: PropTypes.func,
};

const mapStateToProps = (state) => ({
  allFacility: state.facilityProfile.allFacility,
  allFacilityErrorMessage: state.facilityProfile.allFacilityErrorMessage,
  isFacilityProfileLoading: state.facilityProfile.isFacilityProfileLoading,
  authenticatedUser: state.authenticate.authenticatedUser,
  faqContentList: state.facilityProfile.faqContentList,
  faqContentSuccessMessage: state.facilityProfile.faqContentSuccessMessage,
  faqContentErrorrMessage: state.facilityProfile.faqContentErrorrMessage,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});

const mapDispatchToProps = (dispatch) => ({
  getFaqList: () => dispatch(FacilityProfileActions.getFaqList()),
  resetFaqList: () => dispatch(FacilityProfileActions.resetFaqList()),
  getAllFacilityProfiles: (data) =>
    dispatch(FacilityProfileActions.getAllFacilityProfiles(data)),
  resetAllFacilityStates: () =>
    dispatch(FacilityProfileActions.resetAllFacilityStates()),
  logOut: () => dispatch(AuthenticateActions.logOut()),
  getUserDetailById: (data) =>
    dispatch(AuthenticateActions.getUserDetailById(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityDashboardScreen);

const styles = StyleSheet.create({});
