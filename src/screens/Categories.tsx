import { useRoute } from "@react-navigation/native";
import { VStack, Text, HStack, Image, ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import EletronicosPNG from "@assets/cards/eletronic.png";
import GlassPNG from "@assets/cards/glass.png";
import MetalPNG from "@assets/cards/metal.png";
import PapelPNG from "@assets/cards/papel.png";
import PlasticPNG from "@assets/cards/plastic.png";
import BatteryPNG from "@assets/cards/baterias.png";

type RouteParams = {
  category: string;
};

const textoReciclagemPlasticos = `
A reciclagem de plásticos desempenha um papel crucial na preservação do meio ambiente e na redução dos impactos negativos dos resíduos plásticos. Plásticos são ubíquos em nossa sociedade, e muitos deles podem ser reciclados de forma eficiente. Aqui estão alguns tipos comuns de plástico que podem ser reciclados:

1. PET (Polietileno Tereftalato): Garrafas de água, refrigerantes e recipientes de produtos de higiene pessoal. Reciclar o PET permite que ele seja transformado em novas garrafas, fibras de roupas e outros produtos.

2. HDPE (Polietileno de Alta Densidade): Frascos de leite, detergentes, sacolas plásticas. A reciclagem de HDPE é comum e pode ser transformado em brinquedos, tubos e recipientes.

3. LDPE (Polietileno de Baixa Densidade): Sacolas plásticas, embalagens de alimentos. Reciclar LDPE pode criar sacolas reutilizáveis, sacos de lixo e até madeira plástica.

4. PP (Polipropileno): Tampas de garrafas, embalagens de alimentos. Pode ser reciclado para criar utensílios de cozinha, caixas organizadoras e mais.

5. PS (Poliestireno): Copos descartáveis, bandejas de isopor. Embora seja mais desafiador de reciclar, alguns locais oferecem esse serviço.

6. Outros Plásticos: Alguns plásticos não se encaixam nas categorias anteriores. Eles podem ser marcados com o número "7" e incluem plásticos mistos. Verifique as diretrizes de reciclagem locais para opções de reciclagem.

Lembre-se de que a reciclagem eficaz requer a separação adequada dos diferentes tipos de plásticos. Consulte o sistema de reciclagem local para orientações específicas sobre como preparar seus itens para reciclagem.
`;

const textoReciclagemPapel = `
  A reciclagem de papel desempenha um papel crucial na preservação do meio ambiente. Ao reciclar papel, podemos economizar árvores e reduzir a poluição. Existem vários tipos de papel que podem ser reciclados, contribuindo para a sustentabilidade do planeta.

  Aqui estão alguns tipos de papel que você pode e deve reciclar:

  1. Papel de jornal: Jornais antigos podem ser coletados e reciclados para produzir papel reciclado de qualidade.

  2. Papel de escritório: Folhas de papel de escritório, rascunhos e documentos não confidenciais são excelentes candidatos para a reciclagem.

  3. Papel de revista: As revistas antigas podem ser recicladas e transformadas em novos produtos de papel.

  4. Caixas de papelão: As caixas de papelão usadas para embalagens são facilmente recicláveis e são amplamente usadas na fabricação de papel reciclado.

  5. Papel de embrulho: Papel de embrulho de presentes pode ser reciclado, desde que não contenha materiais não recicláveis, como purpurina ou plástico.

  6. Papel de envelopes: A maioria dos envelopes de papel pode ser reciclada, desde que você retire os plásticos ou etiquetas adesivas.

  7. Papel de embalagem: Papel usado para embalagens, desde que não esteja contaminado com gordura ou sujeira, pode ser reciclado.

  É importante lembrar de remover qualquer contaminante, como clipes de papel ou grampos, antes de reciclar. Além disso, papel sujo ou contaminado por alimentos geralmente não é adequado para reciclagem.

  Contribuir para a reciclagem de papel é uma forma simples e eficaz de proteger o meio ambiente e reduzir a necessidade de derrubar árvores. Certifique-se de usar as lixeiras de reciclagem apropriadas e promover a conscientização sobre a importância da reciclagem de papel na sua comunidade.
`;

const textoReciclagemVidro = `
O vidro é um material amplamente utilizado na fabricação de embalagens, como garrafas, potes e vidros de conserva. A boa notícia é que o vidro é altamente reciclável, o que significa que pode ser transformado em novos produtos de vidro sem perder qualidade. Reciclar vidro é uma maneira eficaz de reduzir o impacto ambiental e economizar recursos naturais.

Mas o que você deve reciclar quando se trata de vidro? Aqui estão alguns itens de vidro que você pode e deve reciclar:

1. Garrafas de vidro: Garrafas de bebidas, como garrafas de vinho, cerveja, sucos e refrigerantes, podem ser recicladas. Lave-as bem para remover resíduos antes de descartá-las no recipiente de reciclagem de vidro.

2. Potes de vidro: Frascos de conservas, potes de geleia e outros recipientes de vidro são recicláveis. Lave-os para remover rótulos e resíduos de comida.

3. Vidros quebrados: Se você tiver vidro quebrado, embale-o com segurança em um recipiente resistente, como caixa de papelão, e marque como "vidro quebrado" para evitar ferimentos dos coletores de reciclagem.

4. Vidros de janelas e espelhos: Vidros planos, como vidros de janelas e espelhos, geralmente não são aceitos na reciclagem residencial. Eles podem ser perigosos para os coletores e para o processo de reciclagem, então, evite incluí-los no seu recipiente de reciclagem.

Lembre-se de verificar as diretrizes de reciclagem do seu município, pois os tipos de vidro aceitos e os métodos de coleta podem variar. Reciclar vidro ajuda a reduzir a demanda por matérias-primas e economiza energia, tornando-o uma escolha ambientalmente responsável.

Certifique-se de separar o vidro dos outros materiais recicláveis, como papel, plástico e metal, para facilitar o processo de reciclagem. Ao fazer sua parte para reciclar vidro, você está contribuindo para um ambiente mais limpo e sustentável.
`;

const textoReciclagemMetal = `
Reciclar metais é uma prática fundamental para a preservação do meio ambiente e a conservação de recursos naturais. Os metais são recursos finitos, e a mineração e produção de novos metais consomem uma quantidade significativa de energia e emitem poluentes. Portanto, reciclar metais é uma maneira eficaz de reduzir a extração de minérios e os impactos ambientais associados.

Dentre os metais mais comuns que podem ser reciclados, destacam-se o alumínio, o aço e o cobre. Cada um desses metais tem seu próprio processo de reciclagem.

1. Alumínio: O alumínio é amplamente utilizado em latas de bebidas, embalagens e objetos diversos. Reciclar alumínio economiza 95% da energia necessária para produzir o metal a partir de minérios. Para reciclar alumínio, basta coletar latas e objetos de alumínio e levá-los a um centro de reciclagem.

2. Aço: O aço é um dos metais mais reciclados no mundo. Itens como latas de alimentos, carros antigos e estruturas metálicas podem ser reciclados. O processo de reciclagem de aço envolve a fusão do metal em altas temperaturas e sua moldagem em novos produtos.

3. Cobre: O cobre é utilizado em fios elétricos, tubulações e diversos equipamentos. Reciclar cobre reduz a necessidade de mineração e é benéfico para a conservação de recursos. O cobre pode ser reciclado de forma eficaz em centros de reciclagem.

A reciclagem de metais não apenas preserva recursos naturais, mas também reduz a emissão de poluentes e a pegada de carbono. Além disso, ela pode gerar empregos na indústria de reciclagem e economizar energia. Portanto, é importante incentivar a prática da reciclagem de metais.
`;

const textoReciclagemEletronicos = `
Reciclar eletrônicos é fundamental para preservar o meio ambiente e reduzir os impactos negativos causados por resíduos eletrônicos. Os dispositivos eletrônicos, como smartphones, laptops, tablets e outros aparelhos, contêm materiais valiosos, mas também substâncias tóxicas que podem ser prejudiciais se não forem descartados adequadamente.

Na reciclagem de eletrônicos, muitos componentes podem ser recuperados e reutilizados. Isso inclui metais preciosos como ouro, prata e platina, que estão presentes em pequenas quantidades em muitos dispositivos. Além disso, plásticos, vidro e outros materiais podem ser reciclados e transformados em novos produtos, reduzindo a necessidade de extrair recursos naturais.

No entanto, o principal desafio na reciclagem de eletrônicos é garantir que os componentes tóxicos, como mercúrio, chumbo e substâncias químicas nocivas, sejam tratados de forma apropriada para evitar a contaminação ambiental. É por isso que é crucial encaminhar seus eletrônicos antigos a instalações de reciclagem especializadas, onde profissionais qualificados podem desmontar, separar e processar os materiais de forma segura.
`;

const textoReciclagemPilhas = `
Reciclagem de Pilhas:

Pilhas são fontes comuns de energia em muitos dispositivos eletrônicos que usamos diariamente, como controles remotos, relógios, brinquedos e muitos outros aparelhos. No entanto, é crucial entender como reciclar pilhas corretamente, pois elas contêm materiais tóxicos que podem prejudicar o meio ambiente se forem descartadas de maneira inadequada.

Aqui estão algumas diretrizes sobre o que você deve fazer ao reciclar pilhas:

1. **Separe as pilhas:** Classifique as pilhas de acordo com o tipo. Existem dois tipos principais de pilhas: pilhas alcalinas e pilhas recarregáveis. Certifique-se de separá-las, pois cada tipo requer um processo de reciclagem diferente.

2. **Pilhas alcalinas:** As pilhas alcalinas comuns, como as pilhas AA, AAA, C e D, podem ser recicladas em muitos centros de reciclagem ou locais de coleta específicos para pilhas. Evite jogá-las no lixo comum.

3. **Pilhas recarregáveis:** As pilhas recarregáveis, como as baterias de íon de lítio, são mais sustentáveis. Elas podem ser recarregadas e usadas várias vezes antes de precisarem ser descartadas. Quando chegar a hora de descartá-las, leve-as a um centro de reciclagem de eletrônicos ou a um ponto de coleta designado.

4. **Evite pilhas no lixo comum:** Pilhas contêm substâncias químicas perigosas, como mercúrio, chumbo e cádmio. O descarte inadequado dessas pilhas no lixo comum pode contaminar o solo e a água. Portanto, sempre evite jogá-las no lixo comum.

5. **Verifique as regulamentações locais:** As regulamentações de reciclagem de pilhas podem variar de acordo com a região. Certifique-se de estar ciente das políticas locais e procure locais de coleta de pilhas ou centros de reciclagem apropriados em sua área.

Reciclar pilhas é uma etapa importante para proteger o meio ambiente e prevenir a contaminação por substâncias químicas prejudiciais. Portanto, sempre faça a sua parte e recicle suas pilhas de maneira responsável.

Lembre-se de verificar as informações locais sobre reciclagem de pilhas para garantir que você esteja seguindo as práticas corretas em sua região.
`;

export function Categories() {
  const route = useRoute();
  const { category } = route.params as RouteParams;

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {category === "Plastico" && (
          <VStack px={5}>
            <VStack p={5} bg="white" rounded="lg" shadow={5}>
              <HStack>
                <HStack>
                  <VStack mr={2}>
                    <Image source={PlasticPNG} size={20} alt="Plastico" />
                  </VStack>
                  <VStack>
                    <Text bold fontSize={"xl"}>
                      Plásticos
                    </Text>
                    <Text>Informações</Text>
                  </VStack>
                </HStack>
              </HStack>
            </VStack>

            <VStack p={5} bg="white" rounded="lg" shadow={5} mt={5}>
              <VStack>
                <Text bold> O que reciclar?</Text>
              </VStack>
              <VStack>
                <Text>{textoReciclagemPlasticos}</Text>
              </VStack>
            </VStack>
          </VStack>
        )}

        {category === "Papel" && (
          <VStack px={5}>
            <VStack p={5} bg="white" rounded="lg" shadow={5}>
              <HStack>
                <HStack>
                  <VStack mr={2}>
                    <Image source={PapelPNG} size={20} alt="Plastico" />
                  </VStack>
                  <VStack>
                    <Text bold fontSize={"xl"}>
                      Papel
                    </Text>
                    <Text>Informações</Text>
                  </VStack>
                </HStack>
              </HStack>
            </VStack>

            <VStack p={5} bg="white" rounded="lg" shadow={5} mt={5}>
              <VStack>
                <Text bold> O que reciclar?</Text>
              </VStack>
              <VStack>
                <Text>{textoReciclagemPapel}</Text>
              </VStack>
            </VStack>
          </VStack>
        )}

        {category === "Vidro" && (
          <VStack px={5}>
            <VStack p={5} bg="white" rounded="lg" shadow={5}>
              <HStack>
                <HStack>
                  <VStack mr={2}>
                    <Image source={GlassPNG} size={20} alt="Plastico" />
                  </VStack>
                  <VStack>
                    <Text bold fontSize={"xl"}>
                      Vidro
                    </Text>
                    <Text>Informações</Text>
                  </VStack>
                </HStack>
              </HStack>
            </VStack>

            <VStack p={5} bg="white" rounded="lg" shadow={5} mt={5}>
              <VStack>
                <Text bold> O que reciclar?</Text>
              </VStack>
              <VStack>
                <Text>{textoReciclagemVidro}</Text>
              </VStack>
            </VStack>
          </VStack>
        )}

        {category === "Metal" && (
          <VStack px={5}>
            <VStack p={5} bg="white" rounded="lg" shadow={5}>
              <HStack>
                <HStack>
                  <VStack mr={2}>
                    <Image source={MetalPNG} size={20} alt="Plastico" />
                  </VStack>
                  <VStack>
                    <Text bold fontSize={"xl"}>
                      Metal
                    </Text>
                    <Text>Informações</Text>
                  </VStack>
                </HStack>
              </HStack>
            </VStack>

            <VStack p={5} bg="white" rounded="lg" shadow={5} mt={5}>
              <VStack>
                <Text bold> O que reciclar?</Text>
              </VStack>
              <VStack>
                <Text>{textoReciclagemMetal}</Text>
              </VStack>
            </VStack>
          </VStack>
        )}

        {category === "Eletronicos" && (
          <VStack px={5}>
            <VStack p={5} bg="white" rounded="lg" shadow={5}>
              <HStack>
                <HStack>
                  <VStack mr={2}>
                    <Image source={EletronicosPNG} size={20} alt="Plastico" />
                  </VStack>
                  <VStack>
                    <Text bold fontSize={"xl"}>
                      Eletrônicos
                    </Text>
                    <Text>Informações</Text>
                  </VStack>
                </HStack>
              </HStack>
            </VStack>

            <VStack p={5} bg="white" rounded="lg" shadow={5} mt={5}>
              <VStack>
                <Text bold> O que reciclar?</Text>
              </VStack>
              <VStack>
                <Text>{textoReciclagemEletronicos}</Text>
              </VStack>
            </VStack>
          </VStack>
        )}

        {category === "Pilhas" && (
          <VStack px={5}>
            <VStack p={5} bg="white" rounded="lg" shadow={5}>
              <HStack>
                <HStack>
                  <VStack mr={2}>
                    <Image source={BatteryPNG} size={20} alt="Plastico" />
                  </VStack>
                  <VStack>
                    <Text bold fontSize={"xl"}>
                      Pilhas
                    </Text>
                    <Text>Informações</Text>
                  </VStack>
                </HStack>
              </HStack>
            </VStack>

            <VStack p={5} bg="white" rounded="lg" shadow={5} mt={5}>
              <VStack>
                <Text bold> O que reciclar?</Text>
              </VStack>
              <VStack>
                <Text>{textoReciclagemPilhas}</Text>
              </VStack>
            </VStack>
          </VStack>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
