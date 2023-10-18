import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_STORAGE } from './storageConfig';

type StorageAuthTokenProps = {
  token: string;
};

export async function storageAuthTokenSave({
  token,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    AUTH_STORAGE,
    JSON.stringify({
      token,

    })
  );
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_STORAGE);

  const { token }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {};

  return { token};
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE);
}
