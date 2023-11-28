import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { PropTypes } from 'prop-types';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Helpers, Colors, Images } from 'App/Theme';

import TestMenuItem from 'App/Components/TestMenuItem';
import TestResultList from 'App/Components/TestResultList';

import MyQRCode from 'App/Components/MyQRCode';
import NavigationService from 'App/Services/NavigationService';
import { connect } from 'react-redux';

class BottomTabMenu extends Component {
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
    let { currentHeight, currentColor } = this.state;

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
          source={Images.purpleHome}
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
          source={Images.centerTabIcon}
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
            this.RBTestSheet = ref;
          }}
          height={320}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: '#fbfbfb',
            },
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#fbfbfb',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                height: 220,
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TestResultList
                onPressCard={this._gotoTestResult.bind(this)}
                listStyle={[
                  { alignItems: 'center', width: '100%' },
                ]}></TestResultList>
            </View>
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
                onPress={() => {
                  this.RBTestSheet.close();
                }}
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
                  this.RBTestSheet.close();
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
                onPress={() => { }}>
                <Image
                  style={{ height: 30, width: 30 }}
                  resizeMode="contain"
                  source={Images.inActiveRightIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          onClose={this._onCenterSheetClose.bind(this)}
          height={currentHeight}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: currentColor,
            },
          }}>
          <MyQRCode
            Container={[
              {
                height: '100%',
                width: '100%',
                backgroundColor: currentColor,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            qrCodeContainer={[
              {
                width: 150,
                height: 150,
                borderRadius: 10,
                backgroundColor: 'white',
                justifyContent: 'space-around',
                alignItems: 'center',
              },
            ]}
            qrCodeTextStyle={[
              Helpers.btnText,
              Helpers.bold,
              {
                color: 'white',
                fontSize: 20,
                marginBottom: 30,
                textAlign: 'center',
              },
            ]}
            qrCodeParagraphTextStyle={[
              Helpers.btnText,
              Helpers.mediumFont,
              {
                color: 'white',
                fontSize: 12,
                width: '60%',
                marginBottom: 30,
                marginTop: 20,
                textAlign: 'center',
              },
            ]}
            qrCodeHeaderText={
              this.props.selectedMessage['SearchFacility-MyQRCode']
            }
            qrCodeParagraphText={
              '*' +
              this.props.selectedMessage[
              'SearchFacility-ShowThisToTheCertifiedTesterAtTheFacilityWhenAsked'
              ]
            }
            onPressCenter={this.closQRCode.bind(this)}
          />
        </RBSheet>

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
              backgroundColor: Colors.patientColor,
            },
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
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
            }}>
            <TestMenuItem
              key={1}
              itemContainerStyle={[
                Helpers.tabItemContainerStyle,
                { backgroundColor: 'transparent', borderWidth: 0.2, height: 70 },
              ]}
              imageContainerStyle={[Helpers.tabItemImageContainerStyle]}
              leftImage={Images.MyTestHome}
              textContainerStyle={[Helpers.tabItemTextContainerStyle]}
              headerTextStyle={[
                Helpers.btnText,
                Helpers.mediumFont,
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
              headerText={
                this.props.selectedMessage['SearchFacility-AtHomeTest']
              }
              parahgraphText={
                this.props.selectedMessage[
                'SearchFacility-UseTheCOVISTIXRapidTestInTheComfortOfYourHome.'
                ]
              }
              iconContainerStyle={[Helpers.tabItemIconContainerStyle]}
              rightImage={Images.MyTestLeftIcon}></TestMenuItem>

            <TestMenuItem
              key={2}
              itemContainerStyle={[
                Helpers.tabItemContainerStyle,
                { backgroundColor: 'transparent', borderWidth: 0.2, height: 75 },
              ]}
              imageContainerStyle={[Helpers.tabItemImageContainerStyle]}
              leftImage={Images.TestingSite}
              textContainerStyle={[Helpers.tabItemTextContainerStyle]}
              headerTextStyle={[
                Helpers.btnText,
                Helpers.mediumFont,
                { color: '#000000', fontSize: 14, textAlign: 'left' },
              ]}
              parahgraphTextStyle={[
                Helpers.btnText,
                {
                  color: '#414141',
                  flexWrap: 'wrap',
                  fontSize: 11,
                  textAlign: 'left',
                  marginBottom: 3,
                },
              ]}
              onPressCard={this.openQRCode.bind(this)}
              headerText={this.props.selectedMessage['SearchFacility-TestSite']}
              parahgraphText={
                this.props.selectedMessage['SearchFacility-ShowYourPatientID']
              }
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
                onPress={() => { }}
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
                onPress={() => { }}>
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
              case 'Report':
                component = this.leftRender(label, isFocused, options, onPress);
                break;
              case 'Test':
                component = this.rightRender(
                  label,
                  isFocused,
                  options,
                  onPress,
                );
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

BottomTabMenu.propTypes = {
  tabContainer: PropTypes.array,
  tabBarProp: PropTypes.any,
  selectedMessage: PropTypes.any,
};

BottomTabMenu.defaultProps = {};

// getting states from reducers
const mapStateToProps = (state) => ({
  selectedMessage: state.startup.selectedMessage,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabMenu);
