import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card } from "react-native-paper";

const categories = ["Personas", "Publicaciones", "Libros", "Anuncios"];

const sampleData = {
  personas: [
    { id: "p1", name: "María López", avatar: "https://randomuser.me/api/portraits/women/50.jpg" },
    { id: "p2", name: "Juan Pérez", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    { id: "p3", name: "Carlos Ramírez", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
  ],
  publicaciones: [
    {
      id: "pub1",
      user: "Ana",
      text: "Nueva frase inspiradora 📖✨",
      image: "https://picsum.photos/400/200?random=1",
    },
    {
      id: "pub2",
      user: "Luis",
      text: "Recomiendo este libro de ciencia 🧪",
      image: "https://picsum.photos/400/200?random=2",
    },
    {
      id: "pub3",
      user: "Nicky Nikol",
      text: "Hoy descubrí un libro increíble 📚✨",
      image: "https://picsum.photos/400/200?random=3",
    },
  ],
  libros: [
    {
      id: "l1",
      title: "El Guardián Invisible",
      author: "Dolores Redondo",
      cover: "https://covers.openlibrary.org/b/id/11153274-L.jpg",
    },
    {
      id: "l2",
      title: "Cien Años de Soledad",
      author: "Gabriel García Márquez",
      cover: "https://covers.openlibrary.org/b/id/10521209-L.jpg",
    },
    {
      id: "l3",
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    },
  ],
  anuncios: [
    {
      id: "a1",
      title: "Oferta de libros",
      text: "50% en novelas de misterio hasta el domingo 🔥",
    },
    {
      id: "a2",
      title: "Evento literario",
      text: "No te pierdas la feria del libro este sábado 📚",
    },
  ],
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personas");

  const filterData = (data) => {
    if (!search.trim()) return data;
    return data.filter((item) => {
      if (selectedCategory === "Personas") {
        return item.name.toLowerCase().includes(search.toLowerCase());
      }
      if (selectedCategory === "Publicaciones") {
        return (
          item.user.toLowerCase().includes(search.toLowerCase()) ||
          item.text.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (selectedCategory === "Libros") {
        return (
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.author.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (selectedCategory === "Anuncios") {
        return (
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.text.toLowerCase().includes(search.toLowerCase())
        );
      }
      return true;
    });
  };

  const renderItem = ({ item }) => {
    if (selectedCategory === "Personas") {
      return (
        <View style={styles.userItem}>
          <Avatar.Image size={50} source={{ uri: item.avatar }} />
          <Text style={styles.userName}>{item.name}</Text>
        </View>
      );
    }

    if (selectedCategory === "Publicaciones") {
      return (
        <Card style={styles.card}>
          <Card.Title title={item.user} />
          <Card.Content>
            <Text>{item.text}</Text>
          </Card.Content>
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </Card>
      );
    }

    if (selectedCategory === "Libros") {
      return (
        <View style={styles.bookItem}>
          <Image source={{ uri: item.cover }} style={styles.bookCover} />
          <View>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
          </View>
        </View>
      );
    }

    if (selectedCategory === "Anuncios") {
      return (
        <View style={styles.announcementItem}>
          <Text style={styles.announcementTitle}>{item.title}</Text>
          <Text style={styles.announcementText}>{item.text}</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <TextInput
        style={styles.search}
        placeholder={`Buscar en ${selectedCategory.toLowerCase()}...`}
        value={search}
        onChangeText={setSearch}
      />

      {/* Categorías */}
      <View style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categorySelected,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextSelected,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista dinámica */}
      <FlatList
        data={filterData(sampleData[selectedCategory.toLowerCase()])}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  search: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categories: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-around",
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  categorySelected: { backgroundColor: "#ff6f00" },
  categoryText: { color: "#333" },
  categoryTextSelected: { color: "white", fontWeight: "bold" },

  // Personas
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  userName: { marginLeft: 10, fontSize: 16 },

  // Publicaciones
  card: { marginBottom: 15, borderRadius: 12, overflow: "hidden" },
  image: { width: "100%", height: 200, marginTop: 10, borderRadius: 10 },

  // Libros
  bookItem: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  bookCover: { width: 60, height: 90, marginRight: 10, borderRadius: 5 },
  bookTitle: { fontSize: 16, fontWeight: "bold" },
  bookAuthor: { fontSize: 14, color: "gray" },

  // Anuncios
  announcementItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ff6f00",
  },
  announcementTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  announcementText: { fontSize: 14, color: "#555" },
});
