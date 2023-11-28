import React, {Component} from 'react';
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
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAvoidingView} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Helpers,
  ApplicationStyles,
} from 'App/Theme';

import Dialog, {DialogContent} from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode-svg';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import ListCard from 'App/Components/ListCard';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import CustomSearchTextbox from 'App/Components/CustomSearchTextbox';
import {Enums} from 'App/Enums';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class ViewProfileScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.renderPatient = this.renderPatient.bind(this);
  }

  componentDidMount() {
    //  let {authenticatedUser}=this.props
    //  this.props.getUserDetailById({UserId:authenticatedUser.UserId,UserKey:authenticatedUser.UserKey,IsComeFrom:Enums.UpdateUserScreen,UserRoleId:authenticatedUser.UserRoleId})
    // setTimeout(() => {
    //   this.RBSheet.open()
    //   }, 500);
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
    let editProfileScreen = 'EditPatientInfo';

    if (this.props.authenticatedUser?.UserRoleId == Enums.Tester) {
      this.props.resetTesterForEdit();
      this.props.getTesterForEditSuccess(this.props.authenticatedUser);
    }
    NavigationService.navigate(editProfileScreen);
  }

  _GotoBackScreen() {
    NavigationService.navigate('PatientHome');
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


  formatPhoneNumber(phoneNumberString) {
    var cleaned = (""+phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})/);
        if (match) {
      var intlCode = (match[1] ? '(+52)' : '');
      return [intlCode,' ', match[2], ' ', match[3], '-', match[4]].join('');
    }
    return match
  }
  renderPatient() {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        }}>
        {/* 
                 <Image style={[Helpers.PharmacyPic, { borderRadius: 50, }]} resizeMode='contain'
                     source={Images.UserImage} /> */}

        <TouchableOpacity
          onPress={() => {
            this.ProfileOption.open();
          }}>
          {this.props.profilePic ? (
            <View>
              <Image
                style={[Helpers.PharmacyPic, {borderRadius: 50}]}
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
                    {height: 14, width: 14, alignSelf: 'center', marginTop: 7},
                  ]}
                  resizeMode="contain"
                  source={Images.pencilEdit}
                />
              </View>
            </View>
          ) : (
            <View>
              <Image
                style={[Helpers.PharmacyPic, {borderRadius: 50}]}
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
                    {height: 14, width: 14, alignSelf: 'center', marginTop: 7},
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
            ,
            {
              fontFamily: 'gothamrounded-book',
              fontSize: 16,
              color: '#8492A6',
              textAlign: 'center',
              width: '70%',
              marginTop: 4,
            },
          ]}>
          {this.props.authenticatedUser?.Address}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 7,
          }}>
          <Image source={Images.PurPleCallIcon} style={Helpers.iconsmall} />
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 15,
                marginLeft: 7,
                color: Colors.patientColor,
                textAlign: 'left',
              },
            ]}>
             {this.formatPhoneNumber(this.props.authenticatedUser?.DisplayPhoneNo)}
          </Text>
        </View>
      </View>
    );
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
        <Image
          style={[Helpers.PharmacyPic, {borderRadius: 50}]}
          resizeMode="contain"
          source={Images.UserImagegreen}
        />
        <Text
          style={[
            Helpers.bold,
            {
              fontSize: 30,
              color: 'black',
              textAlign: 'center',
              width: '100%',
              marginTop: 4,
            },
          ]}>
          {this.props.authenticatedUser?.FirstName +
            ' ' +
            this.props.authenticatedUser?.LastName}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 7,
          }}>
          <Image
            source={
              this.props.authenticatedUser?.UserRoleId == Enums.Patient
                ? Images.PurPleCallIcon
                : Images.FacilityPhoneIcon
            }
            style={Helpers.iconsmall}
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
            {this.props.authenticatedUser?.DisplayPhoneNo}
          </Text>
        </View>
        <Text
          style={[
            ,
            {
              fontFamily: 'gothamrounded-book',
              fontSize: 17,
              color: 'black',
              textAlign: 'center',
              width: '70%',
              marginTop: 4,
            },
          ]}>
          {this.props.selectedMessage['Profile-CertifiedAt']}
        </Text>
        <Text
          style={[
            ,
            {
              fontFamily: 'gothamrounded-book',
              fontSize: 19,
              color: 'black',
              textAlign: 'center',
              width: '70%',
              marginTop: 4,
            },
          ]}>
          {this.props.authenticatedUser?.FacilityName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 7,
          }}>
          <Image source={Images.FacilityPhoneIcon} style={Helpers.iconsmall} />
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 15,
                marginLeft: 7,
                color:
                  this.props.authenticatedUser?.UserRoleId == Enums.Patient
                    ? Colors.patientColor
                    : Colors.facilityColor,
                textAlign: 'left',
              },
            ]}>
            {this.props.authenticatedUser?.DisplayFacilityPhoneNo}
          </Text>
        </View>
        <Text
          style={[
            ,
            {
              fontFamily: 'gothamrounded-book',
              fontSize: 15,
              color: 'black',
              textAlign: 'center',
              width: '70%',
              marginTop: 4,
            },
          ]}>
          {
            this.props.selectedMessage[
              'FacProfile-Note:ToChangeFacilityDetailsContactSorrentoDiagnostics'
            ]
          }
        </Text>
      </View>
    );
  }

  renderFacility() {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <Image
          style={[Helpers.PharmacyPic, {borderRadius: 50}]}
          resizeMode="contain"
          source={Images.UserImagegreen}
        />
        <Text
          style={[
            Helpers.bold,
            {
              fontSize: 30,
              color: 'black',
              textAlign: 'center',
              width: '100%',
              marginTop: 4,
            },
          ]}>
          {this.props.authenticatedUser?.FirstName +
            ' ' +
            this.props.authenticatedUser?.LastName}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 7,
          }}>
          <Image source={Images.FacilityPhoneIcon} style={Helpers.iconsmall} />
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
        <Text
          style={[
            ,
            {
              fontFamily: 'gothamrounded-book',
              fontSize: 150,
              color: 'black',
              textAlign: 'center',
              width: '70%',
              marginTop: 4,
            },
          ]}>
          {this.props.authenticatedUser?.FacilityName}
        </Text>
        <Text
          style={[
            ,
            {
              fontFamily: 'gothamrounded-book',
              fontSize: 15,
              color: 'black',
              textAlign: 'center',
              width: '70%',
              marginTop: 4,
            },
          ]}>
          {this.props.authenticatedUser?.Address}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 7,
          }}>
          <Image source={Images.FacilityPhoneIcon} style={Helpers.iconsmall} />
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
            {this.props.authenticatedUser?.FacilityPhysicianDisplayPhoneNo}
          </Text>
        </View>
        <Text
          style={[
            ,
            {
              fontFamily: 'gothamrounded-book',
              fontSize: 15,
              color: 'black',
              textAlign: 'center',
              width: '70%',
              marginTop: 4,
            },
          ]}>
          {
            this.props.selectedMessage[
              'FacProfile-Note:ToChangeFacilityDetailsContactSorrentoDiagnostics'
            ]
          }
        </Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={[{backgroundColor: 'white', flex: 1}]}>
        <Dialog
          dialogStyle={{backgroundColor: 'transparent'}}
          containerStyle={{backgroundColor: 'transparent'}}
          style={{backgroundColor: 'transparent'}}
          visible={this.props.authenticatedIsLoading}>
          <DialogContent style={{backgroundColor: 'transparent'}}>
            <View style={{backgroundColor: 'transparent'}}>
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
            mask: {backgroundColor: 'transparent'},
            container: {elevation: 100},
          }}>
          <View style={{flex: 1, padding: 25}}>
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
                  style={[{height: 30, width: 30}]}
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
                  style={[{height: 30, width: 30}]}
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
        {/* {this.props.authenticatedUser ?.UserRoleId == Enums.Patient ? this.renderPatient() : this.props.authenticatedUser ?.UserRoleId == Enums.Facility ? this.renderFacility() : this.renderTester()} */}

        {this.renderPatient()}

        <View
          style={{
            width: '100%',
            overflow: 'scroll',
            height: '60%',
            backgroundColor: 'transparent',
            alignItems: 'center',
            marginTop: '12%',
          }}>
          <View
            style={{
              width: 180,
              height: 180,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              borderWidth: 1.5,
              borderColor: '#E5E9F2',

              //  shadowColor: '#000',
              //  shadowOffset: { width: 5, height: 5 },
              //  shadowOpacity:  0.4,
              //  shadowRadius: 1,
              //  elevation: 15,
            }}>
            <QRCode
              color={
                this.props.authenticatedUser?.UserRoleId == Enums.Patient
                  ? Colors.patientColor
                  : Colors.facilityColor
              }
              value={this.props.authenticatedUser?.QRCode}
              logoSize={300}
              logoBackgroundColor="transparent"
            />
          </View>
          <Text
            style={[
              ,
              {
                fontFamily: 'gothamrounded-book',
                fontSize: 15,
                color: '#3C4858',
                width: '90%',
                textAlign: 'center',
                marginTop: 33,
              },
            ]}>
            {/* {"*Show this to the registered tester at facility when asked"} */}
            {
              this.props.selectedMessage[
                'PatientDashboard-RegisteredTesterAtfacilityText'
              ]
            }
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

ViewProfileScreen.propTypes = {
  authenticatedUser: PropTypes.any,
  signOut: PropTypes.func,
  selectedMessage: PropTypes.any,
  getTesterForEditSuccess: PropTypes.func,
  resetTesterForEdit: PropTypes.func,
  getUserDetailById: PropTypes.func,
  profilePic: PropTypes.any,
  saveUserProfileImage: PropTypes.func,
  authenticatedIsLoading: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
  profilePic: state.authenticate.profilePic,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  // signOut: () => dispatch(AuthenticateActions.signOut()),
  //getTesterForEditSuccess: (data) => dispatch(FacilityProfileActions.getTesterForEditSuccess(data)),
  // resetTesterForEdit:()=>dispatch(FacilityProfileActions.resetTesterForEdit()),
  getUserDetailById: (data) =>
    dispatch(AuthenticateActions.getUserDetailById(data)),
  saveUserProfileImage: (data) =>
    dispatch(AuthenticateActions.saveUserProfileImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);

const styles = StyleSheet.create({});
