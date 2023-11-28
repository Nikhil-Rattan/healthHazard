import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeaderNew from 'App/Components/CustomHeaderNew';
import Telehealthexpertlist from 'App/Components/Telehealthexpertlist';
import ValidationComponent from 'react-native-form-validator';
import { Colors, Fonts, Images, Helpers } from 'App/Theme';

import { Enums, OrderTrackingEnum } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import PatientActions from 'App/Stores/PatientProfile/Actions';
import NavigationService from 'App/Services/NavigationService';

import StepIndicator from 'react-native-step-indicator';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 0.5,
  currentStepStrokeWidth: 0.5,
  stepStrokeCurrentColor: '#aaaaaa',
  stepStrokeWidth: 0.5,
  stepStrokeFinishedColor: '#28998D',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#aaaaaa',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#28998D',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#aaaaaa',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#aaaaaa',
};

class OrderTrackingScreen extends ValidationComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('start');

    let OrderDetail = this.props.route.params.OrderDetail;

    this.props.resetGetOrderDetail();
    let payload = {
      OrderId: OrderDetail.OrderId,
    };
    this.props.getOrderDetail(payload);
  }

  componentWillUnmount() { }

  _GoBackScreen() {
    NavigationService.popScreen();
  }

  renderOrderStatus(status) {
    let statusColor = Colors.BlueColorNew;
    switch (status) {
      case OrderTrackingEnum.OrderDelivered:
        statusColor = Colors.GreenColor;
        break;
      case OrderTrackingEnum.OrderFailed:
        statusColor = Colors.RedColor;
        break;
      default:
        statusColor = Colors.BlueColorNew;
        break;
    }

    return statusColor;
  }

  getStepIndicatorIconConfig({ position, stepStatus }) {
    let indicator = Images.ValidGreen;
    if (
      stepStatus == 'finished' &&
      this.props.orderTracking[position].OrderStatus ==
      OrderTrackingEnum.OrderFailed
    ) {
      indicator = Images.InValid;
    } else if (stepStatus == 'finished') {
      indicator = Images.ValidGreen;
    } else {
      indicator = Images.UnFinishedStep;
    }

    //labelAlign
    //alert(stepStatus);
    // switch (position) {
    //   case 0: {
    //     indicator = Images.ValidGreen;
    //     break;
    //   }
    //   case 1: {
    //    indicator = Images.ValidGreen;
    //     break;
    //   }
    //   case 2: {
    //     iconConfig.name = 'assessment';
    //     break;
    //   }
    //   case 3: {
    //     iconConfig.name = 'payment';
    //     break;
    //   }
    //   case 4: {
    //     iconConfig.name = 'track-changes';
    //     break;
    //   }
    //   default: {
    //     break;
    //   }
    // }

    return <Image source={indicator} style={{ height: 25, width: 25 }}></Image>;
  }

  renderStatusIcon(Status) {
    let PaymentStatusIcon = Images.TrackCart;

    switch (Status) {
      case OrderTrackingEnum.OrderIntiated:
        PaymentStatusIcon = Images.TrackCart;
        break;
      case OrderTrackingEnum.PaymentWaitingForConfirmation:
        PaymentStatusIcon = Images.ConfirmTrack;
        break;

      case OrderTrackingEnum.PaymentWaitingForConfirmation:
        PaymentStatusIcon = Images.PaymentConfirmed;
        break;
      case OrderTrackingEnum.OrderPlaced:
        PaymentStatusIcon = Images.TrackCart;
        break;
      case OrderTrackingEnum.OrderProcessed:
        PaymentStatusIcon = Images.ProcessedTrack;
        break;

      case OrderTrackingEnum.OrderShipped:
        PaymentStatusIcon = Images.ShipTrack;
        break;

      case OrderTrackingEnum.OrderDelivered:
        PaymentStatusIcon = Images.DeleveredTrack;
        break;

      case OrderTrackingEnum.OrderFailed:
        PaymentStatusIcon = Images.DeleveredTrack;
        break;
      case OrderTrackingEnum.OrderCancelled:
        PaymentStatusIcon = Images.DeleveredTrack;
        break;
      default:
        PaymentStatusIcon = Images.TrackCart;
        break;
    }

    return PaymentStatusIcon;
  }

  calculateTrackingContainerHeight() {
    let { orderTracking } = this.props;
    let filterTrackingCount = orderTracking.filter((m) => {
      return (
        m.OrderStatus.includes(OrderTrackingEnum.OrderShipped) ||
        m.OrderStatus.includes(OrderTrackingEnum.OrderFailed)
      );
    }).length;
    return orderTracking.length + filterTrackingCount;
  }

  CalculateTrackingTextConatinerHeight(OrderStatus, isTopMargin) {
    let defaultHeight = 60;
    let defaultTopMargin = 40;

    if (
      OrderStatus.includes(OrderTrackingEnum.OrderShipped) ||
      OrderStatus.includes(OrderTrackingEnum.OrderFailed)
    ) {
      defaultHeight = 100;
      defaultTopMargin = 80;
      // alert('test');
    }
    return isTopMargin ? defaultTopMargin : defaultHeight;
  }

  renderLabel({ position, label, currentPosition }) {
    const { orderTracking } = this.props;
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          width: '85%',
          marginTop: this.CalculateTrackingTextConatinerHeight(
            orderTracking[position].OrderStatus,
            true,
          ),
        }}>
        <View
          style={{
            width: 35,
            height: this.CalculateTrackingTextConatinerHeight(
              orderTracking[position].OrderStatus,
              false,
            ),
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: 'transparent',
          }}>
          <Image
            source={this.renderStatusIcon(orderTracking[position].OrderStatus)}
            style={{ height: 25, width: 25 }}></Image>
        </View>

        <View
          style={{
            backgroundColor: 'transparent',
            height: this.CalculateTrackingTextConatinerHeight(
              orderTracking[position].OrderStatus,
            ),

            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <View>
            <Text
              style={[
                Helpers.bold,
                {
                  fontSize: 12,
                  color: this.renderOrderStatus(
                    orderTracking[position].OrderStatus,
                  ),
                  flexWrap: 'wrap',
                },
              ]}>
              {
                orderTracking[position][
                'DisplayOrderStatusName-' + this.props.locale
                ]
              }
            </Text>
          </View>
          <Text style={[Helpers.lightBook, { fontSize: 10 }]}>
            <Text style={[Helpers.bold, { fontSize: 10 }]}>
              {this.props.selectedMessage['OrderTrack-OnText']}
            </Text>
            {' : ' + orderTracking[position].CreatedOn}
          </Text>
          {orderTracking[position].PathTecShipService ? (
            <View>
              <Text style={[Helpers.lightBook, { fontSize: 10 }]}>
                <Text style={[Helpers.bold, { fontSize: 10 }]}>
                  {this.props.selectedMessage['OrderTrack-ServiceText']}
                </Text>
                {' : 53575' + ' ' + this.props.selectedMessage['OrderShipping-ServiceText']}
              </Text>
            </View>
          ) : null}
          {orderTracking[position].PathTecOrderTrackingNumber ? (
            <View>
              <Text style={[Helpers.lightBook, { fontSize: 10 }]}>
                <Text style={[Helpers.bold, { fontSize: 10 }]}>
                  {this.props.selectedMessage['OrderTrack-TrackText']}
                </Text>
                {' : 452441' + ' ' +
                  this.props.selectedMessage['PathTecOrderTrackingNumber-Text']}
              </Text>
            </View>
          ) : null}
          {orderTracking[position].Reason ? (
            <View>
              <Text style={[Helpers.lightBook, { fontSize: 10 }]}>
                {orderTracking[position].Reason}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }

  render() {
    const { IsDoctor } = false; // this.props.route.params;
    let OrderDetail = this.props.route.params.OrderDetail;
    return (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: '#f5f5f6' }]}>
        <CustomHeaderNew
          HeaderColor={{ backgroundColor: Colors.white }}
          onPressBackButton={this._GoBackScreen.bind(this)}
          HeaderTitle={
            this.props.selectedMessage['OrderTracking-OrderNo'] +
            ' : ' +
            OrderDetail.OrderNo
          }
          LeftImage={Images.PurPleBackIcon}
          textcolorHeader="#614698"
          Isshadow={true}
        />
        <ScrollView>
          {this.props.orderTracking && (
            <View
              style={[
                styles.OrderCard,
                {
                  height: this.calculateTrackingContainerHeight() * 100,
                },
              ]}>
              <StepIndicator
                stepCount={
                  this.props.orderTracking
                    ? this.props.orderTracking?.length
                    : 0
                }
                customStyles={customStyles}
                currentPosition={this.props.orderTracking?.length}
                labels={this.props.orderTracking}
                direction={'vertical'}
                renderStepIndicator={this.getStepIndicatorIconConfig.bind(this)}
                renderLabel={this.renderLabel.bind(this)}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

OrderTrackingScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,

  orderTracking: PropTypes.any,
  orderTrackingError: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,

  getOrderDetail: PropTypes.func,
  resetGetOrderDetail: PropTypes.func,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,

  orderTracking: state.patientProfile.orderTracking,
  orderTrackingError: state.patientProfile.orderTrackingError,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,

  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});

const mapDispatchToProps = (dispatch) => ({
  getOrderDetail: (data) => dispatch(PatientActions.getOrderDetail(data)),
  resetGetOrderDetail: () => dispatch(PatientActions.resetGetOrderDetail()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderTrackingScreen);

const styles = StyleSheet.create({
  OrderCard: {
    padding: 20,
    paddingLeft: 5,
    paddingTop: 0,
    marginTop: 20,
    margin: 10,
    borderRadius: 20,
    paddingBottom: 50,
    backgroundColor: '#FFFFFF',
  },
  tile: {
    backgroundColor: 'transparent',
    width: '40%',
    height: '50%',
    marginTop: '5%',
    marginHorizontal: 30,
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#818e97',
    borderRadius: 10,

    //paddingHorizontal:'5%'
  },
});
