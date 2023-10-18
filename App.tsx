import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NativeBaseProvider } from "native-base";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/Loading";
import { Routes } from "@routes/index";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableLatestRenderer } from "react-native-maps";
import { AuthContextProvider } from "@contexts/AuthContext";
import { LogBox } from "react-native";

enableLatestRenderer();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider>
      <NativeBaseProvider isSSR={false}>
        <StatusBar style="dark" />
        <AuthContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
