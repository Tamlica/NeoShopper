import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NeoBrutalButton } from './NeoBrutalButton';
import { useStore } from '@/store/useStore';
import { languageNames, Lang } from '@/constants/i18n';
import { border, color, font, radius, shadow, space, text } from '@/constants/theme';

// Shown once, before anything else, until a language is chosen.
// Bilingual on purpose: we don't know which one the reader speaks yet.
export function LanguagePicker() {
  const setLanguage = useStore((s) => s.setLanguage);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.xl }]}>
      <Text style={styles.title}>NeoShopper</Text>
      <View style={styles.panel}>
        <Text style={styles.heading}>Pilih bahasa</Text>
        <Text style={styles.subheading}>Choose your language</Text>
        {(Object.keys(languageNames) as Lang[]).map((lang) => (
          <NeoBrutalButton
            key={lang}
            title={languageNames[lang]}
            onPress={() => setLanguage(lang)}
            variant={lang === 'id' ? 'primary' : 'secondary'}
            style={styles.button}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.paper,
    paddingHorizontal: space.lg,
  },
  title: {
    fontFamily: font.bold,
    fontSize: text.display,
    color: color.ink,
    marginBottom: space.xl,
  },
  panel: {
    backgroundColor: color.surface,
    borderWidth: border.heavy,
    borderColor: color.ink,
    borderRadius: radius.lg,
    padding: space.lg,
    boxShadow: shadow.hard,
  },
  heading: { fontFamily: font.bold, fontSize: text.lg, color: color.ink },
  subheading: {
    fontFamily: font.regular,
    fontSize: text.md,
    color: color.inkMuted,
    marginBottom: space.lg,
  },
  button: { marginTop: space.md },
});
