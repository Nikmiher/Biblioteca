import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native"; // 👈 refresca al volver

export default function BorradoresScreen() {
  const [librosBorradores, setLibrosBorradores] = useState([]);
  const isFocused = useIsFocused();

  // 🔹 Cargar libros en lectura
  useEffect(() => {
    const cargarBorradores = async () => {
      try {
        const data = await AsyncStorage.getItem("librosBorradores");
        if (data) {
          setLibrosBorradores(JSON.parse(data));
        } else {
          setLibrosBorradores([]);
        }
      } catch (error) {
        console.error("Error cargando borradores:", error);
      }
    };

    if (isFocused) {
      cargarBorradores();
    }
  }, [isFocused]);

  // 🔹 Eliminar libro de borradores
  const eliminarBorrador = async (id) => {
    try {
      const nuevaLista = librosBorradores.filter((libro) => libro.id !== id);
      setLibrosBorradores(nuevaLista);
      await AsyncStorage.setItem("librosBorradores", JSON.stringify(nuevaLista));
    } catch (error) {
      console.error("Error eliminando borrador:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Libros en lectura</Text>
      {librosBorradores.length === 0 ? (
        <Text style={styles.empty}>No hay libros por ahora</Text>
      ) : (
        <FlatList
          data={librosBorradores}
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
                onPress={() => eliminarBorrador(item.id)}
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
