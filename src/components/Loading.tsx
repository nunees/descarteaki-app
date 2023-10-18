import { Center, Spinner, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export function Loading() {
  return (
    <SafeAreaView>
      <Center justifyContent={"center"} alignContent={"center"} mt={200}>
        <VStack mb={500}>
          <Spinner size={80} color="green.500" />
          <Text color="black" bold>
            Carregando dados, por favor aguarde ...
          </Text>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}
