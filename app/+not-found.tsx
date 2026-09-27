import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { NeoBrutalButton } from '@/components/NeoBrutalButton';
import { color, font, space, text } from '@/constants/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Nothing here.</Text>
        <Text style={styles.body}>This screen doesn’t exist.</Text>
        <NeoBrutalButton title="Back to lists" onPress={() => router.replace('/')} style={styles.button} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: space.lg,
    backgroundColor: color.paper,
  },
  title: { fontFamily: font.bold, fontSize: text.display, color: color.ink },
  body: {
    fontFamily: font.regular,
    fontSize: text.md,
    color: color.inkMuted,
    marginTop: space.sm,
  },
  button: { alignSelf: 'flex-start', marginTop: space.xl },
});
