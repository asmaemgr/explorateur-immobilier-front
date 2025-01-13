import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import io from "socket.io-client";

const MessagerieAnnonce = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Stocke tous les messages reçus et envoyés;
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    // Connexion au serveur WebSocket
    const socketConnection = io(`http://192.168.1.113:3001`);
    setSocket(socketConnection); // Stocke la connexion socket dans l'état
    // Écoute l'événement 'message' envoyé par le serveur
    socketConnection.on("message", (data) => {
      // Ajoute le message du serveur
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Server", text: data },
      ]);
    });
    // Déconnecte la connexion WebSocketlorsque le composant est démonté
    return () => socketConnection.disconnect();
  }, []);
  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      // Ajoute le message envoyé par l'utilisateur à la liste
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", text: message },
      ]);
      socket.emit("message", message); // Envoie le message au serveur
      setMessage(""); // Réinitialise le champ de saisie après envoi
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <Text
              style={
                item.sender === "You" ? styles.youMessage : styles.serverMessage
              }
            >
              {item.sender}: {item.text}
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messagesList}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Saisir un message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Envoyer" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    padding: 10,
  },
  youMessage: {
    backgroundColor: "#4CAF50",
    color: "#FFFFFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  serverMessage: {
    backgroundColor: "#2196F3",
    color: "#FFFFFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default MessagerieAnnonce;
