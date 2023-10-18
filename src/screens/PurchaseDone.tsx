import { VStack, Text, Center, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import SuccessSVG from "@assets/success.svg";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@routes/app.routes";

export function PurchaseDone() {
  const navigation = useNavigation<AppRoutesProps>();

  return (
    <SafeAreaView>
      <Center>
        <Text bold fontSize={"xl"}>
          descarte<Text color="#FFC727">.aki</Text>
        </Text>
      </Center>

      <Center mt={10}>
        <Text bold fontSize={"xl"}>
          Compra efetuada com sucesso!
        </Text>
      </Center>

      <VStack width={400} height={300}>
        <SuccessSVG />
      </VStack>

      <VStack px={5} py={2}>
        <Text pb={5}>Você receberá suas compras no endereço informado</Text>

        <Button
          backgroundColor={"#FFC727"}
          onPress={() => navigation.navigate("home")}
          height={50}
        >
          <Text bold>Voltar</Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
