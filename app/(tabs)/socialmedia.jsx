import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SocialMediaScreen() {
  const librosDestacados = [
    {
      id: "1",
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      portada: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg",
    },
    {
      id: "2",
      titulo: "El principito",
      autor: "Antoine de Saint-Exupéry",
      portada: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
    },
    {
      id: "3",
      titulo: "Don Quijote de la Mancha",
      autor: "Miguel de Cervantes",
      portada: "https://m.media-amazon.com/images/I/81t2CVWEsUL.jpg",
    },
    {
      id: "4",
      titulo: "Rayuela",
      autor: "Julio Cortázar",
      portada: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg",
    },
    {
      id: "5",
      titulo: "Orgullo y prejuicio",
      autor: "Jane Austen",
      portada: "https://m.media-amazon.com/images/I/91HHqVTAJQL.jpg",
    },
  ];

  const handleSave = async (libro) => {
    try {
      // Obtener libros ya guardados
      const stored = await AsyncStorage.getItem("biblioteca");
      const biblioteca = stored ? JSON.parse(stored) : [];

      // Evitar duplicados
      if (biblioteca.find((b) => b.id === libro.id)) {
        Alert.alert("⚠️ Ya guardado", `"${libro.titulo}" ya está en tu biblioteca.`);
        return;
      }

      // Agregar libro
      const nuevaBiblioteca = [...biblioteca, libro];
      await AsyncStorage.setItem("biblioteca", JSON.stringify(nuevaBiblioteca));

      Alert.alert("✅ Libro guardado", `"${libro.titulo}" se agregó a tu biblioteca.`);
    } catch (error) {
      console.error(error);
      Alert.alert("❌ Error", "No se pudo guardar el libro.");
    }
  };

  const renderCard = (item) => (
    <View style={styles.card}>
      <Image source={{ uri: item.portada }} style={styles.cover} />
      <Text style={styles.bookTitle}>{item.titulo}</Text>
      <Text style={styles.bookAuthor}>{item.autor}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleSave(item)}>
        <Text style={styles.buttonText}>+ Guardar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Bienvenido a la Biblioteca Social</Text>
      <Text style={styles.subtitle}>
        Explora, guarda y disfruta de tus libros favoritos.{"\n"}
        Organiza tu biblioteca de forma sencilla y personalizada.
      </Text>

      <Text style={styles.sectionTitle}>✨ Libros destacados</Text>
      <FlatList
        data={librosDestacados}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => renderCard(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 16, color: "gray", marginBottom: 20, textAlign: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginRight: 15,
    alignItems: "center",
    width: 150,
    elevation: 3,
  },
  cover: { width: 100, height: 150, borderRadius: 8, marginBottom: 10, resizeMode: "cover" },
  bookTitle: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  bookAuthor: { fontSize: 12, color: "gray", marginBottom: 8, textAlign: "center" },
  button: {
    backgroundColor: "#FF5A1F",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  buttonText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
