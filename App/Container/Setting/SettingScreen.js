import React, {Component} from 'react';
import {
StyleSheet,
Text,Linking,
View,
TouchableHighlight,TouchableOpacity,
Image,TextInput,
Alert,
ScrollView,
SafeAreaView,
} from 'react-native';


import {KeyboardAvoidingView} from 'react-native';

import {Colors, Fonts, Images, Metrics, Helpers, ApplicationStyles } from 'App/Theme'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

  class SettingScreen extends React.Component {
constructor(props) {
super(props);

this.state = { UID: '', password:'' ,ErrorStatus : true,ErrorStatususername : true,
validusererror:false}
}

componentDidMount() {


}
_onEditProfilePressButton(){
    NavigationService.navigate('SettingScreen')
}
_onAboutPressButton(){
    NavigationService.navigate('SettingScreen')
}
_onFAQPressButton(){
    NavigationService.navigate('SettingScreen')
}
_onLogout()
{
    this.props.signOut()
}
render() {
return (
<View style={Helpers.fillCenterMain}>
<SafeAreaView style={Helpers.fill}>



            <View style={[Helpers.Cardcenter,{marginHorizontal:10}]}>

            <View  >
      <Image style={Helpers.logo} resizeMode='contain'  source={Images.logo}/>
      </View> 



<View style={{width:'90%',backgroundColor:'transparent',height:60,flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{width:'20%',marginLeft:16,flexDirection:'column',justifyContent:'center'}}>
    <Image style={Helpers.icon} resizeMode='contain'  source={Images.editprofileImage}/>

    </View>
    
    <TouchableOpacity 
    //onPress={this._onAboutPressButton.bind(this)} 
    style={{width:'80%',flexDirection:'column',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'gray',}}>
<View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
    <View style={{width:'80%',flexDirection:'column',justifyContent:'center',}}>
    <Text style={{fontSize:20,color:"#6c6c6c",textAlign:'left',width:'80%'}}>
       Edit Profile
        </Text>
    </View>
    <View style={{flexDirection:'column',justifyContent:'center',}}>
    <Image style={[Helpers.iconsmall]} resizeMode='contain'  source={Images.arrowrightImage}/>
    </View>
        

</View>
 </TouchableOpacity>
</View>


<View style={{width:'90%',backgroundColor:'transparent',height:60,flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{width:'20%',marginLeft:16,flexDirection:'column',justifyContent:'center'}}>
    <Image style={Helpers.icon} resizeMode='contain'  source={Images.usericon}/>

    </View>
    
    <TouchableOpacity
    // onPress={this._onAboutPressButton.bind(this)}
     style={{width:'80%',flexDirection:'column',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'gray',}}>
<View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
    <View style={{width:'80%',flexDirection:'column',justifyContent:'center',}}>
    <Text style={{fontSize:20,color:"#6c6c6c",textAlign:'left',width:'80%'}}>
        About Us
        </Text>
    </View>
    <View style={{flexDirection:'column',justifyContent:'center',}}>
    <Image style={[Helpers.iconsmall]} resizeMode='contain'  source={Images.arrowrightImage}/>
    </View>
        

</View>
 </TouchableOpacity>
</View>


<View style={{width:'90%',backgroundColor:'transparent',height:60,flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{width:'20%',marginLeft:16,flexDirection:'column',justifyContent:'center'}}>
    <Image style={Helpers.icon} resizeMode='contain'  source={Images.usericon}/>

    </View>
    
    <TouchableOpacity 
    //onPress={this._onFAQPressButton.bind(this)} 
     style={{width:'80%',flexDirection:'column',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'gray',}}>
<View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
    <View style={{width:'80%',flexDirection:'column',justifyContent:'center',}}>
    <Text style={{fontSize:20,color:"#6c6c6c",textAlign:'left',width:'80%'}}>
          FAQs
        </Text>
    </View>
    <View style={{flexDirection:'column',justifyContent:'center',}}>
    <Image style={[Helpers.iconsmall]} resizeMode='contain'  source={Images.arrowrightImage}/>
    </View>
        

</View>
 </TouchableOpacity>
</View>



<View style={{width:'90%',backgroundColor:'transparent',height:60,flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{width:'20%',marginLeft:16,flexDirection:'column',justifyContent:'center'}}>
    <Image style={Helpers.icon} resizeMode='contain'  source={Images.usericon}/>

    </View>
    
    <View style={{width:'80%',flexDirection:'column',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'gray',}}>
<View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
    <View style={{width:'80%',flexDirection:'column',justifyContent:'center',}}>
    <Text style={{fontSize:20,color:"#6c6c6c",textAlign:'left',width:'80%'}}>
          Terms & condition  
        </Text>
    </View>
    <View style={{flexDirection:'column',justifyContent:'center',}}>
    <Image style={[Helpers.iconsmall]} resizeMode='contain'  source={Images.arrowrightImage}/>
    </View>
        

</View>
 </View>
</View>

<View style={{width:'90%',backgroundColor:'transparent',height:60,flexDirection:'row',justifyContent:'space-between',marginBottom:40}}>
    <View style={{width:'20%',marginLeft:16,flexDirection:'column',justifyContent:'center'}}>
    <Image style={Helpers.icon} resizeMode='contain'  source={Images.logoutImage}/>

    </View>
    
    <TouchableOpacity 
    onPress={this._onLogout.bind(this)} 
    style={{width:'80%',flexDirection:'column',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'gray',}}>
<View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
    <View style={{width:'80%',flexDirection:'column',justifyContent:'center',}}>
    <Text style={{fontSize:20,color:"#6c6c6c",textAlign:'left',width:'80%'}}>
          Logout
        </Text>
    </View>
    <View style={{flexDirection:'column',justifyContent:'center',}}>
    <Image style={[Helpers.iconsmall]} resizeMode='contain'  source={Images.arrowrightImage}/>
    </View>
        

</View>
 </TouchableOpacity>
</View>



<Text style={{fontSize:20,color:"#1e9a8d",textAlign:'center',width:'90%',marginBottom:50}}>
          Version : 4.1.80
        </Text>

 </View>








</SafeAreaView>


</View>
);
}
}




SettingScreen.propTypes = {
  
    signOut:PropTypes.func
  }
  
  
  const mapStateToProps = (state) => ({ 
  
   })
  
  const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(AuthenticateActions.signOut()),
    
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SettingScreen)
  
  
  
const styles = StyleSheet.create({

});