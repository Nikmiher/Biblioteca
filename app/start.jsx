import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Start() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={{
          uri: "https://substackcdn.com/image/fetch/w_240,h_240,c_fill,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Fsubstack-logomark.png",
        }}
        style={styles.logo}
      />

      {/* Imagen central ilustrativa */}
      <Image
        source={require("../assets/images/portada1.jpeg")}
        style={styles.illustration}
      />

      {/* Texto de bienvenida */}
      <Text style={styles.title}>Bienvenido a MiApp</Text>
      <Text style={styles.subtitle}>El hogar para tu lectura favorita 📚</Text>

      {/* Botón para ir al layout con tabs */}
      <Pressable
        style={[styles.button, { backgroundColor: "#FF5A1F" }]}
        onPress={() => router.replace("/(tabs)")} // ✅ ir al home con tabs
      >
        <Text style={styles.buttonText}>Entrar a Biblioteca</Text>
      </Pressable>

      {/* Términos */}
      <Text style={styles.terms}>
        Al registrarte, aceptas los{" "}
        <Text style={{ color: "#FF5A1F" }}>Términos de uso</Text> y la{" "}
        <Text style={{ color: "#FF5A1F" }}>Política de privacidad</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  illustration: {
    width: 250,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "90%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  terms: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});
