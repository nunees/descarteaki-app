import { IProductsDTO } from "@dtos/IProductsDTO";
import { AppError } from "@errors/AppError";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppRoutesProps } from "@routes/app.routes";
import {
  PointsCreateProps,
  storagePointsGet,
  storagePointsRemove,
  storagePointsSave,
} from "@storage/storatePoints";
import axios from "axios";
import {
  Center,
  HStack,
  Text,
  VStack,
  Image,
  FlatList,
  ScrollView,
  Button,
  useToast,
  Input,
} from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type RootParamsProps = {
  productId: number;
};

export function ProductClaimed() {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<IProductsDTO>({} as IProductsDTO);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [tempCep, setTempCep] = useState<string>("");
  const [cep, setCep] = useState<string>("");

  const [logradouro, setLogradouro] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [localidade, setLocalidade] = useState<string>("");
  const [uf, setUf] = useState<string>("");
  const [numero, setNumero] = useState<string>("");

  const route = useRoute();
  const { productId } = route.params as RootParamsProps;

  const navigation = useNavigation<AppRoutesProps>();

  const toast = useToast();

  async function getCep() {
    try {
      setIsLoading(true);
      const data = await axios.get(`https://viacep.com.br/ws/${tempCep}/json/`);
      if (data.data.erro) throw new AppError("CEP não encontrado");
      setCep(data.data.cep);
      setLocalidade(data.data.localidade);
      setBairro(data.data.bairro);
      setLogradouro(data.data.logradouro);
      setUf(data.data.uf);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Erro ao buscar CEP";
      toast.show({
        title: message,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function _getProductDetails() {
      try {
        const data = await axios.get(
          `https://dummyjson.com/product/${productId}`
        );
        setProduct(data.data);
        if (product.price > 50) {
          setProductPrice(product.price * 10000);
        } else {
          setProductPrice(product.price);
        }
      } catch (error) {
        throw new AppError("Erro ao buscar detalhes do produto");
      }
    }

    _getProductDetails();
  }, [productId]);

  useEffect(() => {
    async function getAllPoints() {
      try {
        const data = await storagePointsGet();
        const totalPoints = data.reduce(
          (acc: number, item: PointsCreateProps) => {
            return acc + item.received;
          },
          0
        );

        setPoints(totalPoints);
      } catch (error) {
        throw new AppError("Erro ao buscar pontos");
      }
    }

    getAllPoints();
  }, []);

  async function resetUserPoints() {
    try {
      await storagePointsRemove();

      console.log("Pontos: ", points);
      console.log("Product", productPrice);

      const pricePaid =
        product.price > 50 ? product.price * 10000 : product.price;

      await storagePointsSave({
        date: new Date(),
        description: "Resgate de produto",
        received: Number(points - pricePaid),
        typeOfTrash: product.title,
        user_id: 1,
      });

      navigation.navigate("purchaseDone", {
        productId,
        purchase: {
          nome,
          sobrenome,
          cpf,
          cep,
          numero,
        },
      });
    } catch (error) {
      throw new AppError("Erro ao buscar pontos");
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Center>
          <Text bold fontSize={"xl"}>
            descarte<Text color="#FFC727">.aki</Text>
          </Text>
        </Center>

        <Center mt={30}>
          <Text bold>Detalhes do resgate</Text>
        </Center>

        <VStack px={5} py={3}>
          <VStack backgroundColor={"#FFC727"} borderRadius={10} p={5}>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <Text>Meus Pontos: </Text>
              <Text bold>{points}</Text>
            </HStack>
          </VStack>
        </VStack>

        <VStack px={5} py={5}>
          <VStack backgroundColor={"white"} borderRadius={10} p={5}>
            <Image
              source={{ uri: product.thumbnail }}
              alt={product.title}
              width={400}
              height={100}
            />
            <HStack justifyContent={"space-between"}>
              <HStack>
                <VStack>
                  <Text bold pt={1}>
                    {product.title}
                  </Text>
                  <Text fontSize={20} bold>
                    {productPrice}
                  </Text>
                </VStack>
              </HStack>
              <Text bold color={"gray.400"}>
                Disponíveis: {product.stock}
              </Text>
            </HStack>
          </VStack>
        </VStack>

        <VStack px={5}>
          <VStack backgroundColor={"white"} borderRadius={10} p={5}>
            <Text>{product.description}</Text>
          </VStack>
        </VStack>

        <VStack px={5} py={5}>
          <VStack backgroundColor={"white"} borderRadius={10} p={5}>
            <Text bold pb={5}>
              Imagens
            </Text>
            <HStack>
              <FlatList
                data={product.images}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                horizontal
                decelerationRate={"fast"}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item }}
                    alt={product.title}
                    w={500}
                    height={264}
                  />
                )}
              />
            </HStack>
          </VStack>
        </VStack>

        <VStack px={5} py={5}>
          <VStack backgroundColor={"white"} borderRadius={10} p={5}>
            <Text bold>Dados de entrega</Text>
            <VStack mt={2}>
              <Input
                placeholder="Nome"
                borderRadius={10}
                mb={2}
                _focus={{
                  borderColor: "#FFC727",
                  backgroundColor: "#ffffff",
                  borderWidth: 2,
                }}
                value={nome}
                onChangeText={setNome}
              />
              <Input
                placeholder="Sobrenome"
                borderRadius={10}
                mb={2}
                _focus={{
                  borderColor: "#FFC727",
                  backgroundColor: "#ffffff",
                  borderWidth: 2,
                }}
                value={sobrenome}
                onChangeText={setSobrenome}
              />
              <Input
                placeholder="CPF"
                borderRadius={10}
                mb={2}
                keyboardType="numeric"
                value={cpf}
                onChangeText={setCpf}
                _focus={{
                  borderColor: "#FFC727",
                  backgroundColor: "#ffffff",
                  borderWidth: 2,
                }}
              />
              <HStack mb={3}>
                <Input
                  placeholder="CEP"
                  borderRadius={10}
                  width={150}
                  keyboardType="numeric"
                  value={tempCep}
                  onChangeText={(text) => setTempCep(text)}
                  _focus={{
                    borderColor: "#FFC727",
                    backgroundColor: "#ffffff",
                    borderWidth: 2,
                  }}
                />
                <Button
                  backgroundColor={"#FFC727"}
                  height={50}
                  ml={5}
                  borderRadius={10}
                  onPress={() => getCep()}
                  isLoading={isLoading}
                >
                  <Text bold>Procurar</Text>
                </Button>
              </HStack>

              {cep !== "" && (
                <VStack>
                  <Input
                    placeholder="Logradouro"
                    borderRadius={10}
                    mb={2}
                    value={logradouro}
                    isDisabled
                  />

                  <Input
                    placeholder="Número"
                    borderRadius={10}
                    mb={2}
                    value={numero}
                    onChangeText={(text) => setNumero(text)}
                    _focus={{
                      borderColor: "#FFC727",
                      backgroundColor: "#ffffff",
                      borderWidth: 2,
                    }}
                  />

                  <Input
                    placeholder="Bairro"
                    borderRadius={10}
                    mb={2}
                    value={bairro}
                    isDisabled
                  />

                  <Input
                    placeholder="Localidade"
                    borderRadius={10}
                    mb={2}
                    value={localidade}
                    isDisabled
                  />

                  <Input
                    placeholder="UF"
                    borderRadius={10}
                    mb={2}
                    value={uf}
                    isDisabled
                  />
                </VStack>
              )}
            </VStack>
          </VStack>
        </VStack>

        <VStack px={5} py={5}>
          <Button
            backgroundColor={"#FFC727"}
            opacity={points > product.price ? 1 : 0.5}
            height={50}
            disabled={points > product.price ? false : true}
            onPress={() => resetUserPoints()}
          >
            <Text bold>
              {points < product.price ? "Pontos insuficientes" : "Comprar"}
            </Text>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
