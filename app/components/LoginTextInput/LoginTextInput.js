import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

const LoginTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

export default LoginTextInput;