import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

export const NetworkContext = React.createContext({ isConnected: true });

class NetworkInternetProvider extends React.PureComponent {
  state = {
    isConnected: true
  };

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      this.handleConnectivityChange(state.isConnected)
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  handleConnectivityChange(isConnected) {
    this.setState({ isConnected: isConnected })
  };

  render() {
    return (
      <NetworkContext.Provider value={this.state}>
        {this.state.isConnected ? null
          : <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>
              {/* No Internet Connection */}
              {this.props.selectedMessage['No-Internet']}
            </Text>
          </View>}

      </NetworkContext.Provider>
    );
  }
}

NetworkInternetProvider.propTypes = {

  selectedMessage: PropTypes.any,
};

const mapStateToProps = (state) => ({

  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkInternetProvider);
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
  },
  offlineText: { color: '#fff' }
});