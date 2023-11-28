import React from 'react';
import { Text, View, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Colors, ApplicationStyles, Images, Helpers } from 'App/Theme';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import HeaderProgress from 'App/Components/HeaderProgress';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import { SvgXml } from 'react-native-svg';
import { LanguageEnum } from 'App/Enums';
class InstructionForthScreen extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  _onPressButton() {
  }
  _OnPressRightSideIcon() { }
  _onBackButtonPress() {
    NavigationService.navigate('InstructionThirdScreen');
  }
  _onFourthStepPressButton() {
    NavigationService.navigate('InstructionFifthScreen');
  }

  render() {
    return (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: 'white' }]}>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              style={{ height: 80, width: 80 }}
              resizeMode="contain"
              source={Images.MainLogo}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text
              style={[
                Helpers.bold,
                {
                  fontSize: 15,
                  color: Colors.patientColor,
                  textAlign: 'center',
                  width: '90%',
                },
              ]}>
              {this.props.selectedMessage['InstructionSecondScreen-Page']} 3 of
              4
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '90%',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <HeaderProgress
              rowStyle={[
                ApplicationStyles.header,
                {
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingBottom: 0,
                },
              ]}
              progressStyle={[Helpers.headerLeftRow]}
              progressCount={65}
              rightColor={Colors.patientColor}
              leftColor={'#FBFBFB'}
            />
          </View>

          <View style={[Helpers.instructionScreenHeadingContainer, { marginVertical: 10 }]}>
            <Text style={[
              Helpers.bold, Helpers.instructionsScreenMainHeading
            ]}>
              {
                this.props.selectedMessage['InstructionFourthScreen-Testing']
              }{' '}
            </Text>
          </View>
          <View style={Helpers.instructionStepsmainContainer}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>1.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
              {
                this.props.selectedMessage[
                'InstructionFourthScreen-TestingRole1'
                ]
              }</Text>
          </View>
          <View style={Helpers.instructionStepsmainContainer}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>2.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
              {
                this.props.selectedMessage[
                'InstructionFourthScreen-TestingRole2'
                ]
              }</Text>
          </View>
          <View style={Helpers.instructionStepsmainContainer}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>3.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
              {
                this.props.selectedMessage[
                'InstructionFourthScreen-TestingRole3'
                ]
              }</Text>
          </View>
          <View style={[Helpers.instructionStepsmainContainer]}>
            <SvgXml xml={this.props.locale == LanguageEnum.English ? Images.testingMechanism : Images.spanishTestingMechanism} width="100%" height='100%' style={{ marginBottom: 180 }} />
          </View>
          <View style={[Helpers.instructionStepsmainContainer, { marginTop: -40 }]}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>4.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
              {
                this.props.selectedMessage[
                'InstructionFourthScreen-TestingRole4'
                ]
              }</Text>
          </View>
          <View style={Helpers.instructionStepsmainContainer}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>5.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
              {
                this.props.selectedMessage[
                'InstructionFourthScreen-TestingRole5'
                ]
              }</Text>
          </View>
          <View style={Helpers.instructionStepsmainContainer}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>6.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
              {
                this.props.selectedMessage[
                'InstructionFourthScreen-TestingRole6'
                ]
              }</Text>
          </View>
          <View style={Helpers.instructionStepsmainContainer}>
            <View style={styles.textContainerStyle}>
              <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>7.</Text>
              <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
                {
                  this.props.selectedMessage[
                  'InstructionFourthScreen-TestingRole7'
                  ]
                }</Text>
            </View>
            <View style={styles.imgContainerStyle}>
              <SvgXml xml={this.props.locale == LanguageEnum.English ? Images.liquidDropper : Images.liquidDropperInSpanish} width="100%" height="100%" />
            </View>
          </View>
          <View style={Helpers.instructionStepsmainContainer}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>8.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
              {
                this.props.selectedMessage[
                'InstructionFourthScreen-TestingRole8'
                ]
              }</Text>
          </View>
          <View style={[Helpers.instructionStepsmainContainer]}>
            <View style={[styles.timerTxtContinerStyle]}>
              <View style={[Helpers.row]}>
                <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>9.</Text>
                <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
                  {
                    this.props.selectedMessage[
                    'InstructionFourthScreen-TestingRole9'
                    ]
                  }</Text>
              </View>
              <View style={[Helpers.row]}>
                <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>10.</Text>
                <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
                  {
                    this.props.selectedMessage[
                    'InstructionFourthScreen-TestingRole10(1)'
                    ]
                  }
                  <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt, { color: 'red' }]}>
                    {
                      this.props.selectedMessage[
                      'InstructionFourthScreen-TestingRole10(2)'
                      ]
                    }
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.imgContainerStyle}>
              {this.props.locale == LanguageEnum.English ?
                <SvgXml xml={Images.watchTimer} width="100%" height="75%" /> :
                <Image source={Images.mexicanTimer}
                  style={styles.timerImgStyle} />
              }
            </View>
          </View>
          {this.props.locale != LanguageEnum.English &&
            <View style={styles.boxContainer}>
              <Text style={[Helpers.mediumFont, styles.addtionDetailTxt]}>
                {
                  this.props.selectedMessage[
                  'InstructionFourthScreen-TestingRoleAdditonalDetails'
                  ]
                }
              </Text>
            </View>
          }
        </ScrollView>

        <CustomMultiButtons
          mutliButtonContainer={[
            Helpers.bottomView,
            Helpers.multiButtonContainer,
            { justifyContent: 'space-between', position: 'relative' },
          ]}
          leftButtonContainer={[
            Helpers.buttonContainer,
            Helpers.buttonContainerWithoutBackground,
            { marginLeft: 15, borderColor: Colors.patientColor },
          ]}
          rightButtonContainer={[
            Helpers.buttonContainer,
            { width: '40%', borderRadius: 13, marginRight: 15 },
          ]}
          leftButtonTextStyle={[
            Helpers.btnText,
            Helpers.buttonTextWithoutBackgroundContainer,
            { color: Colors.patientColor },
          ]}
          rightButtonTextStyle={[
            Helpers.btnText,
            { fontWeight: 'bold', fontSize: 14 },
          ]}
          leftButtonText={
            this.props.selectedMessage['InstructionThirdScreen-GoBack']
          }
          rightButtonText={
            this.props.selectedMessage['InstructionSecondScreen-GoToStep'] +
            ' ' +
            '4'
          }
          onLeftPress={this._onBackButtonPress.bind(this)}
          onRightPress={this._onFourthStepPressButton.bind(
            this,
          )}></CustomMultiButtons>
      </SafeAreaView>
    );
  }
}

InstructionForthScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) =>
    dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
});
const styles = StyleSheet.create({
  textContainerStyle: {
    flex: 6, flexDirection: 'row', marginTop: 10
  },
  imgContainerStyle: {
    flex: 5, alignItems: 'flex-end', paddingBottom: 50
  },
  timerTxtContinerStyle: {
    flex: 6, flexDirection: 'column', marginTop: 10

  },
  timerImgConatinerStyle: {
    flex: 4, alignSelf: 'flex-end'

  },
  boxContainer: {
    borderColor: Colors.facilityColor,
    borderWidth: 2.2,
    marginHorizontal: 15,
    marginBottom: 6
  },
  addtionDetailTxt: {
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 10,
    fontSize: 14,
    color: Colors.Black,
  },
  timerImgStyle: {
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  }

})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstructionForthScreen);
