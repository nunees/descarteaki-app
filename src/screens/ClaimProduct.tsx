import { IProductsDTO } from "@dtos/IProductsDTO";
import { AppError } from "@errors/AppError";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PointsCreateProps, storagePointsGet } from "@storage/storatePoints";
import axios from "axios";
import { VStack, Text, Center, HStack, Image, Pressable } from "native-base";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TouchableOpacity } from "react-native";
import { AppRoutesProps } from "@routes/app.routes";

export function ClaimProduct() {
  const [userPoints, setUserPoints] = useState<number>(0);
  const [products, setProducts] = useState<IProductsDTO[]>(
    {} as IProductsDTO[]
  );

  const navigation = useNavigation<AppRoutesProps>();

  useFocusEffect(
    useCallback(() => {
      async function getAllProducts() {
        try {
          const data = await axios.get("https://dummyjson.com/products");
          setProducts(data.data.products);
        } catch (error) {
          throw new AppError("Erro ao buscar pontos");
        }
      }

      getAllProducts();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      async function getAllPoints() {
        try {
          const data = await storagePointsGet();
          const totalPoints = data.reduce(
            (acc: number, item: PointsCreateProps) => {
              return acc + item.received;
            },
            0
          );

          setUserPoints(totalPoints);
        } catch (error) {
          throw new AppError("Erro ao buscar pontos");
        }
      }

      getAllPoints();
    }, [])
  );

  return (
    <SafeAreaView>
      <Center>
        <Text bold fontSize={"xl"}>
          descarte<Text color="#FFC727">.aki</Text>
        </Text>
      </Center>

      <VStack px={5} py={5}>
        <VStack background={"#FFC727"} p={5} borderRadius={10}>
          <HStack justifyContent={"space-between"} alignItems={"baseline"}>
            <Text bold>Meus Pontos</Text>
            <Text fontSize={20}>{userPoints}</Text>
          </HStack>
        </VStack>
      </VStack>

      <FlatList
        data={products}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
            }}
            onPress={() =>
              navigation.navigate("productClaimed", { productId: item.id })
            }
          >
            <VStack p={5} bg="white" rounded="lg">
              <Image
                source={{ uri: item.thumbnail }}
                alt={item.title}
                width={400}
                height={100}
              />
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <VStack>
                    <Text bold pt={1}>
                      {item.title}
                    </Text>
                    <Text fontSize={20} bold>
                      {item.price > 50 ? item.price * 10000 : item.price}
                    </Text>
                  </VStack>
                </HStack>
                <Text bold color={"gray.400"}>
                  Disponíveis: {item.stock}
                </Text>
              </HStack>
            </VStack>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
}
