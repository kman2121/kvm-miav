import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

export class PickUserScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text>What type of user are you?</Text>
          <Button
            style = {styles.typeButton}
            onPress={this.props.onPressProvider}
            title="I OWN A MOVING VAN"
          />
          <Button
            style = {styles.typeButton}
            onPress={this.props.onPressClient}
            title="I NEED MY STUFF MOVED"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeButton:{
    color: "#0000ff",
  },
  formContainer: {
    flexDirection: "column",
    flex: 3,
    width: '75%',
    height: '75%',
    justifyContent: 'center',
    alignContent: "space-between",
  }
});
