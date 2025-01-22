import React, { Suspense } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import LoginScreen from "./screens/Auth/LoginScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = React.lazy(() => import("./screens/HomeScreen"));
const AddAnnonce = React.lazy(() => import("./screens/CreateAnnonce/AddAnnonce"));
const ListAnnonces = React.lazy(() => import("./screens/SearchAnnonces/ListAnnonces"));
const CreatedAnnonces = React.lazy(() => import("./screens/MyAnnonces/CreatedAnnonces"));
const ListFavAnnonces = React.lazy(() => import("./screens/FavAnnonces/ListFavAnnonces"));
const RegisterScreen = React.lazy(() => import("./screens/Auth/RegisterScreen"));
const ForgotPasswordScreen = React.lazy(() => import("./screens/Auth/ForgotPasswordScreen"));
const LogoutScreen = React.lazy(() => import("./screens/Auth/LogoutScreen"));
const AddProperty = React.lazy(() => import("./screens/CreateAnnonce/AddProperty"));
const AddPropertyDetails = React.lazy(() => import("./screens/CreateAnnonce/AddPropertyDetails"));
const DetailsAnnonce = React.lazy(() => import("./screens/SearchAnnonces/DetailsAnnonce"));
const CreatedDetailsAnnonce = React.lazy(() => import("./screens/MyAnnonces/CreatedDetailsAnnonce"));
const EditAnnonce = React.lazy(() => import("./screens/MyAnnonces/EditAnnonce"));
const EditProperty = React.lazy(() => import("./screens/MyAnnonces/EditProperty"));
const EditPropertyDetails = React.lazy(() => import("./screens/MyAnnonces/EditPropertyDetails"));
const PropertyMap = React.lazy(() => import("./screens/SearchAnnonces/PropertyMap"));
const MessagerieAnnonce = React.lazy(() => import("./screens/SearchAnnonces/MessagerieAnnonce"));

function DrawerMenu() {
  return (
    <Suspense fallback={<View style={styles.loading}><ActivityIndicator size="large" color="#4CAF50" /></View>}>
      <Drawer.Navigator
        initialRouteName="Accueil"
        drawerPosition="left"
        drawerType="front"
        overlayColor="rgba(0, 0, 0, 0.5)"
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: "#fff",
          drawerStyle: styles.drawer,
          drawerActiveBackgroundColor: "#4CAF50",
          drawerActiveTintColor: "#ffffff",
          drawerInactiveTintColor: "#2e2e2e",
          drawerLabelStyle: styles.drawerLabel,
          drawerItemStyle: styles.drawerItem,
        }}
      >
        <Drawer.Screen name="Accueil" component={HomeScreen} options={{ title: "🏠 Accueil" }} />
        <Drawer.Screen name="Ajouter une Annonce" component={AddAnnonce} options={{ title: "➕ Ajouter une Annonce" }} />
        <Drawer.Screen name="Liste des Annonces" component={ListAnnonces} options={{ title: "📋 Liste des Annonces" }} />
        <Drawer.Screen name="CreatedAnnonces" component={CreatedAnnonces} options={{ title: "📦 Mes Annonces" }} />
        <Drawer.Screen name="Liste des Favoris" component={ListFavAnnonces} options={{ title: "❤️ Liste des Favoris" }} />
        <Drawer.Screen name="Se déconnecter" component={LogoutScreen} options={{ title: "🚪 Se déconnecter", drawerLabelStyle: [styles.drawerLabel, styles.logoutLabel] }} />
      </Drawer.Navigator>
    </Suspense>
  );
}

function AppNavigator() {
  return (
    <Suspense fallback={<View style={styles.loading}><ActivityIndicator size="large" color="#4CAF50" /></View>}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={DrawerMenu} />
        <Stack.Screen name="AddProperty" component={AddProperty} />
        <Stack.Screen name="AddPropertyDetails" component={AddPropertyDetails} />
        <Stack.Screen name="DetailsAnnonce" component={DetailsAnnonce} />
        <Stack.Screen name="CreatedDetailsAnnonce" component={CreatedDetailsAnnonce} />
        <Stack.Screen name="EditAnnonce" component={EditAnnonce} />
        <Stack.Screen name="EditProperty" component={EditProperty} />
        <Stack.Screen name="EditPropertyDetails" component={EditPropertyDetails} />
        <Stack.Screen name="PropertyMap" component={PropertyMap} />
        <Stack.Screen name="MessagerieAnnonce" component={MessagerieAnnonce} />
      </Stack.Navigator>
    </Suspense>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4CAF50",
  },
  drawer: {
    backgroundColor: "#f4f4f4",
    width: 280,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: -10,
  },
  drawerItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 5,
  },
  logoutLabel: {
    color: "#e53935",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
});

export default AppNavigator;