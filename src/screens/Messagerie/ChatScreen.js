import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { io } from "socket.io-client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import config from "../../config";


const socket = io(config.SOCKET_URL); 

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("user-joined", (data) => {
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [
          {
            _id: Math.random().toString(),
            text: data.message,
            createdAt: new Date(),
            user: { _id: "system", name: "System" },
          },
        ])
      );
    });
  
    socket.on("messageReceived", (newMessage) => {
      console.log("Message reçu du serveur :", newMessage); // Vérifier la réception
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage])); // Correction ici
    });
  
    return () => {
      socket.off("user-joined");
      socket.off("messageReceived");
    };
  }, []);
  

  const joinRoom = () => {
    if (username && roomId) {
      socket.emit("joinRoom", { username, roomId });
      setConnected(true);
    }
  };

  const onSend = useCallback((newMessages = []) => {
    if (newMessages.length > 0) {
      const messageToSend = {
        _id: Math.random().toString(),
        text: newMessages[0].text,
        createdAt: new Date(),
        user: { _id: username, name: username },
      };
  
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [messageToSend])); // Affiche immédiatement le message
  
      socket.emit("newMessage", {
        roomId,
        message: newMessages[0].text,
        username,
      });
    }
  }, [roomId, username]);
  


  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, padding: 20 }}>
        {!connected ? (
          <>
            <Text>Nom d'utilisateur :</Text>
            <TextInput style={{ borderWidth: 1, padding: 8, marginVertical: 10 }} onChangeText={setUsername} />
            <Text>ID du chat :</Text>
            <TextInput style={{ borderWidth: 1, padding: 8, marginVertical: 10 }} onChangeText={setRoomId} />
            <Button title="Rejoindre le chat" onPress={joinRoom} />
          </>
        ) : (
          <GiftedChat messages={messages} onSend={onSend} user={{ _id: username, name: username }} />
        )}
      </View>
    </SafeAreaProvider>
  );
}