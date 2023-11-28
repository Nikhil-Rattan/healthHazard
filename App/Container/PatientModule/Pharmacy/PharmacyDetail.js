import React from 'react';
import {
  Text,
  View,Linking,
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

class PharmacyDetail extends ValidationComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  _onPressButton(fullAddress){
    const url = Platform.select({
      ios: `maps:0,0?q=${fullAddress}`,
      android: `geo:0,0?q=${fullAddress}`,
    })
    
    Linking.openURL(url)
  }

  
  _CallPhoneNumber(phone){
    console.log(phone)
     
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



  _OnClickCrossButton(){
    NavigationService.popScreen()
  }
  render() {
    let  itemDetail=this.props.route.params.itemDetail;
    console.log(itemDetail)
    return (

      <SafeAreaView style={[Helpers.fill,{backgroundColor:'#fbfbfc'} ]}>
        <CustomHeaderNew
          HeaderColor={{ backgroundColor:Colors.white}}
          onPressBackButton={this._OnClickCrossButton.bind(this)}
        //  HeaderTitle={this.props.selectedMessage["EULA-EndUserLicenceAgreement"]}
        HeaderTitle={itemDetail.FacilityName}
       
          LeftImage={Images.PurPleBackIcon}
          textcolorHeader='#614698'
        />

<View style={{flexDirection:'row',justifyContent:'center',marginTop:25}}>
          <Text style={[Helpers.bold, { fontSize: 25,color: Colors.black, textAlign: 'left', width: '90%', }]}>
            {/* {this.props.selectedMessage["RegisterSuccess-Success!"]} */}
            {/* Dr. Ethan Hong, MD, PHD */}
            {itemDetail.PhysicianName}
          </Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
          <Text style={[Helpers.mediumFont, { fontSize: 17,color: Colors.black, textAlign: 'left', width: '90%',marginBottom:30 }]}>
            {/* {this.props.selectedMessage["RegisterSuccess-Success!"]} */}
            {/* 3929 North road, San Diego, California 98382 */}
            {itemDetail.Address}
          </Text>
          </View>



          <View style={[Helpers.btnContainer,{marginTop:20,marginBottom:0}]}>
      <LinearGradient 
      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
      colors={['#614698', '#614698', '#614698']}  style={[Helpers.bigBtnGradient,{width:'90%'}]} >
          <TouchableOpacity style={Helpers.btn}  
        onPress={this._onPressButton.bind(this,itemDetail.Address)}
          >
              <Image style={{width:16,height:16,}} resizeMode='cover' source={Images.whiteDirectionIcon}/>
          <Text style={[Helpers.btnText,Helpers.mediumFont,{color: Colors.white,fontSize:Fonts.regular16,marginLeft:5}]}>{this.props.selectedMessage["SearchFacility-GetDirections"]} </Text>  
                    
          </TouchableOpacity>
              
                 </LinearGradient>  
      </View>

        <View style={{flexDirection:'row',justifyContent:'center',marginTop:20,}}>

          <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={[Helpers.bigBtnGradient, { width: '90%',borderWidth:1.5,borderColor:Colors.patientColor }]} >
              <TouchableOpacity style={Helpers.btn}
                onPress={this._CallPhoneNumber.bind(this,itemDetail.FacilityPhoneNo)}
              >
                          <Image style={{width:18,height:18,marginRight:8}} resizeMode='cover' source={Images.PurPletelehealthexpertCallIcon}/>
                <Text style={[Helpers.btnText, { color: Colors.patientColor, fontSize: 17, }]}>
                 {this.props.selectedMessage["TestingSiteListScreen-CallFacility"]}
                   </Text>
              </TouchableOpacity>
            </LinearGradient>
            </View>

 

<View style={{height:100,backgroundColor:"transparent",marginTop:10}}>

</View>


      </SafeAreaView>

    );
  }
}



PharmacyDetail.propTypes = {
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
)(PharmacyDetail)


