import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Animated,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import ValidationComponent from 'react-native-form-validator';
import {
    Colors,
    Fonts,
    Images,
    Helpers,
    ApplicationStyles,
} from 'App/Theme';
import NavigationService from 'App/Services/NavigationService';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CustomInputBox from 'App/Components/CustomInputBox';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import { ValidationService } from 'App/Services/ValidationService';
import {
    Enums,
    EmailEnum,
    SubjectsEnum,
} from 'App/Enums';
import { Config } from 'App/Config';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import CustomPhoneInput from 'App/Components/CustomPhoneInput';

class PhoneOTPScreen extends ValidationComponent {
    constructor(props) {
        super(props);
        const { Code, IsComeFrom, Email, PhoneNo } = this.props.route.params || {};
        this.state = {
            IsMessageShow: false,
            Message: '',
            animation: new Animated.Value(0),
            oldPasscode: Code,
            IsComeFrom: IsComeFrom,
            inputs: {
                emailId: {
                    type: 'email',
                    value: Email,
                    touched: false,
                },
                phoneNumber: {
                    type: 'phone',
                    value: PhoneNo,
                },
                password: {
                    type: 'password',
                    value: '',
                    touched: false,
                },
            },
        };
        super.labels = {
            password: 'Password',
            userName: 'User Name',
        };
        this.onInputChange = ValidationService.onInputChange.bind(this);
        this.getFormValidation = ValidationService.getFormValidation.bind(this);
        this.isFormValid = ValidationService.isFormValid.bind(this);
    }

    componentWillUnmount() {
        this.setState({ IsMessageShow: false });
    }

    submit() {
        this.props.resetEmailExistingStates();
        const firstInvalidCoordinate = this.getFormValidation();
        if (firstInvalidCoordinate !== null) {
            return;
        }
        // if we make it to this point, we can actually submit the form
    }
    componentDidMount() {
        this.props.resetEmailExistingStates();
    }

