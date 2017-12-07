import React from 'react';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from 'react-native';

import { FormInput } from '../../components';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      username: '',
      password: ''
    };
  }

  setUsername = username => this.setState({ username });
  setPassword = password => this.setState({ password });
  login = () => {
    if (!this.state.username || !this.state.password) {
      return;
    }

    this.setState({loading: true});
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
          <FormInput label='Username' onChangeText={this.setUsername} editable={true} />
          <FormInput label='Password' onChangeText={this.setPassword} editable={true} isPassword={true} />

          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <Button title='REGISTER' onPress={this.props.goToRegister} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title='LOGIN' onPress={this.login} />
            </View>
          </View>

          <ActivityIndicator animating={this.state.loading} size={'large'} style={{margin: 20}}/>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 40
  },
  buttonRow: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    flex: 0.45,
    alignItems: 'stretch'
  }
});
