import React from 'react';
import { Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers, ApplicationStyles, Metrics } from 'App/Theme';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import NavigationService from 'App/Services/NavigationService';
import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import StartupActions from 'App/Stores/Startup/Actions';
import { LanguageEnum } from 'App/Enums';

class launchingScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        language: {
          type: 'cities',
          value: '',
        },
      },

      currentLocale: this.props.locale,
      selectedValue: LanguageEnum['LanguageValue-' + this.props.locale],
      popUpIsSelected: false,
      SelectedLable: LanguageEnum['LanguageLable-' + this.props.locale],

      LanguageList: [
        {
          LanguageId: 1,
          // Name: 'English',
          // SpanishText: 'Ingles',
          en: 'English',
          sp: 'Ingles',
          pr: 'Inglês',
          Locale: 'en',
        },
        {
          LanguageId: 2,
          // Name: 'Spanish',
          // SpanishText: 'Español',
          // PR: 'Espanhol',

          en: 'Spanish',
          sp: 'Español',
          pr: 'Espanhol',

          Locale: 'sp',
        },
        // {
        //   LanguageId: 3,
        //   // Name: 'Portuguese',
        //   // SpanishText: 'Portugués',
        //   // PR: 'Português',

        //   // en: 'Portuguese',
        //   sp: 'Portugués',
        //   pr: 'Português',

        //   Locale: 'pr',
        // },
      ],
    };
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  findLanguageById(Locale) {
    let selectedLanguage = this.state.LanguageList.filter((d) => {
      return d.Locale === Locale;
    });

    return selectedLanguage;
  }

  popUpListItemOnChange = (selectedValue) => {
    this.props.updateLanguage(selectedValue.Locale);
    let { popUpIsSelected } = this.state;

    this.setState({
      selectedValue: selectedValue.LanguageId,
      SelectedLable: selectedValue[selectedValue.Locale],
      popUpIsSelected: false,
      currentLocale: selectedValue.Locale,
    });
  };

  _onLoginPressButton() {
    this.props.updateLanguage(this.state.currentLocale);
    NavigationService.navigate('LoginWithPhoneOREmail', { isFromLogin: true });
  }

  _onSignUpPressButton() {
    this.props.updateLanguage(this.state.currentLocale);
    // NavigationService.navigate('AccountTypeScreen');
    NavigationService.navigate('UserLicense')
  }

  render() {
    return (
      <View style={[Helpers.fillCenterMain, { backgroundColor: 'white' }]}>
        <SafeAreaView style={Helpers.fill}>
          <View
            style={[
              {
                backgroundColor: 'transparent',
                height: 50,
                marginTop: 50,
                marginHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              },
            ]}>
            <View style={{ width: 160 }}>
              <CustomDDLPopUp
                // add Condition
                ddlContainerStyle={[
                  Helpers.buttonContainer,
                  Metrics.smallVerticalMargin,
                  this.state.inputs['language'].touched
                    ? this.renderError('language')
                      ? {
                        borderColor: 'red',
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                      }
                      : this.state.selectedValue
                        ? {}
                        : {
                          backgroundColor: 'transparent',
                          borderColor: Colors.patientColor,
                          borderWidth: 0.8,
                        }
                    : this.state.selectedValue
                      ? {}
                      : {
                        backgroundColor: 'transparent',
                        borderColor: Colors.patientColor,
                        borderWidth: 0.8,
                      },
                ]}
                // add Condition
                ddlLableStyle={[
                  { width: '70%', paddingLeft: 16 },
                  {
                    color: this.state.selectedValue
                      ? 'white'
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
                popUpSelectedLable={'Lang: ' + this.state.SelectedLable}
                popUpKey={'LanguageId'}
                popUpListItemOnChange={this.popUpListItemOnChange.bind(this)}
                leftIcon={
                  this.state.selectedValue ? Images.DDLWhite : Images.DDLPurple
                }
                openPopUp={true}
                ddlListText={this.props.locale}></CustomDDLPopUp>
            </View>
          </View>
          <View style={ApplicationStyles.pageContainer}>
            <View style={ApplicationStyles.body}>
              <View style={[ApplicationStyles.formConatiner, Helpers.center]}>
                <View style={[ApplicationStyles.loginFormControl]}>
                  <View>
                    <Image
                      style={Helpers.Mainlogo}
                      resizeMode="contain"
                      source={Images.MainLogo}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
        <View
          style={{
            bottom: 0,
            height: 200,
            marginBottom: 15,
            width: '100%',
            backgroundColor: 'transparent',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View style={[Helpers.btnContainer, { marginBottom: 15 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#614698', '#614698', '#614698']}
              style={[Helpers.bigBtnGradient]}>
              <TouchableOpacity
                style={Helpers.btn}
                onPress={this._onLoginPressButton.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.white, fontSize: 15 },
                  ]}>
                  {this.props.selectedMessage['Launch-Login']}{' '}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={[Helpers.btnContainer, { marginBottom: 8 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
              style={[
                Helpers.bigBtnGradient,
                { borderWidth: 1, borderColor: Colors.patientColor },
              ]}>
              <TouchableOpacity
                style={Helpers.btn}
                onPress={this._onSignUpPressButton.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.patientColor, fontSize: 15 },
                  ]}>
                  {this.props.selectedMessage['Launch-CreateNewAccount']}{' '}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    );
  }
}

launchingScreen.propTypes = {
  selectedMessage: PropTypes.any,
  updateLanguage: PropTypes.func,
  locale: PropTypes.any,
};

// getting states from reducers
const mapStateToProps = (state) => ({
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});

// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  updateLanguage: (data) => dispatch(StartupActions.updateLanguage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(launchingScreen);
