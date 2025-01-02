import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/AppNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
