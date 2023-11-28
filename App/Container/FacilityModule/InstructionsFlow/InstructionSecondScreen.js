import React from 'react';
import { Text, View, TouchableOpacity, Image, SafeAreaView, Dimensions, ScrollView, StyleSheet } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Colors, ApplicationStyles, Images, Helpers } from 'App/Theme';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import HeaderProgress from 'App/Components/HeaderProgress';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import { LanguageEnum } from 'App/Enums';
import { SvgXml } from 'react-native-svg';

const height = Dimensions.get("window").height;
class InstructionSecondScreen extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  _onPressButton() {
    NavigationService.navigate('InstructionThirdScreen');
  }
  _OnPressRightSideIcon() {
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
              {this.props.selectedMessage['InstructionSecondScreen-Page']} 1 of
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
              progressCount={15}
              rightColor={Colors.patientColor}
              leftColor={'#FBFBFB'}
            />
          </View>

          <View
            style={{
              justifyContent: 'flex-start',
              marginLeft: 15,
            }}>
            <Text
              style={[
                Helpers.bold,
                { fontSize: 30, color: Colors.patientColor, textAlign: 'left', paddingTop: 18, paddingBottom: 8 },
              ]}>
              {
                this.props.selectedMessage[
                'InstructionSecondScreen-QuickReferenceNew'
                ]
              }{' '}
            </Text>
            <Text style={[styles.subHeadingTxt]}>{
              this.props.selectedMessage[
              'InsrtructionSecondScreen-Ref'
              ]
            }</Text>
            <Text style={[styles.subHeadingTxt, { marginVertical: 20 }]}>{
              this.props.selectedMessage[
              'InsrtructionSecondScreen-Test Kit'
              ]
            }</Text>
          </View>

          <View style={styles.boxContainer}>
            {this.props.locale == LanguageEnum.English ?
              <Text
                style={[
                  Helpers.bold, styles.boxMainHeading
                ]}>
                {
                  this.props.selectedMessage[
                  'InsrtructionSecondScreen-FDAInstruction'
                  ]
                }
              </Text> :
              <Text style={[Helpers.bold, styles.boxMainHeading, { color: Colors.facilityColor }]}>{
                this.props.selectedMessage[
                'InstructionSecondScreen-KitContent'
                ]
              }
              </Text>}
            <View style={styles.bodyContainer}>
              <View style={[styles.flexDivision, { marginBottom: 10 }]}>
                {this.props.locale == LanguageEnum.English && <Text style={[Helpers.bold, styles.kitContentTxt]}>
                  {
                    this.props.selectedMessage[
                    'InstructionSecondScreen-KitContent'
                    ]}
                </Text>}
                <Text>
                  <View style={[styles.containerTxtwithCircle, { marginTop: 15 }]}>
                    <View style={styles.circle} />
                    <Text style={[Helpers.mediumFont, styles.bodyTxt]}>{
                      this.props.selectedMessage[
                      'InsrtructionSecondScreen-Step1'
                      ]}</Text>
                  </View>
                </Text>
                <Text>
                  <View style={styles.containerTxtwithCircle}>
                    <View style={[styles.circle, { alignSelf: 'flex-start', marginTop: 10 }]} />
                    <Text style={[Helpers.mediumFont, styles.bodyTxt, { maxWidth: 160 }]}>{
                      this.props.selectedMessage[
                      'InsrtructionSecondScreen-Step2'
                      ]}</Text>
                  </View>
                </Text>
                <Text>
                  <View style={styles.containerTxtwithCircle}>
                    <View style={styles.circle} />
                    <Text style={[Helpers.mediumFont, styles.bodyTxt]}>{
                      this.props.selectedMessage[
                      'InsrtructionSecondScreen-Step3'
                      ]}</Text>
                  </View>
                </Text>
                <Text>
                  <View style={styles.containerTxtwithCircle}>
                    <View style={styles.circle} />
                    <Text style={[Helpers.mediumFont, styles.bodyTxt]}>{
                      this.props.selectedMessage[
                      'InsrtructionSecondScreen-Step4'
                      ]}</Text>
                  </View>
                </Text>
              </View>
              <View style={styles.flexDivision}>
                <SvgXml xml={Images.kitContentImg} width="100%" height="100%" />
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            Helpers.bottomView,
            { backgroundColor: 'transparent', height: 55 },
          ]}>
          <View
            style={[
              Helpers.btnContainer,
              { bottom: 0, justifyContent: 'flex-end', marginRight: 17 },
            ]}>
            <TouchableOpacity
              style={[
                Helpers.buttonContainer,
                {
                  width: '40%', borderRadius: 13, marginRight: 5
                },
              ]}
              onPress={this._onPressButton.bind(this)}>
              <Text
                style={[Helpers.btnText, { fontWeight: 'bold', fontSize: 14 }]}>
                {this.props.selectedMessage['InstructionSecondScreen-GoToStep']}{' '}
                2
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

InstructionSecondScreen.propTypes = {
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
  subHeadingTxt: {
    fontSize: 18,
    color: Colors.facilityColor,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  boxContainer: {
    marginBottom: 80,
    marginHorizontal: 12,
    borderColor: Colors.facilityColor,
    borderWidth: 1,
    marginTop: 5,
    // height: height * 0.32
  },
  boxMainHeading: {
    marginLeft: 15,
    marginVertical: 10,
    fontSize: 20,
    color: Colors.Black,
    textAlign: 'left',
    width: '90%',
  },
  kitContentTxt: {
    fontSize: 22,
    color: Colors.facilityColor
  },
  bodyContainer: {
    flex: 1, flexDirection: 'row',
    marginLeft: 12,
  },
  flexDivision: {
    flex: 5
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 20,
    marginRight: 5,
    backgroundColor: Colors.facilityColor,
    alignSelf: 'center'
  },
  bodyTxt: {
    fontSize: 15,
    color: Colors.Black
  },
  containerTxtwithCircle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  }


});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstructionSecondScreen);
