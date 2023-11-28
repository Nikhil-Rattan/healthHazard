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
  SearchBar,
  ScrollView,
  SafeAreaView,
  AppState,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
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
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import ListCard from 'App/Components/ListCard';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import CustomSearchTextbox from 'App/Components/CustomSearchTextbox';
import { Enums } from 'App/Enums';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
class PatientMenu extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
    };

    this._GetNotificationCount = this._GetNotificationCount.bind(this);
  }

  launchCameraWithPermission() {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.8,
        maxHeight: 400,
        maxWidth: 400,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
          switch (response.errorCode) {
            case 'camera_unavailable':
              alert('Camera is not available');
              break;
            case 'permission':
              Linking.openSettings();
              break;
            case 'others':
              Linking.openSettings();
              break;
            default:
              break;
          }
        } else {
          if (response?.base64) {
            this.props.saveUserProfileImage({
              UserId: this.props.authenticatedUser?.UserId,
              FileType: 'jpeg',
              imageBinary: response?.base64,
            });
            this.ProfileOption.close();
          }
        }
      },
    );
  }

  async openCamera() {
    try {
      if (Platform.OS == 'android') {
        // Calling the permission function
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'COVISTIX App Camera Permission',
            message: 'COVISTIX App needs access to your gallery',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted
          this.launchCameraWithPermission();
        } else {
          // Permission Denied
          Linking.openSettings();
        }
      } else {
        this.launchCameraWithPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  }

  launchGalleryWithPermission() {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.8,
        maxHeight: 400,
        maxWidth: 400,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
          switch (response.errorCode) {
            case 'camera_unavailable':
              alert('Camera is not available');
              break;
            case 'permission':
              Linking.openSettings();
              break;
            case 'others':
              Linking.openSettings();
              break;
            default:
              break;
          }
        } else {
          if (response?.base64) {
            this.props.saveUserProfileImage({
              UserId: this.props.authenticatedUser?.UserId,
              FileType: 'jpeg',
              imageBinary: response?.base64,
            });
            this.ProfileOption.close();
          }
        }
      },
    );
  }

  async openGallery() {
    try {
      if (Platform.OS == 'android') {
        // Calling the permission function
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'COVISTIX App Camera Permission',
            message: 'COVISTIX App needs access to your camera',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted
          this.launchGalleryWithPermission();
        } else {
          // Permission Denied
          Linking.openSettings();
        }
      } else {
        this.launchGalleryWithPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._GetNotificationCount);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._GetNotificationCount);
  }

  _GetNotificationCount() {
    if (!(AppState.currentState == 'background')) {
      let { UserId } = this.props.authenticatedUser;
      this.props.getNotificationCount({ UserId: UserId });
    }
  }

  _GotoEditProfileScreen() {
    let editProfileScreen =
      this.props.authenticatedUser?.UserRoleId == Enums.Patient
        ? 'EditProfileScreen'
        : this.props.authenticatedUser?.UserRoleId == Enums.Facility
          ? 'FacilityeditProfilescreen'
          : 'EditTesterScreen';

    if (this.props.authenticatedUser?.UserRoleId == Enums.Tester) {
      this.props.resetTesterForEdit();
      this.props.getTesterForEditSuccess(this.props.authenticatedUser);
    }
    NavigationService.navigate(editProfileScreen);
  }

  _GotoBackScreen() {
    NavigationService.popScreen();
  }

  _ViewPatientProfile() {
    NavigationService.navigate('ViewProfileScreen');
  }

  _ClosePopup() {
    this.setState({ IsLogoutPopUp: false });
    this.props.logOut();
  }
  _CloseAlert() {
    this.setState({ IsMessageShow: false });
  }

  _GotoSurveyPage() {
    // NavigationService.navigate('PatientSurvey')

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
  _GotoChangePasswordScreen() {
    NavigationService.navigate('ChangePasswordScreen');
  }
  _OprnTerms() {
    Linking.openURL(this.props.selectedMessage['TermsCondtions-URL']);
    this.setState({ showPopover: false });
  }
  _OprnPrivacyPolicy() {
    Linking.openURL(this.props.selectedMessage['Privacy-URL']);
    this.setState({ showPopover: false });
  }
  render() {
    return (
      <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>
        <Dialog
          dialogStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          visible={this.props.authenticatedIsLoading}>
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

        <RBSheet
          ref={(ref) => {
            this.ProfileOption = ref;
          }}
          height={200}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            mask: { backgroundColor: 'transparent' },
            container: { elevation: 100 },
          }}>
          <View style={{ flex: 1, padding: 25 }}>
            <Text
              style={[
                Helpers.mediumFont,
                {
                  fontSize: 22,
                },
              ]}>
              {this.props.selectedMessage['Patient-ProfilePhoto']}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                height: 100,
              }}>
              <TouchableOpacity
                onPress={this.openCamera.bind(this)}
                style={{
                  width: 80,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  style={[{ height: 30, width: 30 }]}
                  resizeMode="contain"
                  source={Images.PTCamera}
                />
                <Text
                  style={[
                    Helpers.mediumFont,
                    {
                      fontSize: 15,
                      color: Colors.patientColor,
                    },
                  ]}>
                  {this.props.selectedMessage['Patient-ProfilePhoto-Camera']}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.openGallery.bind(this)}
                style={{
                  width: 80,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  style={[{ height: 30, width: 30 }]}
                  resizeMode="contain"
                  source={Images.PTGallery}
                />
                <Text
                  style={[
                    Helpers.mediumFont,
                    {
                      fontSize: 15,
                      color: Colors.patientColor,
                    },
                  ]}>
                  {this.props.selectedMessage['Patient-ProfilePhoto-Gallery']}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

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

        <ScrollView style={{ flex: 1, marginBottom: '6%' }}>
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TouchableOpacity
                style={{ marginTop: 25 }}
                onPress={() => {
                  this.ProfileOption.open();
                }}>
                {this.props.profilePic ? (
                  <View>
                    <Image
                      style={[Helpers.PharmacyPic, { borderRadius: 50 }]}
                      resizeMode="cover"
                      source={{
                        uri: `data:image/jpeg;base64,${this.props.profilePic}`,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#614698',
                        position: 'absolute',
                        width: 30,
                        height: 30,
                        marginLeft: 9,
                        marginTop: 70,
                        borderRadius: 15,
                      }}>
                      <Image
                        style={[
                          {
                            height: 14,
                            width: 14,
                            alignSelf: 'center',
                            marginTop: 7,
                          },
                        ]}
                        resizeMode="contain"
                        source={Images.pencilEdit}
                      />
                    </View>
                  </View>
                ) : (
                  <View>
                    <Image
                      style={[Helpers.PharmacyPic, { borderRadius: 50 }]}
                      resizeMode="contain"
                      source={Images.UserImage}
                    />
                    <View
                      style={{
                        backgroundColor: '#614698',
                        position: 'absolute',
                        width: 30,
                        height: 30,
                        marginLeft: 9,
                        marginTop: 70,
                        borderRadius: 15,
                      }}>
                      <Image
                        style={[
                          {
                            height: 14,
                            width: 14,
                            alignSelf: 'center',
                            marginTop: 7,
                          },
                        ]}
                        resizeMode="contain"
                        source={Images.pencilEdit}
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
              <Text
                style={[
                  Helpers.bold,
                  {
                    textTransform: 'capitalize',
                    fontSize: 20,
                    color: '#3C4858',
                    textAlign: 'center',
                    // width: '100%',
                    marginTop: 4,
                  },
                ]}>
                {this.props.authenticatedUser?.FirstName +
                  ' ' +
                  this.props.authenticatedUser?.LastName}
              </Text>

              <TouchableOpacity
                onPress={this._ViewPatientProfile.bind(this)}
                style={{
                  marginBottom: 50,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 7,
                }}>
                <Text
                  style={[
                    Helpers.mediumFont,
                    {
                      fontSize: 15,
                      color: Colors.patientColor,
                      textAlign: 'center',
                    },
                  ]}>
                  {this.props.selectedMessage['PatientMenu-ViewProfile']}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              flex: 1,
              backgroundColor: 'white',
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={this._GotoSurveyPage.bind(this)}
              style={{
                width: '100%',
                height: 56,
                borderRadius: 13,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#E5E9F2',
                borderWidth: 1,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.SurveyP}
                  style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: Colors.patientColor }}
                />
              </View>
              <Text
                numberOfLines={1}
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 18,
                    color: '#152C52',
                    width: '60%',
                    marginLeft: 25,
                  },
                ]}>
                {/* {"Patient Survey"} */}
                {this.props.selectedMessage['SearchFacility-PatientSurvey']}
              </Text>
              <View
                style={{
                  flexGrow: 1,
                  height: 50,
                  borderRadius: 5,
                  marginRight: 20,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.POCRightArrow}
                  style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
              </View>
            </TouchableOpacity>

            {/* {"Order History"} */}
            {/* <TouchableOpacity
              onPress={() => NavigationService.navigate('OrderHistoryScreen')}
              style={{
                width: '100%',
                marginTop: 8,
                height: 56,
                borderRadius: 13,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#E5E9F2',
                borderWidth: 1,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.orderhistory}
                  style={{ width: 24, height: 24, resizeMode: 'contain' }}
                />
              </View>
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 18,
                    color: '#152C52',
                    width: '60%',
                    marginLeft: 25,
                  },
                ]}>

                {this.props.selectedMessage['PatientMenu-OrderHistory']}
              </Text>
              <View
                style={{
                  flexGrow: 1,
                  height: 50,
                  borderRadius: 5,
                  marginRight: 20,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.POCRightArrow}
                  style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
              </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              onPress={this._GotoChangePasswordScreen.bind(this)}
              style={{
                width: '100%',
                marginTop: 8,
                height: 56,
                borderRadius: 13,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#E5E9F2',
                borderWidth: 1,
                backgroundColor: 'red'
              }}> */}
            {/* <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.changepasswordP}
                  style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: Colors.patientColor }}
                />
              </View> */}
            {/* <Text
                numberOfLines={1}
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 18,
                    color: '#152C52',
                    width: '60%',
                    marginLeft: 25,
                  },
                ]}>
                {this.props.selectedMessage['ProfileSetting-ChangePassword']}
              </Text> */}
            {/* <View
                style={{
                  flexGrow: 1,
                  height: 50,
                  borderRadius: 5,
                  marginRight: 20,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  backgroundColor:'pink'
                }}>
                <Image
                  source={Images.POCRightArrow}
                  style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
              </View> */}
            {/* </TouchableOpacity> */}

            <TouchableOpacity
              onPress={this._OprnTerms.bind(this)}
              //onPress={()=>NavigationService.navigateAndReset('SuccessScreenNew')}

              style={{
                width: '100%',
                marginTop: 8,
                height: 56,
                borderRadius: 13,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#E5E9F2',
                borderWidth: 1,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.termsofuseP}
                  style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: Colors.patientColor }}
                />
              </View>
              <Text
                numberOfLines={1}
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 18,
                    color: '#152C52',
                    width: '60%',
                    marginLeft: 25,
                  },
                ]}>
                {this.props.selectedMessage['ProfileSetting-TermsOfUse']}
              </Text>
              <View
                style={{
                  flexGrow: 1,
                  height: 50,
                  borderRadius: 5,
                  marginRight: 20,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.POCRightArrow}
                  style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this._OprnPrivacyPolicy.bind(this)}
              style={{
                width: '100%',
                marginTop: 8,
                height: 56,
                borderRadius: 13,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#E5E9F2',
                borderWidth: 1,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.PrivacyPolicyP}
                  style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: Colors.patientColor }}
                />
              </View>
              <Text
                numberOfLines={1}
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 18,
                    color: '#152C52',
                    width: '60%',
                    marginLeft: 25,
                  },
                ]}>
                {this.props.selectedMessage['ProfileSetting-PrivacyPolicy']}
              </Text>
              <View
                style={{
                  flexGrow: 1,
                  height: 50,
                  borderRadius: 5,
                  marginRight: 20,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.POCRightArrow}
                  style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({ IsLogoutPopUp: true });
              }}
              style={{
                width: '100%',
                marginTop: 8,
                height: 56,
                borderRadius: 13,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#E5E9F2',
                borderWidth: 1,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.LogoutP}
                  style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: Colors.patientColor }}
                />
              </View>
              <Text
                numberOfLines={1}
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 18,
                    color: '#152C52',
                    width: '60%',
                    marginLeft: 25,
                  },
                ]}>
                {this.props.selectedMessage['ProfileSetting-LogOut']}
              </Text>
              <View
                style={{
                  flexGrow: 1,
                  height: 50,
                  borderRadius: 5,
                  marginRight: 20,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.POCRightArrow}
                  style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

PatientMenu.propTypes = {
  authenticatedUser: PropTypes.any,
  signOut: PropTypes.func,
  selectedMessage: PropTypes.any,
  getTesterForEditSuccess: PropTypes.func,
  resetTesterForEdit: PropTypes.func,
  getUserDetailById: PropTypes.func,
  logOut: PropTypes.func,

  resetAddUserSurvey: PropTypes.func,
  resetUserSurvey: PropTypes.func,
  getUserSurvey: PropTypes.func,
  getNotificationCount: PropTypes.func,
  profilePic: PropTypes.any,
  authenticatedIsLoading: PropTypes.any,
  saveUserProfileImage: PropTypes.func,
  locale: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
  profilePic: state.authenticate.profilePic,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  locale: state.startup.locale,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(AuthenticateActions.logOut()),
  resetAddUserSurvey: () => dispatch(AuthenticateActions.resetAddUserSurvey()),
  resetUserSurvey: () => dispatch(AuthenticateActions.resetUserSurvey()),
  getUserSurvey: (data) => dispatch(AuthenticateActions.getUserSurvey(data)),
  // signOut: () => dispatch(AuthenticateActions.signOut()),
  //getTesterForEditSuccess: (data) => dispatch(FacilityProfileActions.getTesterForEditSuccess(data)),
  // resetTesterForEdit:()=>dispatch(FacilityProfileActions.resetTesterForEdit()),
  getUserDetailById: (data) =>
    dispatch(AuthenticateActions.getUserDetailById(data)),
  getNotificationCount: (data) =>
    dispatch(AuthenticateActions.getNotificationCount(data)),
  saveUserProfileImage: (data) =>
    dispatch(AuthenticateActions.saveUserProfileImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientMenu);

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    padding: 25,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
});
