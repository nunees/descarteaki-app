import { IUserDTO } from "@dtos/IUserDTO";
import { AppError } from "@errors/AppError";
import axios from "axios";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import { createContext, ReactNode, useEffect, useState } from "react";
import { storagePointsRemove } from "@storage/storatePoints";

export type AuthContextDataProps = {
  user: IUserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  updateUserAuth: (userUpdated: IUserDTO) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<IUserDTO>({} as IUserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function userAndTokenUpdate(userData: IUserDTO, token: string) {
    try {
      setUser(userData);
    } catch (error) {
      throw new AppError("Erro ao atualizar dados do usuário");
    }
  }

  async function storageUserAndTokenSave(userData: IUserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserSave(userData);
      await storageAuthTokenSave({ token });

      setIsLoadingUserStorageData(false);
    } catch (error) {
      throw new AppError("Erro ao salvar dados do usuário");
    }
  }

  async function signIn(username: string, password: string) {
    try {
      const { data } = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      if (data) {
        const { token } = data;
        const { id, email, firstName, gender, image, lastName, username } =
          data;
        await storageUserAndTokenSave(
          { id, email, firstName, gender, image, lastName, username },
          token
        );
        userAndTokenUpdate(
          { id, email, firstName, gender, image, lastName, username },
          token
        );
      }
    } catch (error) {
      throw new AppError("Erro ao autenticar usuário");
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as IUserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
      await storagePointsRemove();
    } catch (error) {
      throw new AppError("Erro ao deslogar usuário");
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserAuth(userUpdated: IUserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw new AppError("Erro ao atualizar dados do usuário");
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }

      setIsLoadingUserStorageData(false);
    } catch (error) {
      throw new AppError("Erro ao carregar dados do usuário");
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        updateUserAuth,
        signOut,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
