import React, {Component} from 'react';
import {
StyleSheet,
Text,Linking,
View,
TouchableHighlight,TouchableOpacity,
Image,TextInput,
Alert,SearchBar ,
ScrollView,
SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {KeyboardAvoidingView} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {Colors, Fonts, Images, Metrics, Helpers, ApplicationStyles } from 'App/Theme'

import Dialog, { DialogContent } from 'react-native-popup-dialog';

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'
import  ListCard  from 'App/Components/ListCard';
import  TopHeaderWithTwoOption  from 'App/Components/TopHeaderWithTwoOption';
import  CustomSearchTextbox  from 'App/Components/CustomSearchTextbox';

  class PharmacyDetailsScreen  extends ValidationComponent {
  constructor(props) {
    super(props);
  
 
  } 
    componentDidMount() {

  
  }
 

  _Goback(){
    NavigationService.popScreen()
  }


  _onPressButton(fullAddress){
    const url = Platform.select({
      ios: `maps:0,0?q=${fullAddress}`,
      android: `geo:0,0?q=${fullAddress}`,
    })
    
    Linking.openURL(url)
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
        <SafeAreaView style={[{backgroundColor:'white',flex:1}]}>
   <ScrollView >
<View style={{width:'100%',backgroundColor:'white',position:'relative'}}>
   <Image style={[Helpers.PharmacyBigPic,{marginTop:5,marginLeft:4,width:'98%'}]} resizeMode='stretch'  source={Images.PharmacyImage}/>
<TouchableOpacity onPress={this._Goback.bind(this)} style={{width:80,height:80,marginTop:35,position:'absolute',backgroundColor:'transparent'}}>
<Image style={{width:50,height:50,marginLeft:15}} resizeMode='contain'  source={Images.RedBackHexaIcon}/>
</TouchableOpacity>
   </View>


<View style={{backgroundColor:'white',marginTop:20,width:'100%',flexDirection:'row',justifyContent:'space-between',}}>

<View style={{width:'80%',flexDirection:'column',justifyContent:'flex-start'}}>
<Text style={[Helpers.bold,{fontSize:30,marginLeft:15,color:'#333333',textAlign:'left',width:'90%'}]}>
        {itemDetail.FacilityName} 
    </Text>
    <Text style={[Helpers.mediumFont,{fontSize:20,marginLeft:15,color:'#333333',textAlign:'left',width:'90%',marginTop:4}]}>
 { itemDetail.Address}
    </Text>

    <View style={{flexDirection:'row',marginTop:7,marginLeft:15,}}> 
    <Text style={[,{fontSize:15,color:Colors.facilityColor,textAlign:'left',width:'90%'}]}>
     
    </Text>
    </View>
</View>
<View  style={{width:'20%',flexDirection:'column',justifyContent:'flex-start'}}>
  <TouchableOpacity onPress={this._CallPhoneNumber.bind(this,itemDetail.FacilityPhoneNo)} style={{width:'100%',flexDirection:'row',justifyContent:'center'}}>
  <Image style={Helpers.Bigicon} resizeMode='contain'  source={Images.GreenHexaIcon}/>
  </TouchableOpacity>

</View>
</View>

<View style={[Helpers.btnContainer,{marginTop:5,marginBottom:100}]}>
      <LinearGradient 
      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
      colors={['#614698', '#614698', '#614698']}  style={[Helpers.bigBtnGradient,{width:'90%'}]} >
          <TouchableOpacity style={Helpers.btn}  
         onPress={this._onPressButton.bind(this,itemDetail.Address)}
          >
          <Text style={[Helpers.btnText,Helpers.mediumFont,{color: Colors.white,fontSize:Fonts.regular16,}]}> {this.props.selectedMessage["SearchFacility-GetDirections"]} </Text>  
                    
          </TouchableOpacity>
              
                 </LinearGradient>  
      </View>


     

      </ScrollView>
        </SafeAreaView>
      );
    } 
  }


  PharmacyDetailsScreen.propTypes = {

 

     
    selectedMessage:PropTypes.any, 
  
  }
  
  
  const mapStateToProps = (state) => ({
   
    selectedMessage:state.startup.selectedMessage,
     
 
  
   })
  
  const mapDispatchToProps = (dispatch) => ({
 
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PharmacyDetailsScreen)
const styles = StyleSheet.create({

  }); 
