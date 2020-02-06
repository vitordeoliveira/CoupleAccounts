import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Router from "./src/routes";

export default function App() {
  return <Router></Router>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
