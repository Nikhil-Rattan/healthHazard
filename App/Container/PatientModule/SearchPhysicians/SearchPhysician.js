import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image, SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Helpers } from 'App/Theme'

import { Enums } from 'App/Enums'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'

class SearchPhysician extends ValidationComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  _onPressButton() {

    let dashboad = this.props.authenticatedUser?.UserRoleId == Enums.Patient ? 'PatientHome' : 'FacilityHome'
    NavigationService.navigateAndReset(dashboad)
  }


  render() {
    return (

      <SafeAreaView style={[Helpers.fill,{backgroundColor:'white'} ]}>
<View style={{flexDirection:'row',justifyContent:'center',marginTop:50}}>
<Image style={{width:70,height:70}} resizeMode='cover' source={Images.MainLogo}/>
</View>


<View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
          <Text style={[Helpers.bold, { fontSize: 32,color: Colors.patientColor, textAlign: 'center', width: '90%',marginBottom:30 }]}>
            {/* {this.props.selectedMessage["RegisterSuccess-Success!"]} */}
            Searching For Available Physicians...
          </Text>
          </View>



        <View style={Helpers.bottomView}>
          <View style={[Helpers.btnContainer, { bottom: 0 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={[Helpers.bigBtnGradient, { width: '90%',borderWidth:1,borderColor:Colors.patientColor }]} >
              <TouchableOpacity style={Helpers.btn}
                onPress={this._onPressButton.bind(this)}
              >
                <Text style={[Helpers.btnText, { color: Colors.patientColor, fontSize: 17, }]}>
                  {/* {this.props.selectedMessage["RegisterSuccess-GoToDashboard"]} */} Go back
                   </Text>

              </TouchableOpacity>

            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>

    );
  }
}



SearchPhysician.propTypes = {
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
)(SearchPhysician)


