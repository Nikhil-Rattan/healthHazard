import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image, SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme'
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'
import { ScrollView } from 'react-native-gesture-handler';

class InstructionFirstScreen extends ValidationComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  _onPressButton() {
    NavigationService.navigate('VideoInstructionScreen')
  }
  _OnPressRightSideIcon() {

    NavigationService.popScreen()
  }

  render() {
    return (

      <SafeAreaView style={[Helpers.fill, { backgroundColor: 'white' }]}>

        <TopHeaderWithTwoOption
          fullComponentbackgroundColor={Colors.patientColor}
          fullComponentHeight={60}
          IsImage={true}
          RightImage={Images.CrossIcon}
          MiddleHeaderTitlecolor='#FFFFFF'
          onPressRightButton={this._OnPressRightSideIcon.bind(this)}
        />
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image style={{ height: 120, width: 120, top: 70 }} resizeMode='contain' source={Images.viewinstructionIcon} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 85 }}>
            <Text style={[Helpers.bold, { fontSize: 28, color: Colors.patientColor, textAlign: 'center', width: '90%', marginBottom: 30 }]}>
              {this.props.selectedMessage["InstructionFirstScreen-LastStep"]}

            </Text>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
            <Text style={[Helpers.bold, { marginLeft: 15, fontSize: 15, color: Colors.Black, textAlign: 'center', width: '90%', }]}>
              {this.props.selectedMessage["InstructionFirstScreen-InstructionFirstMiddleText"]}

            </Text>

          </View>
        </ScrollView>
        <View style={[Helpers.bottomView, { bottom: 0, height: 150, width: '100%', backgroundColor: 'transparent', flexDirection: 'column', justifyContent: 'flex-end' }]}>

          <View style={[Helpers.btnContainer, { marginBottom: 15 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={['#614698', '#614698', '#614698']} style={[Helpers.bigBtnGradient]} >
              <TouchableOpacity style={Helpers.btn}
                onPress={() => { NavigationService.navigate('VideoInstructionScreen') }}
              >
                <Text style={[Helpers.btnText, { color: Colors.white, fontSize: 15 }]}>{this.props.selectedMessage["InstructionFirstScreen-ViewVideoInstructions"]} </Text>

              </TouchableOpacity>

            </LinearGradient>
          </View>
          <View style={[Helpers.btnContainer, { marginBottom: 8 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={[Helpers.bigBtnGradient, { borderWidth: 1, borderColor: Colors.patientColor }]} >
              <TouchableOpacity style={Helpers.btn}
                onPress={() => { NavigationService.navigate('InstructionSecondScreen') }}
              >
                <Text style={[Helpers.btnText, { color: Colors.patientColor, fontSize: 15 }]}>{this.props.selectedMessage["InstructionFirstScreen-ViewWrittenInstructions"]} </Text>

              </TouchableOpacity>

            </LinearGradient>
          </View>
        </View>

      </SafeAreaView>

    );
  }
}



InstructionFirstScreen.propTypes = {
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
)(InstructionFirstScreen)


