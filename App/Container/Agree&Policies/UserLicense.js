import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Fonts,
  Images,
  Helpers,
} from 'App/Theme';
import CustomHeader from 'App/Components/CustomHeader';
import ButtonWithTextandImage from 'App/Components/ButtonWithTextandImage';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import { Enums } from 'App/Enums';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';

class UserLicense extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      thirdimgchecked: false,
      secimgchecked: false,
      imgchecked: false,
      IsMessageShow: false,
      Message: '',
    };
  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
  }

  _OnClickCrossButton() {
    // NavigationService.navigate('AccountTypeScreen');
    this.props.navigation.goBack();
  }

  _BackGo() {
    const { secimgchecked, imgchecked } = this.state;
    if (!imgchecked || !secimgchecked) {
      this.setState({
        IsMessageShow: true,
        Message: this.props.selectedMessage[
          'ProfileSetting-PrivacyAlertMessage'
        ],
      });
    } else {
      NavigationService.navigate('LoginWithPhoneOREmail');
    }
  }
  onClickListenergocheck() {
    let { imgchecked } = this.state;
    this.setState({ imgchecked: !imgchecked });
  }
  onClickSecListenergocheck() {
    let { secimgchecked } = this.state;
    this.setState({ secimgchecked: !secimgchecked });
  }
  onClickThirdListenergocheck() {
    let { thirdimgchecked } = this.state;
    this.setState({ thirdimgchecked: !thirdimgchecked });
  }

  _openinWebterms() {
    let link = this.props.selectedMessage['TermsCondtions-URL'];

    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
      }
    });
  }
  _ClosePopup() {
    this.setState({ IsMessageShow: false });
  }

  render() {
    const IsFacility = this.props.accountType == Enums.Facility;

    return (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: Colors.white }]}>
        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsMessageShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsMessageShow}
          PopUpContainerStyle={{
            backgroundColor: IsFacility
              ? Colors.facilityColor
              : Colors.patientColor,
            alignItems: 'center',
          }}
          HeaderTitle=""
          HeadTitleColor="#FFFFFF"
          SingleButtonText={this.props.selectedMessage['Register-Close']}
          SigleButtonBackground="#FFFFFF"
          MessageColor="#FFFFFF"
          SingleButtonTextColor={
            IsFacility ? Colors.facilityColor : Colors.patientColor
          }
          leftbuttonbordercolor="#FFFFFF"
          leftbuttontextcolor="#FFFFFF"
          rightbuttontextcolor={
            IsFacility ? Colors.facilityColor : Colors.patientColor
          }
          Rightbuttonbackgroundcolor="#FFFFFF"
          AlertMessageTitle={this.state.Message}
          _onRightButtonPress={this._ClosePopup.bind(this)}
          hasSingleButton={true}
        />

        <CustomHeader
          HeaderColor={{ backgroundColor: 'transparent' }}
          CenterTitleColor={Colors.patientColor}
          onPressBackButton={this._OnClickCrossButton.bind(this)}
          HeaderTitle={
            this.props.selectedMessage['EULA-EndUserLicenceAgreement']
          }
          LeftImage={Images.PurPleBackIcon}
        />
        <ScrollView>
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 20,
                marginLeft: 20,
                textAlign: 'left',
                marginTop: 10,
                color: '#152C52',
                width: '80%',
              },
            ]}>
            {this.props.selectedMessage['EULA-PleaseReviewOur']} “{' '}
            {this.props.selectedMessage['EULA-EndUserLicenceAgreement']} ”
          </Text>

          <Text
            style={[
              Helpers.book,
              {
                fontSize: 14,
                marginLeft: 20,
                textAlign: 'left',
                marginTop: 10,
                color: '#8492A6',
                width: '80%',
              },
            ]}>
            {this.props.selectedMessage['EULA-TapOnEachBoxBelow']}
          </Text>

          <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 50 }}>
            <TouchableOpacity onPress={this.onClickListenergocheck.bind(this)}>
              {this.state.imgchecked ? (
                <Image
                  style={Helpers.iconsmall}
                  resizeMode="contain"
                  source={IsFacility ? Images.GreenAccept : Images.PurpleAccept}
                />
              ) : (
                <Image
                  style={Helpers.iconsmall}
                  resizeMode="contain"
                  source={
                    IsFacility ? Images.greenuncheck : Images.purpleuncheck
                  }
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                Linking.openURL(this.props.selectedMessage['TermsCondtions-URL']);
              }}>
              <Text
                style={[
                  Helpers.btnText,
                  Helpers.bold,
                  {
                    color: IsFacility
                      ? Colors.facilityColor
                      : Colors.patientColor,
                    fontSize: Fonts.regular16,
                  },
                ]}>
                {this.props.selectedMessage['ProfileSetting-TermsOfUse']}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 25 }}>
            <TouchableOpacity
              onPress={this.onClickSecListenergocheck.bind(this)}>
              {this.state.secimgchecked ? (
                <Image
                  style={Helpers.iconsmall}
                  resizeMode="contain"
                  source={IsFacility ? Images.GreenAccept : Images.PurpleAccept}
                />
              ) : (
                <Image
                  style={Helpers.iconsmall}
                  resizeMode="contain"
                  source={
                    IsFacility ? Images.greenuncheck : Images.purpleuncheck
                  }
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                Linking.openURL(this.props.selectedMessage['Privacy-URL']);
              }}>

              <Text
                style={[
                  Helpers.btnText,
                  Helpers.bold,
                  {
                    color: IsFacility
                      ? Colors.facilityColor
                      : Colors.patientColor,
                    fontSize: Fonts.regular16,
                  },
                ]}>
                {this.props.selectedMessage['ProfileSetting-PrivacyPolicy']}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <ButtonWithTextandImage
          onPressBackButton={this._BackGo.bind(this)}
          ButtonText={this.props.selectedMessage['EULA-AgreeAndContinue']}
          ButtonImage={Images.ForwordIcon}
          BackGroundColor={IsFacility ? Colors.facilityColor : Colors.patientColor}
        />
      </SafeAreaView>
    );
  }
}

UserLicense.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  accountType: PropTypes.any,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  accountType: state.authenticate.accountType,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) =>
    dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLicense);

const styles = StyleSheet.create({});
