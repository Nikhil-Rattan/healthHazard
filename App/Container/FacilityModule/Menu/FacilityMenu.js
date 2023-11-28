import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Images,
  Helpers,
} from 'App/Theme';

import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import { Enums } from 'App/Enums';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

class FacilityMenu extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
    };
  }

  componentDidMount() {
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

  _onPressDownloadQRcodeButton() {
    let Id =
      this.props.authenticatedUser?.UserRoleId == Enums.Patient
        ? this.props.authenticatedUser?.PatientId
        : this.props.authenticatedUser?.FacilityUserId;
    let URL =
      'https://staging.covistix.com/mobile-qr-code/' +
      this.props.authenticatedUser?.UserRoleId +
      '/' +
      Id;
    Linking.canOpenURL(URL)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(URL);
        }
      })
      .catch((err) => console.log(err));
  }

  _ViewPatientProfile() {
    NavigationService.navigate('FaciltyViewProfileScreen', { IsUserEdit: true });
  }

  _ClosePopup() {
    this.setState({ IsLogoutPopUp: false });
    this.props.logOut();
  }
  _CloseAlert() {
    this.setState({ IsMessageShow: false });
  }

  _GotoManageFacility() {
    NavigationService.navigate('FaciltyViewProfileScreen', { IsUserEdit: false });
  }

  _GotoSurveyPage() {

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
      <SafeAreaView style={[{ backgroundColor: '#FFFFFF', flex: 1 }]}>
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
                  source={Images.POCCamera}
                />
                <Text
                  style={[
                    Helpers.mediumFont,
                    {
                      fontSize: 15,
                      color: Colors.facilityColor,
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
                  source={Images.POCGallery}
                />
                <Text
                  style={[
                    Helpers.mediumFont,
                    {
                      fontSize: 15,
                      color: Colors.facilityColor,
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

        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              minHeight: 226,
              marginVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>

            <View
              style={{
                flexDirection: 'column',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  backgroundColor: '#eaf5f4',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <TouchableOpacity
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
                          backgroundColor: '#28998D',
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
                          backgroundColor: '#28998D',
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
              </View>

              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    textTransform: 'capitalize',
                    fontSize: 36,
                    color: '#3C4858',
                    textAlign: 'center',
                    marginTop: 4,
                  },
                ]}>
                {this.props.authenticatedUser?.FirstName +
                  ' ' +
                  this.props.authenticatedUser?.LastName}
              </Text>

              <TouchableOpacity onPress={this._ViewPatientProfile.bind(this)}>
                <View style={{ height: 40, width: '100%' }}>
                  <Text
                    style={[
                      Helpers.mediumFont,
                      {
                        fontSize: 15,
                        color: '#28998D',
                        textAlign: 'center',
                      },
                    ]}>
                    {/* {"Edit Profile"} */}
                    {this.props.selectedMessage['EditFacProfile-EditProfile']}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              paddingHorizontal: 20,
            }}>
            {!(this.props.authenticatedUser?.UserRoleId == Enums.Tester) ? (
              <TouchableOpacity
                onPress={this._GotoManageFacility.bind(this)}
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
                    source={Images.PocFacilityIcon}
                    style={{ width: 24, height: 24, resizeMode: 'contain' }}
                  />
                </View>
                <Text
                  style={[
                    Helpers.mediumFont,
                    {
                      fontSize: 17,
                      color: '#152C52',
                      width: '60%',
                      marginLeft: 25,
                    },
                  ]}>
                  {/* {"Manage Facility"} */}
                  {this.props.selectedMessage['FacilityMenu-ManageFacility']}
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
            ) : null}

            <TouchableOpacity
              onPress={this._OprnTerms.bind(this)}
              style={{
                width: '100%',
                height: 56,
                marginTop: 13,
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
                  source={Images.PocTerm}
                  style={{ width: 24, height: 24, resizeMode: 'contain' }}
                />
              </View>
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 17,
                    color: '#152C52',
                    width: '60%',
                    marginLeft: 25,
                  },
                ]}>
                {/* {"Terms Of Use"} */}
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
                height: 56,
                borderRadius: 13,
                marginTop: 13,
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
                  source={Images.PocPolicy}
                  style={{ width: 24, height: 24, resizeMode: 'contain' }}
                />
              </View>
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 17,
                    color: '#152C52',
                    width: '60%',
                    marginLeft: 25,
                  },
                ]}>
                {/* {"Private Policy"} */}
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
                height: 56,
                borderRadius: 13,
                marginTop: 13,
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
                  source={Images.PocLogout}
                  style={{ width: 24, height: 24 }}
                />
              </View>
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 17,
                    color: '#152C52',
                    width: '60%',
                    marginLeft: 25,
                  },
                ]}>
                {/* {"Log Out"} */}
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

FacilityMenu.propTypes = {
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
  getUserDetailById: (data) =>
    dispatch(AuthenticateActions.getUserDetailById(data)),
  saveUserProfileImage: (data) =>
    dispatch(AuthenticateActions.saveUserProfileImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacilityMenu);

const styles = StyleSheet.create({});
