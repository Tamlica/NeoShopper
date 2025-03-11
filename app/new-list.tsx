import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { NeoBrutalButton } from '@/components/NeoBrutalButton';
import { useStore } from '@/store/useStore';

export default function NewListScreen() {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { addList } = useStore();

  const handleCreate = () => {
    if (!title.trim()) return;

    const newList = {
      id: Date.now().toString(),
      title: title.trim(),
      createdAt: Date.now(),
      items: [],
    };

    addList(newList);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New List</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>List Name</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter list name..."
          placeholderTextColor="#666666"
        />

        <View style={styles.buttonContainer}>
          <NeoBrutalButton
            title="Cancel"
            onPress={() => router.back()}
            variant="secondary"
            style={styles.button}
          />
          <NeoBrutalButton
            title="Create List"
            onPress={handleCreate}
            color="#FF6B6B"
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
    backgroundColor: '#DFE5F2',
    padding: 16,
  },
  header: {
    marginTop: 48,
    marginBottom: 32,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 32,
    color: '#000000',
  },
  form: {
    backgroundColor: '#88AAEE',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  label: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F7F9FC',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    color: '#000000',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
});