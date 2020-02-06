import React, { useState, useEffect } from "react";
import AnimatedProgressWheel from "react-native-progress-wheel";

import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Button,
  Dimensions,
  ScrollView
} from "react-native";

import CoupleAccounts from "../Components/CoupleAccounts";

import api from "../services/api";

const Main = ({ navigation }) => {
  const [coupleAccounts, setCoupleAccounts] = useState([]);
  const [wallet, setWallet] = useState([
    {
      Banks: []
    }
  ]);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const runEffect = async () => {
      const value = await AsyncStorage.getItem("token");
      const { data } = await api.get("/user/couple", {
        headers: { "x-auth-acc": value }
      });

      const walletGet = await api.get("/user/wallet", {
        headers: { "x-auth-acc": value }
      });
      setToken(value);
      setWallet(walletGet.data);
      setCoupleAccounts(data);
    };
    runEffect();
  }, []);

  useEffect(() => {
    const runEffect = async () => {
      let value = 0;
      wallet[0].Banks.map(bank => {
        value = value + Number(bank.balance);
      });
      setCurrent(value);
      setProgress(100);
    };
    runEffect();
  }, [wallet]);

  const addbutton = () => {
    setToggleAdd(!toggleAdd);
  };

  const logout = async e => {
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };

  const criarcoupleaccount = async () => {
    const { data } = await api.post(
      "/user/couple",
      { name: "vitorAlone" },
      {
        headers: { "x-auth-acc": token }
      }
    );

    console.log(data);
  };
  return (
    <ScrollView style={style.home}>
      <View style={style.main}>
        <Text style={style.title}>Sua Carteira</Text>
        <AnimatedProgressWheel
          size={150}
          width={20}
          color={"green"}
          progress={progress}
          animateFromValue={0}
        />
        <Text>Patrimonio: R${current}</Text>
        <Text>Liquido: R$500,00</Text>
        <Text>Bloqueado: R$500,00</Text>
      </View>
      <View style={style.main}>
        <Text style={style.title}>Couple Accounts</Text>
        <View style={style.couple}>
          {coupleAccounts.map(acc => (
            <CoupleAccounts key={acc.id} acc></CoupleAccounts>
          ))}
        </View>
      </View>
      <View style={style.addbutton}>
        <Button onPress={() => addbutton()} title="+"></Button>
        <Button onPress={() => logout()} title="logout"></Button>
      </View>
      {toggleAdd ? (
        <View style={style.addoptions}>
          <Button title="Adicionar ganhos e gastos"></Button>
          <Button title="Adicionar banco/corretora"></Button>
          <Button
            onPress={() => {
              criarcoupleaccount();
            }}
            title="Criar uma couple account"
          ></Button>
        </View>
      ) : null}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  home: {
    backgroundColor: "#e8e8e8",
    flex: 1
  },
  main: {
    marginTop: 50,
    alignItems: "center"
  },
  title: {
    fontSize: 25,
    margin: 10
  },
  couple: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  couplewheel: {
    alignItems: "center",
    margin: 20
  },
  addbutton: {
    position: "absolute",
    top: 40,
    right: 0,
    width: 50
  },
  addoptions: {
    position: "absolute",
    width: Dimensions.get("window").width - 50,
    top: Dimensions.get("window").height / 3,
    height: 150,
    justifyContent: "space-evenly",
    alignSelf: "center"
  }
});

export default Main;
