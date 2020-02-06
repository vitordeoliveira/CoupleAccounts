import React, { useState } from "react";
import { View, Button, TextInput, AsyncStorage } from "react-native";

import api from "../services/api";

const Home = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const submit = async () => {
    try {
      const { data } = await api.post("/user", { name, email });
      await AsyncStorage.setItem("token", data.token);
      console.log(data.token);
      navigation.navigate("Main");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <>
        <TextInput
          placeholder="Email"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 100,
            textAlign: "center"
          }}
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          placeholder="Nome"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 100,
            marginBottom: 100,
            textAlign: "center"
          }}
          value={name}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
        ></TextInput>
        <Button
          title="Press me"
          onPress={() => {
            submit();
          }}
        ></Button>
      </>
    </View>
  );
};

export default Home;
