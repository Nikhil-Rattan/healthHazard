import React, { Component } from 'react';
import {
    StyleSheet,
    Text, Linking,
    View,
    TouchableHighlight, TouchableOpacity,
    Image, TextInput,
    Alert, SearchBar,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAvoidingView } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Metrics, Helpers, ApplicationStyles } from 'App/Theme'

import Dialog, { DialogContent } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'
import ListCard from 'App/Components/ListCard';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import CustomSearchTextbox from 'App/Components/CustomSearchTextbox';
import { Enums } from 'App/Enums'
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions'
class ProfileScreen extends ValidationComponent {
    constructor(props) {
        super(props);

    }



    componentDidMount() {
        let { authenticatedUser } = this.props
        this.props.getUserDetailById({ UserId: authenticatedUser.UserId, UserKey: authenticatedUser.UserKey, IsComeFrom: Enums.UpdateUserScreen, UserRoleId: authenticatedUser.UserRoleId })

        // setTimeout(() => {
        //   this.RBSheet.open()
        //   }, 500);


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



    renderPatient() {


        return (


            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>

                <Image style={[Helpers.PharmacyPic, { borderRadius: 50, }]} resizeMode='contain'
                    source={Images.UserImage} />
                <Text style={[Helpers.bold, { fontSize: 30, color: 'black', textAlign: 'center', width: '100%', marginTop: 4 }]}>

                    {
                        this.props.authenticatedUser?.FirstName + " " + this.props.authenticatedUser?.LastName

                    }
                </Text>

                <Text style={[, { fontSize: 15, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }, Helpers.lightBook,]}>
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
                        {this.props.authenticatedUser?.DisplayPhoneNo}
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
                <Text style={[Helpers.mediumFont, { fontSize: 25, color: '#152C52', textAlign: 'center', width: '100%', marginTop: 4 }]}>

                    {
                        this.props.authenticatedUser?.FirstName + " " + this.props.authenticatedUser?.LastName

                    }
                </Text>
                <Text style={[Helpers.mediumFont, { fontSize: 15, marginLeft: 20, width: '100%', color: Colors.DisableGrayColor, textAlign: 'left', marginTop: 20 }]}>

                    {this.props.selectedMessage["FacilityMenu-FacilityInformation"]}
                </Text>

                <Text style={[Helpers.bold, { fontSize: 18, color: Colors.facilityColor, marginLeft: 20, width: '100%', textAlign: 'left', marginTop: 15 }]}>
                    {this.props.authenticatedUser?.FacilityName}
                </Text>
                <Text style={[Helpers.mediumFont, { fontSize: 15, marginLeft: 20, width: '100%', color: Colors.DisableGrayColor, textAlign: 'left', marginTop: 10 }]}>
                    {this.props.authenticatedUser?.FacilityAddress}
                </Text>

                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginLeft: 20, justifyContent: 'flex-start', marginTop: 7 }}>
                    <Image
                        source={Images.Primarycontact}
                        style={Helpers.iconsmall}
                        resizeMode='contain'
                    />
                    <Text style={[Helpers.mediumFont, {
                        fontSize: 15, marginLeft: 7,
                        color: '#152C52', textAlign: 'left',
                    }]}>
                        {this.props.selectedMessage["FacilityMenu-PrimaryContactView"]} {' '} Ethan Hong
                        {/* {this.props.authenticatedUser ?.DisplayFacilityPhoneNo} */}
                    </Text>
                </View>




                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginLeft: 20, justifyContent: 'flex-start', marginTop: 7 }}>
                    <Image
                        source={Images.Testerphone}
                        style={Helpers.iconsmall}
                    />
                    <Text style={[Helpers.mediumFont, {
                        fontSize: 15, marginLeft: 7,
                        color: '#152C52', textAlign: 'left',
                    }]}>
                        {this.props.authenticatedUser?.DisplayFacilityPhoneNo}
                    </Text>
                </View>

                <View style={{ marginTop: 50, width: 150, height: 150, borderWidth: 1.5, borderColor: '#EFF2F7', borderRadius: 13, backgroundColor: 'white', justifyContent: 'center', alignContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <QRCode
                            value={this.props.authenticatedUser?.QRCode}
                            logoSize={100}
                            color={Colors.facilityColor}
                            logoBackgroundColor='transparent'
                        />
                    </View>
                </View>

                <View style={[Helpers.btnContainer, { marginBottom: 5, marginTop: 15, backgroundColor: 'transparent', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: '90%' }]}>

                    <TouchableOpacity style={[Helpers.btn, { marginLeft: 0, backgroundColor: Colors.facilityColor, width: '100%' }]}
                        onPress={this._onPressDownloadQRcodeButton.bind(this)}
                    >
                        <Text style={[Helpers.btnText, { color: 'white', fontSize: Fonts.regular16, marginLeft: 0, }, Helpers.lightBook]}>{this.props.selectedMessage["FacProfile-DownloadQRCode(PDF)"]}</Text>
                    </TouchableOpacity>
                </View>


                {/* <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 7 }}>
                     <Image
                         source={this.props.authenticatedUser ?.UserRoleId == Enums.Patient ? Images.PurPleCallIcon : Images.FacilityPhoneIcon}
                         style={Helpers.iconsmall}
                     />
                     <Text style={[Helpers.mediumFont, {
                         fontSize: 15, marginLeft: 7,
                         color: Colors.facilityColor, textAlign: 'left',
                     }]}>
                         {this.props.authenticatedUser ?.DisplayPhoneNo}
                     </Text>
                 </View> */}
                {/* <Text style={[, {  fontSize: 17, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }, Helpers.lightBook,]}>
                     {this.props.selectedMessage["Profile-CertifiedAt"]}
                 </Text>
                 <Text style={[, {  fontSize: 19, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 },  Helpers.lightBook,]}>
                     {this.props.authenticatedUser ?.FacilityName}
                 </Text>
                 <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 7 }}>
                     <Image
                         source={Images.FacilityPhoneIcon}
                         style={Helpers.iconsmall}
                     />
                     <Text style={[Helpers.mediumFont, {
                         fontSize: 15, marginLeft: 7,
                         color: this.props.authenticatedUser ?.UserRoleId == Enums.Patient ? Colors.patientColor : Colors.facilityColor, textAlign: 'left',
                     }]}>
                         {this.props.authenticatedUser ?.DisplayFacilityPhoneNo}
                     </Text>
                 </View> */}
                {/* <Text style={[, {  fontSize: 15, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 },  Helpers.lightBook,]}>
                     {this.props.selectedMessage["FacProfile-Note:ToChangeFacilityDetailsContactSorrentoDiagnostics"]}
                 </Text> */}

            </View>

        )
    }


    renderFacility() {


        return (


            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>

                <Image style={[Helpers.PharmacyPic, { borderRadius: 50, }]} resizeMode='contain'
                    source={Images.UserImagegreen} />
                <Text style={[Helpers.bold, { fontSize: 30, color: 'black', textAlign: 'center', width: '100%', marginTop: 4 }]}>

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
                <Text style={[, { fontSize: 15, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }, Helpers.lightBook,]}>
                    {this.props.authenticatedUser?.FacilityName}
                </Text>
                <Text style={[Helpers.lightBook, { fontSize: 15, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }]}>
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
                <Text style={[Helpers.lightBook, { fontSize: 15, color: 'black', textAlign: 'center', width: '70%', marginTop: 4 }]}>
                    {this.props.selectedMessage["FacProfile-Note:ToChangeFacilityDetailsContactSorrentoDiagnostics"]}

                </Text>

            </View>

        )
    }

    render() {
        return (
            <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>

                <ScrollView>
                    <View style={{ height: 20 }}></View>
                    <TopHeaderWithTwoOption
                        fullComponentbackgroundColor={Colors.white}
                        fullComponentHeight={60}
                        RightHeaderTitle={this.props.selectedMessage["EditScreen-Editext"]}
                        IsImage={false}
                        LeftImage={this.props.authenticatedUser?.UserRoleId == Enums.Patient ? Images.PurPleBackIcon : Images.GreenBackIcon}
                        RightImage={Images.BackIcon}
                        RightSideTitleColor={this.props.authenticatedUser?.UserRoleId == Enums.Patient ? Colors.patientColor : Colors.facilityColor}
                        onPressRightButton={this._GotoEditProfileScreen.bind(this)}
                        onPressLeftButton={this._GotoBackScreen.bind(this)}
                    />

                    {this.props.authenticatedUser?.UserRoleId == Enums.Patient ? this.renderPatient() : this.props.authenticatedUser?.UserRoleId == Enums.Facility ? this.renderFacility() : this.renderTester()}

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                    </View>

                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={300}
                        openDuration={250}


                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        customStyles={{
                            // wrapper: {
                            //   backgroundColor: "transparent",
                            //   paddingHorizontal:2
                            // },
                            // draggableIcon: {
                            //   backgroundColor: "white"
                            // },
                            container: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                backgroundColor: 'transparent'
                            }
                        }}


                    >
                        <View style={[Helpers.bottomView, { height: 300, backgroundColor: this.props.authenticatedUser?.UserRoleId == Enums.Patient ? Colors.patientColor : Colors.facilityColor, borderTopLeftRadius: 50, borderTopRightRadius: 50, justifyContent: 'center' }]}>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={{ height: 4, backgroundColor: 'white', width: 75 }}></View>
                                </View>
                                <Text style={[Helpers.bold, { fontSize: 27, color: Colors.white, textAlign: 'center', width: '100%', marginVertical: 12 }]}>
                                    {this.props.selectedMessage["SearchFacility-MyQRCode"]}
                                </Text>


                                <View style={{ width: 140, height: 140, borderRadius: 13, backgroundColor: 'white', justifyContent: 'center', alignContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <QRCode
                                            color={this.props.authenticatedUser?.UserRoleId == Enums.Patient ? Colors.patientColor : Colors.facilityColor}

                                            value={this.props.authenticatedUser?.QRCode}
                                            logoSize={100}
                                            logoBackgroundColor='transparent'
                                        />
                                    </View>
                                </View>
                                <View style={[Helpers.btnContainer, { marginBottom: 5, marginTop: 15, backgroundColor: 'transparent', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: '90%' }]}>

                                    <TouchableOpacity style={[Helpers.btn, { marginLeft: 0, backgroundColor: 'white', width: '100%' }]}
                                        onPress={this._onPressDownloadQRcodeButton.bind(this)}
                                    >
                                        <Text style={[Helpers.btnText, { color: this.props.authenticatedUser?.UserRoleId == Enums.Patient ? Colors.patientColor : Colors.facilityColor, fontSize: Fonts.regular16, marginLeft: 0, }, Helpers.lightBook]}>{this.props.selectedMessage["FacProfile-DownloadQRCode(PDF)"]}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </RBSheet>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

ProfileScreen.propTypes = {
    authenticatedUser: PropTypes.any,
    signOut: PropTypes.func,
    selectedMessage: PropTypes.any,
    getTesterForEditSuccess: PropTypes.func,
    resetTesterForEdit: PropTypes.func,
    getUserDetailById: PropTypes.func,
}


const mapStateToProps = (state) => ({
    authenticatedUser: state.authenticate.authenticatedUser,
    selectedMessage: state.startup.selectedMessage
})

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(AuthenticateActions.signOut()),
    getTesterForEditSuccess: (data) => dispatch(FacilityProfileActions.getTesterForEditSuccess(data)),
    resetTesterForEdit: () => dispatch(FacilityProfileActions.resetTesterForEdit()),
    getUserDetailById: (data) => dispatch(AuthenticateActions.getUserDetailById(data)),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileScreen)

const styles = StyleSheet.create({

}); 
