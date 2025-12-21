import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "./routes";

import OpsSelectorScreen from "../../features/opsSelector/screens/OpsSelectorScreen";
import DeploymentBriefingScreen from "../../features/opsSelector/screens/DeploymentBriefingScreen";
import LockedModeBriefingScreen from "../../features/opsSelector/screens/LockedModeBriefingScreen";
import NightWatchHome from "../../features/nightWatch/screens/NightWatchHome";
import ForemanHome from "../../features/foreman/screens/ForemanHome";
import RoadCaptainLocked from "../../features/roadCaptain/screens/RoadCaptainLocked";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.OPS_SELECTOR}>
        <Stack.Screen name={Routes.OPS_SELECTOR} component={OpsSelectorScreen} />
        <Stack.Screen name={Routes.DEPLOYMENT_BRIEFING} component={DeploymentBriefingScreen} />
        <Stack.Screen name={Routes.LOCKED_MODE_BRIEFING} component={LockedModeBriefingScreen} />
        <Stack.Screen name={Routes.NIGHT_WATCH} component={NightWatchHome} />
        <Stack.Screen name={Routes.FOREMAN} component={ForemanHome} />
        <Stack.Screen name={Routes.ROAD_CAPTAIN_LOCKED} component={RoadCaptainLocked} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
