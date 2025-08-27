import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { ThemedView } from './ThemedView'; // ruta relativa
import { useBottomTabOverflow } from './ui/TabBarBackground'; // ruta relativa

const HEADER_HEIGHT = 250;

export default function ParallaxScrollView({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detecta si el usuario está en tema claro u oscuro
  const colorScheme = useColorScheme();
  // Altura de la barra de tabs para evitar que el contenido se esconda
  const tabBarHeight = useBottomTabOverflow();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: tabBarHeight + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado con imagen grande */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://picsum.photos/800/400' }}
            style={styles.headerImage}
          />
        </View>

        {/* Contenido con soporte de tema claro/oscuro */}
        <ThemedView
          lightColor="#fff"
          darkColor="#121212"
          style={styles.content}
        >
          {children}
        </ThemedView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: HEADER_HEIGHT,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // sombra ligera en Android/iOS
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
  },
});
