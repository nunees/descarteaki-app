import { useAuth } from "@hooks/useAuth";
import {
  VStack,
  Text,
  Avatar,
  Center,
  Pressable,
  HStack,
  Icon,
  Button,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@routes/app.routes";

export function Profile() {
  const { user, signOut } = useAuth();

  const navigation = useNavigation<AppRoutesProps>();

  return (
    <SafeAreaView>
      <Center>
        <Text bold fontSize={"xl"}>
          descarte<Text color="#FFC727">.aki</Text>
        </Text>
      </Center>
      <VStack>
        <Center mt={10}>
          <Avatar size="2xl" source={{ uri: user.image }} />
          <Text fontSize="md" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Text>
          <Text color="gray.400">@{user.username}</Text>
          <Button mt={5} onPress={signOut} backgroundColor="#FFC727">
            <Text bold>Sair do aplicativo</Text>
          </Button>

          <Pressable
            p={3}
            mt={5}
            onPress={() => navigation.navigate("myAccouunt")}
          >
            <HStack p={2}>
              <VStack>
                <Icon
                  as={FontAwesome5}
                  name="user-alt"
                  size="md"
                  color="#FFC727"
                />
              </VStack>
              <VStack ml={5}>
                <Text fontSize="sm" bold color="gray.600">
                  Minha conta
                </Text>
              </VStack>
            </HStack>
          </Pressable>

          <Pressable
            borderBottomColor="gray.600"
            onPress={() => navigation.navigate("aboutSoftware")}
          >
            <HStack p={2}>
              <VStack>
                <Icon
                  as={FontAwesome5}
                  name="info-circle"
                  size="md"
                  color="#FFC727"
                />
              </VStack>
              <VStack ml={5}>
                <Text fontSize="sm" color="gray.600" bold>
                  Sobre a aplicação
                </Text>
              </VStack>
            </HStack>
          </Pressable>
          <VStack mt={300}>
            <Center>
              <Text fontSize="xs" color="gray.400" bold>
                Versão 1.0.0
              </Text>
              <Text fontSize={"xs"} color="gray.400">
                2023 - Todos os direitos reservados
              </Text>
            </Center>
          </VStack>
        </Center>
      </VStack>
    </SafeAreaView>
  );
}
