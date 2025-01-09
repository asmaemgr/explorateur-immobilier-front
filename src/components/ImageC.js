import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";

const ImageC = ({ resizeMode, source, style }) => {
  return (
    <View style={{ ...styles.imageContainer, ...style }}>
      <Image source={source} style={styles.image} resizeMode={resizeMode} />
    </View>
  );
};

ImageC.propTypes = {
  resizeMode: PropTypes.string,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  style: PropTypes.object,
};

const styles = {
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
};

export default ImageC;
