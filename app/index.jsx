import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ almacenamiento local

export default function Index() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  // 🔥 función para verificar usuario
  const buscarUsuario = async () => {
    if (!usuario.trim() || !contrasena.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      // 📌 Opción 1: acceso directo (usuario fijo)
      if (usuario.toLowerCase() === "nikol" && contrasena === "123456") {
        Alert.alert("Bienvenido", "Acceso concedido 🎉");
        router.push("/start");
        setUsuario("");
        setContrasena("");
        return;
      }

      // 📌 Opción 2: validar contra usuarios guardados
      const data = await AsyncStorage.getItem("usuarios");
      if (!data) {
        Alert.alert("Error", "No hay usuarios registrados");
        return;
      }

      const usuariosGuardados = JSON.parse(data); // array de usuarios
      const usuarioEncontrado = usuariosGuardados.find(
        (u) =>
          u.usuario.toLowerCase() === usuario.toLowerCase() &&
          u.contrasena === contrasena
      );

      if (usuarioEncontrado) {
        Alert.alert("Bienvenido", `Hola ${usuarioEncontrado.usuario} 🎉`);
        router.push("/start");
        setUsuario("");
        setContrasena("");
      } else {
        Alert.alert("Acceso denegado", "Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.log("Error buscando usuario:", error);
      Alert.alert("Error", "Hubo un problema al iniciar sesión");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Iniciar Sesión", headerShown: false }} />
      <ImageBackground
        source={require("../assets/images/fondo_naranja.jpeg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
              <Image
                source={require("../assets/images/portada1.jpeg")}
                style={{
                  width: "80%",
                  height: 90,
                  alignSelf: "center",
                  marginTop: 10,
                }}
              />

              <Text variant="headlineLarge" style={styles.titulo}>
                Iniciar Sesión
              </Text>

              <TextInput
                label="Usuario"
                value={usuario}
                onChangeText={setUsuario}
                left={<TextInput.Icon icon="account" color="#ff914d" />}
                style={styles.input}
                autoCapitalize="none"
                mode="outlined"
                theme={{ roundness: 20 }}
              />

              <TextInput
                label="Contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry={!mostrarContrasena}
                left={<TextInput.Icon icon="lock" color="#ff914d" />}
                right={
                  <TextInput.Icon
                    icon={mostrarContrasena ? "eye-off" : "eye"}
                    onPress={() => setMostrarContrasena(!mostrarContrasena)}
                  />
                }
                style={styles.input}
                mode="outlined"
                theme={{ roundness: 20 }}
              />

              <Button mode="contained" style={styles.boton} onPress={buscarUsuario}>
                INICIAR SESIÓN
              </Button>

              <Text style={{ textAlign: "center", marginTop: 10 }}>
                ¿No tienes cuenta?{" "}
                <Text
                  style={styles.registrarTexto}
                  onPress={() => router.push("/registro")} // ✅ va al registro
                >
                  Regístrate
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    width: "90%",
    alignSelf: "center",
  },
  titulo: {
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#c0e6dcff",
    fontSize: 36,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "white",
  },
  boton: {
    backgroundColor: "#ff7a29",
    borderRadius: 30,
    marginTop: 10,
    paddingVertical: 5,
  },
  registrarTexto: {
    color: "#bfdbdfff",
    fontWeight: "bold",
  },
});
