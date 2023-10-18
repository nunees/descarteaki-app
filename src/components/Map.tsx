import UserPinPNG from "@assets/user-pin.png";
import RecycleBinPNG from "@assets/recycle-bin.png";
import React, { useState, useRef } from "react";
import { View, StyleSheet, Linking } from "react-native";
import {
  HStack,
  Heading,
  Image,
  VStack,
  Text,
  Icon,
  FlatList,
  useToast,
  ScrollView,
  Pressable,
} from "native-base";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import { CustomMapStyle } from "@theme/CustomMapStyle";
import { ILocationDTO } from "@dtos/ILocationDTO";

// @ts-ignore
import { GOOGLE_MAPS_APIKEY } from "@env";
import { ILocationDetailsDTO } from "@dtos/ILocaitonDetailsDTO";
import axios from "axios";
import { useMapsLinking } from "@hooks/useMapsLinking";
import { PointsCreateProps, storagePointsSave } from "@storage/storatePoints";
import { AppError } from "@errors/AppError";
import { useAuth } from "@hooks/useAuth";

type Props = {
  coords: Location.LocationObject;
  locations: ILocationDTO[];
};

export function Map({ coords, locations }: Props) {
  const [showPanel, setShowPanel] = useState(false);
  const [location, setLocation] = useState<ILocationDTO>({} as ILocationDTO);
  const [locationDetail, setLocationDetail] = useState<ILocationDetailsDTO>(
    {} as ILocationDetailsDTO
  );

  const toast = useToast();

  const mapRef = useRef<MapView>(null);

  const { user } = useAuth();

  const { deviceMapNavigation } = useMapsLinking();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "100%",
    },
  });

  async function handleMarkerPress(location: ILocationDTO) {
    setLocation(location);
    fetchLocationDetails(location.place_id);
    setShowPanel(true);
    await getReward();
  }

  const fetchLocationDetails = async (place_id: string) => {
    try {
      const search_url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_MAPS_APIKEY}&language=pt_BR`;
      const result = await axios.get(search_url);
      setLocationDetail(result.data.result);
    } catch (error) {
      toast.show({
        title: "Erro ao obter dados do local",
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  async function getReward() {
    try {
      let totalReward = 0;

      try {
        totalReward += 5;

        const point: PointsCreateProps = {
          date: new Date(),
          received: totalReward,
          typeOfTrash: "explorar",
          user_id: user.id,
          description: "Recompensa de exploração",
        };

        await storagePointsSave(point);
      } catch (error) {
        throw new AppError("Erro ao salvar pontos");
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Ocorreu um erro ao salvar sua recompensa";
      toast.show({
        title: message,
        placement: "top",
        bgColor: "danger.500",
      });
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={CustomMapStyle}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: coords.coords?.latitude,
          longitude: coords.coords?.longitude,
          latitudeDelta: 0.28,
          longitudeDelta: 0.005,
        }}
        onPress={() => setShowPanel(false)}
      >
        <Marker
          coordinate={{
            latitude: coords.coords?.latitude,
            longitude: coords.coords?.longitude,
          }}
          title="Você esta aqui"
          description="Sua localização atual"
          identifier="userLocation"
        >
          <Image source={UserPinPNG} alt="Pin" size={5} />
        </Marker>

        {locations.length > 0 &&
          locations?.map((location) => (
            <Marker
              coordinate={{
                latitude: location.geometry.location.lat,
                longitude: location.geometry.location.lng,
              }}
              key={location.place_id}
              title={location.name}
              description={location.vicinity}
              identifier={location.name}
              onPress={() => handleMarkerPress(location)}
            >
              <Image source={RecycleBinPNG} alt="Pin" size={5} />
            </Marker>
          ))}
      </MapView>
      {showPanel && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 400,
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          <VStack position={"absolute"} top={-40} right={5}>
            <Pressable
              width={70}
              height={70}
              backgroundColor={"white"}
              borderRadius={50}
              borderWidth={1}
              borderColor={"gray.200"}
              justifyContent={"center"}
              onPress={() =>
                Linking.openURL(
                  deviceMapNavigation(
                    String(location.geometry.location.lat),
                    String(location.geometry.location.lng),
                    location.name
                  )
                )
              }
            >
              <Icon
                as={FontAwesome5}
                name={"directions"}
                size="4xl"
                alignSelf={"center"}
                color={"blue.500"}
              />
            </Pressable>
          </VStack>
          <ScrollView>
            <HStack justifyContent={"space-between"}>
              <HStack alignItems={"baseline"}>
                <HStack width={280}>
                  <VStack>
                    <Text fontSize={"sm"} bold mr={2}>
                      {location.name}
                    </Text>
                    <HStack py={1}>
                      {Array.from({ length: location.rating }).map(
                        (_, index) => (
                          <Icon
                            as={FontAwesome}
                            name={"star"}
                            size="sm"
                            color="yellow.400"
                            key={index}
                          />
                        )
                      )}
                      <Text color="gray.400" fontSize={"xs"} ml={2}>
                        ({location.user_ratings_total} avaliações )
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </HStack>
              {/* <Badge
                ml={2}
                variant={"solid"}
                borderRadius={10}
                colorScheme={
                  location.opening_hours.open_now ? "success" : "danger"
                }
              >
                <Text color="white" bold>
                  {location.opening_hours.open_now ? "Aberto" : "Fechado"}
                </Text>
              </Badge> */}
            </HStack>
            <VStack py={1}>
              <Text color="gray.400">{location.vicinity}</Text>
            </VStack>
            {/** Display location photos */}
            <VStack>
              <Heading size={"sm"} py={2}>
                Fotos
              </Heading>
              <HStack>
                <FlatList
                  data={locationDetail.photos}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Image
                      source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${GOOGLE_MAPS_APIKEY}`,
                      }}
                      alt={location.name}
                      size={100}
                      mr={2}
                    />
                  )}
                  ListEmptyComponent={() => (
                    <Text color={"gray.400"}>Nao existem fotos do local</Text>
                  )}
                />
              </HStack>
            </VStack>

            <VStack py={5}>
              <FlatList
                data={locationDetail.reviews}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                decelerationRate={0}
                snapToInterval={400}
                renderItem={({ item }) => (
                  <VStack py={2} width={"400"}>
                    <HStack alignItems={"center"}>
                      <Image
                        source={{
                          uri: item.profile_photo_url,
                        }}
                        alt={item.author_name}
                        size={10}
                        mr={2}
                      />
                      <VStack>
                        <Text bold>{item.author_name}</Text>
                        <HStack>
                          {Array.from({ length: item.rating }).map(
                            (_, index) => (
                              <Icon
                                as={FontAwesome}
                                name={"star"}
                                size="xs"
                                color="yellow.400"
                                key={index}
                              />
                            )
                          )}
                          <Text color="gray.400" fontSize={"xs"} ml={2}>
                            {item.relative_time_description}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text color="gray.400" fontSize={"sm"} py={2} width={320}>
                      {item.text}
                    </Text>
                  </VStack>
                )}
              />
            </VStack>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
