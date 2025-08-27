import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useState } from 'react';

export default function FormularioRegistro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');

  return (
    <ScrollView style={{ backgroundColor: '#f9f8ff' }}>
      <View style={styles.container}>

        
        <Text style={styles.titulo}>Registro</Text>

        {/* Campo: Nombre */}

        <Text style={[styles.label, { fontWeight: 'bold' }]}>Nombre</Text>
        <TextInput
          mode="outlined"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />

        {/* Campo: Correo */}
        <Text style={[styles.label, { fontWeight: 'bold' }]}>Correo electrónico</Text>
        <TextInput
          mode="outlined"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
        />

        {/* Campo: Contraseña */}
        <Text style={[styles.label, { fontWeight: 'bold' }]}>Contraseña</Text>
        <TextInput
          mode="outlined"
          secureTextEntry
          value={clave}
          onChangeText={setClave}
          style={styles.input}
        />

        {/* Campo: Confirmar contraseña */}
        <Text style={[styles.label, { fontWeight: 'bold' }]}>Confirmar contraseña</Text>
        <TextInput
          mode="outlined"
          secureTextEntry
          value={confirmarClave}
          onChangeText={setConfirmarClave}
          style={styles.input}
        />

        {/* Botón: Registrarse */}
        <Button
          mode="contained"
          style={styles.boton}
          onPress={() => {}}
        >
          Registrarse
        </Button>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    marginBottom: 20,
  },
  boton: {
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 5,
  },
});