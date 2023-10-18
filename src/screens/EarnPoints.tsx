import { VStack, Text, HStack, Image, ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import WastSVG from "@assets/waste.svg";
import BateriasPNG from "@assets/cards/baterias.png";
import EletronicosPNG from "@assets/cards/eletronic.png";
import GlassPNG from "@assets/cards/glass.png";
import MetalPNG from "@assets/cards/metal.png";
import PapelPNG from "@assets/cards/papel.png";
import PlasticPNG from "@assets/cards/plastic.png";

export function EarnPoints() {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <VStack>
          <WastSVG width={400} height={200} />
        </VStack>
        <VStack px={5} py={3}>
          <VStack p={5} bg="white" rounded="lg" shadow={5}>
            <Text fontSize="md" fontWeight="bold">
              Ganhe pontos
            </Text>
            <Text fontSize="xs" color="gray.500">
              Você pode ganhar pontos descartando corretamente e encontrando
              locais próximos a você para descarte, aqui todo mundo ganha!
            </Text>
          </VStack>
        </VStack>

        <VStack px={5} py={1}>
          <VStack p={5} bg="white" rounded="lg" shadow={5}>
            <HStack>
              <HStack>
                <VStack mr={2}>
                  <Image source={BateriasPNG} size={10} alt="Pilhas" />
                </VStack>
              </HStack>
              <HStack>
                <VStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignContent={"baseline"}
                  >
                    <Text bold>Pilhas</Text>
                    <Text color="gray.400" fontSize={"md"}>
                      +600
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    Descarte corretamente pilhas e baterias usadas
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          </VStack>
        </VStack>

        <VStack px={5} py={1}>
          <VStack p={5} bg="white" rounded="lg" shadow={5}>
            <HStack>
              <HStack>
                <VStack mr={2}>
                  <Image source={EletronicosPNG} size={10} alt="Pilhas" />
                </VStack>
              </HStack>
              <HStack>
                <VStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignContent={"baseline"}
                  >
                    <Text bold>Eletrônicos</Text>
                    <Text color="gray.400" fontSize={"md"}>
                      +500
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    Descarte corretamente eletroeletrônicos velhos
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          </VStack>
        </VStack>

        <VStack px={5} py={1}>
          <VStack p={5} bg="white" rounded="lg" shadow={5}>
            <HStack>
              <HStack>
                <VStack mr={2}>
                  <Image source={GlassPNG} size={10} alt="Pilhas" />
                </VStack>
              </HStack>
              <HStack>
                <VStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignContent={"baseline"}
                  >
                    <Text bold>Vidros</Text>
                    <Text color="gray.400" fontSize={"md"}>
                      +100
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    Descarte corretamente copos, garrafas e demais
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          </VStack>
        </VStack>

        <VStack px={5} py={1}>
          <VStack p={5} bg="white" rounded="lg" shadow={5}>
            <HStack>
              <HStack>
                <VStack mr={2}>
                  <Image source={MetalPNG} size={10} alt="Pilhas" />
                </VStack>
              </HStack>
              <HStack>
                <VStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignContent={"baseline"}
                  >
                    <Text bold>Metais</Text>
                    <Text color="gray.400" fontSize={"md"}>
                      +50
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    Descarte corretamente latas, barras e demais {"    "}
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          </VStack>
        </VStack>

        <VStack px={5} py={1}>
          <VStack p={5} bg="white" rounded="lg" shadow={5}>
            <HStack>
              <HStack>
                <VStack mr={2}>
                  <Image source={PapelPNG} size={10} alt="Pilhas" />
                </VStack>
              </HStack>
              <HStack>
                <VStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignContent={"baseline"}
                  >
                    <Text bold>Papeis</Text>
                    <Text color="gray.400" fontSize={"md"}>
                      +50
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    Descarte corretamente papeis e papelões {"          "}
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          </VStack>
        </VStack>

        <VStack px={5} py={1}>
          <VStack p={5} bg="white" rounded="lg" shadow={5}>
            <HStack>
              <HStack>
                <VStack mr={2}>
                  <Image source={PlasticPNG} size={10} alt="Pilhas" />
                </VStack>
              </HStack>
              <HStack>
                <VStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignContent={"baseline"}
                  >
                    <Text bold>Plasticos</Text>
                    <Text color="gray.400" fontSize={"md"}>
                      +50
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    Descarte corretamente garrafas e sacolas {"           "}
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
