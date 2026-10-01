import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { NeoBrutalButton } from '@/components/NeoBrutalButton';
import { useT } from '@/constants/i18n';
import { color, font, space, text } from '@/constants/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  const t = useT();
  return (
    <>
      <Stack.Screen options={{ title: t.notFound }} />
      <View style={styles.container}>
        <Text style={styles.title}>{t.nothingHere}</Text>
        <Text style={styles.body}>{t.screenMissing}</Text>
        <NeoBrutalButton title={t.backToLists} onPress={() => router.replace('/')} style={styles.button} />
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
