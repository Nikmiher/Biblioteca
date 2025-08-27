import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AjustesScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificaciones, setNotificaciones] = useState(true);

  // 🔹 Cambiar tema (estado local)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 🔹 Cambiar notificaciones
  const toggleNotificaciones = () => {
    setNotificaciones(!notificaciones);
  };

  // 🔹 Borrar datos de la app
  const borrarDatos = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("✅ Listo", "Todos los datos fueron borrados.");
    } catch (error) {
      Alert.alert("❌ Error", "No se pudieron borrar los datos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Ajustes</Text>

      {/* Tema */}
      <View style={styles.option}>
        <Text style={styles.label}>Tema oscuro</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Notificaciones */}
      <View style={styles.option}>
        <Text style={styles.label}>Notificaciones</Text>
        <Switch value={notificaciones} onValueChange={toggleNotificaciones} />
      </View>

      {/* Borrar datos */}
      <TouchableOpacity style={styles.button} onPress={borrarDatos}>
        <Text style={styles.buttonText}>Borrar datos guardados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  label: { fontSize: 16 },

  button: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "bold" },
});
