import React, { Component } from 'react';

import {
  View,
  Platform,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Images } from 'App/Theme';

class BackButton extends Component {
  render() {
    return (
      <Image style={{ height: 20, width: 20 }} source={Images.PurPleBackIcon} />
    );
  }
}

BackButton.propTypes = {
  authenticatedUser: PropTypes.any,
};

BackButton.defaultProps = {
  authenticatedUser: PropTypes.any,
};

// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
});
// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);
