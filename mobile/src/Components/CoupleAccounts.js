import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import { withNavigation } from "react-navigation";

const CoupleAccounts = ({ acc, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={style.couplewheel}
      onPress={() =>
        navigation.navigate("Description", {
          title: "hello world"
        })
      }
    >
      <Text>{acc.name}</Text>
      <AnimatedProgressWheel
        size={50}
        width={5}
        color={"green"}
        progress={90}
        animateFromValue={0}
      />
      <Text>Patrimonio: R$1000,00</Text>
      <Text>Liquido: R$500,00</Text>
      <Text>Bloqueado: R$500,00</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  home: {
    backgroundColor: "#e8e8e8",
    flex: 1,
    alignItems: "center"
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
  }
});

export default withNavigation(CoupleAccounts);
