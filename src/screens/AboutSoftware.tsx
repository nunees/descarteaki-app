import { VStack, Text, ScrollView, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export function AbooutSoftware() {
  return (
    <SafeAreaView>
      <Center mt={20}>
        <Text bold fontSize={"xl"}>
          descarte<Text color="#FFC727">.aki</Text>
        </Text>
      </Center>

      <VStack px={5} py={2}>
        <VStack p={5} bg="white" rounded="lg" shadow={5}>
          <Text
            fontSize="md"
            bold
            alignSelf={"center"}
            borderBottomWidth={1}
            borderColor={"#FFC727"}
          >
            Sobre o Software
          </Text>
          <Text fontSize="sm" pt={3}>
            descarte.aki
          </Text>
          <Text fontSize="sm">Versão 1.0.0</Text>
        </VStack>
      </VStack>

      <VStack px={5} p={2}>
        <VStack p={5} bg="white" rounded="lg" shadow={5}>
          <Text
            fontSize="md"
            bold
            alignSelf={"center"}
            borderBottomWidth={1}
            borderColor={"#FFC727"}
          >
            Desenvolvido por
          </Text>
          <Text fontSize="sm" pt={3}>
            Felipe Nunes da Silva
          </Text>
          <Text fontSize="sm">Bruno Massone</Text>
          <Text fontSize="sm">Felipe Oliveira P. Mauricio</Text>
        </VStack>
      </VStack>

      <VStack px={5} p={2}>
        <VStack p={5} bg="white" rounded="lg" shadow={5}>
          <Text
            fontSize="md"
            bold
            alignSelf={"center"}
            borderBottomWidth={1}
            borderColor={"#FFC727"}
          >
            Open Source Libraries
          </Text>
          <Text fontSize="sm" pt={3}>
            React Native
          </Text>
          <Text fontSize="sm">Android</Text>
          <Text fontSize="sm">Expo Framework</Text>
        </VStack>
      </VStack>

      <VStack px={5} p={2}>
        <VStack p={5} bg="white" rounded="lg" shadow={5}>
          <Text
            fontSize="md"
            bold
            alignSelf={"center"}
            borderBottomWidth={1}
            borderColor={"#FFC727"}
          >
            APIs Utilizadas
          </Text>
          <Text fontSize="sm" pt={3}>
            Google Maps API
          </Text>
          <Text fontSize="sm">Google Places API</Text>
          <Text fontSize="sm">Dummy JSON</Text>
          <Text fontSize="sm">ViaCEP API</Text>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
