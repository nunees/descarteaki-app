import AsyncStorage from '@react-native-async-storage/async-storage';

import { POINTS_STORAGE } from './storageConfig';
import { AppError } from '@errors/AppError';

export type PointsCreateProps = {
  user_id: number;
  date: Date;
  typeOfTrash: string;
  received: number;
  description: string;
}


export async function storagePointsSave(points: PointsCreateProps):Promise<void> {
  try{
    const storedPoints = await storagePointsGet();
    const storage = JSON.stringify([...storedPoints, points]);
    await AsyncStorage.setItem(POINTS_STORAGE, storage);
  }catch(error){
    throw Error("Erro ao salvar seus pontos")
  }
}

export async function storagePointsGet(){
  try{
    const storage = await AsyncStorage.getItem(POINTS_STORAGE);

  const coins = storage ? JSON.parse(storage) : [];

  return coins;
  }catch(error){
    throw Error("Erro ao buscar seus pontos")
  }
}

export async function storagePointsRemove() {
  try{
    await AsyncStorage.removeItem(POINTS_STORAGE);
  }catch(error){
    throw Error("Erro ao remover seus pontos")
  }
}

