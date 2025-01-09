import React from "react";
import PropTypes from "prop-types";
import { View, Button } from "react-native";

const ButtonC = ({ title, color, onPress, style }) => {
  return (
    <View style={{ ...styles.buttonContainer, ...style }}>
      <Button title={title} color={color} onPress={onPress} />
    </View>
  );
};

ButtonC.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const styles = {
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
};

export default ButtonC;
