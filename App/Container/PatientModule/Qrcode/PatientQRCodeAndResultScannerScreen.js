

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView, Image, Animated
} from 'react-native';
import NavigationService from 'App/Services/NavigationService'
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PatientProfileActions from 'App/Stores/PatientProfile/Actions'
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors, Images, Helpers } from 'App/Theme'
import { ValidationService } from 'App/Services/ValidationService';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

class PatientQRCodeAndResultScannerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isImageShown: false,
      imageBase64: null,
      animation: new Animated.Value(400),
      LastQRCode: null,
      inputs: {

        kitNo: {
          type: 'kitQrCode',
          value: ''
        }
      }, IsTextMode: false, IsAlertVisible: false, kitNo: '', AlertMessage: '', successHeight: 575, errorHeight: 500, successColor: Colors.facilityColor, rejectColor: '#f92a2a'
    }

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
    //this.startAnimation=this.startAnimation.bind(this)
  }

  componentDidMount() {

    this.props.resetSaveKit()
    //this.props.resetAssociateKitStates();
    this.animationInterval = setInterval(() => {
      this.startAnimation()
    }, 2300);

  }

  componentWillUnmount() {
    clearInterval(this.animationInterval)
  }


  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 550,
      duration: 1800,
      useNativeDriver: true
    }).start(() => {
      this.state.animation.setValue(400);
      //If you remove above line then it will stop the animation at toValue point
    });

  }







  componentDidUpdate(prevProps, prevState) {


    if (this.props.saveKitResultImageErrorMessage != null && this.state.LastQRCode == this.props.patientScannedKit) {

      //NavigationService.navigate()

      this.props.resetSaveKit()
      NavigationService.navigate("InvalidNew")
    }

    else if (this.props.saveKitResultImageSuccessMessage != null && this.state.LastQRCode == this.props.patientScannedKit) {

      this.props.resetSaveKit()
      NavigationService.navigate("SuccessScreenNew")
    }


  }


  _goToDashboard() {
    // this.RBErrorSheet.close()
    // this.RBSuccessSheet.close()
    // NavigationService.popScreen()
    this.setState({ IsTextMode: false })

  }


  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != "" && inputs[id].errorLabel != null) {
      return true
    }
    return false;
  }


  _onEnterCodeSubmit() {

    NavigationService.navigate('PatientHome')
    return;
    if (!this.renderError("kitNo")) {
      let kitno = this.state.inputs.kitNo.value
      // this.props.resetAssociateKitStates();
      this.setState({ kitNo: kitno })
      this.props.associateValidateKitWithPatient({ kitNo: kitno, PatientQrCode: this.props.authenticatedUser?.QRCode })

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


  barcodeRecognized = ({ data }) => {


    let LastQRCode = this.state.LastQRCode
    if (data != LastQRCode) {
      this.props.resetSaveKit()
      this.setState({ LastQRCode: data })
    }
    //barcodes.forEach(barcode => console.log(barcode.data))
    // this.setState({ barcodes })

  }

  saveKitResult(base64) {
    this.props.resetSaveKit()
    this.props.saveKitResultImage({
      PatientId: this.props.authenticatedUser?.PatientId,
      KitNoQRCode: this.props.patientScannedKit,
      FileType: "jpeg",
      imageBinary: base64,
      LoginUserId: this.props.authenticatedUser?.UserId,
    })

    this.setState({ isImageShown: false, imageBase64: null })
  }

  takePicture = async () => {
    this.setState({ isImageShown: false, imageBase64: null })
    if (this.camera) {

      let options = {
        quality: 0.70,
        fixOrientation: true,
        forceUpOrientation: true,
        base64: true,
        //pauseAfterCapture:true,
        width: 400
      };

      // this.setState({takingPic: true});

      try {
        const data = await this.camera.takePictureAsync(options);
        //console.log(data)

        if (this.state.LastQRCode != this.props.patientScannedKit) {
          this.props.resetSaveKit()
          this.RBErrorSheet.open()
        }
        else {


          this.setState({ isImageShown: true, imageBase64: data.base64 })
          // this.props.saveKitResultImage({
          // PatientId:this.props.authenticatedUser?.PatientId,  
          // KitNoQRCode:this.props.patientScannedKit,
          // FileType:"jpeg",  
          // imageBinary:data.base64,  
          // LoginUserId :this.props.authenticatedUser?.UserId, 
          // })
        }
        //  RNQRGenerator.detect({base64:  data.base64})
        // .then((res) => {
        //   if (res.values.length === 0) {
        //     console.log('Cannot detect', "err");
        //   } else {
        //     console.log(res.values);
        //   }
        // })
        // .catch((err) => {
        //   console.log('Cannot detect', err);
        // });
        //alert('Success', JSON.stringify(data));
      } catch (err) {
        //  alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        //  this.setState({takingPic: false});
      }
    }
  };


  renderScanner(transformStyle) {
    return (


      <View style={{ flex: 1 }}>
        <View style={{ height: '88%' }} >
          <RNCamera
            style={{ alignItems: 'center', flex: 1 }}
            ref={ref => {
              this.camera = ref
            }}
            captureAudio={false}
            onBarCodeRead={this.barcodeRecognized}

          >
            <Animated.View style={[{
              width: 335,
              height: 3,
              backgroundColor: '#00FF0A'
            }, transformStyle]} />
            <View style={{ alignSelf: 'center', justifyContent: 'space-between', height: '90%', marginTop: 20, width: 300, borderColor: 'white', borderWidth: 2, borderStyle: 'dashed', borderRadius: 1 }}  >
              <View>
                <View><Text style={[{ fontSize: 20, color: "white", marginTop: 10, textAlign: 'center', }, Helpers.bold]}>
                  {this.props.selectedMessage["PateintQrCodeResultScreen-CaptureTestKitResult"]}
                </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 16, color: "white", textAlign: 'center' }}>
                    {this.props.selectedMessage["PateintQrCodeResultScreen-FrontOfTheDevice"]}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: 250, marginTop: 10, marginBottom: 50, width: 250, borderColor: 'white', borderWidth: 2, borderStyle: 'dashed', borderRadius: 1 }}  >
                <Text style={[Helpers.bold, { fontSize: 16, color: "white", textAlign: 'center' }]}>

                  {this.props.selectedMessage["PateintQrCodeResultScreen-KeepQRcodethisside"]}
                </Text>
              </View>
            </View>

          </RNCamera>

        </View>


        <View style={{ height: '12%', backgroundColor: Colors.patientColor, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={{ height: 55, width: 55, backgroundColor: 'transparent', justifyContent: 'center' }}>
            <Image style={{ height: 50, width: 50 }} resizeMode='contain' source={Images.CameraClick} />


          </TouchableOpacity>

        </View>

      </View>)
  }


  renderImagePreview(base64) {
    return (

      <View style={{ flex: 1 }}>
        <View style={{ height: '88%' }}>

          <Image source={{ uri: `data:image/jpeg;base64,${base64}` }}
            style={{ height: '100%', width: '100%' }}
          ></Image>
        </View>
        <View style={{ height: '12%', backgroundColor: Colors.patientColor, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>

          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={{ height: 55, width: 55, backgroundColor: 'transparent', justifyContent: 'center', marginLeft: 20 }}>
            <Image style={{ height: 50, width: 50 }} resizeMode='contain' source={Images.retake} />


          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.saveKitResult.bind(this, base64)}
            style={{ height: 55, width: 55, backgroundColor: 'transparent', justifyContent: 'center', marginRight: 20 }}>
            <Image style={{ height: 50, width: 50 }} resizeMode='contain' source={Images.done} />


          </TouchableOpacity>
        </View>

      </View>

    )
  }

  render() {
    const transformStyle = {
      transform: [{
        translateY: this.state.animation,
      }]
    }
    const { successHeight, errorHeight, imageBase64, isImageShown } = this.state
    return (


      <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor: 'white' }}>

        <RBSheet

          ref={ref => {
            this.RBErrorSheet = ref;
          }}
          height={errorHeight}
          openDuration={250}



          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{


            // draggableIcon: {
            //   backgroundColor: "white"
            // },
            container: {

              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              //backgroundColor:rejectColor,



            }
          }}


        >
          <View>
            <Image style={{ width: 120, height: 120, alignSelf: 'center' }} resizeMode='contain' source={Images.Rejectedkitimage} />
          </View>
          <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', flexDirection: 'column' }}>
            <Text style={[Helpers.btnText, Helpers.mediumfont, { color: Colors.patientColor, fontSize: 30, textAlign: 'center', marginTop: 25, justifyContent: 'center' }]}>
              {this.props.selectedMessage["InvalidScreen-InvalidBold"]}
            </Text>

            <Text style={[Helpers.btnText, Helpers.book, { color: Colors.BlueColorNew, fontSize: 15, textAlign: 'center', marginTop: 15, marginBottom: 15 }]}>
              {this.props.selectedMessage["PateintQrCodeResultScreen-RecaptureTest"]}
            </Text>
          </View>
          <TouchableOpacity style={[Helpers.btn, { backgroundColor: Colors.patientColor, width: '90%', alignSelf: 'center' }]}
            onPress={() => { this.RBErrorSheet.close() }}
          //onPress={()=>{NavigationService.navigate('InstructionFirstScreen')}}
          >
            <Text style={[Helpers.btnText, { color: Colors.white, fontSize: 17, }]}>
              {this.props.selectedMessage["PateintQrCodeResultScreen-RecaptureTestKitResult"]}
            </Text>

          </TouchableOpacity>

          <TouchableOpacity style={[Helpers.btn, { marginTop: 12, marginBottom: 10, backgroundColor: Colors.white, width: '90%', alignSelf: 'center', borderWidth: 1, borderColor: Colors.patientColor }]}
            onPress={() => { this.RBErrorSheet.close() }}
          >
            <Text style={[Helpers.btnText, { color: Colors.patientColor, fontSize: 17, }]}>
              {this.props.selectedMessage["SearchFacility-Cancel"]}
            </Text>

          </TouchableOpacity>


        </RBSheet>

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

        {

          isImageShown ?
            this.renderImagePreview(imageBase64)
            :
            this.renderScanner(transformStyle)


        }





      </SafeAreaView>

    );
  }
}

PatientQRCodeAndResultScannerScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  associateValidateKitWithPatientSuccessMessage: PropTypes.string,
  associateValidateKitWithPatientFailureMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,
  associateValidateKitWithPatient: PropTypes.func,
  resetSaveKit: PropTypes.func,
  selectedMessage: PropTypes.any,
  patientScannedKit: PropTypes.any,
  saveKitResultImageErrorMessage: PropTypes.any,
  saveKitResultImageSuccessMessage: PropTypes.any,
  saveKitResultImage: PropTypes.func,


}


const mapStateToProps = (state) => ({
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  associateValidateKitWithPatientSuccessMessage: state.patientProfile.associateValidateKitWithPatientSuccessMessage,
  associateValidateKitWithPatientFailureMessage: state.patientProfile.associateValidateKitWithPatientFailureMessage,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
  patientScannedKit: state.patientProfile.patientScannedKit,
  saveKitResultImageErrorMessage: state.patientProfile.saveKitResultImageErrorMessage,
  saveKitResultImageSuccessMessage: state.patientProfile.saveKitResultImageSuccessMessage,
})

const mapDispatchToProps = (dispatch) => ({
  associateValidateKitWithPatient: (data) => dispatch(PatientProfileActions.associateValidateKitWithPatient(data)),
  resetSaveKit: () => dispatch(PatientProfileActions.resetSaveKit()),
  saveKitResultImage: (data) => dispatch(PatientProfileActions.saveKitResultImage(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientQRCodeAndResultScannerScreen)
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
