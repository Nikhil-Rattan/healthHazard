import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import {
  Metrics,
  Helpers,
  Colors,
  Images,
} from 'App/Theme';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import { TextInputMask } from 'react-native-masked-text';
import { ValidationService } from 'App/Services/ValidationService';
import NavigationService from 'App/Services/NavigationService';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import StartupActions from 'App/Stores/Startup/Actions';

import { ExtractCityState } from 'App/Stores/Authentication/Selectors';
import { LanguageEnum } from 'App/Enums';
import CustomHeaderNew from 'App/Components/CustomHeaderNew';
import CustomPhoneInput from 'App/Components/CustomPhoneInput';
import { Enums } from 'App/Enums';

const { getCountries } = require("country-list-spanish"); //spanish
const countries = require("i18n-iso-countries/langs/en.json");  //english

class EditPatientInfo extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      countriesList: [],

      selectedGenderValue: null,
      genderPopUpIsSelected: false,
      SelectedGenderLable:
        this.props.selectedMessage['RegisterAddDetails-GenderAtBirth'] + ' *',

      selectedRaceValue: null,
      racePopUpIsSelected: false,
      SelectedRaceLable:
        this.props.selectedMessage['RegisterAddDetails-Race'] + ' *',

      selectedCountryValue: null,
      countryPopUpIsSelected: false,
      selectedCountryLabel: this.props.selectedMessage['RegisterAddDetails-Country'] + ' *',

      // selectedEthnicityValue: null,
      // ethnicityPopUpIsSelected: false,
      // SelectedEthnicityLable:
      //   this.props.selectedMessage['RegisterAddDetails-Ethnicity'] + ' *',

      selectedParticipationTypeValue: null,
      participationTypePopUpIsSelected: false,
      SelectedParticipationTypeLable:
        this.props.selectedMessage['RegisterAddDetails-ParticipationType'] +
        ' *',

      statePicked: this.props.selectedMessage['RegisterProfile-SelectState'],
      // cityPicked: this.props.selectedMessage['RegisterProfile-SelectCity'],

      selectedStateValue: null,
      statePopUpIsSelected: false,
      selectedStateLable: this.props.selectedMessage[
        'RegisterProfile-SelectState'
      ],

      // selectedCityValue: null,
      // cityPopUpIsSelected: false,
      // selectedCityLable: this.props.selectedMessage[
      //   'RegisterProfile-SelectCity'
      // ],

      IsSuccess: false,
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
        phoneNumber: {
          type: 'phone',
          value: '',
        },
        emailId: {
          type: 'email',
          value: '',
        },
        language: {
          type: 'cities',
          value: '',
          touched: true,
        },
        dob: {
          type: 'dob',
          value: '',
        },
        address: {
          type: 'generic',
          value: '',
        },
        city: {
          type: 'generic',
          value: '',
        },
        phoneNumber: {
          type: 'phone',
          value: '',
        },
        state: {
          type: 'generic',
          value: '',
        },
        zipCode: {
          type: 'zipcode',
          value: '',
        },
        gender: {
          type: 'cities',
          value: '',
        },
        // race: {
        //   type: 'cities',
        //   value: '',
        // },
        // ethnicity: {
        //   type: 'cities',
        //   value: '',
        // },
        // participationType: {
        //   type: 'cities',
        //   value: '',
        // },
        nationalId: {
          type: 'nationalId',
          value: '',
        },
        countryCode: {
          type: 'countryCode',
          value: '',
        }
      },
      cityList: [],
      currentLocale: 'en',
      selectedValue: LanguageEnum['LanguageValue-' + this.props.locale],
      popUpIsSelected: false,
      SelectedLable: LanguageEnum['LanguageLable-' + this.props.locale],
      LanguageList: [
        {
          LanguageId: 1,
          Name: this.props.selectedMessage['EditFacProfile-English'],
          Locale: 'en',
        },
        {
          LanguageId: 2,
          Name: this.props.selectedMessage['EditFacProfile-Spanish'],
          Locale: 'sp',
        },
        // {
        //   LanguageId: 3,
        //   Name: this.props.selectedMessage['EditFacProfile-Portugues'],
        //   Locale: 'pr',
        // },
      ],
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
    this.isFormValid = ValidationService.isFormValid.bind(this);
  }

  findLanguageById(LanguageId) {
    let selectedLanguage = this.state.LanguageList.filter((d) => {
      return d.LanguageId === LanguageId;
    });

    return selectedLanguage;
  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.updateUserDetailErroressage != null &&
      prevProps.updateUserDetailErroressage !=
      this.props.updateUserDetailErroressage
    ) {
      //  this.RBErrorSheet.open()
      let Message = this.props.selectedMessage[
        this.props.updateUserDetailErroressage
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: false });
    }

    if (
      this.props.updateUserDetailSuccessMessage != null &&
      prevProps.updateUserDetailSuccessMessage !=
      this.props.updateUserDetailSuccessMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.updateUserDetailSuccessMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: true });
    }

    if (this.props.extractedCityState?.stateList.length == 1) {
      if (
        prevProps?.extractedCityState.stateList.length == 0 &&
        this.props?.extractedCityState?.stateList.length == 1
      ) {
        this.setState({
          selectedStateValue: this.props.extractedCityState?.stateList[0].value,
          statePopUpIsSelected: false,
          selectedStateLable: this.props.extractedCityState?.stateList[0].Name,
        });
        let stateValue = this.props.extractedCityState?.stateList[0].value;

        setTimeout(() => {
          this.onInputChange({ id: 'state', value: stateValue });
        }, 500);

        let cities = this.props.extractedCityState
          ? this.props.extractedCityState.cityList
          : [];

        let cityBySateName = cities.filter((data) => {
          return data.stateName === stateValue;
        });

        //  this.setState({statePicked:picked,cityList:cityBySateName })

        if (cityBySateName.length == 1) {
          this.setState({
            selectedCityValue: cityBySateName[0].value,
            cityPopUpIsSelected: false,
            selectedCityLable: cityBySateName[0].Name,
          });
          let value = cityBySateName[0].value;
          // this.onInputChange({ id: 'city', value });
        } else if (!cityBySateName.some(el => el.value === this.state.inputs.city.value)) {
          // if(!cityBySateName.some(el => el.value === this.state.inputs.city.value))
          // this.onInputChange({ id: 'city', value: '' });
        }
        // else {
        //   alert(cityBySateName.some(el => el.value === this.state.inputs.city.value) + "\n\n" + JSON.stringify(cityBySateName) + "\n\n" + JSON.stringify(this.state.inputs.city))
        // }

        this.setState({
          cityList: cityBySateName,
        });
      } else if (
        prevProps?.extractedCityState?.stateList.length == 1 &&
        this.props?.extractedCityState?.stateList.length == 1 &&
        prevProps?.extractedCityState?.stateList[0].value !=
        this.props.extractedCityState?.stateList[0].value
      ) {
        this.setState({
          selectedStateValue: this.props.extractedCityState?.stateList[0].value,
          statePopUpIsSelected: false,
          selectedStateLable: this.props.extractedCityState?.stateList[0].Name,
        });
        let stateSelectedValue = this.props.extractedCityState?.stateList[0]
          .value;


        setTimeout(() => {
          this.onInputChange({ id: 'state', value: stateSelectedValue });
        }, 500);

        let cities = this.props.extractedCityState
          ? this.props.extractedCityState.cityList
          : [];

        let cityBySateName = cities.filter((data) => {
          return data.stateName === stateSelectedValue;
        });

        //  this.setState({statePicked:picked,cityList:cityBySateName })

        if (cityBySateName.length == 1) {
          this.setState({
            selectedCityValue: cityBySateName[0].value,
            cityPopUpIsSelected: false,
            selectedCityLable: cityBySateName[0].Name,
          });

          // this.onInputChange({ id: 'city', value: cityBySateName[0].value });
        }

        this.setState({
          cityList: cityBySateName,
        });
      }
    }
  }

  componentDidMount() {
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
      countriesList.push(item);
      if (item.code == 'MX')
        countriesList.unshift(item);
    });
    this.setState({ countriesList: countriesList });

    this.props.getGenderList();
    this.props.getEthnicityList();
    this.props.getRaceList();
    this.props.getParticipationType();
    this.props.resetStateCity();

    const {
      FirstName,
      LastName,
      Email,
      DOB,
      Address,
      City,
      State,
      ZipCode,
      CountryCode,
      NationalId,
      // RaceId,
      // RaceSpanish,
      // Race,
      // Ethnicity,
      // EthnicityId,
      // EthnicitySpanish,
      Gender,
      GenderId,
      GenderSpanish,
      // ParticipantType,
      // ParticipantTypeId,
      // ParticipantTypeSpanish,
      PhoneNo,
      LanguageId,
    } = this.props.authenticatedUser;
    const { inputs } = this.state;

    //Personal Information

    const updatedEmailInput = { ...inputs['emailId'], value: Email };
    const updatedFisrtNameInput = { ...inputs['firstName'], value: FirstName };
    const updatedLastNameInput = { ...inputs['lastName'], value: LastName };
    const updatedDOBInput = { ...inputs['dob'], value: DOB };

    // Home Address
    const updatedAddressInput = { ...inputs['address'], value: Address };
    const updatedCityInput = { ...inputs['city'], value: City };
    const updatedStateInput = { ...inputs['state'], value: State };
    const updatedZipCodeInput = { ...inputs['zipCode'], value: ZipCode };
    const updatedPhoneInput = {
      ...inputs['phoneNumber'], value: PhoneNo.replace(/\s/g, '')
        .replace(/-/g, '')
        .replace(/\(|\)/g, '')
    };

    // Address
    const updatedGenderIdInput = { ...inputs['gender'], value: GenderId };
    // const updatedEthnicityIdInput = {
    //   ...inputs['ethnicity'],
    //   value: EthnicityId,
    // };
    // const updatedRaceInput = { ...inputs['race'], value: RaceId };
    // const updatedParticipantTypeInput = {
    //   ...inputs['participationType'],
    //   value: ParticipantTypeId,
    // };

    const updateCountryCode = { ...inputs['countryCode'], value: CountryCode }
    const updateNationalId = { ...inputs['nationalId'], value: NationalId }

    let input = {
      ...inputs,
      emailId: updatedEmailInput,
      firstName: updatedFisrtNameInput,
      lastName: updatedLastNameInput,
      dob: updatedDOBInput,

      address: updatedAddressInput,
      city: updatedCityInput,
      state: updatedStateInput,
      zipCode: updatedZipCodeInput,
      phoneNumber: updatedPhoneInput,

      gender: updatedGenderIdInput,
      countryCode: updateCountryCode,
      nationalId: updateNationalId
      // ethnicity: updatedEthnicityIdInput,
      // race: updatedRaceInput,
      // participationType: updatedParticipantTypeInput,
    };
    let selectedLanguage = this.findLanguageById(LanguageId);
    if (selectedLanguage.length > 0) {
      this.setState({
        selectedValue: selectedLanguage[0].LanguageId,
        popUpIsSelected: true,
        SelectedLable: selectedLanguage[0].Name,
        currentLocale: selectedLanguage[0].Locale,
      });
      const updatedLanguageInput = { ...inputs['language'], value: LanguageId };
      input = { ...input, language: updatedLanguageInput };
    }

    let selectedCountryLabel = countriesList.filter(obj => {
      return obj.code == CountryCode
    }).shift()
    this.setState({
      inputs: input,

      selectedGenderValue: GenderId,
      genderPopUpIsSelected: false,
      SelectedGenderLable: this.props.authenticatedUser[
        'Gender_' + this.props.locale
      ],

      selectedCountryValue: CountryCode,

      countryPopUpIsSelected: false,
      selectedCountryLabel: selectedCountryLabel ? selectedCountryLabel[this.props.locale] : this.props.selectedMessage['RegisterAddDetails-Country'],
      selectedStateValue: State,
      statePopUpIsSelected: false,
      selectedStateLable: State,

      // selectedCityValue: CityId,
      cityPopUpIsSelected: false,
      // selectedCityLable: CityName,
    });
    this.props.resetUpdateUserDetail();
    this.props.getCityStateByZipCode({ zipCode: ZipCode });
  }

  popUpListItemOnChange = (selectedValue) => {
    let { popUpIsSelected } = this.state;
    this.setState({
      selectedValue: selectedValue.LanguageId,
      SelectedLable: selectedValue.Name,
      popUpIsSelected: false,
      currentLocale: selectedValue.Locale,
    });
    this.onInputChange({ id: 'language', value: selectedValue.LanguageId });
  };

  popUpGenderListItemOnChange = (selectedGenderValue) => {
    this.setState({
      selectedGenderValue: selectedGenderValue.GenderId,
      SelectedGenderLable: selectedGenderValue[this.props.locale],
      genderPopUpIsSelected: false,
    });
    //alert(selectedValue)
    this.onInputChange({ id: 'gender', value: selectedGenderValue.GenderId });
  };

  popUpCountryListItemOnChange = (selectedValue) => {
    this.setState({
      selectedCountryValue: selectedValue.code,
      selectedCountryLabel: selectedValue[this.props.locale],
      countryPopUpIsSelected: false,
    });
    this.onInputChange({ id: 'countryCode', value: selectedValue.code });
  };

  // popUpRaceListItemOnChange = (selectedValue) => {
  //   this.setState({
  //     selectedRaceValue: selectedValue.RaceId,
  //     SelectedRaceLable: selectedValue[this.props.locale],
  //     racePopUpIsSelected: false,
  //   });

  //   this.onInputChange({ id: 'race', value: selectedValue.RaceId });
  //   //alert(selectedValue)
  // };

  // popUpEthnicityListItemOnChange = (selectedValue) => {
  //   this.setState({
  //     selectedEthnicityValue: selectedValue.EthnicityId,
  //     SelectedEthnicityLable: selectedValue[this.props.locale],
  //     ethnicityPopUpIsSelected: false,
  //   });

  //   this.onInputChange({ id: 'ethnicity', value: selectedValue.EthnicityId });
  //   //alert(selectedValue)
  // };

  // popUpParticipationTypeListItemOnChange = (selectedValue) => {
  //   this.setState({
  //     selectedParticipationTypeValue: selectedValue.ParticipantTypeId,
  //     SelectedParticipationTypeLable: selectedValue[this.props.locale],
  //     ParticipationTypePopUpIsSelected: false,
  //   });
  //   this.onInputChange({
  //     id: 'participationType',
  //     value: selectedValue.ParticipantTypeId,
  //   });
  //   //alert(selectedValue)
  // };

  _onSignUpPressButton() {
    NavigationService.popScreen();
  }

  _onLeftPressButton() {
    const firstInvalidCoordinate = this.getFormValidation();
    if (firstInvalidCoordinate != null) {
      return;
    }

    const userPayload = {
      PatientId: this.props.authenticatedUser?.PatientId,
      TitleId: 0,
      FirstName: this.state.inputs['firstName'].value.trim(),
      LastName: this.state.inputs['lastName'].value.trim(),
      Email: this.state.inputs['emailId'].value,
      Address: this.state.inputs['address'].value.trim(),
      DOB: this.state.inputs['dob'].value,
      Age: this.getAge(this.state.inputs['dob'].value),
      PhoneNo: this.state.inputs['phoneNumber'].value
        .replace(/\s/g, '')
        .replace(/-/g, '')
        .replace(/\(|\)/g, ''),
      City: this.state.inputs['city'].value.trim(),
      State: this.state.inputs['state'].value,
      ZipCode: this.state.inputs['zipCode'].value,
      GenderId: this.state.inputs['gender'].value,
      CountryCode: this.state.inputs['countryCode'].value,
      NationalId: this.state.inputs['nationalId'].value,
      // EthnicityId: this.state.inputs['ethnicity'].value,
      // RaceId: this.state.inputs['race'].value,
      // ParticipantTypeId: this.state.inputs['participationType'].value,
      FacilityUserId: 0,
      LoginUserId: this.props.authenticatedUser?.UserId,
      DecryptColumns: [],
      LangaugeId: this.state.inputs['language'].value,
      UserKey: this.props.authenticatedUser?.UserKey,
    };
    userPayload.DecryptColumns = ['FirstName', 'LastName', 'DOB', 'Address'];
    let userDetail = {
      UserKey: this.props.authenticatedUser?.UserKey,
      UserId: this.props.authenticatedUser?.UserId,
      UserRoleId: this.props.authenticatedUser?.UserRoleId,
    };
    let payload = {
      userPayload: userPayload,
      userDetail: userDetail,
    };

    this.props.updateUserDetail(payload);
    this.props.updateLanguage(this.state.currentLocale);
    Keyboard.dismiss()
  }

  renderError(id) {
    const { inputs } = this.state;
    if (id == 'countryCode' || id == 'phoneNumber' || id == 'firstName' || id == 'lastName' || id == 'dob' || id == 'address' || id == 'zipCode' || id == 'state' || id == 'city' || id == 'gender' || id == 'nationalId' || id == 'language')
      if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
        return true;
      }
    return false;
  }

  _CloseAlert() {
    let { IsSuccess } = this.state;
    this.setState({ IsMessageShow: false });
    if (IsSuccess) {
      NavigationService.popScreen();
    }
  }

  // Date Validate

  _isDateValid(date) {
    let inputDate = new Date(date);

    let currentDate = new Date();
    let lastDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 120),
    );
    if (inputDate > currentDate || inputDate < lastDate) {
      return false;
    }
    return true;
  }
  onChangeDOBText(value) {
    this.onInputChange({ id: 'dob', value });
  }
  onChangeCityText(value) {
    this.onInputChange({ id: 'city', value })

  }

  _onDOBInputBlur(event) {
    let value = event.nativeEvent.text
    if (value == "" || this.renderError('dob')) {
      return
    }
    const { inputs } = this.state;
    let updatedDOBError = null;

    if (!this._isDateValid(value)) {
      updatedDOBError = {
        ...inputs['dob'],
        errorLabel: '^Required',
        value,
        touched: true,
      };
    } else {
      updatedDOBError = {
        ...inputs['dob'],
        errorLabel: null,
        value,
        touched: true,
      };
    }

    let input = {
      ...inputs,
      dob: updatedDOBError,
    };

    this.setState({ inputs: input });
  }

  resetCityStateValue() {
    var inputs = this.state.inputs;
    // inputs.state.value = inputs.city.value = ''
    this.onInputChange({ id: 'state', value: '' })
    // this.onInputChange({ id: 'city', value: '' })
    this.setState({
      inputs: inputs,
      selectedStateValue: null,
      statePopUpIsSelected: false,
      selectedStateLable: this.props.selectedMessage[
        'RegisterProfile-SelectState'
      ],
      selectedCityValue: null,
      cityPopUpIsSelected: false,
      selectedCityLable: this.props.selectedMessage[
        'RegisterProfile-City'
      ],
      cityList: [],
    });
  }

  // Fetch Address

  _onZipCodeInputBlur(event) {
    this.props.resetStateCity();

    this.resetCityStateValue();
    this.onInputChange({ id: 'state', value: '' });
    // this.onInputChange({ id: 'city', value: '' });
    //  alert(this.state.inputs['state'].value)
    if (!this.renderError('zipCode')) {
      this.props.getCityStateByZipCode({ zipCode: event.nativeEvent.text });
    }
  }

  popUpStateListItemOnChange = (selectedStateValue) => {
    // alert(this.state.selectedStateLable)

    let value = '';
    // this.onInputChange({ id: 'city', value });

    value = selectedStateValue.value;
    //  this.setError("state",)
    this.onInputChange({ id: 'state', value });

    let cities = this.props.extractedCityState
      ? this.props.extractedCityState.cityList
      : [];

    let cityBySateName = cities.filter((data) => {
      return data.stateName === value;
    });

    //  this.setState({statePicked:picked,cityList:cityBySateName })
    this.setState({
      cityList: cityBySateName,
      selectedStateValue: selectedStateValue.value,
      selectedStateLable: selectedStateValue.Name,
      statePopUpIsSelected: false,
    });

    if (cityBySateName.length == 1) {
      this.setState({
        selectedCityValue: cityBySateName[0].value,
        cityPopUpIsSelected: false,
        selectedCityLable: cityBySateName[0].Name,
      });

      setTimeout(() => {
        // this.onInputChange({ id: 'city', value: cityBySateName[0].value });
      }, 500);
    } else {
      this.setState({
        selectedCityValue: null,
        cityPopUpIsSelected: false,
        selectedCityLable: this.props.selectedMessage[
          'RegisterProfile-City'
        ],
      });
      setTimeout(() => {
        // this.onInputChange({ id: 'city', value: "" });
      }, 500);
    }
  };

  popUpCityListItemOnChange = (selectedCityValue) => {
    //alert(selectedValue)

    let value = selectedCityValue.value;
    //  this.setError("state",)
    // this.onInputChange({ id: 'city', value });
    //  this.setState({statePicked:picked,cityList:cityBySateName })
    this.setState({
      selectedCityValue: selectedCityValue.value,
      selectedCityLable: selectedCityValue.label,
      cityPopUpIsSelected: false,
    });
  };

  // Calculate Age
  getAge(DOB) {
    let today = new Date();
    let birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  }

  renderPeronalInfoAndAddress() {
    const IsFacility = this.props.accountType === Enums.Facility;
    const mask = '+52 [000] [000]-[0000]';
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Text style={[Helpers.BoldTexttitle, { marginHorizontal: 10, marginTop: '4%' }]}>
          {this.props.selectedMessage['EditFacProfile-PersonalInformation']}
        </Text>
        <CustomInputBox
          containerStyle={[
            Helpers.txtRoundInputContainer, ,
            this.renderError('firstName') ? { borderColor: Colors.error } : {},
          ]}
          inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill,]}
          // placeholder={this.props.selectedMessage["RegisterProfile-EnterYourFirstName"]}
          placeholder={this.props.selectedMessage['EditPatientScreen-NameNew']}
          placeholderTextColor="#8492A6"
          onChangeText={(value) => this.onInputChange({ id: 'firstName', value })}
          value={this.state.inputs.firstName.value}
          // inputLabl={this.props.selectedMessage["RegisterProfile-FirstName"]}
          componentStyle={[Helpers.column, Helpers.crossStart]}
          rightIconStyle={[Helpers.rightIconStyle]}
          inputBoxLableStyle={[Helpers.inputBoxLable]}
          hasEvent={false}
          allowFontScaling={false}
          hasRightIcon={true}
          maxLength={20}
          rightIcon={
            this.state.inputs['firstName'].touched
              ? this.renderError('firstName')
                ? Images.InValid
                : Images.ValidPurple
              : null
          }
        />
        <CustomInputBox
          containerStyle={[
            Helpers.txtRoundInputContainer, ,
            this.renderError('lastName') ? { borderColor: Colors.error } : {},
          ]}
          inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
          //placeholder={this.props.selectedMessage["RegisterProfile-EnterYourLastName"]}
          // placeholderTextColor={Colors.placeholderGraycolor}
          placeholder={
            this.props.selectedMessage['EditPatientScreen-SurnameNew']
          }
          placeholderTextColor="#8492A6"
          onChangeText={(value) => this.onInputChange({ id: 'lastName', value })}
          value={this.state.inputs.lastName.value}
          //  inputLabl={this.props.selectedMessage["RegisterProfile-LastName"]}
          componentStyle={[Helpers.column, Helpers.crossStart]}
          rightIconStyle={[Helpers.rightIconStyle]}
          inputBoxLableStyle={[Helpers.inputBoxLable]}
          hasEvent={false}
          maxLength={20}
          hasRightIcon={true}
          rightIcon={
            this.state.inputs['lastName'].touched
              ? this.renderError('lastName')
                ? Images.InValid
                : Images.ValidPurple
              : null
          }
        />

        <CustomInputBox
          containerStyle={[
            Helpers.RectangletxtInputContainer,
            { backgroundColor: '#E5E9F2' },
            this.renderError('emailId') ? { borderColor: Colors.error } : {},
            { marginTop: 0, width: '100%' },
          ]}
          inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
          placeholder={this.props.selectedMessage['AccountLogin-Email']}
          onChangeText={(value) => this.onInputChange({ id: 'emailId', value })}
          value={this.state.inputs.emailId.value}
          //  inputLabl={this.props.selectedMessage["AccountLogin-Email"] }
          componentStyle={[Helpers.column, Helpers.crossStart]}
          rightIconStyle={[Helpers.rightIconStyle]}
          inputBoxLableStyle={[Helpers.inputBoxLable]}
          hasEvent={false}
          hasRightIcon={true}
          editable={false}
          rightIcon={
            this.state.inputs['emailId'].touched
              ? this.renderError('emailId')
                ? Images.InValid
                : Images.ValidPurple
              : null
          }
        />

        {/* <Text style={Helpers.inputBoxLable}>
      {this.state.inputs.dob.value ? this.props.selectedMessage["RegisterProfile-DateOfBirth"] : null}
    </Text> */}
        <View
          style={[
            Helpers.txtRoundInputContainer, ,
            { marginTop: '3%' },
            this.renderError('dob') ? { borderColor: Colors.error } : {},
          ]}>
          <TextInputMask
            placeholder={
              this.props.selectedMessage['RegisterProfile-DateOfBirth']
            }
            placeholderTextColor={Colors.placeholderGraycolor}
            style={[Helpers.txtRoundInputs, Helpers.fill]}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            //keyboardType="phone-pad"
            onEndEditing={this._onDOBInputBlur.bind(this)}
            returnKeyType="done"
            value={this.state.inputs.dob.value}
            onChangeText={this.onChangeDOBText.bind(this)}
          />

          {this.state.inputs['dob'].touched ? (
            this.renderError('dob') ? (
              <Image
                style={[Helpers.rightIconStyle]}
                resizeMode="contain"
                source={Images.InValid}
              />
            ) : (
              <Image
                style={[Helpers.rightIconStyle]}
                resizeMode="contain"
                source={Images.ValidPurple}
              />
            )
          ) : null}
        </View>

        <Text style={[Helpers.BoldTexttitle, { marginHorizontal: 10, marginTop: '6%' }]}>
          {this.props.selectedMessage['EditFacProfile-HomeAddress']}
        </Text>

        <CustomInputBox
          containerStyle={[
            Helpers.txtRoundInputContainer, ,
            this.renderError('address') ? { borderColor: Colors.error } : {},
          ]}
          inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
          //placeholder={this.props.selectedMessage["RegisterProfile-StreetAddress"]}
          //placeholderTextColor={Colors.placeholderGraycolor}
          placeholder={
            this.props.selectedMessage['EditPatientScreen-StreetNew']
          }
          placeholderTextColor="#8492A6"
          onChangeText={(value) => this.onInputChange({ id: 'address', value })}
          value={this.state.inputs.address.value}
          //inputLabl={this.props.selectedMessage["RegisterProfile-Address"]}
          componentStyle={[Helpers.column, Helpers.crossStart]}
          rightIconStyle={[Helpers.rightIconStyle]}
          inputBoxLableStyle={[Helpers.inputBoxLable]}
          hasEvent={false}
          hasRightIcon={true}
          maxLength={40}
          rightIcon={
            this.state.inputs['address'].touched
              ? this.renderError('address')
                ? Images.InValid
                : Images.ValidPurple
              : null
          }
        />

        <CustomInputBox
          containerStyle={[
            Helpers.txtRoundInputContainer, ,
            this.renderError('zipCode') ? { borderColor: Colors.error } : {},
          ]}
          inputBoxstyle={[Helpers.txtRoundInputs]}
          placeholder={
            this.props.selectedMessage['EditPatientScreen-PostcodeNew']
          }
          // placeholderTextColor={Colors.placeholderGraycolor}
          // placeholder='Postcode'
          placeholderTextColor="#8492A6"
          onChangeText={(value) => { this.resetCityStateValue(); this.onInputChange({ id: 'zipCode', value }) }}
          onEndEditing={this._onZipCodeInputBlur.bind(this)}
          value={this.state.inputs.zipCode.value}
          // inputLabl={this.props.selectedMessage["RegisterProfile-ZipCode"]}
          componentStyle={[Helpers.column, Helpers.crossStart]}
          inputBoxLableStyle={[Helpers.inputBoxLable]}
          rightIconStyle={[Helpers.rightIconStyle]}
          hasEvent={false}
          hasRightIcon={true}
          maxLength={7}
          rightIcon={
            this.state.inputs['zipCode'].touched
              ? this.renderError('zipCode')
                ? Images.InValid
                : Images.ValidPurple
              : null
          }></CustomInputBox>

        <CustomPhoneInput
          containerStyle={[
            Helpers.txtRoundInputContainer,
            this.state.inputs['phoneNumber'].touched
              ? this.renderError('phoneNumber')
                ? { borderColor: Colors.error }
                : {
                  borderColor: IsFacility
                    ? Colors.facilityColor
                    : Colors.patientColor,
                }
              : {},
          ]}
          inputBoxstyle={[Helpers.txtRoundInputs]}
          placeholder={
            this.props.selectedMessage['RegisterProfile-PhoneNumber']
          }
          mask={mask}
          placeholderTextColor="#BDBDBD"
          keyboardType="phone-pad"
          onChangeText={(formatted, extracted) => {
            console.log(`Formatted: ${formatted}`); // +1 (123) 456-7890
            console.log(`Extracted: ${extracted}`); // 1234567890
            this.onInputChange({ id: 'phoneNumber', value: '+52' + extracted })
          }}
          value={this.state.inputs.phoneNumber.value}
          componentStyle={[Helpers.column, Helpers.crossStart]}
          rightIconStyle={[Helpers.rightIconStyle]}
          inputBoxLableStyle={[Helpers.inputBoxLable]}
          hasEvent={false}
          hasRightIcon={true}
          rightIcon={
            this.state.inputs['phoneNumber'].touched
              ? this.renderError('phoneNumber')
                ? Images.InValid
                : IsFacility
                  ? Images.ValidGreen
                  : Images.ValidPurple
              : null
          }
        />

        <View
          style={{
            marginTop: '3%',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{ width: '45%', marginTop: 4 }}>
            <CustomDDLPopUp
              // add Condition
              ddlContainerStyle={[
                Helpers.buttonContainer,
                Metrics.smallVerticalMargin,
                { borderRadius: 8 },
                { backgroundColor: 'transparent', borderWidth: 0.8 },
                this.renderError('state') ? { borderColor: Colors.error } : { borderColor: Colors.patientColor },
              ]}
              // add Condition
              ddlLableStyle={[
                { width: '70%', paddingLeft: 16 },
                { color: Colors.patientColor },
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
                this.props.selectedMessage['RegisterProfile-State'] + ' *'
              }
              popUpListSrc={
                this.props.extractedCityState
                  ? this.props.extractedCityState.stateList
                  : []
              }
              popUpIsSelected={this.state.statePopUpIsSelected}
              popUpSelectedValue={this.state.selectedStateValue}
              popUpSelectedLable={this.state.selectedStateLable}
              popUpKey={'value'}
              popUpListItemOnChange={this.popUpStateListItemOnChange.bind(this)}
              leftIcon={
                this.state.selectedStateValue
                  ? Images.DDLPurple
                  : Images.DDLPurple
              }
              openPopUp={
                this.props.extractedCityState
                  ? this.props.extractedCityState.stateList.length > 0
                  : false
              }></CustomDDLPopUp>
          </View>
          <View style={{ width: '45%', backgroundColor: 'transparent', marginTop: Platform.OS === 'ios' ? 0 : -4 }}>
            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, { borderWidth: 0.8, justifyContent: 'center' },
                this.renderError('city') ? { borderColor: Colors.error } : {},
              ]}
              inputBoxstyle={[Helpers.txtRoundInputs, Helpers.lightBook]}
              placeholder={
                this.props.selectedMessage['RegisterProfile-City']
              }
              placeholderTextColor="#8492A6"
              onChangeText={(value) => this.onInputChange({ id: 'city', value })}
              // onChangeText={(value) => { this.resetCityStateValue(); this.onInputChange({ id: 'zipCode', value }) }}
              // onEndEditing={this._onZipCodeInputBlur.bind(this)}
              value={this.state.inputs.city.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={50}
              rightIcon={
                this.state.inputs['city'].touched
                  ? this.renderError('city')
                    ? Images.InValid
                    : Images.ValidPurple
                  : null
              }></CustomInputBox>

            {/* <CustomDDLPopUp
              // add Condition
              ddlContainerStyle={[
                Helpers.buttonContainer,
                Metrics.smallVerticalMargin,
                { borderRadius: 8 },
                { backgroundColor: 'transparent', borderWidth: 0.8 },
                this.renderError('city') ? { borderColor: Colors.error } : { borderColor: Colors.patientColor },
              ]}
              // add Condition
              ddlLableStyle={[
                { width: '70%', paddingLeft: 16 },
                { color: Colors.patientColor },
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
                this.props.selectedMessage['RegisterProfile-City'] + ' *'
              }
              popUpListSrc={this.state.cityList}
              popUpIsSelected={this.state.cityPopUpIsSelected}
              popUpSelectedValue={this.state.selectedCityValue}
              popUpSelectedLable={this.state.selectedCityLable}
              popUpKey={'value'}
              popUpListItemOnChange={this.popUpCityListItemOnChange.bind(this)}
              leftIcon={
                this.state.selectedCityValue
                  ? Images.DDLPurple
                  : Images.DDLPurple
              }
              openPopUp={this.state.cityList.length > 0}></CustomDDLPopUp> */}
          </View>
        </View>
      </View>
    );
  }

  renderAdditionDetail() {
    return (
      <View
        style={{
          marginTop: '6%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingBottom: Platform.OS == 'ios' ? 0 : 110
        }}>
        <Text style={[Helpers.BoldTexttitle, { marginHorizontal: 10 }]}>
          {this.props.selectedMessage['RegisterAddDetails-AdditionalDetails']}
        </Text>
        <CustomDDLPopUp
          // add Condition
          ddlContainerStyle={[
            Helpers.buttonContainer,
            Metrics.smallVerticalMargin,
            { borderRadius: 8, marginTop: '4%' },
            { backgroundColor: 'transparent', borderWidth: 0.8 },
            this.renderError('gender') ? { borderColor: Colors.error } : { borderColor: Colors.patientColor },
          ]} // add Condition
          ddlLableStyle={[
            { width: '70%', paddingLeft: 16 },
            this.state.selectedGenderValue
              ? { color: Colors.patientColor }
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
          popUpListItemOnChange={this.popUpGenderListItemOnChange.bind(this)}
          leftIcon={
            this.state.selectedGenderValue ? Images.DDLPurple : Images.DDLPurple
          }
          ddlListText={this.props.locale}></CustomDDLPopUp>
        <CustomDDLPopUp
          // add Condition
          ddlContainerStyle={[
            Helpers.buttonContainer,
            Metrics.smallVerticalMargin,
            { borderRadius: 8 },
            { backgroundColor: 'transparent', borderWidth: 0.8, marginTop: 15 },
            this.renderError('countryCode') ? { borderColor: Colors.error } : { borderColor: Colors.patientColor },
          ]} // add Condition
          ddlLableStyle={[
            { width: '70%', paddingLeft: 16 },
            this.state.selectedCountryValue
              ? { color: Colors.patientColor }
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
            this.props.selectedMessage['RegisterAddDetails-Country'] + ' *'
          }
          popUpListSrc={this.state.countriesList}
          popUpIsSelected={this.state.countryPopUpIsSelected}
          popUpSelectedValue={this.state.selectedCountryValue ?? ''}
          popUpSelectedLable={this.state.selectedCountryLabel}
          popUpKey={'code'}
          popUpListItemOnChange={this.popUpCountryListItemOnChange.bind(this)}
          leftIcon={
            this.state.selectedCountryValue
              ? Images.DDLPurple
              : Images.DDLPurple
          }
          ddlListText={this.props.locale}></CustomDDLPopUp>

        <CustomInputBox
          containerStyle={[
            Helpers.txtRoundInputContainer,
            { backgroundColor: 'transparent', borderWidth: 0.8, marginBottom: 15 },
            this.renderError('nationalId') ? { borderColor: Colors.error } : {},
          ]}
          inputBoxstyle={[Helpers.txtRoundInputs, Helpers.lightBook]}
          //placeholder={this.props.selectedMessage["RegisterProfile-StreetAddress"]}
          //placeholderTextColor={Colors.placeholderGraycolor}
          placeholder={this.props.selectedMessage["RegisterAddDetails-NationalID"]}
          placeholderTextColor="#8492A6"
          onChangeText={(value) => this.onInputChange({ id: 'nationalId', value })}
          value={this.state.inputs.nationalId.value}
          componentStyle={[Helpers.column, Helpers.crossStart]}
          rightIconStyle={[Helpers.rightIconStyle]}
          inputBoxLableStyle={[Helpers.inputBoxLable]}
          hasEvent={false}
          hasRightIcon={true}
          maxLength={40}
          rightIcon={
            this.state.inputs['nationalId'].touched
              ? this.renderError('nationalId')
                ? Images.InValid
                : Images.ValidPurple
              : null
          }
        />
        {/* <CustomDDLPopUp
          // add Condition
          ddlContainerStyle={[
            Helpers.buttonContainer,
            Metrics.smallVerticalMargin,
            { borderRadius: 8 },
            { backgroundColor: 'transparent', borderWidth: 0.8 },
            this.renderError('ethnicity') ? { borderColor: Colors.error } : { borderColor: Colors.patientColor },
          ]} // add Condition
          ddlLableStyle={[
            { width: '70%', paddingLeft: 16 },
            this.state.selectedEthnicityValue
              ? { color: Colors.patientColor }
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
            this.props.selectedMessage['RegisterAddDetails-Ethnicity'] + ' *'
          }
          popUpListSrc={this.props.ethnicityList}
          popUpIsSelected={this.state.ethnicityPopUpIsSelected}
          popUpSelectedValue={this.state.selectedEthnicityValue}
          popUpSelectedLable={this.state.SelectedEthnicityLable}
          popUpKey={'EthnicityId'}
          popUpListItemOnChange={this.popUpEthnicityListItemOnChange.bind(this)}
          leftIcon={
            this.state.selectedEthnicityValue
              ? Images.DDLPurple
              : Images.DDLPurple
          }
          ddlListText={this.props.locale}></CustomDDLPopUp>

        <CustomDDLPopUp
          // add Condition
          ddlContainerStyle={[
            Helpers.buttonContainer,
            Metrics.smallVerticalMargin,
            { borderRadius: 8 },
            { backgroundColor: 'transparent', borderWidth: 0.8 },
            this.renderError('race') ? { borderColor: Colors.error } : { borderColor: Colors.patientColor },
          ]} // add Condition
          ddlLableStyle={[
            { width: '70%', paddingLeft: 16 },
            this.state.selectedRaceValue
              ? { color: Colors.patientColor }
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
            this.state.selectedRaceValue ? Images.DDLPurple : Images.DDLPurple
          }
          ddlListText={this.props.locale}></CustomDDLPopUp>

        <CustomDDLPopUp
          // add Condition
          ddlContainerStyle={[
            Helpers.buttonContainer,
            Metrics.smallVerticalMargin,
            { borderRadius: 8 },
            { backgroundColor: 'transparent', borderWidth: 0.8 },
            this.renderError('participationType')
              ? { borderColor: Colors.error }
              : { borderColor: Colors.patientColor },
          ]} // add Condition
          ddlLableStyle={[
            { width: '70%', paddingLeft: 16 },
            this.state.selectedParticipationTypeValue
              ? { color: Colors.patientColor }
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
            this.props.selectedMessage['RegisterAddDetails-ParticipationType'] +
            ' *'
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
              ? Images.DDLPurple
              : Images.DDLPurple
          }
          ddlListText={this.props.locale}></CustomDDLPopUp> */}

        <CustomDDLPopUp
          // add Condition
          ddlContainerStyle={[
            Helpers.buttonContainer,
            Metrics.smallVerticalMargin,
            { borderRadius: 8, marginBottom: '5%' },
            { backgroundColor: 'transparent', borderWidth: 0.8 },
            this.renderError('language') ? { borderColor: Colors.error } : { borderColor: Colors.patientColor },
          ]} // add Condition
          ddlLableStyle={[
            { width: '70%', paddingLeft: 16 },
            {
              color: this.state.selectedValue
                ? Colors.patientColor
                : Colors.patientColor,
            },
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
            this.props.selectedMessage['LanguageScreen-LanguageSelection']
          }
          popUpListSrc={this.state.LanguageList}
          popUpIsSelected={this.state.popUpIsSelected}
          popUpSelectedValue={this.state.selectedValue}
          popUpSelectedLable={
            this.props.selectedMessage['EditProfile-Language'] +
            ':' +
            this.state.SelectedLable
          }
          popUpKey={'LanguageId'}
          popUpListItemOnChange={this.popUpListItemOnChange.bind(this)}
          leftIcon={
            this.state.selectedValue ? Images.DDLPurple : Images.DDLPurple
          }
          openPopUp={true}></CustomDDLPopUp>
      </View>
    );
  }

  render() {
    return (
      // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
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
          HeaderTitle=" "
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
        <CustomHeaderNew
          HeaderColor={{ backgroundColor: 'white' }}
          textcolorHeader={Colors.patientColor}
          onPressBackButton={() => {
            NavigationService.popScreen();
          }}
          HeaderTitle={this.props.selectedMessage['EditFacProfile-EditProfile']}
          LeftImage={Images.PurPleBackIcon}
          buttonCircleColor={'transparent'}
          Isshadow={true}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: 'white',
              width: '100%',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            {this.renderPeronalInfoAndAddress()}
            {this.renderAdditionDetail()}
          </ScrollView>
          {/* <CustomMultiButtons
 mutliButtonContainer={[ Helpers.bottomView,Helpers.multiButtonContainer,{justifyContent:'space-between',flexDirection:'column', position: 'relative',height:140}]}
 leftButtonContainer= {[Helpers.buttonContainer,{width:'98%',borderRadius:13,}]}
 rightButtonContainer={[Helpers.buttonContainer,Helpers.buttonContainerWithoutBackground,{width:'98%',marginBottom:15}]}



 leftButtonTextStyle= {[Helpers.btnText,{ fontWeight:"bold",fontSize:14}]}
 leftButtonText={this.props.selectedMessage["EditFacProfile-SaveChanges"]}   
 rightButtonTextStyle={[Helpers.btnText,Helpers.buttonTextWithoutBackgroundContainer]}

 rightButtonText={this.props.selectedMessage["EditFacProfile-Cancel"]}    
 onLeftPress={this._onLeftPressButton.bind(this)}
 onRightPress={this._onSignUpPressButton.bind(this)}
></CustomMultiButtons> */}

          <View style={[Helpers.bottomView, { position: 'relative', marginBottom: '8%' }]}>
            <TouchableOpacity
              style={[
                Helpers.btn,
                {
                  backgroundColor: !this.isFormValid()
                    ? '#C2CEDB'
                    : Colors.patientColor,
                  width: '98%',
                },
              ]}
              onPress={
                !this.isFormValid() ? null : this._onLeftPressButton.bind(this)
              }
            //  onPress={this._onPressButton.bind(this)}
            >
              <Text
                style={[
                  Helpers.btnText,
                  Helpers.mediumFont,
                  { color: Colors.white, fontSize: 18 },
                ]}>
                {this.props.selectedMessage['EditFacProfile-SaveChanges']}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView >
      // </TouchableWithoutFeedback>
    );
  }
}

EditPatientInfo.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  resetAuthenticateStates: PropTypes.func,
  updateUserDetail: PropTypes.func,
  resetUpdateUserDetail: PropTypes.func,
  updateUserDetailErroressage: PropTypes.string,
  updateUserDetailSuccessMessage: PropTypes.string,
  selectedMessage: PropTypes.any,
  updateLanguage: PropTypes.func,

  getEthnicityList: PropTypes.func,
  getRaceList: PropTypes.func,
  getParticipationType: PropTypes.func,
  getGenderList: PropTypes.func,

  ethincityList: PropTypes.array,
  ethincityListErrorMessage: PropTypes.string,

  raceList: PropTypes.array,
  raceListErrorMessage: PropTypes.string,
  genderList: PropTypes.array,
  genderListErrorMessage: PropTypes.string,

  participationTypeList: PropTypes.array,
  participationTypeErrorMessage: PropTypes.string,

  locale: PropTypes.any,

  cityList: PropTypes.array,
  stateList: PropTypes.array,
  cityStateByZipCodeErrorMessage: PropTypes.string,
  cityStateByZipCodeResponse: PropTypes.any,
  getCityStateByZipCode: PropTypes.func,
  extractedCityState: PropTypes.any,
  resetStateCity: PropTypes.func,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  updateUserDetailErroressage: state.authenticate.updateUserDetailErroressage,
  updateUserDetailSuccessMessage:
    state.authenticate.updateUserDetailSuccessMessage,
  selectedMessage: state.startup.selectedMessage,

  ethnicityList: state.authenticate.ethnicityList,
  ethnicityListErrorMessage: state.authenticate.ethnicityListErrorMessage,

  raceList: state.authenticate.raceList,
  raceListErrorMessage: state.authenticate.raceListErrorMessage,

  genderList: state.authenticate.genderList,
  genderListErrorMessage: state.authenticate.genderListErrorMessage,

  participationTypeList: state.authenticate.participationTypeList,
  participationTypeErrorMessage:
    state.authenticate.participationTypeErrorMessage,

  locale: state.startup.locale,

  cityList: state.authenticate.cityList,
  stateList: state.authenticate.stateList,
  cityStateByZipCodeResponse: state.authenticate.cityStateByZipCodeResponse,
  extractedCityState: ExtractCityState(
    state.authenticate.cityStateByZipCodeResponse,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
  updateUserDetail: (data) =>
    dispatch(AuthenticateActions.updateUserDetail(data)),
  resetUpdateUserDetail: () =>
    dispatch(AuthenticateActions.resetUpdateUserDetail()),
  updateLanguage: (data) => dispatch(StartupActions.updateLanguage(data)),
  getEthnicityList: () => dispatch(AuthenticateActions.getEthnicityList()),
  getRaceList: () => dispatch(AuthenticateActions.getRaceList()),
  getGenderList: () => dispatch(AuthenticateActions.getGenderList()),
  getParticipationType: () =>
    dispatch(AuthenticateActions.getParticipationType()),

  getCityStateByZipCode: (data) =>
    dispatch(AuthenticateActions.getCityStateByZipCode(data)),
  resetStateCity: () => dispatch(AuthenticateActions.resetStateCity()),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditPatientInfo);
