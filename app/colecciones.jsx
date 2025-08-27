import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native"; // 👈 detecta cuando entras a la pantalla

export default function ColeccionesScreen() {
  const [librosVistos, setLibrosVistos] = useState([]);
  const isFocused = useIsFocused();

  // 🔹 Cargar libros guardados
  useEffect(() => {
    const cargarLibros = async () => {
      try {
        const data = await AsyncStorage.getItem("librosVistos");
        if (data) {
          setLibrosVistos(JSON.parse(data));
        } else {
          setLibrosVistos([]);
        }
      } catch (error) {
        console.error("Error cargando libros:", error);
      }
    };

    if (isFocused) {
      cargarLibros();
    }
  }, [isFocused]);

  // 🔹 Eliminar libro de colecciones
  const eliminarLibro = async (id) => {
    try {
      const nuevaLista = librosVistos.filter((libro) => libro.id !== id);
      setLibrosVistos(nuevaLista);
      await AsyncStorage.setItem("librosVistos", JSON.stringify(nuevaLista));
    } catch (error) {
      console.error("Error eliminando libro:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Mis Colecciones</Text>

      {librosVistos.length === 0 ? (
        <Text style={styles.empty}>Aún no agregaste libros</Text>
      ) : (
        <FlatList
          data={librosVistos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Carátula */}
              <Image source={{ uri: item.caratula }} style={styles.caratula} />

              {/* Info */}
              <View style={styles.info}>
                <Text style={styles.bookTitle}>{item.titulo}</Text>
                <Text style={styles.bookAuthor}>{item.autor}</Text>
              </View>

              {/* Botón eliminar */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarLibro(item.id)}
              >
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  empty: { textAlign: "center", fontSize: 16, color: "gray" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  caratula: {
    width: 70,
    height: 100,
    borderRadius: 6,
    marginRight: 15,
  },
  info: { flex: 1 },
  bookTitle: { fontSize: 16, fontWeight: "bold" },
  bookAuthor: { fontSize: 14, color: "gray" },
  deleteButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fee2e2",
  },
  deleteText: { fontSize: 18, color: "red" },
});
