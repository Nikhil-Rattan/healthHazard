import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Alert,
  SearchBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import { KeyboardAvoidingView } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Helpers,
  ApplicationStyles,
} from 'App/Theme';
import CustomInputBox from 'App/Components/CustomInputBox';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { ExtractCityState } from 'App/Stores/Authentication/Selectors';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import NavigationService from 'App/Services/NavigationService';
import ListCard from 'App/Components/ListCard';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import CustomSearchTextbox from 'App/Components/CustomSearchTextbox';
import { Enums } from 'App/Enums';
import { ValidationService } from 'App/Services/ValidationService';

import CustomDDLPopUp from 'App/Components/CustomDDLPopUp';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import PatientProfileActions from 'App/Stores/PatientProfile/Actions';
import OrderActions from 'App/Stores/Order/Actions';
import { TextInputMask } from 'react-native-masked-text';
//import stripe from 'App/NativeLib/StripePaymentModule';
import { Config } from 'App/Config';
// stripe.setOptions({
//   publishingKey: Config.StripeKey,
// });

class ConformShipping extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      IsMessageShow: false,
      Message: '',
      IsbillingAddressSame: true,
      AddressLine1: '',
      AddressLine1error: false,
      AddressLine2: '',
      AddressLine2error: false,
      zipCode: '',
      zipCodeerror: false,
      zipCodeTouched: false,
      AddressLine1Touched: false,
      statePicked: this.props.selectedMessage['RegisterProfile-SelectState'],
      cityPicked: this.props.selectedMessage['RegisterProfile-SelectCity'],

      selectedStateValue: null,
      statePopUpIsSelected: false,
      selectedStateLable: this.props.selectedMessage[
        'RegisterProfile-SelectState'
      ],

      selectedCityValue: null,
      cityPopUpIsSelected: false,
      selectedCityLable: this.props.selectedMessage[
        'RegisterProfile-SelectCity'
      ],

      animation: new Animated.Value(0),

      inputs: {
        CardName: {
          type: 'CardName',
          value: '',
          touched: false,
        },
        CardNumber: {
          type: 'CardNumber',
          value: '',
          touched: false,
        },
        CardDate: {
          type: 'CardDate',
          value: '',
          touched: false,
        },
        CVVNumber: {
          type: 'CVVNumber',
          value: '',
          touched: false,
        },
      },
    };
    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }
  //Depricated
  orderPlaced(paymentIntentId, status) {
    let { patientAddresses } = this.props;
    let orderDetail = this.props.route.params.orderDetail;
    let {
      zipCode,
      selectedStateValue,
      selectedCityValue,
      selectedCityLable,
      AddressLine1,
      IsbillingAddressSame,
    } = this.state;

    let completeOrderPayload = {
      OrderId: orderDetail.OrderId,
      PaymentIntentId: paymentIntentId,
      PatientId: orderDetail.PatientId,
      PaymentStatus: status,
      Amount: orderDetail.Price,
      LoginUserId: this.props.authenticatedUser?.UserId,
      ShippingAddress: patientAddresses.ShippingAddress,
      ShippingZipCode: patientAddresses?.ShippingZipCode,
      ShippingCityName: patientAddresses?.ShippingCity,
      ShippingCityId: patientAddresses?.ShippingCityId,
      ShippingState: patientAddresses?.ShippingState,
      IsBillingSameAsShipping: IsbillingAddressSame,
      BlPhoneNo: patientAddresses.BillingPhoneNo,
      BlAddress: AddressLine1,
      BlZipCode: zipCode,
      BlCityName: selectedCityLable,
      BlState: selectedStateValue,
      BlCityId: selectedCityValue,
      DecryptColumns: ['ShippingAddress', 'BlAddress'],
      UserKey: this.props.authenticatedUser?.UserKey,
    };
    this.props.compeletePatientOrder(completeOrderPayload);
  }

  onAddressLine1Change(text) {
    if (text == '') {
      this.setState({
        AddressLine1: text,
        AddressLine1error: true,
        AddressLine1Touched: true,
      });
    } else {
      this.setState({
        AddressLine1: text,
        AddressLine1error: false,
        AddressLine1Touched: true,
      });
    }
  }
  onAddressLine2Change(text) {
    this.setState({ AddressLine2: text });
  }

  onzipCodeChange(text) {
    if (text == '') {
      this.setState({ zipCode: text, zipCodeerror: true, zipCodeTouched: true });
    } else {
      this.setState({ zipCode: text, zipCodeerror: false, zipCodeTouched: true });
    }
  }

  resetStateCity() {
    this.setState({
      selectedStateValue: null,
      statePopUpIsSelected: false,
      selectedStateLable: this.props.selectedMessage[
        'RegisterProfile-SelectState'
      ],

      selectedCityValue: null,
      cityPopUpIsSelected: false,
      selectedCityLable: this.props.selectedMessage[
        'RegisterProfile-SelectCity'
      ],
    });
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this.props.closePatientProfileLoading();
  }

  // async validateCard(paymentIntentId) {
  //   this.props.patientProfileLoading();
  //   let { patientAddresses } = this.props;
  //   let orderDetail = this.props.route.params.orderDetail;
  //   let { inputs } = this.state;
  //   let expDateData = inputs['CardDate'].value.split('/');

  //   let cardData = {
  //     number: inputs['CardNumber'].value,
  //     expMonth: +expDateData[0],
  //     expYear: +expDateData[1],
  //     cvc: inputs['CVVNumber'].value,
  //   };
  //   const isCardValid = stripe.isCardValid(cardData);

  //   if (isCardValid) {
  //     //alert(isCardValid)

  //     stripe
  //       .confirmPayment(paymentIntentId, cardData)
  //       .then((result) => {
  //         //this.UpdatePaymentStatus(paymentIntentId, result.status);
  //         this.props.compeletePatientOrderSuccess(result.status);
  //       })
  //       .catch(
  //         (error) => {
  //           console.log(
  //             error.message.split('com.stripe.android.exception.APIException:')
  //               .length > 1
  //               ? error.message.split(
  //                 'com.stripe.android.exception.APIException:',
  //               )[1]
  //               : 'Error',
  //           );
  //           this.props.compeletePatientOrderSuccess('failed');
  //           //  this.UpdatePaymentStatus(paymentIntentId, 'failed');
  //         },
  //         // error performing payment
  //       );
  //   } else {
  //     this.props.closePatientProfileLoading();
  //     //this.props.compeletePatientOrderSuccess('failed');

  //     const { inputs } = this.state;

  //     const updatedCardNumberError = {
  //       ...inputs['CardNumber'],
  //       errorLabel: '^Required',
  //       value: cardData.number,
  //       touched: true,
  //     };
  //     const updatedCardDateError = {
  //       ...inputs['CardDate'],
  //       errorLabel: '^Required',
  //       value: cardData.CardDate,
  //       touched: true,
  //     };
  //     const updatedCVVNumberError = {
  //       ...inputs['CVVNumber'],
  //       errorLabel: '^Required',
  //       value: cardData.CVVNumber,
  //       touched: true,
  //     };

  //     let input = {
  //       ...inputs,
  //       CardNumber: updatedCardNumberError,
  //       CardDate: updatedCardDateError,
  //       CVVNumber: updatedCVVNumberError,
  //     };

  //     this.setState({ inputs: input });
  //   }

  //   //console.log(obj)

  //   //alert(isCardValid)
  // }

  _onZipCodeInputBlur(event) {
    this.props.resetStateCity();

    //this.resetCityStateValue()
    // this.onInputChange({ id: 'state', value: '' })
    this.resetStateCity();
    if (this.state.zipCode !== '') {
      this.props.getCityStateByZipCode({ zipCode: event.nativeEvent.text });
    }
  }

  componentDidMount() {
    this.props.resetStateCity();
    this.resetStateCity();
    // let {authenticatedUser}=this.props
    // this.props.getUserDetailById({UserId:authenticatedUser.UserId,UserKey:authenticatedUser.UserKey,IsComeFrom:Enums.UpdateUserScreen,UserRoleId:authenticatedUser.UserRoleId})

    // setTimeout(() => {
    //   this.RBSheet.open()
    //   }, 500);
    let orderDetail = this.props.route.params.orderDetail;
    this.props.resetPatientAddresses();
    let userPayload = {
      PatientId: orderDetail.PatientId,
      DecryptColumns: ['ShippingAddress', 'BillingAddress'],
      UserKey: this.props.authenticatedUser.UserKey,
      OrderId: orderDetail.OrderId,
    };
    this.props.getPatientAddresses(userPayload);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.createIntentResponse != null) {
      //alert(this.props.addKitResultErrorMessage)
      // alert(this.props.createIntentResponse)
      let paymentIntent = this.props.createIntentResponse;
      // this.validateCard(paymentIntent);
      this.props.resetIntent();
    }

    if (this.props.compeletePatientOrderSuccessMessage != null) {
      //alert(this.props.addKitResultErrorMessage)
      // alert(this.props.createIntentResponse)
      let orderDetail = this.props.route.params.orderDetail;
      // alert(this.props.compeletePatientOrderSuccessMessage)

      this.props.resetCompeletePatientOrder();
      let message = this.props.compeletePatientOrderSuccessMessage;
      switch (message) {
        case 'succeeded':
          NavigationService.navigate('PaymentRecieved', {
            orderDetail: orderDetail,
          });
          break;
        case 'processing':
          NavigationService.navigate('PaymentRecieved', {
            orderDetail: orderDetail,
          });
          break;
        default:
          this.RBErrorSheet.open();
          break;
      }
    }
    if (this.props.compeletePatientOrderErrorMessage != null) {
      //alert(this.props.addKitResultErrorMessage)
      // alert(this.props.createIntentResponse)

      this.props.resetCompeletePatientOrder();
      this.RBErrorSheet.open();
    }

    // if (this.props.patientAddressesErrorMessage != null) {
    //   //alert(this.props.addKitResultErrorMessage)
    //   // alert(this.props.patientAddressesErrorMessage);
    //   this.RBErrorSheet.open();
    // }

    if (this.props.extractedCityState?.stateList.length == 1) {
      if (
        prevProps?.extractedCityState.stateList.length == 0 &&
        this.props?.extractedCityState?.stateList.length == 1
      ) {
        let stateValue = this.props.extractedCityState?.stateList[0].value;

        setTimeout(() => {
          this.setState({
            selectedStateValue: this.props.extractedCityState?.stateList[0]
              .value,
            statePopUpIsSelected: false,
            selectedStateLable: this.props.extractedCityState?.stateList[0]
              .Name,
          });
        }, 500);

        let cities = this.props.extractedCityState
          ? this.props.extractedCityState.cityList
          : [];

        let cityBySateName = cities.filter((data) => {
          return data.stateName === stateValue;
        });

        //  this.setState({statePicked:picked,cityList:cityBySateName })

        if (cityBySateName.length == 1) {
          setTimeout(() => {
            this.setState({
              selectedCityValue: cityBySateName[0].value,
              cityPopUpIsSelected: false,
              selectedCityLable: cityBySateName[0].Name,
            });
          }, 800);
        }

        this.setState({
          cityList: cityBySateName,
        });
      } else if (
        prevProps?.extractedCityState?.stateList.length == 1 &&
        this.props?.extractedCityState?.stateList.length == 1 &&
        prevProps?.extractedCityState?.stateList[0].value !=
        this.props.extractedCityState?.stateList[0].value
      ) {
        let stateSelectedValue = this.props.extractedCityState?.stateList[0]
          .value;
        setTimeout(() => {
          this.setState({
            selectedStateValue: this.props.extractedCityState?.stateList[0]
              .value,
            statePopUpIsSelected: false,
            selectedStateLable: this.props.extractedCityState?.stateList[0]
              .Name,
          });
        }, 500);

        // setTimeout(() => {
        //   this.onInputChange({ id: 'state', value: stateSelectedValue })
        // }, 500);

        let cities = this.props.extractedCityState
          ? this.props.extractedCityState.cityList
          : [];

        let cityBySateName = cities.filter((data) => {
          return data.stateName === stateSelectedValue;
        });

        //  this.setState({statePicked:picked,cityList:cityBySateName })

        if (cityBySateName.length == 1) {
          setTimeout(() => {
            this.setState({
              selectedCityValue: cityBySateName[0].value,
              cityPopUpIsSelected: false,
              selectedCityLable: cityBySateName[0].Name,
            });
          }, 800);

          // this.onInputChange({ id: 'city', value: cityBySateName[0].value })
        }

        this.setState({
          cityList: cityBySateName,
        });
      }
    }
  }

  _PayNow() {
    this.RBErrorSheet.close();
    this.props.resetIntent();

    if (this.IsFormValidate()) {
      //     alert('valid');
      this.props.patientProfileLoading();
      this.CreateStripePaymentIntent();
    }

    // let SamebillingAddress = this.state.IsbillingAddressSame;
    // const firstInvalidCoordinate = this.getFormValidation();

    // if (firstInvalidCoordinate !== null) {
    //   return;
    // }
    // if (SamebillingAddress) {
    //   this.props.patientProfileLoading();
    //   this.CreateStripePaymentIntent();
    // } else {
    //   let {
    //     AddressLine1,
    //     zipCode,
    //     selectedStateValue,
    //     selectedCityValue,
    //   } = this.state;
    //   if (AddressLine1 == '') {
    //     this.setState({AddressLine1error: true});
    //   } else if (zipCode == '') {
    //     this.setState({zipCodeerror: true, zipCodeTouched: true});
    //   } else if (selectedStateValue == null) {
    //     this.setState({statePopUpIsSelected: true});
    //   } else if (selectedCityValue == null) {
    //     this.setState({cityPopUpIsSelected: true});
    //   } else {
    //     this.props.patientProfileLoading();
    //     this.CreateStripePaymentIntent();
    //   }
    // }
  }

  IsFormValidate() {
    let SamebillingAddress = this.state.IsbillingAddressSame;
    let IsFormValid = true;
    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      IsFormValid = false;
    }
    if (!SamebillingAddress) {
      let {
        AddressLine1,
        zipCode,
        selectedStateValue,
        selectedCityValue,
      } = this.state;
      if (AddressLine1 == '') {
        this.setState({ AddressLine1error: true });
        IsFormValid = false;
      }
      if (zipCode == '') {
        this.setState({ zipCodeerror: true, zipCodeTouched: true });
      }
      if (selectedStateValue == null) {
        this.setState({ statePopUpIsSelected: true });
        IsFormValid = false;
      }
      if (selectedCityValue == null) {
        this.setState({ cityPopUpIsSelected: true });
        IsFormValid = false;
      }
    }

    return IsFormValid;
  }

  UpdatePaymentStatus(paymentIntentId, status) {
    let orderDetail = this.props.route.params.orderDetail;
    let paymentpayload = {
      OrderId: orderDetail.OrderId,
      PaymentIntentId: paymentIntentId,
      PaymentStatus: status,
      Amount: orderDetail.Price,
      PatientId: orderDetail.PatientId,
    };

    this.props.compeletePatientOrder(paymentpayload);
  }
  CreateStripePaymentIntent() {
    let { patientAddresses } = this.props;
    let orderDetail = this.props.route.params.orderDetail;
    let {
      zipCode,
      selectedStateValue,
      selectedCityValue,
      selectedCityLable,
      AddressLine1,
      IsbillingAddressSame,
    } = this.state;

    let completeOrderPayload = { paymentIntentPayload: {}, addressPayload: {} };

    completeOrderPayload.paymentIntentPayload = {
      Amount: orderDetail.Price * 100,
      Currency: 'USD',
      Metadata: {},
    };

    completeOrderPayload.paymentIntentPayload.Metadata = {
      OrderId: orderDetail.OrderId,
      PatientId: orderDetail.PatientId,
    };

    completeOrderPayload.addressPayload = {
      PatientId: orderDetail.PatientId,
      PhoneNo: patientAddresses.ShippingPhoneNo,
      Email: this.props.authenticatedUser?.Email,
      FirstName: this.props.authenticatedUser?.FirstName,
      LastName: this.props.authenticatedUser?.LastName,
      OrderId: orderDetail.OrderId,
      LoginUserId: this.props.authenticatedUser?.UserId,
      Address: patientAddresses.ShippingAddress,
      ZipCode: patientAddresses?.ShippingZipCode,
      City: patientAddresses?.ShippingCityId,
      State: patientAddresses?.ShippingState,
      IsBillingSameAsShipping: IsbillingAddressSame,
      DecryptColumns: ['Address', 'FirstName', 'LastName'],
      UserKey: this.props.authenticatedUser?.UserKey,
    };
    if (!IsbillingAddressSame) {
      (completeOrderPayload.addressPayload.BlPhoneNo =
        patientAddresses.BillingPhoneNo),
        (completeOrderPayload.addressPayload.BlAddress = AddressLine1),
        (completeOrderPayload.addressPayload.BlZipCode = zipCode),
        (completeOrderPayload.addressPayload.BlState = selectedStateValue),
        (completeOrderPayload.addressPayload.BlCity = selectedCityValue);
      completeOrderPayload.addressPayload.DecryptColumns.push('BlAddress');
    }
    this.props.createIntent(completeOrderPayload);
  }

  popUpStateListItemOnChange = (selectedStateValue) => {
    // alert(this.state.selectedStateLable)

    let value = '';
    //this.onInputChange({ id: 'city', value })
    value = selectedStateValue.value;
    //  this.setError("state",)
    // this.onInputChange({ id: 'state', value })

    let cities = this.props.extractedCityState
      ? this.props.extractedCityState.cityList
      : [];

    let cityBySateName = cities.filter((data) => {
      return data.stateName === value;
    });

    //  this.setState({statePicked:picked,cityList:cityBySateName })
    this.setState({
      cityList: cityBySateName,
      selectedStateValue: selectedStateValue.value,
      selectedStateLable: selectedStateValue.Name,
      statePopUpIsSelected: false,
    });

    if (cityBySateName.length == 1) {
      setTimeout(() => {
        this.setState({
          selectedCityValue: cityBySateName[0].value,
          cityPopUpIsSelected: false,
          selectedCityLable: cityBySateName[0].Name,
        });
      }, 500);

      // setTimeout(() => {
      //   this.onInputChange({ id: 'city', value: cityBySateName[0].value })
      // }, 500);
    }
  };

  popUpCityListItemOnChange = (selectedCityValue) => {
    //alert(selectedValue)

    let value = selectedCityValue.value;
    //  this.setError("state",)
    // this.onInputChange({ id: 'city', value })
    //  this.setState({statePicked:picked,cityList:cityBySateName })
    this.setState({
      selectedCityValue: selectedCityValue.value,
      selectedCityLable: selectedCityValue.label,
      cityPopUpIsSelected: false,
    });
  };

  _onPressButton() {
    NavigationService.popScreen();
  }

  onClickListenergocheck() {
    let { imgchecked, IsbillingAddressSame } = this.state;
    this.setState({
      imgchecked: !imgchecked,
      IsbillingAddressSame: !IsbillingAddressSame,
      zipCode: '',
      AddressLine1: '',
      AddressLine2: '',
      AddressLine1Touched: false,
      zipCodeTouched: false,
    });
    this.props.resetStateCity();
    this.resetStateCity();
  }
  render() {
    // console.log('start')
    // console.log(this.props.stateList)
    // console.log('close')
    const { patientAddresses } = this.props;
    const IsFacility = this.props.accountType === Enums.Facility;
    const orderDetail = this.props.route.params.orderDetail;
    return (
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
        <RBSheet
          ref={(ref) => {
            this.RBErrorSheet = ref;
          }}
          height={500}
          openDuration={250}
          //onClose={this._closeBottomSheet.bind(this)}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            // draggableIcon: {
            //   backgroundColor: "white"
            // },
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              //backgroundColor:rejectColor,
            },
          }}>
          <View>
            <Image
              style={{ width: 120, height: 120, alignSelf: 'center' }}
              resizeMode="contain"
              source={Images.StripePymentFailed}
            />
          </View>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text
              style={[
                Helpers.btnText,
                Helpers.mediumfont,
                {
                  color: Colors.patientColor,
                  fontSize: 30,
                  textAlign: 'center',
                  marginTop: 25,
                  justifyContent: 'center',
                },
              ]}>
              {this.props.selectedMessage['PaymentStatus-Failed']}
            </Text>

            <Text
              style={[
                Helpers.btnText,
                Helpers.book,
                {
                  color: Colors.BlueColorNew,
                  fontSize: 15,
                  textAlign: 'center',
                  marginTop: 15,
                  marginBottom: 15,
                  width: 330,
                },
              ]}>
              {this.props.selectedMessage['PaymentStatus-ErrorDetail']}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              Helpers.btn,
              {
                backgroundColor: Colors.patientColor,
                width: '90%',
                alignSelf: 'center',
              },
            ]}
            onPress={this._PayNow.bind(this)}>
            <Text
              style={[Helpers.btnText, { color: Colors.white, fontSize: 17 }]}>
              {this.props.selectedMessage['AccountLogin-TryAgainButton']}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              Helpers.btn,
              {
                marginTop: 12,
                marginBottom: 10,
                backgroundColor: Colors.white,
                width: '90%',
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: Colors.patientColor,
              },
            ]}
            onPress={() => {
              this.RBErrorSheet.close();
            }}>
            <Text
              style={[
                Helpers.btnText,
                { color: Colors.patientColor, fontSize: 17 },
              ]}>
              {this.props.selectedMessage['TestResult-Cancel']}
            </Text>
          </TouchableOpacity>
        </RBSheet>

        <Dialog
          dialogStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          visible={this.props.isPatientProfileLoading}>
          <DialogContent style={{ backgroundColor: 'transparent' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={Images.Loaderimg}
                style={{
                  alignItems: 'center',
                  resizeMode: 'center',
                  marginTop: 17,
                }}
              />
            </View>
          </DialogContent>
        </Dialog>

        <ScrollView style={{ flex: 1 }}>
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
                onPress={this._onPressButton}>
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
              <Image
                style={{ height: 100, width: 100 }}
                source={Images.MainLogo}
              />
            </View>
          </View>
          <View
            style={{ width: '90%', backgroundColor: 'white', marginLeft: 20 }}>
            <Text
              style={[
                Helpers.bold,
                {
                  fontSize: 22,
                  lineHeight: 33,
                  width: '100%',
                  color: '#152C52',
                  marginTop: 15,
                },
              ]}>
              {this.props.selectedMessage['Product-ConfirmShipping']}
            </Text>
            <Text
              style={[
                Helpers.mediumFont,
                {
                  fontSize: 15,
                  lineHeight: 18,
                  width: '90%',
                  color: '#152C52',
                  marginTop: 5,
                },
              ]}>
              {patientAddresses?.ShippingAddress +
                ',' +
                patientAddresses?.ShippingCity +
                ',' +
                patientAddresses?.ShippingState +
                ' ' +
                patientAddresses?.ShippingZipCode}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  imgchecked: true,
                  IsbillingAddressSame: true,
                });
                NavigationService.navigate('EditShipping', {
                  orderDetail: orderDetail,
                });
              }}>
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 15,
                    lineHeight: 18,
                    width: '90%',
                    color: '#815CCC',
                    marginTop: '2%',
                  },
                ]}>
                {this.props.selectedMessage['ShippingAddress-Change']}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={[
              Helpers.bold,
              {
                fontSize: 22,
                lineHeight: 27,
                width: '90%',
                color: '#152C52',
                marginLeft: 20,
                marginTop: 20,
              },
            ]}>
            {this.props.selectedMessage['Product-AddPaymentDetails']}
          </Text>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer,
                this.renderError('CardName')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.patientColor },
                { marginBottom: 0 },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                {
                  color: IsFacility
                    ? Colors.facilityColor
                    : Colors.patientColor,
                },
              ]}
              placeholder={this.props.selectedMessage['Product-NameOnCard']}
              placeholderTextColor="#BDBDBD"
              maxLength={25}
              onChangeText={(value) =>
                this.onInputChange({ id: 'CardName', value })
              }
              value={this.state.inputs.CardName.value}
              inputLabl={''}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
            />
            <CustomInputBox
              containerStyle={[
                Helpers.RectangletxtInputContainer,
                this.renderError('CardNumber')
                  ? { borderColor: Colors.error }
                  : { borderColor: Colors.patientColor },
                { marginBottom: 0 },
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                Helpers.fill,
                { color: Colors.patientColor },
              ]}
              placeholder={this.props.selectedMessage['Product-CardNo']}
              placeholderTextColor="#BDBDBD"
              maxLength={16}
              onChangeText={(value) =>
                this.onInputChange({ id: 'CardNumber', value })
              }
              value={this.state.inputs.CardNumber.value}
              inputLabl={''}
              componentStyle={[Helpers.column, Helpers.crossStart]}
              inputBoxLableStyle={[Helpers.inputBoxLable]}
              hasEvent={false}
              keyboardType="phone-pad"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{ width: '45%', justifyContent: 'flex-end' }}>
              <View
                style={[
                  Helpers.txtRoundInputContainer,
                  { marginTop: 5, paddingBottom: '12%' },
                  this.renderError('CardDate')
                    ? { borderColor: Colors.error }
                    : {},
                ]}>
                <TextInputMask
                  placeholder={this.props.selectedMessage['Product-MMYY']}
                  placeholderTextColor={Colors.placeholderGraycolor}
                  style={[Helpers.txtRoundInputs, Helpers.fill]}
                  type={'custom'}
                  options={{
                    mask: '99/99',
                  }}
                  maxLength={5}
                  keyboardType="phone-pad"
                  returnKeyType="done"
                  value={this.state.inputs.CardDate.value}
                  onChangeText={(value) =>
                    this.onInputChange({ id: 'CardDate', value })
                  }
                />

                {this.state.inputs['CardDate'].touched ? (
                  this.renderError('CardDate') ? (
                    <Image
                      style={[Helpers.rightIconStyle]}
                      resizeMode="contain"
                      source={Images.InValid}
                    />
                  ) : (
                    <Image
                      style={[Helpers.rightIconStyle]}
                      resizeMode="contain"
                      source={Images.ValidPurple}
                    />
                  )
                ) : null}
              </View>
            </View>

            <View style={{ width: '45%', alignItems: 'flex-end' }}>
              <CustomInputBox
                containerStyle={[
                  Helpers.RectangletxtInputContainer,
                  this.renderError('CVVNumber')
                    ? { borderColor: Colors.error }
                    : { borderColor: Colors.patientColor },
                  { marginBottom: 4 },
                ]}
                inputBoxstyle={[
                  Helpers.txtRoundInputs,
                  Helpers.fill,
                  { color: Colors.patientColor },
                ]}
                placeholder={this.props.selectedMessage['Product-CVV']}
                placeholderTextColor="#BDBDBD"
                maxLength={4}
                keyboardType="phone-pad"
                onChangeText={(value) =>
                  this.onInputChange({ id: 'CVVNumber', value })
                }
                value={this.state.inputs.CVVNumber.value}
                inputLabl={''}
                componentStyle={[Helpers.column, Helpers.crossStart]}
                inputBoxLableStyle={[Helpers.inputBoxLable]}
                hasEvent={false}
              />
            </View>
          </View>

          {this.state.IsbillingAddressSame ? null : (
            <View>
              <Text
                style={[
                  Helpers.bold,
                  {
                    fontSize: 22,
                    lineHeight: 27,
                    width: '90%',
                    color: '#152C52',
                    marginLeft: 20,
                    marginTop: 20,
                  },
                ]}>
                {this.props.selectedMessage['Product-BillingAddress']}
              </Text>

              <View style={{ marginHorizontal: 20 }}>
                <CustomInputBox
                  containerStyle={[
                    Helpers.txtRoundInputContainer, ,
                    this.state.AddressLine1error
                      ? { borderColor: Colors.error }
                      : {},
                  ]}
                  inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
                  placeholder={
                    this.props.selectedMessage[
                    'RegisterProfile-StreetAddress'
                    ] + ' 1'
                  }
                  placeholderTextColor={Colors.placeholderGraycolor}
                  onChangeText={(text) => this.onAddressLine1Change(text)}
                  value={this.state.AddressLine1}
                  //  inputLabl={this.props.selectedMessage["RegisterProfile-Address"]}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  inputBoxLableStyle={[Helpers.inputBoxLable]}
                  hasEvent={false}
                  hasRightIcon={true}
                  maxLength={40}
                  rightIcon={
                    this.state.AddressLine1Touched
                      ? this.state.AddressLine1error
                        ? Images.InValid
                        : Images.ValidPurple
                      : null
                  }
                />
              </View>

              <View style={{ marginHorizontal: 20 }}>
                <CustomInputBox
                  containerStyle={[Helpers.txtRoundInputContainer]}
                  inputBoxstyle={[Helpers.txtRoundInputs, Helpers.fill]}
                  placeholder={
                    this.props.selectedMessage[
                    'RegisterProfile-StreetAddress'
                    ] + ' 2'
                  }
                  placeholderTextColor={Colors.placeholderGraycolor}
                  onChangeText={(text) => this.onAddressLine2Change(text)}
                  value={this.state.AddressLine2}
                  //  inputLabl={this.props.selectedMessage["RegisterProfile-Address"]}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  inputBoxLableStyle={[Helpers.inputBoxLable]}
                  hasEvent={false}
                  hasRightIcon={true}
                  maxLength={40}
                  rightIcon={null}
                />
              </View>

              <View style={{ marginHorizontal: 20 }}>
                <CustomInputBox
                  containerStyle={[
                    Helpers.txtRoundInputContainer, ,
                    this.state.zipCodeTouched
                      ? this.state.zipCodeerror
                        ? { borderColor: Colors.error }
                        : {}
                      : {},
                  ]}
                  inputBoxstyle={[Helpers.txtRoundInputs]}
                  placeholder={
                    this.props.selectedMessage['RegisterProfile-ZipCode']
                  }
                  placeholderTextColor={Colors.placeholderGraycolor}
                  onChangeText={(text) => this.onzipCodeChange(text)}
                  // onChangeText={(value) => this.onInputChange({ id: 'zipCode', value })}
                  onEndEditing={this._onZipCodeInputBlur.bind(this)}
                  value={this.state.zipCode}
                  //  inputLabl={this.props.selectedMessage["RegisterProfile-ZipCode"]}
                  componentStyle={[Helpers.column, Helpers.crossStart]}
                  inputBoxLableStyle={[Helpers.inputBoxLable]}
                  rightIconStyle={[Helpers.rightIconStyle]}
                  hasEvent={false}
                  hasRightIcon={true}
                  maxLength={7}
                  rightIcon={
                    this.state.zipCodeTouched
                      ? this.state.zipCodeerror
                        ? Images.InValid
                        : Images.ValidPurple
                      : null
                  }></CustomInputBox>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: '45%' }}>
                  <CustomDDLPopUp
                    ddlContainerStyle={[
                      Helpers.buttonContainer,
                      Metrics.smallVerticalMargin,
                      { backgroundColor: 'transparent', borderWidth: 0.8, borderRadius: 10 },
                      this.state.selectedStateValue
                        ? { borderColor: Colors.patientColor }
                        : { borderColor: Colors.patientColor },
                    ]}
                    ddlLableStyle={[
                      { width: '70%', paddingLeft: 16 },
                      { color: Colors.patientColor },
                    ]}
                    ddlIconContainerStyle={[{ width: '30%' }]}
                    ddlIconStyle={[Helpers.rightIconStyle]}
                    popUpListItemTextStyle={[Helpers.popUpListItemTextStyle]}
                    popUpListItemStyle={[Helpers.popUpListItemStyle]}
                    popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                    popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                    popUpTitleStyle={[Helpers.popUpTitleStyle]}
                    popUpTitleAlign={'left'}
                    popUpTitleText={
                      this.props.selectedMessage['RegisterProfile-State'] + ' *'
                    }
                    popUpListSrc={
                      this.props.extractedCityState
                        ? this.props.extractedCityState.stateList
                        : []
                    }
                    popUpIsSelected={this.state.statePopUpIsSelected}
                    popUpSelectedValue={this.state.selectedStateValue}
                    popUpSelectedLable={this.state.selectedStateLable}
                    popUpKey={'value'}
                    popUpListItemOnChange={this.popUpStateListItemOnChange.bind(
                      this,
                    )}
                    leftIcon={
                      this.state.selectedStateValue
                        ? Images.DDLPurple
                        : Images.DDLPurple
                    }
                  //  openPopUp={this.props.extractedCityState ? this.props.extractedCityState.stateList.length > 0 : false}
                  ></CustomDDLPopUp>
                </View>
                <View style={{ width: '45%', backgroundColor: 'transparent' }}>
                  <CustomDDLPopUp
                    // add Condition
                    ddlContainerStyle={[
                      Helpers.buttonContainer,
                      Metrics.smallVerticalMargin,
                      { backgroundColor: 'transparent', borderWidth: 0.8, borderRadius: 10 },
                      this.state.selectedCityValue
                        ? { borderColor: Colors.patientColor }
                        : { borderColor: Colors.patientColor },
                    ]}
                    // add Condition
                    ddlLableStyle={[
                      { width: '70%', paddingLeft: 16 },
                      { color: Colors.patientColor },
                    ]}
                    ddlIconContainerStyle={[{ width: '30%' }]}
                    ddlIconStyle={[Helpers.rightIconStyle]}
                    popUpListItemTextStyle={[Helpers.popUpListItemTextStyle]}
                    popUpListItemStyle={[Helpers.popUpListItemStyle]}
                    popUpListContainerStyle={[Helpers.popUpListContainerStyle]}
                    popUpTitletextStyle={[Helpers.popUpTitletextStyle]}
                    popUpTitleStyle={[Helpers.popUpTitleStyle]}
                    popUpTitleAlign={'left'}
                    popUpTitleText={
                      this.props.selectedMessage['RegisterProfile-City'] + ' *'
                    }
                    popUpListSrc={this.state.cityList}
                    popUpIsSelected={this.state.cityPopUpIsSelected}
                    popUpSelectedValue={this.state.selectedCityValue}
                    popUpSelectedLable={this.state.selectedCityLable}
                    popUpKey={'value'}
                    popUpListItemOnChange={this.popUpCityListItemOnChange.bind(
                      this,
                    )}
                    leftIcon={
                      this.state.selectedCityValue
                        ? Images.DDLPurple
                        : Images.DDLPurple
                    }
                  //openPopUp={this.state.cityList.length > 0}
                  ></CustomDDLPopUp>
                </View>
                {this.state.IsButtomTrue ? (
                  <View style={{ height: 200 }}></View>
                ) : null}
              </View>
            </View>
          )}

          <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
            <TouchableOpacity onPress={this.onClickListenergocheck.bind(this)}>
              {this.state.IsbillingAddressSame ? (
                <Image
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                  source={Images.GreenAccept}
                />
              ) : (
                <Image
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                  source={Images.greenuncheck}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
            >
              <Text
                style={
                  ({
                    fontSize: 14,
                    textDecorationLine: 'underline',
                    marginLeft: 17,
                    color: Colors.facilityColor,
                  },
                    Helpers.mediumFont)
                }>
                {this.props.selectedMessage['Product-BillingAddressCheckBox']}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[Helpers.btnContainer, { marginBottom: 15, marginTop: 25 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#614698', '#614698', '#614698']}
              style={[Helpers.bigBtnGradient]}>
              <TouchableOpacity
                style={Helpers.btn}
                onPress={this._PayNow.bind(this)}>
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.white, fontSize: 15 },
                  ]}>
                  {this.props.selectedMessage['Product-PayNow']}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

ConformShipping.propTypes = {
  authenticatedUser: PropTypes.any,
  signOut: PropTypes.func,
  selectedMessage: PropTypes.any,
  getTesterForEditSuccess: PropTypes.func,
  resetTesterForEdit: PropTypes.func,
  getUserDetailById: PropTypes.func,

  cityList: PropTypes.array,
  stateList: PropTypes.array,
  cityStateByZipCodeErrorMessage: PropTypes.string,
  cityStateByZipCodeResponse: PropTypes.any,
  getCityStateByZipCode: PropTypes.func,
  extractedCityState: PropTypes.any,
  resetStateCity: PropTypes.func,
  getPatientAddresses: PropTypes.func,
  resetPatientAddresses: PropTypes.func,
  patientAddresses: PropTypes.any,
  patientAddressesErrorMessage: PropTypes.any,
  createIntent: PropTypes.func,
  resetIntent: PropTypes.func,
  createIntentResponse: PropTypes.any,
  createIntentErrorMessage: PropTypes.any,

  compeletePatientOrder: PropTypes.func,
  resetCompeletePatientOrder: PropTypes.func,

  compeletePatientOrderSuccessMessage: PropTypes.any,
  compeletePatientOrderMessage: PropTypes.any,
  isPatientProfileLoading: PropTypes.any,
  patientProfileLoading: PropTypes.func,
  closePatientProfileLoading: PropTypes.func,
  locale: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,

  cityList: state.authenticate.cityList,
  stateList: state.authenticate.stateList,
  cityStateByZipCodeResponse: state.authenticate.cityStateByZipCodeResponse,
  extractedCityState: ExtractCityState(
    state.authenticate.cityStateByZipCodeResponse,
  ),
  patientAddresses: state.patientProfile.patientAddresses,
  patientAddressesErrorMessage:
    state.patientProfile.patientAddressesErrorMessage,
  createIntentResponse: state.order.createIntentResponse,
  createIntentErrorMessage: state.order.createIntentErrorMessage,

  compeletePatientOrderSuccessMessage:
    state.patientProfile.compeletePatientOrderSuccessMessage,
  compeletePatientOrderMessage:
    state.patientProfile.compeletePatientOrderMessage,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  locale: state.startup.locale,
});

