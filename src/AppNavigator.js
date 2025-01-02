import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import AddAnnonceScreen from "./screens/CreateAnnonce/AddAnnonce";
import AddPropertyScreen from "./screens/CreateAnnonce/AddProperty";
import AddPropertyDetailsScreen from "./screens/CreateAnnonce/AddPropertyDetails";
import ListAnnonces from "./screens/SearchAnnonces/ListAnnonces";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import Mapview from "./Mapview";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerMenu() {
  return (
    <Drawer.Navigator
      initialRouteName="Accueil"
      drawerPosition="left"
      drawerType="front"
      overlayColor="rgba(0, 0, 0, 0.5)"
      screenOptions={{
        drawerActiveBackgroundColor: "#d0e0d0", // light greenish
        drawerActiveTintColor: "#2e2e2e", // dark gray
        drawerInactiveTintColor: "#6e6e6e", // medium gray
      }}
    >
      <Drawer.Screen name="Accueil" component={HomeScreen} />
      <Drawer.Screen name="Ajouter une Annonce" component={AddAnnonceScreen} />
      <Drawer.Screen name="Liste des Annonces" component={ListAnnonces} />
      <Drawer.Screen name="Map" component={Mapview} />
      <Drawer.Screen
        name="Se déconnecter"
        component={() => {
          const navigation = useNavigation();
          React.useEffect(() => {
            // Logout logic here
            // After logout, navigate to the Login screen
            navigation.navigate("Login");
          }, []);
          return null;
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Home" component={DrawerMenu} />
      <Stack.Screen
        name="AddProperty"
        component={AddPropertyScreen}
      />
      <Stack.Screen
        name="AddPropertyDetails"
        component={AddPropertyDetailsScreen}
      />
    </Stack.Navigator>
  );
}
