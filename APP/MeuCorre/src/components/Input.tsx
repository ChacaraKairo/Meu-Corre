import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
} from 'react-native';
import { inputStyles as styles } from '../styles/inputStyles';

interface InputProps extends TextInputProps {
  label: string;
  erro?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  erro,
  ...props
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, erro && styles.inputErro]}
      placeholderTextColor="#444"
      {...props}
    />
  </View>
);
