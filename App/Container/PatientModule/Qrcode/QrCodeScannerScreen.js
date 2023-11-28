

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  SafeAreaView, Image
} from 'react-native';
import NavigationService from 'App/Services/NavigationService'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PatientProfileActions from 'App/Stores/PatientProfile/Actions'
import CustomHeader from 'App/Components/CustomHeader';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import RBSheet from "react-native-raw-bottom-sheet";
import RejectedKit from 'App/Components/RejectedKit';
import CustomInputBox from 'App/Components/CustomInputBox';
import ApprovedKit from 'App/Components/ApprovedKit';
import { Colors, Fonts, Images, Metrics, Helpers, ApplicationStyles } from 'App/Theme'
import { ValidationService } from 'App/Services/ValidationService';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

class QrCodeScannerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {
        kitNo: {
          type: 'kitQrCode',
          value: ''
        }
      }, IsTextMode: false, IsAlertVisible: false, kitNo: '', AlertMessage: '', successHeight: 575, errorHeight: 430, successColor: Colors.facilityColor, rejectColor: '#f92a2a'
    }

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  componentDidMount() {


    this.props.resetAssociateKitStates();
  }




  onSuccess = e => {


    this.props.resetAssociateKitStates();
    this.setState({ kitNo: e.data })
    this.props.associateValidateKitWithPatient({ kitNo: e.data, PatientQrCode: this.props.authenticatedUser?.QRCode })
  };


  componentDidUpdate(prevProps, prevState) {


    if (this.props.associateValidateKitWithPatientFailureMessage != null) {
      this.RBErrorSheet.open()
    }

    else if (this.props.associateValidateKitWithPatientSuccessMessage != null) {
      this.RBSuccessSheet.open()
    }


  }


  _goToDashboard() {
    this.RBErrorSheet.close()
    this.RBSuccessSheet.close()
    NavigationService.popScreen()

  }


  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != "" && inputs[id].errorLabel != null) {
      return true
    }
    return false;
  }


  _onKitInputBlur(event) {
    if (!this.renderError("kitNo")) {
      this.props.resetAssociateKitStates();
      this.setState({ kitNo: event.nativeEvent.text })
      this.props.associateValidateKitWithPatient({ kitNo: event.nativeEvent.text, PatientQrCode: this.props.authenticatedUser?.QRCode })

    }

  }

  _OnClickCrossButton() {
    NavigationService.popScreen()
  }
  _onSignUpPressButton() {
    this.setState({ IsTextMode: false })

  }
  _onRightButtonClick() {
    this.setState({ IsTextMode: true })

  }
  _closeBottomSheet() {

    this.props.resetAssociateKitStates();
    let self = this
    setTimeout(() => {
      if (self.scanner) {
        self.scanner.reactivate()
      }

    }, 1500);


  }

  render() {
    const { successHeight, errorHeight, successColor, rejectColor } = this.state
    return (


      <SafeAreaView style={{ flex: 1, backgroundColor: '#808080', position: 'relative' }}>
        <Dialog
          dialogStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          visible={this.props.isPatientProfileLoading} >
          <DialogContent style={{ backgroundColor: 'transparent' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={Images.Loaderimg}
                style={{ alignItems: 'center', resizeMode: 'center', marginTop: 17 }}
              />
            </View>
          </DialogContent>
        </Dialog>

        <RBSheet
          ref={ref => {
            this.RBSuccessSheet = ref;
          }}
          height={successHeight}
          openDuration={250}
          onClose={this._OnClickCrossButton.bind(this)}


          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            // wrapper: {
            //   backgroundColor: "transparent",
            //   paddingHorizontal:2
            // },
            // draggableIcon: {
            //   backgroundColor: "white"
            // },
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,

              backgroundColor: successColor,


            }
          }}


        >

          <ApprovedKit

            cardContainerStyle={[{ height: '100%', width: '100%', backgroundColor: Colors.facilityColor, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }]}
            cardFirstBoxContainerStyle={[{ height: 150, width: '100%', backgroundColor: 'red', alignSelf: 'flex-start', alignItems: 'flex-start' }]}
            cardBgImage={Images.ApprovedKitBackground}
            cardBgImageContainerStyle={[{ width: '100%', backgroundColor: Colors.facilityColor, alignSelf: 'flex-start', alignItems: 'flex-start' }]}
            cardImageContainerStyle={[{ height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'flex-start' }]}


            cardHeaderStyle={[Helpers.btnText, { color: 'white', fontSize: 38, textAlign: 'left', marginHorizontal: 10, fontWeight: 'bold', justifyContent: 'center' }]}
            cardHeader={this.props.selectedMessage["SearchFacility-Success!"]}
            cardParagraphStyle={[Helpers.btnText, { color: 'white', fontSize: 18, textAlign: 'left', marginHorizontal: 10, fontWeight: 'bold', justifyContent: 'center' }]}
            cardParagraph={(this.props.selectedMessage["SearchFacility-WeHaveInitiateYourTest"]).toString().replace('name', this.props.authenticatedUser?.FirstName)}
            cardSecondBoxContainerStyle={[{
              height: 420, width: '100%', backgroundColor: 'white', bottom: 0, alignItems: 'center', justifyContent: 'space-around', borderTopLeftRadius: 40,
              borderTopRightRadius: 40, bottom: 0
            }]}
            cardKnobStyle={[{ height: 5, width: '8%', backgroundColor: Colors.facilityColor, borderRadius: 20 }]}

            cardTableStyle={[{ height: 195, width: '90%', overflow: 'hidden', backgroundColor: 'transparent', borderRadius: 22, borderColor: '#d1e7e5', borderWidth: 1 }]}
            cardTableHeaderStyle={[{ height: 48, backgroundColor: '#d1e7e5', justifyContent: 'center' }]}
            cardTableHeaderTextStyle={[{ fontSize: 16, color: Colors.facilityColor, textAlign: 'center' }]}

            cardTableRowStyle={[{ height: 48, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-between' }]}
            cardTableRowLableContainerStyle={[{ width: '50%', justifyContent: 'center', marginHorizontal: 10 }]}
            cardTableRowLableTextStyle={[{ fontSize: 13, color: 'black', textAlign: 'left', fontWeight: 'bold' }]}

            cardTableRowValueContainerStyle={[{ width: '50%', justifyContent: 'center', marginHorizontal: 10 }]}
            cardTableRowValueTextStyle={[{ fontSize: 11, color: 'black', fontWeight: 'bold' }]}

            cardButtonOnPress={this._goToDashboard.bind(this)}

            cardButton={[Helpers.buttonContainer, { backgroundColor: 'transparent', width: '90%', borderColor: '#614698', borderWidth: 1, height: 50 }]}
            cardButtonTextStyle={[Helpers.btnText, { color: '#614698', fontSize: 14 }]}
            cardButtonText={this.props.selectedMessage["RegisterSuccess-GoToDashboard"]}
            cardTableData={[
              { itemLable: this.props.selectedMessage["SearchFacility-TestKitId"], itemValue: this.state.kitNo, IsHeader: true },
              { itemLable: this.props.selectedMessage["SearchFacility-TestDate"], itemValue: 'TBD', IsHeader: false },
              { itemLable: this.props.selectedMessage["SearchFacility-TimeOfResults"], itemValue: 'TBD', IsHeader: false },
              { itemLable: this.props.selectedMessage["SearchFacility-TestFacility"], itemValue: 'TBD', IsHeader: false }
            ]}




          ></ApprovedKit>


        </RBSheet>


        <RBSheet

          ref={ref => {
            this.RBErrorSheet = ref;
          }}
          height={errorHeight}
          openDuration={250}
          onClose={this._closeBottomSheet.bind(this)}


          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{


            // draggableIcon: {
            //   backgroundColor: "white"
            // },
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              backgroundColor: rejectColor,



            }
          }}


        >
          <RejectedKit
            containerStyle={[{ height: '100%', width: '100%', backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }]}
            bgImageContainerStyle={[{ height: 170, width: '100%', backgroundColor: 'yellow', alignSelf: 'flex-start', alignItems: 'flex-start' }]}
            bgImage={Images.RejectKitBackground}
            imageContainerStyle={[{ height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'flex-start' }]}
            rejectKitTopHeaderStyle={[Helpers.btnText, { color: 'white', fontSize: 20, marginTop: 20, textAlign: 'center', fontWeight: 'bold' }]}
            rejectKitTopHeader={this.props.selectedMessage["SearchFacility-InvalidQRCode"]}
            rejectKitHeaderStyle={[Helpers.btnText, { color: 'white', fontSize: 44, textAlign: 'center', marginTop: 30, fontWeight: 'bold', justifyContent: 'center' }]}
            rejectKitHeader={this.props.selectedMessage["SearchFacility-REJECTED"]}
            txtConatinerStyle={[{ height: 280, width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around' }]}
            rejectKitParagraphStyle={[Helpers.btnText, { color: '#000000', fontSize: 15, textAlign: 'center', marginTop: 10, width: '80%', justifyContent: 'flex-start' }]}
            rejectKitParagraph={this.props.selectedMessage["SearchFacility-TheTestKitQRCodeThatYouScannedIsIncorrect"]}

            rejectedKitButtonContainerStyle={[Helpers.buttonContainer, { backgroundColor: '#f92a2a', width: '70%' }]}
            rejectedKitButtonTextStyle={[Helpers.btnText]}
            rejectKitbtnText={this.props.selectedMessage["SearchFacility-RescanQRCode"]}

            rejectKitCanelButtonContainerStyle={[Helpers.buttonContainer, { backgroundColor: 'white', width: '70%', marginBottom: 20 }]}
            rejectKitCanelButtonTextStyle={[Helpers.btnText, { fontSize: 18, color: '#f92a2a', fontWeight: "bold" }]}
            rejectKitbtnCanelText={this.props.selectedMessage["SearchFacility-Cancel"]}
            onPress={() => { this.RBErrorSheet.close() }}
            onCancelPress={this._goToDashboard.bind(this)} >
          </RejectedKit>



        </RBSheet>


        {this.state.IsTextMode ?

          <View style={{}}>
            <CustomHeader
              onPressBackButton={this._goToDashboard.bind(this)}

              LeftImage={Images.CrossIcon}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Text style={[Helpers.bold, { fontSize: 26, color: '#FFFFFF', textAlign: 'center', width: '100%', marginTop: 20 }]}>
                {this.props.selectedMessage["SearchFacility-EnterTestKitQRCode"]}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
              <Text style={[Helpers.mediumFont, { fontSize: 15, color: '#FFFFFF', textAlign: 'center', width: '60%', marginTop: 20 }]}>
                {this.props.selectedMessage["SearchFacility-TypeTheCodeOnTheBackOfTheTestKit"]}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', height: 70, marginTop: 25 }}>
              <View style={{ width: '90%', borderRadius: 40, backgroundColor: 'white' }}>
                <CustomInputBox containerStyle={[Helpers.txtRoundInputContainer, { borderWidth: 0, }, this.renderError("kitNo") ? { borderColor: Colors.error } : {}]}
                  inputBoxstyle={[Helpers.txtRoundInputs]}
                  placeholder={this.props.selectedMessage["SearchFacility-TypeQRCode"]}
                  onChangeText={(value) => this.onInputChange({ id: 'kitNo', value })}
                  onEndEditing={this._onKitInputBlur.bind(this)}
                  value={this.state.inputs.kitNo.value}
                  // inputLabl={this.props.selectedMessage["SearchFacility-TypeQRCode"]}
                  componentStyle={[Helpers.column, Helpers.crossStart, { height: 50, marginLeft: 15, marginBottom: 10 }]}
                  inputBoxLableStyle={[Helpers.inputBoxLable, { marginLeft: 15 }]}
                  rightIconStyle={[Helpers.rightIconStyle, { marginRight: 20, }]}
                  hasEvent={false}
                  hasRightIcon={true}
                  maxLength={50}
                  rightIcon={this.state.inputs["kitNo"].touched ? this.renderError("kitNo") ? Images.InValid : Images.ValidPurple : null}

                >

                </CustomInputBox>
              </View>
            </View>

          </View>
          :

          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.150, backgroundColor: '#808080', flexDirection: 'row' }}>
              <CustomHeader
                onPressBackButton={this._OnClickCrossButton.bind(this)}

                LeftImage={Images.CrossIcon}
              />
            </View>
            <View style={{ flex: 0.7, backgroundColor: '#808080', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>


              <QRCodeScanner
                onRead={this.onSuccess}
                showMarker={true}
                ref={(node) => { this.scanner = node }}
                containerStyle={{ width: '100%', alignItems: 'center' }}
                cameraStyle={{ width: 200, height: 200, marginTop: 20 }}


                topContent={
                  <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                      <Text style={[styles.centerText, Helpers.lightBook]}>
                        {this.props.selectedMessage["SearchFacility-ScanTestKitQRCode"]}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                      <Text style={[styles.text, Helpers.lightBook]}>
                        {this.props.selectedMessage["SearchFacility-ScanTheQRCodeOnTheBackOfTheTestKit"]}
                      </Text>
                    </View>
                  </View>


                }

              /></View>
            <View style={{ flex: 0.150, backgroundColor: '#808080' }}>

            </View>


          </View>

        }




        <CustomMultiButtons
          mutliButtonContainer={[Helpers.bottomView, Helpers.multiButtonContainer, { backgroundColor: 'white', borderRadius: 50, marginBottom: 10 }]}
          leftButtonContainer={
            this.state.IsTextMode ?
              [Helpers.buttonContainer, { width: '40%', borderRadius: 30, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.patientColor }
              ] :
              [
                Helpers.buttonContainer, Helpers.buttonContainerWithoutBackground, { borderRadius: 30, borderWidth: 0, backgroundColor: Colors.patientColor }

              ]
          }
          rightButtonContainer={
            this.state.IsTextMode ? [
              Helpers.buttonContainer, Helpers.buttonContainerWithoutBackground, { borderRadius: 30, borderWidth: 0, backgroundColor: Colors.patientColor }

            ] :
              [Helpers.buttonContainer, { width: '40%', borderRadius: 30, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.patientColor }
              ]
          }
          leftButtonTextStyle={

            this.state.IsTextMode ?
              [Helpers.btnText, Helpers.lightBook, { fontSize: 14, color: Colors.patientColor }]
              : [Helpers.btnText, Helpers.buttonTextWithoutBackgroundContainer, Helpers.lightBook, { color: Colors.white }]
          }
          rightButtonTextStyle={
            this.state.IsTextMode ?
              [Helpers.btnText, Helpers.buttonTextWithoutBackgroundContainer, { color: Colors.white, }, Helpers.lightBook]
              : [Helpers.btnText, { fontSize: 14, color: Colors.patientColor }, Helpers.lightBook]

          }
          leftButtonText={this.props.selectedMessage["NewTester-ScanQRCode"]}
          rightButtonText={this.props.selectedMessage["NewTester-TypeQRCode"]}
          onLeftPress={this._onSignUpPressButton.bind(this)}
          onRightPress={this._onRightButtonClick.bind(this)}
        ></CustomMultiButtons>

      </SafeAreaView>

    );
  }
}

QrCodeScannerScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  associateValidateKitWithPatientSuccessMessage: PropTypes.string,
  associateValidateKitWithPatientFailureMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,
  associateValidateKitWithPatient: PropTypes.func,
  resetAssociateKitStates: PropTypes.func,
  selectedMessage: PropTypes.any,
}


const mapStateToProps = (state) => ({
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  associateValidateKitWithPatientSuccessMessage: state.patientProfile.associateValidateKitWithPatientSuccessMessage,
  associateValidateKitWithPatientFailureMessage: state.patientProfile.associateValidateKitWithPatientFailureMessage,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage
})

const mapDispatchToProps = (dispatch) => ({
  associateValidateKitWithPatient: (data) => dispatch(PatientProfileActions.associateValidateKitWithPatient(data)),
  resetAssociateKitStates: () => dispatch(PatientProfileActions.resetAssociateKitStates()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QrCodeScannerScreen)
const styles = StyleSheet.create({
  centerText: {
    //fontFamily:'gothamrounded-bold',
    fontSize: 26,
    padding: 26,
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%'
  },
  text: {
    // fontFamily:'gothamrounded-medium',
    color: '#FFFFFF',
    fontSize: 17,
    marginBottom: 40,
    textAlign: 'center',
    width: '60%'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
