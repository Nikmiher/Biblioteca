import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function Registrar() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const registrarUsuario = () => {
    if (!usuario.trim() || !contrasena.trim() || !confirmar.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    if (contrasena !== confirmar) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    // Aquí guardarías el usuario (API, AsyncStorage, DB, etc.)
    Alert.alert("¡Registro exitoso!", "Bienvenido 🎉");

    // 🚀 Redirige a Start y elimina el historial de registro/login
    router.replace("/start");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Registro" }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text variant="headlineLarge" style={styles.titulo}>
              Crear cuenta
            </Text>

            <TextInput
              label="Usuario"
              value={usuario}
              onChangeText={setUsuario}
              left={<TextInput.Icon icon="account" color="#ff6600" />}
              style={styles.input}
              autoCapitalize="none"
              mode="outlined"
              theme={{ roundness: 20 }}
            />

            <TextInput
              label="Contraseña"
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry
              left={<TextInput.Icon icon="lock" color="#ff6600" />}
              style={styles.input}
              mode="outlined"
              theme={{ roundness: 20 }}
            />

            <TextInput
              label="Confirmar Contraseña"
              value={confirmar}
              onChangeText={setConfirmar}
              secureTextEntry
              left={<TextInput.Icon icon="lock-check" color="#ff6600" />}
              style={styles.input}
              mode="outlined"
              theme={{ roundness: 20 }}
            />

            <Button
              mode="contained"
              style={styles.boton}
              onPress={registrarUsuario}
            >
              REGISTRARSE
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 20 },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 18,
    padding: 20,
    width: "100%",
    alignSelf: "center",
  },
  titulo: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ff6600",
    fontSize: 32,
  },
  input: { marginBottom: 15, backgroundColor: "white" },
  boton: {
    backgroundColor: "#ff7a29",
    borderRadius: 30,
    marginTop: 10,
    paddingVertical: 5,
  },
});
