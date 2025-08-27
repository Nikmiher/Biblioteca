import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 📚 Lista de Libros
const libros = [
  { 
    id: "1", 
    titulo: "Cien Años de Soledad", 
    autor: "Gabriel García Márquez", 
    caratula: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg" 
  },
  { 
    id: "2", 
    titulo: "Don Quijote de la Mancha", 
    autor: "Miguel de Cervantes", 
    caratula: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg" 
  },
  { 
    id: "3", 
    titulo: "El Principito", 
    autor: "Antoine de Saint-Exupéry", 
    caratula: "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg" 
  },
  { 
    id: "4", 
    titulo: "1984", 
    autor: "George Orwell", 
    caratula: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg" 
  },
  { 
    id: "5", 
    titulo: "Orgullo y Prejuicio", 
    autor: "Jane Austen", 
    caratula: "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg" 
  },
  { 
    id: "6", 
    titulo: "La Odisea", 
    autor: "Homero", 
    caratula: "https://images-na.ssl-images-amazon.com/images/I/81H8LQBBJtL.jpg" 
  },
  { 
    id: "7", 
    titulo: "Crimen y Castigo", 
    autor: "Fiódor Dostoyevski", 
    caratula: "https://images-na.ssl-images-amazon.com/images/I/91uwocAMtSL.jpg" 
  },
  { 
    id: "8", 
    titulo: "Los Miserables", 
    autor: "Victor Hugo", 
    caratula: "https://images-na.ssl-images-amazon.com/images/I/81O-MYt6hCL.jpg" 
  },
  { 
    id: "9", 
    titulo: "Rayuela", 
    autor: "Julio Cortázar", 
    caratula: "https://images-na.ssl-images-amazon.com/images/I/81s6DUyQCZL.jpg" 
  },
  { 
    id: "10", 
    titulo: "El Aleph", 
    autor: "Jorge Luis Borges", 
    caratula: "https://images-na.ssl-images-amazon.com/images/I/81HR7oNw3JL.jpg" 
  },
];

export default function BibliotecaScreen() {
  // 📂 Agregar a Colecciones
  const agregarColeccion = async (libro) => {
    try {
      const data = await AsyncStorage.getItem("librosVistos");
      const librosGuardados = data ? JSON.parse(data) : [];

      const yaExiste = librosGuardados.some((l) => l.id === libro.id);
      if (!yaExiste) {
        librosGuardados.push(libro);
        await AsyncStorage.setItem("librosVistos", JSON.stringify(librosGuardados));
        alert("📚 Libro agregado a Colecciones");
      } else {
        alert("⚠️ Este libro ya está en Colecciones");
      }
    } catch (error) {
      console.error("Error guardando libro:", error);
    }
  };

  // ✏️ Agregar a Borradores
  const agregarBorrador = async (libro) => {
    try {
      const data = await AsyncStorage.getItem("librosBorradores");
      const borradoresGuardados = data ? JSON.parse(data) : [];

      const yaExiste = borradoresGuardados.some((l) => l.id === libro.id);
      if (!yaExiste) {
        borradoresGuardados.push(libro);
        await AsyncStorage.setItem("librosBorradores", JSON.stringify(borradoresGuardados));
        alert("✏️ Libro agregado a Borradores");
      } else {
        alert("⚠️ Este libro ya está en Borradores");
      }
    } catch (error) {
      console.error("Error guardando libro en borradores:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biblioteca 📚</Text>
      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Carátula */}
            <Image source={{ uri: item.caratula }} style={styles.caratula} />

            {/* Info */}
            <View style={styles.info}>
              <Text style={styles.bookTitle}>{item.titulo}</Text>
              <Text style={styles.bookAuthor}>{item.autor}</Text>

              {/* Botones */}
              <View style={styles.btnRow}>
                <TouchableOpacity style={[styles.btn, styles.coleccionBtn]} onPress={() => agregarColeccion(item)}>
                  <Text style={styles.btnText}>+ Colecciones</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, styles.borradorBtn]} onPress={() => agregarBorrador(item)}>
                  <Text style={styles.btnText}>+ Leyendo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
  },
  caratula: {
    width: 70,
    height: 100,
    borderRadius: 6,
    marginRight: 15,
  },
  info: { flex: 1 },
  bookTitle: { fontSize: 16, fontWeight: "bold" },
  bookAuthor: { fontSize: 14, color: "gray", marginBottom: 10 },
  btnRow: { flexDirection: "row", justifyContent: "space-between" },
  btn: {
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 3,
  },
  coleccionBtn: { backgroundColor: "#2563eb" },
  borradorBtn: { backgroundColor: "#059669" },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 11 },
});
