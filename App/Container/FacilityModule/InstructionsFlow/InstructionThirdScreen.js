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
class InstructionThirdScreen extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  _onPressButton() {
  }
  _OnPressRightSideIcon() {
  }
  _onBackButtonPress() {
    NavigationService.navigate('InstructionSecondScreen');
  }
  _onThitrdStepPressButton() {
    NavigationService.navigate('InstructionForthScreen');
  }

  render() {
    return (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: 'white' }]}>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              style={[Helpers.mainlogoImg]}
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
              {this.props.selectedMessage['InstructionSecondScreen-Page']} 2 of
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
              progressCount={45}
              rightColor={Colors.patientColor}
              leftColor={'#FBFBFB'}
            />
          </View>
          <Text
            style={[
              Helpers.bold,
              { fontSize: 28, textAlign: 'left', marginLeft: 15, marginVertical: 10, color: Colors.facilityColor },
            ]}>
            {
              this.props.selectedMessage[
              'InstructionThirdScreen-Instructions'
              ]
            }{' '}</Text>

          <View
            style={[Helpers.instructionScreenHeadingContainer]}>
            <Text
              style={[
                Helpers.bold, Helpers.instructionsScreenMainHeading
              ]}>
              {
                this.props.selectedMessage[
                'InstructionThirdScreen-SpecimentCollection'
                ]
              }{' '}
            </Text>
          </View>
          <View style={Helpers.instructionStepsmainContainer}>
            <View style={styles.textContainerStyle}>
              <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>1.</Text>
              <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
                {
                  this.props.selectedMessage[
                  'InstructionThirdScreen-SpecimentCollection1'
                  ]
                }</Text>
            </View>
            <View style={styles.imgContainerStyle}>
              <SvgXml xml={Images.handWashImg} width="100%" height="100%" />
            </View>
          </View>
          <View style={Helpers.instructionStepsmainContainer}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>2.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
              {
                this.props.selectedMessage[
                'InstructionThirdScreen-SpecimentCollection2'
                ]
              }</Text>
          </View>
          <View style={Helpers.instructionStepsmainContainer}>
            <View style={styles.textContainerStyle}>
              <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>3.</Text>
              <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
                {
                  this.props.selectedMessage[
                  'InstructionThirdScreen-SpecimentCollection3'
                  ]
                }</Text>
            </View>
            <View style={styles.imgContainerStyle}>
              <SvgXml xml={Images.sampleTubeImg} width="100%" height="100%" />
            </View>
          </View>

          <View style={[Helpers.instructionStepsmainContainer]}>
            <View style={[styles.textContainerStyle, { flexDirection: 'column' }]}>
              <View style={[Helpers.row]}>
                <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>4.</Text>
                <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
                  {
                    this.props.selectedMessage[
                    'InstructionThirdScreen-SpecimentCollection4'
                    ]
                  }</Text>
              </View>
              <View style={[Helpers.row]}>
                <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>5.</Text>
                <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
                  {
                    this.props.selectedMessage[
                    'InstructionThirdScreen-SpecimentCollection5'
                    ]
                  }</Text>
              </View>
            </View>

            <View style={styles.imgContainerStyle}>
              <SvgXml xml={Images.sampleTubewithThumb} width="100%" height="100%" />
            </View>
          </View>

          <View style={[Helpers.instructionStepsmainContainer, { marginTop: 20, marginBottom: -50 }]}>
            <SvgXml xml={Images.swabPackageImg} width="100%" height='100%' style={[styles.swabpackageStyle, { marginBottom: 90 }]} />
          </View>
          <View style={[Helpers.instructionStepsmainContainer]}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>6.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt, { marginBottom: 0 }]}>
              {
                this.props.selectedMessage[
                'InstructionThirdScreen-SpecimentCollection6'
                ]
              }</Text>
          </View>
          <View style={[Helpers.instructionStepsmainContainer]}>
            <Text style={[Helpers.bold, Helpers.instructionStepsTxt, { marginTop: 6, marginLeft: 25 }]}>
              {
                this.props.selectedMessage[
                'InstructionThirdScreen-SpecimentCollection6Note'
                ]
              }
            </Text>
          </View>
          <View style={[Helpers.instructionStepsmainContainer]}>
            <SvgXml xml={Images.testPerformImg} width="100%" height='100%' style={[styles.swabpackageStyle, { marginBottom: 40 }]} />
          </View>
          <View style={[Helpers.instructionStepsmainContainer, { marginTop: 10, marginBottom: 8 }]}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>7.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt]}>
              {
                this.props.selectedMessage[
                'InstructionThirdScreen-SpecimentCollection7'
                ]
              }</Text>
          </View>
          <View style={[Helpers.instructionStepsmainContainer, { marginBottom: -20 }]}>
            <SvgXml xml={this.props.locale == LanguageEnum.English ? Images.nostrilImg : Images.nostrilSpanishImg} width="100%" height='100%' style={[styles.swabpackageStyle, { marginBottom: 100 }]} />
          </View>
          <View style={[Helpers.instructionStepsmainContainer]}>
            <Text style={[Helpers.mediumFont, Helpers.numberCountTxt]}>8.</Text>
            <Text style={[Helpers.mediumFont, Helpers.instructionStepsTxt, { marginBottom: 0 }]}>
              {
                this.props.selectedMessage[
                'InstructionThirdScreen-SpecimentCollection8'
                ]
              }</Text>
          </View>
          <View style={[Helpers.instructionStepsmainContainer]}>
            <Text style={[Helpers.bold, Helpers.instructionStepsTxt, { marginTop: 4, marginLeft: 25 }]}>
              {
                this.props.selectedMessage[
                'InstructionThirdScreen-SpecimentCollection8Note'
                ]
              }
            </Text>
          </View>
          {this.props.locale != LanguageEnum.English &&
            <View style={styles.boxContainer}>
              <Text style={[Helpers.mediumFont, styles.addtionDetailTxt]}>
                {
                  this.props.selectedMessage[
                  'InstructionThirdScreen-SpecimentCollectionAdditonalDetails'
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
            '3'
          }
          onLeftPress={this._onBackButtonPress.bind(this)}
          onRightPress={this._onThitrdStepPressButton.bind(
            this,
          )}></CustomMultiButtons>
      </SafeAreaView >
    );
  }
}

InstructionThirdScreen.propTypes = {
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
  instructionStepsTxt: {
    marginVertical: 10,
    fontSize: 15,
    color: Colors.Black,
    textAlign: 'left',
    width: '93%',
  },
  numberCountTxt: {
    marginVertical: 10,
    fontSize: 15,
    color: Colors.Black,
    textAlign: 'left',
    marginRight: 10
  },
  instructionStepsmainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15
  },
  textContainerStyle: {
    flex: 8, flexDirection: 'row', marginTop: 10
  },
  imgContainerStyle: {
    flex: 4, alignItems: 'flex-start'
  },
  swabpackageStyle: {
    marginBottom: 20, marginTop: 40, alignSelf: 'center'
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
    fontSize: 14,
    color: Colors.Black,
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstructionThirdScreen);
