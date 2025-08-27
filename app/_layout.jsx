// app/_layout.tsx
import { Stack, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Drawer, PaperProvider, Surface } from "react-native-paper";
import { theme } from "../constants/tema";

export default function RootLayout() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerItem, setDrawerItem] = React.useState("");
  const router = useRouter();

  const handleNavigate = (item: string, path: string) => {
    setDrawerItem(item);
    setDrawerOpen(false);
    router.push(path); // 👈 navegación real
  };

  // Aquí podrías tener lógica de autenticación
  const isAuthenticated = true; // Simulación

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        {isAuthenticated ? (
          <>
            <Appbar.Header>
              <Appbar.Action
                icon="menu"
                onPress={() => setDrawerOpen(!drawerOpen)}
              />
              <Appbar.Content title="Biblioteca Social" />
            </Appbar.Header>
            <View style={styles.content}>
              {drawerOpen && (
                <Surface style={styles.drawer}>
                  <Drawer.Section title="Menú">
                    <Drawer.Item
                      label="Colecciones"
                      active={drawerItem === "colecciones"}
                      onPress={() => handleNavigate("colecciones", "/colecciones")}
                      icon="folder"
                    />
                    <Drawer.Item
                      label="leyendo"
                      active={drawerItem === "borradores"}
                      onPress={() => handleNavigate("borradores", "/borradores")}
                      icon="file-document"
                    />
                    <Drawer.Item
                      label="Ajustes"
                      active={drawerItem === "ajustes"}
                      onPress={() => handleNavigate("ajustes", "/ajustes")}
                      icon="cog"
                    />
                    <Drawer.Item
                      label="Inicio"
                      active={drawerItem === "acerca"}
                      onPress={() => handleNavigate("acerca", "/(tabs)/perfil")}
                      icon="information"
                    />
                  </Drawer.Section>
                </Surface>
              )}
              <View style={styles.screen}>
                <Stack screenOptions={{ headerShown: false }} />
              </View>
            </View>
          </>
        ) : (
          <Stack screenOptions={{ headerShown: false }} /> // Redirige a login/signup
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, flexDirection: "row" },
  drawer: { width: 220, backgroundColor: "#fff" },
  screen: { flex: 1 },
});