const mapDispatchToProps = (dispatch) => ({
  getCityStateByZipCode: (data) =>
    dispatch(AuthenticateActions.getCityStateByZipCode(data)),
  resetStateCity: () => dispatch(AuthenticateActions.resetStateCity()),
  // signOut: () => dispatch(AuthenticateActions.signOut()),
  //getTesterForEditSuccess: (data) => dispatch(FacilityProfileActions.getTesterForEditSuccess(data)),
  getPatientAddresses: (data) =>
    dispatch(PatientProfileActions.getPatientAddresses(data)),
  resetPatientAddresses: () =>
    dispatch(PatientProfileActions.resetPatientAddresses()),

  getUserDetailById: (data) =>
    dispatch(AuthenticateActions.getUserDetailById(data)),

  createIntent: (data) => dispatch(OrderActions.createIntent(data)),
  resetIntent: () => dispatch(OrderActions.resetIntent()),

  compeletePatientOrder: (data) =>
    dispatch(PatientProfileActions.compeletePatientOrder(data)),
  resetCompeletePatientOrder: () =>
    dispatch(PatientProfileActions.resetCompeletePatientOrder()),
  patientProfileLoading: () =>
    dispatch(PatientProfileActions.patientProfileLoading()),
  closePatientProfileLoading: () =>
    dispatch(PatientProfileActions.closePatientProfileLoading()),

  compeletePatientOrderSuccess: (data) =>
    dispatch(PatientProfileActions.compeletePatientOrderSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConformShipping);

const styles = StyleSheet.create({
  searchTextInput: {
    height: '100%',

    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    width: '40%',
    borderRadius: 10,
    fontSize: 14,
    // textAlign:'center'
  },
  tile: {
    backgroundColor: 'transparent',
    width: '40%',
    height: '100%',
    marginHorizontal: 30,

    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#815CCC',

    borderRadius: 10,

    //paddingHorizontal:'5%'
  },

  borderround: {
    width: '90%',
    height: '10%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: '5%',
    marginTop: '3%',
    borderStyle: 'solid',
    borderColor: '#815CCC',
    borderWidth: 2,
  },
  searchTextInputs: {
    height: '100%',

    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    width: '100%',
    borderRadius: 10,
    fontSize: 14,
    //textAlign:'center'
  },
  tiles: {
    backgroundColor: 'transparent',
    width: '40%',
    height: '100%',
    //  marginTop: '5%',
    marginHorizontal: 30,

    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#818e97',
    borderRadius: 10,

    //paddingHorizontal:'5%'
  },
});
