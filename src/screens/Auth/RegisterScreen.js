import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/Actions/authActions";

export default function RegisterScreen({ navigation }) {
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  let userData = {};
  const dispatch = useDispatch(); // Initialiser le dispatch
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    }

    if (email && !validateEmail(email)) {
      setEmailError("L'email est invalide.");
    } else {
      setEmailError("");
    }
  }, [isLoggedIn, navigation, email]); // Ajoutez la dépendance à 'isLoggedIn'

  const handleRegister = ({ firstName, lastName, email, phone, password }) => {
    if (!firstName || !lastName || !email || !phone || !password) {
      Alert.alert("Validation", "Veuillez saisir tous les champs.");
      return;
    }
    // Register user
    userData = {
      prenom: firstName,
      nom: lastName,
      email: email,
      tel: phone,
      password: password,
    };

    dispatch(register(userData));
    navigation.navigate("Login");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="gray" />
          <Text style={styles.backText}>Revenir</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Bonjour!</Text>
        <Text style={styles.subtitle}>Créer un nouveau compte</Text>

        {/* Input fields */}
        {[
          {
            placeholder: "Prénom",
            value: firstName,
            setValue: setFirstName,
            icon: "person-outline",
          },
          {
            placeholder: "Nom",
            value: lastName,
            setValue: setLastName,
            icon: "person-outline",
          },
          {
            placeholder: "Email",
            value: email,
            setValue: setEmail,
            icon: "mail-outline",
            keyboardType: "email-address",
          },
          {
            placeholder: "Téléphone",
            value: phone,
            setValue: setPhone,
            icon: "call-outline",
            keyboardType: "phone-pad",
          },
          {
            placeholder: "Mot de passe",
            value: password,
            setValue: setPassword,
            icon: "lock-closed-outline",
            secureTextEntry: true,
          },
        ].map((input, index) => (
          <View>
            <View key={index} style={styles.inputContainer}>
              <Ionicons
                name={input.icon}
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                placeholder={input.placeholder}
                style={styles.inputField}
                onChangeText={input.setValue}
                value={input.value}
                keyboardType={input.keyboardType || "default"}
                secureTextEntry={input.secureTextEntry || false}
                autoCapitalize={input.placeholder === "Email" ? "none" : "sentences"}
              />
            </View>
            {input.placeholder === "Email" && emailError ? (
              <Text style={{ color: "red", marginTop: -5, marginBottom: 10 }}>{emailError}</Text>
            ) : null}
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button
            title="S'inscrire"
            color="#4CAF50"
            onPress={() => {
              handleRegister({ firstName, lastName, email, phone, password });
            }}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Vous avez déjà un compte? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Se Connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    marginLeft: 10,
    color: "gray",
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "gray",
  },
  loginLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
