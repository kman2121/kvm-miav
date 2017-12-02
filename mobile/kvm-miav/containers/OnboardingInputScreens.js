import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text
} from 'react-native';

import { LargeNumberInput } from '../components';

class OnboardingInputScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
          <Text style={{color: 'white'}}>
              {this.props.text}
          </Text>

          <LargeNumberInput maxLength={this.props.maxNumberLength}
              onFinishedInput={this.props.onInput}
              isEditable={!this.props.isLoading} />

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

const codeInputText = 'Please input your code. You should have received this in an SMS message.';
const phoneInputText = `Welcome. In order to connect you with hundreds of nearby helpers, let's to make sure you can receive SMS Messages.`;

export const EnterCodeScreen = props => <OnboardingInputScreen text={codeInputText}
                                                               maxNumberLength={4}
                                                               {...props} />;
export const EnterPhoneScreen = props => <OnboardingInputScreen text={phoneInputText}
                                                                maxNumberLength={12}
                                                                {...props} />;
