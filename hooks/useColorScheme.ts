import { useColorScheme as _useColorScheme } from 'react-native';

// Si necesitas tipado estricto
export type ColorScheme = 'light' | 'dark';

export function useColorScheme(): ColorScheme {
  return _useColorScheme() === 'dark' ? 'dark' : 'light';
}
