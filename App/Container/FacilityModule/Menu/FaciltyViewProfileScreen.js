import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Images,
  Helpers,
} from 'App/Theme';

import Dialog, { DialogContent } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import { Enums } from 'App/Enums';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf-lite';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

class FaciltyViewProfileScreen extends ValidationComponent {
  constructor(props) {
    super(props);
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
    let IsEditProfile = this.props.route.params.IsUserEdit;

    let editProfileScreen =
      this.props.authenticatedUser?.UserRoleId == Enums.Patient
        ? 'EditProfileScreen'
        : this.props.authenticatedUser?.UserRoleId == Enums.Facility
          ? 'FacilityeditProfilescreen'
          : 'EditTesterScreen';
    editProfileScreen = IsEditProfile
      ? editProfileScreen
      : 'ManageFacilityProfile';
    if (
      this.props.authenticatedUser?.UserRoleId == Enums.Tester &&
      IsEditProfile
    ) {
      this.props.resetTesterForEdit();
      this.props.getTesterForEditSuccess(this.props.authenticatedUser);
    }
    NavigationService.navigate(editProfileScreen);
  }

  _GotoBackScreen() {
    NavigationService.navigate('FacilityHome');
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

  renderTester() {
    return (
      <View
        style={{
          flexDirection: 'column',
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
                    { height: 14, width: 14, alignSelf: 'center', marginTop: 7 },
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
                    { height: 14, width: 14, alignSelf: 'center', marginTop: 7 },
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
            Helpers.mediumFont,
            {
              textTransform: 'capitalize',
              fontSize: 25,
              color: '#152C52',
              textAlign: 'center',
              width: '100%',
              marginTop: 4,
            },
          ]}>
          {this.props.authenticatedUser?.FirstName +
            ' ' +
            this.props.authenticatedUser?.LastName}
        </Text>
        <Text
          style={[
            Helpers.mediumFont,
            {
              fontSize: 15,
              marginLeft: 20,
              width: '100%',
              color: Colors.DisableGrayColor,
              textAlign: 'left',
              marginTop: 20,
            },
          ]}>
          {this.props.selectedMessage['FacilityMenu-FacilityInformation']}
        </Text>

        <Text
          style={[
            Helpers.bold,
            {
              fontSize: 18,
              color: Colors.facilityColor,
              marginLeft: 20,
              width: '100%',
              textAlign: 'left',
              marginTop: 15,
            },
          ]}>
          {this.props.authenticatedUser?.FacilityName}
        </Text>
        <Text
          style={[
            Helpers.mediumFont,
            {
              fontSize: 15,
              marginLeft: 20,
              width: '100%',
              color: Colors.DisableGrayColor,
              textAlign: 'left',
              marginTop: 10,
            },
          ]}>
          {this.props.authenticatedUser?.FacilityAddress}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
            marginTop: 7,
          }}>
          <Image
            source={Images.Primarycontact}
            style={Helpers.iconsmall}
            resizeMode="contain"
          />
          <Text
            style={[
              Helpers.mediumFont,
              {
                flex: 1,
                fontSize: 15,
                marginLeft: 7,
                color: '#152C52',
                textAlign: 'left',
              },
            ]}>
            {this.props.selectedMessage['FacilityMenu-PrimaryContactView']}{' '}
            {this.props.authenticatedUser?.FirstName +
              ' ' +
              this.props.authenticatedUser?.LastName}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
            marginTop: 7,
          }}>
          <Image source={Images.Testerphone} style={Helpers.iconsmall} />
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 15,
                marginLeft: 7,
                color: '#152C52',
                textAlign: 'left',
              },
            ]}>
            {this.props.authenticatedUser?.DisplayFacilityPhoneNo}
          </Text>
        </View>
      </View>
    );
  }

  renderFacility() {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: 5,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            marginBottom: 20,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'blue'
          }}>
          <View
            style={{
              flexDirection: 'column',
              minHeight: 200,
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
          </View>
        </View>
        <Text
          style={[
            Helpers.lightBook,
            { fontSize: 14, color: '#8492A6', textAlign: 'left' },
          ]}>
          {this.props.selectedMessage['FacilityMenu-FacilityInformation']}
        </Text>
        <Text
          style={[
            Helpers.mediumFont,
            { fontSize: 20, color: '#28998D', textAlign: 'left' },
          ]}>
          {this.props.authenticatedUser?.FacilityName}
        </Text>
        <Text
          style={[
            Helpers.lightBook,
            { fontSize: 14, color: '#8492A6', textAlign: 'left' },
          ]}>
          {this.props.authenticatedUser?.Address}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 7,
          }}>
          <Image
            source={Images.PocPrimaryPerson}
            style={{
              ...Helpers.iconsmall,
              resizeMode: 'contain',
              marginBottom: 3,
            }}
          />
          <Text
            style={[
              Helpers.lightBook,
              {
                flex: 1,
                fontSize: 15,
                marginLeft: 10,
                color: '#152C52',
                textAlign: 'left',
              },
            ]}>
            {this.props.selectedMessage['FacilityMenu-PrimaryContactView'] +
              ' ' +
              this.props.authenticatedUser?.FirstName +
              ' ' +
              this.props.authenticatedUser?.LastName}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 7,
          }}>
          <Image
            source={Images.PocPrimaryContact}
            style={{
              ...Helpers.iconsmall,
              resizeMode: 'contain',
              marginBottom: 3,
            }}
          />
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 15,
                marginLeft: 7,
                color: Colors.facilityColor,
                textAlign: 'left',
              },
            ]}>
            {this.props.authenticatedUser?.FacilityDisplayPhoneNo}
          </Text>
        </View>
      </View>
    );
  }
  async createPDF() {
    this.svg.toDataURL(async (data) => {
      console.log('data:image/png;base64,' + data);
      let options = {
        html: ` 
          <h1 style="text-align: center;font-size:60px;color:#28998D"><strong>${this.props.authenticatedUser?.FacilityName}</strong></h1>
          <h2 style="text-align: center;font-size:40px;color:#28998D">${this.props.authenticatedUser?.Address}</h2>
          <img src="data:image/png;base64,${data}" alt="Paris" style=" display: block;
          margin-left: auto;
          margin-right: auto; height:450px;
          width:450px;" />  
          <img src="https://staging.covistix.com/assets/media/logos/app-logo-5.png" alt="Paris" style=" display: block;
          margin-top: 20px;
          margin-left: auto;
          margin-right: auto;   height:250px;
          width:250px;" 
       
          />
         
`,
        fileName: 'test',
        base64: true,
      };

      let file = await RNHTMLtoPDF.convert(options);
      const shareImageBase64 = {
        title: 'QR',
        message: this.props.authenticatedUser?.FacilityName + ' QR Code',
        url: `data:application/pdf;base64,${file.base64}`,
      };
      Share.open(shareImageBase64);
    });
  }

  _DownloadQrCode() {
    this.svg.toDataURL((data) => {
      const shareImageBase64 = {
        title: 'QR',
        message: 'Ehi, this is my QR code',
        url: `data:image/png;base64,${data}`,
      };
      Share.open(shareImageBase64);
    });
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

        <ScrollView>
          <TopHeaderWithTwoOption
            fullComponentbackgroundColor={Colors.white}
            fullComponentHeight={60}
            RightHeaderTitle={this.props.selectedMessage['EditScreen-Editext']}
            IsImage={false}
            LeftImage={
              this.props.authenticatedUser?.UserRoleId == Enums.Patient
                ? Images.PurPleBackIcon
                : Images.GreenBackIcon
            }
            RightImage={Images.BackIcon}
            RightSideTitleColor={
              this.props.authenticatedUser?.UserRoleId == Enums.Patient
                ? Colors.patientColor
                : Colors.facilityColor
            }
            onPressRightButton={this._GotoEditProfileScreen.bind(this)}
            onPressLeftButton={this._GotoBackScreen.bind(this)}
          />
          {this.props.authenticatedUser?.UserRoleId == Enums.Facility
            ? this.renderFacility()
            : this.renderTester()}

          <View
            style={{
              width: '100%',
              overflow: 'scroll',
              height: '60%',
              backgroundColor: 'transparent',
              alignItems: 'center',
              marginTop: '8%',
            }}>
            <View
              style={{
                width: 180,
                height: 180,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16,
                borderColor: '#E5E9F2',
                borderWidth: 1,
                marginVertical: 8,
              }}>
              <QRCode
                value={this.props.authenticatedUser?.QRCode}
                logoSize={300}
                logoBackgroundColor="transparent"
                color="#28998D"
                getRef={(ref) => (this.svg = ref)}
              />
            </View>
          </View>
        </ScrollView>
        <View style={[Helpers.bottomView, { position: 'relative', backgroundColor: 'white' }]}>
          <View
            style={[
              Helpers.btnContainer,
              { bottom: 0, justifyContent: 'flex-end', paddingHorizontal: 15, marginTop: '2%' },
            ]}>
            <TouchableOpacity
              style={[Helpers.btn, { backgroundColor: '#28998D' }]}
              onPress={this.createPDF.bind(this)}>
              <Text
                style={[Helpers.btnText, { color: Colors.white, fontSize: 17 }]}>
                {this.props.selectedMessage['FacProfile-DownloadQRCode(PDF)']}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

FaciltyViewProfileScreen.propTypes = {
  authenticatedUser: PropTypes.any,
  signOut: PropTypes.func,
  selectedMessage: PropTypes.any,
  getTesterForEditSuccess: PropTypes.func,
  resetTesterForEdit: PropTypes.func,
  getUserDetailById: PropTypes.func,
  profilePic: PropTypes.any,
  authenticatedIsLoading: PropTypes.any,
  saveUserProfileImage: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
  profilePic: state.authenticate.profilePic,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getTesterForEditSuccess: (data) =>
    dispatch(FacilityProfileActions.getTesterForEditSuccess(data)),
  resetTesterForEdit: () =>
    dispatch(FacilityProfileActions.resetTesterForEdit()),
  getUserDetailById: (data) =>
    dispatch(AuthenticateActions.getUserDetailById(data)),
  saveUserProfileImage: (data) =>
    dispatch(AuthenticateActions.saveUserProfileImage(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FaciltyViewProfileScreen);

const styles = StyleSheet.create({});
