import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PerfilScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado con foto y nombre */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://ui-avatars.com/api/?name=N&background=FF6600&color=ffffff&size=128&length=1" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Nicky Nikol</Text>
          <Text style={styles.editProfile}>Editar perfil</Text>
        </View>
      </View>

      {/* Opciones de configuración */}
      <View style={styles.section}>
        <Option icon="stats-chart" label="Estadísticas del creador" />
        <Option icon="person-circle-outline" label="Cuenta" />
        <Option icon="color-palette-outline" label="Mostrar" />
        <Option icon="notifications-outline" label="Notificaciones" />
        <Option icon="card-outline" label="Pagos" />
        <Option icon="game-controller-outline" label="Gestionar intereses" />
        <Option icon="shield-checkmark-outline" label="Privacidad y seguridad" />
      </View>

      <View style={styles.section}>
        <Option icon="chatbubble-outline" label="Comentarios" />
        <Option icon="help-circle-outline" label="Soporte" />
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="power-outline" size={22} color="red" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Versión 2.64.1 // Compilación 20569</Text>
    </ScrollView>
  );
}

function Option({ icon, label }) {
  return (
    <TouchableOpacity style={styles.option}>
      <Ionicons name={icon} size={22} color="#fff" style={styles.optionIcon} />
      <Text style={styles.optionText}>{label}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#6b7280" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafaff",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fefeffff",
    padding: 15,
    borderRadius: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  editProfile: {
    color: "#9ca3af",
    fontSize: 14,
  },
  section: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2c2c2e",
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    marginBottom: 15,
  },
  logoutText: {
    color: "red",
    fontSize: 16,
    marginLeft: 10,
  },
  version: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 30,
  },
});
