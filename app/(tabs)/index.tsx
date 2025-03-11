import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/useStore';
import { NeoBrutalButton } from '@/components/NeoBrutalButton';
import { ProgressBar } from '@/components/ProgressBar';
import { Plus, ShoppingCart } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ListsScreen() {
  const { lists } = useStore();
  const router = useRouter();

  const getListProgress = (listId: string) => {
    const list = lists.find((l) => l.id === listId);
    if (!list || list.items.length === 0) return 0;
    const completedItems = list.items.filter((item) => item.completed).length;
    return (completedItems / list.items.length) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Lists</Text>
        <NeoBrutalButton
          onPress={() => router.push('/new-list')}
          title="New List"
          style={styles.newButton}
          color="#FF6B6B"
        />
      </View>

      <ScrollView style={styles.listContainer}>
        {lists.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.iconContainer}>
              <ShoppingCart size={48} color="#000000" />
            </View>
            <Text style={styles.emptyText}>Create your first shopping list!</Text>
            <NeoBrutalButton
              onPress={() => router.push('/new-list')}
              title="Create List"
              style={{ marginTop: 16 }}
              color="#4ECDC4"
            />
          </View>
        ) : (
          lists.map((list) => {
            const progress = getListProgress(list.id);
            return (
              <TouchableOpacity
                key={list.id}
                style={styles.listItem}
                onPress={() => router.push(`/list/${list.id}`)}>
                <Text style={styles.listTitle}>{list.title}</Text>
                <Text style={styles.listDate}>
                  {new Date(list.createdAt).toLocaleDateString()}
                </Text>
                <View style={styles.progressContainer}>
                  <ProgressBar progress={progress} />
                  <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                </View>
                <View style={styles.itemCountBadge}>
                  <Text style={styles.itemCount}>
                    {list.items.length} items
                  </Text>
                </View>
              </TouchableOpacity>
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
    backgroundColor: '#DFE5F2',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 32,
    color: '#000000',
  },
  newButton: {
    paddingHorizontal: 16,
  },
  listContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  iconContainer: {
    backgroundColor: '#FFE66D',
    padding: 24,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  emptyText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 18,
    color: '#666666',
    marginTop: 16,
  },
  listItem: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  listTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 8,
  },
  listDate: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: '#000000',
    minWidth: 48,
  },
  itemCountBadge: {
    position: 'absolute',
    right: -3,
    top: -3,
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#000000',
  },
  itemCount: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: '#000000',
  },
});