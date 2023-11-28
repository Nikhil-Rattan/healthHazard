import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  AppState,
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import {Images, Helpers} from 'App/Theme';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

import NavigationService from 'App/Services/NavigationService';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import {LanguageEnum} from 'App/Enums';
class PatientDashboard extends ValidationComponent {
  constructor(props) {
    super(props);
    this._GetNotificationCount = this._GetNotificationCount.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._GetNotificationCount);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._GetNotificationCount);
  }

  _GetNotificationCount() {
    if (!(AppState.currentState == 'background')) {
      let {UserId} = this.props.authenticatedUser;
      this.props.getNotificationCount({UserId: UserId});
    }
  }

  render() {
    console.log(this.props.authenticatedUser);
    var d = new Date();

    let days = LanguageEnum['WeekDays-' + this.props.locale];
    //   {this.props.locale==LanguageEnum.English?

    //     days= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    // :

    // days=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]

    // }

    let DayName = days[d.getDay()];

    //var UStime = d.getHours();
    var UStime = d.getHours();
    var USMinute = d.getMinutes();

    return (
      <View style={[{backgroundColor: '#ffffff', flex: 1}]}>
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
              style={{height: 80, width: 80, marginTop: 20}}
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

          <View style={{marginHorizontal: 15}}>
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
                style={{height: 135, width: '45%'}}
                onPress={() => {
                  NavigationService.navigate('VideoInstructionNewScreen', {
                    IsDoctor: false,
                  });
                }}>
                <View
                  style={[
                    Helpers.PatientCard,
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
                    style={{height: 35, width: 35, marginBottom: 4}}
                    resizeMode="cover"
                    source={Images.Vedioinstruction}
                  />
                  <Text
                    style={[
                      {
                        color: '#673ab7',
                        fontSize: 12,
                        width: 120,
                        textAlign: 'center',
                      },
                      Helpers.bold,
                    ]}>
                    {this.props.selectedMessage['PatientDashboard-Box5']}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={{height: 135, width: '45%'}}
                onPress={() => {
                  NavigationService.navigate('TelehealthExpertsScreens', {
                    IsDoctor: false,
                  });
                }}>
                <View
                  style={[
                    Helpers.PatientCard,
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
                    style={{height: 35, width: 35, marginBottom: 4}}
                    resizeMode="cover"
                    source={Images.MedicalFacility}
                  />
                  <Text
                    style={[
                      {
                        color: '#673ab7',
                        fontSize: 12,
                        width: 120,
                        textAlign: 'center',
                      },
                      Helpers.bold,
                    ]}>
                    {this.props.selectedMessage['PatientDashboard-Box1']}
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
                style={{height: 135, width: '45%'}}
                onPress={() => {
                  NavigationService.navigate('TestingSitesListsScreen');
                }}>
                <View
                  style={[
                    Helpers.PatientCard,
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
                    style={{height: 35, width: 35, marginBottom: 4}}
                    resizeMode="cover"
                    source={Images.MedicalStartKit}
                  />
                  <Text
                    style={[
                      {color: '#673ab7', width: 120, textAlign: 'center'},
                      Helpers.bold,
                    ]}>
                    {this.props.selectedMessage['PatientDashboard-Box2']}
                  </Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                style={{height: 135, width: '45%'}}
                onPress={() => {
                  NavigationService.navigate('PatientQRCodeScannerScreen');
                }}>
                <View
                  style={[
                    Helpers.PatientCard,
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
                    style={{height: 35, width: 35, marginBottom: 4}}
                    resizeMode="cover"
                    source={Images.MedicalStartKit}
                  />
                  <Text
                    style={[
                      {color: '#673ab7', width: 120, textAlign: 'center'},
                      Helpers.bold,
                    ]}>
                    {/* Start An At-Home Test  */}
                    {this.props.selectedMessage['PatientDashboard-Box3']}
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
                style={{height: 135, width: '45%'}}
                onPress={() => {
                  NavigationService.navigate('TelehealthExpertsScreens', {
                    IsDoctor: true,
                  });
                }}>
                <View
                  style={[
                    Helpers.PatientCard,
                    {
                      height: 135,
                      width: '45%',
                      padding: 5,
                      backgroundColor: '#FFFFFF',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    },
                  ]}>
                  <Image
                    style={{height: 35, width: 35, marginBottom: 4}}
                    resizeMode="cover"
                    source={Images.MedicalTeleHealth}
                  />
                  <Text
                    style={[
                      {color: '#673ab7', fontSize: 12, textAlign: 'center'},
                      Helpers.bold,
                    ]}>
                    {this.props.selectedMessage['PatientDashboard-Box4']}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

PatientDashboard.propTypes = {
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
  authenticatedUser: PropTypes.any,
  getNotificationCount: PropTypes.func,
};

const mapStateToProps = (state) => ({
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,

  authenticatedUser: state.authenticate.authenticatedUser,
});

const mapDispatchToProps = (dispatch) => ({
  getNotificationCount: (data) =>
    dispatch(AuthenticateActions.getNotificationCount(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDashboard);

const styles = StyleSheet.create({});
