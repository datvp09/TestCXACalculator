import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';

const Button = React.memo((props) => (
  <TouchableHighlight
    style={[styles.buttonStyles]}
    onPress={props.onPress}
    underlayColor="#777">
    <View style={[styles.contButton, props.style]}>
      <Text style={[styles.txtButtons, props.textStyle]}>{props.text}</Text>
    </View>
  </TouchableHighlight>
));

const styles = StyleSheet.create({
  txtButtons: {
    color: '#000',
    fontFamily: 'System',
    fontSize: 40,
    fontWeight: '500',
  },
  buttonStyles: {
    flex: 1,
  },
  contButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default Button;
