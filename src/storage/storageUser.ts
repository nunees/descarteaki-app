
import AsyncStorage from '@react-native-async-storage/async-storage';

import { USER_STORAGE } from './storageConfig';
import { IUserDTO } from '@dtos/IUserDTO';

// User auth
export async function storageUserSave(user: IUserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const response = await AsyncStorage.getItem(USER_STORAGE);
  const user: IUserDTO = response ? JSON.parse(response) : {};
  return user;
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE);
}

