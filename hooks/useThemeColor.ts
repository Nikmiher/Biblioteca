import { useColorScheme } from './useColorScheme';

type ColorName = 'text' | 'background';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  const defaultColors: Record<'light' | 'dark', Record<ColorName, string>> = {
    light: {
      text: '#000',
      background: '#fff',
    },
    dark: {
      text: '#fff',
      background: '#000',
    },
  };

  return defaultColors[theme][colorName];
}
