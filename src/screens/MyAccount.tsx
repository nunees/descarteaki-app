import { useAuth } from "@hooks/useAuth";
import { VStack, Text, Avatar, Center, Button, Input } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@routes/app.routes";

import { Alert } from "react-native";

export function MyAccoount() {
  const { user, signOut } = useAuth();

  const navigation = useNavigation<AppRoutesProps>();

  async function handleDeleteAccount() {
    Alert.alert(
      "Tem certeza que deseja deletar sua conta?",
      "Ao deletar sua conta, você perderá todos os seus dados e não poderá mais acessar o aplicativo.",
      [
        {
          text: "Apagar minha conta",
          onPress: async () => {
            await signOut();
          },
        },

        {
          text: "Voltar",
          onPress: () => {},
        },
      ]
    );
  }

  return (
    <SafeAreaView>
      <Center>
        <Text bold fontSize={"xl"}>
          descarte<Text color="#FFC727">.aki</Text>
        </Text>
      </Center>

      <Center mt={10}>
        <Avatar size="2xl" source={{ uri: user.image }} />
      </Center>

      <VStack px={10} py={5}>
        <VStack mb={3}>
          <Text fontSize="xs" bold color="gray.600">
            Nome
          </Text>
          <Input value={user.firstName} />
        </VStack>

        <VStack mb={3}>
          <Text fontSize="xs" bold color="gray.600">
            Sobrenome
          </Text>
          <Input value={user.lastName} />
        </VStack>

        <VStack mb={3}>
          <Text fontSize="xs" bold color="gray.600">
            E-mail
          </Text>
          <Input value={user.email} />
        </VStack>

        <VStack mb={3}>
          <Text fontSize="xs" bold color="gray.600">
            Username
          </Text>
          <Input value={user.username} />
        </VStack>

        <VStack mb={3}>
          <Text fontSize="xs" bold color="gray.600">
            Gênero
          </Text>
          <Input value={user.gender === "female" ? "Mulher" : "Homem"} />
        </VStack>

        <VStack mt={10}>
          <Button backgroundColor="#FFC727" onPress={handleDeleteAccount}>
            <Text bold>Apagar minha conta</Text>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
