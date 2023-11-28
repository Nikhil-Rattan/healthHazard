import React from 'react';
import { Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import { Enums } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import QRCode from 'react-native-qrcode-svg';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import RNHTMLtoPDF from 'react-native-html-to-pdf-lite';
import Share from 'react-native-share';

class TesterMenu extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  _onPressButton() {
    NavigationService.navigate('PatientQRCodeAndResultScannerScreen');
  }

  async createPDF() {
    this.svg.toDataURL(async (data) => {
      let options = {
        html: ` 
      <h1 style="text-align: center;font-size:60px;color:#28998D"><strong>${this.props.route.params.itemDetail.FacilityName}</strong></h1>
      <h2 style="text-align: center;font-size:40px;color:#28998D">${this.props.route.params.itemDetail.Address}</h2>
      <img src="data:image/png;base64,${data}" alt="Paris" style=" display: block;
      margin-left: auto;
      margin-right: auto; height:450px;
      width:450px;" />  
      <img src="https://staging.covistix.com/assets/media/logos/app-logo-5.png" alt="Paris" style=" display: block;
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;   height:250px;
      width:250px;" 
   
      />
     
`,
        fileName: 'test',
        base64: true,
      };

      let file = await RNHTMLtoPDF.convert(options);
      const shareImageBase64 = {
        title: 'QR',
        message: this.props.route.params.itemDetailFacilityName + ' QR Code',
        url: `data:application/pdf;base64,${file.base64}`,
      };
      Share.open(shareImageBase64);
    });
  }
  _GotoEditProfileScreen() {
    let itemDetail = this.props.route.params.itemDetail;
    NavigationService.navigate('ManageEditTesterDetails', {
      itemEditDetail: itemDetail,
    });
  }
  _GotoBackScreen() {
    NavigationService.popScreen();
  }
  render() {
    let itemDetail = this.props.route.params.itemDetail;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <TopHeaderWithTwoOption
          fullComponentbackgroundColor={Colors.white}
          fullComponentHeight={60}
          RightHeaderTitle={this.props.selectedMessage['EditScreen-Editext']}
          IsImage={false}
          LeftImage={
            this.props.authenticatedUser?.UserRoleId == Enums.Patient
              ? Images.PurPleBackIcon
              : Images.GreenBackIcon
          }
          RightImage={Images.BackIcon}
          RightSideTitleColor={
            this.props.authenticatedUser?.UserRoleId == Enums.Patient
              ? Colors.patientColor
              : Colors.facilityColor
          }
          onPressRightButton={this._GotoEditProfileScreen.bind(this)}
          onPressLeftButton={this._GotoBackScreen.bind(this)}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Image
            style={[Helpers.PharmacyPic, { borderRadius: 50 }]}
            resizeMode="contain"
            source={Images.UserImagegreen}
          />
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 25,
                color: '#152C52',
                textAlign: 'center',
                width: '100%',
                marginTop: 4,
              },
            ]}>
            {itemDetail?.FullName}
          </Text>
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 15,
                marginLeft: 20,
                width: '100%',
                color: Colors.DisableGrayColor,
                textAlign: 'left',
                marginTop: 20,
              },
            ]}>
            {this.props.selectedMessage['FacilityMenu-FacilityInformation']}
          </Text>

          <Text
            style={[
              Helpers.bold,
              {
                fontSize: 18,
                color: Colors.facilityColor,
                marginLeft: 20,
                width: '100%',
                textAlign: 'left',
                marginTop: 15,
              },
            ]}>
            {itemDetail.FacilityName}
          </Text>
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 15,
                marginLeft: 20,
                width: '100%',
                color: Colors.DisableGrayColor,
                textAlign: 'left',
                marginTop: 10,
              },
            ]}>
            {itemDetail.FacilityAddress}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              marginLeft: 20,
              justifyContent: 'flex-start',
              marginTop: 7,
            }}>
            <Image
              source={Images.Primarycontact}
              style={Helpers.iconsmall}
              resizeMode="contain"
            />
            <Text
              style={[
                Helpers.mediumFont,
                {
                  fontSize: 15,
                  marginLeft: 7,
                  color: '#152C52',
                  textAlign: 'left',
                },
              ]}>
              {this.props.selectedMessage['FacilityMenu-PrimaryContactView']}{' '}
              {this.props.authenticatedUser?.FirstName +
                ' ' +
                this.props.authenticatedUser?.LastName}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              marginLeft: 20,
              justifyContent: 'flex-start',
              marginTop: 7,
            }}>
            <Image source={Images.Testerphone} style={Helpers.iconsmall} />
            <Text
              style={[
                Helpers.mediumFont,
                {
                  fontSize: 15,
                  marginLeft: 7,
                  color: '#152C52',
                  textAlign: 'left',
                },
              ]}>
              {itemDetail.DisplayFacilityPhoneNo}
            </Text>
          </View>

          <View
            style={{
              width: 175,
              height: 175,
              borderRadius: 13,
              borderWidth: 1,
              borderColor: '#E5E9F2',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: 50,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <QRCode
                color={Colors.facilityColor}
                value={itemDetail.QRCode}
                logoSize={100}
                logoBackgroundColor="transparent"
                getRef={(ref) => (this.svg = ref)}
              />
            </View>
          </View>
        </View>

        <View style={Helpers.bottomView}>
          <View
            style={[
              Helpers.btnContainer,
              { bottom: 0, justifyContent: 'flex-end', paddingHorizontal: 15 },
            ]}>
            <TouchableOpacity
              style={[Helpers.btn, { backgroundColor: '#28998D' }]}
              onPress={this.createPDF.bind(this)}>
              <Text
                style={[Helpers.btnText, { color: Colors.white, fontSize: 17 }]}>
                {this.props.selectedMessage['FacProfile-DownloadQRCode(PDF)']}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

TesterMenu.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) =>
    dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TesterMenu);
