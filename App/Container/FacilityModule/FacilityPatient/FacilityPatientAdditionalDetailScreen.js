import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import {
  Helpers,
  Colors,
  Images,
  Metrics,
} from 'App/Theme';

import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import NavigationService from 'App/Services/NavigationService';

class FacilityPatientAdditionalDetailScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      Message: '',

      inputs: {
        firstName: {
          type: 'firstName',
          value: '',
        },
        lastName: {
          type: 'lastName',
          value: '',
        },
      },
      selectedGenderValue: null,
      genderPopUpIsSelected: false,
      SelectedGenderLable:
        this.props.selectedMessage['RegisterAddDetails-GenderAtBirth'] + ' *',

      selectedRaceValue: null,
      racePopUpIsSelected: false,
      SelectedRaceLable:
        this.props.selectedMessage['RegisterAddDetails-Race'] + ' *',

      selectedEthnicityValue: null,
      ethnicityPopUpIsSelected: false,
      SelectedEthnicityLable:
        this.props.selectedMessage['RegisterAddDetails-Ethnicity'] + ' *',

      selectedParticipationTypeValue: null,
      participationTypePopUpIsSelected: false,
      SelectedParticipationTypeLable:
        this.props.selectedMessage['RegisterAddDetails-ParticipationType'] +
        ' *',
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
  }
  componentDidMount() {
    this.props.getGenderList();

    this.props.getEthnicityList();
    this.props.getRaceList();
    this.props.getParticipationType();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.patientDetailErrorMessage != null &&
      prevProps.patientDetailErrorMessage !=
      this.props.patientDetailErrorMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.patientDetailErrorMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message });
    }

    if (
      this.props.patientDetailSuccessMessage != null &&
      prevProps.patientDetailSuccessMessage !=
      this.props.patientDetailSuccessMessage
    ) {
      this.setState({ IsShowPopUp: true });
    }
  }

  popUpGenderListItemOnChange = (selectedGenderValue) => {
    this.setState({
      selectedGenderValue: selectedGenderValue.GenderId,
      SelectedGenderLable: selectedGenderValue[this.props.locale],
      genderPopUpIsSelected: false,
    });
  };

  popUpRaceListItemOnChange = (selectedValue) => {
    this.setState({
      selectedRaceValue: selectedValue.RaceId,
      SelectedRaceLable: selectedValue[this.props.locale],
      racePopUpIsSelected: false,
    });
  };

  popUpEthnicityListItemOnChange = (selectedValue) => {
    this.setState({
      selectedEthnicityValue: selectedValue.EthnicityId,
      SelectedEthnicityLable: selectedValue[this.props.locale],
      ethnicityPopUpIsSelected: false,
    });
  };

  popUpParticipationTypeListItemOnChange = (selectedValue) => {
    this.setState({
      selectedParticipationTypeValue: selectedValue.ParticipantTypeId,
      SelectedParticipationTypeLable: selectedValue[this.props.locale],
      ParticipationTypePopUpIsSelected: false,
    });
  };

  _onBackButtonPress() {
    NavigationService.popScreen();
  }
  validateForm() {
    const {
      selectedGenderValue,
      selectedRaceValue,
      selectedEthnicityValue,
      selectedParticipationTypeValue,
    } = this.state;

    return (
      selectedGenderValue > 0 &&
      selectedRaceValue > 0 &&
      selectedEthnicityValue > 0 &&
      selectedParticipationTypeValue > 0
    );
  }

  _onSignUpPressButton() {
    if (this.validateForm()) {
      this.props.resetSavePatientDetail();

      let { buildProfilePayload } = this.props;

      let userData = {
        ...buildProfilePayload,
        GenderId: this.state.selectedGenderValue,
        EthnicityId: this.state.selectedEthnicityValue,
        RaceId: this.state.selectedRaceValue,
        ParticipantTypeId: this.state.selectedParticipationTypeValue,
      };

      this.props.savePatientDetail(userData);
    }
  }
  _CloseAlert() {
    this.setState({ IsMessageShow: false });
  }

  _ClosePopup() {
    this.setState({ IsShowPopUp: false });
    if (this.props.patientDetailSuccessMessage != null) {
      NavigationService.navigateAndReset('FacilityPatientScan', {
        IsFirstTest: true,
      });
    }
  }
  _goBackscreen() {
    NavigationService.popScreen();
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsMessageShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsMessageShow}
          PopUpContainerStyle={{
            backgroundColor: Colors.facilityColor,
            alignItems: 'center',
          }}
          HeaderTitle=""
          HeadTitleColor="#FFFFFF"
          SingleButtonText={this.props.selectedMessage['Register-Close']}
          SigleButtonBackground="#FFFFFF"
          MessageColor="#FFFFFF"
          SingleButtonTextColor={Colors.facilityColor}
          leftbuttonbordercolor="#FFFFFF"
          leftbuttontextcolor="#FFFFFF"
          rightbuttontextcolor={Colors.facilityColor}
          Rightbuttonbackgroundcolor="#FFFFFF"
          AlertMessageTitle={this.state.Message}
          _onRightButtonPress={this._CloseAlert.bind(this)}
          hasSingleButton={true}
        />

        <View
          style={[
            {
              height: 80,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            },
          ]}>
          <TouchableOpacity
            style={{
              width: 46,
              height: 46,
              borderRadius: 46 / 2,
              marginLeft: 9,
              backgroundColor: '#f6f5fa',
              alignItems: 'center',
            }}
            onPress={this._goBackscreen.bind(this)}>
            <Image
              style={{ height: 17, width: 17, marginTop: 16 }}
              source={Images.GreenBackIcon}
            />
          </TouchableOpacity>
          <Image
            style={{ height: 90, width: 90, marginTop: 16 }}
            source={Images.MainLogo}
          />
          <Text
            style={[
              {
                color: Colors.white,
                textAlign: 'center',
                marginTop: 10,
                fontSize: 16,
                textAlign: 'left',
                marginRight: 10,
                fontFamily: 'gothamrounded-bold',
              },
            ]}>
            ....{' '}
          </Text>
        </View>
        <View
          style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 15,
              backgroundColor: 'white',
            }}>
            <HeaderProgress
              rowStyle={[
                {
                  backgroundColor: 'transparent',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                },
              ]}
              progressStyle={[Helpers.headerLeftRow]}
              progressCount={75}
              rightColor={Colors.facilityColor}
              leftColor={'#FBFBFB'}
            />
          </View>
          <CustomPopUpDailog
            onHardwareBackPress={() => {
              this.setState({ IsShowPopUp: false });
              return true;
            }}
            scaleAnimationDialogAlert={this.state.IsShowPopUp}
            PopUpContainerStyle={{
              backgroundColor: Colors.facilityColor,
              alignItems: 'center',
            }}
            HeaderTitle={
              this.props.selectedMessage['RegPatient-PatientRegistered']
            }
            HeadTitleColor="#FFFFFF"
            SingleButtonText={
              this.props.selectedMessage['RegPatient-PairTestKit']
            }
            SigleButtonBackground="#FFFFFF"
            MessageColor="#FFFFFF"
            SingleButtonTextColor="#28998D"
            leftbuttonbordercolor="#FFFFFF"
            leftbuttontextcolor="#FFFFFF"
            rightbuttontextcolor={Colors.facilityColor}
            Rightbuttonbackgroundcolor="#FFFFFF"
            AlertMessageTitle={this.props.selectedMessage[
              'POCPatientRegister-AlertMessage'
            ]
              .toString()
              .replace('(name)', this.props.buildProfilePayload.FirstName)}
            _onRightButtonPress={this._ClosePopup.bind(this)}
            hasSingleButton={true}
          />

          <View
            style={{
              height: '80%',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={[
                Helpers.bold,
                {
                  fontSize: 32,
                  color: '#333333',
                  textAlign: 'left',
                  width: '90%',
                  marginTop: 50,
                },
              ]}>
              {
                this.props.selectedMessage[
                'RegisterAddDetails-AdditionalDetails'
                ]
              }
            </Text>
            <Text
              style={[
                Helpers.mediumBook,
                {
                  fontSize: 22,
                  color: '#333333',
                  textAlign: 'left',
                  width: '100%',
                  flexWrap: 'wrap',
                },
                Metrics.smallVerticalMargin,
              ]}>
              {
                this.props.selectedMessage[
                'RegisterAddDetails-StateAndUSGovernment'
                ]
              }
            </Text>

            <CustomDDLPopUp
              // add Condition
              ddlContainerStyle={[
                Helpers.buttonContainer,
                Metrics.smallVerticalMargin,
                { borderRadius: 8 },
                this.state.selectedGenderValue
                  ? { backgroundColor: Colors.facilityColor }
                  : {
                    backgroundColor: 'transparent',
                    borderColor: Colors.facilityColor,
                    borderWidth: 0.8,
                  },
              ]}
              // add Condition
              ddlLableStyle={[
                { width: '70%', paddingLeft: 16 },
                this.state.selectedGenderValue
                  ? { color: 'white' }
                  : { color: Colors.facilityColor },
              ]}
              ddlIconContainerStyle={[{ width: '30%' }]}
              ddlIconStyle={[Helpers.rightIconStyle]}
              popUpListItemTextStyle={[
                Helpers.popUpListItemTextStyle,
                { color: Colors.facilityColor },
              ]}
              popUpListItemStyle={[Helpers.popUpListItemStyle]}
              popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
              popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
              popUpTitleStyle={[
                Helpers.popUpTitleStyle,
                { backgroundColor: Colors.facilityColor },
              ]}
              popUpTitleAlign={'left'}
              IspatientLogin={true}
              popUpTitleText={
                this.props.selectedMessage['RegisterAddDetails-GenderAtBirth'] +
                ' *'
              }
              popUpListSrc={this.props.genderList}
              popUpIsSelected={this.state.genderPopUpIsSelected}
              popUpSelectedValue={this.state.selectedGenderValue}
              popUpSelectedLable={this.state.SelectedGenderLable}
              popUpKey={'GenderId'}
              popUpListItemOnChange={this.popUpGenderListItemOnChange.bind(
                this,
              )}
              leftIcon={
                this.state.selectedGenderValue
                  ? Images.DDLGreen
                  : Images.DDLGreen
              }
              ddlListText={this.props.locale}></CustomDDLPopUp>

            <CustomDDLPopUp
              // add Condition
              ddlContainerStyle={[
                Helpers.buttonContainer,
                Metrics.smallVerticalMargin,
                { borderRadius: 8 },
                this.state.selectedEthnicityValue
                  ? { backgroundColor: Colors.facilityColor }
                  : {
                    backgroundColor: 'transparent',
                    borderColor: Colors.facilityColor,
                    borderWidth: 0.8,
                  },
              ]}
              // add Condition
              ddlLableStyle={[
                { width: '70%', paddingLeft: 16 },
                this.state.selectedEthnicityValue
                  ? { color: 'white' }
                  : { color: Colors.facilityColor },
              ]}
              ddlIconContainerStyle={[{ width: '30%' }]}
              ddlIconStyle={[Helpers.rightIconStyle]}
              popUpListItemTextStyle={[
                Helpers.popUpListItemTextStyle,
                { color: Colors.facilityColor },
              ]}
              popUpListItemStyle={[Helpers.popUpListItemStyle]}
              popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
              popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
              popUpTitleStyle={[
                Helpers.popUpTitleStyle,
                { backgroundColor: Colors.facilityColor },
              ]}
              popUpTitleAlign={'left'}
              IspatientLogin={true}
              popUpTitleText={
                this.props.selectedMessage['RegisterAddDetails-Ethnicity'] +
                ' *'
              }
              popUpListSrc={this.props.ethnicityList}
              popUpIsSelected={this.state.ethnicityPopUpIsSelected}
              popUpSelectedValue={this.state.selectedEthnicityValue}
              popUpSelectedLable={this.state.SelectedEthnicityLable}
              popUpKey={'EthnicityId'}
              popUpListItemOnChange={this.popUpEthnicityListItemOnChange.bind(
                this,
              )}
              leftIcon={
                this.state.selectedEthnicityValue
                  ? Images.DDLGreen
                  : Images.DDLGreen
              }
              ddlListText={this.props.locale}></CustomDDLPopUp>

            <CustomDDLPopUp
              // add Condition
              ddlContainerStyle={[
                Helpers.buttonContainer,
                Metrics.smallVerticalMargin,
                { borderRadius: 8 },
                this.state.selectedRaceValue
                  ? { backgroundColor: Colors.facilityColor }
                  : {
                    backgroundColor: 'transparent',
                    borderColor: Colors.facilityColor,
                    borderWidth: 0.8,
                  },
              ]}
              // add Condition
              ddlLableStyle={[
                { width: '70%', paddingLeft: 16 },
                this.state.selectedRaceValue
                  ? { color: 'white' }
                  : { color: Colors.facilityColor },
              ]}
              ddlIconContainerStyle={[{ width: '30%' }]}
              ddlIconStyle={[Helpers.rightIconStyle]}
              popUpListItemTextStyle={[
                Helpers.popUpListItemTextStyle,
                { color: Colors.facilityColor },
              ]}
              popUpListItemStyle={[Helpers.popUpListItemStyle]}
              popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
              popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
              popUpTitleStyle={[
                Helpers.popUpTitleStyle,
                { backgroundColor: Colors.facilityColor },
              ]}
              popUpTitleAlign={'left'}
              IspatientLogin={true}
              popUpTitleText={
                this.props.selectedMessage['RegisterAddDetails-Race'] + ' *'
              }
              popUpListSrc={this.props.raceList}
              popUpIsSelected={this.state.racePopUpIsSelected}
              popUpSelectedValue={this.state.selectedRaceValue}
              popUpSelectedLable={this.state.SelectedRaceLable}
              popUpKey={'RaceId'}
              popUpListItemOnChange={this.popUpRaceListItemOnChange.bind(this)}
              leftIcon={
                this.state.selectedRaceValue ? Images.DDLGreen : Images.DDLGreen
              }
              ddlListText={this.props.locale}></CustomDDLPopUp>

            <CustomDDLPopUp
              // add Condition
              ddlContainerStyle={[
                Helpers.buttonContainer,
                Metrics.smallVerticalMargin,
                { borderRadius: 8 },
                this.state.selectedParticipationTypeValue
                  ? { backgroundColor: Colors.facilityColor }
                  : {
                    backgroundColor: 'transparent',
                    borderColor: Colors.facilityColor,
                    borderWidth: 0.8,
                  },
              ]}
              // add Condition
              ddlLableStyle={[
                { width: '70%', paddingLeft: 16 },
                this.state.selectedParticipationTypeValue
                  ? { color: 'white' }
                  : { color: Colors.facilityColor },
              ]}
              ddlIconContainerStyle={[{ width: '30%' }]}
              ddlIconStyle={[Helpers.rightIconStyle]}
              popUpListItemTextStyle={[
                Helpers.popUpListItemTextStyle,
                { color: Colors.facilityColor },
              ]}
              popUpListItemStyle={[Helpers.popUpListItemStyle]}
              popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
              popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
              popUpTitleStyle={[
                Helpers.popUpTitleStyle,
                { backgroundColor: Colors.facilityColor },
              ]}
              popUpTitleAlign={'left'}
              IspatientLogin={true}
              popUpTitleText={
                this.props.selectedMessage[
                'RegisterAddDetails-ParticipationType'
                ] + ' *'
              }
              popUpListSrc={this.props.participationTypeList}
              popUpIsSelected={this.state.participationTypePopUpIsSelected}
              popUpSelectedValue={this.state.selectedParticipationTypeValue}
              popUpSelectedLable={this.state.SelectedParticipationTypeLable}
              popUpKey={'ParticipantTypeId'}
              popUpListItemOnChange={this.popUpParticipationTypeListItemOnChange.bind(
                this,
              )}
              leftIcon={
                this.state.selectedParticipationTypeValue
                  ? Images.DDLGreen
                  : Images.DDLGreen
              }
              ddlListText={this.props.locale}></CustomDDLPopUp>

          </View>
        </View>

        <View style={Helpers.bottomView}>
          <View style={[Helpers.btnContainer, { bottom: 0 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#28998D', '#28998D', '#28998D']}
              style={[Helpers.bigBtnGradient, { width: '90%' }]}>
              <TouchableOpacity
                style={[
                  Helpers.btn,
                  {
                    backgroundColor:
                      (this.state.selectedGenderValue &&
                        this.state.selectedParticipationTypeValue &&
                        this.state.selectedRaceValue &&
                        this.state.selectedEthnicityValue) == null
                        ? Colors.DisableGrayColor
                        : Colors.facilityColor,
                  },
                ]}
                onPress={this._onSignUpPressButton.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.white, fontSize: 17 },
                  ]}>
                  {this.props.selectedMessage['RegPatient-RegisterPatient']}
                  {/* Register Patient */}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

FacilityPatientAdditionalDetailScreen.propTypes = {
  getEthnicityList: PropTypes.func,
  getRaceList: PropTypes.func,
  getParticipationType: PropTypes.func,

  isFacilityProfileLoading: PropTypes.bool,
  patientDetailErrorMessage: PropTypes.string,
  patientDetailSuccessMessage: PropTypes.any,

  savePatientDetail: PropTypes.func,

  ethincityList: PropTypes.array,
  ethincityListErrorMessage: PropTypes.string,

  raceList: PropTypes.array,
  raceListErrorMessage: PropTypes.string,

  participationTypeList: PropTypes.array,
  participationTypeErrorMessage: PropTypes.string,

  buildProfilePayload: PropTypes.array,
  resetSavePatientDetail: PropTypes.func,
  genderList: PropTypes.array,
  genderListErrorMessage: PropTypes.string,
  getGenderList: PropTypes.func,
  locale: PropTypes.any,
  selectedMessage: PropTypes.any,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  isFacilityProfileLoading: state.facilityProfile.isFacilityProfileLoading,
  patientDetailErrorMessage: state.facilityProfile.patientDetailErrorMessage,
  patientDetailSuccessMessage:
    state.facilityProfile.patientDetailSuccessMessage,

  ethnicityList: state.authenticate.ethnicityList,
  ethnicityListErrorMessage: state.authenticate.ethnicityListErrorMessage,

  raceList: state.authenticate.raceList,
  raceListErrorMessage: state.authenticate.raceListErrorMessage,

  genderList: state.authenticate.genderList,
  genderListErrorMessage: state.authenticate.genderListErrorMessage,

  participationTypeList: state.authenticate.participationTypeList,
  participationTypeErrorMessage:
    state.authenticate.participationTypeErrorMessage,

  buildProfilePayload: state.authenticate.buildProfilePayload,
  locale: state.startup.locale,
  selectedMessage: state.startup.selectedMessage,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  resetSavePatientDetail: () =>
    dispatch(FacilityProfileActions.resetSavePatientDetail()),
  savePatientDetail: (data) =>
    dispatch(FacilityProfileActions.savePatientDetail(data)),
  getEthnicityList: () => dispatch(AuthenticateActions.getEthnicityList()),
  getRaceList: () => dispatch(AuthenticateActions.getRaceList()),
  getParticipationType: () =>
    dispatch(AuthenticateActions.getParticipationType()),
  getGenderList: () => dispatch(AuthenticateActions.getGenderList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityPatientAdditionalDetailScreen);
