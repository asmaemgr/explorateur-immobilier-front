import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Actions/authActions";
import ButtonC from "../../components/ButtonC";
import TextInputC from "../../components/TextInputC";
import ImageC from "../../components/ImageC";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Initialiser le dispatch
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
 
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigation.navigate("Home");
    }
    if (error) {
      Alert.alert("Erreur", error, [
      {
        text: "OK",
        onPress: () => dispatch({ type: "CLEAR_ERROR" }),
      },
      ]);
    }

    if (email && !validateEmail(email)) {
      setEmailError("L'email est invalide.");
    } else {
      setEmailError("");
    }
  }, [isLoading, isLoggedIn, error, navigation, email]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(
        "Validation",
        "Veuillez saisir un nom d'utilisateur et un mot de passe."
      );
      return;
    }
    dispatch(login(email, password)).then((response) => {
      if(response.type === "LOGIN_SUCCESS") {
        navigation.navigate("Home");
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageC
        source={require("../../../assets/HouseSearching.png")}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bienvenue de retour!</Text>
      <Text style={styles.subtitle}>Ravi de vous revoir</Text>

      <TextInputC
        value={email}
        setValue={setEmail}
        placeholder="Email"
        iconName="mail-outline"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {emailError ? (
        <Text style={styles.errorMessage}>{emailError}</Text>
      ) : null}

      <TextInputC
        value={password}
        setValue={setPassword}
        placeholder="Mot de passe"
        iconName="lock-closed-outline"
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPassword")}
        style={styles.forgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Mot de passe oublié?</Text>
      </TouchableOpacity>

      {!isLoading && (
        <ButtonC title="Se Connecter" color="#4CAF50" onPress={handleLogin} />
      )}

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      )}

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Vous n'avez pas de compte? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Inscrivez-vous</Text>
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

  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#4CAF50",
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
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginLeft: 10,
  },
});
