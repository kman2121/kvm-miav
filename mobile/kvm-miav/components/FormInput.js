import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export class FormInput extends React.Component {
  render = () => {
    return (
      <View>
        <Text style={styles.label}>
          {this.props.label}
        </Text>
        <TextInput style={styles.input}
                   onChangeText={this.props.onChangeText}
                   editable={this.props.isEditable}
                   secureTextEntry={this.props.isPassword} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: 'white'
  },
  input: {
    marginTop: 20,
    fontSize: 45,
    backgroundColor: 'white',
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#222'
  }
});
