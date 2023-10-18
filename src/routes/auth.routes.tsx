import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignIn } from "@screens/SignIn";

type AuthRotes = {
  SignIn: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRotes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRotes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
