import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { PropTypes } from 'prop-types';
import { Helpers, ApplicationStyles, Images } from 'App/Theme';
import NavigationService from 'App/Services/NavigationService';
import { connect } from 'react-redux';
import AuthenticateActions from 'App/Stores/Authentication/Actions';

class PatientBottomTabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsRightMenuActive: false,
      IsCenterMenuActive: false,
      openMenuName: '',
      openMyQRCodeMenu: false,
      currentHeight: 320,
      currentColor: '#fbfbfb',
      prevHeight: 320,
      prevColor: '#fbfbfb',
    };
  }

  gotoSanKit() {
    this.RBSheetTestSite.close();
    NavigationService.navigate('QRCodeScanner');
  }

  openQRCode() {
    this.RBSheetTestSite.close();
    let { currentHeight, currentColor, prevHeight, prevColor } = this.state;

    this.setState({
      openMyQRCodeMenu: true,
      prevHeight: currentHeight,
      currentHeight: 400,
      prevColor: currentColor,
      currentColor: '#614698',
    });

    let self = this;
    setTimeout(() => {
      self.RBSheet.open();
    }, 500);
  }

  closQRCode() {
    let { prevHeight, prevColor } = this.state;

    this.setState({
      openMyQRCodeMenu: false,
      currentHeight: prevHeight,
      currentColor: prevColor,
    });
    this.RBSheet.close();
  }
  // Home Tab
  _HomeRender(label, isFocused, options, onPress) {
    return (
      <TouchableOpacity
        key={label}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={isFocused.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        style={{ height: 30, width: 30, backgroundColor: 'white' }}>
        <Image
          style={{ height: 25, width: 25 }}
          resizeMode="contain"
          source={isFocused ? Images.House : Images.HouseInActive}
        />
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  }
  // QR Code Tab
  _QRCodeRender(label, isFocused, options, onPress) {
    return (
      <TouchableOpacity
        key={label}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={isFocused.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        style={{ height: 30, width: 30, backgroundColor: 'white' }}>
        <Image
          style={{ height: 25, width: 25 }}
          resizeMode="contain"
          source={Images.purpleHome}
        />
        <Text>Home</Text>
      </TouchableOpacity>
    );
  }
  //FAQ Tab 
  _FAQRender(label, isFocused, options, onPress) {
    return (
      <TouchableOpacity
        key={label}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={isFocused.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={() => {
          this.RBSheetTestSite.open();
        }}
        style={{ height: 70, width: 50, backgroundColor: 'white' }}>
        <Image
          style={{ height: 70, width: 50 }}
          resizeMode="contain"
          source={Images.centerTabIcon}
        />
      </TouchableOpacity>
    );
  }
  // Results Tab
  _ResultsRender(label, isFocused, options, onPress) {
    return (
      <TouchableOpacity
        style={{ height: 35, width: 35 }}
        key={label}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={isFocused.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={() => {
          this.RBTestSheet.open();
        }}>
        <Image
          style={{ height: 30, width: 30 }}
          resizeMode="contain"
          source={Images.rightTabIcon}
        />
      </TouchableOpacity>
    );
  }
  // Menu Tab
  _MenuRender(label, isFocused, options, onPress) {
    return (
      <TouchableOpacity
        style={{ height: 35, width: 35 }}
        key={label}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={isFocused.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={() => {
          this.RBTestSheet.open();
        }}>
        <Image
          style={{ height: 30, width: 30 }}
          resizeMode="contain"
          source={Images.rightTabIcon}
        />
      </TouchableOpacity>
    );
  }

  _gotoTestResult(item) {
    let GoToScreen = '';

    switch (item.ResultName) {
      case 'Positive':
        GoToScreen = { ...item, headerColor: '#fbd1d1', Color: '#f92a2a' };
        break;
      case 'Negative':
        GoToScreen = { ...item, headerColor: '#d1e7e5', Color: '#28998D' };
        break;
      default:
        GoToScreen = { ...item, headerColor: '#dcd7e7', Color: '#614698' };

        break;
    }

    this.RBTestSheet.close();
    NavigationService.navigate('TestReportScreen', { reportDeatil: GoToScreen });
  }
  _onCenterSheetClose() {
    let { prevHeight, prevColor } = this.state;

    this.setState({
      openMyQRCodeMenu: false,
      currentHeight: prevHeight,
      currentColor: prevColor,
    });
  }

  render() {
    const { state, descriptors, navigation } = this.props.tabBarProp;
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }

    return (
      <View
        style={[
          {
            backgroundColor: 'white',
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          },
          Helpers.BottomTabShaddow,
        ]}>
        <View
          style={[
            this.props.tabContainer,
            { height: 50, alignItems: 'flex-start' },
          ]}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              if (label == 'Results') {
                let { UserId } = this.props.authenticatedUser;
                this.props.resetNotificationCount({ UserId: UserId });
              }
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            let imageIcon = null;
            let labelText = null;
            switch (label) {
              case 'Home':
                imageIcon = isFocused ? Images.House : Images.HouseInActive;
                labelText = this.props.selectedMessage['BottomTab-HomeHome'];
                break;
              case 'QR Code':
                imageIcon = isFocused ? Images.QRCode : Images.QRCodeInActive;
                labelText = this.props.selectedMessage['BottomTab-NewQRCode'];
                break;

              case 'FAQ':
                imageIcon = isFocused
                  ? Images.FaqCircle
                  : Images.FaqCircleInActive;
                labelText = this.props.selectedMessage['FAQuestion-FAQ'];
                break;
              case 'Results':
                imageIcon = isFocused
                  ? Images.PatientResult
                  : Images.PatientResultInActive;
                labelText = this.props.selectedMessage[
                  'InstructionFifthScreen-Results'
                ];
                break;
              case 'Menu':
                imageIcon = isFocused ? Images.Menu : Images.MenuInActive;
                labelText = this.props.selectedMessage['BottomTab-MenuNew'];
                break;
            }
            return (
              <TouchableOpacity
                key={label}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={isFocused.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={{ height: 30, alignItems: 'center' }}>
                {this.props.badgeCount > 0 && label == 'Results' && (
                  <View style={ApplicationStyles.tabBadge}>
                    <Text style={ApplicationStyles.tabBadgeText}>
                      {this.props.badgeCount}
                    </Text>
                  </View>
                )}

                <Image
                  style={{ height: 30, width: 30, marginBottom: 4 }}
                  resizeMode="cover"
                  source={imageIcon}
                />

                <Text
                  numberOfLines={1}
                  style={[
                    {
                      width: 80,
                      textAlign: 'center',
                      fontSize: 12,
                      color: isFocused ? '#673ab7' : '#222',
                    },
                    isFocused ? Helpers.bold : Helpers.mediumFont,
                  ]}>
                  {labelText}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

PatientBottomTabMenu.propTypes = {
  tabContainer: PropTypes.array,
  tabBarProp: PropTypes.any,
  selectedMessage: PropTypes.any,
  badgeCount: PropTypes.any,
};

PatientBottomTabMenu.defaultProps = {
  resetNotificationCount: PropTypes.func,
  selectedMessage: PropTypes.any,
  badgeCount: PropTypes.any,
  authenticatedUser: PropTypes.any,
};

// getting states from reducers
const mapStateToProps = (state) => ({
  selectedMessage: state.startup.selectedMessage,
  badgeCount: state.authenticate.badgeCount,
  authenticatedUser: state.authenticate.authenticatedUser,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  resetNotificationCount: (data) =>
    dispatch(AuthenticateActions.resetNotificationCount(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientBottomTabMenu);
