import React, { Component } from 'react';

import { View, Text, ImageBackground } from 'react-native';
import { PropTypes } from 'prop-types';
import CustomButton from 'App/Components/CustomButton';

export default class ApprovedKit extends Component {
  constructor(props) {
    super(props);
  }

  renderTableRow(item, i) {
    return (
      <View style={this.props.cardTableRowStyle} key={i}>
        <View style={this.props.cardTableRowLableContainerStyle}>
          <Text style={this.props.cardTableRowLableTextStyle}>
            {item.itemLable}
          </Text>
        </View>
        <View style={this.props.cardTableRowValueContainerStyle}>
          <Text style={this.props.cardTableRowValueTextStyle}>
            {item.itemValue}
          </Text>
        </View>
      </View>
    );
  }

  renderTableHeader(item, i) {
    return (
      <View style={this.props.cardTableHeaderStyle} key={i}>
        <Text style={this.props.cardTableHeaderTextStyle}>
          {item.itemLable}:{item.itemValue}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={this.props.cardContainerStyle}>
        <View style={this.props.cardFirstBoxContainerStyle}>
          <ImageBackground
            resizeMode="stretch"
            source={this.props.cardBgImage}
            style={this.props.cardBgImageContainerStyle}>
            <View style={this.props.cardImageContainerStyle}>
              <View style={{}}>
                <Text style={this.props.cardHeaderStyle}>
                  {this.props.cardHeader}
                </Text>
                <Text style={this.props.cardParagraphStyle}>
                  {this.props.cardParagraph}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={this.props.cardSecondBoxContainerStyle}>
          <View style={this.props.cardKnobStyle}></View>
          <View style={this.props.cardTableStyle}>
            {this.props.cardTableData.map((item, i) => {
              let component = item.IsHeader
                ? this.renderTableHeader(item, i)
                : this.renderTableRow(item, i);
              return component;
            })}
          </View>

          <CustomButton
            buttonContainer={this.props.cardButton}
            buttonTextStyle={this.props.cardButtonTextStyle}
            buttonText={this.props.cardButtonText}
            onPress={this.props.cardButtonOnPress.bind(this)}></CustomButton>
        </View>
      </View>
    );
  }
}

ApprovedKit.propTypes = {
  cardContainerStyle: PropTypes.array,
  cardFirstBoxContainerStyle: PropTypes.array,
  cardBgImage: PropTypes.number,
  cardBgImageContainerStyle: PropTypes.array,
  cardImageContainerStyle: PropTypes.array,

  cardHeaderStyle: PropTypes.array,
  cardHeader: PropTypes.string,
  cardParagraphStyle: PropTypes.array,
  cardParagraph: PropTypes.string,
  cardSecondBoxContainerStyle: PropTypes.array,
  cardKnobStyle: PropTypes.array,
  cardTableData: PropTypes.array,
  cardTableStyle: PropTypes.array,
  cardTableHeaderStyle: PropTypes.array,
  cardTableHeaderTextStyle: PropTypes.array,

  cardTableRowStyle: PropTypes.array,
  cardTableRowLableContainerStyle: PropTypes.array,
  cardTableRowLableTextStyle: PropTypes.array,

  cardTableRowValueContainerStyle: PropTypes.array,
  cardTableRowValueTextStyle: PropTypes.array,

  cardButtonOnPress: PropTypes.func,

  cardButton: PropTypes.array,
  cardButtonTextStyle: PropTypes.array,
  cardButtonText: PropTypes.string,
};

ApprovedKit.defaultProps = {
  rejectKitbtnText: 'test',
  rejectKitbtnCanelText: 'test',
};
