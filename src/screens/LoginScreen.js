import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Actions/actions";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Initialiser le dispatch
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.auth);


  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Tracking");
    }
  }, [isLoggedIn, navigation]); // Ajoutez la dépendance à 'isLoggedIn'


  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(
        "Validation",
        "Veuillez saisir un nom d'utilisateur et un mot de passe."
      );
      return;
    }
    dispatch(login(email, password));
    navigation.navigate('Home');
  };

  // const handleLogin = async () => {

  //   if(email === '' || password === '') {
  //     // Alert.alert('Error', 'Please fill in all fields');
  //     // return;
  //     navigation.navigate('Home');
  //   }
  //   try {
  //     // const apiUrl = `${config.API_URL}${config.port ? `:${config.port}` : ''}/authent/login`;
  //     const apiUrl = `192.168.0.130:3000/authent/login`;
  //     const response = await axios.post(apiUrl, {
  //       email,
  //       password,
  //     });

  //     // Vérification de la réponse
  //     if (response.status === 200) {
  //       Alert.alert('Login Successful', 'You have been logged in successfully!');
  //       dispatch(login());
  //       navigation.navigate('Home');
  //     } else {
  //       Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'An error occurred while logging in. Please try again later.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/HouseSearching.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Glad to see you again</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.inputField}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            style={styles.inputField}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPassword")}
        style={styles.forgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="LOGIN"
          color="#4CAF50"
          onPress={handleLogin}
          //onPress={() => navigation.navigate('Home')}
        />
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#4CAF50",
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "gray",
  },
  registerLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
