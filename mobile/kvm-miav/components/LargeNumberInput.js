import React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';

export class LargeNumberInput extends React.Component {
  render = () => <TextInput keyboardType={'numeric'}
                            maxLength={this.props.maxLength}
                            style={styles.input}
                            onEndEditing={this.props.onFinishedInput}
                            editable={this.props.isEditable} />
}

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    fontSize: 45,
    backgroundColor: 'white',
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#222'
  }
});
