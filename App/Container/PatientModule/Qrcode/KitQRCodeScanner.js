import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
    Animated
} from 'react-native';

import NavigationService from 'App/Services/NavigationService'
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PatientProfileActions from 'App/Stores/PatientProfile/Actions'
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors, Images, Helpers, } from 'App/Theme'
import Dialog, { DialogContent } from 'react-native-popup-dialog';


class KitQRCodeScanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isImageShown: false,
            imageBase64: null,
            animationValues: {
                y: 400,
                height: 250
            },
            animation: new Animated.Value(400),
            ScannedQRCode: null,
            inputs: {
                kitNo: {
                    type: 'kitQrCode',
                    value: ''
                }
            },
            successHeight: 575,
            errorHeight: 500,
        }
    }

    componentDidMount() {
        this.props.resetSaveKit()
        this.animationInterval = setInterval(() => {
            this.startAnimation()
        }, 2300);
    }

    componentWillUnmount() {
        clearInterval(this.animationInterval)
    }

    startAnimation = () => {
        const { animationValues } = this.state;
        this.state.animation.setValue(this.state.animationValues.y + 50);
        Animated.timing(this.state.animation, {
            toValue: animationValues.height + animationValues.y,
            duration: 1800,
            useNativeDriver: true
        }).start(() => {
            this.state.animation.setValue(this.state.animationValues.y + 50);
            //If you remove above line then it will stop the animation at toValue point
        });
    }

    componentDidUpdate(prevProps, prevState) {


        if (this.props.associateValidateKitWithPatientSuccessMessage != prevProps.associateValidateKitWithPatientSuccessMessage
            && this.props.associateValidateKitWithPatientSuccessMessage != null) {
            this.setState({ isImageShown: true })
            // alert("Success")
        }
        // if (this.props.associateValidateKitWithPatientFailureMessage != prevProps.associateValidateKitWithPatientFailureMessage
        //     && this.props.associateValidateKitWithPatientFailureMessage != null) {
        //      // this.props.resetSaveKit()
        //   this.RBErrorSheet.open()
        // }

        //     if (this.props.saveKitResultImageErrorMessage != null) {
        //         //NavigationService.navigate()
        //         this.props.resetSaveKit()
        //         NavigationService.navigate("InvalidNew")
        //     }

        else if (this.props.saveKitResultImageSuccessMessage != null) {
            this.props.resetSaveKit()
            // this.RBErrorSheet.open()
            NavigationService.navigate("PatientEnterResultScreen", { imageBase64: this.state.imageBase64, kitNo: this.state.ScannedQRCode })
        }
    }


    saveKitResult(base64) {
        this.props.resetAssociateKitStates()
        this.props.saveKitResultImage({
            PatientId: this.props.authenticatedUser?.PatientId,
            KitNoQRCode: this.state.ScannedQRCode,
            FileType: "jpeg",
            imageBinary: base64,
            LoginUserId: this.props.authenticatedUser?.UserId,
        })
        this.setState({ isImageShown: false })

    }

    barcodeRecognized = ({ data }) => {
        this.props.resetSaveKit()
        if (!this.barcodeTimer) {
            this.barcodeTimer = setTimeout(() => {
                this.props.resetSaveKit()
                this.setState({ ScannedQRCode: data })
                this.barcodeTimer = null;
                console.log("barcodeRecognized", this.state.ScannedQRCode)
            }, 400);
        }
    }

    takePicture = async () => {
        this.setState({ isImageShown: false, imageBase64: null, ScannedQRCode: this.state.ScannedQRCode })
        if (this.camera) {

            let options = {
                quality: 0.70,
                fixOrientation: true,
                forceUpOrientation: true,
                base64: true,
                width: 400
            };

            try {
                const data = await this.camera.takePictureAsync(options);
                console.log("this.state.ScannedQRCode", this.state.ScannedQRCode)
                if (this.state.ScannedQRCode == null) {
                    this.setState({ isImageShown: false, imageBase64: data.base64 })
                    NavigationService.navigate("PatientEnterResultScreen", { imageBase64: this.state.imageBase64, kitNo: this.state.ScannedQRCode })
                    //     this.props.resetSaveKit()
                    //     this.RBErrorSheet.open()
                }
                else {
                    this.props.resetAssociateKitStates()
                    this.props.associateValidateKitWithPatient({ kitNo: this.state.ScannedQRCode, PatientQrCode: this.props.authenticatedUser?.QRCode })
                    this.setState({ isImageShown: false, imageBase64: data.base64 })
                }
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
                            backgroundColor: 'transparent'
                        }, transformStyle
                        ]} />
                        <View style={{
                            alignSelf: 'center', justifyContent: 'space-between',
                            height: '90%', marginTop: 20,
                            width: 300,
                            borderColor: 'white', borderWidth: 2,
                            borderStyle: 'dashed', borderRadius: 1
                        }}  >
                            <View>
                                <View>
                                    <Text style={[{
                                        fontSize: 20,
                                        color: "white",
                                        marginTop: 10,
                                        textAlign: 'center',
                                    }, Helpers.bold]}>
                                        {this.props.selectedMessage["PateintQrCodeResultScreen-CaptureTestKitResult"]}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, color: "white", textAlign: 'center' }}>
                                        {this.props.selectedMessage["PateintQrCodeResultScreen-FrontOfTheDevice"]}
                                    </Text>
                                </View>
                            </View>
                            {/* <View style={{
                                alignItems: 'center', justifyContent: 'center',
                                alignSelf: 'center', height: 250,
                                marginTop: 10, marginBottom: 50,
                                width: 250, borderColor: 'white',
                                borderWidth: 2, borderStyle: 'dashed',
                                borderRadius: 1
                            }}
                                onLayout={event => {
                                    const layout = event.nativeEvent.layout;
                                    this.setState({ animationValues: layout });
                                }}
                            >
                                <Text style={[Helpers.bold, { fontSize: 16, color: "white", textAlign: 'center' }]}>

                                    {this.props.selectedMessage["PateintQrCodeResultScreen-KeepQRcodethisside"]}
                                </Text>
                            </View> */}
                        </View>

                    </RNCamera>

                </View>


                <View style={{
                    height: '12%', backgroundColor: Colors.patientColor,
                    justifyContent: 'center', alignItems: 'center',
                    flexDirection: 'row'
                }}>

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
                <View style={{
                    height: '12%', backgroundColor: Colors.patientColor,
                    justifyContent: 'space-between', alignItems: 'center',
                    flexDirection: 'row'
                }}>

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

                        container: {

                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,

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

KitQRCodeScanner.propTypes = {
    authenticatedUser: PropTypes.object,
    associateValidateKitWithPatientSuccessMessage: PropTypes.string,
    associateValidateKitWithPatientFailureMessage: PropTypes.string,
    isPatientProfileLoading: PropTypes.bool,
    associateValidateKitWithPatient: PropTypes.func,
    resetSaveKit: PropTypes.func,
    selectedMessage: PropTypes.any,
    // patientScannedKit: PropTypes.any,
    saveKitResultImageErrorMessage: PropTypes.any,
    saveKitResultImageSuccessMessage: PropTypes.any,
    saveKitResultImage: PropTypes.func,
    resetAssociateKitStates: PropTypes.func,


}

const mapStateToProps = (state) => ({
    isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
    associateValidateKitWithPatientSuccessMessage: state.patientProfile.associateValidateKitWithPatientSuccessMessage,
    associateValidateKitWithPatientFailureMessage: state.patientProfile.associateValidateKitWithPatientFailureMessage,
    authenticatedUser: state.authenticate.authenticatedUser,
    selectedMessage: state.startup.selectedMessage,
    // patientScannedKit: state.patientProfile.patientScannedKit,
    saveKitResultImageErrorMessage: state.patientProfile.saveKitResultImageErrorMessage,
    saveKitResultImageSuccessMessage: state.patientProfile.saveKitResultImageSuccessMessage,
})

const mapDispatchToProps = (dispatch) => ({
    associateValidateKitWithPatient: (data) => dispatch(PatientProfileActions.associateValidateKitWithPatient(data)),
    resetSaveKit: () => dispatch(PatientProfileActions.resetSaveKit()),
    saveKitResultImage: (data) => dispatch(PatientProfileActions.saveKitResultImage(data)),
    resetAssociateKitStates: () => dispatch(PatientProfileActions.resetAssociateKitStates()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KitQRCodeScanner)
const styles = StyleSheet.create({
    centerText: {
        fontSize: 26,
        padding: 26,
        color: '#FFFFFF',
        textAlign: 'center',
        width: '100%'
    },
    text: {
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
