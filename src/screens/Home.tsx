import {
  VStack,
  Text,
  Center,
  HStack,
  Heading,
  ScrollView,
  Avatar,
  Pressable,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@components/SearchBar";

import BannerSVG from "@assets/header.svg";

import { CategoriesCards } from "@components/CategoriesCards";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import { useAuth } from "@hooks/useAuth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppRoutesProps } from "@routes/app.routes";
import { AppError } from "@errors/AppError";
import { PointsCreateProps, storagePointsGet } from "@storage/storatePoints";

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [location, setLocation] = useState<Location.LocationObject>(
    {} as Location.LocationObject
  );

  const { user } = useAuth();

  const navigation = useNavigation<AppRoutesProps>();

  useFocusEffect(
    useCallback(() => {
      async function getUserPosition() {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();

          if (status !== "granted") {
            throw new AppError("Permission to access location was denied");
          }

          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });

          if (!location) {
            setLocation({
              coords: {
                latitude: -23.6402503,
                longitude: 46.5967451,
                accuracy: 0,
                altitude: 0,
                heading: 0,
                speed: 0,
                altitudeAccuracy: 0,
              },
              timestamp: 0,
            });
          }

          setLocation(location);
        } catch (error) {
          throw new AppError("Erro ao buscar localização");
        }
      }

      getUserPosition();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      async function getAllPoints() {
        try {
          setIsLoading(true);
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
        } finally {
          setIsLoading(false);
        }
      }

      getAllPoints();
    }, [location])
  );

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <Center>
          <Text bold fontSize={"xl"}>
            descarte<Text color="#FFC727">.aki</Text>
          </Text>
        </Center>

        <VStack px={5} py={3}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <VStack>
                <Text fontSize={"md"} bold>
                  Ola, {user.firstName}
                </Text>
                <Text>
                  {user.gender === "female"
                    ? "Bem-vinda de volta"
                    : "Bem-vindo de volta"}
                </Text>
              </VStack>
            </HStack>

            <HStack>
              <TouchableOpacity onPress={() => navigation.navigate("profile")}>
                <Avatar
                  size="md"
                  source={{ uri: user.image }}
                  borderColor={"#FFC727"}
                  borderWidth={2}
                />
              </TouchableOpacity>
            </HStack>
          </HStack>
        </VStack>

        <Pressable
          px={5}
          py={3}
          onPress={() => navigation.navigate("myPoints")}
        >
          <VStack
            w={"100%"}
            borderRadius={10}
            backgroundColor="white"
            shadow={1}
          >
            <VStack p={3}>
              <HStack>
                <Text bold>Meus Pontos</Text>
              </HStack>
              <Text fontSize={"6xl"}>{userPoints}</Text>
            </VStack>
          </VStack>
        </Pressable>

        <VStack px={5} py={3}>
          <VStack shadow={1}>
            <SearchBar coords={location} />
          </VStack>
        </VStack>

        <Pressable px={5} onPress={() => navigation.navigate("earnPoints")}>
          <VStack
            w={"100%"}
            borderRadius={10}
            backgroundColor="white"
            shadow={1}
          >
            <VStack p={5} w={"100%"} ml={5}>
              <Heading fontSize="xl" bold>
                Ganhe pontos
              </Heading>
              <Text fontSize="md">descartando corretamente</Text>
            </VStack>
            <BannerSVG width={380} height={300} />
          </VStack>
        </Pressable>

        <VStack>
          <HStack
            justifyContent={"space-between"}
            alignItems={"baseline"}
            px={5}
            py={3}
          >
            <Text fontSize="xl" bold>
              Categorias
            </Text>
          </HStack>
          <CategoriesCards />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
