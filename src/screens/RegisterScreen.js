import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="gray" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subtitle}>Create a new account</Text>

        {/* Input fields */}
        {[
          { placeholder: 'First name', value: firstName, setValue: setFirstName, icon: 'person-outline' },
          { placeholder: 'Last name', value: lastName, setValue: setLastName, icon: 'person-outline' },
          { placeholder: 'Email', value: email, setValue: setEmail, icon: 'mail-outline', keyboardType: 'email-address' },
          { placeholder: 'Phone', value: phone, setValue: setPhone, icon: 'call-outline', keyboardType: 'phone-pad' },
          { placeholder: 'Password', value: password, setValue: setPassword, icon: 'lock-closed-outline', secureTextEntry: true },
        ].map((input, index) => (
          <View key={index} style={styles.inputContainer}>
            <Ionicons name={input.icon} size={24} color="gray" style={styles.icon} />
            <TextInput
              placeholder={input.placeholder}
              style={styles.inputField}
              onChangeText={input.setValue}
              value={input.value}
              keyboardType={input.keyboardType || 'default'}
              secureTextEntry={input.secureTextEntry || false}
            />
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button
            title="REGISTER"
            color="#4CAF50"
            onPress={() => {
              // Add registration logic here
            }}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 10,
    color: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'gray',
  },
  loginLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
