import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, FAB } from "react-native-paper";

const ORANGE = "#ff6f00";

type Post = {
  id: string;
  user: string;
  avatar: string;
  date: string;
  text: string;
  image?: string | null;
  likes: number;
  comments: string[];
  shares: number;
  liked?: boolean;
};

const initialPosts: Post[] = [
  {
    id: "1",
    user: "Valentina",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "1w",
    text: "Uno es verdaderamente libre cuando deja de sentir vergüenza de sí mismo. - Nietzsche",
    image: "https://picsum.photos/400/200",
    likes: 12,
    comments: ["Muy cierto", "Me encanta esta frase"],
    shares: 2,
    liked: false,
  },
  {
    id: "2",
    user: "Josselyn",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    date: "4d",
    text: "Hoy comencé un nuevo libro 📖✨",
    image: "https://picsum.photos/400/201",
    likes: 8,
    comments: ["¡Qué emoción!", "¿Cuál estás leyendo?"],
    shares: 1,
    liked: false,
  },
];

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [fabOpen, setFabOpen] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked }
          : p
      )
    );
  };

  const handleComment = (post: Post) => {
    setSelectedPost(post);
    setCommentModalVisible(true);
  };

  const submitComment = () => {
    if (selectedPost && newComment.trim()) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === selectedPost.id
            ? { ...p, comments: [...p.comments, newComment] }
            : p
        )
      );
      setNewComment("");
      setCommentModalVisible(false);
    }
  };

  const createPost = () => {
    if (newPostText.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        user: "Tú",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg", // avatar fijo por ahora
        date: "Ahora",
        text: newPostText,
        image: null,
        likes: 0,
        comments: [],
        shares: 0,
        liked: false,
      };
      setPosts([newPost, ...posts]); // se agrega arriba
      setNewPostText("");
      setCreateModalVisible(false);
    }
  };

  const renderPost = (item: Post) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.user}
        subtitle={item.date}
        left={(props) => (
          <Avatar.Image {...props} size={40} source={{ uri: item.avatar }} />
        )}
      />
      <Card.Content>
        <Text>{item.text}</Text>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </Card.Content>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <Text style={{ color: item.liked ? ORANGE : "#555" }}>
            ❤️ {item.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleComment(item)}>
          <Text style={{ color: "#555" }}>💬 {item.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: "#555" }}>🔗 {item.shares}</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList<Post>
        data={posts}
        renderItem={({ item }) => renderPost(item)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* 🔹 Modal de comentarios */}
      <Modal visible={commentModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comentarios</Text>
            {selectedPost?.comments.map((c, i) => (
              <Text key={i} style={styles.comment}>
                • {c}
              </Text>
            ))}
            <TextInput
              style={styles.input}
              placeholder="Escribe un comentario..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.button} onPress={submitComment}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "gray" }]}
              onPress={() => setCommentModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🔹 Modal para crear nueva publicación */}
      <Modal visible={createModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Nota</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Escribe tu publicación..."
              value={newPostText}
              onChangeText={setNewPostText}
              multiline
            />
            <TouchableOpacity style={styles.button} onPress={createPost}>
              <Text style={styles.buttonText}>Publicar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "gray" }]}
              onPress={() => setCreateModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🔹 FAB con + */}
      <FAB.Group
        visible={true}
        open={fabOpen}
        icon={fabOpen ? "close" : "plus"}
        actions={[
          { icon: "video", label: "Transmitir en vivo", onPress: () => {} },
          { icon: "file-document", label: "Post largo", onPress: () => {} },
          { icon: "video-outline", label: "Publicar video", onPress: () => {} },
          {
            icon: "note-edit",
            label: "Nueva Nota",
            onPress: () => setCreateModalVisible(true),
          },
        ]}
        onStateChange={({ open }) => setFabOpen(open)}
        fabStyle={{ backgroundColor: ORANGE }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  card: { marginBottom: 15, borderRadius: 12, overflow: "hidden" },
  image: { width: "100%", height: 200, marginTop: 10, borderRadius: 8 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  comment: { marginBottom: 5, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: ORANGE,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
