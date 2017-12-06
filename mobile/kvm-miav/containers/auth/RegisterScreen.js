import React from 'react';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text
} from 'react-native';

import { FormInput } from '../../components';

export class RegisterScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
          <FormInput label='Username' onFinishedInput={() => {}} editable={true} />
          <FormInput label='Password' onFinishedInput={() => {}} editable={true} isPassword={true} />
          <FormInput label='Confirm Password' onFinishedInput={() => {}} editable={true} isPassword={true} />

          <View>
            <Button />
            <Button />
          </View>

          <ActivityIndicator animating={this.props.isLoading} size={'large'} style={{margin: 20}}/>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent:'center',
    backgroundColor: 'black',
    padding: 40
  }
});
