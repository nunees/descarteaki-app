import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { Box } from "native-base";
import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  return (
    <Box flex={1}>
      {isLoadingUserStorageData && <Loading />}
      <NavigationContainer>
        {!user?.id && <AuthRoutes />}
        {user?.id && <AppRoutes />}
      </NavigationContainer>
    </Box>
  );
}
