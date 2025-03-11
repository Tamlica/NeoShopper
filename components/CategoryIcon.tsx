import {
  Apple,
  Beef,
  Carrot,
  Coffee,
  Shirt,
  Smartphone,
  Croissant,
  MilkOff as Milk,
  ShowerHead as Shower,
  SprayCan as Spray,
  CupSoda as Soda,
  Laptop,
  Tablets,
  PocketKnife,
} from 'lucide-react-native';

const iconMap = {
  Apple,
  Beef,
  Carrot,
  Coffee,
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
};

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export function CategoryIcon({ name, size = 20, color = '#000000' }: Props) {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} />;
}
