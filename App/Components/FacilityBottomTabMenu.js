import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Helpers, Images } from 'App/Theme';
import TestMenuItem from 'App/Components/TestMenuItem';
import NavigationService from 'App/Services/NavigationService';
import { Enums } from 'App/Enums';

class FacilityBottomTabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMyQRCodeMenu: false,
      currentHeight: 400,
      currentColor: '#fbfbfb',
    };
  }

  gotoSanKit() {
    this.RBSheetTestSite.close();
    NavigationService.navigate('ScanPatientQRScreen');
  }

  gotoEnterResultKit() {
    this.RBSheetTestSite.close();
    NavigationService.navigate('PatientKitScannerScreen');
  }

  leftRender(label, isFocused, options, onPress) {
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
          source={Images.FacilityHomeIcon}
        />
      </TouchableOpacity>
    );
  }

  centerRender(label, isFocused, options, onPress) {
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
          source={Images.FacilityGreenhexaIcon}
        />
      </TouchableOpacity>
    );
  }

  rightRender(label, isFocused, options, onPress) {
    return (
      <TouchableOpacity
        style={{ height: 35, width: 35 }}
        key={label}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={isFocused.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}>
        <Image
          style={{ height: 30, width: 30 }}
          resizeMode="contain"
          source={Images.FacilityDoctorIcon}
        />
      </TouchableOpacity>
    );
  }

  render() {
    let {
      currentHeight,
      currentColor,
    } = this.state;
    const { state, descriptors, navigation } = this.props.tabBarProp;

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }

    return (
      <View
        style={{
          backgroundColor: currentColor,
          paddingHorizontal: 5,
          paddingVertical: 5,
        }}>
        <RBSheet
          ref={(ref) => {
            this.RBSheetTestSite = ref;
          }}
          height={currentHeight}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: '#28998D',
            },
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: currentColor,
            },
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: currentColor,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              shadowOffset: { width: 10, height: 10 },
              shadowColor: 'black',
              shadowOpacity: 1.0,
              elevation: 15,
            }}>
            <TestMenuItem
              key={1}
              itemContainerStyle={[
                Helpers.tabItemContainerStyle,
                {
                  backgroundColor: 'transparent',
                  borderWidth: 0.2,
                  borderRadius: 8,
                },
              ]}
              imageContainerStyle={[Helpers.tabItemImageContainerStyle]}
              leftImage={Images.registernewpatient}
              textContainerStyle={[Helpers.tabItemTextContainerStyle]}
              headerTextStyle={[
                Helpers.btnText,
                Helpers.bold,
                { color: '#000000', fontSize: 15, textAlign: 'left' },
              ]}
              parahgraphTextStyle={[
                Helpers.btnText,
                {
                  color: '#414141',
                  flexWrap: 'wrap',
                  fontSize: 11,
                  textAlign: 'left',
                },
              ]}
              onPressCard={this.gotoRegisterScreen.bind(this)}
              headerText={this.props.selectedMessage['FacDashboard-Register']}
              parahgraphText={' '}
              iconContainerStyle={[Helpers.tabItemIconContainerStyle]}
              rightImage={Images.MyTestLeftIcon}></TestMenuItem>

            <TestMenuItem
              key={2}
              itemContainerStyle={[
                Helpers.tabItemContainerStyle,
                {
                  backgroundColor: 'transparent',
                  borderWidth: 0.2,
                  borderRadius: 8,
                },
              ]}
              imageContainerStyle={[
                Helpers.tabItemImageContainerStyle,
                { borderRadius: 10 },
              ]}
              leftImage={Images.scanfacilityphone}
              textContainerStyle={[Helpers.tabItemTextContainerStyle]}
              headerTextStyle={[
                Helpers.btnText,
                Helpers.bold,
                { color: '#000000', fontSize: 14, textAlign: 'left' },
              ]}
              parahgraphTextStyle={[
                Helpers.btnText,
                {
                  color: '#414141',
                  flexWrap: 'wrap',
                  fontSize: 11,
                  textAlign: 'left',
                },
              ]}
              onPressCard={this.gotoSanKit.bind(this)}
              headerText={this.props.selectedMessage['FacDashboard-ScanQRCode']}
              parahgraphText={''}
              iconContainerStyle={[Helpers.tabItemIconContainerStyle]}
              rightImage={Images.MyTestLeftIcon}></TestMenuItem>
            <TestMenuItem
              key={3}
              itemContainerStyle={[
                Helpers.tabItemContainerStyle,
                {
                  backgroundColor: 'transparent',
                  borderWidth: 0.2,
                  borderRadius: 8,
                },
              ]}
              imageContainerStyle={[Helpers.tabItemImageContainerStyle]}
              leftImage={Images.Entertestresults}
              textContainerStyle={[Helpers.tabItemTextContainerStyle]}
              headerTextStyle={[
                Helpers.btnText,
                Helpers.bold,
                { color: '#000000', fontSize: 14, textAlign: 'left' },
              ]}
              parahgraphTextStyle={[
                Helpers.btnText,
                {
                  color: '#414141',
                  flexWrap: 'wrap',
                  fontSize: 11,
                  textAlign: 'left',
                },
              ]}
              onPressCard={this.gotoEnterResultKit.bind(this)}
              headerText={
                this.props.selectedMessage['FacDashboard-EnterResult']
              }
              parahgraphText={''}
              iconContainerStyle={[Helpers.tabItemIconContainerStyle]}
              rightImage={Images.MyTestLeftIcon}></TestMenuItem>

            <View
              style={[
                Helpers.tabContainer,
                {
                  shadowOffset: { width: 10, height: 10 },
                  shadowColor: 'black',
                  shadowOpacity: 1.0,
                  elevation: 15,
                },
              ]}>
              <TouchableOpacity
                key={'left'}
                style={{ height: 30, width: 30, backgroundColor: 'white' }}>
                <Image
                  style={{ height: 25, width: 25 }}
                  resizeMode="contain"
                  source={Images.inActiveLeftIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                key={'Center'}
                onPress={() => {
                  this.RBSheetTestSite.close();
                }}
                style={{ height: 70, width: 50, backgroundColor: 'white' }}>
                <Image
                  style={{ height: 70, width: 50 }}
                  resizeMode="contain"
                  source={Images.inActiveCenterIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ height: 35, width: 35 }}
                key={'right'}
              >
                <Image
                  style={{ height: 30, width: 30 }}
                  resizeMode="contain"
                  source={Images.inActiveRightIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        <View
          style={[
            this.props.tabContainer,
            {
              shadowOffset: { width: 10, height: 10 },
              shadowColor: 'black',
              shadowOpacity: 1.0,
              elevation: 15,
            },
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
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            let component = null;
            switch (label) {
              case 'DashBoard':
                component = this.leftRender(label, isFocused, options, onPress);
                break;
              case 'Tester':
                let IsTester =
                  this.props.authenticatedUser?.UserRoleId != Enums.Tester;
                component = IsTester
                  ? this.rightRender(label, isFocused, options, onPress)
                  : null;
                break;
              case 'Home':
                component = this.centerRender(
                  label,
                  isFocused,
                  options,
                  onPress,
                );
                break;
            }
            return component;
          })}
        </View>
      </View>
    );
  }
}

FacilityBottomTabMenu.propTypes = {
  tabContainer: PropTypes.array,
  tabBarProp: PropTypes.any,
  authenticatedUser: PropTypes.any,
};

FacilityBottomTabMenu.defaultProps = {};

// getting states from reducers
const mapStateToProps = (state) => ({
  selectedMessage: state.startup.selectedMessage,
  authenticatedUser: state.authenticate.authenticatedUser,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityBottomTabMenu);
