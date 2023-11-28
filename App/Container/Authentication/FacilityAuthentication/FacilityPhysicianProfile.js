import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import { Helpers, Colors, Images } from 'App/Theme';
import { LanguageEnum } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';

import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import NavigationService from 'App/Services/NavigationService';
import { TextInputMask } from 'react-native-masked-text';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';

class FacilityPhysicianProfile extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      Message: '',
      imgchecked: false,

      inputs: {
        physicianName: {
          type: 'physicianName',
          value: '',
        },
        phoneNumber: {
          type: 'phone',
          value: '',
        },
        npi: {
          type: 'npi',
          value: '',
        },
      },
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
  }

  _CloseAlert() {
    this.setState({ IsMessageShow: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.registrationErrorMessage != null &&
      prevProps.registrationErrorMessage != this.props.registrationErrorMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.registrationErrorMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message });
    }
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  _onBackButtonPress() {
    NavigationService.popScreen();
  }
  _onSignUpPressButton() {
    this.props.resetAuthenticateStates();

    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      return;
    }

    const { inputs } = this.state;

    let { buildProfilePayload } = this.props;
    let phoneNumber = inputs['phoneNumber'].value
      .replace(/\s/g, '')
      .replace(/-/g, '')
      .replace(/\(|\)/g, '');
    let payload = {
      ...buildProfilePayload,
      PhysicianName: inputs['physicianName'].value.trim(),
      PhysicianPhoneNo: phoneNumber,
      NPINo: inputs['npi'].value,
      LanguageId: LanguageEnum['LanguageValue-' + this.props.locale],
    };
    // alert(JSON.stringify(payload))
    console.log('=============Langauge', this.props.locale)

    this.props.saveRegistration(payload);
  }
  _HideBottom() {
  }

  onClickListenergocheck() {
    let { imgchecked } = this.state;
    this.setState({ imgchecked: !imgchecked });
  }
  _goBackscreen() {
    NavigationService.popScreen();
  }
  renderPhysicianProfile() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView overScrollMode="auto" showsVerticalScrollIndicator={false}>
          <HeaderProgress
            rowStyle={[
              ,
              {
                height: 70,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              },
            ]}
            progressStyle={[Helpers.headerLeftRow]}
            progressCount={95}
            rightColor={Colors.facilityColor}
            leftColor={'#FBFBFB'}
          />

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text
              style={[Helpers.BoldTexttitle, Helpers.bold, { marginBottom: 15 }]}>
              {this.props.selectedMessage['AddOnsitePhysician-OnsitePhysician']}
            </Text>

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, ,
                this.state.inputs['physicianName'].touched
                  ? this.renderError('physicianName')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={
                this.props.selectedMessage['AddOnsitePhysician-PhysicianName']
              }
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) =>
                this.onInputChange({ id: 'physicianName', value })
              }
              value={this.state.inputs.physicianName.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              maxLength={20}
              hasRightIcon={true}
              rightIcon={
                this.state.inputs['physicianName'].touched
                  ? this.renderError('physicianName')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }
            />
            <View
              style={[
                Helpers.txtRoundInputContainer, ,
                { marginTop: 10 },
                this.state.inputs['phoneNumber'].touched
                  ? this.renderError('phoneNumber')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
              ]}>
              <TextInputMask
                placeholder={
                  this.props.selectedMessage['AddOnsitePhysician-PhoneNumber']
                }
                placeholderTextColor={Colors.placeholderGraycolor}
                style={[
                  Helpers.txtRoundInputs,
                  Helpers.fill,
                  { color: Colors.facilityColor },
                ]}
                type={'custom'}
                options={{
                  mask: '+99 999 999-9999',
                }}
                maxLength={14}
                keyboardType="phone-pad"
                returnKeyType="done"
                value={this.state.inputs.phoneNumber.value}
                onChangeText={(value) =>
                  this.onInputChange({ id: 'phoneNumber', value })
                }
              />

              {this.state.inputs['phoneNumber'].touched ? (
                this.renderError('phoneNumber') ? (
                  <Image
                    style={[Helpers.rightIconStyle]}
                    resizeMode="contain"
                    source={Images.InValid}
                  />
                ) : (
                  <Image
                    style={[Helpers.rightIconStyle]}
                    resizeMode="contain"
                    source={Images.ValidGreen}
                  />
                )
              ) : null}
            </View>

            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer, ,
                this.state.inputs['npi'].touched
                  ? this.renderError('npi')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.facilityColor }
                  : { borderColor: Colors.GreyColor }
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.facilityColor },
              ]}
              placeholder={'NPI #'}
              placeholderTextColor={Colors.placeholderGraycolor}
              onChangeText={(value) => this.onInputChange({ id: 'npi', value })}
              value={this.state.inputs.npi.value}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              rightIconStyle={[Helpers.rightIconStyle]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { color: Colors.facilityColor },
              ]}
              hasEvent={false}
              maxLength={10}
              keyboardType="phone-pad"
              returnKeyType="done"
              hasRightIcon={true}
              OnFocus={this._HideBottom.bind(this)}
              rightIcon={
                this.state.inputs['npi'].touched
                  ? this.renderError('npi')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }
            />

            <View style={{ flexDirection: 'row', marginLeft: 7, marginTop: 25 }}>
              <TouchableOpacity
                onPress={this.onClickListenergocheck.bind(this)}>
                {this.state.imgchecked ? (
                  <Image
                    style={Helpers.iconsmall}
                    resizeMode="contain"
                    source={Images.GreenAccept}
                  />
                ) : (
                  <Image
                    style={Helpers.iconsmall}
                    resizeMode="contain"
                    source={Images.greenuncheck}
                  />
                )}
              </TouchableOpacity>
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={
                    ({
                      fontSize: 14,
                      textDecorationLine: 'underline',
                      marginLeft: 17,
                      color: Colors.Black,
                    },
                      Helpers.mediumFont)
                  }>
                  {
                    this.props.selectedMessage[
                    'FacilityPhysicianProfileScreen-SelectPrimaryPhysician'
                    ]
                  }
                </Text>
              </View>
            </View>
          </View>
          <View style={{ height: 100 }}></View>
        </ScrollView>

        <View style={Helpers.bottomView}>
          <View style={[Helpers.btnContainer, { bottom: 0 }]}>
            <TouchableOpacity
              style={[
                Helpers.btn,
                {
                  backgroundColor:
                    (this.state.inputs.phoneNumber.value &&
                      this.state.inputs.npi.value &&
                      this.state.inputs.physicianName.value) == ''
                      ? Colors.DisableGrayColor
                      : Colors.facilityColor,
                  width: '95%',
                },
              ]}
              onPress={
                (this.state.inputs.phoneNumber.value &&
                  this.state.inputs.physicianName.value &&
                  this.state.inputs.npi.value) == ''
                  ? null
                  : this._onSignUpPressButton.bind(this)
              }>
              <Text
                style={[Helpers.btnText, { color: Colors.white, fontSize: 17 }]}>
                {
                  this.props.selectedMessage[
                  'TestingSiteListScreen-CompleteEnrollment'
                  ]
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={40}
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            {this.renderPhysicianProfile()}
          </KeyboardAvoidingView>
        ) : (
          <View
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            {this.renderPhysicianProfile()}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

FacilityPhysicianProfile.propTypes = {
  authenticatedIsLoading: PropTypes.bool,

  registrationErrorMessage: PropTypes.string,
  registrationSuccessMessage: PropTypes.string,

  buildProfilePayload: PropTypes.any,

  saveRegistration: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  registrationSuccessMessage: state.authenticate.registrationSuccessMessage,
  registrationErrorMessage: state.authenticate.registrationErrorMessage,
  buildProfilePayload: state.authenticate.buildProfilePayload,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});
// getting methods from actions
// 'AuthenticateActions' we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  saveRegistration: (data) =>
    dispatch(AuthenticateActions.saveRegistration(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityPhysicianProfile);
