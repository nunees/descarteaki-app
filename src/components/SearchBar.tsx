import { FlatList, Icon, Input, VStack, Text, HStack } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "@routes/app.routes";
import { LocationObject } from "expo-location";

const queryStrings = [
  "pilhas",
  "eletrônicos",
  "eletronicos",
  "baterias",
  "lampada",
  "lâmpadas",
  "óleo de cozinha",
  "oleo de cozinha",
  "vidros",
  "vidro",
  "embalagens",
  "plasticos",
  "plásticos",
  "metais",
  "metal",
  "ferros",
  "ferro",
  "aluminio",
  "alumínio",
  "aluminios",
  "alumínios",
  "latas",
  "lata",
  "lixo",
  "lixo eletrônico",
  "lixo eletronico",
  "pilha",
  "papel",
  "papeis",
  "papelão",
  "papelao",
  "papelões",
  "papeloes",
  "garrafas",
  "garrafa",
  "garrafas pet",
  "celular",
  "celulares",
  "computador",
  "computadores",
  "entulho",
  "entulhos",
  "entulhos de construção",
  "entulho de construção",
];

type SearchBarProps = {
  coords: LocationObject;
};

export function SearchBar({ coords }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>(queryStrings);

  const navigation = useNavigation<AppRoutesProps>();

  function handleSearch(query: string) {
    setQuery(query);

    if (query.length >= 1) {
      const filteredQuery = queryStrings.filter((item) =>
        item.includes(query.toLowerCase())
      );

      setSuggestions(filteredQuery);
    } else {
      setSuggestions([]);
    }
  }

  return (
    <VStack>
      <Input
        h={60}
        borderRadius={10}
        mb={1}
        placeholder="O que você quer descartar?"
        rightElement={
          query.length > 0 ? (
            <Icon
              as={Feather}
              name="x"
              size="md"
              m={2}
              color="muted.400"
              onPress={() => setQuery("")}
            />
          ) : (
            <Icon
              as={Feather}
              name="search"
              size="md"
              m={2}
              color="muted.400"
            />
          )
        }
        _focus={{
          borderColor: "#FFC727",
          borderWidth: 2,
        }}
        fontSize={"sm"}
        value={query}
        onChangeText={handleSearch}
        backgroundColor={"white"}
      />
      {query.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "white",
                //borderRadius: 10,
                marginVertical: 1,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
              }}
              onPress={() =>
                navigation.navigate("findPlace", {
                  coords,
                  keyword: String(`descarte de ${item}`),
                })
              }
            >
              <Text color="gray.400">
                Quero descartar{" "}
                <Text bold color="gray.900">
                  {item}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </VStack>
  );
}
