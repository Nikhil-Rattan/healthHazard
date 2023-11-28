import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import {
  Helpers,
  Colors,
  Fonts,
  ApplicationStyles,
  Images,
  Metrics,
} from 'App/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';

import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';

import { ResultTypeEnum } from 'App/Enums';
import CustomDDL from 'App/Components/CustomDDL';
import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import { color } from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import NavigationService from 'App/Services/NavigationService';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';

import { LanguageEnum } from 'App/Enums';

class PatientSurvey extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      Message: '',
      currentStep: 1,
      IsSurveyCompleted: false,
      userSurveyList: [],
      selectedResponseId: 0,
    };
  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
  }

  componentDidMount() {
    this.props.resetUserSurvey();
    this.props.getUserSurvey({
      SurveyId: 2,
      UserId: this.props.authenticatedUser?.UserId,
    });
  }

  _CloseAlert() {
    this.setState({ IsMessageShow: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.addUserSurveySuccessMessage != null &&
      prevProps.addUserSurveySuccessMessage !=
      this.props.addUserSurveySuccessMessage
    ) {
      this.props.resetAddUserSurvey();
      this.props.resetUserSurvey();
      this.props.getUserSurvey({
        SurveyId: 2,
        UserId: this.props.authenticatedUser?.UserId,
      });
      this.setState({ selectedResponseId: 0 });
    } else if (
      this.props.addUserSurveyErrorMessage != null &&
      prevProps.addUserSurveyErrorMessage !=
      this.props.addUserSurveyErrorMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.addUserSurveyErrorMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message });
    }
    if (
      this.props.userSurvey != null &&
      prevProps.userSurvey != this.props.userSurvey
    ) {
      let surveyList = this.props.userSurvey;
      if (surveyList.IsSurveyCompleted) {
        NavigationService.navigateAndReset('SurveySuccessScreen');
      } else {
        surveyList.Options = JSON.parse(surveyList.Options);
        this.setState({ userSurveyList: surveyList });
      }
    }
  }

  _OpenPresSubmit() {
    if (this.state.selectedResponseId > 0) {
      let payload = {
        UserId: this.props.authenticatedUser?.UserId,
        SurveyQuestionMappingId: this.state.userSurveyList
          .SurveyQuestionMappingId,
        UserResponseId: this.state.selectedResponseId,
        QuestionId: this.state.userSurveyList.QuestionMStId,
        UserSurveyId: 0,
      };
      this.props.addUserSurvey(payload);
    }
  }

  _chooseOption(index) {
    let surveyList = this.state.userSurveyList;

    surveyList.Options.forEach((d, i) => {
      if (i == index) {
        d.IsSelected = true;
      } else {
        d.IsSelected = false;
      }
    });

    let selectedValue = surveyList.Options[index].OptionId;

    this.setState({ selectedResponseId: selectedValue });

    this.setState({ userSurveyList: surveyList });
  }

  renderOptions(item, index) {
    return (
      <View style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
        <TouchableOpacity
          onPress={this._chooseOption.bind(this, index)}
          style={[
            Helpers.CardWithTwoOption,
            item.IsSelected
              ? { backgroundColor: 'white', borderColor: Colors.patientColor }
              : { backgroundColor: Colors.patientColor, borderColor: 'white' },
          ]}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 15,
            }}>
            <Text
              style={[
                Helpers.mediumFont,
                Helpers.CardText,
                item.IsSelected
                  ? { color: Colors.patientColor }
                  : { color: 'white' },
              ]}>
              {item['OptionText_' + this.props.locale]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  _GoBack() {
    NavigationService.popScreen();
  }

  render() {
    const { currentQuestion, userSurveyList } = this.state;

    return (
      <SafeAreaView
        style={[Helpers.fill, { backgroundColor: Colors.patientColor }]}>
        <View style={{ paddingHorizontal: 20 }}>
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

          <TouchableOpacity
            style={{
              height: 60,
              width: '100%',
              alignItems: 'flex-start',
              marginTop: 20,
            }}
            onPress={this._GoBack.bind(this)}>
            <View
              style={{
                width: 50,
                height: 50,
                flexDirection: 'row',
                borderRadius: 50 / 2,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: 'white',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
                elevation: 15,
              }}>
              <Image
                style={Helpers.tabIcon}
                resizeMode="contain"
                source={Images.PurPleBackIcon}
              />
            </View>
          </TouchableOpacity>

          <Text
            style={[
              Helpers.bold,
              {
                textAlign: 'center',
                fontSize: 18,
                color: 'white',
                marginTop: 30,
              },
            ]}>
            {userSurveyList?.Display_Order}/2
          </Text>
          <HeaderProgress
            rowStyle={[
              ApplicationStyles.header,
              {
                height: '8%',
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              },
            ]}
            progressStyle={[Helpers.headerLeftRow]}
            progressCount={(userSurveyList?.Display_Order * 100) / 2}
            rightColor={'#FFFFFF'}
            leftColor={'#927fb8'}
          />

          <ScrollView
            ref="scrollView"
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={[
                  Helpers.bold,
                  {
                    marginLeft: 15,
                    fontSize: 22,
                    color: '#FFFFFF',
                    textAlign: 'left',
                    width: '90%',
                    flexWrap: 'wrap',
                  },
                  Metrics.smallVerticalMargin,
                ]}>
                {userSurveyList['QuestionText_' + this.props.locale]}
              </Text>
              {userSurveyList?.Options != undefined
                ? userSurveyList.Options.map((i, index) => {
                  return this.renderOptions(i, index);
                })
                : null}
            </View>

            <View style={{ height: 50, marginBottom: 100 }}></View>
          </ScrollView>
        </View>
        {this.state.selectedResponseId > 0 && <View
          style={[
            Helpers.bottomView,
            { backgroundColor: 'transparent', width: '100%' },
          ]}>
          <View
            style={[
              Helpers.btnContainer,
              {
                marginBottom: 15,
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
              },
            ]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
              style={[Helpers.bigBtnGradient]}>
              <TouchableOpacity
                style={[Helpers.btn]}
                onPress={this._OpenPresSubmit.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.patientColor, fontSize: 15 },
                  ]}>
                  {userSurveyList?.Display_Order == 1
                    ? this.props.selectedMessage['PatSurvey-NextQuestion']
                    : this.props.selectedMessage['PatSurvey-FinishSurvey']}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>}
      </SafeAreaView>
    );
  }
}

PatientSurvey.propTypes = {
  userSurvey: PropTypes.any,
  userSurveySuccessMessage: PropTypes.any,
  userSurveyErrorMessage: PropTypes.any,
  getUserSurvey: PropTypes.func,
  resetUserSurvey: PropTypes.func,
  addUserSurveySuccessMessage: PropTypes.any,
  addUserSurveyErrorMessage: PropTypes.any,
  authenticatedUser: PropTypes.any,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  userSurvey: state.authenticate.userSurvey,
  userSurveySuccessMessage: state.authenticate.userSurveySuccessMessage,
  userSurveyErrorMessage: state.authenticate.userSurveyErrorMessage,
  addUserSurveySuccessMessage: state.authenticate.addUserSurveySuccessMessage,
  addUserSurveyErrorMessage: state.authenticate.addUserSurveyErrorMessage,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  getUserSurvey: (data) => dispatch(AuthenticateActions.getUserSurvey(data)),
  resetUserSurvey: () => dispatch(AuthenticateActions.resetUserSurvey()),
  addUserSurvey: (data) => dispatch(AuthenticateActions.addUserSurvey(data)),
  resetAddUserSurvey: () => dispatch(AuthenticateActions.resetAddUserSurvey()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientSurvey);
