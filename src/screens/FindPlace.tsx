import { Pressable, useToast } from "native-base";
import { Map } from "@components/Map";
import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { LocationObject } from "expo-location";
// @ts-ignore
import { GOOGLE_MAPS_APIKEY } from "@env";
import { ILocationDTO } from "@dtos/ILocationDTO";
import { ILocationDetailsDTO } from "@dtos/ILocaitonDetailsDTO";
import { AppError } from "@errors/AppError";
import { PointsCreateProps, storagePointsSave } from "@storage/storatePoints";
import { useAuth } from "@hooks/useAuth";

type RouteParamsProps = {
  coords: LocationObject;
  keyword: string;
};

// Search within a 4km radius
const radius = 4 * 1000;

export function FindPlace() {
  const [recyclingLocations, setRecyclingLocations] = useState<ILocationDTO[]>(
    {} as ILocationDTO[]
  );

  const route = useRoute();
  const { user } = useAuth();

  const toast = useToast();

  const { coords, keyword } = route.params as RouteParamsProps;

  async function getReward() {
    try {
      let totalReward = 0;

      try {
        if (keyword === "descarte de pilhas") {
          totalReward = 600;
        }

        if (keyword === "descarte de eletrônicos") {
          totalReward = 500;
        }

        if (keyword === "descarte de vidros") {
          totalReward = 10;
        }

        if (
          keyword === "descarte de embalagens" ||
          keyword === "descarte de plasticos" ||
          keyword === "descarte demetais"
        ) {
          totalReward = 50;
        }

        if (totalReward > 0) {
          const point: PointsCreateProps = {
            date: new Date(),
            received: totalReward,
            typeOfTrash: keyword,
            user_id: user.id,
            description: "Recompensa de descarte",
          };

          await storagePointsSave(point);
          toast.show({
            title: `Você recebeu ${totalReward + 5} pontos`,
            placement: "top",
            bgColor: "success.500",
          });
        } else {
          totalReward += 5;

          const point: PointsCreateProps = {
            date: new Date(),
            received: totalReward,
            typeOfTrash: "explorar",
            user_id: user.id,
            description: "Recompensa de exploração",
          };

          await storagePointsSave(point);
        }
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

  useEffect(() => {
    async function fetchRecyclingLocations() {
      try {
        const search_url =
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=` +
          `${coords.coords?.latitude}%2C${coords.coords?.longitude}&radius=${radius}&keyword=${keyword}&key=${GOOGLE_MAPS_APIKEY}`;
        const result = await axios.get(search_url);
        setRecyclingLocations(result.data.results);
      } catch (error) {
        throw new AppError("Erro ao buscar locais de reciclagem");
      }
    }

    fetchRecyclingLocations();
  }, []);

  useEffect(() => {
    getReward();
  }, [keyword]);

  return (
    <>
      <Map coords={coords} locations={recyclingLocations} />
    </>
  );
}
