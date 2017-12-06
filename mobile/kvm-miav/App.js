import Expo from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  EnterCodeScreen,
  EnterJobScreen,
  EnterPhoneScreen,
  SearchingScreen,
  PickUserScreen
} from './containers';

class ScreenEnum {
  static ENTER_PHONE = 'ep';
  static ENTER_CODE  = 'ec';
  static ENTER_JOB   = 'ej';
  static SEARCHING   = 'sr';
  static PICK_USER = 'pu';
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      screen: ScreenEnum.ENTER_JOB,

      isLoading: false
    };
  }

  onPhoneInput = phone => {
    this.setState({isLoading: true});

    // TODO: make API call
    setTimeout(() => {
      this.setState({
        isLoading: false,
        screen: ScreenEnum.ENTER_CODE,
      });
    }, 500);
  }

  onCodeInput = code => {
    this.setState({isLoading: true});

    // TODO: make API call
    setTimeout(() => {
        this.setState({
          isLoading: false,
          screen: ScreenEnum.PICK_USER,
        });
    }, 500);
  }

  onSelectClient = code => {
      this.setState({isLoading: true});
      setTimeout(() => {
          this.setState({
            isLoading: false,
            screen: ScreenEnum.ENTER_JOB,
          });
      }, 500);
  }

  onSelectProvider = code => {
      this.setState({isLoading: true});
      setTimeout(() => {
          this.setState({
            isLoading: false,
            screen: ScreenEnum.ENTER_JOB,
          });
      }, 500);
  }

  render() {
    let screenToShow = '';
    switch (this.state.screen) {
      case ScreenEnum.ENTER_CODE:
        screenToShow = <EnterCodeScreen isLoading={this.state.isLoading}
                                        onInput={this.onCodeInput} />;
        break;
      case ScreenEnum.ENTER_JOB:
        screenToShow = <EnterJobScreen />;
        break;
      case ScreenEnum.SEARCHING:
        screenToShow = <SearchingScreen />;
        break;
      case ScreenEnum.PICK_USER:
        screenToShow = <PickUserScreen onPressClient={this.onSelectClient}
                                       onPressProvider={this.onSelectProvider} />;
        break;
      case ScreenEnum.ENTER_PHONE:
      default:
        screenToShow = <EnterPhoneScreen isLoading={this.state.isLoading}
                                         onInput={this.onPhoneInput} />;
        break;
    }

    return (
      <View style={styles.container}>
        { screenToShow }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: Expo.Constants.statusBarHeight
  },
});

Expo.registerRootComponent(App);
