import {
  Apple,
  Beef,
  Carrot,
  Coffee,
  Container,
  Shirt,
  Smartphone,
  Croissant,
  Milk,
  ShowerHead as Shower,
  SprayCan as Spray,
  CupSoda as Soda,
  Laptop,
  Tablets,
  PocketKnife,
  Cookie
} from 'lucide-react-native';
import { color as palette } from '@/constants/theme';

const iconMap = {
  Apple,
  Beef,
  Carrot,
  Coffee,
  Container,
  Shirt,
  Smartphone,
  Croissant,
  Milk,
  Shower,
  Spray,
  Soda,
  Laptop,
  Tablets,
  PocketKnife,
  Cookie
};

// Single source for the picker, so it can never offer an icon that renders blank.
export const iconNames = Object.keys(iconMap);

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export function CategoryIcon({ name, size = 20, color = palette.ink }: Props) {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} />;
}
