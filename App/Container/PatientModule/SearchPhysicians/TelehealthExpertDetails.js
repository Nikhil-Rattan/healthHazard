import React from 'react';
import {
  Text,Linking,
  View,
  TouchableOpacity,
  Image, SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeaderNew from 'App/Components/CustomHeaderNew';
import Telehealthexpertlist from 'App/Components/Telehealthexpertlist';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Helpers } from 'App/Theme'

import { Enums } from 'App/Enums'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'

class TelehealthExpertDetails extends ValidationComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  _onPressButton() {

    let dashboad = this.props.authenticatedUser?.UserRoleId == Enums.Patient ? 'PatientHome' : 'FacilityHome'
    NavigationService.navigateAndReset(dashboad)
  }

  _OnClickCrossButton(){
    NavigationService.popScreen()
  }

  _CallPhoneNumber(phone){
     
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
    }
    else {
    phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
    if (!supported) {
    Alert.alert('Phone number is not available');
    } else {
    return Linking.openURL(phoneNumber);
    }
    })
    .catch(err => console.log(err));
  
  }

  render() {
    let  itemDetail=this.props.route.params.itemDetail;
    return (

      <SafeAreaView style={[Helpers.fill,{backgroundColor:'#fbfbfc'} ]}>
        <CustomHeaderNew
          HeaderColor={{ backgroundColor:Colors.white}}
          onPressBackButton={this._OnClickCrossButton.bind(this)}
        //  HeaderTitle={this.props.selectedMessage["EULA-EndUserLicenceAgreement"]}
        HeaderTitle={itemDetail.TeleHealthName}
       
          LeftImage={Images.PurPleBackIcon}
          textcolorHeader='#614698'
        />

<View style={{flexDirection:'row',justifyContent:'center',marginTop:25}}>
          <Text style={[Helpers.bold, { fontSize: 25,color: Colors.black, textAlign: 'left', width: '90%', }]}>
            {/* {this.props.selectedMessage["RegisterSuccess-Success!"]} */}
            {itemDetail.IsDoctor?'Dr.'+itemDetail.PhysicianName:itemDetail.FirstName}
          </Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
          <Text style={[Helpers.mediumFont, { fontSize: 17,color: Colors.black, textAlign: 'left', width: '90%',marginBottom:30 }]}>
            {/* {this.props.selectedMessage["RegisterSuccess-Success!"]} */}
            {itemDetail.Address}
          </Text>
          </View>


        <View style={{flexDirection:'row',justifyContent:'center'}}>

          <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={[Helpers.bigBtnGradient, { width: '90%',borderWidth:1,borderColor:Colors.patientColor }]} >
              <TouchableOpacity style={Helpers.btn}
                onPress={this._CallPhoneNumber.bind(this,itemDetail.IsDoctor?itemDetail.TeleHealthPhysicianPhoneNo:itemDetail.TeleHealthPhoneNo)}
              >
                          <Image style={{width:18,height:18,marginRight:8}} resizeMode='cover' source={Images.PurPletelehealthexpertCallIcon}/>
                <Text style={[Helpers.btnText, { color: Colors.patientColor, fontSize: 17, }]}>
                {this.props.selectedMessage["TestingSiteListScreen-CallFacility"]}
                   </Text>
              </TouchableOpacity>
            </LinearGradient>
            </View>






      </SafeAreaView>

    );
  }
}



TelehealthExpertDetails.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any
}


const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  selectedMessage: state.startup.selectedMessage
})

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) => dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () => dispatch(AuthenticateActions.resetAuthenticateStates()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TelehealthExpertDetails)


