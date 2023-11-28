import React from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

import { Enums, OrderEnum } from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import PatientActions from 'App/Stores/PatientProfile/Actions';
import NavigationService from 'App/Services/NavigationService';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
class OrderHistoryScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderDataList: [],
      currentPage: 1,
      pageLimit: 10,
      allLoaded: false,
    }
  }

  componentDidMount() {
    console.log('start');
    this._getRecords();
  }

  _getRecords() {
    if (this.state.currentPage == 1)
      this.props.resetGetOrderHistory();
    let payload = {
      PatientId: this.props.authenticatedUser?.PatientId,
      PageSize: this.state.pageLimit,
      PageNo: this.state.currentPage,
    };
    // alert(JSON.stringify(payload))
    this.props.getOrderHistory(payload);
  }

  componentWillUnmount() { }

  _onPressButton() {
    let dashboad =
      this.props.authenticatedUser?.UserRoleId == Enums.Patient
        ? 'PatientHome'
        : 'FacilityHome';
    NavigationService.navigateAndReset(dashboad);
  }

  getItemDetail(item) {
    const { IsDoctor } = false; //this.props.route.params;
    NavigationService.navigate('TelehealthExpertDetails', {
      itemDetail: { ...item, IsDoctor },
    });
  }
  _GoBackScreen() {
    NavigationService.popScreen();
  }

  renderOrderStatus(status) {
    let statusColor = Colors.BlueColorNew;
    switch (status) {
      case OrderEnum.Delivered:
        statusColor = Colors.GreenColor;
        break;
      case OrderEnum.Failed:
        statusColor = Colors.RedColor;
        break;
      default:
        statusColor = Colors.BlueColorNew;
        break;
    }

    return statusColor;
  }

  async componentDidUpdate(prevProps, prevState) {
    // if (this.props.orderList.length > 0 && prevProps.certifiedAllTesters.length != this.props.orderList.length) {
    const { orderDataList, currentPage } = this.state;

    var isExist = false;
    if (this.props.orderList.length > 0) {
      isExist = orderDataList.some(element => {
        if (element.OrderId === this.props.orderList[0].OrderId) {
          return true;
        }
      });
    }

    if (this.state.currentPage > 1 && this.props.orderList.length == 0 && (!this.state.allLoaded)) {
      await this.setState({ allLoaded: true });
    }

    if (this.props.orderList.length > 0) {
      if (orderDataList.length == 0 && currentPage == 1) {
        this.setState({ orderDataList: this.props.orderList });
      }
      else if (!isExist) {
        this.setState({ orderDataList: orderDataList.concat(this.props.orderList) })
      }
    } else if (orderDataList.length > 0 && !this.state.allLoaded) {
      this.setState({ orderDataList: [] });
    }

    // if ((prevProps.certifiedAllTesters.length != this.props.orderList.length)) {
    //   this.setState({ orderDataList: this.props.orderList });
    // }
  }

  scroll_timer = 0;
  handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    clearTimeout(this.scroll_timer);
    this.scroll_timer = setTimeout(() => {
      const paddingToBottom = 100;
      if (
        layoutHeight + scrollPosition >= contentHeight - paddingToBottom &&
        (!this.state.allLoaded)
      ) {
        this.setState({ currentPage: this.state.currentPage + 1 });
        this._getRecords();
      }
    }, 200);
  };

  render() {
    const { IsDoctor } = false; // this.props.route.params;
    return (
      <SafeAreaView style={[Helpers.fill, { backgroundColor: '#f5f5f6' }]}>
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
        <CustomHeaderNew
          HeaderColor={{ backgroundColor: Colors.white }}
          onPressBackButton={this._GoBackScreen.bind(this)}
          HeaderTitle={this.props.selectedMessage['OrderTracking-Heading']}
          LeftImage={Images.PurPleBackIcon}
          textcolorHeader="#614698"
          Isshadow={true}
        />

        {this.state.orderDataList?.length > 0 ? (
          <ScrollView onScroll={this.handleScroll}>
            <FlatList
              data={this.state.orderDataList}
              style={{ marginTop: 15 }}
              keyExtractor={(item) => {
                return item.OrderId;
              }}
              maxToRenderPerBatch={this.state.pageLimit}
              windowSize={this.state.pageLimit}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      NavigationService.navigate('OrderTrackingScreen', {
                        OrderDetail: item,
                      });
                    }}>
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        //marginBottom: 8,
                        marginHorizontal: 5,
                        height: 125,
                        backgroundColor: '#FFFFFF',
                      }}>
                      <View
                        style={{
                          width: '90%',
                          paddingLeft: 20,
                          paddingTop: 12,
                        }}>
                        <Text
                          style={[
                            { color: Colors.BlueColorNew, fontSize: 14 },
                            Helpers.mediumFont,
                          ]}>
                          {this.props.selectedMessage['OrderTracking-OrderNo']}{' '}
                          : {item.OrderNo}
                        </Text>
                        <Text
                          style={[
                            {
                              color: Colors.GreyColor,
                              fontSize: 12,
                              marginTop: 5,
                            },
                            Helpers.mediumFont,
                          ]}>
                          {this.props.selectedMessage['OrderTracking-OrderOn']}{' '}
                          : {item.OrderDisplayCreatedOn}
                        </Text>
                        <Text
                          style={[
                            {
                              color: Colors.GreyColor,
                              fontSize: 12,
                              marginTop: 5,
                            },
                            Helpers.mediumFont,
                          ]}>
                          {this.props.selectedMessage['OrderTracking-Quantity']}{' '}
                          : {item.Qty}
                        </Text>
                        <Text
                          style={[
                            {
                              color: Colors.RedColor,
                              fontSize: 14,
                              marginTop: 5,
                              color: this.renderOrderStatus(item.OrderStatusId),
                            },
                            Helpers.mediumFont,
                          ]}>
                          {this.props.selectedMessage['OrderTracking-Status']}
                          {' : '}
                          {item['DisplayOrderStatusName-' + this.props.locale]}
                        </Text>
                      </View>

                      <View
                        style={{
                          // backgroundColor: 'yellow',
                          width: '10%',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          paddingRight: 16,
                        }}>
                        <Image
                          style={[
                            {
                              height: 20,
                              width: 20,
                            },
                            { transform: [{ rotate: '180deg' }] },
                          ]}
                          resizeMode="contain"
                          source={Images.PurPleBackIcon}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </ScrollView>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <View style={[Helpers.btnContainer, { bottom: 0 }]}>
              <Text
                style={[
                  Helpers.btnText,
                  { color: Colors.patientColor, fontSize: 17 },
                ]}>
                {this.props.selectedMessage['NoOrder-HistoryText']}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

OrderHistoryScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  authenticatedIsLoading: PropTypes.bool,
  authenticatedErrorMessage: PropTypes.string,

  orderList: PropTypes.any,
  orderListError: PropTypes.any,
  isPatientProfileLoading: PropTypes.bool,

  getOrderHistory: PropTypes.func,
  resetGetOrderHistory: PropTypes.func,

  selectedMessage: PropTypes.any,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  authenticatedErrorMessage: state.authenticate.authenticatedErrorMessage,

  orderList: state.patientProfile.orderList,
  orderListError: state.patientProfile.orderListError,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,

  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});

const mapDispatchToProps = (dispatch) => ({
  getOrderHistory: (data) => dispatch(PatientActions.getOrderHistory(data)),
  resetGetOrderHistory: () => dispatch(PatientActions.resetGetOrderHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryScreen);
