import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";

const TextInputC = ({
  value,
  setValue,
  placeholder,
  iconName,
  secureTextEntry,
  keyboardType,
  onBlur,
  unit
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <Ionicons name={iconName} size={24} color="gray" style={styles.icon} />
        <TextInput
          placeholder={placeholder}
          onChangeText={setValue}
          value={value}
          secureTextEntry={secureTextEntry}
          style={styles.inputField}
          keyboardType={keyboardType}
          onBlur={onBlur}
        />
        {unit && <Text style={styles.unitText}>{unit}</Text>}
      </View>
    </View>
  );
};

TextInputC.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  onBlur: PropTypes.func,
};


const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  unitText: {
    fontSize: 16,
    color: "gray",
  },
});

export default TextInputC;
