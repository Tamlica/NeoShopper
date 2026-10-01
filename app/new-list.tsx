import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NeoBrutalButton } from '@/components/NeoBrutalButton';
import { useStore } from '@/store/useStore';
import { useT } from '@/constants/i18n';
import { border, color, font, radius, shadow, space, text } from '@/constants/theme';

export default function NewListScreen() {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { addList } = useStore();
  const insets = useSafeAreaInsets();
  const t = useT();
  const canCreate = title.trim().length > 0;

  const handleCreate = () => {
    if (!canCreate) return;

    addList({
      id: Date.now().toString(),
      title: title.trim(),
      createdAt: Date.now(),
      items: [],
    });
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.xl }]}>
      <Text style={styles.title}>{t.newList}</Text>

      <View style={styles.form}>
        <Text style={styles.label}>{t.name}</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={handleCreate}
          returnKeyType="done"
          autoFocus
          placeholder={t.listNamePlaceholder}
          placeholderTextColor={color.inkMuted}
          accessibilityLabel={t.listName}
        />

        <View style={styles.buttonContainer}>
          <NeoBrutalButton
            title={t.cancel}
            onPress={() => router.back()}
            variant="secondary"
            style={styles.button}
          />
          <NeoBrutalButton
            title={t.createList}
            onPress={handleCreate}
            disabled={!canCreate}
            style={styles.button}
          />
        </View>
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
  form: {
    backgroundColor: color.surface,
    borderWidth: border.heavy,
    borderColor: color.ink,
    borderRadius: radius.lg,
    padding: space.lg,
    boxShadow: shadow.hard,
  },
  label: {
    fontFamily: font.bold,
    fontSize: text.md,
    color: color.ink,
    marginBottom: space.sm,
  },
  input: {
    backgroundColor: color.paper,
    borderWidth: border.light,
    borderColor: color.ink,
    borderRadius: radius.md,
    padding: space.md,
    fontFamily: font.regular,
    fontSize: text.md,
    color: color.ink,
    marginBottom: space.xl,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: space.md,
  },
  button: { flex: 1 },
});
