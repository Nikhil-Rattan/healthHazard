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

export default class Splashscreen extends React.Component {
constructor(props) {
super(props);

this.state = { UID: '', password:'' ,ErrorStatus : true,ErrorStatususername : true,
validusererror:false}
}

componentDidMount() {


}


render() {
return (
<View style={[Helpers.fillCenterMain,{backgroundColor:Colors.white}]}>
<SafeAreaView style={Helpers.fill}>
<View style={Helpers.fillColCenter}>
<View style={Helpers.center}>
<View  >
      <Image style={Helpers.logo} resizeMode='contain'  source={Images.MainLogo}/>
      </View>  



</View>
</View>





</SafeAreaView>


</View>
);
}
}

const styles = StyleSheet.create({

});