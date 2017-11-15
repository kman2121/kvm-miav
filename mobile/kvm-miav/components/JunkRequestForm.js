import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class JunkRequest extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Let's pick up some junk with my van</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
