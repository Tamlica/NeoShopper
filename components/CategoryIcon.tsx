import { Apple, Beef, Carrot, Coffee, Package as Container, Cookie, Croissant, MilkOff as Milk, ShowerHead as Shower, SprayCan as Spray } from 'lucide-react-native';

const iconMap = {
  Apple,
  Beef,
  Carrot,
  Coffee,
  Container,
  Cookie,
  Croissant,
  Milk,
  Shower,
  Spray,
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