import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORED_CREDENTIALS } from "./storageConfig";

type Credentials = {
  email: string;
  password: string;
};

export async function storageCredentialsSave(credentials: Credentials) {
  await AsyncStorage.setItem(STORED_CREDENTIALS, JSON.stringify(credentials));
}

export async function storageCredentialsGet() {
  const response = await AsyncStorage.getItem(STORED_CREDENTIALS);

  const credentials = response ? JSON.parse(response) : null;

  return credentials;
}

export async function storageCredentialsRemove() {
  await AsyncStorage.removeItem(STORED_CREDENTIALS);
}

