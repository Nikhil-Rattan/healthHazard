import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import { Images, Helpers, Colors } from 'App/Theme';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Enums } from 'App/Enums';
import NavigationService from 'App/Services/NavigationService';
import RBSheet from 'react-native-raw-bottom-sheet';
import { LanguageEnum } from 'App/Enums';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
class FacilityDashboard extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = { IsEnglish: true, IsSpanish: false, IsPortuguese: false, currentDate: new Date() };
  }

  componentDidMount() {
    this.props.closeAllLoader();
    if (this.props.IsSelectionLangaugeDiffrent) {
      this.RBErrorSheet.open();
    }
    this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      this._onFocus();
    });
  }

  _onFocus = () => {
    this.setState({ currentDate: new Date() });
  }

  SelectEnglishLanguage() {
    this.setState({ IsEnglish: true, IsSpanish: false, IsPortuguese: false });
  }
  SelectSpanishLanguage() {
    this.setState({ IsSpanish: true, IsEnglish: false, IsPortuguese: false });
  }

  SelectPortugueseLanguage() {
    this.setState({ IsSpanish: false, IsEnglish: false, IsPortuguese: true });
  }
  ContinueLanguageSelection() {
    this.props.updateUserLanguage({
      UserId: this.props.authenticatedUser.UserId,
      LanguageId: this.state.IsEnglish ? 1 : this.state.IsSpanish ? 2 : 3,
    });
    this.RBErrorSheet.close();
  }

  componentWillUnmount() {
    // Remove the event listener
    if (typeof this._unsubscribeFocus != 'undefined') this._unsubscribeFocus();
  }

  render() {
    var d = this.state.currentDate;

    let days = [];

    days = LanguageEnum['WeekDays-' + this.props.locale];

    let DayName = days[d.getDay()];

    //var UStime = d.getHours();
    var UStime = d.getHours();
    var USMinute = d.getMinutes();

    return (
      <View style={[{ backgroundColor: '#ffffff', flex: 1 }]}>
        <RBSheet
          ref={(ref) => {
            this.RBErrorSheet = ref;
          }}
          height={400}
          openDuration={250}
          closeOnPressMask={false}
          closeOnPressBack={false}
          customStyles={{
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
          }}>
          <View>
            <Image
              style={{ width: 120, height: 120, alignSelf: 'center' }}
              resizeMode="contain"
              source={Images.Rejectedkitimage}
            />
          </View>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text
              style={[
                Helpers.btnText,
                Helpers.mediumfont,
                {
                  color: Colors.patientColor,
                  fontSize: 30,
                  textAlign: 'center',
                  marginTop: 25,
                  justifyContent: 'center',
                },
              ]}>
              {
                this.props.selectedMessage[
                'EditFacProfile-LanguageSelectLanguage'
                ]
              }
            </Text>

            <Text
              style={[
                Helpers.btnText,
                Helpers.book,
                {
                  color: Colors.BlueColorNew,
                  fontSize: 15,
                  textAlign: 'center',
                  marginTop: 15,
                  marginBottom: 15,
                  width: '93%',
                },
              ]}>
              {
                this.props.selectedMessage[
                'EditFacProfile-DashboardChangeLanguage'
                ]
              }
            </Text>
          </View>
          <View style={{ alignSelf: 'center', marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <TouchableOpacity
                onPress={this.SelectEnglishLanguage.bind(this)}
                style={{
                  width: '30%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {this.state.IsEnglish ? (
                  <Image
                    style={{ width: 18, height: 18, alignSelf: 'center' }}
                    resizeMode="contain"
                    source={Images.CircleShapePurple}
                  />
                ) : (
                  <Image
                    style={{ width: 18, height: 18, alignSelf: 'center' }}
                    resizeMode="contain"
                    source={Images.unselectlang}
                  />
                )}
                <Text style={[Helpers.book, { fontSize: 14, marginLeft: 8 }]}>
                  {this.props.selectedMessage['EditFacProfile-English']}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.SelectSpanishLanguage.bind(this)}
                style={{
                  width: '30%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {this.state.IsSpanish ? (
                  <Image
                    style={{ width: 18, height: 18, alignSelf: 'center' }}
                    resizeMode="contain"
                    source={Images.CircleShapePurple}
                  />
                ) : (
                  <Image
                    style={{ width: 18, height: 18, alignSelf: 'center' }}
                    resizeMode="contain"
                    source={Images.unselectlang}
                  />
                )}
                <Text style={[Helpers.book, { fontSize: 14, marginLeft: 8 }]}>
                  {this.props.selectedMessage['EditFacProfile-Spanish']}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.SelectPortugueseLanguage.bind(this)}
                style={{
                  width: '30%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {this.state.IsPortuguese ? (
                  <Image
                    style={{ width: 18, height: 18, alignSelf: 'center' }}
                    resizeMode="contain"
                    source={Images.CircleShapePurple}
                  />
                ) : (
                  <Image
                    style={{ width: 18, height: 18, alignSelf: 'center' }}
                    resizeMode="contain"
                    source={Images.unselectlang}
                  />
                )}
                <Text style={[Helpers.book, { fontSize: 14, marginLeft: 8 }]}>
                  {this.props.selectedMessage['EditFacProfile-Portugues']}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={[
              Helpers.btn,
              {
                backgroundColor: Colors.facilityColor,
                width: '90%',
                alignSelf: 'center',
              },
            ]}
            onPress={this.ContinueLanguageSelection.bind(this)}
          >
            <Text
              style={[Helpers.btnText, { color: Colors.white, fontSize: 17 }]}>
              {this.props.selectedMessage['TestingSiteListScreen-ContinueNew']}
            </Text>
          </TouchableOpacity>
        </RBSheet>

        <ScrollView>
          <View
            style={{
              height: 80,
              backgroundColor: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Image
              style={{ height: 80, width: 80, marginTop: 20 }}
              resizeMode="cover"
              source={Images.MainLogo}
            />
          </View>
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
                numberOfLines={1}
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
                {UStime < 12
                  ? this.props.selectedMessage['SearchFacility-GoodMorning']
                  : UStime > 12 && UStime > 16
                    ? this.props.selectedMessage['SearchFacility-GoodEvening']
                    : this.props.selectedMessage['SearchFacility-GoodAfternoon']}
                ,{' '}
              </Text>
            </View>
          </View>
          <Text
            numberOfLines={2}
            style={[
              Helpers.bold,
              {
                textTransform: 'capitalize',
                lineHeight: 40,
                fontSize: 30,
                marginLeft: 20,
                color: '#333333',
                textAlign: 'left',
                width: '90%',
              },
            ]}>
            {this.props.authenticatedUser?.FirstName}
          </Text>

          <View style={{ marginHorizontal: 15 }}>
            {this.props.authenticatedUser?.UserRoleId == Enums.Tester ? (
              <View>
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    },
                    Helpers.DashboardRow,
                  ]}>
                  <TouchableWithoutFeedback
                    style={{ height: 135, width: '45%' }}
                    onPress={() => {
                      NavigationService.navigate(
                        'FacilityPatientProfileScreen',
                      );
                    }}>
                    <View
                      style={[
                        Helpers.FacilityCardNew,
                        {
                          height: 135,
                          width: '45%',
                          backgroundColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        },
                      ]}>
                      <Image
                        style={{ height: 35, width: 35, marginBottom: 4 }}
                        resizeMode="contain"
                        source={Images.FrameRegisterNewPatient}
                      />
                      <Text
                        style={[
                          {
                            color: '#28998D',
                            fontSize: 12,
                            width: 120,
                            textAlign: 'center',
                            marginTop: 10,
                          },
                          Helpers.bold,
                        ]}>
                        {this.props.selectedMessage['FacDashboard-Register']}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    style={{ height: 135, width: '45%' }}
                    onPress={() => {
                      NavigationService.navigate('ScanPatientQRScreen', {
                        isCreateTest: false,
                        patientData: null,
                      });
                    }}>
                    <View
                      style={[
                        Helpers.FacilityCardNew,
                        {
                          height: 135,
                          width: '45%',
                          backgroundColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        },
                      ]}>
                      <Image
                        style={{ height: 35, width: 35, marginBottom: 4 }}
                        resizeMode="contain"
                        source={Images.FrameScanQRCode}
                      />
                      <Text
                        style={[
                          {
                            color: '#28998D',
                            fontSize: 12,
                            width: 120,
                            textAlign: 'center',
                            marginTop: 10,
                          },
                          Helpers.bold,
                        ]}>
                        {/* Scan A Patient QR Code */}
                        {this.props.selectedMessage['FacDashboard-ScanQRCode']}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    },
                    Helpers.DashboardRow,
                  ]}>
                  <TouchableWithoutFeedback
                    style={{ height: 135, width: '45%' }}
                    onPress={() => {
                      NavigationService.navigate('PatientKitScannerScreen');
                    }}>
                    <View
                      style={[
                        Helpers.FacilityCardNew,
                        {
                          height: 135,
                          width: '45%',
                          backgroundColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        },
                      ]}>
                      <Image
                        style={{ height: 35, width: 35, marginBottom: 4 }}
                        resizeMode="contain"
                        source={Images.FrameEntertestResult}
                      />
                      <Text
                        style={[
                          {
                            color: '#28998D',
                            width: 120,
                            textAlign: 'center',
                            marginTop: 10,
                          },
                          Helpers.bold,
                        ]}>
                        {/* Enter Test Results */}
                        {this.props.selectedMessage['FacDashboard-EnterResult']}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    style={{ height: 135, width: '45%' }}
                    onPress={() => {
                      NavigationService.navigate('FacilitiesPatientList');
                    }}>
                    <View
                      style={[
                        Helpers.FacilityCardNew,
                        {
                          height: 135,
                          width: '45%',
                          backgroundColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        },
                      ]}>
                      <Image
                        style={{ height: 35, width: 35, marginBottom: 4 }}
                        resizeMode="contain"
                        source={Images.FramePatientHistory}
                      />
                      <Text
                        style={[
                          {
                            color: '#28998D',
                            fontSize: 12,
                            width: 130,
                            textAlign: 'center',
                            marginTop: 10,
                          },
                          Helpers.bold,
                        ]}>
                        {
                          this.props.selectedMessage[
                          'FacDashboard-ViewPatientHistory'
                          ]
                        }
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    },
                    Helpers.DashboardRow,
                  ]}>
                  <TouchableWithoutFeedback
                    style={{ height: 135, width: '45%' }}
                    onPress={() => {
                      NavigationService.navigate('VideoInstructionNewScreen', {
                        IsDoctor: false,
                      });
                    }}>
                    <View
                      style={[
                        Helpers.FacilityCardNew,
                        {
                          height: 135,
                          width: '45%',
                          backgroundColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        },
                      ]}>
                      <Image
                        style={{ height: 35, width: 35, marginBottom: 4 }}
                        resizeMode="contain"
                        source={Images.Facilityvideo}
                      />
                      <Text
                        style={[
                          {
                            color: '#28998D',
                            fontSize: 12,
                            width: 120,
                            textAlign: 'center',
                            marginTop: 10,
                          },
                          Helpers.bold,
                        ]}>
                        {this.props.selectedMessage['PatientDashboard-Box5']}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    style={{ height: 135, width: '45%' }}
                    onPress={() => {
                      NavigationService.navigate(
                        'FacilityPatientProfileScreen',
                      );
                    }}>
                    <View
                      style={[
                        Helpers.FacilityCardNew,
                        {
                          height: 135,
                          width: '45%',
                          backgroundColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        },
                      ]}>
                      <Image
                        style={{ height: 35, width: 35, marginBottom: 4 }}
                        resizeMode="contain"
                        source={Images.FrameRegisterNewPatient}
                      />
                      <Text
                        style={[
                          {
                            color: '#28998D',
                            fontSize: 12,
                            width: 120,
                            textAlign: 'center',
                            marginTop: 10,
                          },
                          Helpers.bold,
                        ]}>
                        {this.props.selectedMessage['FacDashboard-Register']}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View
                  style={[
                    {
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    },
                    Helpers.DashboardRow,
                  ]}>
                  <TouchableWithoutFeedback
                    style={{ height: 135, width: '45%' }}
                    onPress={() => {
                      NavigationService.navigate('CertifiedTestersScreen');
                    }}>
                    <View
                      style={[
                        Helpers.FacilityCardNew,
                        {
                          height: 135,
                          width: '45%',
                          backgroundColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        },
                      ]}>
                      <Image
                        style={{ height: 35, width: 35, marginBottom: 4 }}
                        resizeMode="contain"
                        source={Images.FrameTester}
                      />
                      <Text
                        style={[
                          {
                            color: '#28998D',
                            width: 120,
                            textAlign: 'center',
                            marginTop: 10,
                          },
                          Helpers.bold,
                        ]}>
                        {
                          this.props.selectedMessage[
                          'FacDashboard-ManageTesters'
                          ]
                        }
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    style={{ height: 135, width: '45%' }}
                    onPress={() => {
                      NavigationService.navigate('ScanPatientQRScreen', {
                        isCreateTest: false,
                        patientData: null,
                      });
                    }}>
                    <View
                      style={[
                        Helpers.FacilityCardNew,
                        {
                          height: 135,
                          width: '45%',
                          backgroundColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        },
                      ]}>
                      <Image
                        style={{ height: 35, width: 35, marginBottom: 4 }}
                        resizeMode="contain"
                        source={Images.FrameScanQRCode}
                      />
                      <Text
                        style={[
                          {
                            color: '#28998D',
                            fontSize: 12,
                            width: 120,
                            textAlign: 'center',
                            marginTop: 10,
                          },
                          Helpers.bold,
                        ]}>
                        {/* Scan A Patient QR Code */}
                        {this.props.selectedMessage['FacDashboard-ScanQRCode']}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View
                  style={[
                    {
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    },
                    Helpers.DashboardRow,
                  ]}>
                  <TouchableWithoutFeedback
                    style={{ height: 135, width: '45%' }}
                    onPress={() => {
                      NavigationService.navigate('PatientKitScannerScreen');
                    }}>
                    <View
                      style={[
                        Helpers.FacilityCardNew,
                        {
                          height: 135,
                          width: '45%',
                          backgroundColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        },
                      ]}>
                      <Image
                        style={{ height: 35, width: 35, marginBottom: 4 }}
                        resizeMode="contain"
                        source={Images.FrameEntertestResult}
                      />
                      <Text
                        style={[
                          {
                            color: '#28998D',
                            width: 120,
                            textAlign: 'center',
                            marginTop: 10,
                          },
                          Helpers.bold,
                        ]}>
                        {/* Enter Test Results */}
                        {this.props.selectedMessage['FacDashboard-EnterResult']}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    style={{ height: 135, width: '45%' }}
                    onPress={() => {
                      NavigationService.navigate('FacilitiesPatientList');
                    }}>
                    <View
                      style={[
                        Helpers.FacilityCardNew,
                        {
                          height: 135,
                          width: '45%',
                          backgroundColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        },
                      ]}>
                      <Image
                        style={{ height: 35, width: 35, marginBottom: 4 }}
                        resizeMode="contain"
                        source={Images.FramePatientHistory}
                      />
                      <Text
                        style={[
                          {
                            color: '#28998D',
                            fontSize: 12,
                            width: 130,
                            textAlign: 'center',
                            marginTop: 10,
                          },
                          Helpers.bold,
                        ]}>
                        {
                          this.props.selectedMessage[
                          'FacDashboard-ViewPatientHistory'
                          ]
                        }
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

FacilityDashboard.propTypes = {
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
  authenticatedUser: PropTypes.any,
  IsSelectionLangaugeDiffrent: PropTypes.any,
  updateUserLanguage: PropTypes.func,
};

const mapStateToProps = (state) => ({
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
  authenticatedUser: state.authenticate.authenticatedUser,
  IsSelectionLangaugeDiffrent: state.authenticate.IsSelectionLangaugeDiffrent,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserLanguage: (data) =>
    dispatch(AuthenticateActions.updateUserLanguage(data)),
  closeAllLoader: () =>
    dispatch(AuthenticateActions.closeAllLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(FacilityDashboard);

const styles = StyleSheet.create({});
