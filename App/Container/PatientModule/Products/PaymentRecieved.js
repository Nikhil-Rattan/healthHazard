import React from 'react';
import {Text, View, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeaderNew from 'App/Components/CustomHeaderNew';
import Telehealthexpertlist from 'App/Components/Telehealthexpertlist';
import ValidationComponent from 'react-native-form-validator';
import {Colors, Fonts, Images, Helpers} from 'App/Theme';

import {Enums} from 'App/Enums';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';

class PaymentRecieved extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  _onPressButton() {
    NavigationService.navigateAndReset('PatientHome');
  }

  render() {
    let orderDetail = this.props.route.params.orderDetail;
    return (
      <SafeAreaView style={[Helpers.fill, {backgroundColor: 'white'}]}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            style={{height: 120, width: 120, top: 70}}
            source={Images.PaymentReceivedIcon}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 85,
          }}>
          <Text
            style={[
              Helpers.bold,
              {
                fontSize: 28,
                color: Colors.patientColor,
                textAlign: 'center',
                width: '90%',
                marginBottom: 30,
              },
            ]}>
            {this.props.selectedMessage['Product-PaymentRecieved']}
          </Text>
        </View>

        <View
          style={{width: '100%', height: 1, backgroundColor: '#C2CEDB'}}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <Text
            style={[
              Helpers.bold,
              {
                fontSize: 25,
                color: Colors.Black,
                textAlign: 'left',
                width: '90%',
                marginBottom: 30,
              },
            ]}>
            {this.props.selectedMessage['Product-OrderDetail']}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
          }}>
          <Text
            style={[
              Helpers.mediumFont,
              {
                marginLeft: 15,
                fontSize: 20,
                color: Colors.Black,
                textAlign: 'left',
                width: '60%',
              },
            ]}>
            {/* {this.props.selectedMessage["Product-QTY"]} */}
            {orderDetail.ProductName} -
            {this.props.selectedMessage['Product-QTY']} {orderDetail.Qty}
          </Text>
          <Text
            style={[
              Helpers.mediumFont,
              {
                marginRight: 15,
                fontSize: 20,
                color: '#1C736A',
                textAlign: 'right',
                width: '30%',
              },
            ]}>
            {/* {this.props.selectedMessage["RegisterSuccess-Success!"]} */}$
            {orderDetail.Price}
          </Text>
        </View>

        {/* <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:25}}>
          <Text style={[Helpers.mediumFont, {marginLeft:15, fontSize: 20,color: Colors.Black, textAlign: 'left', width: '60%', }]}>
            
            COVI-TRACE™ - QTY 1
          </Text>
          <Text style={[Helpers.mediumFont, {marginRight:15, fontSize: 20,color: '#1C736A', textAlign: 'right', width: '30%', }]}>
    
            $379.99
          </Text>
          </View> */}

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
          }}>
          <Text
            style={[
              Helpers.mediumFont,
              {
                marginLeft: 15,
                fontSize: 20,
                color: Colors.Black,
                textAlign: 'left',
                width: '60%',
              },
            ]}>
            {this.props.selectedMessage['Product-CATaxes']}
          </Text>
          <Text
            style={[
              Helpers.mediumFont,
              {
                marginRight: 15,
                fontSize: 20,
                color: '#1C736A',
                textAlign: 'right',
                width: '30%',
              },
            ]}> 
            $10.00
          </Text>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
          }}>
          <Text
            style={[
              Helpers.bold,
              {
                marginLeft: 15,
                fontSize: 20,
                color: Colors.Black,
                textAlign: 'left',
                width: '60%',
              },
            ]}>
            {this.props.selectedMessage['Product-Summary']}
          </Text>
          <Text
            style={[
              Helpers.bold,
              {
                marginRight: 15,
                fontSize: 20,
                color: '#1C736A',
                textAlign: 'right',
                width: '30%',
              },
            ]}>
            {/* {this.props.selectedMessage["RegisterSuccess-Success!"]} */}$
            {orderDetail.Price}
          </Text>
        </View>

        <View style={Helpers.bottomView}>
          <View style={[Helpers.btnContainer, {bottom: 0}]}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
              style={[
                Helpers.bigBtnGradient,
                {
                  width: '90%',
                  borderWidth: 1,
                  borderColor: Colors.patientColor,
                },
              ]}>
              <TouchableOpacity
                style={Helpers.btn}
                onPress={this._onPressButton.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    {color: Colors.patientColor, fontSize: 17},
                  ]}>
                  {this.props.selectedMessage['Product-BackToHome']}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

PaymentRecieved.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentRecieved);
