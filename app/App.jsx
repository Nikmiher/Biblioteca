import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from './constants/tema';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
