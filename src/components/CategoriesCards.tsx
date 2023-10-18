import { Icon, VStack, Text, FlatList, Image } from "native-base";
import { Feather } from "@expo/vector-icons";

import PlasticPNG from "@assets/cards/plastic.png";
import BateryPNG from "@assets/cards/baterias.png";
import EletronicPNG from "@assets/cards/eletronic.png";
import ConstructionPNG from "@assets/cards/entulho.png";
import GlassPNG from "@assets/cards/glass.png";
import MetalPNG from "@assets/cards/metal.png";
import PaperPNG from "@assets/cards/papel.png";
import { Touchable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@routes/app.routes";

const data = [
  { title: "Plastico", icon: PlasticPNG },
  { title: "Papel", icon: PaperPNG },
  { title: "Metal", icon: MetalPNG },
  { title: "Vidro", icon: GlassPNG },
  { title: "Eletronicos", icon: EletronicPNG },
  { title: "Pilhas", icon: BateryPNG },
];

export function CategoriesCards() {
  const navigation = useNavigation<AppRoutesProps>();

  return (
    <VStack ml={5}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("categories", { category: item.title })
            }
          >
            <VStack
              w={140}
              h={150}
              mr={5}
              p={5}
              borderWidth={1}
              borderRadius={10}
              borderColor={"gray.300"}
              backgroundColor={"white"}
            >
              <VStack justifyContent={"center"} alignItems={"center"}>
                <Image source={item.icon} alt={item.title} size={20} />
                <Text color={"gray.600"} pt={3}>
                  {item.title}
                </Text>
              </VStack>
            </VStack>
          </TouchableOpacity>
        )}
      />
    </VStack>
  );
}
