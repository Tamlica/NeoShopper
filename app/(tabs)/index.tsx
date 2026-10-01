import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '@/store/useStore';
import { NeoBrutalButton } from '@/components/NeoBrutalButton';
import { ProgressBar } from '@/components/ProgressBar';
import { useRouter } from 'expo-router';
import { useT } from '@/constants/i18n';
import { border, color, font, radius, shadow, space, tabular, text } from '@/constants/theme';

export default function ListsScreen() {
  const { lists } = useStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useT();

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.xl }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.shoppingLists}</Text>
        <NeoBrutalButton onPress={() => router.push('/new-list')} title={t.newList} />
      </View>

      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
        {lists.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t.noLists}</Text>
            <Text style={styles.emptyText}>{t.noListsHint}</Text>
          </View>
        ) : (
          lists.map((list) => {
            const total = list.items.length;
            const done = list.items.filter((item) => item.completed).length;
            const progress = total === 0 ? 0 : (done / total) * 100;
            return (
              <Pressable
                key={list.id}
                accessibilityRole="button"
                accessibilityLabel={t.listSummary(list.title, done, total)}
                style={({ pressed }) => [styles.card, pressed ? styles.cardPressed : styles.cardRaised]}
                onPress={() => router.push(`/list/${list.id}`)}>
                <View style={styles.cardTop}>
                  <Text style={styles.listTitle} numberOfLines={2}>{list.title}</Text>
                  <Text style={styles.count}>{total === 0 ? t.empty : `${done}/${total}`}</Text>
                </View>
                <ProgressBar progress={progress} />
                <Text style={styles.listDate}>
                  {new Date(list.createdAt).toLocaleDateString(t.locale)}
                </Text>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.paper,
    paddingHorizontal: space.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: space.md,
    marginBottom: space.xl,
  },
  title: {
    flexShrink: 1,
    fontFamily: font.bold,
    fontSize: text.display,
    color: color.ink,
  },
  listContainer: { flex: 1 },
  listContent: { paddingBottom: space.xxl, paddingRight: space.xs },
  emptyState: { marginTop: space.xxl, gap: space.sm },
  emptyTitle: { fontFamily: font.bold, fontSize: text.lg, color: color.ink },
  emptyText: {
    fontFamily: font.regular,
    fontSize: text.md,
    lineHeight: 24,
    color: color.inkMuted,
  },
  card: {
    backgroundColor: color.surface,
    borderWidth: border.heavy,
    borderColor: color.ink,
    borderRadius: radius.lg,
    padding: space.lg,
    marginBottom: space.lg,
    gap: space.md,
  },
  cardRaised: { boxShadow: shadow.hard },
  cardPressed: { transform: [{ translateX: 4 }, { translateY: 4 }] },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: space.md,
  },
  listTitle: {
    flex: 1,
    fontFamily: font.bold,
    fontSize: text.lg,
    color: color.ink,
  },
  count: {
    fontFamily: font.bold,
    fontSize: text.lg,
    color: color.ink,
    ...tabular,
  },
  listDate: {
    fontFamily: font.regular,
    fontSize: text.sm,
    color: color.inkMuted,
    ...tabular,
  },
});
