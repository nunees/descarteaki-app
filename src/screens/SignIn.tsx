import {
  Heading,
  VStack,
  Text,
  Input,
  Center,
  Button,
  useToast,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppError } from "@errors/AppError";
import { useAuth } from "@hooks/useAuth";

type SignInFormData = {
  username: string;
  password: string;
};

export function SignIn() {
  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");

  const { signIn } = useAuth();

  const toast = useToast();

  async function handleSubmit({ username, password }: SignInFormData) {
    try {
      await signIn(username, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Erro ao realizar o login, tente novamente.";
      toast.show({
        title: message,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <SafeAreaView>
      <Center mt={200}>
        <Heading fontSize={"4xl"}>
          descarte.
          <Heading color="#FFC727" fontSize={"4xl"}>
            aki
          </Heading>
        </Heading>
        <Text bold color="gray.400">
          Faca login para continuar
        </Text>
      </Center>

      <VStack px={5}>
        <VStack p={5}>
          <VStack mt={3}>
            <Input
              placeholder="Nome de usuário"
              mb={5}
              borderRadius={10}
              height={60}
              backgroundColor={"white"}
              _focus={{
                borderColor: "#FFC727",
                backgroundColor: "white",
              }}
              fontSize={"md"}
              value={username}
              onChangeText={setUsername}
            />
            <Input
              placeholder="Senha"
              mb={5}
              borderRadius={10}
              height={60}
              backgroundColor={"white"}
              _focus={{
                borderColor: "#FFC727",
                backgroundColor: "white",
              }}
              secureTextEntry
              fontSize={"md"}
              value={password}
              onChangeText={setPassword}
            />
          </VStack>
          <VStack>
            <Button
              mb={5}
              borderRadius={10}
              backgroundColor={"#FFC727"}
              height={70}
              _pressed={{
                opacity: 0.5,
              }}
              onPress={() => handleSubmit({ username, password })}
            >
              <Text bold fontSize={"md"}>
                Acessar
              </Text>
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
