import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import { Helpers, Colors, ApplicationStyles, Images, Metrics } from 'App/Theme';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import NavigationService from 'App/Services/NavigationService';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import { LanguageEnum } from 'App/Enums';
import CustomInputBox from 'App/Components/CustomInputBox';
// import { ScrollView } from 'react-native-gesture-handler';
const { getCountries } = require("country-list-spanish"); //spanish
const countries = require("i18n-iso-countries/langs/en.json");  //english

class AdditionalDetailScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      Message: '',

      countriesList: [],

      selectedGenderValue: null,
      selectedGenderIsToched: true,
      genderPopUpIsSelected: true,
      SelectedGenderLable:
        this.props.selectedMessage['RegisterAddDetails-GenderAtBirth'] + ' *',

      selectedCountryValue: "",
      selectedCountryIsToched: true,
      countryPopUpIsSelected: true,
      SelectedCountryLable: this.props.selectedMessage['RegisterProfile-SelectCountry'] + ' *',

      inputs: {
        NationalId: {
          type: 'nationalId',
          value: '',
        }
      }

      // selectedRaceValue: null,
      // racePopUpIsSelected: true,
      // selectedRaceIsToched: true,
      // SelectedRaceLable:
      //   this.props.selectedMessage['RegisterAddDetails-Race'] + ' *',

      // selectedEthnicityValue: null,
      // ethnicityPopUpIsSelected: true,
      // selectedEthnicityIsToched: true,
      // SelectedEthnicityLable:
      //   this.props.selectedMessage['RegisterAddDetails-Ethnicity'] + ' *',

      // selectedParticipationTypeValue: null,
      // participationTypePopUpIsSelected: true,
      // selectedParticipationTypeIsToched: true,
      // SelectedParticipationTypeLable:
      //   this.props.selectedMessage['RegisterAddDetails-ParticipationType'] +
      //   ' *',
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  componentDidMount() {
    this.props.getGenderList();
    this.props.getEthnicityList();
    this.props.getRaceList();
    this.props.getParticipationType();
    console.log("this.props.ethnicityList", this.props.ethnicityList);

    let countriesList = [];
    let spanishList = getCountries({ object: true, extended: true });
    let englishList = countries?.countries;
    Object.keys(englishList).map((value, index) => {
      let country = Array.isArray(englishList[value]) ? englishList[value][0] : englishList[value];
      let item = {
        code: value,
        country: country,
        en: country,
        sp: spanishList[value] ?? country,
        pr: country,
      };
      countriesList.push(item)
      if (item.code == 'MX')
        countriesList.unshift(item);
    });
    this.setState({ countriesList: countriesList });
  }
  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.registrationErrorMessage != null &&
      prevProps.registrationErrorMessage != this.props.registrationErrorMessage
    ) {

      const message = this.props.selectedMessage[
        this.props.registrationErrorMessage
      ];
      this.setState({ IsMessageShow: true, Message: message });
    }
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel) {
      return <Text style={Helpers.errorMessage}> {inputs[id].errorLabel}</Text>;
    }
    return null;
  }

  popUpGenderListItemOnChange = (selectedGenderValue) => {
    this.setState({
      selectedGenderValue: selectedGenderValue.GenderId,
      SelectedGenderLable: selectedGenderValue[this.props.locale],
      genderPopUpIsSelected: false,
      selectedGenderIsToched: true

    });
  };

  popUpCountryListItemOnChange = (selectedValue) => {
    console.log("selectedValue", selectedValue)
    this.setState({
      selectedCountryValue: selectedValue.code,
      SelectedCountryLable: selectedValue[this.props.locale],
      countryPopUpIsSelected: false,
      selectedCountryIsToched: true
    });
  };

  // popUpRaceListItemOnChange = (selectedValue) => {
  //   this.setState({
  //     selectedRaceValue: selectedValue.RaceId,
  //     SelectedRaceLable: selectedValue[this.props.locale],
  //     racePopUpIsSelected: false,
  //     selectedRaceIsToched: true
  //   });
  // };

  // popUpEthnicityListItemOnChange = (selectedValue) => {
  //   this.setState({
  //     selectedEthnicityValue: selectedValue.EthnicityId,
  //     SelectedEthnicityLable: selectedValue[this.props.locale],
  //     selectedEthnicityIsToched: true,
  //   });
  // };

  // popUpParticipationTypeListItemOnChange = (selectedValue) => {
  //   this.setState({
  //     selectedParticipationTypeValue: selectedValue.ParticipantTypeId,
  //     SelectedParticipationTypeLable: selectedValue[this.props.locale],
  //     ParticipationTypePopUpIsSelected: false,
  //     selectedParticipationTypeIsToched: true
  //   });
  // };

  validateForm() {
    const {
      selectedGenderValue,
      selectedCountryValue,
      inputs
      // selectedRaceValue,
      // selectedEthnicityValue,
      // selectedParticipationTypeValue,
    } = this.state;

    return (
      selectedGenderValue > 0 &&
      !!selectedCountryValue &&
      inputs.NationalId.value.length > 4
      // selectedRaceValue > 0 &&
      // selectedEthnicityValue > 0 &&
      // selectedParticipationTypeValue > 0
    );
  }

  _onBackButtonPress() {
    NavigationService.popScreen();
  }

  _onSignUpPressButton() {
    this.props.resetAuthenticateStates();
    const firstInvalidCoordinate = this.getFormValidation();
    const formValidatedValues = this.validateForm();

    if (!formValidatedValues) {
      this.setState({
        selectedGenderIsToched: false,
        selectedCountryIsToched: false,
        //selectedGenderIsToched: false,
        // selectedEthnicityIsToched: false,
        // selectedRaceIsToched: false,
        // selectedParticipationTypeIsToched: false
      })
    }

    if (firstInvalidCoordinate !== null || !formValidatedValues) {
      return;
    }
    const { buildProfilePayload } = this.props;

    let payload = {
      ...buildProfilePayload,
      GenderId: this.state.selectedGenderValue,
      // EthnicityId: this.state.selectedEthnicityValue,
      // RaceId: this.state.selectedRaceValue,
      // ParticipantTypeId: this.state.selectedParticipationTypeValue,
      LanguageId: LanguageEnum['LanguageValue-' + this.props.locale],
      CountryCode: this.state.selectedCountryValue,
      NationalId: this.state.inputs.NationalId.value,
      CityId: null
    };
    this.props.saveRegistration(payload);
  }

  _CloseAlert() {
    this.setState({ IsMessageShow: false });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
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
        <ScrollView overScrollMode='auto' showsVerticalScrollIndicator={false}>
          <View
            style={[
              Helpers.fill,
              { paddingBottom: 50 }
            ]}>
            <HeaderProgress
              rowStyle={[
                ApplicationStyles.header,
                {
                  height: '10%',
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                },
              ]}
              progressStyle={[Helpers.headerLeftRow]}
              progressCount={100}
              rightColor={Colors.patientColor}
              leftColor={'#FBFBFB'}
            />

            <View
              style={{
                flex: 1,
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
                    marginBottom: 40,
                    marginTop: 10
                  },
                ]}>
                {
                  this.props.selectedMessage[
                  'RegisterAddDetails-AdditionalDetails'
                  ]
                }
              </Text>
              {/* <Text
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
              </Text> */}

              <CustomDDLPopUp
                // add Condition
                ddlContainerStyle={[
                  Helpers.buttonContainer,
                  Metrics.smallVerticalMargin,
                  { borderRadius: 8 },
                  this.state.selectedCountryValue
                    ? {}
                    : {
                      backgroundColor: 'transparent',
                      borderColor: Colors.patientColor,
                      borderWidth: 0.8,
                    },
                  this.state.selectedCountryIsToched === false ? { borderColor: Colors.error } : { borderColor: Colors.patientColor }

                ]}
                // add Condition
                ddlLableStyle={[
                  { width: '70%', paddingLeft: 16 },
                  this.state.selectedCountryValue
                    ? { color: 'white' }
                    : { color: Colors.patientColor },
                ]}
                ddlIconContainerStyle={[{ width: '30%' }]}
                ddlIconStyle={[Helpers.rightIconStyle]}
                popUpListItemTextStyle={[Helpers.popUpListItemTextStyle]}
                popUpListItemStyle={[Helpers.popUpListItemStyle]}
                popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                popUpTitleStyle={[Helpers.popUpTitleStyle]}
                popUpTitleAlign={'left'}
                popUpTitleText={
                  this.props.selectedMessage['RegisterAddDetails-Country'] +
                  ' *'
                }
                popUpListSrc={this.state.countriesList}
                popUpIsSelected={this.state.countryPopUpIsSelected}
                popUpSelectedValue={this.state.selectedCountryValue}
                popUpSelectedLable={this.state.SelectedCountryLable}
                popUpKey={'code'}
                popUpListItemOnChange={this.popUpCountryListItemOnChange.bind(
                  this,
                )}
                leftIcon={
                  this.state.selectedCountryValue
                    ? Images.DDLWhite
                    : Images.DDLPurple
                }
                ddlListText={this.props.locale}></CustomDDLPopUp>


              <CustomDDLPopUp
                // add Condition
                ddlContainerStyle={[
                  Helpers.buttonContainer,
                  Metrics.smallVerticalMargin,
                  { borderRadius: 8 },
                  this.state.selectedGenderValue
                    ? {}
                    : {
                      backgroundColor: 'transparent',
                      borderColor: Colors.patientColor,
                      borderWidth: 0.8,
                    },
                  this.state.selectedGenderIsToched === false ? { borderColor: Colors.error } : { borderColor: Colors.patientColor }

                ]}
                // add Condition
                ddlLableStyle={[
                  { width: '70%', paddingLeft: 16 },
                  this.state.selectedGenderValue
                    ? { color: 'white' }
                    : { color: Colors.patientColor },
                ]}
                ddlIconContainerStyle={[{ width: '30%' }]}
                ddlIconStyle={[Helpers.rightIconStyle]}
                popUpListItemTextStyle={[Helpers.popUpListItemTextStyle]}
                popUpListItemStyle={[Helpers.popUpListItemStyle]}
                popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                popUpTitleStyle={[Helpers.popUpTitleStyle]}
                popUpTitleAlign={'left'}
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
                    ? Images.DDLWhite
                    : Images.DDLPurple
                }
                ddlListText={this.props.locale}></CustomDDLPopUp>


              <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, { borderColor: Colors.GreyColor }, this.state.inputs['NationalId'].touched ? this.renderError("NationalId") ? { borderColor: Colors.error } : { borderColor: Colors.patientColor } : {}]}
                inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
                placeholder={this.props.selectedMessage["RegisterAddDetails-NationalID"]}
                placeholderTextColor={Colors.placeholderGraycolor}
                onChangeText={(value) => this.onInputChange({ id: 'NationalId', value })}
                value={this.state.inputs.NationalId.value}
                componentStyle={[Helpers.column, Helpers.crossStart]}
                rightIconStyle={[Helpers.rightIconStyle]}
                inputBoxLableStyle={[Helpers.inputBoxLable]}
                hasEvent={false}
                allowFontScaling={false}
                hasRightIcon={true}
                maxLength={20}
                rightIcon={this.state.inputs["NationalId"].touched ? this.renderError("NationalId") ? Images.InValid : Images.ValidPurple : null}

              />
              {/* <CustomDDLPopUp
                // add Condition
                ddlContainerStyle={[
                  Helpers.buttonContainer,
                  Metrics.smallVerticalMargin,
                  { borderRadius: 8 },
                  this.state.selectedEthnicityValue
                    ? {}
                    : {
                      backgroundColor: 'transparent',
                      borderColor: Colors.patientColor,
                      borderWidth: 0.8,
                    },
                  this.state.selectedEthnicityIsToched === false ? { borderColor: Colors.error } : { borderColor: Colors.patientColor }

                ]}
                // add Condition
                ddlLableStyle={[
                  { width: '70%', paddingLeft: 16 },
                  this.state.selectedEthnicityValue
                    ? { color: 'white' }
                    : { color: Colors.patientColor },
                ]}
                ddlIconContainerStyle={[{ width: '30%' }]}
                ddlIconStyle={[Helpers.rightIconStyle]}
                popUpListItemTextStyle={[Helpers.popUpListItemTextStyle]}
                popUpListItemStyle={[Helpers.popUpListItemStyle]}
                popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                popUpTitleStyle={[Helpers.popUpTitleStyle]}
                popUpTitleAlign={'left'}
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
                    ? Images.DDLWhite
                    : Images.DDLPurple
                }
                ddlListText={this.props.locale}></CustomDDLPopUp> */}

              {/* <CustomDDLPopUp
                // add Condition
                ddlContainerStyle={[
                  Helpers.buttonContainer,
                  Metrics.smallVerticalMargin,
                  { borderRadius: 8 },
                  this.state.selectedRaceValue
                    ? {}
                    : {
                      backgroundColor: 'transparent',
                      borderColor: Colors.patientColor,
                      borderWidth: 0.8,
                    },
                  this.state.selectedRaceIsToched === false ? { borderColor: Colors.error } : { borderColor: Colors.patientColor }
                ]}
                // add Condition
                ddlLableStyle={[
                  { width: '70%', paddingLeft: 16 },
                  this.state.selectedRaceValue
                    ? { color: 'white' }
                    : { color: Colors.patientColor },
                ]}
                ddlIconContainerStyle={[{ width: '30%' }]}
                ddlIconStyle={[Helpers.rightIconStyle]}
                popUpListItemTextStyle={[Helpers.popUpListItemTextStyle]}
                popUpListItemStyle={[Helpers.popUpListItemStyle]}
                popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                popUpTitleStyle={[Helpers.popUpTitleStyle]}
                popUpTitleAlign={'left'}
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
                  this.state.selectedRaceValue
                    ? Images.DDLWhite
                    : Images.DDLPurple
                }
                ddlListText={this.props.locale}></CustomDDLPopUp> */}

              {/* <CustomDDLPopUp
                // add Condition
                ddlContainerStyle={[
                  Helpers.buttonContainer,
                  Metrics.smallVerticalMargin,
                  { borderRadius: 8 },
                  this.state.selectedParticipationTypeValue
                    ? {}
                    : {
                      backgroundColor: 'transparent',
                      borderColor: Colors.patientColor,
                      borderWidth: 0.8,
                    },
                  this.state.selectedParticipationTypeIsToched === false ? { borderColor: Colors.error } : { borderColor: Colors.patientColor }

                ]}
                // add Condition
                ddlLableStyle={[
                  { width: '70%', paddingLeft: 16 },
                  this.state.selectedParticipationTypeValue
                    ? { color: 'white' }
                    : { color: Colors.patientColor },
                ]}
                ddlIconContainerStyle={[{ width: '30%' }]}
                ddlIconStyle={[Helpers.rightIconStyle]}
                popUpListItemTextStyle={[Helpers.popUpListItemTextStyle]}
                popUpListItemStyle={[Helpers.popUpListItemStyle]}
                popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                popUpTitleStyle={[Helpers.popUpTitleStyle]}
                popUpTitleAlign={'left'}
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
                    ? Images.DDLWhite
                    : Images.DDLPurple
                }
                ddlListText={this.props.locale}></CustomDDLPopUp> */}

            </View>
          </View>

        </ScrollView>
        <View
          style={[
            ApplicationStyles.header,
            {
              height: 70,
              backgroundColor: 'transparent',
              justifyContent: 'flex-end',
            },
          ]}>
          <CustomMultiButtons
            mutliButtonContainer={[
              Helpers.bottomView,
              Helpers.multiButtonContainer,
              { justifyContent: 'space-between' },
            ]}
            leftButtonContainer={[
              Helpers.buttonContainer,
              Helpers.buttonContainerWithoutBackground,
            ]}
            rightButtonContainer={[
              Helpers.buttonContainer,
              { width: '40%', borderRadius: 13 },
            ]}
            leftButtonTextStyle={[
              Helpers.btnText,
              Helpers.buttonTextWithoutBackgroundContainer,
            ]}
            rightButtonTextStyle={[Helpers.btnText, { fontSize: 14 }]}
            leftButtonText={
              this.props.selectedMessage['RegisterAddDetails-Back']
            }
            rightButtonText={
              this.props.selectedMessage['RegisterAddDetails-Finish']
            }
            onLeftPress={this._onBackButtonPress.bind(this)}
            onRightPress={this._onSignUpPressButton.bind(this)}>
          </CustomMultiButtons>
        </View>

      </SafeAreaView >
    );
  }
}

