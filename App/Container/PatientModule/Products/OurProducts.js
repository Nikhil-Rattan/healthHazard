import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Images, Helpers } from 'App/Theme';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import PatientProfileActions from 'App/Stores/PatientProfile/Actions';
//import stripe from 'App/NativeLib/StripePaymentModule';

// stripe.setOptions({
//   publishingKey:
//     'pk_test_51IRRuSIdkfjheXqkKon6OoF2dGbgyn8cdjcUo72dHIkryfnUAgAJcKM43Xzf87TcFaboeMEJtS3Etfnx5ghGAYse00rSBoL7Kv',
// });

class OurProducts extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      cartItemCount: 0,
      isCartShown: false,
      canGotoPay: true,
      Isdisable: false,
    };
  }

  onPressCart() {
    if (this.state.cartItemCount == 0) {
      //this.addIteminCart()
    } else {
      this.setState({ isCartShown: true });
    }
  }

  addIteminCart() {
    let cartItemCount = this.state.cartItemCount;

    this.setState({ cartItemCount: cartItemCount + 1, isCartShown: true });
  }

  removeIteminCart() {
    let cartItemCount = this.state.cartItemCount;

    if (cartItemCount - 1 == 0) {
      this.setState({ cartItemCount: 0, isCartShown: false });
    } else {
      this.setState({ cartItemCount: cartItemCount - 1, isCartShown: true });
    }
  }

  componentDidMount() {
    this.props.resetPrescription();
    this.props.getPrescription({
      PatientId: this.props.authenticatedUser?.PatientId,
      Status: 'InCart',
    });
  }

  _onPressButton() {
    NavigationService.popScreen();
  }
  _OnBackPres() {
    NavigationService.navigate('PatientHome')
  }

  _goToTelehealth() {
    NavigationService.navigate('TelehealthExpertsScreens', { IsDoctor: false });
  }

  render() {
    const { isCartShown, cartItemCount, canGotoPay, Isdisable } = this.state;

    return (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: 'white' }]}>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 28,
          }}>
          <View
            style={{
              width: 35,
              justifyContent: 'flex-start',
              backgroundColor: 'transparent',
            }}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                borderRadius: 35 / 2,
                backgroundColor: '#f5f5f6',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={this._OnBackPres}>
              <Image
                style={{ height: 11, width: 11 }}
                source={Images.PurPleBackIcon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}>
            {isCartShown ? (
              <Text
                style={[
                  Helpers.bold,
                  {
                    fontSize: 28,
                    color: '#152C52',
                    textAlign: 'center',
                    width: '90%',
                    marginBottom: 30,
                  },
                ]}>
                Checkout
              </Text>
            ) : (
              <Image
                style={{ height: 100, width: 100 }}
                source={Images.MainLogo}
              />
            )}
          </View>
        </View>
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
                fontSize: 28,
                color: '#152C52',
                textAlign: 'left',
                width: '90%',
                marginBottom: 30,
              },
            ]}>
            {this.props.selectedMessage['Product-SeeOurProduct']}
          </Text>
        </View>

        {/* <View style={{flexGrow:1}}>
<PaymentView onCheckStatus={this.onCheckStatus} product={cartInfo.description} amount={cartInfo.amount} Isdisable={Isdisable} />

</View> */}
        {this.props.prescriptionList?.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
            }}
            data={this.props.prescriptionList}
            //  extraData={this.state}
            // ItemSeparatorComponent={() => {
            //   return (
            //     <View style={Helpers.separator}/>
            //   )
            // }}
            keyExtractor={(item) => {
              return item.Orderno;
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    height: 140,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      backgroundColor: 'white',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#ddd',
                      borderBottomWidth: 0,
                      shadowColor: '#000',
                      shadowOffset: { width: 10, height: 10 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                      marginVertical: 5,
                      marginTop: 10,
                      height: 120,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        width: 50,
                      }}>
                      <Image
                        style={{ height: 50, width: 50, marginTop: 19 }}
                        source={Images.MainLogo}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        backgroundColor: 'transparent',
                        justifyContent: 'flex-start',
                        marginTop: 20,
                        width: isCartShown ? 122 : 240,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          width: '100%',
                        }}>
                        <Text
                          style={[
                            Helpers.bold,
                            {
                              marginLeft: 10,
                              fontSize: 13,
                              color: Colors.patientColor,
                              textAlign: 'left',
                              width: '90%',
                            },
                          ]}>
                          {item.ProductName}
                        </Text>
                      </View>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          this.setState({ isCartShown: false });
                        }}>
                        <View>
                          <Text
                            style={[
                              Helpers.lightBook,
                              {
                                marginLeft: 10,
                                fontSize: 10,
                                color: '#3A295C',
                                textAlign: 'left',
                              },
                            ]}>
                            {isCartShown
                              ? 'View Product Details'
                              : item.Description}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 10,
                        }}>
                        <View style={{ marginBottom: 5 }}>
                          <Image
                            style={{
                              height: 12,
                              width: 12,
                              justifyContent: 'center',
                              resizeMode: 'contain',
                            }}
                            source={Images.RxPriceIcon}
                          />
                        </View>

                        <Text
                          style={[
                            Helpers.lightBook,
                            {
                              marginLeft: 10,
                              fontSize: 15,
                              color: '#28998D',
                              textAlign: 'left',
                              width: '90%',
                            },
                          ]}>
                          ${item.Price}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        flexGrow: 1,
                      }}>
                      {isCartShown ? (
                        <View
                          style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            width: 120,
                          }}>
                          <View
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 5,
                              backgroundColor: '#e9f5f4',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}>
                            <Image
                              style={{ width: 15, height: 15 }}
                              resizeMode="contain"
                              source={Images.OrderCart}
                            />
                            <Text
                              style={[
                                Helpers.mediumFont,
                                {
                                  marginLeft: 2,
                                  marginTop: 5,
                                  fontSize: 10,
                                  color: '#28998D',
                                  textAlign: 'left',
                                },
                              ]}>
                              +{item.Qty}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <TouchableOpacity onPress={this.onPressCart.bind(this)}>
                          <View
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 5,
                              backgroundColor: '#efedf5',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: 15,
                            }}>
                            <Image
                              style={{ width: 22, height: 22 }}
                              resizeMode="contain"
                              source={Images.purplecartIcon}
                            />
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <View style={[Helpers.btnContainer, { bottom: 0 }]}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
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
                  onPress={this._goToTelehealth.bind(this)}>
                  <Text
                    style={[
                      Helpers.btnText,
                      { color: Colors.patientColor, fontSize: 17 },
                    ]}>
                    {this.props.selectedMessage['Product-Prescription']}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        )}

        <View style={{ height: 80 }}></View>

        {this.props.prescriptionList?.length > 0 && (
          <View
            style={[
              Helpers.bottomView,
              { backgroundColor: '#28998d', flexDirection: 'row' },
            ]}>
            {canGotoPay ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    marginLeft: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      Helpers.lightBook,
                      {
                        fontSize: 13,
                        color: '#FFFFFF',
                        textAlign: 'left',
                        width: 50,
                      },
                    ]}>
                    {this.props.selectedMessage['Product-Total']}:
                  </Text>
                </View>
                <Text
                  style={[
                    Helpers.mediumFont,
                    { fontSize: 18, color: '#FFFFFF', textAlign: 'left' },
                  ]}>
                  ${this.props.prescriptionList[0].Price}
                </Text>
                <View
                  style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginRight: 20,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 150,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      NavigationService.navigate('ConformShipping', {
                        orderDetail: this.props.prescriptionList[0],
                      });
                    }}>
                    <Text
                      style={[
                        Helpers.bold,
                        {
                          fontSize: 13,
                          color: '#28998D',
                          textAlign: 'center',
                          width: 100,
                        },
                      ]}>
                      {this.props.selectedMessage['Product-PayNow']}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    marginLeft: 20,
                    marginRight: 20,
                  }}>
                  <Image
                    style={{ width: 18, height: 18 }}
                    resizeMode="contain"
                    source={Images.CartWhite}
                  />
                </View>
                <TouchableOpacity
                  style={{ width: 100 }}
                  onPress={() => {
                    this.setState({ canGotoPay: true });
                  }}>
                  <Text
                    style={[
                      Helpers.lightBook,
                      {
                        fontSize: 13,
                        color: '#FFFFFF',
                        textAlign: 'left',
                        width: 100,
                      },
                    ]}>
                    View {this.props.prescriptionList[0].Qty} Items
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    Helpers.mediumFont,
                    {
                      marginRight: 20,
                      fontSize: 15,
                      color: '#FFFFFF',
                      textAlign: 'right',
                      flexGrow: 1,
                    },
                  ]}>
                  ${this.props.prescriptionList[0].Price}
                </Text>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

OurProducts.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,
  authenticateUser: PropTypes.func,
  resetAuthenticateStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  getPrescription: PropTypes.func,
  resetPrescription: PropTypes.func,

  prescriptionList: PropTypes.object,
  prescriptionErrorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,
  selectedMessage: state.startup.selectedMessage,
  prescriptionList: state.patientProfile.prescriptionList,
  prescriptionErrorMessage: state.patientProfile.prescriptionErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (data) =>
    dispatch(AuthenticateActions.authenticateUser(data)),
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),

  getPrescription: (data) =>
    dispatch(PatientProfileActions.getPrescription(data)),
  resetPrescription: () => dispatch(PatientProfileActions.resetPrescription()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OurProducts);
