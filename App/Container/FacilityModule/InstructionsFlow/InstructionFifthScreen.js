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
class InstructionFifthScreen extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  _onPressButton() {
  }
  _OnPressRightSideIcon() { }
  _onBackButtonPress() {
    NavigationService.navigate('InstructionForthScreen');
  }
  _onFourthStepPressButton() {
    NavigationService.navigate('LastStepScreen');
  }

  applyBoldStyle = (text) => {
    let numberOfItemsAdded = 0;
    const result = text?.resultText?.split(text?.boldText);
    text?.boldText.forEach((boldText, i) => result?.splice(++numberOfItemsAdded + i, 0, < Text style={[Helpers.bold, { textDecorationLine: 'underline' }]} > {boldText}</Text >));
    return <Text style={[Helpers.mediumFont, styles.descriptionTxt]}>{result}</Text>;
  };

  render() {
    const negativeResultText = {
      resultText: this.props.selectedMessage['TestResult-NegativeDescription'],
      boldText: [this.props.selectedMessage['TestResult-NegativeDescriptionBoldText']]
    };
    const positiveResultText = {
      resultText: this.props.selectedMessage['TestResult-PositiveDescription'],
      boldText: [this.props.selectedMessage['TestResult-PositiveDescriptionBoldText']]
    }
    const invalidResultText = {
      resultText: this.props.selectedMessage['TestResult-InvalidDescription'],
      boldText: [this.props.selectedMessage['TestResult-InvalidDescriptionBoldText']]
    }
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
              {this.props.selectedMessage['InstructionSecondScreen-Page']} 4 of
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
              progressCount={100}
              rightColor={Colors.patientColor}
              leftColor={'#FBFBFB'}
            />
          </View>
          <View style={[Helpers.instructionScreenHeadingContainer, { marginVertical: 10 }]}>
            <Text style={[
              Helpers.bold, Helpers.instructionsScreenMainHeading
            ]}>
              {
                this.props.selectedMessage['InstructionFifthScreen-Results']
              }{' '}
            </Text>
          </View>
          <Text
            style={[
              Helpers.mediumFont,
              {
                marginLeft: 15,
                marginTop: 10,
                fontSize: 16,
                color: Colors.Black,
                textAlign: 'left',
                width: '90%',
              },
            ]}>
            {this.props.selectedMessage['InstructionFifthScreen-ResultsText']}
          </Text>
          <View style={styles.testResultContainer}>
            <View style={[styles.testImageConatiner]}>
              <SvgXml xml={Images.negativeTestSample} width="100%" height="100%" style={styles.imgStyle} />
              <Text style={[Helpers.bold, styles.testHeading]}>
                {
                  this.props.selectedMessage[
                  'TestResult-Negative'
                  ]
                }
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={[Helpers.bold, { fontSize: 17, color: Colors.facilityColor }]}>
                {
                  this.props.selectedMessage[
                  'TestResult-Negative'
                  ]
                }:
              </Text>
              {this.applyBoldStyle(negativeResultText)}
            </View>
            <View>

            </View>
          </View>

          <View style={[styles.testResultContainer, { marginTop: 40, marginBottom: 20 }]}>
            <View style={[styles.testImageConatiner]}>
              <SvgXml xml={Images.postiveTestSample} width="100%" height="100%" style={styles.imgStyle} />
              <Text style={[Helpers.bold, styles.testHeading]}>
                {
                  this.props.selectedMessage[
                  'TestResult-Positive'
                  ]
                }
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={[Helpers.bold, { fontSize: 17, color: Colors.facilityColor }]}>
                {
                  this.props.selectedMessage[
                  'TestResult-Positive'
                  ]
                }:
              </Text>
              {this.applyBoldStyle(positiveResultText)}
            </View>
          </View>

          <View style={[styles.testResultContainer, { marginTop: 20, marginBottom: 20 }]}>
            <View style={[styles.testImageConatiner]}>
              <SvgXml xml={Images.inconclusiveTestSample} width="100%" height="100%" style={styles.imgStyle} />
              <Text style={[Helpers.bold, styles.testHeading]}>
                {
                  this.props.selectedMessage[
                  'TestResult-Invalid'
                  ]
                }
              </Text>
            </View>
            <View style={[styles.descriptionContainer, { marginLeft: -40 }]}>
              <Text style={[Helpers.bold, { fontSize: 17, color: Colors.facilityColor }]}>
                {
                  this.props.selectedMessage[
                  'TestResult-Invalid'
                  ]
                }:
              </Text>
              {this.applyBoldStyle(invalidResultText)}
            </View>
          </View>
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
            this.props.selectedMessage['RegisterAddDetails-Finish']
          }
          onLeftPress={this._onBackButtonPress.bind(this)}
          onRightPress={this._onFourthStepPressButton.bind(
            this,
          )}></CustomMultiButtons>
      </SafeAreaView>
    );
  }
}

InstructionFifthScreen.propTypes = {
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
  testResultContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  testImageConatiner: {
    flex: 5, flexDirection: 'column'
  },
  imgStyle: {
    paddingBottom: 180
  },
  testHeading: {
    fontSize: 16,
    color: Colors.facilityColor,
    marginTop: -10,
    textAlign: 'center'
  },
  descriptionContainer: {
    flex: 5,
    justifyContent: 'center',
    marginLeft: -80
  },
  descriptionTxt: {
    fontSize: 16, color: Colors.Black, width: '90%'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstructionFifthScreen);
