import React, { Component } from 'react';
import {
    StyleSheet,
    Text, Linking,
    View, Image,
    SafeAreaView, AppState
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme'
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'
import { Enums } from 'App/Enums'
import { ScrollView } from 'react-native-gesture-handler';

class MyQRCodeScreen extends ValidationComponent {
    constructor(props) {
        super(props);
        this._GetNotificationCount = this._GetNotificationCount.bind(this)
    }

    componentDidMount() {
        AppState.addEventListener("change", this._GetNotificationCount);
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this._GetNotificationCount);
    }

    _GetNotificationCount() {
        if (!(AppState.currentState == 'background')) {
            let { UserId } = this.props.authenticatedUser
            this.props.getNotificationCount({ UserId: UserId })
        }
    }

    _GotoEditProfileScreen() {
        let editProfileScreen = this.props.authenticatedUser?.UserRoleId == Enums.Patient ? 'EditProfileScreen' :
            this.props.authenticatedUser?.UserRoleId == Enums.Facility ? 'FacilityeditProfilescreen' : 'EditTesterScreen';

        if (this.props.authenticatedUser?.UserRoleId == Enums.Tester) {
            this.props.resetTesterForEdit()
            this.props.getTesterForEditSuccess(this.props.authenticatedUser)
        }
        NavigationService.navigate(editProfileScreen)
    }

    _GotoBackScreen() {
        NavigationService.popScreen()
    }

    _onPressDownloadQRcodeButton() {

        let Id = this.props.authenticatedUser?.UserRoleId == Enums.Patient ? this.props.authenticatedUser?.PatientId : this.props.authenticatedUser?.FacilityUserId
        let URL = "https://staging.covistix.com/mobile-qr-code/" + this.props.authenticatedUser?.UserRoleId + "/" + Id
        Linking.canOpenURL(URL)
            .then(supported => {
                if (supported) {
                    return Linking.openURL(URL);
                }
            })
            .catch(err => console.log(err));
    }

    formatPhoneNumber(phoneNumberString) {
        var cleaned = ("" + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})/);
        if (match) {
            var intlCode = (match[1] ? '(+52)' : '');
            return [intlCode, ' ', match[2], ' ', match[3], '-', match[4]].join('');
        }
        return match
    }

    renderPatient() {
        return (

            <View
                style={{
                    flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'center', marginTop: 30
                }}>

                {this.props.profilePic ?
                    <Image style={[Helpers.PharmacyPic, { borderRadius: 50, }]} resizeMode='cover'
                        source={{ uri: `data:image/jpeg;base64,${this.props.profilePic}` }} />
                    :
                    <Image style={[Helpers.PharmacyPic, { borderRadius: 50, }]} resizeMode='contain'
                        source={Images.UserImage} />
                }

                <Text style={[Helpers.bold,
                {
                    textTransform: 'capitalize', fontSize: 20,
                    color: '#3C4858', textAlign: 'center',
                    width: '100%', marginTop: 4
                }
                ]}>

                    {
                        this.props.authenticatedUser?.FirstName + " " + this.props.authenticatedUser?.LastName

                    }
                </Text>

                <Text style={[, { fontFamily: 'gothamrounded-book', fontSize: 16, color: '#8492A6', textAlign: 'center', width: '70%', marginTop: 4 }]}>
                    {this.props.authenticatedUser?.Address}
                </Text>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 7 }}>
                    <Image
                        source={Images.PurPleCallIcon}
                        style={Helpers.iconsmall}
                    />
                    <Text style={[Helpers.mediumFont, {
                        fontSize: 15, marginLeft: 7,
                        color: Colors.patientColor, textAlign: 'left',
                    }]}>
                        {this.formatPhoneNumber(this.props.authenticatedUser?.DisplayPhoneNo)}
                    </Text>
                </View>


            </View>

        )
    }

    renderTester() {


        return (


            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>

                <Image style={[Helpers.PharmacyPic, { borderRadius: 50, }]} resizeMode='contain'
                    source={Images.UserImagegreen} />
                <Text style={[Helpers.bold, { textTransform: 'capitalize', fontSize: 30, color: 'black', textAlign: 'center', width: '100%', marginTop: 4 }]}>

                    {
                        this.props.authenticatedUser?.FirstName + " " + this.props.authenticatedUser?.LastName

                    }
                </Text>


                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 7 }}>
                    <Image
                        source={this.props.authenticatedUser?.UserRoleId == Enums.Patient ? Images.PurPleCallIcon : Images.FacilityPhoneIcon}
                        style={Helpers.iconsmall}
                    />
                    <Text style={[Helpers.mediumFont, {
                        fontSize: 15, marginLeft: 7,
                        color: Colors.facilityColor, textAlign: 'left',
                    }]}>
                        {this.props.authenticatedUser?.DisplayPhoneNo}
                    </Text>
                </View>
                <Text style={[, { fontFamily: 'gothamrounded-book', fontSize: 17, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }]}>
                    {this.props.selectedMessage["Profile-CertifiedAt"]}
                </Text>
                <Text style={[, { fontFamily: 'gothamrounded-book', fontSize: 19, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }]}>
                    {this.props.authenticatedUser?.FacilityName}
                </Text>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 7 }}>
                    <Image
                        source={Images.FacilityPhoneIcon}
                        style={Helpers.iconsmall}
                    />
                    <Text style={[Helpers.mediumFont, {
                        fontSize: 15, marginLeft: 7,
                        color: this.props.authenticatedUser?.UserRoleId == Enums.Patient ? Colors.patientColor : Colors.facilityColor, textAlign: 'left',
                    }]}>
                        {this.props.authenticatedUser?.DisplayFacilityPhoneNo}
                    </Text>
                </View>
                <Text style={[, { fontFamily: 'gothamrounded-book', fontSize: 15, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }]}>
                    {this.props.selectedMessage["FacProfile-Note:ToChangeFacilityDetailsContactSorrentoDiagnostics"]}
                </Text>





            </View>

        )
    }


    renderFacility() {


        return (


            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>

                <Image style={[Helpers.PharmacyPic, { borderRadius: 50, }]} resizeMode='contain'
                    source={Images.UserImagegreen} />
                <Text style={[Helpers.bold, { textTransform: 'capitalize', fontSize: 30, color: 'black', textAlign: 'center', width: '100%', marginTop: 4 }]}>

                    {
                        this.props.authenticatedUser?.FirstName + " " + this.props.authenticatedUser?.LastName

                    }
                </Text>


                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 7 }}>
                    <Image
                        source={Images.FacilityPhoneIcon}
                        style={Helpers.iconsmall}
                    />
                    <Text style={[Helpers.mediumFont, {
                        fontSize: 15, marginLeft: 7,
                        color: Colors.facilityColor, textAlign: 'left',
                    }]}>
                        {this.props.authenticatedUser?.FacilityDisplayPhoneNo}
                    </Text>
                </View>
                <Text style={[, { fontFamily: 'gothamrounded-book', fontSize: 150, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }]}>
                    {this.props.authenticatedUser?.FacilityName}
                </Text>
                <Text style={[, { fontFamily: 'gothamrounded-book', fontSize: 15, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }]}>
                    {this.props.authenticatedUser?.Address}
                </Text>

                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 7 }}>
                    <Image
                        source={Images.FacilityPhoneIcon}
                        style={Helpers.iconsmall}
                    />
                    <Text style={[Helpers.mediumFont, {
                        fontSize: 15, marginLeft: 7,
                        color: Colors.facilityColor, textAlign: 'left',
                    }]}>
                        {this.props.authenticatedUser?.FacilityPhysicianDisplayPhoneNo}
                    </Text>
                </View>
                <Text style={[, { fontFamily: 'gothamrounded-book', fontSize: 15, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }]}>
                    {this.props.selectedMessage["FacProfile-Note:ToChangeFacilityDetailsContactSorrentoDiagnostics"]}

                </Text>

            </View>

        )
    }

    render() {
        return (
            <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                    {this.renderPatient()}

                    <View style={{ width: '100%', overflow: 'scroll', height: '60%', backgroundColor: 'transparent', alignItems: 'center', marginTop: '12%' }}>
                        <View style={{ backgroundColor: 'transparent', borderRadius: 20, width: 190, height: 190, overflow: 'hidden' }}>
                            <View style={{
                                width: 180, height: 180, justifyContent: 'center', alignItems: 'center',

                                backgroundColor: '#fdfdfd',
                                borderRadius: 10,
                                shadowColor: '#000',
                                shadowOffset: { width: 1, height: 1 },
                                shadowOpacity: 0.4,
                                shadowRadius: 15,
                                elevation: 25,
                            }}>

                                <QRCode
                                    color={Colors.patientColor}
                                    value={this.props.authenticatedUser?.QRCode}
                                    logoSize={300}
                                    logoBackgroundColor='transparent'
                                />

                            </View>
                        </View>
                        <Text style={[Helpers.mediumFont, { fontSize: 16, color: '#3C4858', width: '68%', textAlign: 'center', marginTop: 33 }]}>
                            {/* {"*Show this to the registered tester at facility when asked"} */}
                            {this.props.selectedMessage["PatientDashboard-RegisteredTesterAtfacilityText"]}
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

MyQRCodeScreen.propTypes = {
    authenticatedUser: PropTypes.any,
    signOut: PropTypes.func,
    selectedMessage: PropTypes.any,
    getTesterForEditSuccess: PropTypes.func,
    resetTesterForEdit: PropTypes.func,
    getUserDetailById: PropTypes.func,
    getNotificationCount: PropTypes.func,
    profilePic: PropTypes.any,
}


const mapStateToProps = (state) => ({
    authenticatedUser: state.authenticate.authenticatedUser,
    selectedMessage: state.startup.selectedMessage,
    profilePic: state.authenticate.profilePic,

})

const mapDispatchToProps = (dispatch) => ({
    // signOut: () => dispatch(AuthenticateActions.signOut()),
    //getTesterForEditSuccess: (data) => dispatch(FacilityProfileActions.getTesterForEditSuccess(data)),
    // resetTesterForEdit:()=>dispatch(FacilityProfileActions.resetTesterForEdit()),
    getUserDetailById: (data) => dispatch(AuthenticateActions.getUserDetailById(data)),
    getNotificationCount: (data) => dispatch(AuthenticateActions.getNotificationCount(data)),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyQRCodeScreen)

const styles = StyleSheet.create({

});
