import React, { useEffect } from "react";
import { View, AsyncStorage, ActivityIndicator, StatusBar } from "react-native";

const Home = ({ navigation }) => {
  useEffect(() => {
    const runEffect = async () => {
      const userToken = await AsyncStorage.getItem("token");
      navigation.navigate(userToken ? "Main" : "Auth");
    };
    runEffect();
  }, []);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default Home;
