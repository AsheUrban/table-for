import * as SecureStore from 'expo-secure-store';

const CHUNK_SIZE = 2048;

export const secureStorage = {
  async getItem(key: string): Promise<string | null> {
    const chunkCount = await SecureStore.getItemAsync(`${key}-chunks`);

    if (chunkCount === null) {
      return SecureStore.getItemAsync(key);
    }

    const count = parseInt(chunkCount, 10);
    const chunks: string[] = [];

    for (let i = 0; i < count; i++) {
      const chunk = await SecureStore.getItemAsync(`${key}-${i}`);
      if (chunk === null) return null;
      chunks.push(chunk);
    }

    return chunks.join('');
  },

  async setItem(key: string, value: string): Promise<void> {
    await secureStorage.removeItem(key);

    if (value.length <= CHUNK_SIZE) {
      await SecureStore.setItemAsync(key, value);
      return;
    }

    const chunks: string[] = [];
    for (let i = 0; i < value.length; i += CHUNK_SIZE) {
      chunks.push(value.slice(i, i + CHUNK_SIZE));
    }

    await SecureStore.setItemAsync(`${key}-chunks`, chunks.length.toString());

    for (let i = 0; i < chunks.length; i++) {
      await SecureStore.setItemAsync(`${key}-${i}`, chunks[i]);
    }
  },

  async removeItem(key: string): Promise<void> {
    const chunkCount = await SecureStore.getItemAsync(`${key}-chunks`);
  
    if (chunkCount !== null) {
      const count = parseInt(chunkCount, 10);
      for (let i = 0; i < count; i++) {
        await SecureStore.deleteItemAsync(`${key}-${i}`);
      }
      await SecureStore.deleteItemAsync(`${key}-chunks`);
    }
    
    await SecureStore.deleteItemAsync(key);
  },
};
    