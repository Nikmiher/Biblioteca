import { useState } from "react";
import { SafeAreaView } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import AjustesScreen from "./AjustesScreen";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <PaperProvider theme={darkMode ? MD3DarkTheme : MD3LightTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        <AjustesScreen darkMode={darkMode} setDarkMode={setDarkMode} />
      </SafeAreaView>
    </PaperProvider>
  );
}
