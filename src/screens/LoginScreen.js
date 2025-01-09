import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Actions/authActions";
import ButtonC from "../components/ButtonC";
import TextInputC from "../components/TextInputC";
import ImageC from "../components/ImageC";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Initialiser le dispatch
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigation.navigate("Home");
    } else if (!isLoading && error) {
      Alert.alert("Erreur", error);
    }
  }, [isLoading, isLoggedIn, error, navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Connexion en cours...</Text>
      </View>
    );
  }
  
  

  const handleLogin = () => {
    // if (!email || !password) {
    //   Alert.alert(
    //     "Validation",
    //     "Veuillez saisir un nom d'utilisateur et un mot de passe."
    //   );
    //   return;
    // }
    // console.log("Dispatching login action with:", email, password);
    // dispatch(login(email, password));
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <ImageC
        source={require("../../assets/HouseSearching.png")}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bienvenue de retour!</Text>
      <Text style={styles.subtitle}>Ravi de vous revoir</Text>

      <TextInputC
        value={email}
        setValue={setEmail}
        placeholder="Email"
        iconName="mail-outline"
        secureTextEntry={false}
      />

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

      <ButtonC title="Se Connecter" color="#4CAF50" onPress={handleLogin} />

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
});
