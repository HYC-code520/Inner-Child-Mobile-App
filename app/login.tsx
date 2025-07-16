import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface LoginScreenProps {
  onClose: () => void;
  onNavigateToSignUp: () => void;
  onLogin: () => void;
}

export default function LoginScreen({
  onClose,
  onNavigateToSignUp,
  onLogin,
}: LoginScreenProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <ThemedText style={{ color: '#fff' }}>X</ThemedText>
        </TouchableOpacity>

        <ThemedText type="title" style={styles.title}>
          Login
        </ThemedText>
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToSignUp}>
          <ThemedText style={styles.switchText}>
            Don't have an account? Sign Up
          </ThemedText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(61, 85, 68, 0.6)', // Dark matcha overlay
  },
  modalView: {
    width: '90%',
    backgroundColor: '#F0F5ED', // Light matcha cream
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#A3B8A7', // Soft green
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 25,
    color: '#3D5544', // Dark matcha text
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3E0D7', // Light green-gray border
    color: '#3D5544',
  },
  button: {
    backgroundColor: '#5A8266', // Primary matcha green
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 20,
    color: '#5A8266', // Primary matcha green
    fontWeight: '600',
  },
}); 