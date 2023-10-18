import {
  VStack,
  Text,
  Center,
  HStack,
  Spinner,
  ScrollView,
  Button,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import CoinsSVG from "@assets/Coins.svg";
import { useCallback, useEffect, useState } from "react";
import { PointsCreateProps, storagePointsGet } from "@storage/storatePoints";
import { AppError } from "@errors/AppError";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { AppRoutesProps } from "@routes/app.routes";

export function MyPoints() {
  const [isLoading, setIsLoading] = useState(false);
  const [userRewards, setUserRewards] = useState<PointsCreateProps[]>(
    {} as PointsCreateProps[]
  );

  const navigation = useNavigation<AppRoutesProps>();

  useFocusEffect(
    useCallback(() => {
      async function getAllPoints() {
        try {
          setIsLoading(true);
          const data = await storagePointsGet();
          setUserRewards(data);
        } catch (error) {
          throw new AppError("Erro ao buscar pontos");
        } finally {
          setIsLoading(false);
        }
      }

      getAllPoints();
    }, [])
  );
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <VStack>
          <CoinsSVG width={400} height={200} />
        </VStack>

        <Center mb={3}>
          <Text fontSize={"md"} bold>
            Meus Pontos
          </Text>
        </Center>

        {isLoading && (
          <Center>
            <Spinner color="green.400" size={50} />
          </Center>
        )}

        <VStack px={5} mb={2}>
          <Button
            onPress={() => navigation.navigate("claimProduct")}
            backgroundColor={"#FFC727"}
            height={50}
          >
            <Text bold>Resgatar produtos</Text>
          </Button>
        </VStack>

        <FlatList
          data={userRewards}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <VStack px={5} mb={2}>
              <VStack p={5} bg="white" rounded="lg" shadow={1}>
                <HStack justifyContent={"space-between"}>
                  <HStack>
                    <VStack>
                      <Text bold>{item.description}</Text>
                      <Text color="gray.600">{item.typeOfTrash}</Text>
                      <Text fontSize={"xs"} color="gray.400">
                        {item.date
                          .toString()
                          .split("T")[0]
                          .split("/")
                          .reverse()
                          .join("/")}
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Text fontSize={"lg"} color="green.400">
                      +{item.received}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </VStack>
          )}
          keyExtractor={(item) => item.date.toString()}
          ListEmptyComponent={() => (
            <VStack px={5}>
              <VStack p={5} bg="white" rounded="lg" shadow={1}>
                <Text>Nao existem recompensas</Text>
              </VStack>
            </VStack>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
