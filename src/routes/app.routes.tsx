import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { AbooutSoftware } from "@screens/AboutSoftware";
import { Categories } from "@screens/Categories";
import { ClaimProduct } from "@screens/ClaimProduct";
import { EarnPoints } from "@screens/EarnPoints";
import { FindPlace } from "@screens/FindPlace";
import { Home } from "@screens/Home";
import { MyAccoount } from "@screens/MyAccount";
import { MyPoints } from "@screens/MyPoints";
import { Payment } from "@screens/Payment";
import { ProductClaimed } from "@screens/ProductClaimed";
import { Profile } from "@screens/Profile";
import { PurchaseDone } from "@screens/PurchaseDone";
import { LocationObject } from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

type AppRoutes = {
  home: undefined;
  findPlace: { coords: LocationObject; keyword: string };
  profile: undefined;
  myAccouunt: undefined;
  aboutSoftware: undefined;
  categories: { category: string };
  earnPoints: undefined;
  myPoints: undefined;
  payment: undefined;
  claimProduct: undefined;
  productClaimed: { productId: number };
  purchaseDone: {
    productId: number;
    purchase: {
      nome: string;
      sobrenome: string;
      cpf: string;
      cep: string;
      numero: string;
    };
  };
};

export type AppRoutesProps = StackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="findPlace" component={FindPlace} />
      <Screen name="profile" component={Profile} />
      <Screen name="myAccouunt" component={MyAccoount} />
      <Screen name="aboutSoftware" component={AbooutSoftware} />
      <Screen name="categories" component={Categories} />
      <Screen name="earnPoints" component={EarnPoints} />
      <Screen name="myPoints" component={MyPoints} />
      <Screen name="payment" component={Payment} />
      <Screen name="claimProduct" component={ClaimProduct} />
      <Screen name="productClaimed" component={ProductClaimed} />
      <Screen name="purchaseDone" component={PurchaseDone} />
    </Navigator>
  );
}
