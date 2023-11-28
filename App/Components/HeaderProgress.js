import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Colors } from 'App/Theme';

export default class HeaderProgress extends Component {
  render() {
    return (
      <View style={[this.props.rowStyle]}>
        <View
          style={[
            this.props.progressStyle,
            {
              width: this.props.progressCount + '%',
              backgroundColor: this.props.rightColor,
            },
          ]}></View>
        <View
          style={[
            this.props.progressStyle,
            {
              width: 100 - this.props.progressCount + '%',
              backgroundColor: this.props.leftColor,
            },
          ]}></View>
      </View>
    );
  }
}

HeaderProgress.propTypes = {
  rowStyle: PropTypes.array,
  progressStyle: PropTypes.array,
  progressCount: PropTypes.number,
  rightColor: PropTypes.string,
  leftColor: PropTypes.string,
};

HeaderProgress.defaultProps = {
  progressCount: 0,
  rightColor: Colors.patientColor,
  leftColor: Colors.patientColor,
};
