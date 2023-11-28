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
    SafeAreaView
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
import { Enums, SubjectsEnum, EmailEnum } from 'App/Enums';
import { Config } from 'App/Config';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
import CustomPhoneInput from 'App/Components/CustomPhoneInput';

class PhoneSignupScreen extends ValidationComponent {
    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
            IsMessageShow: false,
            Message: '',
            animation: new Animated.Value(0),
            oldPasscode: '',
            inputs: {
                emailId: {
                    type: 'email',
                    value: '',
                    touched: false,
                },
                phoneNumber: {
                    type: 'phone',
                    value: '',
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
        this.mask = '+52 [000] [000]-[0000]';
    }

    renderError(id) {
        const { inputs } = this.state;
        if (id == 'phoneNumber')
            if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
                return true;
            }
        return false;
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
        this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
            this.setState({ isFocused: true })
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this.setState({ isFocused: false })
        });
    }

    _onPressCloseButton() {
        this.RBSheet.close();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.phoneExistErrorMessage != null &&
            prevProps.phoneExistErrorMessage != this.props.phoneExistErrorMessage && this.state.IsMessageShow === false && this.state.isFocused
        ) {
            const message = this.props.selectedMessage[
                this.props.phoneExistErrorMessage
            ];
            this.setState({ IsMessageShow: true, Message: message });
        }
    }

    _onPressSignUp() {
        if (this.state.inputs.phoneNumber.value == '' || this.renderError('phoneNumber')) {
            return;
        }
        const { inputs } = this.state;
        let _API_URL = Config.API_URL;
        let phoneNumber = inputs['phoneNumber'].value
            .replace(/\s/g, '')
            .replace(/-/g, '')
            .replace(/\(|\)/g, '');
        this.props.checkPhoneExist({
            URL: _API_URL,
            PhoneNo: phoneNumber,
            IsComeFrom: Enums.SignUp,
            EmailPayload: {
                Email: '',
                Subject:
                    this.props.locale == 'en'
                        ? SubjectsEnum.VerificationCode
                        : SubjectsEnum.VerificationCodeSpanish,
                EmailType: EmailEnum.EmailVerify,
                Params: { Passcode: '', URL: Config.ImageURL, SMSURL: Config.SMSFrontURL },
                PhoneNo: this.state.inputs.phoneNumber.value,
                IsComeFrom: Enums.SignUp
            }
        });
    }

    _CloseAlert() {
        this.setState({ IsMessageShow: false });
    }
    _onPressPasscodeVerify() {
        if (this.state.isValid) {
            let screenName =
                this.props.accountType == Enums.Facility
                    ? 'FacilityContanctPersonProfile'
                    : 'BuildProfileScreen';
            NavigationService.navigate(screenName, { Phone: this.state.inputs.phoneNumber.value });
        }
    }
    onChangeVerifyCodeText(value) {
        if (value == this.state.oldPasscode) {
            this.setState({ isValid: true, verificationCode: value, touched: true });
            this.props.saveRegistration({
                PhoneNo: this.state.inputs.phoneNumber.value,
                Password: '',
                UserRoleId: Enums.Patient,
                DecryptColumns: '',
            });
        } else {
            this.setState({ isValid: false, verificationCode: value, touched: true });
        }
    }

    renderCreateForm() {
        const IsFacility = this.props.accountType === Enums.Facility;
        return (
            <View>
                {/* <View style={[ApplicationStyles.header]}>
                    <View>
                        <Image
                            style={{ height: 120, width: 120 }}
                            resizeMode="cover"
                            source={Images.MainLogo}
                        />
                    </View>
                </View> */}
                <View style={[ApplicationStyles.header, { height: '6%' }]}></View>

                <View
                    style={{
                        height: 500,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <CustomPhoneInput
                        containerStyle={[
                            Helpers.RectangletxtInputContainer,
                            this.state.inputs['phoneNumber'].touched
                                ? this.renderError('phoneNumber')
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
                            this.props.selectedMessage['RegisterProfile-PhoneNumber']
                        }
                        mask={this.mask}
                        placeholderTextColor="#BDBDBD"
                        keyboardType="phone-pad"
                        onChangeText={(formatted, extracted) => {
                            this.onInputChange({ id: 'phoneNumber', value: '+52' + extracted })
                        }}
                        value={this.state.inputs.phoneNumber.value}
                        componentStyle={[Helpers.column, Helpers.crossStart]}
                        rightIconStyle={[Helpers.rightIconStyle]}
                        inputBoxLableStyle={[Helpers.inputBoxLable]}
                        hasEvent={false}
                        hasRightIcon={true}
                        rightIcon={
                            this.state.inputs['phoneNumber'].touched
                                ? this.renderError('phoneNumber')
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
                                        this.state.inputs.phoneNumber.value == ''
                                            ? '#C2CEDB'
                                            : IsFacility
                                                ? Colors.facilityColor
                                                : Colors.patientColor,
                                },
                            ]}
                            onPress={
                                this.state.inputs.phoneNumber.value == ''
                                    ? null
                                    : this._onPressSignUp.bind(this)
                            }
                        >
                            <Text
                                style={[
                                    Helpers.btnText,
                                    { color: Colors.white, fontSize: Fonts.regular16 },
                                ]}>
                                {this.props.selectedMessage['Register-SignUp']}{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={[
                            Helpers.rowMain,
                            { marginTop: 20, marginBottom: 25, height: 45 },
                        ]}>
                        <Text
                            style={[
                                Helpers.btnText,
                                Helpers.mediumFont,
                                { color: Colors.Black, fontSize: 14, textAlign: 'center' },
                            ]}>
                            {' '}
                            {this.props.selectedMessage['Register-AlreadyHaveAnAccount']}{' '}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                NavigationService.navigate('LoginWithPhoneOREmail', { isFromLogin: true });
                            }}>
                            <Text
                                style={[
                                    Helpers.btnText,
                                    Helpers.mediumFont,
                                    {
                                        color: IsFacility ? Colors.blueColor : Colors.facilityColor,
                                        fontSize: 14,
                                        textAlign: 'left',
                                    },
                                ]}>
                                {' '}
                                {this.props.selectedMessage['AccountLogin-Login']}{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const IsFacility = this.props.accountType === Enums.Facility;

        return Platform.OS === 'ios' ? (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[Helpers.fill, { backgroundColor: Colors.white }]}>
                <CustomPopUpDailog
                    onHardwareBackPress={() => {
                        this.setState({ IsMessageShow: false });
                        return true;
                    }}
                    scaleAnimationDialogAlert={this.state.IsMessageShow}
                    PopUpContainerStyle={{
                        backgroundColor: '#F5B100',
                        alignItems: 'center',
                    }}
                    HeaderTitle={this.props.selectedMessage["AccountLogin-Alert"]}
                    HeadTitleColor="#FFFFFF"
                    SingleButtonText={this.props.selectedMessage['Register-Okay']}
                    SigleButtonBackground="white"
                    MessageColor="#FFFFFF"
                    SingleButtonTextColor="#F5B100"
                    leftbuttonbordercolor="#F5B100"
                    AlertMessageTitle={this.state.Message}
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
                {this.renderCreateForm()}
            </KeyboardAvoidingView>
        ) : (
            <SafeAreaView style={[Helpers.fill, { backgroundColor: Colors.white }]}>
                <CustomPopUpDailog
                    scaleAnimationDialogAlert={this.state.IsMessageShow}
                    PopUpContainerStyle={{
                        backgroundColor: '#F5B100',
                        alignItems: 'center',
                    }}
                    HeaderTitle={this.props.selectedMessage['AccountLogin-Alert']}
                    HeadTitleColor="#FFFFFF"
                    SingleButtonText={this.props.selectedMessage['Register-Okay']}
                    SigleButtonBackground="white"
                    MessageColor="#FFFFFF"
                    SingleButtonTextColor="#F5B100"
                    leftbuttonbordercolor="#F5B100"
                    AlertMessageTitle={this.state.Message}
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
                    {this.renderCreateForm()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

PhoneSignupScreen.propTypes = {
    authenticatedIsLoading: PropTypes.bool,
    emailExistErrorMessage: PropTypes.string,
    accountType: PropTypes.number,
    checkPhoneExist: PropTypes.func,
    resetEmailExistingStates: PropTypes.func,
    selectedMessage: PropTypes.any,
    sendVerifyCode: PropTypes.func,
    saveRegistration: PropTypes.func,
    authenticateUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
    phoneExistErrorMessage: state.authenticate.phoneExistErrorMessage,
    authenticatedUser: state.authenticate.authenticatedUser,
    authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
    emailExistErrorMessage: state.authenticate.emailExistErrorMessage,
    accountType: state.authenticate.accountType,
    selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
    checkPhoneExist: (data) =>
        dispatch(AuthenticateActions.checkPhoneExist(data)),
    resetEmailExistingStates: () =>
        dispatch(AuthenticateActions.resetEmailExistingStates()),
    sendVerifyCode: (data) => dispatch(AuthenticateActions.sendVerifyCode(data)),
    saveRegistration: (data) =>
        dispatch(AuthenticateActions.saveRegistration(data)),
    authenticateUser: (data) =>
        dispatch(AuthenticateActions.authenticateUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneSignupScreen);

const styles = StyleSheet.create({});
