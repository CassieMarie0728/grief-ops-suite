import React from "react";
import { View } from "react-native";
import RootNavigator from "./navigation/RootNavigator";
import { ThemeProvider } from "../shared/ui/theme/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <RootNavigator />
      </View>
    </ThemeProvider>
  );
}