AdditionalDetailScreen.propTypes = {
  getEthnicityList: PropTypes.func,
  getRaceList: PropTypes.func,
  getParticipationType: PropTypes.func,
  getGenderList: PropTypes.func,
  registrationErrorMessage: PropTypes.string,
  registrationSuccessMessage: PropTypes.string,
  authenticatedIsLoading: PropTypes.bool,
  saveRegistration: PropTypes.func,

  ethincityList: PropTypes.array,
  ethincityListErrorMessage: PropTypes.string,

  raceList: PropTypes.array,
  raceListErrorMessage: PropTypes.string,
  genderList: PropTypes.array,
  genderListErrorMessage: PropTypes.string,

  participationTypeList: PropTypes.array,
  participationTypeErrorMessage: PropTypes.string,
  signUpPayload: PropTypes.array,
  buildProfilePayload: PropTypes.array,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  registrationSuccessMessage: state.authenticate.registrationSuccessMessage,
  registrationErrorMessage: state.authenticate.registrationErrorMessage,

  ethnicityList: state.authenticate.ethnicityList,
  ethnicityListErrorMessage: state.authenticate.ethnicityListErrorMessage,

  raceList: state.authenticate.raceList,
  raceListErrorMessage: state.authenticate.raceListErrorMessage,

  genderList: state.authenticate.genderList,
  genderListErrorMessage: state.authenticate.genderListErrorMessage,

  participationTypeList: state.authenticate.participationTypeList,
  participationTypeErrorMessage:
    state.authenticate.participationTypeErrorMessage,

  signUpPayload: state.authenticate.signUpPayload,
  buildProfilePayload: state.authenticate.buildProfilePayload,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});

// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  saveRegistration: (data) =>
    dispatch(AuthenticateActions.saveRegistration(data)),
  getEthnicityList: () => dispatch(AuthenticateActions.getEthnicityList()),
  getRaceList: () => dispatch(AuthenticateActions.getRaceList()),
  getGenderList: () => dispatch(AuthenticateActions.getGenderList()),
  getParticipationType: () =>
    dispatch(AuthenticateActions.getParticipationType()),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdditionalDetailScreen);
