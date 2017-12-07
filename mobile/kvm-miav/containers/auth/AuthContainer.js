import React from 'react';
import { View } from 'react-native';

import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';

class ScreenEnum {
  static LOGIN    = 'login';
  static REGISTER = 'register';
}

export class AuthContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: ScreenEnum.LOGIN
    };
  }

  onRegisterClick = () => {
    return;
  }

  toggleScreen = () => {
    this.setState({
      screen: this.state.screen === ScreenEnum.LOGIN ? ScreenEnum.REGISTER : ScreenEnum.LOGIN
    });
  }

  render() {
    return (
      this.state.screen === ScreenEnum.LOGIN ?
        <LoginScreen goToRegister={this.toggleScreen} login={this.props.login} /> :
        <RegisterScreen goToLogin={this.toggleScreen} />
    );
  }
}
