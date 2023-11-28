import React from 'react';
import { View, Text } from 'react-native';

import { NetworkContext } from './NetworkProvider';

export default class Connection extends React.PureComponent {
  static contextType = NetworkContext;

  componentDidUpdate(a, b) { }

  render() {
    return context.isConnected ? (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    ) : null;
  }
}

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
  offlineText: { color: '#fff' },
});
