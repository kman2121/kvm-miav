import React from 'react';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { FormInput } from '../../components';

export class LoginScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
          <FormInput label='Username' onFinishedInput={() => {}} editable={true} />
          <FormInput label='Password' onFinishedInput={() => {}} editable={true} isPassword={true} />

          <View style={styles.buttonRow}>
            <Button title='REGISTER' />
            <Button title='LOGIN' />
          </View>

          {/* <ActivityIndicator animating={this.props.isLoading} size={'large'} style={{margin: 20}}/> */}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent:'center',
    padding: 40
  },
  buttonRow: {
    flexDirection: 'column'
  }
});
