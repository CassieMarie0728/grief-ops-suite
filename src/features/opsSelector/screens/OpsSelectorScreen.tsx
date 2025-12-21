import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../../app/navigation/routes";
import { Screen } from "../../../shared/ui/components/Screen";
import { Text } from "../../../shared/ui/components/Text";
import { Button } from "../../../shared/ui/components/Button";
import { OpsSelectorCopy } from "../copy/opsSelector.copy";
import { FeatureFlags } from "../../../app/config/featureFlags";

export default function OpsSelectorScreen() {
  const nav = useNavigation<any>();
  return (
    <Screen>
      <View style={{ gap: 12 }}>
        <Text variant="h1">{OpsSelectorCopy.title}</Text>
        <Button title={OpsSelectorCopy.actions.NIGHT_WATCH} onPress={() => nav.navigate(Routes.NIGHT_WATCH)} />
        <Button title={OpsSelectorCopy.actions.FOREMAN} onPress={() => nav.navigate(Routes.FOREMAN)} />
        <Button
          title={OpsSelectorCopy.actions.ROAD_CAPTAIN + " (Locked)"}
          onPress={() => nav.navigate(Routes.ROAD_CAPTAIN_LOCKED)}
          disabled={FeatureFlags.ROAD_CAPTAIN_ENABLED}
        />
      </View>
    </Screen>
  );
}
