import { Tabs } from 'expo-router';
import { ListChecks, Settings } from 'lucide-react-native';
import { TabBar } from '@/components/TabBar';
import { useT } from '@/constants/i18n';

export default function TabLayout() {
  const t = useT();
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabLists,
          tabBarIcon: ({ size, color }) => <ListChecks size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.tabSettings,
          tabBarIcon: ({ size, color }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