    _onPressCloseButton() {
        this.RBSheet.close();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.verificationCodeErrorMessage != null &&
            prevProps.verificationCodeErrorMessage != this.props.verificationCodeErrorMessage && this.state.IsMessageShow
        ) {
            const message = this.props.selectedMessage[
                this.props.verificationCodeErrorMessage
            ];
            this.setState({ IsMessageShow: true, Message: message });
        }
    }

    _CloseAlert() {
        this.setState({ IsMessageShow: false });
    }
    _onPressPasscodeVerify() {
        if (this.state.isValid) {
            console.log(this.state.IsComeFrom, "this.state.IsComeFrom")
            if (this.state.IsComeFrom == Enums.LogIn) {
                const { inputs } = this.state;
                this.props.authenticateUserByPhone({
                    Phone: inputs['phoneNumber'].value.trim(),
                    IsComeFrom: this.state.IsComeFrom,
                    DecryptColumns: ''
                });
            } else if (this.state.IsComeFrom == Enums.SignUp) {
                let screenName =
                    this.props.accountType == Enums.Facility
                        ? 'FacilityContanctPersonProfile'
                        : 'BuildProfileScreen';
                NavigationService.navigate(screenName, { Phone: this.state.inputs.phoneNumber.value });
            }
        }
        return false
    }

    onChangeVerifyCodeText(value) {
        if (value == this.state.oldPasscode) {
            this.setState({ isValid: true, verificationCode: value, touched: true });

        } else {
            this.setState({ isValid: false, verificationCode: value, touched: true });
        }
    }

    render() {
        const IsFacility = this.props.accountType === Enums.Facility;

        return Platform.OS === 'ios' ? (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[Helpers.fill, { backgroundColor: Colors.white }]}>
                <CustomPopUpDailog
                    scaleAnimationDialogAlert={this.state.IsMessageShow}
                    PopUpContainerStyle={{
                        backgroundColor: '#F5B100',
                        alignItems: 'center',
                    }}
                    HeaderTitle="Email Already Exists"
                    HeadTitleColor="#FFFFFF"
                    SingleButtonText={this.props.selectedMessage['Register-Okay']}
                    SigleButtonBackground="white"
                    MessageColor="#FFFFFF"
                    SingleButtonTextColor="#F5B100"
                    leftbuttonbordercolor="#F5B100"
                    AlertMessageTitle={
                        this.props.selectedMessage[
                        'CreateNewTesterScreen-PleaseSelectAnotherEmail'
                        ]
                    }
                    _onRightButtonPress={this._CloseAlert.bind(this)}
                    hasSingleButton={true}
                />

                <Dialog
                    dialogStyle={{ backgroundColor: 'transparent' }}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    style={{ backgroundColor: 'transparent' }}
                    visible={this.props.authenticatedIsLoading}>
                    <DialogContent style={{ backgroundColor: 'transparent' }}>
                        <View style={{ backgroundColor: 'transparent' }}>
                            <Image
                                source={Images.Loaderimg}
                                style={{
                                    alignItems: 'center',
                                    resizeMode: 'center',
                                    marginTop: 17,
                                }}
                            />
                        </View>
                    </DialogContent>
                </Dialog>
                <RBSheet
                    ref={(ref) => {
                        this.RBSheet = ref;
                    }}
                    height={400}
                    openDuration={250}
                    customStyles={{
                        container: {
                            backgroundColor: Colors.WarningYellow,
                        },
                    }}>
                    <View style={[{ marginTop: 40, width: '100%' }]}>
                        <View style={{ flexDirection: 'row', height: 50, marginLeft: 30 }}>
                            <Image
                                style={[Helpers.iconsmall, { marginRight: 5, marginTop: 5 }]}
                                resizeMode="contain"
                                source={Images.WhiteInfoIcon}
                            />
                            <Text
                                style={[
                                    Helpers.btnText,
                                    Helpers.mediumFont,
                                    { color: Colors.white, fontSize: 18, textAlign: 'center' },
                                ]}>
                                {' '}
                                {this.props.selectedMessage['Register-PasswordRequirements']}
                            </Text>
                        </View>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                {
                                    color: Colors.white,
                                    fontSize: 14,
                                    textAlign: 'left',
                                    marginLeft: 30,
                                },
                            ]}>
                            {this.props.selectedMessage['Register-MustContainCharacters']}
                        </Text>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                {
                                    color: Colors.white,
                                    fontSize: 14,
                                    textAlign: 'left',
                                    marginLeft: 30,
                                    marginTop: 10,
                                },
                            ]}>
                            {this.props.selectedMessage['Register-1LowercaseLetter']}
                        </Text>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                {
                                    color: Colors.white,
                                    fontSize: 14,
                                    textAlign: 'left',
                                    marginLeft: 30,
                                    marginTop: 10,
                                },
                            ]}>
                            {this.props.selectedMessage['Register-1UppercaseLetter']}{' '}
                        </Text>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                {
                                    color: Colors.white,
                                    fontSize: 14,
                                    textAlign: 'left',
                                    marginLeft: 30,
                                    marginTop: 10,
                                },
                            ]}>
                            {this.props.selectedMessage['Register-1Number']}
                        </Text>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                {
                                    color: Colors.white,
                                    fontSize: 14,
                                    textAlign: 'left',
                                    marginLeft: 30,
                                    marginTop: 10,
                                },
                            ]}>
                            {this.props.selectedMessage['Register-1Symbol']}
                        </Text>

                        <View
                            style={[Helpers.btnContainer, { marginTop: 18, marginBottom: 12 }]}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                                style={[Helpers.bigBtnGradient, { width: '90%' }]}>
                                <TouchableOpacity
                                    style={Helpers.btn}
                                    onPress={this._onPressCloseButton.bind(this)}
                                >
                                    <Text
                                        style={[
                                            Helpers.btnText,
                                            Helpers.mediumFont,
                                            { color: '#F5B100', fontSize: Fonts.regular16 },
                                        ]}>
                                        {this.props.selectedMessage['Register-Okay']}
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </RBSheet>
                <View>
                    <View style={[ApplicationStyles.header]}>
                        <View>
                            <Image
                                style={{ height: 120, width: 120 }}
                                resizeMode="cover"
                                source={Images.MainLogo}
                            />
                        </View>
                    </View>
                    <View style={[ApplicationStyles.header, { height: '6%' }]}></View>

                    <View
                        style={{
                            height: 500,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={[
                                Helpers.btnText,
                                { color: 'black', fontSize: Fonts.regular16 },
                            ]}>
                            {this.props.selectedMessage['RegisterVerifyPhone-Verification']}
                        </Text>

                        <CustomInputBox
                            containerStyle={[
                                Helpers.RectangletxtInputContainer,
                                this.state.touched
                                    ? !this.state.isValid
                                        ? { borderColor: Colors.error }
                                        : {
                                            borderColor: IsFacility
                                                ? Colors.facilityColor
                                                : Colors.patientColor,
                                        }
                                    : { borderColor: '#BDBDBD' },
                            ]}
                            inputBoxstyle={[
                                Helpers.txtRoundInputs,
                                Helpers.fill,
                                { color: IsFacility ? Colors.facilityColor : Colors.patientColor },
                            ]}
                            placeholder={
                                this.props.selectedMessage[
                                'RegisterVerifyMail-EnterThe6DigitsPasscode'
                                ]
                            }
                            placeholderTextColor={Colors.placeholderGraycolor}
                            onChangeText={this.onChangeVerifyCodeText.bind(this)}
                            value={this.state.verificationCode}
                            maxLength={6}
                            componentStyle={[Helpers.column, Helpers.crossStart]}
                            rightIconStyle={[Helpers.rightIconStyle]}
                            inputBoxLableStyle={[Helpers.inputBoxLable]}
                            hasEvent={false}
                            hasRightIcon={true}
                            keyboardType={'numeric'}
                            rightIcon={
                                this.state.touched
                                    ? !this.state.isValid
                                        ? Images.InValid
                                        : IsFacility
                                            ? Images.ValidGreen
                                            : Images.ValidPurple
                                    : null
                            }
                        />

                        <View style={[Helpers.btnContainer, { marginTop: 35 }]}>
                            <TouchableOpacity
                                style={[
                                    Helpers.btn,
                                    {
                                        width: '90%',
                                        backgroundColor:
                                            this.state.verificationCode == ''
                                                ? '#C2CEDB'
                                                : IsFacility
                                                    ? Colors.facilityColor
                                                    : Colors.patientColor,
                                    },
                                ]}
                                onPress={
                                    this.state.verificationCode == ''
                                        ? null
                                        : this._onPressPasscodeVerify.bind(this)
                                }>
                                <Text
                                    style={[
                                        Helpers.btnText,
                                        { color: Colors.white, fontSize: Fonts.regular16 },
                                    ]}>
                                    {this.props.selectedMessage['AccountForgotPassword-VerifyPasscode']}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        ) : (
            <SafeAreaView style={[Helpers.fill, { backgroundColor: Colors.white }]}>
                <CustomPopUpDailog
                    scaleAnimationDialogAlert={this.state.IsMessageShow}
                    PopUpContainerStyle={{
                        backgroundColor: '#F5B100',
                        alignItems: 'center',
                    }}
                    HeaderTitle={this.props.selectedMessage['Register-EmailAlreadyExist']}
                    HeadTitleColor="#FFFFFF"
                    SingleButtonText={this.props.selectedMessage['Register-Okay']}
                    SigleButtonBackground="white"
                    MessageColor="#FFFFFF"
                    SingleButtonTextColor="#F5B100"
                    leftbuttonbordercolor="#F5B100"
                    AlertMessageTitle={
                        this.props.selectedMessage[
                        'CreateNewTesterScreen-PleaseSelectAnotherEmail'
                        ]
                    }
                    _onRightButtonPress={this._CloseAlert.bind(this)}
                    hasSingleButton={true}
                />

                <Dialog
                    dialogStyle={{ backgroundColor: 'transparent' }}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    style={{ backgroundColor: 'transparent' }}
                    visible={this.props.authenticatedIsLoading}>
                    <DialogContent style={{ backgroundColor: 'transparent' }}>
                        <View style={{ backgroundColor: 'transparent' }}>
                            <Image
                                source={Images.Loaderimg}
                                style={{
                                    alignItems: 'center',
                                    resizeMode: 'center',
                                    marginTop: 17,
                                }}
                            />
                        </View>
                    </DialogContent>
                </Dialog>

                <RBSheet
                    ref={(ref) => {
                        this.RBSheet = ref;
                    }}
                    height={400}
                    openDuration={250}
                    customStyles={{
                        container: {
                            backgroundColor: Colors.WarningYellow,
                        },
                    }}>
                    <View style={[{ marginTop: 40, width: '100%' }]}>
                        <View style={{ flexDirection: 'row', height: 50, marginLeft: 30 }}>
                            <Image
                                style={[Helpers.iconsmall, { marginRight: 5, marginTop: 5 }]}
                                resizeMode="contain"
                                source={Images.WhiteInfoIcon}
                            />
                            <Text
                                style={[
                                    Helpers.btnText,
                                    Helpers.mediumFont,
                                    { color: Colors.white, fontSize: 18, textAlign: 'center' },
                                ]}>
                                {' '}
                                {this.props.selectedMessage['Register-PasswordRequirements']}
                            </Text>
                        </View>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                {
                                    color: Colors.white,
                                    fontSize: 14,
                                    textAlign: 'left',
                                    marginLeft: 30,
                                },
                            ]}>
                            {this.props.selectedMessage['Register-MustContainCharacters']}
                        </Text>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                {
                                    color: Colors.white,
                                    fontSize: 14,
                                    textAlign: 'left',
                                    marginLeft: 30,
                                    marginTop: 10,
                                },
                            ]}>
                            {this.props.selectedMessage['Register-1LowercaseLetter']}
                        </Text>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                {
                                    color: Colors.white,
                                    fontSize: 14,
                                    textAlign: 'left',
                                    marginLeft: 30,
                                    marginTop: 10,
                                },
                            ]}>
                            {this.props.selectedMessage['Register-1UppercaseLetter']}{' '}
                        </Text>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                {
                                    color: Colors.white,
                                    fontSize: 14,
                                    textAlign: 'left',
                                    marginLeft: 30,
                                    marginTop: 10,
                                },
                            ]}>
                            {this.props.selectedMessage['Register-1Number']}
                        </Text>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                {
                                    color: Colors.white,
                                    fontSize: 14,
                                    textAlign: 'left',
                                    marginLeft: 30,
                                    marginTop: 10,
                                },
                            ]}>
                            {this.props.selectedMessage['Register-1Symbol']}
                        </Text>

                        <View
                            style={[Helpers.btnContainer, { marginTop: 18, marginBottom: 12 }]}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                                style={[Helpers.bigBtnGradient, { width: '90%' }]}>
                                <TouchableOpacity
                                    style={Helpers.btn}
                                    onPress={this._onPressCloseButton.bind(this)}
                                >
                                    <Text
                                        style={[
                                            Helpers.btnText,
                                            Helpers.mediumFont,
                                            { color: '#F5B100', fontSize: Fonts.regular16 },
                                        ]}>
                                        {this.props.selectedMessage['Register-Okay']}
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </RBSheet>

                <ScrollView style={{ flex: 1 }}>
                    <View>
                        <View style={[ApplicationStyles.header]}>
                            <View>
                                <Image
                                    style={{ height: 120, width: 120 }}
                                    resizeMode="cover"
                                    source={Images.MainLogo}
                                />
                            </View>
                        </View>
                        <View style={[ApplicationStyles.header, { height: '6%' }]}></View>

                        <View
                            style={{
                                height: 500,
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={[
                                    Helpers.btnText,
                                    { color: 'black', fontSize: Fonts.regular16 },
                                ]}>
                                {this.props.selectedMessage['RegisterVerifyPhone-Verification']}
                            </Text>

                            <CustomInputBox
                                containerStyle={[
                                    Helpers.RectangletxtInputContainer,
                                    this.state.touched
                                        ? !this.state.isValid
                                            ? { borderColor: Colors.error }
                                            : {
                                                borderColor: IsFacility
                                                    ? Colors.facilityColor
                                                    : Colors.patientColor,
                                            }
                                        : { borderColor: '#BDBDBD' },
                                ]}
                                inputBoxstyle={[
                                    Helpers.txtRoundInputs,
                                    Helpers.fill,
                                    { color: IsFacility ? Colors.facilityColor : Colors.patientColor },
                                ]}
                                placeholder={
                                    this.props.selectedMessage[
                                    'RegisterVerifyMail-EnterThe6DigitsPasscode'
                                    ]
                                }
                                placeholderTextColor={Colors.placeholderGraycolor}
                                onChangeText={this.onChangeVerifyCodeText.bind(this)}
                                value={this.state.verificationCode}
                                maxLength={6}
                                componentStyle={[Helpers.column, Helpers.crossStart]}
                                rightIconStyle={[Helpers.rightIconStyle]}
                                inputBoxLableStyle={[Helpers.inputBoxLable]}
                                hasEvent={false}
                                hasRightIcon={true}
                                keyboardType={'numeric'}
                                rightIcon={
                                    this.state.touched
                                        ? !this.state.isValid
                                            ? Images.InValid
                                            : IsFacility
                                                ? Images.ValidGreen
                                                : Images.ValidPurple
                                        : null
                                }
                            />

                            <View style={[Helpers.btnContainer, { marginTop: 35 }]}>
                                <TouchableOpacity
                                    style={[
                                        Helpers.btn,
                                        {
                                            width: '90%',
                                            backgroundColor:
                                                this.state.verificationCode == ''
                                                    ? '#C2CEDB'
                                                    : IsFacility
                                                        ? Colors.facilityColor
                                                        : Colors.patientColor,
                                        },
                                    ]}
                                    onPress={
                                        this.state.verificationCode == ''
                                            ? null
                                            : this._onPressPasscodeVerify.bind(this)
                                    }>
                                    <Text
                                        style={[
                                            Helpers.btnText,
                                            { color: Colors.white, fontSize: Fonts.regular16 },
                                        ]}>
                                        {this.props.selectedMessage['AccountForgotPassword-VerifyPasscode']}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

PhoneOTPScreen.propTypes = {
    authenticatedIsLoading: PropTypes.bool,
    verificationCodeErrorMessage: PropTypes.string,
    accountType: PropTypes.number,
    checkEmailExist: PropTypes.func,
    resetEmailExistingStates: PropTypes.func,
    selectedMessage: PropTypes.any,
    sendVerifyCode: PropTypes.func,
    saveRegistration: PropTypes.func,
    authenticateUserByPhone: PropTypes.func,
};

const mapStateToProps = (state) => ({
    authenticatedUser: state.authenticate.authenticatedUser,
    authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
    verificationCodeErrorMessage: state.authenticate.verificationCodeErrorMessage,
    accountType: state.authenticate.accountType,
    selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
    checkEmailExist: (data) =>
        dispatch(AuthenticateActions.checkEmailExist(data)),
    resetEmailExistingStates: () =>
        dispatch(AuthenticateActions.resetEmailExistingStates()),
    sendVerifyCode: (data) => dispatch(AuthenticateActions.sendVerifyCode(data)),
    saveRegistration: (data) =>
        dispatch(AuthenticateActions.saveRegistration(data)),
    authenticateUserByPhone: (data) =>
        dispatch(AuthenticateActions.authenticateUserByPhone(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneOTPScreen);

const styles = StyleSheet.create({});


