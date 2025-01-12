import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch } from "react-redux";

export default function LogoutScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    React.useEffect(() => {
        dispatch({ type: "LOGOUT" });
        navigation.navigate("Login");
    }, []);
    
    return null;
}
