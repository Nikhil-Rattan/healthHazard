import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { PropTypes } from 'prop-types';
import { Images } from 'App/Theme';
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';

export default class CustomDDLPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = { IsPopUpShown: false };
  }

  _onSelectItem(item) {
    this.setState({ IsPopUpShown: false });
    this.props.popUpListItemOnChange(item);
  }

  _RenderList = ({ item }) => {
    return (
      <TouchableOpacity onPress={this._onSelectItem.bind(this, item)}>
        <View style={[this.props.popUpListItemStyle]}>
          <View
            style={{
              width: '95%',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Text style={this.props.popUpListItemTextStyle}>
              {' '}
              {item[this.props.ddlListText]}{' '}
            </Text>
          </View>
          <View
            style={{
              width: '5%',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            {this.props.IspatientLogin ? (
              <Image
                style={this.props.ddlIconStyle}
                resizeMode="contain"
                source={
                  item[this.props.popUpKey] == this.props.popUpSelectedValue
                    ? Images.greenradioselect
                    : Images.greenradiounselect
                }
              />
            ) : (
              <Image
                style={this.props.ddlIconStyle}
                resizeMode="contain"
                source={
                  item[this.props.popUpKey] == this.props.popUpSelectedValue
                    ? Images.CircleShapePurple
                    : Images.CircleShape
                }
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _onSignUpPressButton() {
    this.setState({ IsPopUpShown: true });
  }
  render() {
    return (
      <View style={{ width: '100%' }}>
        <Dialog
          width={0.9}
          height={0.5}
          onHardwareBackPress={() => {
            this.setState({ IsPopUpShown: false });
            return true;
          }}
          onTouchOutside={() => {
            this.setState({ IsPopUpShown: false });
          }}
          visible={this.state.IsPopUpShown}>
          <DialogTitle
            title={this.props.popUpTitleText}
            textStyle={this.props.popUpTitletextStyle}
            style={this.props.popUpTitleStyle}
            align={this.props.popUpTitleAlign}></DialogTitle>
          <DialogContent style={{}}>
            <View style={this.props.popUpListContainerStyle}>
              <FlatList
                style={{}}
                data={this.props.popUpListSrc}
                keyExtractor={(item) => {
                  return item[this.props.popUpKey];
                }}
                renderItem={this._RenderList.bind(this)}
              />
            </View>
          </DialogContent>
        </Dialog>

        <TouchableOpacity
          style={this.props.ddlContainerStyle}
          onPress={
            this.props.openPopUp
              ? this._onSignUpPressButton.bind(this)
              : () => { }
          }>
          <Text style={this.props.ddlLableStyle}>
            {this.props.popUpSelectedLable}{' '}
          </Text>
          <View style={this.props.ddlIconContainerStyle}>
            {this.props.leftIcon ? (
              <Image
                style={this.props.ddlIconStyle}
                resizeMode="contain"
                source={this.props.leftIcon}
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CustomDDLPopUp.propTypes = {
  ddlContainerStyle: PropTypes.array,
  ddlLableStyle: PropTypes.array,
  ddlIconContainerStyle: PropTypes.array,
  ddlIconStyle: PropTypes.array,

  popUpListItemTextStyle: PropTypes.array,
  popUpListItemStyle: PropTypes.array,
  popUpListContainerStyle: PropTypes.array,

  popUpTitletextStyle: PropTypes.array,
  popUpTitleStyle: PropTypes.array,
  popUpTitleAlign: PropTypes.string,
  popUpTitleText: PropTypes.string,

  popUpListSrc: PropTypes.array,
  popUpIsSelected: PropTypes.bool,
  popUpSelectedValue: PropTypes.any,
  popUpKey: PropTypes.any,

  popUpListItemOnChange: PropTypes.func,
  leftIcon: PropTypes.any,
  openPopUp: PropTypes.bool,
  ddlListText: PropTypes.string,

  IspatientLogin: PropTypes.bool,
};

CustomDDLPopUp.defaultProps = {
  popUpTitleText: '',
  popUpTitleAlign: 'left',
  popUpKey: 'id',
  leftIcon: null,
  openPopUp: true,
  ddlListText: 'Name',
  IspatientLogin: false,
};
