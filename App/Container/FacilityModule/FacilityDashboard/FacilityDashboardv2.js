import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import { Images, Helpers } from 'App/Theme';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Enums } from 'App/Enums';
import NavigationService from 'App/Services/NavigationService';
import { LanguageEnum } from 'App/Enums';

class FacilityDashboard extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  componentWillUnmount() {
    // Remove the event listener
  }

  render() {
    var d = new Date();

    let days = LanguageEnum['WeekDays-' + this.props.locale];
    let DayName = days[d.getDay()];

    var UStime = d.getHours();
    var USMinute = d.getMinutes();

    return (
      <View style={[{ backgroundColor: '#ffffff', flex: 1 }]}>
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
            numberOfLines={1}
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
                  NavigationService.navigate('FacilityPatientProfileScreen');
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
                        {/* View Patient History */}
                        {
                          this.props.selectedMessage[
                          'FacDashboard-ViewPatientHistory'
                          ]
                        }
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
};

const mapStateToProps = (state) => ({
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,

  authenticatedUser: state.authenticate.authenticatedUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FacilityDashboard);

const styles = StyleSheet.create({});
