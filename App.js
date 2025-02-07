import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/AppNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import config from "./src/config";
import messaging from "@react-native-firebase/messaging"; // Firebase Messaging

export default function App() {
  useEffect(() => {
    // Request notification permission
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("✅ Notification permission granted");
      } else {
        console.log("⚠️ Notification permission denied");
      }
    };

    requestPermission();

    // Get and store FCM token
    const getToken = async () => {
      try {
        const token = await messaging().getToken();
        if (!token) {
          console.log("⚠️ FCM Token is null");
          return;
        }

        console.log("🔥 FCM Token:", token);

        // Get userId from Redux
        const state = store.getState();
        const userId = state.auth?.userId;

        if (!userId) {
          console.error("⚠️ User ID not found in Redux store");
          return;
        }

        // Send token to backend
        const response = await fetch(`${config.BASE_URL}/users/update-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, fcmToken: token }),
        });

        const data = await response.json();
        console.log("✅ Token stored:", data);
      } catch (error) {
        console.error("❌ Error storing token:", error);
      }
    };

    getToken();

    // Handle token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async newToken => {
      console.log("🔄 FCM Token refreshed:", newToken);
      await getToken(); // Update backend with new token
    });

    // Listen for foreground notifications
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log("📩 Notification received in foreground:", remoteMessage);

      // Show notification in foreground (custom UI)
      alert(`📩 ${remoteMessage.notification.title}: ${remoteMessage.notification.body}`);
    });

    // Handle notification when app is opened from background
    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("🚀 App opened from background by notification:", remoteMessage);
    });

    // Handle notification when app opens from a terminated state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log("🚀 App opened from closed state by notification:", remoteMessage);
        }
      });

    // Cleanup listeners on unmount
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
      unsubscribeTokenRefresh();
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
