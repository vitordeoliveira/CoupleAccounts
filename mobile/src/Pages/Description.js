import React from "react";
import { View, Text } from "react-native";

const Description = ({ navigation }) => {
  const title = navigation.getParam("title");
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default Description;
