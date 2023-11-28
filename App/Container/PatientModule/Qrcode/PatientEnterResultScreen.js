import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import {
    Helpers,
    Colors,
    Images,
    Metrics,
} from 'App/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';

import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';

import { ResultTypeEnum } from 'App/Enums';
import CustomDDL from 'App/Components/CustomDDL';
import HeaderProgress from 'App/Components/HeaderProgress';
import { ValidationService } from 'App/Services/ValidationService';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import { color } from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import NavigationService from 'App/Services/NavigationService';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import CustomHeaderNew from 'App/Components/CustomHeaderNew';

class PatientEnterResultScreen extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            IsMessageShow: false,
            Message: '',
            IsSuccess: false,
            IsResultdetected: false,
            IsResultUNdetected: false,
            IsResultInconclusive: false,
            ResultComment: '',
            IsShowPopUp: false,
            ResultPayloadInfo: null,
        };
    }

    // componentDidMount() {
    //     let ResultPayloadInfo = this.props.route.params?.ResultPayloadInfo;
    //     if (!ResultPayloadInfo) {
    //         NavigationService.popScreen();
    //     }

    //     this.setState({ ResultPayloadInfo });
    // }

    componentWillUnmount() {
        this.setState({ IsMessageShow: false });
    }
    _CloseAlert() {
        let { IsSuccess } = this.state;
        this.setState({ IsMessageShow: false });
        if (IsSuccess) {
            NavigationService.navigateAndReset('PatientHome');
        }
    }
    _goBackscreen() {
        NavigationService.navigate('KitQRCodeScanner');
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.addKitResultErrorMessage != null &&
            prevProps.addKitResultErrorMessage != this.props.addKitResultErrorMessage
        ) {
            //alert(this.props.addKitResultErrorMessage)
            let Message = this.props.selectedMessage[
                this.props.addKitResultErrorMessage
            ];
            this.setState({ IsMessageShow: true, Message: Message, IsSuccess: false });
        } else if (
            this.props.addKitResultSuccessMessage != null &&
            prevProps.addKitResultSuccessMessage !=
            this.props.addKitResultSuccessMessage
        ) {
            // alert(this.props.addKitResultSuccessMessage)
            // NavigationService.navigateAndReset('FacilityHome')
            let Message = this.props.selectedMessage[
                this.props.addKitResultSuccessMessage
            ];
            this.setState({ IsMessageShow: true, Message: Message, IsSuccess: true });
        }
    }

    _Detected() {
        this.setState({
            IsResultdetected: true,
            IsResultUNdetected: false,
            IsResultInconclusive: false,
        });
    }

    _UnDetected() {
        this.setState({
            IsResultUNdetected: true,
            IsResultdetected: false,
            IsResultInconclusive: false,
        });
    }

    _Inconclusive() {
        this.setState({
            IsResultInconclusive: true,
            IsResultdetected: false,
            IsResultUNdetected: false,
        });
    }

    _OpenPresSubmit() {
        const {
            IsResultUNdetected,
            IsResultdetected,
            IsResultInconclusive,
        } = this.state;
        if (IsResultUNdetected || IsResultdetected || IsResultInconclusive) {
            this.props.resetAddKitResult();
            this.setState({ IsShowPopUp: true });
        }
    }

    _CancelPress() {
        this.setState({ IsShowPopUp: false });
    }

    _ConfirmPress() {
        this.setState({ loader: true })
        // let ResultPayloadInfo = this.props.route.params?.ResultPayloadInfo;
        this.setState({ IsShowPopUp: false });
        const {
            IsResultUNdetected,
            IsResultdetected,
            IsResultInconclusive,
        } = this.state;
        const payload = {};
        payload.PatientId = this.props.authenticatedUser?.PatientId; //this.props.recentlyAddedPatientResponse.PatientId; // Need to change
        payload.KitNo = this.props.route?.params?.kitNo; //this.props.kitScanResponse.KitNo; // Need to change
        payload.RestultTypeId = IsResultUNdetected
            ? ResultTypeEnum.Negative
            : IsResultdetected
                ? ResultTypeEnum.Positive
                : ResultTypeEnum.Inconclusive;
        payload.ResultComment = this.state.ResultComment;
        payload.FacilityUserId = this.props.authenticatedUser?.FacilityUserId;
        payload.LoginUserId = this.props.authenticatedUser?.UserId;
        // alert(JSON.stringify(payload));
        this.props.addKitResult(payload)
        setTimeout(() => {
            this.setState({ loader: false })
        }, 3000);
    }

    render() {
        // alert(this.props.patientMember_Id)
        const {
            IsResultUNdetected,
            IsResultdetected,
            IsResultInconclusive,
        } = this.state;
        const alertColor = IsResultUNdetected
            ? Colors.facilityColor
            : IsResultdetected
                ? Colors.ErrorREdColor
                : Colors.patientColor;
        const testType = IsResultUNdetected
            ? this.props.selectedMessage['TestResult-Negative']
            : IsResultdetected
                ? this.props.selectedMessage['TestResult-Positive']
                : this.props.selectedMessage['TestResult-Inconclusive'];

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <CustomPopUpDailog
                    scaleAnimationDialogAlert={this.state.IsMessageShow}
                    PopUpContainerStyle={{
                        backgroundColor: Colors.patientColor,
                        alignItems: 'center',
                    }}
                    HeaderTitle=""
                    HeadTitleColor="#FFFFFF"
                    SingleButtonText={this.props.selectedMessage['Register-Close']}
                    SigleButtonBackground="#FFFFFF"
                    MessageColor="#FFFFFF"
                    SingleButtonTextColor={Colors.patientColor}
                    leftbuttonbordercolor="#FFFFFF"
                    leftbuttontextcolor="#FFFFFF"
                    rightbuttontextcolor={Colors.patientColor}
                    Rightbuttonbackgroundcolor="#FFFFFF"
                    AlertMessageTitle={this.state.Message}
                    _onRightButtonPress={this._CloseAlert.bind(this)}
                    hasSingleButton={true}
                />
                <CustomPopUpDailog
                    scaleAnimationDialogAlert={this.state.IsShowPopUp}
                    PopUpContainerStyle={{ backgroundColor: alertColor }}
                    HeaderTitle={this.props.selectedMessage['TestResult-PleaseConfirm']}
                    HeadTitleColor="#FFFFFF"
                    MessageColor="#FFFFFF"
                    leftbuttonbordercolor="#FFFFFF"
                    leftbuttontextcolor="#FFFFFF"
                    rightbuttontextcolor={alertColor}
                    Rightbuttonbackgroundcolor="#FFFFFF"
                    AlertMessageTitle={this.props.selectedMessage[
                        'TestResult-PatientConfirm'
                    ]
                        .toString()
                        .replace('(resultType)', testType)}
                    _onLeftButtonPress={this._CancelPress.bind(this)}
                    _onRightButtonPress={this._ConfirmPress.bind(this)}
                    LeftButtonText={this.props.selectedMessage['FacProfile-Cancel']}
                    RightButtonText={this.props.selectedMessage['FacProfile-Confirm']}
                />

                <CustomHeaderNew
                    HeaderColor={{ backgroundColor: Colors.white }}
                    onPressBackButton={this._goBackscreen.bind(this)}
                    HeaderTitle={
                        this.props.selectedMessage['TestResult-EnterTestResults']
                    }
                    LeftImage={Images.PurPleBackIcon}
                    textcolorHeader={Colors.patientColor}
                    Isshadow={true}
                />
                {/* {Platform.OS === 'ios' ? (
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                }}>
                                <Text
                                    style={[
                                        Helpers.bold,
                                        {
                                            marginLeft: 15,
                                            fontSize: 32,
                                            color: '#333333',
                                            textAlign: 'left',
                                            width: '90%',
                                            marginTop: 80,
                                        },
                                    ]}>
                                    {this.props.selectedMessage['TestResult-EnterTestResults']}
                                </Text>
                                <Text
                                    style={[
                                        Helpers.mediumBook,
                                        {
                                            marginLeft: 15,
                                            fontSize: 22,
                                            color: '#333333',
                                            textAlign: 'left',
                                            width: '90%',
                                            flexWrap: 'wrap',
                                        },
                                        Metrics.smallVerticalMargin,
                                    ]}>
                                    {
                                        this.props.selectedMessage[
                                        'RegPatient-StateAndUSGovernment'
                                        ]
                                    }
                                </Text>

                                <View
                                    style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={this._Detected.bind(this)}
                                        style={[
                                            Helpers.CardWithTwoOption,
                                            this.state.IsResultdetected
                                                ? { backgroundColor: 'red', borderColor: 'red' }
                                                : { backgroundColor: 'white', borderColor: 'red' },
                                        ]}>
                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                marginLeft: 15,
                                            }}>
                                            <Text
                                                style={[
                                                    Helpers.mediumFont,
                                                    Helpers.CardText,
                                                    this.state.IsResultdetected
                                                        ? { color: 'white' }
                                                        : { color: 'red' },
                                                ]}>
                                                {this.props.selectedMessage['TestResult-Positive']}
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                marginRight: 15,
                                            }}>
                                            <View
                                                style={{
                                                    height: 15,
                                                    width: 15,
                                                    borderRadius: 15 / 2,
                                                    borderWidth: 1.5,
                                                    borderColor: this.state.IsResultdetected
                                                        ? 'white'
                                                        : 'red',
                                                    backgroundColor: this.state.IsResultdetected
                                                        ? 'red'
                                                        : 'white',
                                                }}></View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                                    <TouchableOpacity
                                        style={[
                                            Helpers.CardWithTwoOption,
                                            this.state.IsResultUNdetected
                                                ? { backgroundColor: '#28998D', borderColor: '#28998D' }
                                                : { backgroundColor: 'white', borderColor: '#28998D' },
                                        ]}
                                        onPress={this._UnDetected.bind(this)}>
                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                marginLeft: 15,
                                            }}>
                                            <Text
                                                style={[
                                                    Helpers.mediumFont,
                                                    Helpers.CardText,
                                                    this.state.IsResultUNdetected
                                                        ? { color: 'white' }
                                                        : { color: '#28998D' },
                                                ]}>
                                                {this.props.selectedMessage['TestResult-Negative']}
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                marginRight: 15,
                                            }}>
                                            <View
                                                style={{
                                                    height: 15,
                                                    width: 15,
                                                    borderRadius: 15 / 2,
                                                    borderWidth: 1.5,
                                                    borderColor: this.state.IsResultUNdetected
                                                        ? 'white'
                                                        : '#28998D',
                                                    backgroundColor: this.state.IsResultUNdetected
                                                        ? '#28998D'
                                                        : 'white',
                                                }}></View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                                    <TouchableOpacity
                                        style={[
                                            Helpers.CardWithTwoOption,
                                            this.state.IsResultInconclusive
                                                ? { backgroundColor: '#614698', borderColor: '#614698' }
                                                : { backgroundColor: 'white', borderColor: '#614698' },
                                        ]}
                                        onPress={this._Inconclusive.bind(this)}>
                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                marginLeft: 15,
                                            }}>
                                            <Text
                                                style={[
                                                    Helpers.mediumFont,
                                                    Helpers.CardText,
                                                    this.state.IsResultInconclusive
                                                        ? { color: 'white' }
                                                        : { color: '#614698' },
                                                ]}>
                                                {this.props.selectedMessage['TestResult-Inconclusive']}
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                marginRight: 15,
                                            }}>
                                            <View
                                                style={{
                                                    height: 15,
                                                    width: 15,
                                                    borderRadius: 15 / 2,
                                                    borderWidth: 1.5,
                                                    borderColor: this.state.IsResultInconclusive
                                                        ? 'white'
                                                        : '#614698',
                                                    backgroundColor: this.state.IsResultInconclusive
                                                        ? '#614698'
                                                        : 'white',
                                                }}></View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    height: 150,
                                    justifyContent: 'center',
                                    width: '100%',
                                    marginTop: 20,
                                }}>
                                <View
                                    style={{
                                        width: '95%',
                                        height: 150,
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: this.state.IsResultInconclusive
                                            ? Colors.patientColor
                                            : this.state.IsResultUNdetected
                                                ? Colors.facilityColor
                                                : this.state.IsResultdetected
                                                    ? 'red'
                                                    : '#E5E5E5',
                                    }}>
                                    <TextInput
                                        style={
                                            ({
                                                height: 150,
                                                fontSize: 13,
                                                color: Colors.Black,
                                                width: '100%',
                                                marginLeft: 20,
                                                textAlignVertical: 'top',
                                            },
                                                Helpers.mediumFont)
                                        }
                                        multiline={true}
                                        placeholder={
                                            this.props.selectedMessage['TestResult-TestNote']
                                        }
                                        placeholderTextColor="#414141"
                                        onChangeText={(text) => {
                                            this.setState({ ResultComment: text });
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ height: 50, marginBottom: 100 }}></View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                ) : ( */}
                <View
                    style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, marginTop: 4 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                            }}>
                            <View
                                style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',

                                        width: '90%',
                                        height: 350,
                                        backgroundColor: 'white',
                                        borderRadius: 25,
                                        shadowOffset: { width: 0, height: 5, },
                                        shadowOpacity: 0.1,
                                        shadowColor: '#614698',
                                        elevation: 21,
                                    }}>
                                    <View>
                                        <Image
                                            resizeMode="cover"
                                            source={{
                                                uri: `data:image/jpeg;base64,${this.props.route?.params?.imageBase64}`,
                                            }}
                                            style={{
                                                overflow: 'hidden',
                                                height: 310,
                                                bottom: 10,
                                                borderTopLeftRadius: 25,
                                                borderTopRightRadius: 25
                                            }}
                                        ></Image>
                                    </View>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                        }}>
                                        <Text
                                            style={[
                                                Helpers.mediumFont,
                                                Helpers.CardText,

                                                { textAlign: 'center', fontSize: 15 },
                                            ]}>
                                            {this.props.selectedMessage['TestResult-Image']}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <Text
                                style={[
                                    Helpers.bold,
                                    {
                                        marginLeft: 15,
                                        marginVertical: 10,
                                        fontSize: 22,
                                        color: '#333333',
                                        textAlign: 'left',
                                        width: '90%',
                                        flexWrap: 'wrap',
                                    },
                                    Metrics.smallVerticalMargin,
                                ]}>
                                {this.props.selectedMessage['PatResult-MessgaeBody']}
                            </Text>

                            <View
                                style={[
                                    {
                                        flexDirection: 'row',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 10,
                                        marginVertical: 10,
                                    },
                                ]}>
                                <TouchableWithoutFeedback
                                    style={{ height: 135, width: '30%' }}
                                    onPress={this._Detected.bind(this)}>
                                    <View
                                        style={[
                                            Helpers.PatientCard,
                                            {
                                                height: 135,
                                                width: '30%',
                                                backgroundColor: '#FFFFFF',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                            },
                                            this.state.IsResultdetected
                                                ? { backgroundColor: 'red', borderColor: 'red' }
                                                : { backgroundColor: 'white', borderColor: 'red' },
                                        ]}>
                                        <Image
                                            style={{ height: 80, width: 80, marginBottom: 4 }}
                                            resizeMode="cover"
                                            source={Images.PositiveTestSample}
                                        />
                                        <Text
                                            style={[
                                                {
                                                    color: '#673ab7',
                                                    fontSize: 12,
                                                    width: 120,
                                                    textAlign: 'center',
                                                },
                                                Helpers.bold,
                                                this.state.IsResultdetected
                                                    ? { color: 'white' }
                                                    : { color: 'red' },
                                            ]}>
                                            {this.props.selectedMessage['TestResult-Positive']}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback
                                    style={{ height: 135, width: '30%' }}
                                    onPress={this._UnDetected.bind(this)}>
                                    <View
                                        style={[
                                            Helpers.PatientCard,
                                            {
                                                height: 135,
                                                width: '30%',
                                                backgroundColor: '#FFFFFF',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                            },
                                            this.state.IsResultUNdetected
                                                ? { backgroundColor: '#28998D', borderColor: '#28998D' }
                                                : { backgroundColor: 'white', borderColor: '#28998D' },
                                        ]}>
                                        <Image
                                            style={{ height: 80, width: 80, marginBottom: 4 }}
                                            resizeMode="cover"
                                            source={Images.NegativeTestSample}
                                        />

                                        <Text
                                            style={[
                                                {
                                                    color: '#673ab7',
                                                    fontSize: 12,
                                                    width: 120,
                                                    textAlign: 'center',
                                                },
                                                Helpers.bold,
                                                this.state.IsResultUNdetected
                                                    ? { color: 'white' }
                                                    : { color: '#28998D' },
                                            ]}>
                                            {this.props.selectedMessage['TestResult-Negative']}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback
                                    style={{ height: 135, width: '30%' }}
                                    onPress={this._Inconclusive.bind(this)}>
                                    <View
                                        style={[
                                            Helpers.PatientCard,
                                            {
                                                height: 135,
                                                width: '30%',
                                                backgroundColor: '#FFFFFF',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                            },
                                            this.state.IsResultInconclusive
                                                ? { backgroundColor: '#614698', borderColor: '#614698' }
                                                : { backgroundColor: 'white', borderColor: '#614698' },
                                        ]}>
                                        <Image
                                            style={{ height: 80, width: 80, marginBottom: 4 }}
                                            resizeMode="cover"
                                            source={Images.InconTestSample}
                                        />

                                        <Text
                                            style={[
                                                {
                                                    color: '#673ab7',
                                                    fontSize: 12,
                                                    width: 120,
                                                    textAlign: 'center',
                                                },
                                                Helpers.bold,
                                                this.state.IsResultInconclusive
                                                    ? { color: 'white' }
                                                    : { color: '#614698' },
                                            ]}>
                                            {this.props.selectedMessage['TestResult-Inconclusive']}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            {/* <View
                  style={{alignItems: 'center', width: '100%', marginTop: 20}}>
                  <TouchableOpacity
                    onPress={this._Detected.bind(this)}
                    style={[
                      Helpers.CardWithTwoOption,
                      this.state.IsResultdetected
                        ? {backgroundColor: 'red', borderColor: 'red'}
                        : {backgroundColor: 'white', borderColor: 'red'},
                      ,
                      {height: 140},
                    ]}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 15,
                        width: '100%',
                      }}>
                      <View>
                        <Image
                          source={Images.PositiveTestSample}
                          style={{height: 100, width: '100%'}}
                          resizeMode="stretch"></Image>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <Text
                          style={[
                            Helpers.mediumFont,
                            Helpers.CardText,
                            this.state.IsResultdetected
                              ? {color: 'white'}
                              : {color: 'red'},
                            {textAlign: 'center'},
                          ]}>
                          {this.props.selectedMessage['TestResult-Positive']}
                        </Text>
                      </View>
                      
                    </View>
                  </TouchableOpacity>
                </View> */}

                            {/* <View
                  style={{alignItems: 'center', width: '100%', marginTop: 20}}>
                  <TouchableOpacity
                    onPress={this._UnDetected.bind(this)}
                    style={[
                      Helpers.CardWithTwoOption,
                      this.state.IsResultUNdetected
                        ? {backgroundColor: '#28998D', borderColor: '#28998D'}
                        : {backgroundColor: 'white', borderColor: '#28998D'},
                      ,
                      {height: 140},
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding: 15,
                      }}>
                      <View style={{width: '40%'}}>
                        <Image
                          source={Images.NegativeTestSample}
                          style={{height: 100, width: 100}}></Image>
                      </View>
                      <View style={{width: '50%', justifyContent: 'center'}}>
                        <Text
                          style={[
                            Helpers.mediumFont,
                            Helpers.CardText,
                            this.state.IsResultUNdetected
                              ? {color: 'white'}
                              : {color: '#28998D'},
                            {textAlign: 'center'},
                          ]}>
                          {this.props.selectedMessage['TestResult-Negative']}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '10%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          //marginRight: 15,
                        }}>
                        <View
                          style={{
                            height: 15,
                            width: 15,
                            borderRadius: 15 / 2,
                            borderWidth: 1.5,
                            borderColor: this.state.IsResultUNdetected
                              ? 'white'
                              : '#28998D',
                            backgroundColor: this.state.IsResultUNdetected
                              ? '#28998D'
                              : 'white',
                          }}></View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View> */}

                            {/* <View
                  style={{alignItems: 'center', width: '100%', marginTop: 20}}>
                  <TouchableOpacity
                    onPress={this._Inconclusive.bind(this)}
                    style={[
                      Helpers.CardWithTwoOption,
                      this.state.IsResultInconclusive
                        ? {backgroundColor: '#614698', borderColor: '#614698'}
                        : {backgroundColor: 'white', borderColor: '#614698'},
                      {height: 140},
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding: 15,
                      }}>
                      <View style={{width: '40%'}}>
                        <Image
                          source={Images.InconTestSample}
                          style={{height: 100, width: 100}}></Image>
                      </View>
                      <View style={{width: '50%', justifyContent: 'center'}}>
                        <Text
                          style={[
                            Helpers.mediumFont,
                            Helpers.CardText,
                            this.state.IsResultInconclusive
                              ? {color: 'white'}
                              : {color: '#614698'},
                            {textAlign: 'center'},
                          ]}>
                          {
                            this.props.selectedMessage[
                              'TestResult-Inconclusive'
                            ]
                          }
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '10%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          //marginRight: 15,
                        }}>
                        <View
                          style={{
                            height: 15,
                            width: 15,
                            borderRadius: 15 / 2,
                            borderWidth: 1.5,
                            borderColor: this.state.IsResultInconclusive
                              ? 'white'
                              : '#614698',
                            backgroundColor: this.state.IsResultInconclusive
                              ? '#614698'
                              : 'white',
                          }}></View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View> */}
                        </View>

                        {/* <View
                style={{
                  flexDirection: 'row',
                  height: 150,
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '95%',
                    height: 150,
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: this.state.IsResultInconclusive
                      ? Colors.patientColor
                      : this.state.IsResultUNdetected
                      ? Colors.facilityColor
                      : this.state.IsResultdetected
                      ? 'red'
                      : '#E5E5E5',
                  }}>
                  <TextInput
                    style={
                      ({
                        height: 150,
                        width: '100%',
                        fontSize: 13,
                        color: Colors.Black,
                        width: '100%',
                        marginLeft: 20,
                        textAlignVertical: 'top',
                        backgroundColor: 'red',
                      },
                      Helpers.mediumFont)
                    }
                    multiline={true}
                    placeholder={
                      this.props.selectedMessage['TestResult-TestNote']
                    }
                    placeholderTextColor="#414141"
                    onChangeText={(text) => {
                      this.setState({ResultComment: text});
                    }}
                  />
                </View>
              </View> */}
                        <View style={{ height: 50, marginBottom: 100 }}></View>
                    </ScrollView>
                </View>
                {/* )} */}
                <View style={[Helpers.bottomView]}>
                    <View style={[Helpers.btnContainer, { marginBottom: 15 }]}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#614698', '#614698', '#614698']}
                            style={[Helpers.bigBtnGradient]}>
                            <TouchableOpacity
                                style={[Helpers.btn, { backgroundColor: Colors.patientColor }]}
                                disabled={this.state.loader ? true : false}
                                onPress={this._OpenPresSubmit.bind(this)}>
                                <Text
                                    style={[
                                        Helpers.btnText,
                                        { color: Colors.white, fontSize: 15 },
                                    ]}>
                                    {this.state.loader ? <ActivityIndicator color='#fff' size={50} /> : (this.props.selectedMessage['TestResult-SubmitTestResults'])}</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

PatientEnterResultScreen.propTypes = {
    authenticatedUser: PropTypes.object,
    addKitResult: PropTypes.func,
    addKitResultSuccessMessage: PropTypes.any,
    addKitResultErrorMessage: PropTypes.any,
    selectedMessage: PropTypes.any,
    selectedMessage: PropTypes.any,
};

// getting states from reducers
const mapStateToProps = (state) => ({
    authenticatedUser: state.authenticate.authenticatedUser,
    addKitResultSuccessMessage: state.facilityProfile.addKitResultSuccessMessage,
    addKitResultErrorMessage: state.facilityProfile.addKitResultErrorMessage,
    selectedMessage: state.startup.selectedMessage,
    patientAdhaarData: state.patientProfile.patientAdhaarData,
    patientMember_Id: state.patientProfile.patientMember_Id,
});

// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
    addKitResult: (data) => dispatch(FacilityProfileActions.addKitResult(data)),
    resetAddKitResult: () => dispatch(FacilityProfileActions.resetAddKitResult()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PatientEnterResultScreen);
